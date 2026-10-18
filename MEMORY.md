# MEMORY.md – Calculadora de Supletorio
Memoria del proyecto entre sesiones. Máximo ~50 líneas.

## Estado actual
- La spec y el plan de HU-004 quedan redactados en borrador y trazan los
  requisitos de notificación, permiso y limitación del sistema operativo.
- HU-001 y HU-005 tienen implementación y verificaciones automatizadas
  completadas; sus pruebas manuales en dispositivo siguen pendientes.
- HU-002 T1–T6 y HU-003 T1–T8 están completadas; sus tareas de verificación
  manual en Android siguen pendientes.
- La notificación local de fin de fase ya suena y vibra cuando el sistema lo
  permite, alineado con HU-004; las pruebas de notificaciones y la pantalla de
  inicio pasan.
- `npx jest --runInBand` pasa (10 suites, 87 pruebas), igual que
  `npx tsc --noEmit` y `npx expo export --platform web`.
- El rediseño visual del temporizador está implementado; sus 11 pruebas,
  TypeScript y la exportación web pasan. Se verificó el render web en móvil y
  escritorio; la comprobación Android manual sigue pendiente.
- El APK debug Android compila; `adb devices` no reporta dispositivos para
  completar las pruebas manuales.

## Decisiones (y por qué)
- (vacío por ahora)

## Aprendizajes y errores a evitar
- (vacío por ahora)

## Próximos pasos
- Resolver la decisión de producto sobre la comunicación de limitaciones en
  silencio/No molestar para HU-004 antes de cerrar la implementación.
- Completar la validación manual Android de permiso, sonido, vibración y
  restricciones del sistema para HU-004.
- Completar la validación manual del rediseño en Expo Go / Android.
- Registrar cualquier limitación del fabricante al cerrar la historia en
  dispositivo real.
- Siguiente comando: `/sdd-clarify 004-hu004-notificaciones` para resolver la
  decisión de producto pendiente.