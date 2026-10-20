import { act, renderHook } from "@testing-library/react-native";
import {
  useAudioPlayer,
  useAudioPlayerStatus,
} from "expo-audio";

import { usePhaseAlarmAudio } from "../use-phase-alarm-audio";

jest.mock("expo-audio", () => ({
  useAudioPlayer: jest.fn(),
  useAudioPlayerStatus: jest.fn(),
}));

const mockUseAudioPlayer = jest.mocked(useAudioPlayer);
const mockUseAudioPlayerStatus = jest.mocked(useAudioPlayerStatus);
const mockPlayer = {
  loop: false,
  pause: jest.fn(),
  play: jest.fn(),
};

describe("usePhaseAlarmAudio", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPlayer.loop = false;
    mockPlayer.pause.mockReset();
    mockPlayer.play.mockReset();
    mockUseAudioPlayer.mockReturnValue(
      mockPlayer as unknown as ReturnType<typeof useAudioPlayer>,
    );
    mockUseAudioPlayerStatus.mockReturnValue({
      error: null,
    } as ReturnType<typeof useAudioPlayerStatus>);
  });

  it("starts the alarm audio and enables Expo Audio looping", async () => {
    await renderHook(() => usePhaseAlarmAudio());

    expect(mockUseAudioPlayer).toHaveBeenCalledTimes(1);
    expect(mockPlayer.loop).toBe(true);
    expect(mockPlayer.play).toHaveBeenCalledTimes(1);
  });

  it("stops playback once when explicitly stopped, including during unmount", async () => {
    const { result, unmount } = await renderHook(() => usePhaseAlarmAudio());

    await act(async () => {
      result.current.stop();
    });
    await unmount();

    expect(mockPlayer.pause).toHaveBeenCalledTimes(1);
    expect(mockPlayer.loop).toBe(false);
  });

  it("stops playback when unmounted without an explicit stop", async () => {
    const { unmount } = await renderHook(() => usePhaseAlarmAudio());

    await unmount();

    expect(mockPlayer.pause).toHaveBeenCalledTimes(1);
    expect(mockPlayer.loop).toBe(false);
  });

  it("exposes an Expo Audio playback error", async () => {
    mockUseAudioPlayerStatus.mockReturnValue({
      error: "No se pudo cargar el audio.",
    } as ReturnType<typeof useAudioPlayerStatus>);

    const { result } = await renderHook(() => usePhaseAlarmAudio());

    expect(result.current.error?.message).toBe(
      "No se pudo cargar el audio.",
    );
  });

  it("exposes an error thrown while starting playback", async () => {
    mockPlayer.play.mockImplementation(() => {
      throw new Error("No se pudo iniciar el audio.");
    });

    const { result } = await renderHook(() => usePhaseAlarmAudio());

    expect(result.current.error?.message).toBe(
      "No se pudo iniciar el audio.",
    );
  });
});
