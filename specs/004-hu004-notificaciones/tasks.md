# Tareas – HU-004

Estado: C16-C21 completadas; C22 pendiente de prueba manual Android/Expo Go
Spec: [spec.md](./spec.md)
Plan: [plan.md](./plan.md)
HU: [HU-004](../../docs/historias/HU-004.md)

Las tareas originales fueron ejecutadas y validadas. C1-C5 documentan el cambio
anterior; C6-C9 proponen el trabajo pendiente para corregir el retraso y alinear
la implementación con la spec actualizada.

## Historial de implementación original

Estas tareas describen el alcance anterior y se conservan como registro de lo
ya ejecutado.

- [x] **T1. Escribir pruebas de la transición de fase y el aviso.** RF-1, RF-4.
  Hecho cuando: Jest cubre el momento en que una fase llega a cero, dispara la
  transición y deja disponible la siguiente fase para la app.
- [x] **T2. Implementar la transición de fin de fase y la conexión con aviso.**
  RF-1, RF-4.
  Hecho cuando: la finalización de una fase queda como evento determinista y el
  consumidor de la app puede activar la señal de aviso sin depender de renderes
  visuales.
  Depende de T1.
- [x] **T3. Escribir pruebas del adaptador de notificaciones.** RF-1, RF-2,
  RF-5, RF-6, RF-7.
  Hecho cuando: el adaptador simula permisos, programación, cancelación y
  errores del sistema; la prueba exige manejar denegación y restricciones del
  dispositivo sin prometer resultados imposibles.
- [x] **T4. Implementar el adaptador local de notificaciones.** RF-1, RF-2,
  RF-5, RF-6, RF-7.
  Hecho cuando: la app solicita el permiso cuando corresponde, programa un
  aviso único por fase y cancela avisos previos al pausar o reiniciar; si se
  deniega el permiso, expone la limitación y no presenta el aviso como
  garantizado.
  Depende de T2 y T3.
- [x] **T5. Escribir pruebas del proveedor de sesión y del flujo de permiso.**
  RF-1 a RF-6.
  Hecho cuando: React Native Testing Library cubre la carga inicial, la
  solicitud de permiso, la denegación y la reacción ante finalización de fase
  con aviso programado o limitado.
  Depende de T4.
- [x] **T6. Implementar el flujo de sesión y la interacción del permiso.**
  RF-1 a RF-6.
  Hecho cuando: el flujo de la app explica el permiso al primer uso, conserva
  el temporizador si se niega, dispara la alarma o aviso visible cuando es
  posible y cancela el aviso al detenerse.
  Depende de T4 y T5.
- [x] **T7. Escribir pruebas de la pantalla de bloqueo y mensajes de limitación.**
  RF-3, RF-4, RF-7.
  Hecho cuando: la UI verifica que el aviso identifica la fase terminada,
  permite detener la alarma y muestra un texto claro cuando el sistema no
  ejecuta sonido o vibración.
  Depende de T6.
- [x] **T8. Implementar la UI y los mensajes de restricción del sistema.**
  RF-3, RF-4, RF-7.
  Hecho cuando: la aplicación abre la siguiente fase al detener el aviso,
  presenta un mensaje en español y no afirma que la alarma pudo evadir silencio
  o No molestar cuando el dispositivo lo impidió.
  Depende de T7.
- [x] **T9. Validar HU-004 en Android/Expo Go.** RF-1 a RF-7.
  Hecho cuando: se comprueba sonido activo, modo silencio/vibración, pantalla de
  bloqueo, permiso en primer uso, denegación y evidencia del comportamiento real
  del dispositivo; se registra la limitación del fabricante o del sistema si se
  presenta.
  Depende de T8.
  Resultado: el usuario confirma que se completó la validación manual de
  HU-004. El registro previo de HU-006 documenta avisos con sonido/banner en
  primer plano, segundo plano y pantalla bloqueada, sin conexión. No se
  registraron modelo, versión ni resultados detallados de cada escenario; no
  se afirma que el aviso evada las restricciones de silencio o No molestar.

## Dependencias y límites

- Dependencia principal: T1 → T2 → T4 → T5 → T6 → T7 → T8 → T9.
- T3 debe ejecutarse junto con T4 para mantener la lógica de permiso y la
  gestión de restricciones alineadas con el comportamiento real del sistema.
- Las pruebas de T9 requieren Android o Expo Go con acceso al dispositivo real;
  no se puede asumir que la plataforma garante sonido, vibración o alarma en
  silencio ni No molestar.
- La implementación no debe inventar un “modo seguro” o un bypass del sistema
  operativo; solo puede documentar y explicitar la limitación cuando el
  dispositivo la impone.

## Tareas del cambio aprobado

- [x] **C1. Escribir pruebas del adaptador para el aviso actualizado.** RF-1 a
  RF-4.
  Hecho cuando: Jest cubre la programación para `endsAt`, el canal Android
  versionado, sonido y vibración coherentes entre canal y contenido, uso de
  audio ALARM, visibilidad pública en pantalla de bloqueo, categoría y acción
  «Detener», y la respuesta al toque normal y a la acción. Las pruebas
  comprueban la configuración solicitada, no garantizan el comportamiento del
  sistema.
- [x] **C2. Actualizar el adaptador local de notificaciones.** RF-1 a RF-4.
  Hecho cuando: el adaptador usa un identificador de canal nuevo, solicita los
  atributos de audio y visibilidad respaldados por los tipos instalados,
  registra «Detener», distingue la respuesta de la acción del toque normal y
  conserva la cancelación existente. No habilita `bypassDnd` ni solicita
  permisos de alarma exacta.
  Depende de C1.
- [x] **C3. Escribir pruebas del flujo de permisos y de respuesta.** RF-4 a
  RF-7.
  Hecho cuando: Jest cubre la consulta del permiso al abrir, el estado
  «avisos desactivados» derivado de ese permiso sin persistir la elección
  «Iniciar sin avisos», la apertura en la siguiente fase tras ambas respuestas
  y la reconciliación a partir del tiempo persistido.
  Depende de C2.
- [x] **C4. Alinear el hook y la pantalla con el flujo aprobado.** RF-1,
  RF-4 a RF-7.
  Hecho cuando: tocar la notificación o «Detener» abre la app en la fase
  correspondiente al reconciliar `endsAt`; el permiso se consulta al abrir;
  no se persiste una elección adicional ni se informan restricciones que la
  app no detecta con certeza. Se muestran explícitamente los errores.
  Depende de C3.
- [ ] **C5. Ejecutar verificación automatizada y manual.** RF-1 a RF-7.
  Hecho cuando: pasan Jest y TypeScript; en Android se valida el canal nuevo,
  permiso concedido/denegado, app bloqueada, toque normal y «Detener», sonido,
  vibración, silencio, No molestar y posible demora. Se registra el resultado
  observado sin afirmar que el sistema evade sus restricciones.
  Depende de C4.

  Resultado automatizado: Jest (111 pruebas) y TypeScript pasan. La validación
  manual Android queda pendiente porque no hay un dispositivo ADB conectado.

### Dependencias del cambio

- C1 → C2 → C3 → C4 → C5.
- La lógica del dominio y el formato de persistencia existentes se conservan;
  no requieren tareas de implementación separadas.

## Tareas para corregir retrasos y sonido

No se debe afirmar que el acceso a alarmas exactas está denegado si la
aplicación no puede consultarlo, ni afirmar que el sonido predeterminado cumple
una duración mínima que la API instalada no garantiza.

- [x] **C6. Escribir pruebas de programación exacta y fallback.** RF-1.
  Hecho cuando: las pruebas verifican la declaración de
  `SCHEDULE_EXACT_ALARM` en la configuración Android, el disparador DATE para
  `endsAt` y el uso del mismo canal configurado antes de programar. La
  verificación del código nativo confirma la ruta exacta cuando
  `canScheduleExactAlarms()` es verdadero y el fallback inexacto cuando es
  falso; no se inventa una propiedad `exact` para el trigger.
  Habilita la verificación de C7.
  Resultado: 16 pruebas existentes pasan y la nueva prueba de configuración
  falla como se esperaba porque `app.json` todavía no declara el permiso.
  TypeScript pasa. La configuración se implementa en C7.
- [x] **C7. Configurar el permiso exacto y mantener el canal de aviso.**
  RF-1 a RF-3.
  Hecho cuando: la configuración genera `SCHEDULE_EXACT_ALARM` y no agrega
  `USE_EXACT_ALARM` ni permisos no autorizados; el manifiesto fusionado se
  inspecciona para verificar permisos y target SDK. El canal usa el ID nuevo
  `studyend3`, importancia alta, `audioAttributes` ALARM, `vibrationPattern`,
  `enableVibrate: true`, visibilidad pública y sonido `default`; el mismo ID
  se usa al programar y se configura antes del trigger. No se agregan archivos
  de audio ni dependencias. No se afirma que el sonido sea el tono de alarma
  del teléfono ni que cumpla una duración mínima.
  Depende de C6.
  Resultado: `app.json` declara solo `SCHEDULE_EXACT_ALARM` entre permisos de
  alarma exacta. El manifiesto fusionado declara ese permiso y
  `POST_NOTIFICATIONS`; no declara `USE_EXACT_ALARM`. Target SDK 36. Se
  detectó que el canal previo no habilitaba explícitamente vibración y que su
  ID ya podía existir con ajustes inmutables; se cambió a `studyend3` y se
  añadió `enableVibrate: true`. Prueba del adaptador, Jest completo (114) y
  TypeScript pasan. Su efecto real aún requiere validación en Android.
- [x] **C8. Implementar la comunicación general del acceso especial.**
  RF-6, RF-7.
  Hecho cuando: el texto existente muestra siempre en Android 12+ una
  indicación general de que «Alarmas y recordatorios» puede ser necesario para
  reducir retrasos, sin asegurar que el acceso esté denegado. No crea pantallas,
  persistencia ni dependencias. Los tipos instalados no exponen desde
  JavaScript una API para consultar el acceso ni abrir su ajuste.
  Resultado: pruebas de UI verifican la indicación en Android 12+ y su ausencia
  antes de Android 12.
- [ ] **C9. Validar el APK y registrar los resultados de HU-004.** RF-1 a
  RF-7.
  Hecho cuando: pasan Jest y TypeScript, se inspecciona el manifiesto
  fusionado y se completa en APK la lista manual de app abierta, segundo
  plano, celular bloqueado, app cerrada, vibración, silencio, toque de la
  notificación, «Detener» y permiso de notificaciones denegado. También se
  prueban acceso exacto concedido/denegado y retrasos; se registran modelo,
  versión de Android, configuración del canal, volúmenes y ahorro de batería,
  sin prometer que se superan restricciones del sistema.
  Depende de C7 y C8; requiere un dispositivo Android físico.
  Resultado automatizado: Jest (114 pruebas) y TypeScript pasan. El manifiesto
  fusionado fue inspeccionado. La generación del APK no termina en este entorno:
  el build nativo falla porque Ninja excede el límite de 260 caracteres de ruta
  en un archivo de React Native Gesture Handler. Se reintentó desde un junction
  de ruta corta; Gradle resuelve de todos modos la ruta larga original. No hay
  dispositivo ADB conectado; la prueba manual queda pendiente. La prueba
  enfocada del adaptador pasó también tras habilitar explícitamente la
  vibración y versionar el canal como `studyend3`.
- [x] **C10. Corregir la configuración persistente del canal Android.** RF-2,
  RF-3.
  Hecho cuando: se usa un ID versionado nuevo con importancia máxima y se
  eliminan los canales anteriores antes de configurar el nuevo y solicitar
  permisos; pruebas cubren configuración, limpieza, orden e ID del trigger.
  Resultado: `studyend4` reemplaza `studyend3`, `studyend2`, `studyend` y
  `default`; el tipo instalado ofrece `AndroidImportance.MAX` y
  `deleteNotificationChannelAsync`. El manifiesto ya declara únicamente
  `SCHEDULE_EXACT_ALARM`. Jest completo (115) y TypeScript pasan. La API
  instalada no permite detectar desde JavaScript si el acceso especial está
  concedido; la indicación general existente lo explica sin afirmar que esté
  denegado.
  Depende de C6.
- [ ] **C11. Generar el APK corregido y completar la validación manual.**
  RF-1 a RF-7.
  Hecho cuando: el APK nuevo se instala y se valida con celular bloqueado,
  revisando entrega puntual, sonido, vibración, permiso de notificaciones,
  acceso a alarmas exactas y configuración del canal `studyend7`.
  Depende de C10. Validación pendiente en dispositivo Android.
- [x] **C12. Abrir el ajuste de alarmas exactas desde la aplicación.** RF-1,
  RF-6.
  Hecho cuando: Android 12+ muestra una acción explícita que abre
  `ACTION_REQUEST_SCHEDULE_EXACT_ALARM`; el puente nativo está registrado,
  compila y, al regresar de Ajustes, la fase activa se vuelve a programar para
  que Expo use la ruta exacta si el acceso fue concedido. La app informa el
  error si el módulo nativo no está disponible.
  Resultado: Jest (117) y TypeScript pasan; `:app:compileDebugKotlin` pasa y
  el manifiesto fusionado conserva `SCHEDULE_EXACT_ALARM`. No hay dispositivo
  ADB. No se pudo empaquetar el APK: Ninja excede 260 caracteres de ruta en
  React Native Gesture Handler, incluso usando una unidad `subst`.
  La validación del panel de Ajustes requiere instalar un APK compilado.
  Depende de C10.
- [x] **C13. Usar el tono de alarma del sistema en Android.** RF-2, RF-3.
  Hecho cuando: un canal nativo Android versionado utiliza el URI de alarma
  predeterminado del sistema, atributos de audio `USAGE_ALARM`, máxima
  importancia, vibración y visibilidad de bloqueo; las notificaciones
  programadas usan ese canal sin sobrescribir su sonido desde el contenido.
  Elimina canales viejos y el botón de Ajustes que no abría de forma fiable el
  permiso especial. No intenta eludir silencio ni No molestar.
  Resultado: `studyend6` reemplaza los canales de fase previos; Jest (116),
  TypeScript y `:app:compileDebugKotlin` pasan. La APK no se pudo empaquetar
  por el límite de ruta de Ninja en Windows y la prueba auditiva en dispositivo
  queda pendiente.
  Depende de C10.
- [x] **C14. Verificar el canal con el tono de alarma predeterminado.** RF-2,
  RF-3.
  Hecho cuando: el canal Android usa el URI predeterminado de tipo alarma
  (`RingtoneManager.TYPE_ALARM`), atributos `USAGE_ALARM`, vibración e
  importancia máxima; después de crearlo se lee de vuelta desde
  `NotificationManager` y se falla explícitamente si Android no conservó el
  tono, audio, vibración o importancia solicitados. Las notificaciones de fase
  usan ese canal sin reemplazar su sonido desde el contenido. Un nuevo ID evita
  configuración inmutable persistida.
  Resultado: `studyend7` reemplaza los IDs anteriores; Jest (116), TypeScript
  y `:app:compileDebugKotlin` pasan. Permiso de alarmas exactas solo afecta
  puntualidad, no el sonido. No se generó APK ni se comprobó la emisión en un
  dispositivo; validar también el volumen de alarmas y ajustes del canal.
  Depende de C13.
- [x] **C15. Evitar que Expo silencie el aviso Android.** RF-2 a RF-4.
  Hecho cuando: el contenido programado declara `sound` y `vibrate` para que
  Expo Notifications SDK 57 no marque el builder como silencioso; en Android
  8+, el canal `studyend7` sigue definiendo el sonido de alarma y la vibración
  efectivos. Se conserva la categoría «Detener» asociada a la notificación y
  su apertura de la app.
  Resultado: Jest (116 pruebas) y TypeScript pasan. No se generó APK ni se
  verificó sonido, vibración o presentación en un dispositivo; validar
  manualmente sigue pendiente en C11.
  Depende de C14.

## Tareas aprobadas para pantalla de alarma y auditoría de regresión

- [x] **C16. Auditar la entrega de notificaciones y corregir solo defectos verificados.** RF-1 a RF-3, RF-7.
  Hecho cuando: primero se añaden o ajustan pruebas Jest que fallen ante cada
  defecto reproducible y luego se corrige únicamente la causa demostrada. La
  auditoría deja evidencia de estas cuatro áreas acotadas: (1) configuración
  Expo/permisos y manifiesto Android fusionado; (2) configuración y migración
  de canales; (3) programación/cancelación alrededor de `endsAt` y del ciclo
  de vida de fases; (4) entrega en segundo plano y comportamiento exact-alarm
  de Expo. Las hipótesis «a-d» mencionadas por el usuario no aparecen en el
  historial ni en los archivos accesibles; se resuelven con evidencia de la
  auditoría, sin atribuirles causas inventadas. Se ejecutan Jest focalizado,
  `npx jest` y `npx tsc --noEmit`. La revisión no amplía permisos ni añade
  servicio foreground o `USE_FULL_SCREEN_INTENT`; la entrega con la app
  cerrada/en segundo plano sigue siendo una sola solicitud de notificación.
  Depende de C15.
  Resultado: las fuentes confirman `SCHEDULE_EXACT_ALARM` y `VIBRATE` en el
  manifiesto de la app y `POST_NOTIFICATIONS` en el manifiesto de
  `expo-notifications`; Expo 57 usa el camino exacto solo si
  `canScheduleExactAlarms()` es verdadero y el fallback inexacto si no. El
  canal `studyend7` se configura antes de programar, coincide con el ID del
  trigger y elimina los IDs heredados; el contenido declara sonido/vibración
  para que Expo no silencie el builder. La programación usa `endsAt`, cancela
  el aviso guardado al restaurar una fase vencida y mantiene una sola
  notificación. No se reprodujo un defecto de código ni se hizo una corrección
  especulativa; la entrega real del dispositivo queda pendiente de C22.
  Pasaron pruebas focalizadas (32), Jest completo (116) y TypeScript.
- [x] **C17. Probar e implementar las respuestas diferenciadas de notificación.** RF-4, RF-8, RF-10.
  Hecho cuando: primero Jest verifica que el toque del cuerpo abre la ruta de
  alarma con la fase completada tanto con la app activa como al abrirla desde
  una respuesta inicial, según la API instalada; también verifica que la
  acción «Detener» conserva la apertura en la siguiente fase y no abre la
  alarma. Después se implementa la distinción sin cambiar la reconciliación
  basada en el estado persistido. Pasan Jest focalizado, `npx jest` y
  `npx tsc --noEmit`.
  Depende de C16.
  Resultado: las pruebas confirmaron en rojo la ausencia de destino para el
  toque del cuerpo y de lectura de respuesta inicial. Expo Notifications SDK
  57 ofrece `getLastNotificationResponse()` y
  `clearLastNotificationResponse()`; la respuesta activa usa el listener
  existente. El cuerpo navega a `/alarm` con la fase del aviso, tras
  reconciliar la sesión persistida; «Detener» reconcilia y vuelve al
  temporizador, sin abrir la alarma. Pasaron pruebas focalizadas (34), Jest
  completo (118) y TypeScript. La pantalla de alarma se reserva para C18; la
  validación de dispositivo sigue pendiente en C22.
- [x] **C18. Probar e implementar la pantalla de alarma y su entrada en primer plano.** RF-4, RF-8, RF-10.
  Hecho cuando: primero Jest comprueba que la finalización de fase en primer
  plano abre la misma pantalla que el toque del cuerpo de la notificación y
  que presenta «¡Tiempo terminado!», el nombre de la fase completada (no como
  fase actual) y un botón accesible, grande y situado en la parte inferior,
  «Detener». Después se implementa la ruta/interfaz y el botón cierra la
  pantalla mostrando la siguiente fase existente. Pasan Jest focalizado,
  `npx jest` y `npx tsc --noEmit`.
  Depende de C17.
  Resultado: se implementó `src/app/alarm.tsx` con fase completada, mensaje
  solicitado y botón «Detener» accesible, grande y al fondo. El fin en primer
  plano y el toque del cuerpo llevan a esa ruta; detener vuelve al temporizador,
  sin otra transición. Una prueba focalizada falló porque el handler confiaba
  en `AppState.currentState` desactualizado después del evento `active`; se
  quitó esa comprobación en la ruta explícita de reanudación y se conservó la
  guardia del temporizador. Pasaron 37 pruebas focalizadas, Jest completo
  (123) y TypeScript. Validación visual/señales en dispositivo pendiente de
  C22.
- [x] **C19. Añadir audio en bucle para la pantalla de alarma.** RF-9, RF-10.
  Hecho cuando: durante la implementación se instalan únicamente las
  dependencias aprobadas mediante `npx expo install expo-audio
  expo-keep-awake`; se crea bajo `assets` un recurso de alarma corto, original
  y no sujeto a copyright; y primero Jest verifica, con el adaptador de audio
  simulado, el inicio y bucle del audio y su parada al detener la alarma o
  desmontar. Después se implementa la reproducción con `expo-audio`, sin
  afirmar previamente que las dependencias estén instaladas ni que el recurso
  ya exista. Pasan Jest focalizado y `npx tsc --noEmit`.
  Depende de C18.
  Resultado: se instalaron `expo-audio` 57.0.5 y `expo-keep-awake` 57.0.2
  mediante `npx expo install`; se agregó el WAV original
  `assets/audio/alarm-tone.wav` (52,964 bytes). El hook activa `loop`, inicia
  y detiene el reproductor al detener o desmontar la ruta; los errores de
  reproducción se muestran en la pantalla. Pasaron las pruebas focalizadas
  (10), Jest completo (129) y TypeScript. Validación real en dispositivo
  pendiente de C22.
- [x] **C20. Añadir vibración repetitiva y pantalla activa durante la alarma.** RF-9, RF-10.
  Hecho cuando: primero Jest verifica la repetición/cancelación de
  `Vibration` de React Native y la activación/desactivación de
  `expo-keep-awake` mientras la ruta está visible; después se implementan
  ambas señales limitadas al ciclo de vida de esa pantalla. Pasan Jest
  focalizado y `npx tsc --noEmit`.
  Depende de C19.
  Resultado: el hook de señales ejecuta vibración React Native repetitiva
  mientras la ruta de alarma válida está montada, cancela la vibración al
  desmontarse y usa `useKeepAwake` con una etiqueta dedicada durante ese mismo
  ciclo de vida. Ruta inválida no activa esas señales; errores de vibración se
  presentan en pantalla. Pasaron 10 pruebas focalizadas, Jest completo
  (134 pruebas) y TypeScript. Comportamiento físico pendiente de C22.
- [x] **C21. Verificar la limpieza completa al detener o desmontar la alarma.** RF-9, RF-10.
  Hecho cuando: primero Jest verifica que detener o desmontar libera audio,
  vibración y pantalla activa, sin repetir efectos ni provocar una transición
  adicional; después se ajusta el ciclo de vida si las pruebas revelan un
  defecto. Pasan Jest focalizado, `npx jest` y `npx tsc --noEmit`.
  Depende de C20.
  Resultado: pruebas primero detectaron que «Detener» no cancelaba vibración
  hasta el desmontaje. Se añadió parada explícita e idempotente de audio y
  vibración antes de cerrar la ruta; el desmontaje permanece como limpieza
  alternativa y Expo Keep Awake libera la pantalla al desmontar su componente.
  El test verifica una sola parada al pulsar y desmontar, sin transición extra.
  Pasaron 17 pruebas focalizadas, Jest completo (136) y TypeScript.
  Validación en dispositivo pendiente de C22.
- [ ] **C22. Validar manualmente la regresión y la alarma en Android.** RF-1 a RF-10.
  Hecho cuando: en APK o development build instalado se registran dispositivo,
  versión Android, permisos/canal y resultados de entrega única con app en
  segundo plano, cerrada y teléfono bloqueado; se comprueban por separado el
  toque del cuerpo y la acción «Detener», y en primer plano la fase/textos,
  audio, vibración, pantalla activa y limpieza al detener/salir. Se anotan
  límites observados sin prometer puntualidad, superar silencio/No molestar,
  alarma continua en segundo plano ni apertura automática a pantalla completa.
  Jest y TypeScript deben seguir pasando antes de cerrar la validación. Requiere
  dispositivo Android y APK/development build; el empaquetado APK ha estado
  bloqueado por el límite de ruta de Ninja en Windows, así que si persiste se
  registra como bloqueo y no como validación completada. Expo Go no sustituye
  la comprobación del módulo nativo.
  Depende de C16 y C21.

- [x] **C23. Migrar el canal Android tras el reporte de aviso ausente.** RF-1 a RF-4.
  Hecho cuando: una prueba confirma que se crea un ID nuevo de canal, que el
  ID del trigger coincide con él y que el ID anterior se elimina como legado.
  Se conserva la categoría con la acción «Detener». El cambio mitiga la
  configuración inmutable que Android conserva entre instalaciones; la
  recepción y la acción en el dispositivo siguen pendientes de validación
  manual en C22.
  Resultado: `studyend8` reemplaza `studyend7`; las pruebas del adaptador
  verifican migración, programación y acción «Detener». Jest completo (136) y
  TypeScript pasan. No se generó APK ni se afirmó entrega física.
