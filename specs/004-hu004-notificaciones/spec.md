# Spec 004 - Aviso al finalizar la fase

Estado: Aprobada y completada
HU de origen: docs/historias/HU-004.md
Decisiones: decisiones.md

## Contexto y objetivo

Asegurar que el estudiante reciba un aviso claro cuando una fase de estudio o descanso termina, incluso si el celular está en modo silencioso, sin depender de que la aplicación permanezca abierta en pantalla.

Esta propuesta desarrolla HU-004. La lógica del temporizador y la transición de fases siguen perteneciendo a HU-001 y HU-002; la persistencia y el cierre de la app ya quedaron cubiertos por HU-003.

## Usuarios

- Estudiante.

## Requisitos funcionales

- **RF-1:** CUANDO una fase llega a cero, EL SISTEMA activa un aviso local que identifica la fase terminada para que el estudiante pueda cambiar de actividad sin mirar la pantalla. Origen: HU-004, escenario «Aviso con el celular en sonido».
- **RF-2:** CUANDO el teléfono tiene el sonido activado, EL SISTEMA emite una notificación con sonido y vibración para informar que la fase terminó. Origen: HU-004, escenario «Aviso con el celular en sonido».
- **RF-3:** CUANDO el teléfono está en modo silencio o vibración, EL SISTEMA intenta avisar con alarma y vibración y presenta el aviso en la pantalla de bloqueo. Origen: HU-004, escenario «Aviso con el celular en silencio».
- **RF-4:** CUANDO el estudiante toca la notificación o el botón de detener del aviso, EL SISTEMA silencia la alarma y abre la aplicación mostrando la siguiente fase. Origen: HU-004, escenario «Detener el aviso».
- **RF-5:** CUANDO la aplicación necesita consultar el permiso de notificaciones por primera vez, EL SISTEMA explica para qué lo solicita y lo pide explícitamente antes de usar el aviso. Origen: HU-004, escenario «Permiso de notificaciones».
- **RF-6:** SI el estudiante no concede el permiso de notificaciones, ENTONCES EL SISTEMA informa la limitación y conserva el funcionamiento del temporizador sin afirmar una notificación garantizada. Origen: HU-004, escenario «Permiso de notificaciones».
- **RF-7:** CUANDO el sistema operativo, el fabricante o la configuración del dispositivo restringen sonido, vibración o alarma en silencio o No molestar, EL SISTEMA no promete que el aviso evada esa restricción y lo comunica de forma clara al estudiante. Origen: nota de implementación de HU-004 y decisión documentada en `decisiones.md`.

## Requisitos no funcionales

- El aviso debe funcionar localmente, sin conexión a internet ni backend.
- La experiencia de notificación debe respetar permisos y restricciones del sistema operativo.
- La alarma y la vibración deben ser una señal de finalización de fase, no una garantía de interrupción forzada de silencio o No molestar.
- Los mensajes visibles del sistema deben presentarse en español y aclarar si el aviso quedó limitado por el dispositivo.
- La verificación final requiere pruebas de UI manuales en Expo Go o Android, además de pruebas automatizadas de la lógica del temporizador y las decisiones relacionadas.

## Casos límite

- El dispositivo tiene sonido activo y la notificación llega con audio y vibración.
- El dispositivo está en silencio o vibración y la alarma/pantalla de bloqueo puede producir una señal, pero el sistema operativo puede limitarla.
- El estudiante deniega el permiso de notificaciones; el temporizador continúa y el aviso queda limitado.
- La notificación se activa con la app cerrada, bloqueada o en segundo plano; la aplicación no debe requerir que el usuario la tenga abierta para mostrar el aviso.
- El sistema operativo impide la reproducción de alarma o vibración; la app debe informar la limitación y no presentar un resultado imposible como verificado.

## Fuera de alcance

- Garantizar que una alarma siempre interrumpa silencio, No molestar o restricciones del fabricante.
- Sincronización remota, cuentas, analítica o servicios externos.
- La lógica de alternancia de fases y el conteo del temporizador, que pertenecen a HU-001 y HU-002.
- La persistencia y restauración del estado con la app cerrada, definida en HU-003.

## Criterios de finalización

- RF-1 a RF-6 se verifican con pruebas automatizadas y revisión manual del flujo en Android o Expo Go.
- La notificación con sonido y vibración se comprueba en un dispositivo con sonido activo.
- La alarma y la vibración en silencio se comprueban con limitaciones del sistema operativo y se documenta cualquier bloqueo del fabricante.
- El flujo de permiso se valida con el primer uso de la app y la respuesta a denegar permisos.
- RF-7 requiere evidencia explícita del propio dispositivo: se registra si el sistema no ejecuta el aviso audible o vibratorio en silencio o No molestar.

## Dudas abiertas

- Ninguna. Conforme a `decisiones.md`, la aplicación respeta los permisos y
  restricciones del sistema operativo y no garantiza sonido o vibración en
  silencio o No molestar. El resultado depende del dispositivo.
