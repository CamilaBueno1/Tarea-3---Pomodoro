# Plan técnico – HU-003

Estado: Aprobado para implementación
Spec: spec.md
HU: ../../docs/historias/HU-003.md

## Alcance y trazabilidad

Persistir la sesión de HU-002 con `endsAt`, restaurar fases corriendo o
pausadas, procesar fases vencidas al regresar y gestionar notificaciones
locales mínimas. No implementar una alarma que venza el silencio ni un servicio
de segundo plano.

| RF | Implementación |
| --- | --- |
| RF-1–RF-4 | Estado de sesión validado y persistido; restante derivado del reloj/`endsAt`. |
| RF-3 | Dominio puro finaliza fases vencidas una sola vez al hidratar. |
| RF-5–RF-6 | Adaptador Expo Notifications programa/cancela aviso por fase corriendo. |
| RF-7 | Errores propagados del adaptador y mostrados desde proveedor/pantalla. |
| RF-8 | Explicación y solicitud del permiso de notificación antes de programar el primer aviso. |
| RF-9 | La sesión guarda `lastCompletedPhase` para mostrar el fin tras restaurar. |

## Archivos y responsabilidades

| Archivo | Responsabilidad | RF |
| --- | --- | --- |
| `src/domain/pomodoro-session.ts` | Estado serializable de sesión, transiciones y reconciliación temporal pura. | RF-1–RF-4, RF-9 |
| `src/domain/__tests__/pomodoro-session.test.ts` | Pruebas de `endsAt`, cierre, pausa, reanudación y expiración. | RF-1–RF-4, RF-9 |
| `src/storage/study-session-storage.ts` | Leer/escribir sesión local con validación estricta. | RF-2, RF-4, RF-7 |
| `src/storage/__tests__/study-session-storage.test.ts` | Pruebas de lectura/escritura, datos corruptos y errores. | RF-2, RF-4, RF-7 |
| `src/storage/study-notifications.ts` | Permiso, programación y cancelación de avisos locales. | RF-5, RF-6, RF-8 |
| `src/storage/__tests__/study-notifications.test.ts` | Pruebas simuladas de permiso y programación. | RF-5, RF-6, RF-8 |
| `src/hooks/use-pomodoro-session.ts` | Estado compartido, persistencia de transiciones, carga y errores. | RF-1–RF-7 |
| `src/hooks/__tests__/use-pomodoro-session.test.tsx` | Pruebas de hidratación, expiración y errores. | RF-1–RF-7 |
| `src/app/_layout.tsx` | Hidratar sesión y conectar notificación/gestión de aplicación. | RF-2, RF-3, RF-5 |
| `src/app/index.tsx` | Mostrar restauración, última fase terminada y errores de persistencia/permiso. | RF-1–RF-9 |
| `package.json`, lockfile y `app.json` | Añadir `expo-notifications` y configuración de canal nativo si se requiere. | RF-5, RF-8 |

## Algoritmo de hidratación

```text
session = leerYValidar()
si no existe session:
  crear sesión inicial lista con ajustes vigentes
si session.status == running:
  si ahora >= session.endsAt:
    session = finishPhase(session) // transición pura, exactamente una vez
  si no:
    restante = session.endsAt - ahora
si session.status == paused:
  conservar restante pausado y cancelar aviso
persistir sesión reconciliada
mostrar error si lectura/escritura falla
```

## Notificaciones

Programar un aviso local único con la fase y fecha `endsAt`. Al iniciar o
reanudar, reemplazar el aviso anterior; al pausar o reiniciar, cancelarlo. La
notificación requiere permiso y no elude silencio ni políticas de segundo
plano del sistema operativo.

## Pruebas y validación

Inyectar reloj, almacenamiento y API de notificaciones en pruebas. Ejecutar
Jest, TypeScript y export web. Validación Android manual cubre cierre desde
recientes, reapertura, fase vencida, pausa, permiso y aviso; documentar
limitaciones reales del sistema.
