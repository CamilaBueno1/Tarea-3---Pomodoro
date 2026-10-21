**Decisión:** La aplicación usa notificaciones locales con los permisos
concedidos y la prioridad configurada para Android. No intenta evadir el modo
silencio, No molestar ni otras restricciones del sistema operativo.

La afirmación «No intenta evadir el modo silencio» queda sustituida
parcialmente por D-001.

**Límite técnico:** La entrega visual en pantalla de bloqueo y el sonido o la
vibración dependen de los permisos, la configuración del dispositivo y las
políticas del sistema operativo. La aplicación no garantiza que el aviso
interrumpa esas restricciones; al volver a abrirla, la sesión se reconcilia
con el estado y el tiempo de finalización persistidos.

## D-001: Señal de fin de fase en silencio o vibración

**Estado:** Aceptada.

Cuando el teléfono está en silencio o vibración, la aplicación solicitará que
el aviso de fin de fase use una señal sonora con comportamiento de alarma,
vibración y presentación en la pantalla de bloqueo. Esta decisión reemplaza la
prohibición anterior de intentar una señal tipo alarma, pero no garantiza que
el sistema operativo, el fabricante o la configuración del dispositivo
permitan esas señales ni que se superen las restricciones de silencio o No
molestar. Si la aplicación detecta que una señal no puede emitirse, lo informa
según D-002; no afirma que el aviso sonó, vibró o apareció cuando no puede
comprobarlo.

## D-002: Cómo y cuándo se informa una limitación del aviso

**Estado:** Aceptada.

La aplicación informa únicamente las limitaciones que puede detectar con
certeza. Si el permiso de notificaciones no está concedido, conserva el
temporizador y explica la opción de permitir avisos o iniciar sin ellos en el
diálogo inicial; no mantiene un mensaje de estado persistente en la pantalla
principal. Los errores efectivos de configuración se presentan en un diálogo.
Cuando el estudiante vuelve a la aplicación tras un aviso que no se mostró, la
fase aparece como terminada según el tiempo de finalización persistido, de modo
que la información no se pierde.

La aplicación no detecta restricciones que no puede conocer (silencio, No
molestar o ahorro de batería del fabricante), por lo tanto no las informa ni
promete que el aviso se emita en esos casos. No se añaden pantallas, permisos
ni dependencias para esto.

## D-003: Sin permiso de alarmas exactas

**Estado:** Reemplazada por D-007.

La aplicación no solicita `SCHEDULE_EXACT_ALARM` ni `USE_EXACT_ALARM`. El aviso
se programa para el tiempo de finalización con la API ya usada, y puede
retrasarse si el sistema lo difiere por ahorro de energía. Al volver a la
aplicación, la fase se reconcilia con el tiempo de finalización persistido
(HU-003), por lo que el conteo nunca depende del momento en que llegue el aviso.
Si la prueba en el APK muestra retrasos apreciables, se reabrirá esta decisión.

## D-004: Solo APIs presentes en la versión instalada

**Estado:** Aceptada.

Para el audio tipo alarma, la visibilidad en pantalla de bloqueo y la acción
«Detener», el plan y la implementación usan únicamente opciones que existan en
los tipos instalados de `expo-notifications` (SDK 57). Lo que no exista no se
simula ni se promete: se omite y queda documentado como límite, sin cambiar los
escenarios de HU-004 ni afirmar que el aviso sonó, vibró o apareció.

## D-005: Comportamiento de las respuestas a la notificación

**Estado:** Aceptada.

La acción explícita «Detener» de la notificación descarta y silencia ese aviso,
y abre la aplicación mostrando la siguiente fase reconciliada. El toque sobre
el cuerpo de la notificación abre la aplicación y muestra la pantalla de alarma
de la fase terminada; no detiene esa alarma. El botón «Detener» de dicha pantalla
detiene sus señales, cierra la pantalla y muestra la siguiente fase.

La diferencia entre el cuerpo y la acción de la notificación fue aprobada por
el cliente y se registra en D-011; reemplaza la conducta original de HU-004
para el toque de la notificación. HU-004 se conserva intacta como línea base
histórica. No se añaden tareas en segundo plano ni permisos para procesar las
respuestas sin abrir la aplicación.

## D-006: Sin persistencia adicional para el mensaje de avisos

**Estado:** Aceptada.

El mensaje de avisos desactivados se deriva del permiso de notificaciones del
sistema, consultado al abrir la aplicación. La elección «Iniciar sin avisos» no
se guarda por separado; tras reiniciar, la aplicación puede volver a explicar el
permiso antes de iniciar. No se cambia el formato de los datos persistidos.

## D-007: Aviso puntual con permisos de alarma exacta

**Estado:** Aceptada. Reemplaza D-003.

La prueba en el APK mostró que, con el celular bloqueado, el aviso de fin de
fase llega con retraso, lo que incumple HU-004. Se autoriza declarar en el
manifiesto de Android los permisos de alarma exacta que correspondan según la
versión del sistema (SCHEDULE_EXACT_ALARM y/o USE_EXACT_ALARM), y solo esos,
justificados por HU-004 (principio 2 de la constitución). El plan debe
verificar en la documentación de Android y en el manifiesto resultante qué
permiso aplica a cada versión, si el estudiante debe concederlo
manualmente y cómo se le informa. Sigue sin garantizarse que el sonido supere
el silencio o No molestar (D-001). El conteo continúa basándose en el tiempo
de finalización persistido (HU-003).

## D-008: Sonido del aviso

**Estado:** Aceptada.

La notificación de fin de fase usa el sonido predeterminado del canal, sin
archivo de audio propio para esa notificación. Si la versión instalada de
expo-notifications no permite seleccionar el tono de alarma del sistema, se usa
ese sonido predeterminado y se documenta la limitación (D-004), sin afirmar
que sea el tono de alarma del teléfono. Android y el dispositivo determinan la
duración de la señal de notificación; no se garantiza una duración mínima ni
repetición en bucle por parte del canal.

Esta restricción solo aplica al sonido de la notificación. La alarma visible en
primer plano aprobada en la spec puede reproducir en bucle el archivo breve,
original y sin copyright aprobado por el cliente mediante `expo-audio`; no
implica que el archivo se use como sonido del canal ni que la notificación en
segundo plano repita su sonido. Las respuestas a la notificación siguen D-005.

## D-009: Información general sobre alarmas exactas

**Estado:** Reemplazada por D-014.

La decisión de mostrar una indicación general sobre «Alarmas y recordatorios»
se reemplaza por la decisión del cliente de no mostrar avisos informativos
persistentes en la pantalla principal.

## D-010: Permiso de alarma exacta seleccionado

**Estado:** Aceptada.

Para Android 12 o posterior se declara `SCHEDULE_EXACT_ALARM`; el estudiante
debe conceder manualmente el acceso especial en Ajustes. No se declara
`USE_EXACT_ALARM`, cuya elegibilidad para esta aplicación no está confirmada.

## D-011: Diferenciar el cuerpo de la notificación de la acción «Detener»

**Estado:** Aceptada.

El cliente aprobó sustituir el comportamiento original de HU-004 para el toque
del cuerpo de la notificación: tocarlo abre la aplicación y muestra la pantalla
de alarma de la fase terminada, sin detener esa alarma. La acción explícita
«Detener» de la notificación conserva el comportamiento ya implementado:
descarta y silencia la notificación y abre la aplicación en la siguiente fase.
La acción «Detener» de la pantalla de alarma es distinta; detiene sus señales,
cierra esa pantalla y muestra la siguiente fase según la transición existente.

Este cambio del cliente prevalece sobre la conducta descrita originalmente en
el escenario «Detener el aviso» de HU-004 respecto al toque de la notificación.
HU-004 permanece intacta como línea base histórica; la spec aprobada y esta
decisión documentan la conducta vigente. No se promete una apertura automática
de la alarma con la aplicación cerrada o el teléfono bloqueado.

## D-012: Notificación además de la alarma en primer plano

**Estado:** Aceptada.

Cuando una fase termina con la aplicación en primer plano, el sistema solicita
la notificación de fin de fase además de mostrar la pantalla de alarma. La
notificación identifica la fase, se asocia al canal configurado y conserva la
acción «Detener». La alarma continua de la pantalla es independiente de la
entrega única del sistema.

## D-013: Una sola alarma por finalización

**Estado:** Aceptada.

Si el intervalo del temporizador y el evento de reanudación detectan la misma
finalización concurrentemente, el sistema procesa esa fase una sola vez y no
apila rutas de alarma. La acción «Detener» de la pantalla o de la notificación
debe cerrar la única alarma activa.

## D-014: Sin avisos informativos persistentes en el temporizador

**Estado:** Aceptada.

Por solicitud del cliente, la pantalla principal no muestra mensajes
persistentes de avisos desactivados ni la indicación general de «Alarmas y
recordatorios». Se mantiene el diálogo de explicación y permiso al iniciar
cuando corresponde (RF-5); los errores reales de configuración se presentan en
un diálogo y no como texto fijo junto al control «Iniciar».