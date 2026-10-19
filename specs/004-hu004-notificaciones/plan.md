# Plan técnico – HU-004

Estado: Aprobado y completado
Spec: [spec.md](./spec.md)
HU: [HU-004](../../docs/historias/HU-004.md)

## Alcance y trazabilidad

La propuesta cubre la entrega de avisos al terminar una fase, la explicación y solicitud del permiso de notificaciones, la cancelación del aviso al detener o reanudar, y la gestión de restricciones del sistema operativo. No garantiza que una alarma fuerce sonido o vibración en silencio o No molestar; esa parte depende de la plataforma y requiere verificación en dispositivo real.

| Requisito | Cobertura prevista |
| --- | --- |
| RF-1, RF-2 | Aviso local al quedar en cero la fase y señal sonora/vibratoria cuando el sistema lo permite. |
| RF-3 | Alarma/vibración y aviso en bloqueo si el dispositivo está en silencio o vibración; la app no promete anular restricciones del sistema. |
| RF-4 | Acción de detener la alarma y abrir la siguiente fase desde la app. |
| RF-5, RF-6 | Explicación del permiso, solicitud al inicio y manejo de denegación sin romper el temporizador. |
| RF-7 | Comunicación explícita de la limitación del sistema operativo y de la marca/fabricante; requiere evidencia de dispositivo y decisión final de producto. |

## Archivos y responsabilidades

| Archivo | Estado actual / responsabilidad propuesta | RF |
| --- | --- | --- |
| `src/domain/pomodoro-session.ts` (existente) | Mantener el estado de la fase vigente y la lógica de fin de fase para que el aviso sea disparado por una transición válida. | RF-1, RF-4 |
| `src/domain/__tests__/pomodoro-session.test.ts` (existente) | Pruebas de fin de fase y transición a la siguiente fase. | RF-1, RF-4 |
| `src/storage/study-notifications.ts` (existente) | Encapsular permiso, programación, cancelación y manejo de errores de notificaciones locales. | RF-1 a RF-7 |
| `src/storage/__tests__/study-notifications.test.ts` (existente) | Pruebas simuladas de permiso, programación, cancelación y errores de sistema. | RF-1 a RF-7 |
| `src/hooks/use-pomodoro-session.ts` (existente) | Coordinar la finalización de fase con la programación del aviso y la apertura de la siguiente fase. | RF-1, RF-4, RF-6 |
| `src/hooks/__tests__/use-pomodoro-session.test.tsx` (existente) | Pruebas de hidratación, finalización, cancelación de aviso y manejo de permisos. | RF-1 a RF-6 |
| `src/app/index.tsx` (existente) | Mostrar el aviso visible, el cierre y la transición a la siguiente fase; exponer la limitación del sistema cuando el dispositivo no permite el efecto esperado. | RF-1, RF-3, RF-4, RF-7 |
| `src/app/_layout.tsx` (existente) | Requerir el permiso solamente cuando el flujo lo necesite y preparar la app para mostrar la siguiente fase. | RF-5, RF-6 |
| `src/app/__tests__/index.test.tsx` o equivalente (nuevo) | Pruebas de solicitud de permiso, denegación, alarma y cierre del aviso. | RF-2 a RF-6 |
| `app.json` / `package.json` (existentes) | Confirmar que la dependencia `expo-notifications` y la configuración del canal nativo estén presentes; no introducir permisos extra no autorizados por HU-006. | RF-5, RF-7 |
| `docs/historias/HU-004.md` y `specs/004-hu004-notificaciones/spec.md` | Mantener trazabilidad con el escenario de usuario y la especificación. | RF-1 a RF-7 |

## Dominio puro

- El fin de fase debe ser una transición de dominio y no depender de ticks visuales para decidir si la fase terminó.
- La fuente de verdad temporal sigue siendo la marca de vencimiento (`endsAt`), llevada por HU-003; el aviso solo se activa cuando la fase ya concluyó de forma determinista.
- La notificación no debe ser un reemplazo de la lógica de temporizador ni de la transacción de fase; debe reaccionar a la transición ya resuelta.
- Las reglas de finalización y la siguiente fase son responsabilidad de HU-001 y HU-002; esta historia solo adjudica la señal externa del fin.

## Permisos y comportamiento del sistema

- El primer uso del temporizador debe explicar por qué se solicita el permiso de notificaciones y pedirlo antes del primer aviso real.
- Si el permiso se niega, la app debe continuar funcionando y mostrar que el aviso puede quedar limitado.
- La programación del aviso debe cancelar los avisos previos al pausar, reiniciar o iniciar otra fase.
- Si el sistema operativo, el fabricante o la configuración del teléfono limitan sonido, vibración o alarma al estar en silencio o No molestar, la aplicación debe informar esa limitación sin presentar una promesa imposible como si fuera verificada.
- No se incorpora una garantía de anular el modo silencio; solo se documenta y se valida lo que el dispositivo permite.

## Interfaz y flujo

- Al llegar a cero, mostrar una notificación local o un aviso visible que identifique la fase terminada.
- En sonido activo, emitir una señal sonora y vibratoria con la notificación.
- En silencio/vibración, intentar la alarma y la vibración, y mostrar el aviso en la pantalla de bloqueo si el sistema lo admite.
- Al tocar la notificación o el botón de detener, silenciar la alarma y abrir la aplicación en la siguiente fase.
- Mantener mensajes en español y evitar lenguaje que afirme que la app “logra” evadir silencio o No molestar cuando no haya evidencia del dispositivo.

## Algoritmo en pseudocódigo

```text
si la fase llega a cero:
  transicionar al final de fase
  si permiso de notificaciones está disponible:
    programar aviso con identificador de fase
  si permiso fue denegado:
    mostrar advertencia de limitación pero conservar el temporizador
  si la alarma se activa:
    permitir detener desde notificación o botón
    al detener:
      cancelar alarma
      abrir app con la siguiente fase
```

## Pruebas y validación

- Pruebas Jest para el dominio y la programación de notificaciones: permisos, denegación, cancelación y errores.
- Pruebas del hook de sesión para verificar que a la finalización le sigue la programación del aviso y la cancelación al pausar o reiniciar.
- Validación manual en Android/Expo Go para: sonido activo, modo silencio, bloqueo de pantalla, permiso en primer uso, denegación y respuesta a la notificación.
- Cada prueba del dispositivo debe registrar si la restricción del sistema operativo impidió la alarma o la vibración, sin afirmar que la app la “superó”.
- La evidencia de RF-7 requiere un reporte explícito del fabricante/dispositivo/OS con la verificación real, no suposición técnica.

## Riesgos y vacíos

- La restricción de sonido, vibración o alarma bajo silencio/No molestar no está garantizada por la plataforma ni por las dependencias. El comportamiento real debe validarse en Android con evidencia de dispositivo.
- Queda pendiente la decisión explícita de producto sobre cómo comunicar la limitación al estudiante cuando el dispositivo no lo permite; la especificación actual solo exige no prometer la garantía imposible.
