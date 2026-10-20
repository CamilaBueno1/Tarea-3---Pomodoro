# MEMORY.md – Temporizador-Pomodoro
Memoria del proyecto entre sesiones. Máximo ~50 líneas.

## Estado actual
- HU-001 a HU-006 están implementadas; el detalle está en `specs/001-*/` a
  `specs/006-*/`. Para HU-004, las decisiones D-001 a D-008 están aceptadas.
  D-009 a D-011 están registradas; spec, plan y tareas de alarma están
  aprobadas. C16-C21 implementan auditoría, respuestas diferenciadas y alarma
  en primer plano; C23 migra el canal Android tras el reporte de aviso ausente.
  Jest (136) y TypeScript pasan. La entrega y acción «Detener» en dispositivo
  siguen pendientes de validación manual C22.
- Se añadió la documentación general del proyecto en `README.md`, con
  descripción, instalación, uso y estructura del repositorio.
- Expo Router agrupa Temporizador y Ajustes bajo `(tabs)`; las rutas web son
  `/` y `/settings`.
- Verificación automatizada histórica: Jest (103 pruebas) y TypeScript pasan.
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
- Probar C23 y completar C22 en la APK Android: entrega con app en segundo
  plano/bloqueada y acción «Detener». No lanzar build EAS; el usuario generará
  la APK.
  Siguiente tarea SDD: `/sdd-implement 004-hu004-notificaciones`.