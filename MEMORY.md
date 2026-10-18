# MEMORY.md – Calculadora de Supletorio
Memoria del proyecto entre sesiones. Máximo ~50 líneas.

## Estado actual
- HU-001 y HU-005 tienen implementación y verificaciones automatizadas
  completadas; sus pruebas manuales en dispositivo siguen pendientes.
- HU-002 T1–T6 y HU-003 T1–T8 están completadas; sus tareas de verificación
  manual en Android siguen pendientes.
- `npx jest --runInBand` pasa (10 suites, 87 pruebas), igual que
  `npx tsc --noEmit` y `npx expo export --platform web`.
- El APK debug Android compila; `adb devices` no reporta dispositivos para
  completar las pruebas manuales.
- Se corrigió la navegación de pestañas web y se verificó en navegador que
  Temporizador y Ajustes abren sus pantallas.

## Decisiones (y por qué)
- (vacío por ahora)

## Aprendizajes y errores a evitar
- (vacío por ahora)

## Próximos pasos
- Completar las verificaciones manuales Android pendientes; continuar con
  `/sdd-implement 003-hu003-persistencia-segundoplano --task 9`.