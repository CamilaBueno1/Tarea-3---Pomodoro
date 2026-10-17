# Plan técnico – Ajustes de Pomodoro

Estado: Aprobado
Spec: [spec.md](./spec.md)
Decisiones: [decisiones.md](./decisiones.md)
HU: [HU-005](../../docs/historias/HU-005.md)

## Alcance y trazabilidad

La propuesta cubre edición y validación de las tres duraciones y del objetivo
de pomodoros por ciclo, persistencia local, restablecimiento confirmado,
presentación en una segunda pestaña «Ajustes» y contrato de aplicación de
cambios a fases/ciclos futuros. No implementa la lógica de transiciones de
HU-002.

| Requisito | Cobertura prevista |
| --- | --- |
| RF-1, RF-2, RF-3 | Modelo puro de ajustes y validación de rango; formularios muestran errores y no guardan entradas inválidas. |
| RF-4 | Valores iniciales del dominio y acción de restablecer confirmada. |
| RF-5, RF-10 | Adaptador de persistencia local y estado de error visible; pruebas de lectura, escritura y recuperación al abrir. |
| RF-6 | El temporizador conserva el `initialDurationMs` capturado al iniciar; los futuros inicios leen la configuración actual. |
| RF-7 | Contrato para que HU-002 capture la cantidad al comenzar el ciclo y lea el valor actualizado en el siguiente ciclo; depende de integración de HU-002. |
| RF-8, RF-9 | Confirmación explícita antes de guardar cambios o restablecer; cancelar mantiene el estado aplicado. |
| RF-11 | Segunda pestaña Expo Router con etiqueta «Ajustes» y pantalla de configuración. |

## Archivos y responsabilidades

Las rutas y responsabilidades siguientes forman parte del plan aprobado.

| Archivo | Estado actual / responsabilidad propuesta | RF |
| --- | --- | --- |
| `src/domain/pomodoro-settings.ts` (nuevo) | Modelo puro, valores predeterminados, validación de duraciones y cantidad; sin React ni almacenamiento. | RF-1 a RF-4 |
| `src/domain/__tests__/pomodoro-settings.test.ts` (nuevo) | Pruebas Jest deterministas de valores iniciales, límites inclusivos, campos vacíos y rechazo de valores inválidos. | RF-1 a RF-4 |
| `src/storage/pomodoro-settings-storage.ts` (nuevo; la carpeta `src/storage/` no existe actualmente) | Lectura y escritura local mediante AsyncStorage, con errores propagados al consumidor. | RF-5, RF-10 |
| `src/storage/__tests__/pomodoro-settings-storage.test.ts` (nuevo) | Pruebas Jest de lectura, escritura, reinicio de almacenamiento simulado y errores. | RF-5, RF-10 |
| `src/hooks/use-pomodoro-settings.ts` (nuevo) | Proveedor/contexto compartido: carga inicial, expone ajustes cargados, coordina escritura antes de anunciar guardado y expone estado de error. | RF-4 a RF-7, RF-10 |
| `src/hooks/__tests__/use-pomodoro-settings.test.tsx` (nuevo) | Pruebas del estado de carga, valores compartidos por rutas, actualización y fallos de persistencia. | RF-4 a RF-7, RF-10 |
| `src/app/_layout.tsx` (existente) | Envolver las rutas/pestañas con el proveedor compartido, sin cambiar las reglas del temporizador. | RF-5, RF-6, RF-11 |
| `src/app/settings.tsx` (nuevo) | Pantalla de ajustes, campos numéricos, errores de validación, confirmación de guardado/restablecimiento y manejo de carga/error. | RF-1 a RF-5, RF-8 a RF-11 |
| `src/app/__tests__/settings.test.tsx` (nuevo) | Pruebas de formulario, límites, confirmaciones, cancelaciones, estado persistido y accesibilidad. | RF-1 a RF-5, RF-8 a RF-11 |
| `src/components/app-tabs.tsx` y `src/components/app-tabs.web.tsx` (existentes) | Reemplazar el segundo destino/etiqueta de plantilla «Explore» por la ruta y etiqueta «Ajustes»; preservar las dos plataformas que ya tienen navegación diferenciada. | RF-11 |
| `src/app/index.tsx` y `src/hooks/use-study-timer.ts` (existentes) | Consumir la duración configurada para nuevos inicios, sin reemplazar el tiempo inicial de un temporizador ya iniciado. No introducir una duración fija. | RF-1, RF-6 |
| Integración de ciclo HU-002 (no existe en el alcance revisado) | Consumir el objetivo capturado al inicio del ciclo vigente y el nuevo valor al iniciar el siguiente. Se planificará/validará con HU-002. | RF-2, RF-7 |
| `tsconfig.json` y `package.json` (existentes) | Resolver alias de `src/` y habilitar el preset Jest Expo requerido por las pruebas de React Native. | Validación |

## Dominio puro

- Representar las cuatro opciones con un tipo de configuración único: minutos
  de estudio, minutos de descanso corto, minutos de descanso largo y cantidad
  de pomodoros por ciclo.
- Exponer constantes de valores predeterminados propuestas en D-002 y una
  validación pura que compruebe campos enteros y rangos inclusivos.
- No importar React Native ni AsyncStorage desde el dominio.
- Conservar las reglas temporales de HU-001: una fase activa mantiene su
  `initialDurationMs`; el consumidor de la fase siguiente obtiene los ajustes
  vigentes.
- Para ciclos, HU-002 debe conservar el objetivo configurado al inicio del
  ciclo y aplicar cambios de configuración solo al ciclo posterior. No se
  define aquí el algoritmo de transición ni el contador de pomodoros.

## Persistencia

- Persistir solo los cuatro valores de configuración autorizados, en el
  dispositivo, con `@react-native-async-storage/async-storage`.
- Cargar los valores al iniciar el proveedor compartido; exponer el estado de
  carga para no presentar una lectura incompleta como configuración
  definitiva.
- Validar antes de persistir. Después de una escritura exitosa, publicar la
  configuración actualizada a las rutas consumidoras; ante fallo, conservar la
  última configuración confirmada e informar el error.
- Aplicar el mismo flujo de persistencia al restablecimiento, solo después de
  la confirmación.
- No definir ni alterar otros formatos de datos guardados (como la sesión del
  temporizador), que corresponden a otras historias.

## Algoritmo en pseudocódigo

```text
cargarAjustes():
  intentar leer almacenamiento local
  si no existe configuración guardada:
    publicar VALORES_PREDETERMINADOS
  si lectura falla:
    informar error de lectura y no presentar el fallo como guardado

guardarAjustes(borrador):
  resultado = validar(borrador)
  si resultado es inválido:
    mostrar rangos y no persistir
  si resultado es válido:
    solicitar confirmación explícita
    si cancela:
      conservar configuración confirmada vigente
    si confirma:
      intentar persistir resultado
      si escritura falla:
        conservar configuración confirmada vigente y mostrar error
      si escritura tiene éxito:
        publicar resultado como configuración vigente

restablecer():
  solicitar confirmación explícita
  si cancela:
    conservar configuración confirmada vigente
  si confirma:
    guardar VALORES_PREDETERMINADOS mediante el mismo flujo persistente

consumirEnFaseSiguiente():
  una fase ya iniciada conserva su duración inicial
  una fase nueva obtiene la duración vigente

consumirEnCicloSiguiente():
  el ciclo en curso conserva el objetivo capturado al iniciarse
  el ciclo siguiente lee la cantidad vigente
```

## Interfaz

- Sustituir la segunda pestaña de plantilla por «Ajustes», en iOS/Android y
  web, respetando la estructura Expo Router ya existente.
- Mostrar campos de minutos para estudio, descanso corto y descanso largo, y
  un campo para pomodoros por ciclo; presentar sus rangos válidos junto a los
  campos o en el mensaje de validación.
- Usar teclado numérico, etiquetas accesibles en español y un contenedor que
  permita alcanzar Guardar/Restablecer aunque el teclado esté abierto.
- Solicitar confirmación del sistema antes de aplicar cambios y antes de
  restablecer; cancelar no altera los ajustes confirmados.
- Mostrar carga y errores de persistencia sin afirmar que una escritura fallida
  se guardó.
- Mantener componentes React Native existentes, `StyleSheet` y áreas seguras;
  no añadir librerías de interfaz.

## Decisiones justificadas y alternativas

| Decisión propuesta | Justificación | Alternativa descartada |
| --- | --- | --- |
| Dominio puro separado del almacenamiento | Mantiene validación determinista y pruebas Jest sin dispositivos. | Validar campos dentro del componente y duplicar reglas. |
| AsyncStorage local, ya autorizado por el estudiante | Conserva ajustes sin red y corresponde al stack del proyecto. | Backend, cuenta, sincronización o almacenamiento remoto. |
| Proveedor compartido en el layout de Expo Router | Permite que pantalla de ajustes y temporizador lean el mismo estado sin acoplar pantallas. | Lecturas independientes por pantalla con valores potencialmente distintos. |
| Persistir antes de publicar el nuevo valor como guardado | Evita indicar éxito si la escritura local falla, conforme a la Constitución. | Actualizar la interfaz como persistida antes de comprobar la escritura. |
| Capturar duración/objetivo al iniciar fase/ciclo | Mantiene las reglas explícitas de aplicación futura de los cambios. | Alterar una fase o ciclo ya activo al editar los ajustes. |
| Reutilizar la segunda ruta/tab existente y adaptarla | El proyecto ya tiene Expo Router y variantes de pestañas nativa y web. | Incorporar otro sistema de navegación o una dependencia nueva. |

## Estrategia de pruebas

### Jest – dominio

- RF-1/RF-2: verificar que 1, 120, 1 y 12 son válidos en sus campos y que
  0, 121, 0 y 13 son inválidos, respectivamente.
- RF-3: probar campos vacíos, entradas no enteras y que no se produce una
  configuración guardable.
- RF-4: comprobar los cuatro valores predeterminados.
- RF-6: comprobar que el temporizador iniciado conserva su duración inicial
  después de que la configuración fuente cambie; comprobar que un inicio
  posterior recibe el valor nuevo.
- RF-7: integrar con las pruebas de dominio de HU-002 cuando estén disponibles;
  comprobar que el ciclo vigente retiene su objetivo y el siguiente toma el
  valor nuevo. No se puede cerrar esta cobertura en este plan aislado mientras
  HU-002 no esté implementada.

### Jest – almacenamiento y proveedor

- RF-5: simular lectura/escritura y comprobar que los ajustes vuelven a estar
  disponibles después de montar de nuevo el proveedor.
- RF-10: simular rechazo de lectura/escritura; verificar error visible y que
  el cambio no se presenta como persistido.
- RF-4/RF-9: guardar y restablecer valores con AsyncStorage simulado,
  confirmando que cancelar no escribe ni cambia valores.

### Jest – interfaz

- RF-1 a RF-3: verificar teclado numérico, límites, errores y rechazo de
  guardar campos vacíos o fuera de rango.
- RF-8/RF-9: verificar que confirmar aplica, cancelar conserva, y los
  diálogos preceden a guardar/restablecer.
- RF-11: verificar la pestaña «Ajustes» y el acceso a los campos.
- RF-6/RF-7: comprobar contrato al integrarse con el temporizador y los ciclos
  de HU-002; no simular una transición de fase/ciclo no implementada.

### Validación manual

En Expo Go o emulador Android: confirmar que la segunda pestaña muestra
«Ajustes»; revisar orientación, áreas seguras, teclado abierto, etiquetas y
mensajes en español; probar límites, confirmaciones, cancelaciones,
restablecimiento, reinicio de la app y operación sin conexión. Con HU-001 y
HU-002 implementadas, probar además que la fase/ciclo activos mantienen sus
valores y que los siguientes adoptan los nuevos.

## Dependencias ausentes, prerrequisitos y riesgos

- `package.json` no declara `@react-native-async-storage/async-storage` y la
  dependencia no está instalada. Su instalación está autorizada y se realizará
  en T3, cuando se implemente el adaptador.
- Expo Router ya organiza pantallas en `src/app/` y tiene una pestaña
  «Explore» en las implementaciones de pestañas nativa y web; la propuesta
  conserva el esquema y adapta ese segundo destino.
- `src/storage/` aún no existe; sería una carpeta nueva propuesta, con el
  adaptador aislado del dominio.
- El proyecto no configura el preset Jest Expo ni el alias `@/` para el
  directorio `src/`; ambos ajustes son necesarios para resolver las rutas y
  ejecutar las pruebas aprobadas.
- El temporizador HU-001 tiene un hook que recibe una duración inicial, pero la
  pantalla actual es de plantilla. T7 de
  `specs/001-temporizador-estudio/tasks.md` debe esperar a que HU-005 ofrezca
  una fuente real; no usar valores ficticios.
- La lógica de ciclo HU-002 no existe en el alcance revisado; RF-7 y su
  prueba integral requieren esa implementación y deben coordinarse con HU-002.
- HU-005 fue aprobada por el estudiante para implementación en esta sesión.
