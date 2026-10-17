# Spec 003 - Mantener el conteo en segundo plano

Estado: Aprobada para implementación
HU de origen: docs/historias/HU-003.md
Decisiones: decisiones.md

## Contexto y objetivo

Conservar y restaurar localmente el estado Pomodoro para que el tiempo de una
fase corriendo transcurra correctamente al bloquear el celular o cerrar la
aplicación.

## Usuarios

- Estudiante.

## Requisitos funcionales

- **RF-1:** MIENTRAS una fase está corriendo, EL SISTEMA conserva la hora
  absoluta de finalización y muestra el restante calculado con el reloj actual.
  Origen: HU-003, «Bloquear el celular», decisión D-001.
- **RF-2:** CUANDO el estudiante vuelve a abrir la aplicación, EL SISTEMA
  restaura la sesión guardada y calcula el tiempo restante a partir de la hora
  de finalización, sin reiniciar la duración. Origen: HU-003, «Cerrar la
  aplicación», decisión D-001.
- **RF-3:** CUANDO la fase guardada terminó mientras la aplicación estaba
  cerrada, EL SISTEMA procesa su finalización una vez y deja preparada la
  siguiente fase según HU-002. Origen: HU-003, «El tiempo termina con la
  aplicación cerrada», decisión D-001.
- **RF-4:** CUANDO el estudiante pausa y cierra la aplicación, EL SISTEMA
  restaura el temporizador pausado con el mismo tiempo restante. Origen: HU-003,
  «Pausar antes de cerrar», decisión D-002.
- **RF-5:** CUANDO una fase corriendo termina con la aplicación cerrada, EL
  SISTEMA presenta una notificación local que identifica la fase terminada.
  Origen: HU-003, «El tiempo termina con la aplicación cerrada», decisión D-002
  y autorización del estudiante de incluir notificaciones locales mínimas.
- **RF-6:** CUANDO el temporizador se pausa o reinicia, EL SISTEMA cancela la
  notificación de fin previamente programada; una fase pausada no produce un
  aviso. Origen: HU-003, «Pausar antes de cerrar», decisión D-002.
- **RF-7:** CUANDO la aplicación no puede leer o persistir una sesión, EL
  SISTEMA informa el error sin afirmar que el cambio se guardó. Origen:
  Constitución, principio 6, decisión D-003.
- **RF-8:** CUANDO se necesita programar un aviso por primera vez, EL SISTEMA
  explica el uso de notificaciones y solicita permiso; si se deniega, informa
  que no habrá aviso y conserva el funcionamiento del temporizador. Origen:
  HU-004, «Permiso de notificaciones», decisión D-002.
- **RF-9:** CUANDO una fase vence con la aplicación cerrada y la estudiante
  vuelve a abrirla, EL SISTEMA indica que la fase anterior terminó y muestra
  la siguiente fase preparada. Origen: HU-003, «El tiempo termina con la
  aplicación cerrada», decisión D-001.

## Requisitos no funcionales

- Persistencia y notificaciones funcionan localmente, sin conexión.
- `endsAt` es la fuente temporal de verdad de una fase corriendo.
- La notificación respeta restricciones y permisos del sistema operativo. No se
  promete una alarma audible o vibración con el teléfono en silencio.

## Casos límite

- Una sesión pausada se restaura sin `endsAt` ni aviso programado.
- Si `endsAt` ya pasó, la fase concluye una vez y se conserva la siguiente
  fase preparada.
- Si el permiso de notificación se deniega, se mantiene el temporizador y se
  indica la limitación.
- Los datos guardados malformados o los errores del almacenamiento se hacen
  visibles; no se ocultan con éxito aparente.

## Fuera de alcance

- Alarmas que interrumpan silencio/No molestar, servicios en primer plano o
  garantías de ejecución de JavaScript mientras la app está cerrada (HU-004 y
  limitaciones del sistema operativo).
- Sincronización remota, cuentas o telemetría.
- El flujo y las transiciones entre fases, cubiertos por HU-002.

## Criterios de finalización

- Pruebas deterministas demuestran cálculo tras segundo plano, restauración
  pausada, expiración única y manejo de errores.
- En Android se comprueban cierre/reapertura, notificación local, cancelación
  al pausar y permisos; se registra cualquier restricción del sistema.
