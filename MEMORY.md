# MEMORY.md – Calculadora de Supletorio
Memoria del proyecto entre sesiones. Máximo ~50 líneas.

## Estado actual
- HU-001 a HU-006 están implementadas, completadas y verificadas mediante
  pruebas automatizadas y validaciones manuales Android confirmadas por el
  usuario. El detalle está en `specs/001-*/` a `specs/006-*/`.
- La programación del temporizador limpia notificaciones pendientes y al
  finalizar en primer plano conserva el aviso de sistema sin emitir otro
  manual. Jest (103 pruebas) y TypeScript pasan; el comportamiento audible
  depende de las restricciones del dispositivo y no se garantiza en silencio
  o No molestar.
- Se añadió la documentación general del proyecto en `README.md`, con
  descripción, instalación, uso y estructura del repositorio.
- Expo Router agrupa Temporizador y Ajustes bajo `(tabs)`; las rutas web son
  `/` y `/settings`.
- Verificación automatizada actual: Jest (103 pruebas) y TypeScript pasan.
- La pantalla del temporizador tiene un diseño fluido con anillo de progreso
  accesible y una tarjeta central sutil para agrupar el tiempo, el ciclo y los
  controles. Ajustes separa duraciones y ciclo en tarjetas; las acciones quedan
  con espacio antes de la navegación inferior. Las acciones secundarias usan
  botones azul marino sólido con texto blanco para evitar botones claros.

## Decisiones (y por qué)
- (vacío por ahora)

## Aprendizajes y errores a evitar
- (vacío por ahora)

## Próximos pasos
- No hay tareas pendientes de HU-001 a HU-006.
- Validar la presentación en Expo Go o emulador Android, en vertical y giro.
- Siguiente comando SDD: `/sdd-status`.