# Plan técnico – HU-004

Estado: Aprobado para implementación
Spec: [spec.md](./spec.md)
HU histórica: [HU-004](../../docs/historias/HU-004.md)
Decisiones: [decisiones.md](./decisiones.md)

La spec y el plan están aprobados para implementación. La instalación de
dependencias y los cambios de código se ejecutarán tarea por tarea según
tasks.md.
La HU de origen se conserva como línea base histórica; la diferencia actual
entre el toque del cuerpo de la notificación y la acción «Detener» queda
documentada en D-011.

## Trazabilidad HU → RF → diseño → pruebas

| HU / decisión | RF | Diseño previsto | Pruebas y validación |
| --- | --- | --- | --- |
| HU-004, «Aviso con el celular en sonido»; D-007, D-010, D-012 | RF-1, RF-2 | Mantener la notificación para la hora persistida y solicitar también la notificación cuando la app activa termina una fase; en Android ambas usan el canal versionado. | Jest de fecha, canal, permisos, programación/cancelación y finalización activa; manifiesto generado y prueba en Android. |
| HU-004, «Aviso con el celular en silencio»; D-001, D-008 | RF-2, RF-3, RF-7 | Solicitar configuración de sonido/vibración y presentación en bloqueo; no afirmar que el sistema la respeta ni añadir bypass de No molestar. | Jest verifica opciones solicitadas; Android registra comportamiento efectivo y restricciones. |
| HU-004, «Detener el aviso»; D-005, D-011 | RF-4, RF-8, RF-10 | Separar el toque del cuerpo (pantalla de alarma) de la acción «Detener» de la notificación (siguiente fase); el botón de la pantalla de alarma también pasa a la siguiente fase. | Jest distingue `actionIdentifier` de toque normal y cubre navegación, parada y fase mostrada; Android valida toque en app fría y activa. |
| HU-004, «Permiso de notificaciones»; D-002, D-006, D-014 | RF-5, RF-6 | Conservar el diálogo de permiso al iniciar; no mostrar avisos persistentes de permisos/alarmas en el temporizador; presentar errores efectivos en diálogo y no guardar la elección. | Jest de permisos y ausencia de textos persistentes; revisión manual en Android. |
| Adición aprobada del cliente | RF-8, RF-9, RF-10 | Ruta de alarma en Expo Router; controlador de señales con audio, vibración y pantalla activa, limitado a la vida de esa pantalla. | Jest de UI y ciclo de vida; dispositivo verifica señales en primer plano y limpieza al cerrar/desmontar. |
| D-001, D-002, D-007 | RF-1, RF-6, RF-7 | El estado de sesión y su tiempo persistido son la fuente de verdad; entrega de notificación no altera por sí sola el conteo. | Jest de reconciliación/restauración; regreso a la app en Android tras demora. |
| D-013 | RF-8 a RF-10 | Serializar la finalización detectada por el timer y reanudación para abrir una sola ruta y una sola alarma. | Jest de finalización concurrente y limpieza al detener. |

## Auditoría de regresión inicial

El primer trabajo de implementación debe ser una auditoría acotada de la
regresión de entrega de notificaciones y solo corregir causas verificadas,
acompañando cada corrección con una prueba. El texto disponible no especifica
el contenido de las hipótesis «a-d» mencionadas por el usuario; por tanto este
plan no les atribuye causas particulares. El alcance de la auditoría es:

1. Configuración y permisos: `app.json`, manifiesto Android fusionado,
   permiso de notificaciones y acceso especial a alarmas exactas.
2. Migración de canal: ID vigente, configuración inmutable de canales
   existentes, limpieza/migración de IDs anteriores y coherencia con el módulo
   nativo Android.
3. Programación y cancelación: fecha derivada de `endsAt`, fase asociada,
   reemplazo/cancelación al pausar, reiniciar o completar; detectar duplicados
   u órdenes incorrectos.
4. Entrega en segundo plano y exact-alarm: revisar el fallback de Expo,
   estado de permisos y comportamiento comprobable con app en segundo plano,
   cerrada o dispositivo bloqueado.

La auditoría revisa como mínimo `app.json`,
`android/app/src/main/AndroidManifest.xml`, `src/storage/study-notifications.ts`,
`src/hooks/use-pomodoro-session.tsx` y sus pruebas existentes. La configuración
del canal debe ser reproducible desde los archivos versionados y APIs Expo
incluidas en el build; no dependerá de modificaciones locales a `android/`,
carpeta ignorada por Git. No se instalarán servicios ni se ampliarán permisos
para la auditoría.

## Archivos y responsabilidades

| Archivo | Estado / responsabilidad propuesta | RF |
| --- | --- | --- |
| `src/domain/pomodoro-session.ts` (existente) | Mantener las transiciones puras existentes y el cálculo basado en el tiempo absoluto. No agregar una transición disparada por la notificación. | RF-1, RF-7, RF-10 |
| `src/domain/__tests__/pomodoro-session.test.ts` (existente) | Conservar pruebas de vencimiento y fase siguiente; ampliar solo si la auditoría encuentra un defecto de dominio reproducible. | RF-1, RF-7, RF-10 |
| `app.json` y `android/app/src/main/AndroidManifest.xml` (existentes) | Comprobar la declaración `SCHEDULE_EXACT_ALARM`, permisos fusionados y configuración Expo; no añadir permisos de servicio en primer plano ni de pantalla completa. | RF-1, RF-6 |
| `src/storage/study-notifications.ts` (existente) | Configurar y migrar el canal mediante las APIs Android expuestas por `expo-notifications`, disponibles en el build EAS y tipadas en SDK 57. | RF-1 a RF-3 |
| `src/storage/study-notifications.ts` (existente) | Mantener configuración y programación local; exponer la diferencia entre toque normal y acción «Detener» sin navegar desde la capa de almacenamiento. Revisar canal y cancelación. | RF-1 a RF-7 |
| `src/storage/__tests__/study-notifications.test.ts` (existente) | Cubrir permisos, canal, fecha, cancelación y respuestas diferenciadas, verificando lo solicitado a la API y no el comportamiento que solo controla el SO. | RF-1 a RF-7 |
| `src/hooks/use-pomodoro-session.tsx` (existente) | Coordinar estado persistido, vencimiento, reconciliación y respuestas de notificación; trasladar al nivel de interfaz el destino distinto de cada respuesta. | RF-1, RF-4 a RF-7, RF-10 |
| `src/hooks/__tests__/use-pomodoro-session.test.tsx` (existente) | Probar respuestas en app activa/fría, reconciliación, permiso, cancelación y transición; comprobar que acción y toque no se confunden. | RF-1, RF-4 a RF-7, RF-10 |
| `src/app/_layout.tsx` (existente) | Registrar en Expo Router la ruta de alarma que se proponga y mantener providers/configuración compartidos. Verificar recepción de respuesta que inicia la app desde estado cerrado con las APIs instaladas. | RF-4, RF-8, RF-10 |
| `src/app/(tabs)/index.tsx` (existente) | Conservar explicación del permiso y navegación principal; al vencer una fase en primer plano mostrar la alarma en lugar del `Alert` actual. | RF-5, RF-6, RF-8 |
| `src/app/alarm.tsx` (propuesto) | Nueva ruta Expo Router para mostrar «¡Tiempo terminado!», la fase completada y el botón inferior «Detener»; al cerrar, dejar el estado de sesión persistido vigente. | RF-4, RF-8, RF-10 |
| `src/app/__tests__/alarm.test.tsx` (propuesto) | Verificar títulos/fase, botón accesible, cierre al detener y que no se muestra la fase completada como fase actual. | RF-8, RF-10 |
| `src/hooks/use-phase-alarm.ts` y prueba adyacente (propuestos) | Gestionar audio en bucle, vibración repetitiva y pantalla activa, con limpieza idempotente al detener o desmontar. | RF-9, RF-10 |
| `assets/audio/` (directorio propuesto) | Contener el archivo corto de alarma original y no sujeto a copyright, aprobado por el usuario. No se fija duración ni formato en este plan; verificar compatibilidad con `expo-audio` al preparar la tarea. | RF-9 |

Las rutas propuestas respetan el Expo Router presente en `src/app/`; no se
introduce una estructura de navegación distinta.

## Dominio puro y persistencia

- `advancePomodoroSession`, `endsAt` y la sesión guardada siguen siendo la única
  base para decidir cuál es la siguiente fase. Una notificación atrasada no
  desplaza el tiempo ni genera una transición adicional.
- El sonido, la vibración y el estado de pantalla activa son efímeros y
  pertenecen al ciclo de vida de la interfaz. No se agregan campos a AsyncStorage
  ni se cambia el formato de la sesión.
- El cuerpo de la notificación transporta la identidad de la fase terminada
  necesaria para presentar la pantalla de alarma. Antes de abrirla, se
  reconcilia la sesión con el tiempo persistido.
- La acción «Detener» de la notificación conserva el flujo vigente: el sistema
  descarta/silencia la notificación, abre la app y se muestra la fase siguiente.
  No activa la pantalla de alarma.
- El botón «Detener» de la pantalla de alarma detiene sus recursos y cierra la
  ruta; no añade una transición de dominio propia.

## Algoritmo previsto

```text
al inicializar o reanudar:
  cargar la sesión existente y reconciliar con el reloj y endsAt
  si la fase sigue corriendo y los avisos están habilitados:
    asegurar que exista una sola notificación para endsAt
  si venció:
    procesar la transición existente una sola vez
    si la app está en primer plano, mostrar alarma de la fase completada

al responder a la notificación:
  reconciliar primero el estado guardado
  si la respuesta es el toque del cuerpo:
    abrir la ruta de alarma con la fase completada que informa la notificación
    iniciar señales mientras esa pantalla permanezca visible
  si la respuesta es la acción «Detener»:
    descartar/silenciar la notificación
    abrir la app en la fase siguiente reconciliada

al pulsar «Detener» en la pantalla:
  detener audio y vibración, desactivar pantalla activa y cerrar la ruta
  mostrar la fase siguiente que ya mantiene el estado Pomodoro

al desmontarse/cerrarse la pantalla de alarma:
  detener todas las señales y liberar sus recursos
```

La ruta debe cubrir tanto respuesta con la app en memoria como apertura desde
estado cerrado; antes de implementarla se verificará la API de respuesta de
inicio disponible en `expo-notifications` instalado. El nombre de la fase que
presenta la alarma procede de la notificación; la fase vigente y la siguiente
proceden independientemente de la sesión reconciliada, no de una transición
inferida a partir de la respuesta.

## Interfaz

- Reutilizar el estilo Cotopaxi existente y las áreas seguras del dispositivo.
- Pantalla dedicada: «¡Tiempo terminado!», nombre de la fase completada y botón
  «Detener» grande y accesible en la parte inferior.
- Textos y etiquetas en español; el estado visual y las señales no dependen
  solo del color.
- El temporizador principal ya avanza mediante el dominio. La pantalla de
  alarma es temporal y no altera la duración ni el inicio de la siguiente fase.
- La pantalla activa no impide el bloqueo manual. Un cierre de pantalla o
  desmontaje detiene las señales.

## Dependencias y prerrequisitos

- El usuario aprobó `expo-audio` y `expo-keep-awake` para la alarma visible en
  primer plano, instalables en la futura fase de implementación mediante
  `npx expo install`. No están presentes en `package.json` y no se instalan en
  esta fase.
- La API `Vibration` de React Native no requiere una dependencia adicional; se
  debe comprobar el comportamiento de cancelación en la versión instalada.
- El usuario aprobó añadir bajo `assets` un archivo de audio de alarma breve,
  original y no sujeto a copyright. `assets` actualmente solo contiene
  `fonts/` e `images/`; el archivo no existe todavía.
- Verificar documentación y tipos de `expo-audio`/`expo-keep-awake` compatibles
  con Expo SDK 57 al crear las tareas. El audio debe poder repetirse y detenerse
  al desmontar sin mantener recursos abiertos.
- La configuración del canal usa las APIs Android de `expo-notifications`.
  La notificación local y el manifiesto se validan en APK/dev build Android;
  Expo Go no sustituye la validación nativa del build.

## Opciones y alternativas

| Opción prevista | RF | Alternativa descartada y motivo |
| --- | --- | --- |
| Resolver la regresión primero con una auditoría acotada y corregir solo el defecto probado, con prueba Jest y evidencia reproducible. | RF-1 a RF-3, RF-7 | Atribuir causas concretas a las hipótesis «a-d» no disponibles o cambiar permisos/canales por conjetura. |
| Mantener una notificación local de una sola entrega tanto al terminar en primer plano como en segundo plano/cierre; mostrar además la alarma propia solo con la ruta visible. | RF-2 a RF-4, RF-8, RF-9, D-012 | Ejecutar alarma JavaScript indefinidamente con la app cerrada; no es una garantía de la plataforma. |
| Usar una ruta de alarma de Expo Router y distinguir toque normal de acción explícita mediante la respuesta identificada por la API instalada. | RF-4, RF-8, RF-10 | Tratar cuerpo y acción «Detener» como equivalentes; contradice D-011. |
| Usar `expo-audio` para reproducir en bucle el asset original aprobado, `expo-keep-awake` durante la ruta y `Vibration` para repetición/cancelación. | RF-9, RF-10 | Usar solo el sonido de canal, que no garantiza continuidad; o mantener dependencias nativas alternativas sin aprobación. |
| Conservar `endsAt`, AsyncStorage y la transición de dominio actual. | RF-1, RF-7, RF-10 | Agregar persistencia de alarma o cambiar formato de sesión sin necesidad funcional. |
| No añadir servicio foreground nativo ni intent de pantalla completa. | RF-2, RF-3, RF-9 | Alarmar continuamente o lanzar UI automáticamente desde pantalla bloqueada; requeriría capacidades nativas y garantías no aprobadas. |

## Estrategia de pruebas Jest

- Adaptador de notificaciones: programación para la fecha prevista, canal
  configurado antes del schedule, permiso, contenido, cancelación al pausar o
  reiniciar y limpieza/migración de IDs. No simular como garantizada la entrega
  real del SO.
- Respuestas: prueba separada para toque del cuerpo y acción «Detener», incluso
  respuesta inicial al abrir en frío si la API instalada lo permite; comprobar
  fase de notificación y sesión persistida reconciliada.
- Sesión: mantener las pruebas de transición al vencer y reconciliación por
  `endsAt`; verificar que detener alarmas no introduce transiciones duplicadas.
- Hook de alarma: simular audio, keep-awake y Vibration; comprobar inicio,
  repetición/loop, parada explícita y limpieza una sola vez al desmontar o
  cambiar de fase.
- Ruta de alarma: comprobar texto, nombre de fase, botón, navegación/cierre,
  accesibilidad y estado siguiente.
- Ejecutar Jest focalizado y luego `npx jest`; cerrar la validación TypeScript
  con `npx tsc --noEmit`.

## Validación manual en dispositivo y límites

- Construir/instalar APK o development build Android e inspeccionar el
  manifiesto fusionado: `SCHEDULE_EXACT_ALARM`, permiso de notificaciones,
  target SDK y ausencia de permisos de servicio foreground/full-screen nuevos.
- Probar permiso de notificaciones concedido/denegado; acceso exact-alarm
  concedido/no concedido y entrega demorada; comprobar fase persistida.
- Con la aplicación abierta, verificar fase y texto, bucle de audio, vibración,
  pantalla activa, botón «Detener» y limpieza al salir/desmontar.
- Con la app en segundo plano, cerrada y el teléfono bloqueado, validar solo la
  entrega única solicitada por la notificación. Probar separadamente el toque
  del cuerpo y la acción «Detener», incluyendo inicio en frío; registrar si el
  SO permite la presentación y señales.
- Documentar dispositivo, versión de Android, configuración/canal, permisos y
  volumen observados. No afirmar evasión de silencio/No molestar, entrega
  puntual garantizada, reproducción continuada con app cerrada ni UI
  automática a pantalla completa.

## Riesgos y límites pendientes

- El motivo de cualquier regresión de notificaciones permanece por confirmar
  hasta la auditoría; las hipótesis «a-d» no están descritas en los artefactos
  consultados y no se completan por inferencia.
- La ruta de inicio desde notificación en frío, acceso a la fase terminada y
  migración de canales requieren verificación con tipos instalados, pruebas y
  APK.
- La instalación aprobada de dependencias, selección del formato compatible
  para el asset, compilación e inspección del manifiesto son prerrequisitos de
  implementación, no realizados durante esta fase.
- Las limitaciones de sistema operativo y hardware descritas en la spec siguen
  aplicando; no se propone servicio nativo ni permiso nuevo.

Siguiente fase: solicitar aprobación explícita de este plan y después ejecutar
`/sdd-tasks 004-hu004-notificaciones`. Las tareas no se crean ni modifican en
esta fase.
