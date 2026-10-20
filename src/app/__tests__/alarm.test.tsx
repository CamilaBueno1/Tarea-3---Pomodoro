import { fireEvent, render, screen } from "@testing-library/react-native";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { useKeepAwake } from "expo-keep-awake";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Vibration } from "react-native";

jest.mock("expo-audio", () => ({
  useAudioPlayer: jest.fn(() => ({
    loop: false,
    pause: jest.fn(),
    play: jest.fn(),
  })),
  useAudioPlayerStatus: jest.fn(() => ({ error: null })),
}));
jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn(),
  useRouter: jest.fn(),
}));
jest.mock("expo-keep-awake", () => ({
  useKeepAwake: jest.fn(),
}));
jest.mock("@/global.css", () => ({}), { virtual: true });

import AlarmRoute from "../alarm";

const mockUseLocalSearchParams = jest.mocked(useLocalSearchParams);
const mockUseAudioPlayer = jest.mocked(useAudioPlayer);
const mockUseAudioPlayerStatus = jest.mocked(useAudioPlayerStatus);
const mockUseKeepAwake = jest.mocked(useKeepAwake);
const mockVibrate = jest.spyOn(Vibration, "vibrate");
const mockCancelVibration = jest.spyOn(Vibration, "cancel");
const mockRouterReplace = jest.fn();
const mockUseRouter = jest.mocked(useRouter);

describe("Alarm route", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAudioPlayerStatus.mockReturnValue({
      error: null,
    } as ReturnType<typeof useAudioPlayerStatus>);
    mockVibrate.mockImplementation(() => undefined);
    mockUseRouter.mockReturnValue({
      replace: mockRouterReplace,
    } as unknown as ReturnType<typeof useRouter>);
  });

  it.each([
    ["study", "Estudio"],
    ["shortBreak", "Descanso corto"],
    ["longBreak", "Descanso largo"],
  ])("shows the completed %s phase, not a current session phase", async (phase, name) => {
    mockUseLocalSearchParams.mockReturnValue({ phase });

    await render(<AlarmRoute />);

    expect(screen.getByText("¡Tiempo terminado!")).toBeTruthy();
    expect(screen.getByText(name)).toBeTruthy();
    expect(screen.queryByText(/listo|en marcha|pausado/i)).toBeNull();

    const stopButton = screen.getByRole("button", { name: "Detener" });
    expect(stopButton).toBeTruthy();
    expect(stopButton.props.accessibilityRole).toBe("button");
    expect(stopButton.props.accessibilityLabel).toBe("Detener");
    expect(
      StyleSheet.flatten(stopButton.props.style).minHeight,
    ).toBeGreaterThanOrEqual(56);
    expect(
      StyleSheet.flatten(screen.getByTestId("alarm-screen").props.style)
        .justifyContent,
    ).toBe("space-between");
  });

  it("replaces the alarm route with the timer without advancing a phase itself", async () => {
    mockUseLocalSearchParams.mockReturnValue({ phase: "study" });
    await render(<AlarmRoute />);

    await fireEvent.press(screen.getByRole("button", { name: "Detener" }));

    expect(mockRouterReplace).toHaveBeenCalledTimes(1);
    expect(mockRouterReplace).toHaveBeenCalledWith("/");
  });

  it("shows audio playback errors on the alarm screen", async () => {
    mockUseLocalSearchParams.mockReturnValue({ phase: "study" });
    mockUseAudioPlayerStatus.mockReturnValue({
      error: "El recurso no está disponible.",
    } as ReturnType<typeof useAudioPlayerStatus>);

    await render(<AlarmRoute />);

    expect(
      screen.getByRole("alert", {
        name: "No se pudo reproducir la alarma: El recurso no está disponible.",
      }),
    ).toBeTruthy();
  });

  it("enables keep-awake and repeating vibration only for a valid alarm phase", async () => {
    mockUseLocalSearchParams.mockReturnValue({ phase: "study" });
    await render(<AlarmRoute />);

    expect(mockUseKeepAwake).toHaveBeenCalledWith("cotopaxi-phase-alarm");
    expect(mockVibrate).toHaveBeenCalledWith([0, 700, 300], true);

    mockUseKeepAwake.mockClear();
    mockVibrate.mockClear();
    mockUseLocalSearchParams.mockReturnValue({ phase: "unknown" });
    await render(<AlarmRoute />);

    expect(mockUseKeepAwake).not.toHaveBeenCalled();
    expect(mockVibrate).not.toHaveBeenCalled();
  });

  it("cancels repeating vibration when the alarm route unmounts", async () => {
    mockUseLocalSearchParams.mockReturnValue({ phase: "study" });
    const { unmount } = await render(<AlarmRoute />);

    await unmount();

    expect(mockCancelVibration).toHaveBeenCalledTimes(1);
  });

  it("stops audio and vibration before closing the alarm route", async () => {
    mockUseLocalSearchParams.mockReturnValue({ phase: "study" });
    const { unmount } = await render(<AlarmRoute />);
    const player = mockUseAudioPlayer.mock.results[0]?.value;

    await fireEvent.press(screen.getByRole("button", { name: "Detener" }));

    expect(player.pause).toHaveBeenCalledTimes(1);
    expect(mockCancelVibration).toHaveBeenCalledTimes(1);
    expect(player.pause.mock.invocationCallOrder[0]).toBeLessThan(
      mockCancelVibration.mock.invocationCallOrder[0],
    );
    expect(mockCancelVibration.mock.invocationCallOrder[0]).toBeLessThan(
      mockRouterReplace.mock.invocationCallOrder[0],
    );

    await unmount();
    expect(player.pause).toHaveBeenCalledTimes(1);
    expect(mockCancelVibration).toHaveBeenCalledTimes(1);
  });
});
