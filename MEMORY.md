# MEMORY.md – Calculadora de Supletorio
Memoria del proyecto entre sesiones. Máximo ~50 líneas.

## Estado actual
- HU-001–HU-005 están implementadas; la verificación manual Android de
  permisos, notificaciones y pantallas sigue pendiente.
- HU-006 tiene spec y plan aprobados; T1–T6 están completadas. T7–T9 y T10
  siguen pendientes de validación manual en `specs/006-hu006-offline-sin-anuncios/`.
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
- Continuar HU-006 con validación manual de T7–T9 en Expo Go o Android;
  después cerrar T10 con la suite completa y la revisión visual registrada.
- Siguiente comando: `/sdd-implement 006-hu006-offline-sin-anuncios T7`.  