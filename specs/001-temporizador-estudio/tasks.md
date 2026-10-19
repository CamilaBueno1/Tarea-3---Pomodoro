# Tareas – Temporizador de estudio

Estado: aprobado y completado
Spec: [spec.md](./spec.md)  
Plan aprobado: [plan.md](./plan.md)  
HU: [HU-001](../../docs/historias/HU-001.md)

## Dominio

- [x] **T1. Escribir pruebas para iniciar y mostrar el tiempo.** RF-1, RF-2.
  Hecho cuando: las pruebas Jest deterministas verifican la creación de un
  temporizador corriendo desde una duración recibida y su formato en minutos y
  segundos, incluyendo ceros iniciales; las pruebas fallan antes de existir la
  implementación.
- [x] **T2. Implementar el inicio y el cálculo/format del tiempo restante.**
  RF-1, RF-2.
  Hecho cuando: las pruebas de T1 pasan con funciones puras que reciben el
  instante actual, y el temporizador corriendo deriva su restante de
  `targetEndTime`; `npx jest` pasa.
- [x] **T3. Escribir pruebas para pausa, reanudación y reinicio.** RF-3, RF-4,
  RF-5, D-001.
  Hecho cuando: pruebas Jest controladas verifican la conservación del restante
  al pausar, la reanudación desde ese restante y el reinicio confirmado tanto
  corriendo como pausado; comprueban asimismo la conservación del estado
  previo.
- [x] **T4. Implementar las transiciones de pausa, reanudación y reinicio.**
  RF-3, RF-4, RF-5, D-001.
  Hecho cuando: todas las pruebas de dominio de T1 y T3 pasan con transiciones
  puras y sin alterar el contrato `targetEndTime`; `npx jest` pasa.

## Integración y pantalla

- [x] **T5. Conectar el hook React al dominio.** RF-1, RF-2, RF-3, RF-4, RF-5.
  Hecho cuando: `use-study-timer` expone estado y acciones del dominio y el
  refresco visual vuelve a calcular el restante desde el reloj sin usar un
  contador decreciente como fuente de verdad; TypeScript pasa. No se añade una
  duración por defecto.
- [x] **T6. Escribir pruebas de pantalla para controles y restante.** RF-1,
  RF-2, RF-3, RF-4.
  Hecho cuando: las pruebas de React Native Testing Library verifican texto
  visible en español, tiempo formateado, inicio, pausa/reanudación y etiquetas
  de accesibilidad; las pruebas fallan para la pantalla de plantilla antes de
  implementarla. Las pruebas dirigidas fallan con la pantalla de plantilla,
  como se esperaba antes de T7.
- [x] **T7. Reemplazar la pantalla principal con la interfaz del temporizador.**
  RF-1, RF-2, RF-3, RF-4. Depende también de la configuración real de HU-005
  (spec 005, T7: proveedor compartido cargado desde persistencia local).
  Hecho cuando: se muestra el tiempo y controles correspondientes al estado,
  todo texto visible está en español y los controles usan áreas seguras,
  `StyleSheet`, contraste de marca y etiquetas accesibles; pasan las pruebas
  de T6 y `npx tsc --noEmit`.
- [x] **T8. Escribir pruebas de confirmación y cancelación del reinicio.**
  RF-5, RF-6, D-001.
  Hecho cuando: pruebas de pantalla cubren confirmar, cancelar y descartar el
  diálogo, para estados corriendo y pausado, verificando que cancelar/descartar
  no cambian tiempo ni estado. Las pruebas dirigidas fallan antes de T9
  porque todavía no existe el control de reinicio.
- [x] **T9. Implementar la confirmación del reinicio en la interfaz.** RF-5,
  RF-6, D-001.
  Hecho cuando: el diálogo del sistema precede al reinicio; confirmar restaura
  el tiempo inicial conservando el estado previo, cancelar o descartar deja
  intactos tiempo y estado, y pasan las pruebas de T8.
- [x] **T10. Validar la historia en Expo Go o emulador Android.** RF-1 a RF-6.
  Hecho cuando: se comprueban vertical y giro, áreas seguras, visibilidad de
  controles, lectura clara del estado sin depender solo del color, inicio,
  pausa, reanudación, reinicio confirmado/cancelado y accesibilidad. Los
  puntos sobre teclado y ajustes de duración no aplican porque esta historia
  no contiene formularios; persistencia al cerrar queda fuera de alcance
  (HU-003). Registrar el resultado antes de cerrar la tarea.
  Resultado: validación manual en Android confirmada por el usuario. No se
  registraron modelo ni versión del dispositivo.

## Dependencias y límite de alcance

- T2 depende de T1; T3 depende de T2; T4 depende de T3; T5 depende de T4; T6
  depende de T5; T7 depende de T6 y de la fuente real de configuración de
  HU-005 (spec 005, T7); T8 depende de T7; T9 depende de T8; T10 depende de T9.
- La duración debe provenir de la configuración; el repositorio aún no ofrece
  esa fuente y no se debe inventar un valor por defecto. La conexión funcional
  a configuración real es prerrequisito de HU-005. Si sigue ausente al
  implementar T5/T7, detenerse antes de simularla y aclarar la dependencia.
- No implementar alternancia de fases, persistencia/restauración al cerrar,
  notificaciones ni comportamiento de ajustes (HU-002 a HU-005).
