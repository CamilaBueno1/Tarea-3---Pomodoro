import { act, renderHook } from "@testing-library/react-native";
import { useKeepAwake } from "expo-keep-awake";
import { Vibration } from "react-native";

import { usePhaseAlarmSignals } from "../use-phase-alarm-signals";

jest.mock("expo-keep-awake", () => ({
  useKeepAwake: jest.fn(),
}));

const mockVibrate = jest.spyOn(Vibration, "vibrate");
const mockCancelVibration = jest.spyOn(Vibration, "cancel");
const mockUseKeepAwake = jest.mocked(useKeepAwake);

describe("usePhaseAlarmSignals", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockVibrate.mockImplementation(() => undefined);
  });

  it("repeats vibration and keeps the screen awake while enabled", async () => {
    await renderHook(() => usePhaseAlarmSignals());

    expect(mockVibrate).toHaveBeenCalledWith([0, 700, 300], true);
    expect(mockUseKeepAwake).toHaveBeenCalledWith("cotopaxi-phase-alarm");
  });

  it("cancels repeating vibration when the alarm unmounts", async () => {
    const { unmount } = await renderHook(() => usePhaseAlarmSignals());

    await unmount();

    expect(mockCancelVibration).toHaveBeenCalledTimes(1);
  });

  it("stops vibration once when stopped explicitly and then unmounted", async () => {
    const { result, unmount } = await renderHook(() => usePhaseAlarmSignals());

    await act(async () => result.current.stop());
    await unmount();

    expect(mockCancelVibration).toHaveBeenCalledTimes(1);
  });

  it("exposes vibration failures", async () => {
    mockVibrate.mockImplementation(() => {
      throw new Error("Vibration unavailable");
    });

    const { result } = await renderHook(() => usePhaseAlarmSignals());

    expect(result.current.error?.message).toBe("Vibration unavailable");
  });
});
