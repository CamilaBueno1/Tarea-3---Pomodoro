import { act,
fireEvent, render, screen } from "@testing-library/react-native";
import { Alert, Platform } from "react-native";

import type { PomodoroSession } from "../../domain/pomodoro-session";
import { usePomodoroSession } from "../../hooks/use-pomodoro-session";

jest.mock("../../hooks/use-pomodoro-session", () => ({
  usePomodoroSession: jest.fn(),
}));
jest.mock("@/global.css", () => ({}), { virtual: true });

import HomeScreen from "../(tabs)/index";

const mockStart = jest.fn();
const mockPause = jest.fn();
const mockResume = jest.fn();
const mockRestart = jest.fn();
const mockRequestPermission = jest.fn();
const mockedUsePomodoroSession = jest.mocked(usePomodoroSession);
const alertSpy = jest.spyOn(Alert, "alert");

function setTimerState(
  sessionStatus: "ready" | "running" | "paused",
  remainingMs: number,
  formattedRemainingTime: string,
  notificationPermissionGranted: boolean | null = true,
  notificationError: Error | null = null,
) {
  const common = {
    phase: "study" as const,
    initialDurationMs: 25 * 60 * 1_000,
    completedPomodoros: 1,
    cycleTarget: 4,
  };
  const session: PomodoroSession =
    sessionStatus === "running"
      ? {
          ...common,
          status: sessionStatus,
          endsAt: Date.now() + remainingMs,
        }
      : {
          ...common,
          status: sessionStatus,
          remainingMs,
          lastCompletedPhase: null,
        };

  mockedUsePomodoroSession.mockReturnValue({
    status: "ready",
    session,
    remainingMs,
    formattedRemainingTime,
    notificationPermissionGranted,
    notificationError,
    error: null,
    start: mockStart,
    pause: mockPause,
    resume: mockResume,
    restart: mockRestart,
    requestPermission: mockRequestPermission,
  });
}

describe("Pomodoro home screen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    alertSpy.mockReset();
    alertSpy.mockImplementation(() => undefined);
    setTimerState("ready", 25 * 60 * 1_000, "25:00");
  });

  it("shows the phase, progress, remaining time, and accessible start control", async () => {
    await render(<HomeScreen />);

    expect(screen.getByText("Temporizador Pomodoro")).toBeTruthy();
    expect(screen.queryByText("FOCUS")).toBeNull();
    expect(
      screen.queryByText("Un paso a la vez. Concéntrate en lo que importa."),
    ).toBeNull();
    expect(screen.getByText("Estudio listo")).toBeTruthy();
    expect(screen.getByText("25:00")).toBeTruthy();
    expect(screen.getByRole("progressbar").props.accessibilityValue).toEqual({
      min: 0,
      max: 100,
      now: 0,
    });
    expect(screen.getByText("Pomodoros completados: 1 de 4")).toBeTruthy();
    expect(screen.queryByText(/registro|iniciar sesión/i)).toBeNull();
    expect(
      screen.queryByRole("button", { name: /registro|iniciar sesión/i }),
    ).toBeNull();
    expect(
      screen.getByRole("button", { name: "Iniciar estudio" }),
    ).toBeTruthy();
  });

  it("exposes elapsed phase progress to assistive technology", async () => {
    setTimerState("running", 20 * 60 * 1_000, "20:00");
    await render(<HomeScreen />);

    expect(screen.getByRole("progressbar").props.accessibilityValue).toEqual({
      min: 0,
      max: 100,
      now: 20,
    });
  });

  it("shows the last phase as completed when the next one is ready", async () => {
    mockedUsePomodoroSession.mockReturnValue({
      session: {
        status: "ready",
        phase: "shortBreak",
        initialDurationMs: 5 * 60 * 1_000,
        remainingMs: 5 * 60 * 1_000,
        completedPomodoros: 1,
        cycleTarget: 4,
        lastCompletedPhase: "study",
      },
      status: "ready",
      remainingMs: 5 * 60 * 1_000,
      formattedRemainingTime: "05:00",
      notificationPermissionGranted: true,
      notificationError: null,
      error: null,
      start: mockStart,
      pause: mockPause,
      resume: mockResume,
      restart: mockRestart,
      requestPermission: mockRequestPermission,
    });

    await render(<HomeScreen />);

    expect(
      screen.getByText("Estudio terminado. Descanso corto listo"),
    ).toBeTruthy();
    expect(screen.getByTestId("phase-completion-notice")).toBeTruthy();
    expect(screen.getByText("¡Estudio terminado!")).toBeTruthy();
    expect(
      screen.getByText("Descanso corto está listo para iniciar."),
    ).toBeTruthy();
    expect(alertSpy).not.toHaveBeenCalled();
  });

  it("does not show a second completion alert after the session advances", async () => {
    setTimerState("running", 1_000, "00:01");
    const { rerender } = await render(<HomeScreen />);

    mockedUsePomodoroSession.mockReturnValue({
      session: {
        status: "ready",
        phase: "shortBreak",
        initialDurationMs: 5 * 60 * 1_000,
        remainingMs: 5 * 60 * 1_000,
        completedPomodoros: 1,
        cycleTarget: 4,
        lastCompletedPhase: "study",
      },
      status: "ready",
      remainingMs: 5 * 60 * 1_000,
      formattedRemainingTime: "05:00",
      notificationPermissionGranted: true,
      notificationError: null,
      error: null,
      start: mockStart,
      pause: mockPause,
      resume: mockResume,
      restart: mockRestart,
      requestPermission: mockRequestPermission,
    });

    await rerender(<HomeScreen />);

    expect(alertSpy).not.toHaveBeenCalled();
    expect(screen.getByTestId("phase-completion-notice")).toBeTruthy();
  });

  it("starts the timer directly when notifications are granted", async () => {
    await render(<HomeScreen />);
    await fireEvent.press(
      screen.getByRole("button", { name: "Iniciar estudio" }),
    );

    expect(mockStart).toHaveBeenCalledTimes(1);
  });

  it("does not show persistent notification permission or alarm-access notices", async () => {
    setTimerState("ready", 25 * 60 * 1_000, "25:00", false);
    const originalPlatform = Platform.OS;
    Platform.OS = "android";

    try {
      await render(<HomeScreen />);

      expect(screen.queryByText(/Avisos desactivados/)).toBeNull();
      expect(screen.queryByText(/Alarmas y recordatorios/)).toBeNull();
    } finally {
      Platform.OS = originalPlatform;
    }
  });

  it("shows notification configuration failures in a dialog instead of inline text", async () => {
    const notificationError = new Error("No se pudo configurar el canal.");
    setTimerState(
      "ready",
      25 * 60 * 1_000,
      "25:00",
      false,
      notificationError,
    );

    await render(<HomeScreen />);

    expect(alertSpy).toHaveBeenCalledWith(
      "Error de notificaciones",
      notificationError.message,
    );
    expect(
      screen.queryByText(notificationError.message),
    ).toBeNull();
  });

  it("explains local notifications and allows starting without permission", async () => {
    setTimerState("ready", 25 * 60 * 1_000, "25:00", false);
    await render(<HomeScreen />);
    await fireEvent.press(
      screen.getByRole("button", { name: "Iniciar estudio" }),
    );

    expect(alertSpy).toHaveBeenCalledWith(
      "Avisos del temporizador",
      expect.stringContaining("aviso local"),
      expect.arrayContaining([
        expect.objectContaining({ text: "Iniciar sin avisos" }),
        expect.objectContaining({ text: "Permitir avisos" }),
      ]),
      expect.objectContaining({ cancelable: true }),
    );
    const buttons = alertSpy.mock.calls[0]?.[2];
    await act(async () => {
      buttons
        ?.find((button) => button.text === "Iniciar sin avisos")
        ?.onPress?.();
    });
    expect(mockStart).toHaveBeenCalledTimes(1);
  });

  it("uses the newly granted notification permission when starting", async () => {
    setTimerState("ready", 25 * 60 * 1_000, "25:00", false);
    mockRequestPermission.mockResolvedValueOnce(true);
    await render(<HomeScreen />);
    await fireEvent.press(
      screen.getByRole("button", { name: "Iniciar estudio" }),
    );

    const buttons = alertSpy.mock.calls[0]?.[2];
    await act(async () => {
      await buttons
        ?.find((button) => button.text === "Permitir avisos")
        ?.onPress?.();
    });

    expect(mockRequestPermission).toHaveBeenCalledTimes(1);
    expect(mockStart).toHaveBeenCalledWith(true);
  });

  it("shows and invokes pause while the phase is running", async () => {
    setTimerState("running", 20 * 60 * 1_000, "20:00");
    await render(<HomeScreen />);

    expect(screen.getByText("Estudio en marcha")).toBeTruthy();
    expect(screen.getByText("20:00")).toBeTruthy();
    await fireEvent.press(
      screen.getByRole("button", { name: "Pausar temporizador" }),
    );

    expect(mockPause).toHaveBeenCalledTimes(1);
  });

  it("shows and invokes resume while the phase is paused", async () => {
    setTimerState("paused", 18 * 60 * 1_000, "18:00");
    await render(<HomeScreen />);

    expect(screen.getByText("Estudio pausado")).toBeTruthy();
    expect(screen.getByText("18:00")).toBeTruthy();
    await fireEvent.press(
      screen.getByRole("button", { name: "Reanudar temporizador" }),
    );

    expect(mockResume).toHaveBeenCalledTimes(1);
  });

  it.each(["running", "paused"] as const)(
    "confirms restarting a %s phase",
    async (status) => {
      setTimerState(status, 18 * 60 * 1_000, "18:00");
      await render(<HomeScreen />);

      await fireEvent.press(
        screen.getByRole("button", { name: "Reiniciar temporizador" }),
      );

      expect(alertSpy).toHaveBeenCalledWith(
        "Reiniciar temporizador",
        expect.stringContaining("duración inicial"),
        expect.arrayContaining([
          expect.objectContaining({ text: "Cancelar", style: "cancel" }),
          expect.objectContaining({ text: "Reiniciar" }),
        ]),
        expect.objectContaining({ cancelable: true }),
      );
      const confirmButton = alertSpy.mock.calls[0]?.[2]?.find(
        (button) => button.text === "Reiniciar",
      );
      if (!confirmButton?.onPress) {
        throw new Error("The restart confirmation button is missing.");
      }
      confirmButton.onPress();

      expect(mockRestart).toHaveBeenCalledTimes(1);
    },
  );

  it.each(["running", "paused"] as const)(
    "preserves the %s phase when restart is canceled or dismissed",
    async (status) => {
      setTimerState(status, 18 * 60 * 1_000, "18:00");
      await render(<HomeScreen />);

      await fireEvent.press(
        screen.getByRole("button", { name: "Reiniciar temporizador" }),
      );

      const cancelButton = alertSpy.mock.calls[0]?.[2]?.find(
        (button) => button.text === "Cancelar",
      );
      cancelButton?.onPress?.();
      expect(mockRestart).not.toHaveBeenCalled();
      expect(screen.getByText("18:00")).toBeTruthy();
      expect(
        screen.getByText(
          status === "running" ? "Estudio en marcha" : "Estudio pausado",
        ),
      ).toBeTruthy();

      const dismiss = alertSpy.mock.calls[0]?.[3]?.onDismiss;
      dismiss?.();
      expect(mockRestart).not.toHaveBeenCalled();
    },
  );
});
