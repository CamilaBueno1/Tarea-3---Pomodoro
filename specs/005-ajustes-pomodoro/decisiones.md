# Decisiones – Spec 005

Estado: Aprobado
Historia: HU-005
Origen: aclaraciones explícitas del estudiante para preparar esta propuesta.

## D-001: Rangos inclusivos

- **Decisión propuesta:** Las duraciones de estudio, descanso corto y descanso
  largo aceptan minutos enteros de 1 a 120 inclusive. La cantidad de
  pomodoros por ciclo acepta valores enteros de 1 a 12 inclusive.

## D-002: Valores predeterminados

- **Decisión propuesta:** La configuración inicial y el restablecimiento
  confirmado usan 25 minutos de estudio, 5 minutos de descanso corto, 15
  minutos de descanso largo y 4 pomodoros por ciclo.

## D-003: Ubicación de ajustes

- **Decisión propuesta:** La configuración se presenta en la segunda pestaña,
  titulada «Ajustes».

## D-004: Confirmación al restablecer

- **Decisión propuesta:** El restablecimiento solicita confirmación explícita;
  solo al confirmar se aplican los valores predeterminados. Cancelar conserva
  los ajustes vigentes.

## D-005: Persistencia local

- **Decisión propuesta:** Persistir los ajustes localmente mediante
  `@react-native-async-storage/async-storage`; no usar un servicio remoto para
  esta configuración.

## D-006: Cambiar la duración de una fase activa

- **Decisión propuesta:** Guardar una duración distinta no altera la fase que
  ya está en curso; la nueva duración se usa desde las fases siguientes.

## D-007: Cambiar la cantidad de pomodoros

- **Decisión propuesta:** Un cambio de cantidad no modifica el objetivo del
  ciclo en curso; se aplica desde el ciclo siguiente.

## D-008: Confirmación al guardar modificaciones

- **Decisión propuesta:** Solicitar confirmación explícita antes de aplicar
  modificaciones de ajustes, de acuerdo con el principio 6 de la Constitución.
