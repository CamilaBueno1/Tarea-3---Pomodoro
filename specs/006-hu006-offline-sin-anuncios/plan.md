# Plan 006 - Uso sin registro, sin internet y sin publicidad

Estado: aprobada
Spec: `specs/006-hu006-offline-sin-anuncios/spec.md` (aprobada)
HU de origen: `docs/historias/HU-006.md`

## Alcance y trazabilidad

El plan verifica y, solo si las pruebas revelan una carencia, contempla ajustar
la integración existente para cumplir la spec. No añade comportamiento a
HU-001–HU-005 ni modifica sus reglas. No se incorporan cuentas, servicios de
red, publicidad, permisos ni dependencias.

| Escenario de HU-006 | RF | Cobertura prevista |
| --- | --- | --- |
| Abrir la aplicación por primera vez | RF-1 | Comprobar la ruta inicial existente y que abre el temporizador sin registro ni inicio de sesión. |
| Usarla sin conexión | RF-2 | Probar temporizador, avisos y ajustes sin datos ni Wi-Fi; los avisos quedan sujetos a HU-004 y a las capacidades del sistema operativo. |
| Usarla sin conexión | RF-3 | Verificar persistencia local de los ajustes y su disponibilidad al volver a abrir la app sin conexión. |
| Usarla sin publicidad | RF-4 | Revisar todas las pantallas y los manifiestos; no introducir ni mostrar anuncios. |

## Archivos y responsabilidades

### Archivos existentes que se reutilizan

- `src/app/_layout.tsx`: composición actual de proveedores y navegación raíz;
  conservar el flujo directo sin añadir autenticación (RF-1).
- `src/app/(tabs)/_layout.tsx` y `src/components/app-tabs.tsx`: pestañas
  actuales de Temporizador y Ajustes (RF-1, RF-2, RF-4).
- `src/app/(tabs)/index.tsx`: interfaz del temporizador y explicación/opción
  de permisos de avisos definida por HU-004; no condicionar su uso a Internet
  (RF-1, RF-2, RF-4).
- `src/app/(tabs)/settings.tsx`: interfaz de ajustes y presentación de fallos
  al cargar o guardar (RF-2, RF-3, RF-4).
- `src/hooks/use-pomodoro-settings.tsx` y
  `src/storage/pomodoro-settings-storage.ts`: carga y persistencia local de
  ajustes con AsyncStorage, sin servicio remoto (RF-2, RF-3).
- `src/hooks/use-pomodoro-session.tsx`,
  `src/domain/pomodoro-session.ts`,
  `src/domain/study-timer.ts` y
  `src/storage/study-session-storage.ts`: sesión, cómputo y persistencia del
  temporizador existentes, según HU-001–HU-003 (RF-2).
- `src/storage/study-notifications.ts`: avisos locales existentes; mantener
  permisos y limitaciones de HU-004, sin añadir garantías de entrega (RF-2).
- `src/domain/pomodoro-settings.ts`: validación pura y valores de ajustes
  usados por HU-005; no requiere cambios para introducir conectividad (RF-2,
  RF-3).
- `app.json` y `package.json`: inspección de configuración y dependencias para
  confirmar que el plan no incorpora anuncios, red, autenticación ni nuevas
  dependencias (RF-1–RF-4).

No se prevén archivos nuevos de aplicación ni cambios funcionales a esos
archivos. Si la validación encuentra una carencia concreta, el cambio se
mantendrá dentro de este alcance aprobado y se reflejará en tareas antes de
implementar.

### Pruebas existentes que se reutilizan o amplían

- `src/app/__tests__/index.test.tsx`: prueba de pantalla para temporizador
  visible sin textos/controles de registro o inicio de sesión (RF-1); no
  sustituye la prueba de ruta inicial en instalación limpia.
- `src/domain/__tests__/pomodoro-session.test.ts` y
  `src/domain/__tests__/study-timer.test.ts`: regresión de la lógica del
  temporizador que debe seguir siendo local y conforme a HU-001–HU-003 (RF-2).
- `src/storage/__tests__/study-notifications.test.ts`: regresión de la
  programación local según HU-004, sin atribuir a Jest verificación de entrega
  en un dispositivo sin conexión (RF-2).
- `src/domain/__tests__/pomodoro-settings.test.ts` y
  `src/storage/__tests__/pomodoro-settings-storage.test.ts`: validación y
  persistencia de ajustes; comprobar lectura y escritura local, incluidos
  errores visibles (RF-2, RF-3).
- `src/app/__tests__/settings.test.tsx`: regresión de la pantalla y mensajes
  de la operación de ajustes (RF-3, RF-4).

No se propone una prueba Jest artificial para «ausencia de anuncios» mediante
una búsqueda de texto o nombres de paquetes: esa comprobación es más fiable
como revisión de pantallas/rutas y manifiestos, además de validación manual
(RF-4).

## Dominio puro

HU-006 no requiere nuevas reglas de dominio. Se mantienen las funciones puras
existentes de `src/domain/pomodoro-session.ts`,
`src/domain/study-timer.ts` y `src/domain/pomodoro-settings.ts`; sus pruebas
confirman que el cómputo y la validación no dependen de conectividad
(RF-2, RF-3).

## Persistencia

Reutilizar `@react-native-async-storage/async-storage` y las capas locales
existentes para ajustes y sesión. La carga/escritura de ajustes no debe
depender de una solicitud remota; un error de almacenamiento debe seguir
presentándose como error, no como guardado exitoso. No se cambia el formato de
los datos guardados ni se agrega sincronización (RF-2, RF-3).

## Algoritmo previsto

```text
al iniciar la aplicación:
  abrir la ruta inicial ya definida por Expo Router
  mostrar el temporizador sin paso de cuenta o autenticación
  cargar ajustes y sesión desde sus persistencias locales existentes
  si la carga falla, conservar la presentación de error ya definida

al usar el temporizador o los ajustes:
  ejecutar las reglas actuales de HU-001–HU-005
  leer/guardar los datos localmente según el flujo existente
  si el temporizador solicita avisos, usar solo el mecanismo local de HU-004
  no requerir ni consultar conectividad para habilitar estas funciones

al revisar pantallas:
  confirmar que ninguna incluye contenido o integración publicitaria
```

El pseudocódigo no altera la transición de fases, persistencia de sesión,
permisos ni limitaciones del sistema operativo especificados en las historias
anteriores (RF-2).

## Interfaz

Se reutiliza la navegación Expo Router real: `src/app/(tabs)/` contiene
`index.tsx` (Temporizador) y `settings.tsx` (Ajustes). No se propone una ruta
nueva, pantalla de bienvenida, registro ni inicio de sesión. El temporizador
debe ser el destino directo de la primera apertura; Ajustes conserva su
operación local. Ninguna pantalla debe mostrar anuncios (RF-1–RF-4).

## Decisiones técnicas y alternativas descartadas

- **Reutilizar navegación y persistencia locales existentes.** Se ajusta al
  flujo actual del proyecto y a la spec; se descartan una pantalla de
  autenticación, cuentas y una ruta inicial nueva (RF-1–RF-3).
- **Mantener AsyncStorage y avisos locales ya usados.** Evita trasladar datos
  fuera del dispositivo y no exige Internet. Se descartan backend,
  sincronización, APIs remotas y un proveedor de avisos en red (RF-2, RF-3).
- **No agregar SDK ni componente publicitario.** La ausencia de anuncios es un
  requisito de producto, no una integración opcional; se descarta incorporar
  un SDK de publicidad o espacios de anuncios (RF-4).
- **No añadir dependencias ni permisos.** Las dependencias y permisos actuales
  permanecen sujetos a HU-004 y a la configuración existente; HU-006 no los
  amplía (RF-2).

## Estrategia de pruebas con Jest

1. Ejecutar `npx jest` para las pruebas de dominio, almacenamiento,
   notificaciones y pantallas citadas; ampliar únicamente las pruebas
   existentes si falta una aserción directamente verificable (RF-1–RF-3).
2. A nivel de pantalla, comprobar que la vista del temporizador presenta su
   contenido de uso y no ofrece registro/inicio de sesión; validar también los
   ajustes y su manejo de errores ya definidos (RF-1, RF-3).
3. En las pruebas de almacenamiento, comprobar que los ajustes válidos se
   leen/escriben en AsyncStorage y que un fallo no se representa como
   persistencia exitosa (RF-3).
4. Tratar las pruebas unitarias de temporizador y notificaciones como
   regresión de HU-001–HU-004: Jest no simula la radio del dispositivo ni
   demuestra recepción real sin conectividad (RF-2).
5. No usar Jest como sustituto de la inspección completa de anuncios ni de
   la prueba de ruta inicial de instalación limpia (RF-1, RF-4).

## Riesgos, prerrequisitos y validación manual

- La verificación de avisos depende de la implementación de HU-004, del permiso
  otorgado y de las políticas del dispositivo. No se afirma que el aviso se
  entregue con una garantía adicional ni que se fuerce sonido/vibración
  (RF-2).
- Para validar RF-1, instalar una build limpia o restablecer sus datos y abrir
  por primera vez; comprobar que se muestra el temporizador sin registro ni
  inicio de sesión.
- Para validar RF-2 y RF-3, desactivar datos móviles y Wi-Fi (modo avión con
  Wi-Fi comprobado apagado), usar temporizador y ajustes, guardar un cambio,
  cerrar y volver a abrir la app todavía sin conexión y comprobar los ajustes
  guardados. Probar avisos conforme a HU-004 y anotar el resultado real del
  sistema/dispositivo.
- Para validar RF-4, revisar todas las pantallas y rutas accesibles de la app,
  además de `app.json` y `package.json`, y confirmar que no se presenta
  publicidad.
- La validación manual debe realizarse en Expo Go o emulador/dispositivo
  Android según las capacidades de HU-004. La memoria del proyecto indica que
  aún no se dispone de confirmación de dispositivo para esta validación.
- No se detectaron dudas abiertas en la spec aprobada. El plan fue aprobado
  explícitamente y habilita la generación de tareas; la implementación requiere
  aprobación explícita de las tareas y se realizará una tarea por vez.
