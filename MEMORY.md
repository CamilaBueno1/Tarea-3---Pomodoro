# MEMORY.md – Temporizador-Pomodoro
Memoria del proyecto entre sesiones. Máximo ~50 líneas.

## Estado actual
- HU-001 a HU-006 están implementadas; el detalle está en `specs/001-*/` a
  `specs/006-*/`. Para HU-004, las decisiones D-001 a D-008 están aceptadas.
  D-009 a D-011 están registradas; spec, plan y tareas de alarma están
  aprobadas. D-012-D-014 registran notificación en primer plano, protección
  contra duplicados y retirada de avisos persistentes. C16-C21 implementan
  respuestas diferenciadas y alarma en primer plano; C23 migra el canal Android,
  C24 añade el aviso en primer plano y C25 evita alarmas duplicadas y retira
  avisos persistentes; C26 configura el canal mediante APIs Expo incluidas en
  EAS, corrigiendo la dependencia nativa local. Jest y TypeScript pasan. La
  APK nueva y acción «Detener» requieren validación manual C22. El formulario
  de Ajustes valida cada campo al editarlo y al guardar.
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
- Validar C26/C22 instalando una APK EAS nueva: canal, entrega de notificación,
  alarma única y acción «Detener». El usuario generará la APK.
  Siguiente tarea SDD: `/sdd-implement 004-hu004-notificaciones`.