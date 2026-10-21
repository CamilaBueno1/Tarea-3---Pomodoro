import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { Alert } from "react-native";
import type { ReactNode } from "react";

import { DEFAULT_POMODORO_SETTINGS } from "../../domain/pomodoro-settings";
import { usePomodoroSettings } from "../../hooks/use-pomodoro-settings";
import AppTabs from "../../components/app-tabs";

jest.mock("../../hooks/use-pomodoro-settings", () => ({
  usePomodoroSettings: jest.fn(),
}));
jest.mock("@/global.css", () => ({}), { virtual: true });
jest.mock("expo-router/ui", () => {
  const React = require("react");
  const { View } = require("react-native");
  const Container = ({ children }: { children: ReactNode }) =>
    React.createElement(View, null, children);

  return {
    Tabs: Container,
    TabList: Container,
    TabSlot: () => null,
    TabTrigger: Container,
  };
});
jest.mock("expo-router/unstable-native-tabs", () => {
  const React = require("react");
  const { Text, View } = require("react-native");

  const Trigger = Object.assign(
    ({ children }: { children: ReactNode }) =>
      React.createElement(View, null, children),
    {
      Label: ({ children }: { children: ReactNode }) =>
        React.createElement(Text, null, children),
      Icon: () => null,
    },
  );
  const NativeTabs = Object.assign(
    ({ children }: { children: ReactNode }) =>
      React.createElement(View, null, children),
    { Trigger },
  );

  return { NativeTabs };
});

import SettingsScreen from "../(tabs)/settings";
import AppTabsWeb from "../../components/app-tabs.web";

const mockSaveSettings = jest.fn();
const mockUsePomodoroSettings = jest.mocked(usePomodoroSettings);
const alertSpy = jest.spyOn(Alert, "alert");

function pressAlertButton(label: string) {
  const buttons = alertSpy.mock.calls[0]?.[2];
  const button = buttons?.find((entry) => entry.text === label);

  if (!button) {
    throw new Error(`The "${label}" dialog button is missing.`);
  }

  button.onPress?.();
}

describe("pomodoro settings screen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    alertSpy.mockReset();
    alertSpy.mockImplementation(() => undefined);
    mockUsePomodoroSettings.mockReturnValue({
      settings: DEFAULT_POMODORO_SETTINGS,
      status: "ready",
      error: null,
      saveSettings: mockSaveSettings,
    });
  });

  it("shows accessible numeric fields and the accepted ranges", async () => {
    await render(<SettingsScreen />);

    expect(screen.getByText("Ajustes")).toBeTruthy();
    expect(screen.queryByText("AJUSTES")).toBeNull();
    expect(
      screen.getByRole("button", { name: "Restablecer valores" }),
    ).toBeTruthy();

    const studyInput = screen.getByLabelText(
      "Duración de estudio en minutos",
    );
    expect(studyInput.props.value).toBe("25");
    expect(studyInput.props.keyboardType).toBe("number-pad");
    expect(
      screen.getByLabelText("Duración del descanso corto en minutos").props
        .value,
    ).toBe("5");
    expect(
      screen.getByLabelText("Duración del descanso largo en minutos").props
        .value,
    ).toBe("15");
    expect(
      screen.getByLabelText("Pomodoros antes del descanso largo").props.value,
    ).toBe("4");
    expect(screen.getAllByText(/1 a 120 minutos/)).toHaveLength(3);
    expect(screen.getByText(/1 a 12 pomodoros/)).toBeTruthy();
  });

  it("shows a visible error instead of the form when settings cannot be loaded", async () => {
    mockUsePomodoroSettings.mockReturnValue({
      settings: DEFAULT_POMODORO_SETTINGS,
      status: "error",
      error: new Error("almacenamiento no disponible"),
      saveSettings: mockSaveSettings,
    });

    await render(<SettingsScreen />);

    expect(
      screen.getByText("No se pudieron cargar los ajustes guardados."),
    ).toBeTruthy();
    expect(screen.getByText("almacenamiento no disponible")).toBeTruthy();
    expect(screen.queryByLabelText("Duración de estudio en minutos")).toBeNull();
  });

  it("rejects empty and out-of-range values without saving", async () => {
    await render(<SettingsScreen />);

    await fireEvent.changeText(
      screen.getByLabelText("Duración de estudio en minutos"),
      "",
    );
    await fireEvent.changeText(
      screen.getByLabelText("Pomodoros antes del descanso largo"),
      "13",
    );
    await fireEvent.changeText(
      screen.getByLabelText("Duración del descanso corto en minutos"),
      "0",
    );
    await fireEvent.press(
      screen.getByRole("button", { name: "Guardar ajustes" }),
    );

    expect(screen.getByText(/1 y 120 minutos/)).toBeTruthy();
    expect(screen.getByText(/1 y 12 pomodoros/)).toBeTruthy();
    expect(mockSaveSettings).not.toHaveBeenCalled();
    expect(alertSpy).not.toHaveBeenCalled();
  });

  it("shows and clears a field validation error as the value changes", async () => {
    await render(<SettingsScreen />);

    const studyInput = screen.getByLabelText(
      "Duración de estudio en minutos",
    );
    expect(screen.queryByText("Ingresa entre 1 y 120 minutos.")).toBeNull();

    await fireEvent.changeText(studyInput, "121");

    expect(
      screen.getByText("Ingresa entre 1 y 120 minutos."),
    ).toBeTruthy();
    expect(mockSaveSettings).not.toHaveBeenCalled();
    expect(alertSpy).not.toHaveBeenCalled();

    await fireEvent.changeText(studyInput, "60");

    expect(
      screen.queryByText("Ingresa entre 1 y 120 minutos."),
    ).toBeNull();
  });

  it("requests confirmation before saving valid changes", async () => {
    await render(<SettingsScreen />);

    await fireEvent.changeText(
      screen.getByLabelText("Duración de estudio en minutos"),
      "40",
    );
    await fireEvent.changeText(
      screen.getByLabelText("Duración del descanso corto en minutos"),
      "10",
    );
    await fireEvent.changeText(
      screen.getByLabelText("Duración del descanso largo en minutos"),
      "20",
    );
    await fireEvent.changeText(
      screen.getByLabelText("Pomodoros antes del descanso largo"),
      "3",
    );
    await fireEvent.press(
      screen.getByRole("button", { name: "Guardar ajustes" }),
    );

    expect(alertSpy).toHaveBeenCalledWith(
      "Guardar ajustes",
      "¿Deseas aplicar estos cambios?",
      expect.arrayContaining([
        expect.objectContaining({ text: "Cancelar" }),
        expect.objectContaining({ text: "Guardar" }),
      ]),
      expect.objectContaining({ cancelable: true }),
    );
    expect(mockSaveSettings).not.toHaveBeenCalled();

    await actPressAlertButton("Guardar");

    await waitFor(() =>
      expect(mockSaveSettings).toHaveBeenCalledWith({
        studyDurationMinutes: 40,
        shortBreakDurationMinutes: 10,
        longBreakDurationMinutes: 20,
        pomodorosBeforeLongBreak: 3,
      }),
    );
  });

  it("shows a temporary accessible toast at the top after saving", async () => {
    await render(<SettingsScreen />);

    await fireEvent.press(
      screen.getByRole("button", { name: "Guardar ajustes" }),
    );
    await actPressAlertButton("Guardar");

    const toastMessage = await screen.findByText(
      "Ajustes guardados correctamente.",
    );
    expect(toastMessage.parent?.props.accessibilityRole).toBe("alert");
    expect(toastMessage.parent?.parent?.props.style).toEqual(
      expect.objectContaining({ position: "absolute", top: 8 }),
    );
  });

  it("shows a visible error and no success message when saving fails", async () => {
    mockSaveSettings.mockRejectedValueOnce(
      new Error("almacenamiento no disponible"),
    );
    await render(<SettingsScreen />);

    await fireEvent.changeText(
      screen.getByLabelText("Duración de estudio en minutos"),
      "40",
    );
    await fireEvent.press(
      screen.getByRole("button", { name: "Guardar ajustes" }),
    );
    await actPressAlertButton("Guardar");

    expect(
      await screen.findByText(
        "No se pudieron guardar los ajustes. almacenamiento no disponible",
      ),
    ).toBeTruthy();
    expect(
      screen.queryByText("Ajustes guardados correctamente."),
    ).toBeNull();
  });

  it("does not save valid changes when confirmation is canceled", async () => {
    await render(<SettingsScreen />);

    await fireEvent.changeText(
      screen.getByLabelText("Duración de estudio en minutos"),
      "40",
    );
    await fireEvent.press(
      screen.getByRole("button", { name: "Guardar ajustes" }),
    );

    pressAlertButton("Cancelar");

    expect(mockSaveSettings).not.toHaveBeenCalled();
  });

  it("confirms and saves the default values when resetting", async () => {
    mockUsePomodoroSettings.mockReturnValue({
      settings: {
        studyDurationMinutes: 40,
        shortBreakDurationMinutes: 10,
        longBreakDurationMinutes: 20,
        pomodorosBeforeLongBreak: 3,
      },
      status: "ready",
      error: null,
      saveSettings: mockSaveSettings,
    });
    await render(<SettingsScreen />);

    await fireEvent.press(
      screen.getByRole("button", { name: "Restablecer valores" }),
    );

    expect(alertSpy).toHaveBeenCalledWith(
      "Restablecer ajustes",
      expect.any(String),
      expect.arrayContaining([
        expect.objectContaining({ text: "Cancelar" }),
        expect.objectContaining({ text: "Restablecer" }),
      ]),
      expect.objectContaining({ cancelable: true }),
    );
    expect(mockSaveSettings).not.toHaveBeenCalled();

    await actPressAlertButton("Restablecer");

    await waitFor(() =>
      expect(mockSaveSettings).toHaveBeenCalledWith(
        DEFAULT_POMODORO_SETTINGS,
      ),
    );
  });

  it("does not reset settings when reset confirmation is canceled", async () => {
    await render(<SettingsScreen />);

    await fireEvent.press(
      screen.getByRole("button", { name: "Restablecer valores" }),
    );

    pressAlertButton("Cancelar");

    expect(mockSaveSettings).not.toHaveBeenCalled();
  });

  it("shows the settings screen in the second native tab", async () => {
    await render(<AppTabs />);

    expect(screen.getByText("Ajustes")).toBeTruthy();
    expect(screen.getByText("Temporizador")).toBeTruthy();
  });

  it("shows the settings screen in the second web tab", async () => {
    await render(<AppTabsWeb />);

    expect(screen.getByText("Ajustes")).toBeTruthy();
    expect(screen.getByText("Temporizador")).toBeTruthy();
  });
});

async function actPressAlertButton(label: string) {
  await act(async () => {
    pressAlertButton(label);
  });
}
