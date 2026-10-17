# Spec 005 - Ajustes de Pomodoro

Estado: Aprobada
HU de origen: docs/historias/HU-005.md

## Contexto y objetivo

Permitir que el estudiante configure las duraciones del estudio y los
descansos, así como la cantidad de pomodoros antes del descanso largo, y que
sus ajustes se conserven localmente.

Esta propuesta desarrolla HU-005. Los requisitos de temporizador y
alternancia de fases siguen perteneciendo a HU-001 y HU-002, respectivamente.

## Usuarios

- Estudiante.

## Historias de usuario

Como estudiante, quiero cambiar la duración del estudio, de los descansos y la
cantidad de pomodoros antes del descanso largo, para adaptar la técnica a mi
ritmo.

## Definiciones

- **Duración de fase:** duración en minutos configurada para estudio, descanso
  corto o descanso largo.
- **Ciclo actual:** grupo de pomodoros cuyo objetivo de cantidad quedó fijado
  al comenzar ese ciclo. El cambio de ese objetivo se aplica al siguiente
  ciclo.
- **Fase siguiente:** próxima fase que comience después de guardar el ajuste;
  una fase ya iniciada conserva su duración inicial.

## Requisitos funcionales

- **RF-1:** CUANDO el estudiante guarda una duración de estudio, descanso corto
  o descanso largo entre 1 y 120 minutos inclusive, EL SISTEMA acepta el valor
  para las fases que comiencen después del guardado. Origen: HU-005, escenario
  «Cambiar un tiempo», y decisión D-001 de `decisiones.md`.
- **RF-2:** CUANDO el estudiante guarda una cantidad de pomodoros por ciclo
  entre 1 y 12 inclusive, EL SISTEMA acepta el valor para los ciclos que
  comiencen después del ciclo actual. Origen: decisiones D-001 y D-007 de
  `decisiones.md`.
- **RF-3:** SI el estudiante intenta guardar un campo vacío o un valor fuera
  del rango permitido, ENTONCES EL SISTEMA no guarda el cambio y le indica el
  rango válido para ese campo: 1–120 minutos para cada duración y 1–12 para la
  cantidad de pomodoros. Origen: HU-005, escenario «Ingresar un valor no
  válido», y decisión D-001 de `decisiones.md`.
- **RF-4:** CUANDO el estudiante abre Ajustes por primera vez o restablece los
  ajustes y confirma, EL SISTEMA usa 25 minutos de estudio, 5 minutos de
  descanso corto, 15 minutos de descanso largo y 4 pomodoros por ciclo. Origen:
  HU-005, escenario «Volver a los valores por defecto», y decisión D-002 de
  `decisiones.md`.
- **RF-5:** CUANDO el estudiante guarda cambios válidos, EL SISTEMA los
  conserva localmente para que sigan disponibles después de cerrar y volver a
  abrir la aplicación. Origen: HU-005, escenario «Cambiar un tiempo», y
  decisión D-005 de `decisiones.md`.
- **RF-6:** CUANDO el estudiante modifica la duración correspondiente a una
  fase en curso, EL SISTEMA mantiene para esa fase el tiempo inicial con el que
  comenzó y aplica la duración modificada a las fases siguientes. Origen:
  HU-005, escenario «Cambiar un tiempo con una fase en curso», y decisión D-006
  de `decisiones.md`.
- **RF-7:** MIENTRAS transcurre un ciclo, EL SISTEMA conserva para ese ciclo la
  cantidad de pomodoros que tenía configurada al comenzar y aplica una cantidad
  modificada desde el ciclo siguiente. Origen: decisión D-007 de
  `decisiones.md`.
- **RF-8:** CUANDO el estudiante solicita guardar modificaciones válidas de
  ajustes, EL SISTEMA solicita confirmación explícita antes de aplicarlas.
  Origen: Constitución, principio 6; HU-005, escenario «Cambiar un tiempo», y
  decisión D-008 de `decisiones.md`.
- **RF-9:** CUANDO el estudiante solicita restablecer los ajustes, EL SISTEMA
  solicita confirmación explícita y, si confirma, aplica los valores
  predeterminados; si cancela, conserva los valores vigentes. Origen: HU-005,
  escenario «Volver a los valores por defecto», Constitución, principio 6, y
  decisión D-004 de `decisiones.md`.
- **RF-10:** CUANDO la aplicación no puede leer o guardar los ajustes locales,
  EL SISTEMA informa claramente que la operación falló y no presenta como
  guardado un cambio que no se haya persistido correctamente. Origen:
  Constitución, principio 6, y decisión D-005 de `decisiones.md`.
- **RF-11:** CUANDO el estudiante abre la segunda pestaña de la aplicación,
  EL SISTEMA muestra la pantalla «Ajustes» con los campos de configuración de
  HU-005. Origen: decisión D-003 de `decisiones.md`.

## Requisitos no funcionales

- Los ajustes se almacenan localmente, sin requerir conexión a internet, en
  concordancia con HU-006 y la dependencia de almacenamiento autorizada por el
  estudiante.
- No se añaden cuentas, servicios remotos, analítica ni publicidad.
- Los mensajes, etiquetas y confirmaciones visibles se presentan en español.
- Los cambios de configuración deben poder verificarse con pruebas Jest y
  validación manual de la interfaz en Expo Go o emulador Android.

## Casos límite

- Los extremos 1 y 120 son válidos para cada duración; 0 y 121 no lo son.
- Los extremos 1 y 12 son válidos para la cantidad de pomodoros; 0 y 13 no lo
  son.
- Un campo vacío impide guardar el conjunto de cambios.
- Cancelar una confirmación de guardado o de restablecimiento no altera la
  configuración ya aplicada.
- Cambiar una duración no reemplaza ni reinicia la duración inicial de una fase
  activa.
- Cambiar la cantidad de pomodoros no modifica el objetivo del ciclo en curso.
- Un fallo de almacenamiento debe ser visible y no debe presentarse al usuario
  como una operación exitosa.

## Fuera de alcance

- Iniciar, pausar, reanudar o reiniciar el temporizador, especificados en
  HU-001.
- Las transiciones y el conteo de fases/ciclos, especificados en HU-002. HU-005
  define el contrato de cuándo toma efecto el ajuste, pero requiere que HU-002
  consuma la configuración.
- Recuperar una sesión al cerrar la aplicación o el comportamiento en segundo
  plano, especificados en HU-003.
- Notificaciones y alarmas, especificadas en HU-004.
- Sincronización, cuentas o almacenamiento remoto.

## Criterios de finalización

- RF-1 a RF-3 se verifican con pruebas de valores válidos en límites y valores
  inválidos, campo vacío y mensajes de rango.
- RF-4 se verifica tanto al cargar por primera vez como después de confirmar el
  restablecimiento.
- RF-5 y RF-10 se verifican guardando, reiniciando la aplicación, operando sin
  conexión y simulando fallos de lectura/escritura.
- RF-6 se verifica con una fase en curso cuyo tiempo inicial permanece
  inalterado tras guardar otra duración y cuya siguiente fase usa el valor
  nuevo.
- RF-7 se verifica al cambiar la cantidad en un ciclo en curso: ese ciclo
  conserva su objetivo y el siguiente toma la cantidad nueva. La prueba de
  integración depende de que HU-002 disponga de implementación de ciclos.
- RF-8, RF-9 y RF-11 se verifican en la interfaz, incluidas confirmación,
  cancelación y la segunda pestaña «Ajustes».

## Dudas abiertas

- Ninguna de las decisiones funcionales consultadas queda pendiente. La
  integración y verificación de RF-7 depende de HU-002, aún no implementada en
  el alcance revisado.
