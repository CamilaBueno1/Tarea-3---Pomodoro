# Plan técnico – HU-002

Estado: Aprobado para implementación
Spec: spec.md
HU: ../../docs/historias/HU-002.md

## Alcance

Implementar transiciones deterministas entre estudio, descanso corto y
descanso largo, mostrar el progreso y consumir los ajustes de HU-005. HU-003
persiste y restaura el estado compartido de la sesión.

## Archivos y responsabilidades

| Archivo | Responsabilidad | RF |
| --- | --- | --- |
| `src/domain/pomodoro-session.ts` | Tipos, creación de sesión, inicio/pausa/reanudación/reinicio y transición pura al finalizar fase. | RF-1 a RF-6 |
| `src/domain/__tests__/pomodoro-session.test.ts` | Pruebas deterministas de fases, objetivos y conteo. | RF-1 a RF-6 |
| `src/hooks/use-pomodoro-session.ts` | Fuente compartida en React para ciclo, controles y cálculo desde `endsAt`. | RF-1 a RF-6 |
| `src/hooks/__tests__/use-pomodoro-session.test.tsx` | Pruebas de controles y sincronización de sesión. | RF-1 a RF-6 |
| `src/app/index.tsx` | Mostrar fase, progreso, tiempo y acciones. | RF-1 a RF-6 |

## Modelo del dominio

- Una sesión tiene fase, conteo completado, objetivo capturado del ciclo,
  duración inicial, estado y `endsAt` o restante pausado.
- Los estados `ready` y `paused` guardan tiempo restante; `running` usa
  `endsAt`/`targetEndTime`.
- El inicio de un ciclo captura `pomodorosBeforeLongBreak`; un ciclo nuevo
  comienza después de completar el descanso largo.
- La finalización de una fase calcula el siguiente tipo y su conteo, y lo deja
  listo sin iniciarlo.

## Algoritmo

```text
finishPhase(session):
  si fase == study:
    completados = completados + 1
    si completados == objetivoCiclo:
      faseSiguiente = longBreak
      completados = 0
    si no:
      faseSiguiente = shortBreak
  si fase == shortBreak:
    faseSiguiente = study
  si fase == longBreak:
    faseSiguiente = study
    objetivoCiclo = configuraciónActual.pomodorosBeforeLongBreak
  devolver ready(faseSiguiente, configuraciónActual.duración(faseSiguiente))
```

## Persistencia

La sesión y sus `endsAt` se persisten de acuerdo con HU-003; esta spec no
define acceso directo a AsyncStorage desde el dominio.

## Interfaz y pruebas

La pantalla utiliza áreas seguras, `StyleSheet`, paleta Cotopaxi y
accesibilidad española. Jest controla reloj y transiciones sin depender de
relojes reales. La integración usa ajustes compartidos y conserva el estado
inicial de una fase iniciada.

## Decisiones y límites

Las fases se preparan automáticamente pero se inician por acción del
estudiante, según los escenarios de HU-002. No se ejecuta una alarma completa;
la notificación local de fin necesaria al cerrar se define con HU-003.
