# MEMORY.md – Calculadora de Supletorio
Memoria del proyecto entre sesiones. Máximo ~50 líneas.

## Estado actual
- HU-001–HU-005 están implementadas; las verificaciones manuales Android de
  permisos, notificaciones y pantallas siguen pendientes.
- HU-004 documenta las notificaciones locales, sus límites y permisos en
  `specs/004-hu004-notificaciones/`.
- En Expo Go, las operaciones de permisos y avisos no cargan ni invocan el
  módulo nativo; el temporizador mantiene su funcionamiento sin avisos.
- Expo Router agrupa Temporizador y Ajustes bajo `(tabs)`; las rutas web son
  `/` y `/settings`.
- Verificación anterior: 96 pruebas, TypeScript y exportación Android pasan.
  La regresión del módulo nativo pasa pruebas dirigidas y TypeScript.
  No hay dispositivo conectado para la validación manual.

## Decisiones (y por qué)
- (vacío por ahora)

## Aprendizajes y errores a evitar
- (vacío por ahora)

## Próximos pasos
- Confirmar en Expo Go que el temporizador abre sin el error del módulo nativo.
- Crear un development build y validar notificaciones locales y permisos en
  Android real, incluyendo restricciones de sonido y vibración.
- Resolver la decisión pendiente de silencio/No molestar de HU-004.
- Siguiente comando: `/sdd-verify 004-hu004-notificaciones`.