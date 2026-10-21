# Spec 004 - Aviso al finalizar la fase

Estado: Aprobada para implementación
HU de origen: docs/historias/HU-004.md
Decisiones: decisiones.md

## Contexto y objetivo

Avisar al estudiante cuando termina una fase de estudio o descanso. Con la
aplicación en primer plano, se muestra una pantalla de alarma con señales
continuas mientras esa pantalla permanezca visible. En segundo plano, con la
aplicación cerrada o el teléfono bloqueado, se solicita una sola entrega de
notificación local. Ninguna señal ni puntualidad se garantiza frente a las
restricciones del sistema operativo o del dispositivo.

La transición de fases pertenece a HU-001/HU-002 y la persistencia de la sesión
a HU-003. HU-004 conserva su condición de línea base histórica; los cambios
aprobados del comportamiento al tocar el cuerpo de la notificación se registran
en D-011.

## Usuarios

- Estudiante.

## Requisitos funcionales

- **RF-1:** MIENTRAS una fase temporizada está activa, EL SISTEMA programa una
  notificación local para su hora de finalización; en Android 12 o posterior
  solicita la programación exacta si el acceso especial «Alarmas y
  recordatorios» está concedido. SI ese acceso no está concedido, el sistema
  puede retrasar la notificación; CUANDO el estudiante vuelve después de la
  hora de finalización, EL SISTEMA reconcilia la fase con el tiempo persistido.
  Origen: HU-004, escenario «Aviso con el celular en sonido»; decisiones D-007
  y D-010.
- **RF-2:** CUANDO termina una fase, EL SISTEMA solicita una notificación local
  de una sola entrega que identifica la fase terminada y solicita sonido y
  vibración, incluso si la aplicación está en primer plano. La alarma continua
  de la pantalla en primer plano es una señal separada. Origen: HU-004,
  escenario «Aviso con el celular en sonido»; decisiones D-001, D-008 y D-012.
- **RF-3:** CUANDO el teléfono está en silencio o vibración, EL SISTEMA solicita
  para la notificación una señal con comportamiento de alarma, vibración y
  presentación en la pantalla de bloqueo. EL SISTEMA no garantiza que el
  sistema operativo, el fabricante o la configuración permitan esas señales ni
  que se superen silencio o No molestar. Origen: HU-004, escenario «Aviso con
  el celular en silencio»; decisión D-001.
- **RF-4:** CUANDO el estudiante toca el cuerpo de una notificación de fin de
  fase, EL SISTEMA abre la aplicación y muestra la pantalla de alarma para la
  fase terminada. CUANDO selecciona la acción de notificación «Detener», EL
  SISTEMA conserva el comportamiento existente: descarta y silencia la
  notificación y abre la aplicación en la siguiente fase del Pomodoro. Origen:
  HU-004, escenario «Detener el aviso»; decisión D-005, ajustada por D-011.
- **RF-5:** CUANDO la aplicación necesita notificaciones por primera vez, EL
  SISTEMA explica su propósito y solicita permiso antes de usarlas. Origen:
  HU-004, escenario «Permiso de notificaciones»; decisión D-002.
- **RF-6:** SI el permiso de notificaciones no está concedido, ENTONCES EL
  SISTEMA conserva el funcionamiento del temporizador y explica la opción de
  permitir avisos o iniciar sin ellos en el diálogo inicial, sin mostrar avisos
  persistentes en la pantalla del temporizador. EL SISTEMA no persiste por
  separado la elección «Iniciar sin avisos». Los errores reales de configuración
  se muestran en un diálogo. Origen: HU-004, escenario «Permiso de
  notificaciones»; decisiones D-002, D-006 y D-014.
- **RF-7:** SI EL SISTEMA detecta con certeza que una restricción afecta el
  aviso, ENTONCES informa esa limitación sin afirmar que la señal bloqueada se
  emitió o mostró; SI no puede detectarla con certeza, no la informa ni
  promete la emisión. CUANDO el estudiante vuelve tras un aviso no mostrado,
  EL SISTEMA presenta el estado de fase derivado del tiempo persistido. Origen:
  HU-004, escenario «Aviso con el celular en silencio»; decisiones D-001 y
  D-002.
- **RF-8:** CUANDO una fase termina con la aplicación en primer plano o el
  estudiante toca el cuerpo de su notificación, EL SISTEMA muestra una pantalla
  de alarma con «¡Tiempo terminado!», el nombre de la fase terminada y un botón
  grande «Detener» en la parte inferior. Origen: adición aprobada del cliente.
- **RF-9:** MIENTRAS la pantalla de alarma está visible, EL SISTEMA reproduce
  audio en bucle, repite la vibración y mantiene encendida la pantalla. CUANDO
  la pantalla se cierra o desmonta, EL SISTEMA detiene el audio y la vibración.
  Origen: adición aprobada del cliente.
- **RF-10:** CUANDO el estudiante pulsa «Detener» en la pantalla de alarma, EL
  SISTEMA detiene el audio y la vibración, cierra esa pantalla y muestra la
  siguiente fase conforme a la transición y al estado persistido existentes.
  Origen: adición aprobada del cliente.

## Requisitos no funcionales

- El comportamiento funciona localmente y sin conexión.
- La notificación con la aplicación cerrada o bloqueada es únicamente una
  solicitud de entrega única. No se promete audio/vibración continuos ni
  apertura automática de una interfaz a pantalla completa.
- La alarma continua, vibración repetitiva y pantalla activa se limitan a la
  pantalla de alarma en primer plano. Mantener la pantalla activa no impide que
  el estudiante la bloquee manualmente ni mantiene la alarma si el proceso
  termina.
- Se usarán `expo-audio` para reproducir en bucle, `expo-keep-awake` para
  mantener activa la pantalla y la API `Vibration` de React Native para la
  vibración repetitiva. El cliente aprobó instalar las dependencias mediante
  `npx expo install`.
- El sonido de la alarma en primer plano será un archivo breve, original y sin
  copyright bajo `assets/`, aprobado por el cliente; no reemplaza el sonido del
  canal de notificación.
- Audio, vibración, visibilidad en pantalla de bloqueo y puntualidad dependen
  de permisos, configuración del canal, sistema operativo y dispositivo. No se
  promete eludir silencio, No molestar o restricciones del fabricante.
- El tiempo persistido, no la hora de entrega de la notificación, determina la
  fase vigente.
- La aplicación informa solo las limitaciones que puede detectar con certeza,
  conforme a D-002.

## Casos límite

- Android puede retrasar una notificación; al volver, la fase se reconcilia con
  el tiempo persistido.
- La notificación no se muestra o el permiso está denegado: se conserva el
  temporizador y el estado se comunica conforme a RF-6/RF-7.
- Una notificación visible con la aplicación cerrada o el teléfono bloqueado
  solo puede solicitar una entrega; no inicia por sí sola el bucle ni una
  pantalla propia. Si el estudiante toca su cuerpo y abre la aplicación, se
  muestra la pantalla de alarma en primer plano.
- La acción «Detener» de la notificación sigue mostrando la siguiente fase; no
  equivale a tocar el cuerpo de la notificación.
- Si la finalización se detecta simultáneamente por el temporizador y por la
  reanudación de la aplicación, solo se abre una pantalla de alarma y se
  solicita una notificación.
- Si la pantalla de alarma se cierra o desmonta, cesan sus señales continuas.
- El sonido predeterminado de la notificación puede variar por dispositivo; no
  se promete una duración mínima.

## Fuera de alcance

- Garantizar que una señal interrumpa silencio, No molestar o restricciones del
  fabricante.
- Mantener la alarma en bucle tras cerrar la aplicación, iniciar un servicio
  nativo en primer plano o abrir automáticamente una interfaz a pantalla
  completa desde el bloqueo. Esas capacidades requieren mecanismos nativos
  adicionales y no se prometen.
- Sincronización remota, cuentas, analítica o servicios externos.
- Lógica de transición de fases y persistencia de sesión, cubiertas por
  HU-001/HU-002 y HU-003.

## Criterios de finalización

- Jest comprueba programación/cancelación, permisos y respuestas diferenciadas
  de notificación, además de la pantalla de alarma y la limpieza de audio,
  vibración y pantalla activa.
- En dispositivo Android se valida la experiencia de alarma en primer plano,
  el toque del cuerpo frente a la acción «Detener», permisos, canal y una sola
  entrega con la aplicación cerrada/bloqueada. Se registran los resultados
  reales sin convertirlos en garantías de plataforma.
- Se comprueba que al detener la alarma se muestra la siguiente fase y que el
  estado continúa reconciliándose desde el tiempo persistido.
- No se afirma que la notificación mantenga señales continuas o abra la
  pantalla automáticamente con la aplicación cerrada/bloqueada.
