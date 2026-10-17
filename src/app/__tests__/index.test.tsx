import { fireEvent, render, screen } from "@testing-library/react-native";

jest.mock("../../hooks/use-study-timer", () => ({
  useStudyTimer: jest.fn(),
}));
jest.mock("expo-device", () => ({ isDevice: false }), { virtual: true });
jest.mock("@/global.css", () => ({}), { virtual: true });
jest.mock(
  "@/components/animated-icon",
  () => ({ AnimatedIcon: () => null }),
);
jest.mock("@/components/web-badge", () => ({ WebBadge: () => null }));

import HomeScreen from "../index";
import { useStudyTimer } from "../../hooks/use-study-timer";

const mockStart = jest.fn();
const mockPause = jest.fn();
const mockResume = jest.fn();
const mockRestart = jest.fn();

const mockedUseStudyTimer = jest.mocked(useStudyTimer);

describe("study timer screen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseStudyTimer.mockReturnValue({
      status: "idle",
      remainingMs: 25 * 60 * 1_000,
      formattedRemainingTime: "25:00",
      start: mockStart,
      pause: mockPause,
      resume: mockResume,
      restart: mockRestart,
    });
  });

  it("shows the study timer and a Spanish start control", async () => {
    await render(<HomeScreen />);

    expect(screen.getByText("Temporizador de estudio")).toBeTruthy();
    expect(screen.getByText("25:00")).toBeTruthy();
    expect(screen.getByText("Listo para iniciar")).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Iniciar temporizador" }),
    ).toBeTruthy();
  });

  it("starts the timer from its accessible control", async () => {
    await render(<HomeScreen />);

    await fireEvent.press(
      screen.getByRole("button", { name: "Iniciar temporizador" }),
    );

    expect(mockStart).toHaveBeenCalledTimes(1);
  });

  it("shows and invokes pause while the timer is running", async () => {
    mockedUseStudyTimer.mockReturnValue({
      status: "running",
      remainingMs: 20 * 60 * 1_000,
      formattedRemainingTime: "20:00",
      start: mockStart,
      pause: mockPause,
      resume: mockResume,
      restart: mockRestart,
    });

    await render(<HomeScreen />);

    expect(screen.getByText("Temporizador en marcha")).toBeTruthy();
    expect(screen.getByText("20:00")).toBeTruthy();
    await fireEvent.press(
      screen.getByRole("button", { name: "Pausar temporizador" }),
    );

    expect(mockPause).toHaveBeenCalledTimes(1);
  });

  it("shows and invokes resume while the timer is paused", async () => {
    mockedUseStudyTimer.mockReturnValue({
      status: "paused",
      remainingMs: 18 * 60 * 1_000,
      formattedRemainingTime: "18:00",
      start: mockStart,
      pause: mockPause,
      resume: mockResume,
      restart: mockRestart,
    });

    await render(<HomeScreen />);

    expect(screen.getByText("Temporizador pausado")).toBeTruthy();
    expect(screen.getByText("18:00")).toBeTruthy();
    await fireEvent.press(
      screen.getByRole("button", { name: "Reanudar temporizador" }),
    );

    expect(mockResume).toHaveBeenCalledTimes(1);
  });
});
