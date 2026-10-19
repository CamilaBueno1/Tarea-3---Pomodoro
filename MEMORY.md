# MEMORY.md – Calculadora de Supletorio
Memoria del proyecto entre sesiones. Máximo ~50 líneas.

## Estado actual
- HU-001–HU-005 están implementadas; la verificación manual Android de
  permisos, notificaciones y pantallas sigue pendiente.
- HU-006 documenta el uso sin registro, sin internet y sin publicidad en
  `specs/006-hu006-offline-sin-anuncios/`.
- Se añadió la documentación general del proyecto en `README.md`, con
  descripción, instalación, uso y estructura del repositorio.
- Expo Router agrupa Temporizador y Ajustes bajo `(tabs)`; las rutas web son
  `/` y `/settings`.
- Verificación anterior: 96 pruebas, TypeScript y exportación Android pasan.
  No hay dispositivo conectado para la validación manual.

## Decisiones (y por qué)
- (vacío por ahora)

## Aprendizajes y errores a evitar
- (vacío por ahora)

## Próximos pasos
- Validar en Expo Go la historia HU-006 para confirmar que el flujo de
  primer uso, la persistencia local y la ausencia de publicidad cumplen la
  especificación.
- Crear una verificación de Android real para revisar restricciones del
  sistema operativo y la disponibilidad de avisos sin conexión.
- Siguiente comando: `/sdd-verify 006-hu006-offline-sin-anuncios`.