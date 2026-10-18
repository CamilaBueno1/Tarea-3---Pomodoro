# Tareas – HU-004

Estado: Borrador
Spec: [spec.md](./spec.md)
Plan: [plan.md](./plan.md)
HU: [HU-004](../../docs/historias/HU-004.md)

Las tareas están propuestas para ejecución secuencial y deben quedar validadas
con pruebas automatizadas y con verificación manual en dispositivo real.

- [ ] **T1. Escribir pruebas de la transición de fase y el aviso.** RF-1, RF-4.
  Hecho cuando: Jest cubre el momento en que una fase llega a cero, dispara la
  transición y deja disponible la siguiente fase para la app.
- [ ] **T2. Implementar la transición de fin de fase y la conexión con aviso.**
  RF-1, RF-4.
  Hecho cuando: la finalización de una fase queda como evento determinista y el
  consumidor de la app puede activar la señal de aviso sin depender de renderes
  visuales.
  Depende de T1.
- [ ] **T3. Escribir pruebas del adaptador de notificaciones.** RF-1, RF-2,
  RF-5, RF-6, RF-7.
  Hecho cuando: el adaptador simula permisos, programación, cancelación y
  errores del sistema; la prueba exige manejar denegación y restricciones del
  dispositivo sin prometer resultados imposibles.
- [ ] **T4. Implementar el adaptador local de notificaciones.** RF-1, RF-2,
  RF-5, RF-6, RF-7.
  Hecho cuando: la app solicita el permiso cuando corresponde, programa un
  aviso único por fase y cancela avisos previos al pausar o reiniciar; si se
  deniega el permiso, expone la limitación y no presenta el aviso como
  garantizado.
  Depende de T2 y T3.
- [ ] **T5. Escribir pruebas del proveedor de sesión y del flujo de permiso.**
  RF-1 a RF-6.
  Hecho cuando: React Native Testing Library cubre la carga inicial, la
  solicitud de permiso, la denegación y la reacción ante finalización de fase
  con aviso programado o limitado.
  Depende de T4.
- [ ] **T6. Implementar el flujo de sesión y la interacción del permiso.**
  RF-1 a RF-6.
  Hecho cuando: el flujo de la app explica el permiso al primer uso, conserva
  el temporizador si se niega, dispara la alarma o aviso visible cuando es
  posible y cancela el aviso al detenerse.
  Depende de T4 y T5.
- [ ] **T7. Escribir pruebas de la pantalla de bloqueo y mensajes de limitación.**
  RF-3, RF-4, RF-7.
  Hecho cuando: la UI verifica que el aviso identifica la fase terminada,
  permite detener la alarma y muestra un texto claro cuando el sistema no
  ejecuta sonido o vibración.
  Depende de T6.
- [ ] **T8. Implementar la UI y los mensajes de restricción del sistema.**
  RF-3, RF-4, RF-7.
  Hecho cuando: la aplicación abre la siguiente fase al detener el aviso,
  presenta un mensaje en español y no afirma que la alarma pudo evadir silencio
  o No molestar cuando el dispositivo lo impidió.
  Depende de T7.
- [ ] **T9. Validar HU-004 en Android/Expo Go.** RF-1 a RF-7.
  Hecho cuando: se comprueba sonido activo, modo silencio/vibración, pantalla de
  bloqueo, permiso en primer uso, denegación y evidencia del comportamiento real
  del dispositivo; se registra la limitación del fabricante o del sistema si se
  presenta.
  Depende de T8.

## Dependencias y límites

- Dependencia principal: T1 → T2 → T4 → T5 → T6 → T7 → T8 → T9.
- T3 debe ejecutarse junto con T4 para mantener la lógica de permiso y la
  gestión de restricciones alineadas con el comportamiento real del sistema.
- Las pruebas de T9 requieren Android o Expo Go con acceso al dispositivo real;
  no se puede asumir que la plataforma garante sonido, vibración o alarma en
  silencio ni No molestar.
- La implementación no debe inventar un “modo seguro” o un bypass del sistema
  operativo; solo puede documentar y explicitar la limitación cuando el
  dispositivo la impone.
