# Plan técnico – Temporizador de estudio

Estado: aprobado
Spec: [spec.md](./spec.md)
HU: [HU-001](../../docs/historias/HU-001.md)

## Alcance y trazabilidad

Implementar inicio, visualización, pausa, reanudación y reinicio confirmado o
cancelado para la fase actual de estudio. El plan cubre RF-1 a RF-6 y D-001.
No incluye avanzar a otra fase, persistencia/restauración tras cerrar la app,
notificaciones ni configuración de duraciones (HU-002 a HU-005).

| Requisito | Cobertura prevista |
| --- | --- |
| RF-1 | Dominio inicia desde la duración de estudio configurada; hook y pantalla conectan la acción «Iniciar». |
| RF-2 | El dominio formatea el tiempo y el hook refresca la vista; la pantalla lo presenta como minutos y segundos. |
| RF-3 | La transición pura a pausado conserva el restante calculado en el instante de pausa. |
| RF-4 | La transición pura a corriendo calcula un nuevo `targetEndTime` desde el restante pausado. |
| RF-5 | Reinicio confirmado vuelve a la duración inicial conservando el estado previo; el diálogo requiere confirmación explícita. |
| RF-6 | Cancelar o descartar el diálogo no ejecuta transición ni modifica el estado del temporizador. |

## Archivos y responsabilidades

| Archivo | Responsabilidad |
| --- | --- |
| `src/domain/study-timer.ts` (nuevo) | Estado y transiciones puras del temporizador, cálculo desde `targetEndTime`, restante pausado y formato `MM:SS`. RF-1 a RF-5. |
| `src/domain/__tests__/study-timer.test.ts` (nuevo) | Pruebas unitarias deterministas de transiciones, límites de tiempo y formato. RF-1 a RF-5. |
| `src/hooks/use-study-timer.ts` (nuevo) | Adaptador React: mantiene el estado del dominio, expone acciones y refresca el restante visible sin ser fuente de verdad del tiempo. RF-1 a RF-5. |
| `src/app/index.tsx` (existente) | Reemplazar el contenido de plantilla de la pantalla principal por los controles del temporizador en español, áreas seguras, etiquetas accesibles y estilos de marca. RF-1 a RF-6. |
| `src/app/__tests__/index.test.tsx` (nuevo) | Pruebas de interacción/renderizado para controles, confirmación y cancelación del reinicio. RF-1, RF-2, RF-5 y RF-6. |
| `src/constants/theme.ts` (existente) | Reutilizar los tokens existentes y añadir únicamente los tokens de marca necesarios para esta interfaz, sin introducir colores fuera de la paleta aprobada. RF-2 y presentación de RF-1 a RF-6. |

No se prevén cambios de dependencias ni de persistencia. Jest y
`@testing-library/react-native` ya están declarados. Los restantes RF se
cubren en las transiciones puras indicadas arriba.

## Dominio puro

Representar el estado con una unión discriminada para que el temporizador
corriendo tenga `targetEndTime` y el pausado conserve su tiempo restante. La
duración inicial de la fase se mantiene para poder reiniciar. Las funciones
reciben el instante actual como argumento; no leen reloj, React ni
AsyncStorage directamente.

- Iniciar: toma la duración configurada y el instante actual y crea un estado
  corriendo con `targetEndTime = ahora + duración`.
- Calcular restante: en estado corriendo deriva el tiempo exclusivamente de
  `targetEndTime - ahora`; en pausado usa el tiempo guardado al pausar.
- Pausar: calcula el restante usando el reloj proporcionado y cambia al estado
  pausado.
- Reanudar: calcula `targetEndTime = ahora + restante pausado` y cambia al
  estado corriendo.
- Reiniciar: si estaba corriendo, establece un nuevo `targetEndTime` usando la
  duración inicial; si estaba pausado, restaura esa duración como restante y
  sigue pausado (D-001).
- Formatear: convierte el restante no negativo a minutos y segundos para la
  vista. La representación del estado terminado o el avance automático de
  fase no se amplían en este alcance.

## Persistencia

No se agrega persistencia en HU-001: la recuperación al cerrar la aplicación
pertenece a HU-003. `targetEndTime` es la única fuente de verdad mientras el
temporizador corre, conforme a la constitución; el intervalo visual solo
solicita refrescos para volver a calcular lo mostrado.

La fuente de la duración configurada no existe aún en la estructura revisada.
No se inventará una duración por defecto ni se añadirá almacenamiento: la
pantalla recibirá la duración configurada mediante una interfaz de entrada
preparada para conectarse a la configuración local de HU-005. Integrar esa
configuración real es un prerrequisito antes de afirmar que RF-1 utiliza una
duración editable/configurada por el estudiante.

## Algoritmo en pseudocódigo

```text
iniciar(duración, ahora):
  retornar corriendo(
    duraciónInicial = duración,
    targetEndTime = ahora + duración
  )

restante(estado, ahora):
  si estado es corriendo:
    retornar máximo(0, estado.targetEndTime - ahora)
  si estado es pausado:
    retornar estado.restantePausado

pausar(estado, ahora):
  restanteActual = restante(estado, ahora)
  retornar pausado(duraciónInicial = estado.duraciónInicial,
                   restantePausado = restanteActual)

reanudar(estado, ahora):
  retornar corriendo(
    duraciónInicial = estado.duraciónInicial,
    targetEndTime = ahora + estado.restantePausado
  )

reiniciar(estado, ahora):
  si estado era corriendo:
    retornar corriendo(targetEndTime = ahora + estado.duraciónInicial)
  si estado era pausado:
    retornar pausado(restantePausado = estado.duraciónInicial)

cancelarReinicio(estado):
  no cambiar estado; cerrar el diálogo
```

## Interfaz

- Sustituir el contenido de bienvenida de la pantalla principal por el estado
  del temporizador y acciones contextuales para iniciar, pausar y reanudar.
- Mostrar el restante en minutos y segundos y acompañar el estado con texto,
  no depender únicamente del color.
- Solicitar confirmación explícita antes de reiniciar y mantener el estado
  intacto si se cancela. Usar el diálogo del sistema según la constitución.
- Respetar áreas seguras, usar `StyleSheet`, incluir etiquetas de accesibilidad
  en acciones/iconos y mantener todos los textos visibles en español.
- Aplicar los roles de marca: encabezado azul marino `#0A1931` con texto
  blanco; acento/botón primario dorado `#E6B800` con texto `#111111`;
  reinicio rojo `#DC2626` con texto blanco; fondos y grises únicamente según
  la paleta cotopaxi-brand. Nunca usar texto blanco sobre dorado.

## Decisiones técnicas

| Decisión | Justificación | Alternativa descartada |
| --- | --- | --- |
| Dominio independiente de React y AsyncStorage, con reloj inyectado | Hace las transiciones reproducibles y verificables con Jest; sigue la constitución. | Implementar conteo y reglas dentro del componente React. |
| `targetEndTime` para el estado corriendo y restante almacenado solo al pausar | Evita deriva por retraso de intervalos y conserva el tiempo exacto al pausar. | Decrementar un contador cada segundo como fuente de verdad. |
| Hook React como adaptador entre dominio y pantalla | Mantiene la presentación separada de la lógica temporal y centraliza el refresco visual. | Replicar intervalos y transiciones dentro de la pantalla. |
| Reinicio confirmado conserva corriendo/pausado | Sigue D-001, decisión aceptada por el estudiante. | Forzar siempre pausa o siempre ejecución. |
| Sin persistencia ni duración por defecto en esta historia | Esas decisiones quedan fuera de HU-001; la duración la proveerá la configuración cuando exista. | Añadir AsyncStorage o asumir una duración fija. |
| Componentes React Native existentes, `StyleSheet` y diálogo del sistema | Mantiene el stack actual, soporta áreas seguras y satisface la confirmación requerida. | Añadir una librería de interfaz o usar un diálogo propio no especificado. |

## Estrategia de pruebas

### Jest – dominio

- RF-1: iniciar con una duración de prueba y comprobar estado corriendo y
  `targetEndTime = ahora + duración`.
- RF-2: comprobar formato de minutos/segundos, incluyendo ceros iniciales y
  valores inferiores a un minuto.
- RF-3: pausar en un instante controlado y comprobar que el restante se
  conserva y deja de depender del reloj.
- RF-4: reanudar con un instante controlado y comprobar que el nuevo
  `targetEndTime` incorpora exactamente el restante conservado.
- RF-5/D-001: reiniciar desde corriendo y pausado; comprobar duración inicial
  en ambos casos y conservación del estado respectivo.

### Jest – pantalla

- RF-1/RF-2: verificar acciones visibles en español y el tiempo renderizado.
- RF-3/RF-4: verificar que los controles reflejan los estados de pausa y
  reanudación.
- RF-5: confirmar el diálogo y verificar que se invoca el reinicio.
- RF-6: cancelar y descartar el diálogo y comprobar que el tiempo/estado no
  cambia.
- Confirmar etiquetas de accesibilidad para las acciones interactivas.

### Validación manual

Probar en Expo Go/emulador Android: pantalla vertical y rotada, áreas seguras,
lectura de minutos/segundos, inicio/pausa/reanudación, confirmación y
cancelación del reinicio, contraste y nombres accesibles. La restauración
tras cerrar la app y el comportamiento de notificaciones no son validación de
esta historia (HU-003/HU-004).

## Prerrequisitos y riesgos

- La especificación y este plan fueron aprobados explícitamente por el usuario
  en esta sesión.
- La pantalla no tiene aún una fuente de duración configurada. No se debe
  reemplazarla por un valor asumido; la integración completa depende de HU-005.
- La finalización de una cuenta y el estado posterior no están especificados
  en HU-001. Esta historia no debe avanzar automáticamente a otra fase.
