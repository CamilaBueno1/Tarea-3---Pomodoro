/// <reference types="jest" />

import {
  formatRemainingTime,
  getRemainingTime,
  pauseStudyTimer,
  restartStudyTimer,
  resumeStudyTimer,
  startStudyTimer,
  type StudyTimerState,
} from "../study-timer";

describe("study timer", () => {
  describe("startStudyTimer", () => {
    it("creates a running timer from the supplied duration and timestamp", () => {
      const initialDurationMs = 25 * 60 * 1_000;
      const startedAtMs = Date.parse("2026-10-17T12:00:00.000Z");
      const timer: StudyTimerState = startStudyTimer(
        initialDurationMs,
        startedAtMs,
      );

      expect(timer.status).toBe("running");

      if (timer.status !== "running") {
        throw new Error("Expected the timer to be running");
      }

      expect(timer.initialDurationMs).toBe(initialDurationMs);
      expect(timer.targetEndTime).toBe(startedAtMs + initialDurationMs);
    });
  });

  describe("getRemainingTime", () => {
    it("derives a running timer's remaining time from its end timestamp", () => {
      const initialDurationMs = 25 * 60 * 1_000;
      const startedAtMs = Date.parse("2026-10-17T12:00:00.000Z");
      const timer = startStudyTimer(initialDurationMs, startedAtMs);

      expect(getRemainingTime(timer, startedAtMs + 5 * 60 * 1_000)).toBe(
        20 * 60 * 1_000,
      );
      expect(getRemainingTime(timer, startedAtMs + 30 * 60 * 1_000)).toBe(0);
    });
  });

  describe("pauseStudyTimer", () => {
    it("preserves the remaining time at the moment the timer is paused", () => {
      const initialDurationMs = 25 * 60 * 1_000;
      const startedAtMs = Date.parse("2026-10-17T12:00:00.000Z");
      const timer = startStudyTimer(initialDurationMs, startedAtMs);
      const pausedAtMs = startedAtMs + 5 * 60 * 1_000;

      const pausedTimer = pauseStudyTimer(timer, pausedAtMs);

      expect(pausedTimer.status).toBe("paused");
      expect(getRemainingTime(pausedTimer, pausedAtMs + 10 * 60_000)).toBe(
        20 * 60 * 1_000,
      );
    });
  });

  describe("resumeStudyTimer", () => {
    it("continues from the remaining time captured when paused", () => {
      const initialDurationMs = 25 * 60 * 1_000;
      const startedAtMs = Date.parse("2026-10-17T12:00:00.000Z");
      const timer = startStudyTimer(initialDurationMs, startedAtMs);
      const pausedTimer = pauseStudyTimer(timer, startedAtMs + 5 * 60 * 1_000);
      const resumedAtMs = startedAtMs + 15 * 60 * 1_000;

      const resumedTimer = resumeStudyTimer(pausedTimer, resumedAtMs);

      expect(resumedTimer.status).toBe("running");
      if (resumedTimer.status !== "running") {
        throw new Error("Expected the timer to be running");
      }

      expect(resumedTimer.targetEndTime).toBe(
        resumedAtMs + 20 * 60 * 1_000,
      );
      expect(getRemainingTime(resumedTimer, resumedAtMs + 1_000)).toBe(
        20 * 60 * 1_000 - 1_000,
      );
    });
  });

  describe("restartStudyTimer", () => {
    it("restarts a running timer and keeps it running", () => {
      const initialDurationMs = 25 * 60 * 1_000;
      const startedAtMs = Date.parse("2026-10-17T12:00:00.000Z");
      const timer = startStudyTimer(initialDurationMs, startedAtMs);
      const restartedAtMs = startedAtMs + 5 * 60 * 1_000;

      const restartedTimer = restartStudyTimer(timer, restartedAtMs);

      expect(restartedTimer.status).toBe("running");
      if (restartedTimer.status !== "running") {
        throw new Error("Expected the timer to remain running");
      }

      expect(restartedTimer.initialDurationMs).toBe(initialDurationMs);
      expect(restartedTimer.targetEndTime).toBe(
        restartedAtMs + initialDurationMs,
      );
    });

    it("restarts a paused timer and keeps it paused", () => {
      const initialDurationMs = 25 * 60 * 1_000;
      const startedAtMs = Date.parse("2026-10-17T12:00:00.000Z");
      const timer = startStudyTimer(initialDurationMs, startedAtMs);
      const pausedTimer = pauseStudyTimer(timer, startedAtMs + 5 * 60 * 1_000);

      const restartedTimer = restartStudyTimer(
        pausedTimer,
        startedAtMs + 15 * 60 * 1_000,
      );

      expect(restartedTimer.status).toBe("paused");
      expect(getRemainingTime(restartedTimer, startedAtMs + 15 * 60_000)).toBe(
        initialDurationMs,
      );
    });
  });

  describe("formatRemainingTime", () => {
    it.each([
      [9 * 60_000 + 5_000, "09:05"],
      [5_000, "00:05"],
      [12 * 60_000, "12:00"],
    ])(
      "formats %i milliseconds as %s",
      (remainingMs: number, expected: string) => {
        expect(formatRemainingTime(remainingMs)).toBe(expected);
      },
    );
  });
});
