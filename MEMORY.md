# MEMORY.md – Calculadora de Supletorio
Memoria del proyecto entre sesiones. Máximo ~50 líneas.

## Estado actual
- HU-001 a HU-006 están implementadas, completadas y verificadas mediante
  pruebas automatizadas y validaciones manuales Android confirmadas por el
  usuario. El detalle está en `specs/001-*/` a `specs/006-*/`.
- La programación del temporizador limpia notificaciones pendientes y al
  finalizar en primer plano conserva el aviso de sistema sin emitir otro
  manual. Jest (102 pruebas) y TypeScript pasan; el comportamiento audible
  depende de las restricciones del dispositivo y no se garantiza en silencio
  o No molestar.
- Se añadió la documentación general del proyecto en `README.md`, con
  descripción, instalación, uso y estructura del repositorio.
- Expo Router agrupa Temporizador y Ajustes bajo `(tabs)`; las rutas web son
  `/` y `/settings`.
- Verificación automatizada actual: Jest (102 pruebas) y TypeScript pasan.

## Decisiones (y por qué)
- (vacío por ahora)

## Aprendizajes y errores a evitar
- (vacío por ahora)

## Próximos pasos
- No hay tareas pendientes de HU-001 a HU-006.
- Siguiente comando SDD: `/sdd-status`.