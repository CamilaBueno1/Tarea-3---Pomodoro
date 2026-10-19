# MEMORY.md – Calculadora de Supletorio
Memoria del proyecto entre sesiones. Máximo ~50 líneas.

## Estado actual
- HU-001–HU-005 están implementadas; la verificación manual Android de
  permisos, notificaciones y pantallas sigue pendiente.
- HU-006 tiene spec y plan aprobados, T1–T10 completadas y validación conforme
  a los criterios; ver `specs/006-hu006-offline-sin-anuncios/`. El usuario
  confirmó las pruebas Android físicas/offline y Jest pasa con 102 pruebas.
- La programación del temporizador limpia notificaciones pendientes y al
  finalizar en primer plano conserva el aviso de sistema sin emitir otro
  manual. Jest (102 pruebas) y TypeScript pasan; la validación audible en
  Android real sigue pendiente.
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
- Consultar el estado SDD general del proyecto.
- Siguiente comando SDD: `/sdd-status`.