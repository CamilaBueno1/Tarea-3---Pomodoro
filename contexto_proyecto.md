# Contexto Completo del Proyecto CV-CREATOR-APP


================================================
ðŸ“„ ARCHIVO: .agents\skills\cotopaxi-brand\SKILL.md
================================================

---
name: cotopaxi-brand
description: Úsala siempre que crees, modifiques o revises colores, estilos o pantallas de la aplicación Pomodoro de la Academia Cotopaxi.
---

# Paleta de Marca – Academia Cotopaxi (Cotopaxi Focus)

Fuente: Extracción directa de los colores dominantes del escudo oficial de la Academia Cotopaxi American International School (Azul marino profundo, Blanco nieve y Amarillo dorado solar).

## Roles (fondo, texto y contraste)
- Encabezado y barra superior: fondo 🟦 `#0A1931` (Azul marino profundo), texto ⬜ `#FFFFFF` (Relación de contraste: 16.20:1).
- Botón primario y acentos destacados (Rayos de sol): fondo 🟨 `#E6B800` (Amarillo dorado solar), texto ⬛ `#111111` (Relación de contraste: 5.10:1).
- Acción destructiva / Reiniciar temporizador: fondo 🟥 `#DC2626` (Rojo alerta), texto ⬜ `#FFFFFF` (Relación de contraste: 4.90:1).
- Estado de Descanso / Foco completado: fondo 🟩 `#10B981` (Verde esmeralda), texto ⬜ `#FFFFFF` (Relación de contraste: 4.80:1).
- Fondo general de pantalla: ⬜ `#F9FAFB` (Blanco suave) con texto ⬛ `#111111` (Relación de contraste: 16.50:1).
- Tarjetas, contenedores y campos: fondo ⬜ `#FFFFFF`, texto ⬛ `#111111` (Relación de contraste: 18.50:1).
- Texto secundario / subtítulos: 🟫 `#4B5563` (Gris pizarra, Relación de contraste: 7.10:1 sobre fondo blanco).
- Bordes e inactivos: `#E5E7EB`. Nunca usar como color de texto.

## Prohibido (no cumplen con la relación de contraste mínima de 4.5:1 para texto normal)
- Blanco sobre 🟨 `#E6B800` (Relación de contraste: 3.20:1). Usar obligatoriamente texto negro (`#111111`) sobre el amarillo dorado.

## Reglas
- Usa exclusivamente los colores de esta lista y sus contrastes calculados para garantizar que la interfaz sea visualmente atractiva, profesional y cumpla con la identidad corporativa de la Academia Cotopaxi en todas las pantallas. Si se requiere un nuevo tono, verificar previamente su contraste.

================================================
ðŸ“„ ARCHIVO: .agents\skills\grill-me\SKILL.md
================================================

---
name: grill-me
description: A relentless interview to sharpen a plan or design.
disable-model-invocation: true
---

Call the Skill tool with "grilling".


================================================
ðŸ“„ ARCHIVO: .agents\skills\rn-conventions\SKILL.md
================================================

---
name: rn-conventions
description: Úsala siempre que crees o modifiques pantallas, formularios o componentes de interfaz del Pomodoro de la Academia Cotopaxi.
---

# Convenciones de interfaz en React Native

- Estilos con StyleSheet. Sin librerías de interfaz adicionales.
- Campos de tiempo o ajustes: teclado numérico cuando se requiera ingresar minutos personalizados (`keyboardType="numeric"` o `"number-pad"`).
- Los formularios o pantallas de configuración no deben quedar tapados por el teclado. Usa un contenedor que se desplace o ajuste, permitiendo interactuar con los botones con el teclado abierto.
- Respeta las áreas seguras del dispositivo (muesca y barras del sistema).
- Listas (como historial de sesiones o tareas) con FlatList y una clave estable por elemento (nunca el índice).
- Etiquetas de accesibilidad en botones e iconos del temporizador.
- Eliminar o reiniciar sesión siempre pide confirmación con un diálogo del sistema.
- Todos los textos visibles en español.

## Lista manual de verificación en Expo Go
- [ ] Se ve bien en vertical y al girar el teléfono.
- [ ] El teclado o los controles no tapan los botones de acción del temporizador.
- [ ] Los ajustes de tiempo ingresados se comportan como dice la spec sin errores de formato.
- [ ] Cerrar la app por completo durante una sesión activa conserva el tiempo correcto gracias a `endsAt`.
- [ ] Los textos de estado del temporizador se leen claramente sin depender solo del color.

## Al terminar
Indica qué puntos del checklist has comprobado y cómo.

================================================
ðŸ“„ ARCHIVO: .agents\skills\sdd\SKILL.md
================================================

---
name: sdd
description: Úsala siempre que trabajes con Spec-Driven Development en este proyecto (docs/constitution.md, docs/historias/ o cualquier archivo de specs/): redactar, revisar o cambiar specs, planes y tareas, o implementar y validar tareas de una spec.
---

# Spec-Driven Development (SDD)

## Flujo
Constitución + grill-me → Spec → Clarificación → Plan → Tareas → Implementación → Validación → Cambio.

- Nunca pases a la siguiente fase sin la aprobación explícita del usuario.
- La spec manda: si algo no está en la spec, no se implementa. Si falta una decisión, para y pregunta. Al redactar la spec (`/sdd-spec`) no preguntes: márcala `[NECESITA ACLARACIÓN]` y no la resuelvas tú.
- Un cambio de requisitos se hace primero en la spec, luego en el plan y las tareas, y por último en el código.
- Cada spec vive en `specs/NNN-nombre/` con `decisiones.md`, `spec.md`, `plan.md` y `tasks.md`. `decisiones.md` lo genera `grill-me`; solo `grill-me` o el usuario lo modifican, el agente no añade decisiones por su cuenta.
- Al terminar cada fase, actualiza `MEMORY.md`.

## Plantilla de spec (spec.md)

```markdown
# Spec NNN - <Nombre>

Estado: borrador | aprobada | implementada
HU de origen: docs/historias/HU-00N.md

## Contexto y objetivo
## Usuarios
## Historias de usuario
## Definiciones (solo si hay términos que puedan interpretarse de varias formas)
## Requisitos funcionales
## Requisitos no funcionales
## Casos límite
## Fuera de alcance
## Criterios de finalización
## Dudas abiertas
- [NECESITA ACLARACIÓN] <duda>
```

La spec describe el QUÉ y el POR QUÉ. Nada de stack, arquitectura ni nombres de archivos.

## Requisitos en EARS (en español)
- RF-x: CUANDO <evento>, EL SISTEMA <respuesta>.
- RF-x: SI <condición no deseada>, ENTONCES EL SISTEMA <respuesta>.
- RF-x: MIENTRAS <estado>, EL SISTEMA <respuesta>.
- RF-x: EL SISTEMA <comportamiento permanente>.

Cada RF debe ser verificable y terminar con "Origen:", indicando el escenario de la HU o la decisión de `decisiones.md` de la que sale. Cada escenario de la HU debe quedar cubierto por al menos un RF.

## Plan (plan.md)
Archivos y responsabilidades - Funciones puras - Persistencia - Algoritmo en pseudocódigo - Interfaz - Decisiones justificadas con su alternativa descartada - Estrategia de pruebas con Jest. Indica qué RF cubre cada parte.

## Tareas (tasks.md)

```markdown
- [ ] **Tn. <Descripción>.** RF-x, RF-y
  Hecho cuando: <comprobación verificable>.
```

Máximo 20-30 min por tarea, en orden de dependencia. Si salen más de 10, propón dividir la spec.

## Implementación
Una sola tarea cada vez: pruebas primero (en rojo), después el código, `npx jest` en verde, marcar la tarea y parar. Si la tarea toca la interfaz, entrega la lista manual de verificación y espera a que el usuario confirme que la probó en Expo Go antes de marcarla como hecha.

================================================
ðŸ“„ ARCHIVO: .claude\settings.json
================================================

{
  "enabledPlugins": {
    "expo@claude-plugins-official": true
  }
}


================================================
ðŸ“„ ARCHIVO: .github\agents\build.agent.md
================================================

---
name: build
description: "Use when implementing exactly one approved task from specs/001-pomodoro/tasks.md with TDD and Expo/React Native conventions."
tools: [read, edit, search, execute]
---

Eres el agente Builder de Cotopaxi Focus. Implementas una sola tarea aprobada
del flujo SDD y te detienes al terminarla.

## Puerta de entrada

Antes de modificar código, confirma que existen y están aprobados:

- `specs/001-pomodoro/spec.md`;
- `specs/001-pomodoro/plan.md`;
- la tarea solicitada en `specs/001-pomodoro/tasks.md`.

Lee `AGENTS.md`, `MEMORY.md`, `docs/constitucion.md`, la HU de origen, la spec,
`plan.md`, `tasks.md`, el estado relevante del repositorio y las skills
pertinentes de `.agents/skills/`. Si falta una aprobación, una tarea concreta o
una aclaración requerida, detente y explica qué falta; no infieras autorización
a partir de la solicitud de implementación.

## Límites

- Trabaja solo en la tarea solicitada y en los archivos necesarios que autoriza
  el plan.
- No cambies alcance, requisitos, decisiones, formato de datos persistidos ni
  arquitectura. Si la implementación requiere alguno de esos cambios, detente
  y solicita actualizar primero la spec/plan.
- No instales ni agregues dependencias sin aprobación explícita. En particular,
  comprueba el manifiesto antes de asumir que AsyncStorage ya está disponible.
- No ocultes errores de almacenamiento ni los sustituyas silenciosamente por
  un estado inicial.
- No marques una tarea como hecha si falta validación o una prueba manual
  requerida.

## Procedimiento

1. Para lógica de `src/domain/`, escribe primero pruebas deterministas que
   demuestren los requisitos de la tarea, inyectando el tiempo cuando aplique.
2. Ejecuta la prueba dirigida y confirma que detecta el comportamiento faltante.
3. Implementa el cambio más pequeño que satisfaga los RF asociados.
4. Ejecuta pruebas y validaciones pertinentes; informa todos los fallos sin
   atribuirlos a la tarea sin evidencia.
5. Para UI, carga `cotopaxi-brand` y `rn-conventions`; sigue sus colores,
   contraste, accesibilidad, áreas seguras, textos en español y checklist
   manual de Expo Go.
6. No afirmes que se verificó en un dispositivo. Entrega los pasos manuales y
   espera la confirmación antes de cerrar una tarea que los requiera.

Entrega archivos modificados, tarea/RF cubiertos, pruebas y comandos ejecutados,
resultados, validación manual pendiente y siguiente paso SDD. Detente al
concluir una sola tarea.


================================================
ðŸ“„ ARCHIVO: .github\agents\plan.agent.md
================================================

---
name: plan
description: "Use when clarifying Pomodoro requirements or creating and revising the Cotopaxi SDD spec, architecture plan, and implementation tasks."
tools: [read, edit, search]
---

Eres el agente Planner de Cotopaxi Focus. Tu responsabilidad es análisis y
documentación SDD; no implementas la aplicación.

## Antes de trabajar

Lee `AGENTS.md`, `MEMORY.md`, `docs/constitucion.md`, las HU relacionadas, la
spec activa, los archivos de decisión que existan, `.agents/skills/sdd/SKILL.md`
y los agentes/prompts SDD pertinentes. Comprueba primero el estado de la fase
activa y del repositorio.

En `specs/001-pomodoro/` el archivo de decisiones actualmente se llama
`desiciones.md` (ortografía heredada). No lo renombres ni lo modifiques: solo
el usuario o `grill-me` puede cambiar su contenido. No cites un
`decisiones.md` inexistente como si se hubiera leído.

## Límites

- Trabaja en la fase y los archivos SDD solicitados, sin modificar código de la
  aplicación.
- La spec manda: no planifiques comportamiento contrario a la spec aprobada.
  Si la spec está en borrador, indícalo y no presentes el plan como aprobado ni
  habilitado para implementación.
- No inventes decisiones funcionales, duraciones ni garantías de plataforma.
  Si una duda impide precisar comportamiento, detente en esa fase y solicita
  la aclaración correspondiente conforme a `.agents/skills/sdd/SKILL.md`.
- No modifiques el archivo de decisiones. No avances por iniciativa propia a
  otra fase SDD sin aprobación explícita del usuario.
- Mantén trazabilidad explícita HU → RF → plan → pruebas/tareas cuando esos
  artefactos existan.
- Respeta la estructura real del proyecto. En particular, comprueba Expo
  Router y manifiestos antes de proponer rutas, APIs o dependencias nuevas.

## Procedimiento

1. Para una spec, revisa cada escenario de aceptación y verifica que tenga RF
   verificable en EARS, en español y con su `Origen:`. Registra vacíos como
   `[NECESITA ACLARACIÓN]`; no los resuelvas por cuenta propia.
2. Para un plan aprobado, describe responsabilidades de archivos existentes o
   propuestos, dominio puro, persistencia, algoritmo, interfaz, alternativas y
   pruebas Jest. Mapea las secciones a los RF y señala explícitamente
   dependencias ausentes, prerrequisitos y validación en dispositivo.
3. No des por aprobada una spec/plan ni empieces implementación sin aprobación
   explícita.
4. Para tareas, genera tareas pequeñas con dependencias reales, RF asociados y
   condición `Hecho cuando:` verificable; máximo 10 tareas antes de proponer
   dividir la spec.
5. Al cerrar una fase SDD, actualiza en `MEMORY.md` solo «Estado actual» y
   «Próximos pasos», según las instrucciones del proyecto.

Entrega los archivos tocados, vacíos o riesgos pendientes y el siguiente paso
SDD. No empieces la implementación.


================================================
ðŸ“„ ARCHIVO: .github\agents\reviewer.agent.md
================================================

---
name: reviewer
description: "Use when reviewing Cotopaxi Pomodoro requirements, implementation, tests, and SDD traceability without editing files."
tools: [read, search]
---

Eres el agente Reviewer de Cotopaxi Focus. Revisas en solo lectura la
conformidad de requisitos, cambios y evidencia disponible.

## Antes de revisar

Lee `AGENTS.md`, `MEMORY.md`, `docs/constitucion.md`, las HU implicadas, la
spec, el plan, las tareas si existen, las skills pertinentes y el diff
solicitado. Indica qué artefactos no existen o están en borrador; no simules
una cadena de trazabilidad o aprobación que falte.

## Límites

- No edites archivos, no corrijas hallazgos ni marques tareas como hechas.
- No ejecutes comandos ni atribuyas resultados de pruebas no documentados.
- Distingue evidencia automatizada, revisión estática y verificaciones que
  requieren Expo Go/Android.
- No afirmes que las notificaciones evaden silencio, No molestar ni límites
  del sistema operativo.
- Trata la ausencia de archivos como brecha de proceso o evidencia, no como
  prueba automática de un defecto del producto.

## Revisiones

- Contrasta cada escenario HU con los RF, y cada RF con plan, tarea, código y
  prueba/evidencia manual cuando esos elementos existan.
- Revisa límites de estado, transiciones, persistencia y tratamiento explícito
  de errores; comprueba que el diseño usa la marca de tiempo de vencimiento
  como fuente de verdad y no depende de ticks visuales.
- Comprueba que las decisiones registradas no contradicen la spec y que una
  spec en borrador no se presenta como autorización de implementación.
- Separa hallazgos bloqueantes de mejoras no bloqueantes; prioriza por impacto
  y aporta archivo, RF, evidencia y resultado esperado.
- Si falta evidencia ejecutable, recomienda comandos del proyecto sin
  afirmar que fueron ejecutados.

Empieza con `VEREDICTO: APROBADO` o `VEREDICTO: CAMBIOS NECESARIOS`. Para cada
hallazgo indica prioridad, archivo, RF, evidencia y resultado esperado.
Termina con mejoras no bloqueantes y validaciones pendientes, si las hay.


================================================
ðŸ“„ ARCHIVO: .github\prompts\sdd-change.prompt.md
================================================

---
description: SDD - Nuevo requisito - primero la spec, luego el código
agent: plan
---
Nuevo requisito para la spec specs/$1/ (el texto que va después del nombre de la carpeta): $ARGUMENTS

NO toques código. Usa la skill sdd.
1. Actualiza specs/$1/spec.md: nuevo RF (o cambio de uno existente) en EARS, sus casos límite y lo que queda fuera de alcance.
2. Indica qué partes de plan.md y tasks.md habría que cambiar después.
3. Muéstrame el diff de la spec y espera mi aprobación.

================================================
ðŸ“„ ARCHIVO: .github\prompts\sdd-clarify.prompt.md
================================================

---
description: SDD · Busca solo contradicciones y escenarios sin RF (solo detecta, no resuelve)
agent: plan
---
Revisa specs/$1/spec.md como un QA. Usa la skill sdd. Lee también docs/constitution.md, specs/$1/decisiones.md y la HU indicada en la spec.

Busca SOLO esto:
1. Contradicciones entre requisitos, o entre un requisito y una decisión de decisiones.md.
2. Escenarios de la HU que ningún RF cubra.
3. Conflictos con docs/constitution.md.

Ignora las ambigüedades menores y los casos límite poco probables. Si algo no cambia lo que el usuario ve o hace, no lo listes.

No propongas soluciones y no modifiques ningún archivo. Formato: lista numerada por sección, máximo 10 puntos en total, cada uno en una o dos líneas y citando los RF o las decisiones implicados. Si no hay nada, responde "Sin hallazgos".

================================================
ðŸ“„ ARCHIVO: .github\prompts\sdd-implement.prompt.md
================================================

---
description: SDD · Implementa UNA tarea, pruebas primero (uso - /sdd-implement 001-nombre T3)
agent: build
---
Implementa SOLO la tarea $2 de specs/$1/tasks.md, siguiendo specs/$1/plan.md, docs/constitution.md y la skill sdd.

1. En la lógica, escribe primero las pruebas y comprueba que fallan.
2. Escribe el código hasta que pasen.
3. Ejecuta npx jest y muéstrame el resultado.
4. Si la tarea toca la interfaz, no puedes ejecutar la app: entrégame los puntos de la lista manual que debo probar en Expo Go y espera mi confirmación.
5. Con las pruebas en verde (y mi confirmación si hubo interfaz), marca $2 como hecha en tasks.md e indica qué RF cubre.

Después PÁRATE. No empieces la siguiente tarea.

================================================
ðŸ“„ ARCHIVO: .github\prompts\sdd-plan.prompt.md
================================================

---
description: SDD · Genera el plan técnico de una spec aprobada
agent: plan
---
Lee docs/constitution.md, AGENTS.md y specs/$1/spec.md. Usa la skill sdd.
NO escribas código.

Genera specs/$1/plan.md con: archivos que se crean o modifican y la responsabilidad de cada uno, funciones puras de lógica, persistencia, algoritmo en pseudocódigo, cómo se pinta en la interfaz, decisiones técnicas justificadas (con su alternativa descartada) y estrategia de pruebas con Jest.

Todo debe respetar la constitución y cubrir todos los RF. Marca qué RF cubre cada parte. Si la spec no está aprobada o tiene dudas abiertas, para y avísame.

================================================
ðŸ“„ ARCHIVO: .github\prompts\sdd-spec.prompt.md
================================================

---
description: SDD · Redacta la spec desde la HU y decisiones.md (uso - /sdd-spec 001-nombre HU-001)
agent: plan
---
NO escribas código en ningún momento. Lee docs/constitution.md, MEMORY.md, docs/historias/$2.md y specs/$1/decisiones.md, y usa la skill sdd.

Carpeta de la spec: specs/$1/

No me hagas preguntas: las decisiones ya están en decisiones.md. Genera specs/$1/spec.md siguiendo la plantilla de la skill sdd, con los requisitos en EARS y "Estado: borrador".
- Escribe solo specs/$1/spec.md. No modifiques decisiones.md ni MEMORY.md.
- No añadas decisiones. SqlParameter Si algo no está resuelto en decisiones.md ni en la HU, márcalo [NECESITA ACLARACIÓN] y no lo resuelvas tú.
- Ignora las decisiones que otra posterior haya revocado.
- Cada escenario de la HU debe quedar cubierto por al menos un RF.
- Cada RF termina con "Origen:" y el escenario o la decisión de la que sale.
- Un RF por comportamiento visible: no añadas detalles que ningún escenario ni decisión pida.
- Solo el QUÉ y el POR QUÉ: nada de stack, arquitectura, formatos de almacenamiento ni nombres de archivos.

================================================
ðŸ“„ ARCHIVO: .github\prompts\sdd-status.prompt.md
================================================

---
name: SDD - Consultar estado
description: "Resume el estado actual de la feature SDD, bloqueos y siguiente paso sin editar archivos."
argument-hint: "ID de feature; por defecto 001-pomodoro"
agent: "Cotopaxi Planner"
---

Lee `MEMORY.md` y los archivos existentes en `specs/001-pomodoro/`. Resume el
estado, tareas completas y pendientes, bloqueos y siguiente comando `/sdd-*`
aplicable. No modifiques archivos ni marques tareas como completadas.


================================================
ðŸ“„ ARCHIVO: .github\prompts\sdd-tasks.prompt.md
================================================

---
description: SDD · Divide el plan en tareas pequeñas y verificables
agent: plan
---
A partir de specs/$1/spec.md y specs/$1/plan.md, genera specs/$1/tasks.md siguiendo el formato de la skill sdd:
- Tareas pequeñas (máx. 20-30 min cada una), en orden de dependencia.
- Cada una con los RF que cubre y una línea "Hecho cuando:" verificable.
- Las tareas de lógica se verifican con npx jest; las de interfaz, con puntos concretos de la lista manual de la skill rn-conventions.
- Checkboxes. Intenta que no sean más de 10: si salen más, propón dividir la spec.

================================================
ðŸ“„ ARCHIVO: .github\prompts\sdd-validate.prompt.md
================================================

---
description: SDD - Valida la spec RF por RF (pruebas + lista manual)
agent: build
---
Recorre specs/$1/spec.md requisito por requisito. Para cada RF indica qué prueba lo cubre y el resultado de ejecutar npx jest.

Los RF de interfaz que no se pueden probar con Jest, lístalos como puntos manuales para que yo los verifique en Expo Go.

Si algún RF no está cubierto o falla, dilo claramente. NO arregles nada todavía. Después comprueba los criterios de finalización y dame un veredicto: ¿la spec está cumplida?

================================================
ðŸ“„ ARCHIVO: .gitignore
================================================

# Learn more https://docs.github.com/en/get-started/getting-started-with-git/ignoring-files

# dependencies
node_modules/

# Expo
.expo/
dist/
web-build/
expo-env.d.ts

# Native
.kotlin/
*.orig.*
*.jks
*.p8
*.p12
*.key
*.mobileprovision

# Metro
.metro-health-check*

# debug
npm-debug.*
yarn-debug.*
yarn-error.*

# macOS
.DS_Store
*.pem

# local env files
.env*.local

# typescript
*.tsbuildinfo

# generated native folders
/ios
/android


================================================
ðŸ“„ ARCHIVO: AGENTS.md
================================================

# AGENTS.md – Academia Cotopaxi

App móvil para estudiantes de la Academia Cotopaxi: temporizador Pomodoro de estudio y descansos, notificaciones locales que funcionan con el celular bloqueado, ajustes personalizados, sin anuncios, sin registro y funcional 100% offline. Proyecto académico.

## Stack y estructura
- Expo SDK 57 (plantilla por defecto de create-expo-app), TypeScript y Expo Router.
- Persistencia local con `@react-native-async-storage/async-storage`. Sin backend ni cuentas.
- `src/domain/`: lógica pura del temporizador y cálculo de tiempo (`endsAt`) sin React ni AsyncStorage. `src/storage/`: persistencia. `app/`: pantallas. Pruebas junto a cada módulo, en `__tests__/`.

## Comandos
- Ejecutar: `npx expo start` (si la red bloquea: `npx expo start --tunnel`)
- Pruebas: `npx jest`
- Tipos: `npx tsc --noEmit`

## Convenciones
- Código y nombres en inglés; textos de interfaz y comentarios en español.
- Las reglas de negocio del temporizador se definen con la skill `grill-me` y se registran en la spec de cada historia (`specs/NNN-*/decisiones.md`), no se improvisan.
- Colores y contraste: skill `cotopaxi-brand`. Trampas de interfaz: `rn-conventions`.

## Forma de trabajar
- Lee `docs/constitution.md` y la spec activa (`specs/NNN-*/`) antes de tocar código.
- Si una historia deja vacíos, usa `grill-me` para entrevistar al estudiante antes de redactar las decisiones.
- Antes de escribir código muestra el plan. Una tarea por vez.
- Si tienes dudas, pregunta antes de asumir.

## Límites
- Siempre: pruebas primero en la lógica (`src/domain/`) y textos en español.
- Pregunta antes: instalar dependencias, crear archivos fuera del plan, cambiar el formato de los datos guardados.
- Nunca: agregar cuentas, backend, analítica, publicidad ni reemplazar archivos sin que la tarea lo pida.

## Memoria
- Al empezar lee `MEMORY.md`. Al terminar cada fase de SDD o cada tarea, actualiza solo "Estado actual" y "Próximos pasos" (con el siguiente comando `/sdd-*` a ejecutar).
- No copies decisiones ni contenido de las specs en `MEMORY.md`: remite al archivo (`specs/NNN-*/decisiones.md`). Sin detalles de implementación.
- Máximo ~50 líneas; si lo superas, resúmelo.

## Verificación
- Lógica: `npx jest` en verde. Interfaz: la prueba manual de la tarea en Expo Go / emulador Android.

================================================
ðŸ“„ ARCHIVO: android\.gitignore
================================================

# OSX
#
.DS_Store

# Android/IntelliJ
#
build/
.idea
.gradle
local.properties
*.iml
*.hprof
.cxx/

# generated inline modules
app/src/main/java/inline/

# Bundle artifacts
*.jsbundle


================================================
ðŸ“„ ARCHIVO: android\app\build\kotlinToolingMetadata\kotlin-tooling-metadata.json
================================================

{
  "schemaVersion": "1.1.0",
  "buildSystem": "Gradle",
  "buildSystemVersion": "9.3.1",
  "buildPlugin": "org.jetbrains.kotlin.gradle.plugin.KotlinAndroidPluginWrapper",
  "buildPluginVersion": "2.1.20",
  "projectSettings": {
    "isHmppEnabled": true,
    "isCompatibilityMetadataVariantEnabled": false,
    "isKPMEnabled": false
  },
  "projectTargets": [
    {
      "target": "org.jetbrains.kotlin.gradle.plugin.mpp.KotlinAndroidTarget",
      "platformType": "androidJvm",
      "extras": {
        "android": {
          "sourceCompatibility": "17",
          "targetCompatibility": "17"
        }
      }
    }
  ]
}

================================================
ðŸ“„ ARCHIVO: android\build\generated\autolinking\autolinking.json
================================================

{"root":"C:\\Users\\ASUS\\Documents\\pomodoro-deber\\Tarea-3---Pomodoro","reactNativePath":"C:\\Users\\ASUS\\Documents\\pomodoro-deber\\Tarea-3---Pomodoro\\node_modules\\react-native","dependencies":{"@react-native-async-storage/async-storage":{"root":"C:\\Users\\ASUS\\Documents\\pomodoro-deber\\Tarea-3---Pomodoro\\node_modules\\@react-native-async-storage\\async-storage","name":"@react-native-async-storage/async-storage","platforms":{"android":{"sourceDir":"C:\\Users\\ASUS\\Documents\\pomodoro-deber\\Tarea-3---Pomodoro\\node_modules\\@react-native-async-storage\\async-storage\\android","packageImportPath":"import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;","packageInstance":"new AsyncStoragePackage()","buildTypes":[],"libraryName":"rnasyncstorage","componentDescriptors":[],"cmakeListsPath":"C:/Users/ASUS/Documents/pomodoro-deber/Tarea-3---Pomodoro/node_modules/@react-native-async-storage/async-storage/android/build/generated/source/codegen/jni/CMakeLists.txt","cxxModuleCMakeListsModuleName":null,"cxxModuleCMakeListsPath":null,"cxxModuleHeaderName":null,"isPureCxxDependency":false}}},"@react-native-masked-view/masked-view":{"root":"C:\\Users\\ASUS\\Documents\\pomodoro-deber\\Tarea-3---Pomodoro\\node_modules\\@react-native-masked-view\\masked-view","name":"@react-native-masked-view/masked-view","platforms":{"android":{"sourceDir":"C:\\Users\\ASUS\\Documents\\pomodoro-deber\\Tarea-3---Pomodoro\\node_modules\\@react-native-masked-view\\masked-view\\android","packageImportPath":"import org.reactnative.maskedview.RNCMaskedViewPackage;","packageInstance":"new RNCMaskedViewPackage()","buildTypes":[],"componentDescriptors":[],"cmakeListsPath":"C:/Users/ASUS/Documents/pomodoro-deber/Tarea-3---Pomodoro/node_modules/@react-native-masked-view/masked-view/android/build/generated/source/codegen/jni/CMakeLists.txt","cxxModuleCMakeListsModuleName":null,"cxxModuleCMakeListsPath":null,"cxxModuleHeaderName":null,"isPureCxxDependency":false}}},"expo":{"root":"C:\\Users\\ASUS\\Documents\\pomodoro-deber\\Tarea-3---Pomodoro\\node_modules\\expo","name":"expo","platforms":{"android":{"sourceDir":"C:\\Users\\ASUS\\Documents\\pomodoro-deber\\Tarea-3---Pomodoro\\node_modules\\expo\\android","packageImportPath":"import expo.modules.ExpoModulesPackage;","packageInstance":"new ExpoModulesPackage()","buildTypes":[],"componentDescriptors":[],"cmakeListsPath":"C:/Users/ASUS/Documents/pomodoro-deber/Tarea-3---Pomodoro/node_modules/expo/android/build/generated/source/codegen/jni/CMakeLists.txt","cxxModuleCMakeListsModuleName":null,"cxxModuleCMakeListsPath":null,"cxxModuleHeaderName":null,"isPureCxxDependency":false}}},"react-native-gesture-handler":{"root":"C:\\Users\\ASUS\\Documents\\pomodoro-deber\\Tarea-3---Pomodoro\\node_modules\\react-native-gesture-handler","name":"react-native-gesture-handler","platforms":{"android":{"sourceDir":"C:\\Users\\ASUS\\Documents\\pomodoro-deber\\Tarea-3---Pomodoro\\node_modules\\react-native-gesture-handler\\android","packageImportPath":"import com.swmansion.gesturehandler.RNGestureHandlerPackage;","packageInstance":"new RNGestureHandlerPackage()","buildTypes":[],"libraryName":"rngesturehandler_codegen","componentDescriptors":["RNGestureHandlerButtonComponentDescriptor","RNGestureHandlerDetectorComponentDescriptor","RNGestureHandlerRootViewComponentDescriptor"],"cmakeListsPath":"C:/Users/ASUS/Documents/pomodoro-deber/Tarea-3---Pomodoro/node_modules/react-native-gesture-handler/android/CMakeLists.txt","cxxModuleCMakeListsModuleName":null,"cxxModuleCMakeListsPath":null,"cxxModuleHeaderName":null,"isPureCxxDependency":false}}},"react-native-reanimated":{"root":"C:\\Users\\ASUS\\Documents\\pomodoro-deber\\Tarea-3---Pomodoro\\node_modules\\react-native-reanimated","name":"react-native-reanimated","platforms":{"android":{"sourceDir":"C:\\Users\\ASUS\\Documents\\pomodoro-deber\\Tarea-3---Pomodoro\\node_modules\\react-native-reanimated\\android","packageImportPath":"import com.swmansion.reanimated.ReanimatedPackage;","packageInstance":"new ReanimatedPackage()","buildTypes":[],"libraryName":"rnreanimated","componentDescriptors":[],"cmakeListsPath":"C:/Users/ASUS/Documents/pomodoro-deber/Tarea-3---Pomodoro/node_modules/react-native-reanimated/android/build/generated/source/codegen/jni/CMakeLists.txt","cxxModuleCMakeListsModuleName":null,"cxxModuleCMakeListsPath":null,"cxxModuleHeaderName":null,"isPureCxxDependency":false}}},"react-native-safe-area-context":{"root":"C:\\Users\\ASUS\\Documents\\pomodoro-deber\\Tarea-3---Pomodoro\\node_modules\\react-native-safe-area-context","name":"react-native-safe-area-context","platforms":{"android":{"sourceDir":"C:\\Users\\ASUS\\Documents\\pomodoro-deber\\Tarea-3---Pomodoro\\node_modules\\react-native-safe-area-context\\android","packageImportPath":"import com.th3rdwave.safeareacontext.SafeAreaContextPackage;","packageInstance":"new SafeAreaContextPackage()","buildTypes":[],"libraryName":"safeareacontext","componentDescriptors":["RNCSafeAreaProviderComponentDescriptor","RNCSafeAreaViewComponentDescriptor"],"cmakeListsPath":"C:/Users/ASUS/Documents/pomodoro-deber/Tarea-3---Pomodoro/node_modules/react-native-safe-area-context/android/src/main/jni/CMakeLists.txt","cxxModuleCMakeListsModuleName":null,"cxxModuleCMakeListsPath":null,"cxxModuleHeaderName":null,"isPureCxxDependency":false}}},"react-native-screens":{"root":"C:\\Users\\ASUS\\Documents\\pomodoro-deber\\Tarea-3---Pomodoro\\node_modules\\react-native-screens","name":"react-native-screens","platforms":{"android":{"sourceDir":"C:\\Users\\ASUS\\Documents\\pomodoro-deber\\Tarea-3---Pomodoro\\node_modules\\react-native-screens\\android","packageImportPath":"import com.swmansion.rnscreens.RNScreensPackage;","packageInstance":"new RNScreensPackage()","buildTypes":[],"libraryName":"rnscreens","componentDescriptors":["RNSFullWindowOverlayComponentDescriptor","RNSScreenContainerComponentDescriptor","RNSScreenNavigationContainerComponentDescriptor","RNSScreenStackHeaderConfigComponentDescriptor","RNSScreenStackHeaderSubviewComponentDescriptor","RNSScreenStackComponentDescriptor","RNSSearchBarComponentDescriptor","RNSScreenComponentDescriptor","RNSScreenFooterComponentDescriptor","RNSScreenContentWrapperComponentDescriptor","RNSModalScreenComponentDescriptor","RNSTabsHostComponentDescriptor","RNSSafeAreaViewComponentDescriptor","RNSStackScreenComponentDescriptor","RNSStackHeaderConfigComponentDescriptor","RNSStackHeaderSubviewComponentDescriptor","RNSFormSheetHostComponentDescriptor"],"cmakeListsPath":"C:/Users/ASUS/Documents/pomodoro-deber/Tarea-3---Pomodoro/node_modules/react-native-screens/android/src/main/jni/CMakeLists.txt","cxxModuleCMakeListsModuleName":null,"cxxModuleCMakeListsPath":null,"cxxModuleHeaderName":null,"isPureCxxDependency":false}}},"react-native-worklets":{"root":"C:\\Users\\ASUS\\Documents\\pomodoro-deber\\Tarea-3---Pomodoro\\node_modules\\react-native-worklets","name":"react-native-worklets","platforms":{"android":{"sourceDir":"C:\\Users\\ASUS\\Documents\\pomodoro-deber\\Tarea-3---Pomodoro\\node_modules\\react-native-worklets\\android","packageImportPath":"import com.swmansion.worklets.WorkletsPackage;","packageInstance":"new WorkletsPackage()","buildTypes":[],"libraryName":"rnworklets","componentDescriptors":[],"cmakeListsPath":"C:/Users/ASUS/Documents/pomodoro-deber/Tarea-3---Pomodoro/node_modules/react-native-worklets/android/build/generated/source/codegen/jni/CMakeLists.txt","cxxModuleCMakeListsModuleName":null,"cxxModuleCMakeListsPath":null,"cxxModuleHeaderName":null,"isPureCxxDependency":false}}}},"project":{"android":{"packageName":"com.anonymous.pomodorocotopaxi","sourceDir":"C:\\Users\\ASUS\\Documents\\pomodoro-deber\\Tarea-3---Pomodoro\\android"}}}


================================================
ðŸ“„ ARCHIVO: app.json
================================================

{
  "expo": {
    "name": "pomodoro-cotopaxi",
    "slug": "pomodoro-cotopaxi",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/cotopaxi-logo.jpg",
    "scheme": "pomodorocotopaxi",
    "userInterfaceStyle": "automatic",
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "backgroundColor": "#E6F4FE",
        "foregroundImage": "./assets/images/android-icon-foreground.png",
        "backgroundImage": "./assets/images/android-icon-background.png",
        "monochromeImage": "./assets/images/android-icon-monochrome.png"
      },
      "predictiveBackGestureEnabled": false,
      "package": "com.anonymous.pomodorocotopaxi"
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "resizeMode": "contain",
          "backgroundColor": "#ffffff"
        }
      ],
      "expo-image",
      "expo-notifications"
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "router": {},
      "eas": {
        "projectId": "3f955298-3684-4dac-b90d-5dd096ef9c34"
      }
    }
  }
}


================================================
ðŸ“„ ARCHIVO: dist\metadata.json
================================================

{"version":0,"bundler":"metro","fileMetadata":{"android":{"bundle":"_expo/static/js/android/entry-b42a8487a644d88106acdb0d5458d937.hbc","assets":[{"path":"assets\\8b042be199ec74ce82b9cd2604568e73","ext":"ttf"},{"path":"assets\\0a328cd9c1afd0afe8e3b1ec5165b1b4","ext":"png"},{"path":"assets\\778ffc9fe8773a878e9c30a6304784de","ext":"png"},{"path":"assets\\c79c3606a1cf168006ad3979763c7e0c","ext":"png"},{"path":"assets\\02bc1fa7c0313217bde2d65ccbff40c9","ext":"png"},{"path":"assets\\35ba0eaec5a4f5ed12ca16fabeae451d","ext":"png"},{"path":"assets\\3cd68ccdb8938e3711da2e8831b85493","ext":"png"},{"path":"assets\\61ca7e64b7d605716c57706cef640b9a","ext":"png"},{"path":"assets\\aff2c65b39a296d4f7e96d0f58169170","ext":"png"},{"path":"assets\\d8e7601e3df962f83c62371ac14964d8","ext":"png"},{"path":"assets\\0747a1317bbe9c6fc340b889ef8ab3ae","ext":"png"},{"path":"assets\\d84e297c3b3e49a614248143d53e40ca","ext":"png"},{"path":"assets\\1190ab078c57159f4245a328118fcd9a","ext":"png"},{"path":"assets\\78c625386b4d0690b421eb0fc78f7b9c","ext":"png"},{"path":"assets\\4403c6117ec30c859bc95d70ce4a71d3","ext":"png"},{"path":"assets\\069d99eb1fa6712c0b9034a58c6b57dd","ext":"png"},{"path":"assets\\c3273c9e5321f20d1e42c2efae2578c4","ext":"png"},{"path":"assets\\286d67d3f74808a60a78d3ebf1a5fb57","ext":"png"},{"path":"assets\\d1ea1496f9057eb392d5bbf3732a61b7","ext":"png"},{"path":"assets\\98a4e3d00dbf5d65da99a69b38a7def2","ext":"xml"},{"path":"assets\\9b5cb09b4e669ed0f28f3b3f2871a0a5","ext":"xml"},{"path":"assets\\19eeb73b9593a38f8e9f418337fc7d10","ext":"png"},{"path":"assets\\ab19f4cbc543357183a20571f68380a3","ext":"png"},{"path":"assets\\d8b800c443b8972542883e0b9de2bdc6","ext":"png"},{"path":"assets\\412dd9275b6b48ad28f5e3d81bb1f626","ext":"png"},{"path":"assets\\017bc6ba3fc25503e5eb5e53826d48a8","ext":"png"},{"path":"assets\\20e71bdf79e3a97bf55fd9e164041578","ext":"png"}]}}}

================================================
ðŸ“„ ARCHIVO: docs\constitucion.md
================================================

# Constitución – Cotopaxi Focus

Principios innegociables. Toda spec, plan y tarea debe cumplir con ellos.

1. **La spec manda:** Ningún comportamiento o código se implementa sin una especificación activa aprobada. Ante cualquier vacío, se detiene el desarrollo y se consulta.
2. **Sencillez y privacidad:** Solo las dependencias autorizadas. Sin cuentas, backend, analítica, publicidad, ni permisos que las Historias de Usuario (HU-006) no requieran.
3. **Tiempo comprobable:** La marca temporal de finalización (`targetEndTime`) es la única fuente de verdad del conteo. El intervalo visual solo refresca la pantalla para garantizar precisión al bloquear el celular (HU-003).
4. **Responsabilidades separadas:** Las transiciones y reglas del Pomodoro son funciones puras en `src/domain/`; React presenta el estado visual y AsyncStorage conserva los datos localmente.
5. **Pruebas como puerta:** Las reglas de dominio cuentan con pruebas Jest. Lint, TypeScript y las pruebas deben pasar en verde antes de cerrar cualquier tarea.
6. **Datos seguros y visibles:** Los fallos se muestran claramente y no se ocultan. Reiniciar una fase, modificar tiempos o restaurar ajustes exige confirmación explícita del usuario para evitar pérdidas accidentales.


================================================
ðŸ“„ ARCHIVO: docs\historias\HU-001.md
================================================

# HU-001 — Iniciar y controlar una sesion de estudio

## HISTORIA DE USUARIO

- **Identificador / ID:** HU-001
- **Usuario:** Estudiante
- **Nombre de la Historia:** Iniciar y controlar una sesion de estudio
- **Prioridad para el negocio:** Alta
- **Riesgo para desarrollo:** Bajo
- **Descripcion (Como... quiero... para...):** Como estudiante, quiero iniciar,
  pausar y reiniciar un temporizador de estudio, para concentrarme durante un
  tiempo definido.

## Criterios de aceptacion

### Escenario: Iniciar el temporizador

- **Dado que** estoy en la pantalla principal.
- **Cuando** presiono iniciar.
- **Entonces** empieza la cuenta regresiva con el tiempo de estudio que tengo
  configurado y veo los minutos y segundos que faltan.

### Escenario: Pausar y continuar

- **Dado que** tengo el temporizador corriendo.
- **Cuando** lo pauso y luego lo reanudo.
- **Entonces** la cuenta sigue desde el tiempo en que la pause.

### Escenario: Reiniciar el temporizador

- **Dado que** tengo el temporizador corriendo o pausado.
- **Cuando** decido reiniciarlo y lo confirmo.
- **Entonces** el temporizador vuelve al tiempo inicial de la fase en la que
  estoy.

### Escenario: Cambiar de opinion al reiniciar

- **Dado que** tengo el temporizador corriendo o pausado.
- **Cuando** decido reiniciarlo y cancelo.
- **Entonces** el temporizador conserva el tiempo que llevaba.


================================================
ðŸ“„ ARCHIVO: docs\historias\HU-002.md
================================================

# HU-002 — Alternar entre estudio y descanso

## HISTORIA DE USUARIO

- **Identificador / ID:** HU-002
- **Usuario:** Estudiante
- **Nombre de la Historia:** Alternar entre estudio y descanso
- **Prioridad para el negocio:** Media
- **Riesgo para desarrollo:** Bajo
- **Descripcion (Como... quiero... para...):** Como estudiante, quiero que la
  aplicacion pase sola del tiempo de estudio al de descanso, para seguir la
  tecnica Pomodoro sin tener que llevar la cuenta yo mismo.

## Criterios de aceptacion

### Escenario: Terminar un pomodoro

- **Dado que** termina un tiempo de estudio.
- **Cuando** todavia no completo los pomodoros necesarios para el descanso
  largo.
- **Entonces** la aplicacion deja listo un descanso corto para que yo lo inicie.

### Escenario: Llegar al descanso largo

- **Dado que** complete la cantidad de pomodoros configurada (cuatro por
  defecto).
- **Cuando** termina el ultimo tiempo de estudio.
- **Entonces** la aplicacion deja listo un descanso largo y el contador de
  pomodoros vuelve a cero.

### Escenario: Terminar un descanso

- **Dado que** termina un descanso corto o largo.
- **Cuando** vuelvo a la aplicacion.
- **Entonces** la aplicacion deja listo el siguiente tiempo de estudio.

### Escenario: Ver mi avance

- **Dado que** estoy en una sesion.
- **Cuando** miro la pantalla principal.
- **Entonces** veo si estoy en estudio o en descanso y cuantos pomodoros llevo
  en el ciclo actual.



================================================
ðŸ“„ ARCHIVO: docs\historias\HU-003.md
================================================

# HU-003 — Mantener el conteo con el celular bloqueado o la app cerrada

## HISTORIA DE USUARIO

- **Identificador / ID:** HU-003
- **Usuario:** Estudiante
- **Nombre de la Historia:** Mantener el conteo con el celular bloqueado o la
  app cerrada
- **Prioridad para el negocio:** Alta
- **Riesgo para desarrollo:** Alto
- **Descripcion (Como... quiero... para...):** Como estudiante, quiero que el
  temporizador siga contando aunque bloquee el celular o cierre la aplicacion,
  para no perder el tiempo que llevo estudiando.

## Criterios de aceptacion

### Escenario: Bloquear el celular

- **Dado que** tengo el temporizador corriendo.
- **Cuando** bloqueo el celular y lo desbloqueo unos minutos despues.
- **Entonces** la aplicacion muestra el tiempo restante correcto, descontando
  lo que paso mientras estaba bloqueado.

### Escenario: Cerrar la aplicacion

- **Dado que** tengo el temporizador corriendo.
- **Cuando** cierro la aplicacion desde las apps recientes y la vuelvo a abrir.
- **Entonces** la aplicacion recupera la sesion y muestra el tiempo restante
  correcto.

### Escenario: El tiempo termina con la aplicacion cerrada

- **Dado que** cerre la aplicacion con el temporizador corriendo.
- **Cuando** el tiempo se cumple antes de que vuelva a abrirla.
- **Entonces** recibo el aviso de fin y, al abrir la aplicacion, la fase aparece
  como terminada.

### Escenario: Pausar antes de cerrar

- **Dado que** pause el temporizador.
- **Cuando** cierro la aplicacion y la vuelvo a abrir.
- **Entonces** el temporizador sigue pausado con el mismo tiempo restante y no
  recibo ningun aviso.




================================================
ðŸ“„ ARCHIVO: docs\historias\HU-004.md
================================================

# HU-004 — Recibir aviso al terminar el tiempo

## HISTORIA DE USUARIO

- **Identificador / ID:** HU-004
- **Usuario:** Estudiante
- **Nombre de la Historia:** Recibir aviso al terminar el tiempo
- **Prioridad para el negocio:** Alta
- **Riesgo para desarrollo:** Alto
- **Descripcion (Como... quiero... para...):** Como estudiante, quiero que la
  aplicacion me avise cuando termine el tiempo de estudio o de descanso, incluso
  con el celular en silencio, para cambiar de actividad sin estar mirando la
  pantalla.

## Criterios de aceptacion

### Escenario: Aviso con el celular en sonido

- **Dado que** el temporizador llega a cero.
- **Cuando** el celular tiene el sonido activado.
- **Entonces** recibo una notificacion con sonido y vibracion que me dice que
  fase termino.

### Escenario: Aviso con el celular en silencio

- **Dado que** el temporizador llega a cero.
- **Cuando** el celular esta en modo silencio o vibracion.
- **Entonces** la aplicacion suena como alarma, vibra y muestra el aviso en la
  pantalla de bloqueo.

### Escenario: Detener el aviso

- **Dado que** la alarma esta sonando.
- **Cuando** toco la notificacion o el boton de detener.
- **Entonces** la alarma se calla y la aplicacion se abre mostrando la siguiente
  fase.

### Escenario: Permiso de notificaciones

- **Dado que** no he dado permiso de notificaciones a la aplicacion.
- **Cuando** inicio un temporizador por primera vez.
- **Entonces** la aplicacion me explica para que necesita el permiso y me lo
  solicita.



**Nota de implementacion:** Los criterios anteriores conservan la linea base del
cliente. Android/iOS y las politicas del fabricante pueden impedir que una app
fuerce sonido o vibracion en silencio/No molestar. La limitacion y el
comportamiento realmente comprobado deben documentarse en decisiones y en las
pruebas del dispositivo; no se debe afirmar que este criterio esta verificado
solo porque compila.


================================================
ðŸ“„ ARCHIVO: docs\historias\HU-005.md
================================================

# HU-005 — Ajustar los tiempos del pomodoro

## HISTORIA DE USUARIO

- **Identificador / ID:** HU-005
- **Usuario:** Estudiante
- **Nombre de la Historia:** Ajustar los tiempos del pomodoro
- **Prioridad para el negocio:** Media
- **Riesgo para desarrollo:** Bajo
- **Descripcion (Como... quiero... para...):** Como estudiante, quiero cambiar
  la duracion del estudio, de los descansos y la cantidad de pomodoros antes
  del descanso largo, para adaptar la tecnica a mi ritmo.

## Criterios de aceptacion

### Escenario: Cambiar un tiempo

- **Dado que** estoy en la pantalla de ajustes.
- **Cuando** cambio un tiempo y guardo.
- **Entonces** el nuevo valor se usa desde la proxima fase y se mantiene aunque
  cierre la aplicacion.

### Escenario: Ingresar un valor no valido

- **Dado que** estoy en la pantalla de ajustes.
- **Cuando** dejo un campo vacio, pongo cero o un valor fuera del rango
  permitido.
- **Entonces** la aplicacion no guarda el cambio y me indica que valores puedo
  usar.

### Escenario: Volver a los valores por defecto

- **Dado que** modifique los tiempos.
- **Cuando** elijo restablecer y lo confirmo.
- **Entonces** los tiempos vuelven a 25 minutos de estudio, 5 de descanso
  corto, 15 de descanso largo y 4 pomodoros por ciclo.

### Escenario: Cambiar un tiempo con una fase en curso

- **Dado que** tengo el temporizador corriendo.
- **Cuando** cambio la duracion de esa misma fase.
- **Entonces** la fase actual termina con el tiempo con el que empezo y el
  cambio se aplica a la siguiente.




================================================
ðŸ“„ ARCHIVO: docs\historias\HU-006.md
================================================

# HU-006 — Usar la aplicacion sin registro, sin internet y sin publicidad

## HISTORIA DE USUARIO

- **Identificador / ID:** HU-006
- **Usuario:** Estudiante
- **Nombre de la Historia:** Usar la aplicacion sin registro, sin internet y
  sin publicidad
- **Prioridad para el negocio:** Alta
- **Riesgo para desarrollo:** Bajo
- **Descripcion (Como... quiero... para...):** Como estudiante, quiero usar la
  aplicacion apenas la instalo, sin crear una cuenta, sin datos moviles y sin
  anuncios, para empezar a estudiar sin trabas.

## Criterios de aceptacion

### Escenario: Abrir la aplicacion por primera vez

- **Dado que** acabo de instalar la aplicacion.
- **Cuando** la abro por primera vez.
- **Entonces** llego directo al temporizador, sin pantallas de registro ni de
  inicio de sesion.

### Escenario: Usarla sin conexion

- **Dado que** no tengo datos moviles ni Wi-Fi.
- **Cuando** uso el temporizador, los avisos y los ajustes.
- **Entonces** todo funciona igual y mis ajustes quedan guardados en el celular.

### Escenario: Usarla sin publicidad

- **Dado que** estoy usando la aplicacion.
- **Cuando** paso por cualquiera de sus pantallas.
- **Entonces** no aparece ningun anuncio.



================================================
ðŸ“„ ARCHIVO: eas.json
================================================

{
  "cli": {
    "version": ">= 7.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {}
  }
}

================================================
ðŸ“„ ARCHIVO: expo-env.d.ts
================================================

/// <reference types="expo/types" />

// NOTE: This file should not be edited and should be in your git ignore

================================================
ðŸ“„ ARCHIVO: export_content.js
================================================

const fs = require('fs');
const path = require('path');

// Nombre del archivo final que contendrÃ¡ todo tu cÃ³digo
const OUTPUT_FILE = 'contexto_proyecto.md';
const ROOT_DIR = __dirname;

// Carpetas que ignoramos porque son pesadas o no contienen cÃ³digo fuente Ãºtil
const IGNORE_DIRS = ['node_modules', '.expo', '.vscode', '.opencode', '.git', 'assets', '__tests__', '.tamagui'];

// Archivos especÃ­ficos que no queremos incluir
const IGNORE_FILES = ['package-lock.json', 'yarn.lock', OUTPUT_FILE, 'export_context.js'];

// Extensiones permitidas
const ALLOWED_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.json', '.md'];

function buildContext(currentPath) {
    const items = fs.readdirSync(currentPath);

    for (const item of items) {
        const itemPath = path.join(currentPath, item);
        const stat = fs.statSync(itemPath);

        if (stat.isDirectory()) {
            if (!IGNORE_DIRS.includes(item)) {
                buildContext(itemPath);
            }
        } else {
            const ext = path.extname(item);
            const isAllowedExtension = ALLOWED_EXTENSIONS.includes(ext);
            
            // Permitimos archivos de configuraciÃ³n que empiezan con punto (ej. .gitignore, eslint.config.js)
            const isConfigFile = item.startsWith('.') || item.includes('config'); 

            if (!IGNORE_FILES.includes(item) && (isAllowedExtension || isConfigFile)) {
                try {
                    const content = fs.readFileSync(itemPath, 'utf8');
                    const relativePath = path.relative(ROOT_DIR, itemPath);
                    
                    // Separador visual claro para que la IA distinga entre archivos
                    const separator = `\n\n================================================\n`;
                    const fileHeader = `ðŸ“„ ARCHIVO: ${relativePath}\n================================================\n\n`;
                    
                    fs.appendFileSync(path.join(ROOT_DIR, OUTPUT_FILE), separator + fileHeader + content);
                } catch (error) {
                    console.error(`Error leyendo ${itemPath}:`, error.message);
                }
            }
        }
    }
}

// 1. Inicializar/Limpiar el archivo de salida
fs.writeFileSync(path.join(ROOT_DIR, OUTPUT_FILE), '# Contexto Completo del Proyecto CV-CREATOR-APP\n');
console.log('â³ Recopilando cÃ³digo...');

// 2. Ejecutar la lectura
buildContext(ROOT_DIR);

console.log(`âœ… Â¡Listo! Todo tu cÃ³digo se ha consolidado en el archivo: ${OUTPUT_FILE}`);

================================================
ðŸ“„ ARCHIVO: MEMORY.md
================================================

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

================================================
ðŸ“„ ARCHIVO: package.json
================================================

{
  "name": "pomodoro-cotopaxi",
  "main": "expo-router/entry",
  "version": "1.0.0",
  "dependencies": {
    "@react-native-async-storage/async-storage": "2.2.0",
    "@types/jest": "29.5.14",
    "expo": "~57.0.30",
    "expo-constants": "~57.0.22",
    "expo-font": "~57.0.4",
    "expo-image": "~57.0.5",
    "expo-linking": "~57.0.13",
    "expo-notifications": "~57.0.23",
    "expo-router": "~57.0.28",
    "expo-splash-screen": "~57.0.10",
    "expo-status-bar": "~57.0.1",
    "expo-symbols": "~57.0.3",
    "expo-web-browser": "~57.0.3",
    "jest": "~29.7.0",
    "jest-expo": "~57.0.6",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "react-native": "0.86.3",
    "react-native-reanimated": "4.5.1",
    "react-native-safe-area-context": "~5.7.0",
    "react-native-screens": "~4.26.0",
    "react-native-web": "~0.21.0",
    "react-native-worklets": "0.10.1"
  },
  "devDependencies": {
    "@testing-library/react-native": "^14.1.0",
    "@types/react": "~19.2.2",
    "typescript": "~6.0.3"
  },
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "jest": {
    "preset": "jest-expo"
  },
  "private": true
}


================================================
ðŸ“„ ARCHIVO: README.md
================================================

# Pomodoro Cotopaxi

Aplicación móvil de estudio basada en la técnica Pomodoro, diseñada para estudiantes de la Academia Cotopaxi. La app prioriza un flujo sencillo, funcionamiento offline, persistencia local y ausencia de anuncios.

## Descripción

Pomodoro Cotopaxi permite gestionar sesiones de estudio y descanso con un temporizador claro y configurable. La experiencia está pensada para usarse sin crear cuentas ni depender de acceso a internet.

La aplicación se centra en estas metas:

- Iniciar directamente en el temporizador sin registro.
- Mantener la funcionalidad con datos móviles o Wi‑Fi desactivados.
- Guardar ajustes localmente en el dispositivo.
- Evitar cualquier tipo de publicidad en la interfaz.
- Funcionar completamente en modo offline.

## Características principales

- Temporizador de estudio y descanso.
- Alternancia de fases de trabajo y pausa.
- Persistencia local con AsyncStorage.
- Ajustes del usuario guardados en el dispositivo.
- Notificaciones locales para avisos de cambio de fase.
- Sin inicio de sesión ni cuenta.
- Sin anuncios ni integración de terceros.

## Stack tecnológico

- Expo SDK 57
- React Native
- TypeScript
- Expo Router
- AsyncStorage
- Expo Notifications
- Jest + jest-expo

## Requisitos

- Node.js 18 o superior
- npm
- Expo CLI
- Android Studio / emulador Android o dispositivo físico para pruebas en Expo Go

## Instalación

1. Clona este repositorio.
2. Entra a la carpeta del proyecto.
3. Instala dependencias:

```bash
npm install
```

## Ejecución

Inicia la aplicación con:

```bash
npm start
```

También puedes ejecutarla en plataformas específicas:

```bash
npm run android
npm run ios
npm run web

## Reglas de negocio y calidad

El proyecto sigue la constitución del repositorio y las especificaciones de cada historia. La lógica del temporizador se mantiene en `src/domain/`, mientras que la persistencia y la capa visual se separan para mantener un flujo verificable y seguro.

Se prioriza:

- pruebas automatizadas de reglas de dominio;
- uso local y privado de datos;
- funcionamiento sin backend ni cuentas;
- validación de comportamiento antes de cerrar tareas.



================================================
ðŸ“„ ARCHIVO: skills-lock.json
================================================

{
  "version": 1,
  "skills": {
    "grill-me": {
      "source": "mattpocock/skills",
      "sourceType": "github",
      "skillPath": "skills/productivity/grill-me/SKILL.md",
      "computedHash": "5e0c683385eafd83f106ac6c9d67dfbbfe5aa4b3fe65aad114eb1055a99c818f"
    }
  }
}


================================================
ðŸ“„ ARCHIVO: specs\001-temporizador-estudio\decisiones.md
================================================

# Decisiones – Spec 001

## D-001: Estado después de confirmar el reinicio

- **Estado:** Aceptada
- **Historia:** HU-001
- **Decisión:** El temporizador conserva el estado que tenía antes del
  reinicio. Si estaba corriendo, continúa desde el tiempo inicial de la fase;
  si estaba pausado, permanece pausado en ese tiempo.
- **Origen:** Aclaración explícita del estudiante durante
  `/sdd-spec 001-pomodoro HU-001`.


================================================
ðŸ“„ ARCHIVO: specs\001-temporizador-estudio\plan.md
================================================

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


================================================
ðŸ“„ ARCHIVO: specs\001-temporizador-estudio\spec.md
================================================

# Spec 001 - Temporizador Pomodoro

Estado: aprobada
HU de origen: docs/historias/HU-001.md

## Contexto y objetivo

Permitir que el estudiante inicie, pause, reanude y reinicie el temporizador
para concentrarse durante un tiempo definido, mostrando cuánto tiempo queda.

Esta especificación cubre HU-001. La alternancia entre estudio y descanso se
define en HU-002; el comportamiento con la aplicación en segundo plano o
cerrada, en HU-003; las notificaciones, en HU-004; y la configuración de
duraciones, en HU-005.

## Usuarios

- Estudiante.

## Historias de usuario

Como estudiante, quiero iniciar, pausar y reiniciar un temporizador de estudio,
para concentrarme durante un tiempo definido.

## Definiciones

- **Tiempo inicial de la fase:** la duración con la que comenzó la fase actual.
  Al confirmar el reinicio, el temporizador vuelve a ese tiempo y conserva el
  estado que tenía antes del reinicio: corriendo o pausado. Decisión D-001.

## Requisitos funcionales

- **RF-1:** CUANDO el estudiante inicia el temporizador desde la pantalla
  principal, EL SISTEMA comienza la cuenta regresiva con el tiempo de estudio
  configurado. Origen: HU-001, escenario «Iniciar el temporizador».
- **RF-2:** MIENTRAS el temporizador está activo, EL SISTEMA muestra el tiempo
  restante en minutos y segundos. Origen: HU-001, escenario «Iniciar el
  temporizador».
- **RF-3:** CUANDO el estudiante pausa el temporizador, EL SISTEMA detiene la
  cuenta regresiva y conserva el tiempo restante de la pausa. Origen: HU-001,
  escenario «Pausar y continuar».
- **RF-4:** CUANDO el estudiante reanuda un temporizador pausado, EL SISTEMA
  continúa la cuenta regresiva desde el tiempo restante conservado al pausarlo.
  Origen: HU-001, escenario «Pausar y continuar».
- **RF-5:** CUANDO el estudiante confirma el reinicio de un temporizador
  corriendo o pausado, EL SISTEMA devuelve el tiempo restante al tiempo inicial
  de la fase actual y conserva el estado que tenía antes del reinicio. Origen:
  HU-001, escenario «Reiniciar el temporizador» y decisión D-001.
- **RF-6:** CUANDO el estudiante cancela el reinicio de un temporizador
  corriendo o pausado, EL SISTEMA conserva el tiempo restante que llevaba.
  Origen: HU-001, escenario «Cambiar de opinión al reiniciar».

## Requisitos no funcionales

- No se derivan requisitos no funcionales adicionales de HU-001.

## Casos límite

- El reinicio confirmado aplica tanto a un temporizador corriendo como a uno
  pausado; conserva el estado previo en cada caso (RF-5).
- La cancelación del reinicio debe conservar el tiempo restante (RF-6).

## Fuera de alcance

- La preparación automática de la fase siguiente y el avance del ciclo
  Pomodoro, definidos por HU-002.
- Recuperar el temporizador después de cerrar la aplicación o mantener el
  conteo en segundo plano, definidos por HU-003.
- Los avisos al terminar una fase, definidos por HU-004.
- La edición y persistencia de duraciones, definidas por HU-005.

## Criterios de finalización

- RF-1 y RF-2 pueden verificarse iniciando el temporizador y comprobando que
  usa el tiempo de estudio configurado y muestra minutos y segundos restantes.
- RF-3 y RF-4 pueden verificarse comprobando que la pausa conserva el tiempo y
  que la reanudación parte de ese tiempo.
- RF-5 puede verificarse comprobando que el reinicio vuelve al tiempo inicial
  de la fase y conserva el estado previo, tanto si corría como si estaba
  pausado.
- RF-6 puede verificarse cancelando el reinicio en estado corriendo y pausado
  y comprobando que se conserva el tiempo restante.

## Dudas abiertas

- Ninguna para HU-001.


================================================
ðŸ“„ ARCHIVO: specs\001-temporizador-estudio\tasks.md
================================================

# Tareas – Temporizador de estudio

Estado: aprobado y completado
Spec: [spec.md](./spec.md)  
Plan aprobado: [plan.md](./plan.md)  
HU: [HU-001](../../docs/historias/HU-001.md)

## Dominio

- [x] **T1. Escribir pruebas para iniciar y mostrar el tiempo.** RF-1, RF-2.
  Hecho cuando: las pruebas Jest deterministas verifican la creación de un
  temporizador corriendo desde una duración recibida y su formato en minutos y
  segundos, incluyendo ceros iniciales; las pruebas fallan antes de existir la
  implementación.
- [x] **T2. Implementar el inicio y el cálculo/format del tiempo restante.**
  RF-1, RF-2.
  Hecho cuando: las pruebas de T1 pasan con funciones puras que reciben el
  instante actual, y el temporizador corriendo deriva su restante de
  `targetEndTime`; `npx jest` pasa.
- [x] **T3. Escribir pruebas para pausa, reanudación y reinicio.** RF-3, RF-4,
  RF-5, D-001.
  Hecho cuando: pruebas Jest controladas verifican la conservación del restante
  al pausar, la reanudación desde ese restante y el reinicio confirmado tanto
  corriendo como pausado; comprueban asimismo la conservación del estado
  previo.
- [x] **T4. Implementar las transiciones de pausa, reanudación y reinicio.**
  RF-3, RF-4, RF-5, D-001.
  Hecho cuando: todas las pruebas de dominio de T1 y T3 pasan con transiciones
  puras y sin alterar el contrato `targetEndTime`; `npx jest` pasa.

## Integración y pantalla

- [x] **T5. Conectar el hook React al dominio.** RF-1, RF-2, RF-3, RF-4, RF-5.
  Hecho cuando: `use-study-timer` expone estado y acciones del dominio y el
  refresco visual vuelve a calcular el restante desde el reloj sin usar un
  contador decreciente como fuente de verdad; TypeScript pasa. No se añade una
  duración por defecto.
- [x] **T6. Escribir pruebas de pantalla para controles y restante.** RF-1,
  RF-2, RF-3, RF-4.
  Hecho cuando: las pruebas de React Native Testing Library verifican texto
  visible en español, tiempo formateado, inicio, pausa/reanudación y etiquetas
  de accesibilidad; las pruebas fallan para la pantalla de plantilla antes de
  implementarla. Las pruebas dirigidas fallan con la pantalla de plantilla,
  como se esperaba antes de T7.
- [x] **T7. Reemplazar la pantalla principal con la interfaz del temporizador.**
  RF-1, RF-2, RF-3, RF-4. Depende también de la configuración real de HU-005
  (spec 005, T7: proveedor compartido cargado desde persistencia local).
  Hecho cuando: se muestra el tiempo y controles correspondientes al estado,
  todo texto visible está en español y los controles usan áreas seguras,
  `StyleSheet`, contraste de marca y etiquetas accesibles; pasan las pruebas
  de T6 y `npx tsc --noEmit`.
- [x] **T8. Escribir pruebas de confirmación y cancelación del reinicio.**
  RF-5, RF-6, D-001.
  Hecho cuando: pruebas de pantalla cubren confirmar, cancelar y descartar el
  diálogo, para estados corriendo y pausado, verificando que cancelar/descartar
  no cambian tiempo ni estado. Las pruebas dirigidas fallan antes de T9
  porque todavía no existe el control de reinicio.
- [x] **T9. Implementar la confirmación del reinicio en la interfaz.** RF-5,
  RF-6, D-001.
  Hecho cuando: el diálogo del sistema precede al reinicio; confirmar restaura
  el tiempo inicial conservando el estado previo, cancelar o descartar deja
  intactos tiempo y estado, y pasan las pruebas de T8.
- [x] **T10. Validar la historia en Expo Go o emulador Android.** RF-1 a RF-6.
  Hecho cuando: se comprueban vertical y giro, áreas seguras, visibilidad de
  controles, lectura clara del estado sin depender solo del color, inicio,
  pausa, reanudación, reinicio confirmado/cancelado y accesibilidad. Los
  puntos sobre teclado y ajustes de duración no aplican porque esta historia
  no contiene formularios; persistencia al cerrar queda fuera de alcance
  (HU-003). Registrar el resultado antes de cerrar la tarea.
  Resultado: validación manual en Android confirmada por el usuario. No se
  registraron modelo ni versión del dispositivo.

## Dependencias y límite de alcance

- T2 depende de T1; T3 depende de T2; T4 depende de T3; T5 depende de T4; T6
  depende de T5; T7 depende de T6 y de la fuente real de configuración de
  HU-005 (spec 005, T7); T8 depende de T7; T9 depende de T8; T10 depende de T9.
- La duración debe provenir de la configuración; el repositorio aún no ofrece
  esa fuente y no se debe inventar un valor por defecto. La conexión funcional
  a configuración real es prerrequisito de HU-005. Si sigue ausente al
  implementar T5/T7, detenerse antes de simularla y aclarar la dependencia.
- No implementar alternancia de fases, persistencia/restauración al cerrar,
  notificaciones ni comportamiento de ajustes (HU-002 a HU-005).


================================================
ðŸ“„ ARCHIVO: specs\002-hu002-alternar-fases\decisiones.md
================================================

# Decisiones – HU-002

Estado: Aprobado para implementar por solicitud explícita del estudiante.

## D-001: Fase siguiente preparada, no iniciada

- Al terminar estudio o descanso, se prepara automáticamente la fase siguiente
  conforme al ciclo; el temporizador de esa fase queda listo para que el
  estudiante lo inicie, como indican los escenarios de HU-002.

## D-002: Conteo y objetivo del ciclo

- Un pomodoro cuenta al terminar una fase de estudio.
- Antes de alcanzar el objetivo capturado al comenzar el ciclo, sigue un
  descanso corto y el contador avanza.
- Al alcanzar el objetivo, sigue un descanso largo y el contador se reinicia
  a cero. El siguiente ciclo toma el objetivo vigente de Ajustes.

## D-003: Configuración capturada por fase

- Una fase iniciada conserva su duración inicial. La fase siguiente utiliza
  la configuración vigente cuando se inicia.

## D-004: Alcance de interfaz

- La pantalla principal muestra el tipo de fase, tiempo y pomodoros completados
  del ciclo, además de controles de inicio, pausa, reanudación y reinicio de
  HU-001.


================================================
ðŸ“„ ARCHIVO: specs\002-hu002-alternar-fases\plan.md
================================================

# Plan técnico – HU-002

Estado: Aprobado para implementación
Spec: spec.md
HU: ../../docs/historias/HU-002.md

## Alcance

Implementar transiciones deterministas entre estudio, descanso corto y
descanso largo, mostrar el progreso y consumir los ajustes de HU-005. HU-003
persiste y restaura el estado compartido de la sesión.

## Archivos y responsabilidades

| Archivo | Responsabilidad | RF |
| --- | --- | --- |
| `src/domain/pomodoro-session.ts` | Tipos, creación de sesión, inicio/pausa/reanudación/reinicio y transición pura al finalizar fase. | RF-1 a RF-6 |
| `src/domain/__tests__/pomodoro-session.test.ts` | Pruebas deterministas de fases, objetivos y conteo. | RF-1 a RF-6 |
| `src/hooks/use-pomodoro-session.ts` | Fuente compartida en React para ciclo, controles y cálculo desde `endsAt`. | RF-1 a RF-6 |
| `src/hooks/__tests__/use-pomodoro-session.test.tsx` | Pruebas de controles y sincronización de sesión. | RF-1 a RF-6 |
| `src/app/index.tsx` | Mostrar fase, progreso, tiempo y acciones. | RF-1 a RF-6 |

## Modelo del dominio

- Una sesión tiene fase, conteo completado, objetivo capturado del ciclo,
  duración inicial, estado y `endsAt` o restante pausado.
- Los estados `ready` y `paused` guardan tiempo restante; `running` usa
  `endsAt`/`targetEndTime`.
- El inicio de un ciclo captura `pomodorosBeforeLongBreak`; un ciclo nuevo
  comienza después de completar el descanso largo.
- La finalización de una fase calcula el siguiente tipo y su conteo, y lo deja
  listo sin iniciarlo.

## Algoritmo

```text
finishPhase(session):
  si fase == study:
    completados = completados + 1
    si completados == objetivoCiclo:
      faseSiguiente = longBreak
      completados = 0
    si no:
      faseSiguiente = shortBreak
  si fase == shortBreak:
    faseSiguiente = study
  si fase == longBreak:
    faseSiguiente = study
    objetivoCiclo = configuraciónActual.pomodorosBeforeLongBreak
  devolver ready(faseSiguiente, configuraciónActual.duración(faseSiguiente))
```

## Persistencia

La sesión y sus `endsAt` se persisten de acuerdo con HU-003; esta spec no
define acceso directo a AsyncStorage desde el dominio.

## Interfaz y pruebas

La pantalla utiliza áreas seguras, `StyleSheet`, paleta Cotopaxi y
accesibilidad española. Jest controla reloj y transiciones sin depender de
relojes reales. La integración usa ajustes compartidos y conserva el estado
inicial de una fase iniciada.

## Decisiones y límites

Las fases se preparan automáticamente pero se inician por acción del
estudiante, según los escenarios de HU-002. No se ejecuta una alarma completa;
la notificación local de fin necesaria al cerrar se define con HU-003.


================================================
ðŸ“„ ARCHIVO: specs\002-hu002-alternar-fases\spec.md
================================================

# Spec 002 - Alternar entre estudio y descanso

Estado: Aprobada para implementación
HU de origen: docs/historias/HU-002.md
Decisiones: decisiones.md

## Contexto y objetivo

Avanzar la sesión Pomodoro entre estudio, descanso corto y descanso largo, y
mostrar a la persona estudiante la fase y el progreso del ciclo.

## Usuarios

- Estudiante.

## Requisitos funcionales

- **RF-1:** CUANDO termina una fase de estudio antes de alcanzar la cantidad de
  pomodoros definida para el ciclo, EL SISTEMA registra el pomodoro completado
  y deja preparado un descanso corto. Origen: HU-002, «Terminar un pomodoro»,
  decisiones D-001 y D-002.
- **RF-2:** CUANDO termina una fase de estudio que completa la cantidad de
  pomodoros definida para el ciclo, EL SISTEMA deja preparado un descanso largo
  y reinicia a cero el conteo del ciclo. Origen: HU-002, «Llegar al descanso
  largo», decisiones D-001 y D-002.
- **RF-3:** CUANDO termina una fase de descanso corto o largo, EL SISTEMA deja
  preparado el siguiente tiempo de estudio. Origen: HU-002, «Terminar un
  descanso», decisión D-001.
- **RF-4:** MIENTRAS existe una sesión Pomodoro, EL SISTEMA muestra si la fase
  actual es estudio, descanso corto o descanso largo, y cuántos pomodoros lleva
  el ciclo actual. Origen: HU-002, «Ver mi avance», decisión D-004.
- **RF-5:** CUANDO empieza una nueva fase, EL SISTEMA usa la duración configurada
  para ese tipo de fase, sin alterar la duración inicial de una fase ya
  iniciada. Origen: HU-005, escenario «Cambiar un tiempo con una fase en
  curso», decisión D-003.
- **RF-6:** CUANDO empieza un ciclo Pomodoro, EL SISTEMA conserva para ese ciclo
  el objetivo de pomodoros configurado al iniciarlo. Origen: HU-005,
  decisiones D-002 de esta spec y D-007 de HU-005.

## Requisitos no funcionales

- Las transiciones de fase y ciclo se definen como lógica pura en el dominio.
- Los textos visibles de fases y progreso se presentan en español.

## Casos límite

- La fase siguiente queda preparada; su cuenta no empieza sin que el
  estudiante la inicie.
- El último pomodoro de un ciclo produce descanso largo, no corto.
- El contador reiniciado es cero durante el descanso largo.
- Cambiar la configuración durante una fase o ciclo no altera su duración u
  objetivo ya capturados.

## Fuera de alcance

- Persistencia tras cerrar o durante segundo plano, cubierta por HU-003.
- Notificaciones y permisos adicionales a las notificaciones locales mínimas
  requeridas por HU-003; la alarma completa pertenece a HU-004.
- Cambiar y persistir la configuración, cubierta por HU-005.

## Criterios de finalización

- Pruebas deterministas verifican las transiciones al descanso corto, descanso
  largo y estudio, el reinicio de conteo y el progreso visible.
- La pantalla muestra la fase, el tiempo y el avance sin depender solo del
  color.



================================================
ðŸ“„ ARCHIVO: specs\002-hu002-alternar-fases\tasks.md
================================================

# Tareas – HU-002

Estado: Implementación y validación completadas
Spec: spec.md
Plan: plan.md
HU: ../../docs/historias/HU-002.md

- [x] **T1. Escribir pruebas de transiciones de fase y ciclo.** RF-1 a RF-6.
  Hecho cuando: Jest cubre fin de estudio con descanso corto/largo, conteo,
  descanso que prepara estudio y ciclo nuevo que toma el objetivo actualizado.
- [x] **T2. Implementar el dominio de sesión Pomodoro.** RF-1 a RF-6.
  Hecho cuando: transiciones puras reciben reloj/configuración y pasan las
  pruebas de T1 y Jest.
- [x] **T3. Escribir pruebas del hook de sesión compartida.** RF-1 a RF-6.
  Hecho cuando: se prueban inicio, pausa, reanudación, reinicio, fase siguiente
  preparada y finalización desde el reloj inyectado.
- [x] **T4. Implementar el hook y conectar controles.** RF-1 a RF-6.
  Hecho cuando: el temporizador consume ajustes reales, mantiene el ciclo y
  expone transiciones deterministas; pasan T3 y TypeScript.
- [x] **T5. Escribir pruebas de fase y progreso visibles.** RF-1 a RF-6.
  Hecho cuando: RNTL verifica fases, conteo y accesibilidad en la pantalla.
- [x] **T6. Mostrar fase y progreso en la pantalla principal.** RF-1 a RF-6.
  Hecho cuando: se ven fase, tiempo y pomodoros, los estados se entienden sin
  color, y pasan T5, Jest y TypeScript.
- [x] **T7. Verificar secuencia completa en dispositivo.** RF-1 a RF-6.
  Hecho cuando: se observan ciclos corto/largo, descanso que prepara estudio,
  ajustes aplicados a fases/ciclos siguientes y controles en ambas
  orientaciones; registrar las limitaciones del dispositivo.
  Resultado: el usuario confirma la validación manual en Android de la
  secuencia de fases, el ciclo, los ajustes aplicados y los controles. No se
  registraron modelo ni versión del dispositivo.


================================================
ðŸ“„ ARCHIVO: specs\003-hu003-persistencia-segundoplano\decisiones.md
================================================

# Decisiones – HU-003

Estado: Aprobado para implementar por solicitud explícita del estudiante.

## D-001: Reloj de pared y `endsAt`

- El fin de una fase corriendo se conserva como marca temporal absoluta
  `endsAt`; el tiempo visible se deriva de `endsAt - ahora`.
- Al restaurar una fase vencida, se procesa su finalización una sola vez y se
  deja preparada la fase siguiente conforme a HU-002.

## D-002: Pausa y notificaciones locales

- Una fase pausada conserva el restante, no tiene fin programado y no genera
  aviso mientras permanece pausada.
- Una fase corriendo programa una notificación local para su `endsAt`; al
  pausar o reiniciar se cancela el aviso anterior.
- Se solicita permiso con una explicación en español. Si se deniega, la
  cuenta sigue funcionando y la interfaz comunica que el aviso no está
  habilitado.
- El aviso local comunica qué fase terminó. No se afirma que suene o vibre en
  silencio/No molestar; esa alarma ampliada pertenece a HU-004 y está sujeta a
  las restricciones del sistema operativo.

## D-003: Persistencia local

- Guardar/restaurar la sesión Pomodoro en AsyncStorage, separada de los ajustes
  de HU-005.
- Los errores de lectura/escritura se muestran; no se presenta un estado como
  guardado si la escritura falló.


================================================
ðŸ“„ ARCHIVO: specs\003-hu003-persistencia-segundoplano\plan.md
================================================

# Plan técnico – HU-003

Estado: Aprobado para implementación
Spec: spec.md
HU: ../../docs/historias/HU-003.md

## Alcance y trazabilidad

Persistir la sesión de HU-002 con `endsAt`, restaurar fases corriendo o
pausadas, procesar fases vencidas al regresar y gestionar notificaciones
locales mínimas. No implementar una alarma que venza el silencio ni un servicio
de segundo plano.

| RF | Implementación |
| --- | --- |
| RF-1–RF-4 | Estado de sesión validado y persistido; restante derivado del reloj/`endsAt`. |
| RF-3 | Dominio puro finaliza fases vencidas una sola vez al hidratar. |
| RF-5–RF-6 | Adaptador Expo Notifications programa/cancela aviso por fase corriendo. |
| RF-7 | Errores propagados del adaptador y mostrados desde proveedor/pantalla. |
| RF-8 | Explicación y solicitud del permiso de notificación antes de programar el primer aviso. |
| RF-9 | La sesión guarda `lastCompletedPhase` para mostrar el fin tras restaurar. |

## Archivos y responsabilidades

| Archivo | Responsabilidad | RF |
| --- | --- | --- |
| `src/domain/pomodoro-session.ts` | Estado serializable de sesión, transiciones y reconciliación temporal pura. | RF-1–RF-4, RF-9 |
| `src/domain/__tests__/pomodoro-session.test.ts` | Pruebas de `endsAt`, cierre, pausa, reanudación y expiración. | RF-1–RF-4, RF-9 |
| `src/storage/study-session-storage.ts` | Leer/escribir sesión local con validación estricta. | RF-2, RF-4, RF-7 |
| `src/storage/__tests__/study-session-storage.test.ts` | Pruebas de lectura/escritura, datos corruptos y errores. | RF-2, RF-4, RF-7 |
| `src/storage/study-notifications.ts` | Permiso, programación y cancelación de avisos locales. | RF-5, RF-6, RF-8 |
| `src/storage/__tests__/study-notifications.test.ts` | Pruebas simuladas de permiso y programación. | RF-5, RF-6, RF-8 |
| `src/hooks/use-pomodoro-session.ts` | Estado compartido, persistencia de transiciones, carga y errores. | RF-1–RF-7 |
| `src/hooks/__tests__/use-pomodoro-session.test.tsx` | Pruebas de hidratación, expiración y errores. | RF-1–RF-7 |
| `src/app/_layout.tsx` | Hidratar sesión y conectar notificación/gestión de aplicación. | RF-2, RF-3, RF-5 |
| `src/app/index.tsx` | Mostrar restauración, última fase terminada y errores de persistencia/permiso. | RF-1–RF-9 |
| `package.json`, lockfile y `app.json` | Añadir `expo-notifications` y configuración de canal nativo si se requiere. | RF-5, RF-8 |

## Algoritmo de hidratación

```text
session = leerYValidar()
si no existe session:
  crear sesión inicial lista con ajustes vigentes
si session.status == running:
  si ahora >= session.endsAt:
    session = finishPhase(session) // transición pura, exactamente una vez
  si no:
    restante = session.endsAt - ahora
si session.status == paused:
  conservar restante pausado y cancelar aviso
persistir sesión reconciliada
mostrar error si lectura/escritura falla
```

## Notificaciones

Programar un aviso local único con la fase y fecha `endsAt`. Al iniciar o
reanudar, reemplazar el aviso anterior; al pausar o reiniciar, cancelarlo. La
notificación requiere permiso y no elude silencio ni políticas de segundo
plano del sistema operativo.

## Pruebas y validación

Inyectar reloj, almacenamiento y API de notificaciones en pruebas. Ejecutar
Jest, TypeScript y export web. Validación Android manual cubre cierre desde
recientes, reapertura, fase vencida, pausa, permiso y aviso; documentar
limitaciones reales del sistema.


================================================
ðŸ“„ ARCHIVO: specs\003-hu003-persistencia-segundoplano\spec.md
================================================

# Spec 003 - Mantener el conteo en segundo plano

Estado: Aprobada para implementación
HU de origen: docs/historias/HU-003.md
Decisiones: decisiones.md

## Contexto y objetivo

Conservar y restaurar localmente el estado Pomodoro para que el tiempo de una
fase corriendo transcurra correctamente al bloquear el celular o cerrar la
aplicación.

## Usuarios

- Estudiante.

## Requisitos funcionales

- **RF-1:** MIENTRAS una fase está corriendo, EL SISTEMA conserva la hora
  absoluta de finalización y muestra el restante calculado con el reloj actual.
  Origen: HU-003, «Bloquear el celular», decisión D-001.
- **RF-2:** CUANDO el estudiante vuelve a abrir la aplicación, EL SISTEMA
  restaura la sesión guardada y calcula el tiempo restante a partir de la hora
  de finalización, sin reiniciar la duración. Origen: HU-003, «Cerrar la
  aplicación», decisión D-001.
- **RF-3:** CUANDO la fase guardada terminó mientras la aplicación estaba
  cerrada, EL SISTEMA procesa su finalización una vez y deja preparada la
  siguiente fase según HU-002. Origen: HU-003, «El tiempo termina con la
  aplicación cerrada», decisión D-001.
- **RF-4:** CUANDO el estudiante pausa y cierra la aplicación, EL SISTEMA
  restaura el temporizador pausado con el mismo tiempo restante. Origen: HU-003,
  «Pausar antes de cerrar», decisión D-002.
- **RF-5:** CUANDO una fase corriendo termina con la aplicación cerrada, EL
  SISTEMA presenta una notificación local que identifica la fase terminada.
  Origen: HU-003, «El tiempo termina con la aplicación cerrada», decisión D-002
  y autorización del estudiante de incluir notificaciones locales mínimas.
- **RF-6:** CUANDO el temporizador se pausa o reinicia, EL SISTEMA cancela la
  notificación de fin previamente programada; una fase pausada no produce un
  aviso. Origen: HU-003, «Pausar antes de cerrar», decisión D-002.
- **RF-7:** CUANDO la aplicación no puede leer o persistir una sesión, EL
  SISTEMA informa el error sin afirmar que el cambio se guardó. Origen:
  Constitución, principio 6, decisión D-003.
- **RF-8:** CUANDO se necesita programar un aviso por primera vez, EL SISTEMA
  explica el uso de notificaciones y solicita permiso; si se deniega, informa
  que no habrá aviso y conserva el funcionamiento del temporizador. Origen:
  HU-004, «Permiso de notificaciones», decisión D-002.
- **RF-9:** CUANDO una fase vence con la aplicación cerrada y la estudiante
  vuelve a abrirla, EL SISTEMA indica que la fase anterior terminó y muestra
  la siguiente fase preparada. Origen: HU-003, «El tiempo termina con la
  aplicación cerrada», decisión D-001.

## Requisitos no funcionales

- Persistencia y notificaciones funcionan localmente, sin conexión.
- `endsAt` es la fuente temporal de verdad de una fase corriendo.
- La notificación respeta restricciones y permisos del sistema operativo. No se
  promete una alarma audible o vibración con el teléfono en silencio.

## Casos límite

- Una sesión pausada se restaura sin `endsAt` ni aviso programado.
- Si `endsAt` ya pasó, la fase concluye una vez y se conserva la siguiente
  fase preparada.
- Si el permiso de notificación se deniega, se mantiene el temporizador y se
  indica la limitación.
- Los datos guardados malformados o los errores del almacenamiento se hacen
  visibles; no se ocultan con éxito aparente.

## Fuera de alcance

- Alarmas que interrumpan silencio/No molestar, servicios en primer plano o
  garantías de ejecución de JavaScript mientras la app está cerrada (HU-004 y
  limitaciones del sistema operativo).
- Sincronización remota, cuentas o telemetría.
- El flujo y las transiciones entre fases, cubiertos por HU-002.

## Criterios de finalización

- Pruebas deterministas demuestran cálculo tras segundo plano, restauración
  pausada, expiración única y manejo de errores.
- En Android se comprueban cierre/reapertura, notificación local, cancelación
  al pausar y permisos; se registra cualquier restricción del sistema.


================================================
ðŸ“„ ARCHIVO: specs\003-hu003-persistencia-segundoplano\tasks.md
================================================

# Tareas – HU-003

Estado: Implementación y validación completadas
Spec: spec.md
Plan: plan.md
HU: ../../docs/historias/HU-003.md

- [x] **T1. Escribir pruebas del estado temporal serializable.** RF-1 a RF-4,
  RF-9.
  Hecho cuando: Jest cubre `endsAt`, restante al volver, pausa y finalización
  vencida única.
- [x] **T2. Implementar reconciliación pura de sesiones.** RF-1 a RF-4, RF-9.
  Hecho cuando: transiciones deterministas pasan T1 sin React ni almacenamiento.
- [x] **T3. Escribir pruebas de almacenamiento de sesión.** RF-2, RF-4, RF-7.
  Hecho cuando: prueba datos ausentes, válidos, corruptos y fallos de lectura/
  escritura.
- [x] **T4. Implementar persistencia local validada de sesión.** RF-2, RF-4, RF-7.
  Hecho cuando: adaptador guarda/restaura sesión, rechaza formato inválido y
  propaga fallos.
- [x] **T5. Escribir pruebas de permisos y notificaciones.** RF-5, RF-6, RF-8.
  Hecho cuando: Jest cubre autorización, programación en `endsAt` y cancelación.
- [x] **T6. Implementar notificaciones locales mínimas.** RF-5, RF-6, RF-8.
  Hecho cuando: se programa un aviso por fase, se cancela al pausar/reiniciar y
  el permiso denegado produce un estado explícito.
- [x] **T7. Escribir pruebas del proveedor de sesión y restauración.** RF-1 a
  RF-7.
  Hecho cuando: RNTL/Jest cubre hidratación corriendo/pausada, expiración,
  escritura y errores visibles.
- [x] **T8. Implementar proveedor de sesión persistente.** RF-1 a RF-9.
  Hecho cuando: layout hidrata y persiste transiciones, se deriva restante de
  `endsAt`, notificaciones siguen el estado, pasan T7 y TypeScript.
- [x] **T9. Verificar HU-003 en Android.** RF-1 a RF-8.
  Hecho cuando: se cierra/abre la app, se compara restante, se valida pausa,
  permiso y aviso local y se registra el resultado y limitaciones.
  Resultado: el usuario confirma la validación manual en Android del cierre y
  reapertura, el restante, la pausa, el permiso y el aviso local. No se
  registraron modelo ni versión del dispositivo.


================================================
ðŸ“„ ARCHIVO: specs\004-hu004-notificaciones\decisiones.md
================================================

**Decisión:** La aplicación usa notificaciones locales con los permisos
concedidos y la prioridad configurada para Android. No intenta evadir el modo
silencio, No molestar ni otras restricciones del sistema operativo.

**Límite técnico:** La entrega visual en pantalla de bloqueo y el sonido o la
vibración dependen de los permisos, la configuración del dispositivo y las
políticas del sistema operativo. La aplicación no garantiza que el aviso
interrumpa esas restricciones; al volver a abrirla, la sesión se reconcilia
con el estado y el tiempo de finalización persistidos.

================================================
ðŸ“„ ARCHIVO: specs\004-hu004-notificaciones\plan.md
================================================

# Plan técnico – HU-004

Estado: Aprobado y completado
Spec: [spec.md](./spec.md)
HU: [HU-004](../../docs/historias/HU-004.md)

## Alcance y trazabilidad

La propuesta cubre la entrega de avisos al terminar una fase, la explicación y solicitud del permiso de notificaciones, la cancelación del aviso al detener o reanudar, y la gestión de restricciones del sistema operativo. No garantiza que una alarma fuerce sonido o vibración en silencio o No molestar; esa parte depende de la plataforma y requiere verificación en dispositivo real.

| Requisito | Cobertura prevista |
| --- | --- |
| RF-1, RF-2 | Aviso local al quedar en cero la fase y señal sonora/vibratoria cuando el sistema lo permite. |
| RF-3 | Alarma/vibración y aviso en bloqueo si el dispositivo está en silencio o vibración; la app no promete anular restricciones del sistema. |
| RF-4 | Acción de detener la alarma y abrir la siguiente fase desde la app. |
| RF-5, RF-6 | Explicación del permiso, solicitud al inicio y manejo de denegación sin romper el temporizador. |
| RF-7 | Comunicación explícita de la limitación del sistema operativo y de la marca/fabricante; requiere evidencia de dispositivo y decisión final de producto. |

## Archivos y responsabilidades

| Archivo | Estado actual / responsabilidad propuesta | RF |
| --- | --- | --- |
| `src/domain/pomodoro-session.ts` (existente) | Mantener el estado de la fase vigente y la lógica de fin de fase para que el aviso sea disparado por una transición válida. | RF-1, RF-4 |
| `src/domain/__tests__/pomodoro-session.test.ts` (existente) | Pruebas de fin de fase y transición a la siguiente fase. | RF-1, RF-4 |
| `src/storage/study-notifications.ts` (existente) | Encapsular permiso, programación, cancelación y manejo de errores de notificaciones locales. | RF-1 a RF-7 |
| `src/storage/__tests__/study-notifications.test.ts` (existente) | Pruebas simuladas de permiso, programación, cancelación y errores de sistema. | RF-1 a RF-7 |
| `src/hooks/use-pomodoro-session.ts` (existente) | Coordinar la finalización de fase con la programación del aviso y la apertura de la siguiente fase. | RF-1, RF-4, RF-6 |
| `src/hooks/__tests__/use-pomodoro-session.test.tsx` (existente) | Pruebas de hidratación, finalización, cancelación de aviso y manejo de permisos. | RF-1 a RF-6 |
| `src/app/index.tsx` (existente) | Mostrar el aviso visible, el cierre y la transición a la siguiente fase; exponer la limitación del sistema cuando el dispositivo no permite el efecto esperado. | RF-1, RF-3, RF-4, RF-7 |
| `src/app/_layout.tsx` (existente) | Requerir el permiso solamente cuando el flujo lo necesite y preparar la app para mostrar la siguiente fase. | RF-5, RF-6 |
| `src/app/__tests__/index.test.tsx` o equivalente (nuevo) | Pruebas de solicitud de permiso, denegación, alarma y cierre del aviso. | RF-2 a RF-6 |
| `app.json` / `package.json` (existentes) | Confirmar que la dependencia `expo-notifications` y la configuración del canal nativo estén presentes; no introducir permisos extra no autorizados por HU-006. | RF-5, RF-7 |
| `docs/historias/HU-004.md` y `specs/004-hu004-notificaciones/spec.md` | Mantener trazabilidad con el escenario de usuario y la especificación. | RF-1 a RF-7 |

## Dominio puro

- El fin de fase debe ser una transición de dominio y no depender de ticks visuales para decidir si la fase terminó.
- La fuente de verdad temporal sigue siendo la marca de vencimiento (`endsAt`), llevada por HU-003; el aviso solo se activa cuando la fase ya concluyó de forma determinista.
- La notificación no debe ser un reemplazo de la lógica de temporizador ni de la transacción de fase; debe reaccionar a la transición ya resuelta.
- Las reglas de finalización y la siguiente fase son responsabilidad de HU-001 y HU-002; esta historia solo adjudica la señal externa del fin.

## Permisos y comportamiento del sistema

- El primer uso del temporizador debe explicar por qué se solicita el permiso de notificaciones y pedirlo antes del primer aviso real.
- Si el permiso se niega, la app debe continuar funcionando y mostrar que el aviso puede quedar limitado.
- La programación del aviso debe cancelar los avisos previos al pausar, reiniciar o iniciar otra fase.
- Si el sistema operativo, el fabricante o la configuración del teléfono limitan sonido, vibración o alarma al estar en silencio o No molestar, la aplicación debe informar esa limitación sin presentar una promesa imposible como si fuera verificada.
- No se incorpora una garantía de anular el modo silencio; solo se documenta y se valida lo que el dispositivo permite.

## Interfaz y flujo

- Al llegar a cero, mostrar una notificación local o un aviso visible que identifique la fase terminada.
- En sonido activo, emitir una señal sonora y vibratoria con la notificación.
- En silencio/vibración, intentar la alarma y la vibración, y mostrar el aviso en la pantalla de bloqueo si el sistema lo admite.
- Al tocar la notificación o el botón de detener, silenciar la alarma y abrir la aplicación en la siguiente fase.
- Mantener mensajes en español y evitar lenguaje que afirme que la app “logra” evadir silencio o No molestar cuando no haya evidencia del dispositivo.

## Algoritmo en pseudocódigo

```text
si la fase llega a cero:
  transicionar al final de fase
  si permiso de notificaciones está disponible:
    programar aviso con identificador de fase
  si permiso fue denegado:
    mostrar advertencia de limitación pero conservar el temporizador
  si la alarma se activa:
    permitir detener desde notificación o botón
    al detener:
      cancelar alarma
      abrir app con la siguiente fase
```

## Pruebas y validación

- Pruebas Jest para el dominio y la programación de notificaciones: permisos, denegación, cancelación y errores.
- Pruebas del hook de sesión para verificar que a la finalización le sigue la programación del aviso y la cancelación al pausar o reiniciar.
- Validación manual en Android/Expo Go para: sonido activo, modo silencio, bloqueo de pantalla, permiso en primer uso, denegación y respuesta a la notificación.
- Cada prueba del dispositivo debe registrar si la restricción del sistema operativo impidió la alarma o la vibración, sin afirmar que la app la “superó”.
- La evidencia de RF-7 requiere un reporte explícito del fabricante/dispositivo/OS con la verificación real, no suposición técnica.

## Riesgos y vacíos

- La restricción de sonido, vibración o alarma bajo silencio/No molestar no está garantizada por la plataforma ni por las dependencias. El comportamiento real debe validarse en Android con evidencia de dispositivo.
- Queda pendiente la decisión explícita de producto sobre cómo comunicar la limitación al estudiante cuando el dispositivo no lo permite; la especificación actual solo exige no prometer la garantía imposible.


================================================
ðŸ“„ ARCHIVO: specs\004-hu004-notificaciones\spec.md
================================================

# Spec 004 - Aviso al finalizar la fase

Estado: Aprobada y completada
HU de origen: docs/historias/HU-004.md
Decisiones: decisiones.md

## Contexto y objetivo

Asegurar que el estudiante reciba un aviso claro cuando una fase de estudio o descanso termina, incluso si el celular está en modo silencioso, sin depender de que la aplicación permanezca abierta en pantalla.

Esta propuesta desarrolla HU-004. La lógica del temporizador y la transición de fases siguen perteneciendo a HU-001 y HU-002; la persistencia y el cierre de la app ya quedaron cubiertos por HU-003.

## Usuarios

- Estudiante.

## Requisitos funcionales

- **RF-1:** CUANDO una fase llega a cero, EL SISTEMA activa un aviso local que identifica la fase terminada para que el estudiante pueda cambiar de actividad sin mirar la pantalla. Origen: HU-004, escenario «Aviso con el celular en sonido».
- **RF-2:** CUANDO el teléfono tiene el sonido activado, EL SISTEMA emite una notificación con sonido y vibración para informar que la fase terminó. Origen: HU-004, escenario «Aviso con el celular en sonido».
- **RF-3:** CUANDO el teléfono está en modo silencio o vibración, EL SISTEMA intenta avisar con alarma y vibración y presenta el aviso en la pantalla de bloqueo. Origen: HU-004, escenario «Aviso con el celular en silencio».
- **RF-4:** CUANDO el estudiante toca la notificación o el botón de detener del aviso, EL SISTEMA silencia la alarma y abre la aplicación mostrando la siguiente fase. Origen: HU-004, escenario «Detener el aviso».
- **RF-5:** CUANDO la aplicación necesita consultar el permiso de notificaciones por primera vez, EL SISTEMA explica para qué lo solicita y lo pide explícitamente antes de usar el aviso. Origen: HU-004, escenario «Permiso de notificaciones».
- **RF-6:** SI el estudiante no concede el permiso de notificaciones, ENTONCES EL SISTEMA informa la limitación y conserva el funcionamiento del temporizador sin afirmar una notificación garantizada. Origen: HU-004, escenario «Permiso de notificaciones».
- **RF-7:** CUANDO el sistema operativo, el fabricante o la configuración del dispositivo restringen sonido, vibración o alarma en silencio o No molestar, EL SISTEMA no promete que el aviso evada esa restricción y lo comunica de forma clara al estudiante. Origen: nota de implementación de HU-004 y decisión documentada en `decisiones.md`.

## Requisitos no funcionales

- El aviso debe funcionar localmente, sin conexión a internet ni backend.
- La experiencia de notificación debe respetar permisos y restricciones del sistema operativo.
- La alarma y la vibración deben ser una señal de finalización de fase, no una garantía de interrupción forzada de silencio o No molestar.
- Los mensajes visibles del sistema deben presentarse en español y aclarar si el aviso quedó limitado por el dispositivo.
- La verificación final requiere pruebas de UI manuales en Expo Go o Android, además de pruebas automatizadas de la lógica del temporizador y las decisiones relacionadas.

## Casos límite

- El dispositivo tiene sonido activo y la notificación llega con audio y vibración.
- El dispositivo está en silencio o vibración y la alarma/pantalla de bloqueo puede producir una señal, pero el sistema operativo puede limitarla.
- El estudiante deniega el permiso de notificaciones; el temporizador continúa y el aviso queda limitado.
- La notificación se activa con la app cerrada, bloqueada o en segundo plano; la aplicación no debe requerir que el usuario la tenga abierta para mostrar el aviso.
- El sistema operativo impide la reproducción de alarma o vibración; la app debe informar la limitación y no presentar un resultado imposible como verificado.

## Fuera de alcance

- Garantizar que una alarma siempre interrumpa silencio, No molestar o restricciones del fabricante.
- Sincronización remota, cuentas, analítica o servicios externos.
- La lógica de alternancia de fases y el conteo del temporizador, que pertenecen a HU-001 y HU-002.
- La persistencia y restauración del estado con la app cerrada, definida en HU-003.

## Criterios de finalización

- RF-1 a RF-6 se verifican con pruebas automatizadas y revisión manual del flujo en Android o Expo Go.
- La notificación con sonido y vibración se comprueba en un dispositivo con sonido activo.
- La alarma y la vibración en silencio se comprueban con limitaciones del sistema operativo y se documenta cualquier bloqueo del fabricante.
- El flujo de permiso se valida con el primer uso de la app y la respuesta a denegar permisos.
- RF-7 requiere evidencia explícita del propio dispositivo: se registra si el sistema no ejecuta el aviso audible o vibratorio en silencio o No molestar.

## Dudas abiertas

- Ninguna. Conforme a `decisiones.md`, la aplicación respeta los permisos y
  restricciones del sistema operativo y no garantiza sonido o vibración en
  silencio o No molestar. El resultado depende del dispositivo.


================================================
ðŸ“„ ARCHIVO: specs\004-hu004-notificaciones\tasks.md
================================================

# Tareas – HU-004

Estado: Aprobado y completado
Spec: [spec.md](./spec.md)
Plan: [plan.md](./plan.md)
HU: [HU-004](../../docs/historias/HU-004.md)

Las tareas fueron ejecutadas secuencialmente y validadas con pruebas
automatizadas y verificación manual en dispositivo real.

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


================================================
ðŸ“„ ARCHIVO: specs\005-ajustes-pomodoro\decisiones.md
================================================

# Decisiones – Spec 005

Estado: Aprobado
Historia: HU-005
Origen: aclaraciones explícitas del estudiante para preparar esta propuesta.

## D-001: Rangos inclusivos

- **Decisión propuesta:** Las duraciones de estudio, descanso corto y descanso
  largo aceptan minutos enteros de 1 a 120 inclusive. La cantidad de
  pomodoros por ciclo acepta valores enteros de 1 a 12 inclusive.

## D-002: Valores predeterminados

- **Decisión propuesta:** La configuración inicial y el restablecimiento
  confirmado usan 25 minutos de estudio, 5 minutos de descanso corto, 15
  minutos de descanso largo y 4 pomodoros por ciclo.

## D-003: Ubicación de ajustes

- **Decisión propuesta:** La configuración se presenta en la segunda pestaña,
  titulada «Ajustes».

## D-004: Confirmación al restablecer

- **Decisión propuesta:** El restablecimiento solicita confirmación explícita;
  solo al confirmar se aplican los valores predeterminados. Cancelar conserva
  los ajustes vigentes.

## D-005: Persistencia local

- **Decisión propuesta:** Persistir los ajustes localmente mediante
  `@react-native-async-storage/async-storage`; no usar un servicio remoto para
  esta configuración.

## D-006: Cambiar la duración de una fase activa

- **Decisión propuesta:** Guardar una duración distinta no altera la fase que
  ya está en curso; la nueva duración se usa desde las fases siguientes.

## D-007: Cambiar la cantidad de pomodoros

- **Decisión propuesta:** Un cambio de cantidad no modifica el objetivo del
  ciclo en curso; se aplica desde el ciclo siguiente.

## D-008: Confirmación al guardar modificaciones

- **Decisión propuesta:** Solicitar confirmación explícita antes de aplicar
  modificaciones de ajustes, de acuerdo con el principio 6 de la Constitución.


================================================
ðŸ“„ ARCHIVO: specs\005-ajustes-pomodoro\plan.md
================================================

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
| `src/app/explore.tsx` (existente) | Redirigir la ruta de plantilla anterior a Ajustes para que Expo Router no empaquete referencias a assets ausentes del scaffold. | RF-11 |
| `src/app/index.tsx` y `src/hooks/use-study-timer.ts` (existentes) | Consumir la duración configurada para nuevos inicios, sin reemplazar el tiempo inicial de un temporizador ya iniciado. No introducir una duración fija. | RF-1, RF-6 |
| Integración de ciclo HU-002 (no existe en el alcance revisado) | Consumir el objetivo capturado al inicio del ciclo vigente y el nuevo valor al iniciar el siguiente. Se planificará/validará con HU-002. | RF-2, RF-7 |
| `tsconfig.json`, `package.json`, `app.json` y `src/styles.d.ts` (existentes/nuevo) | Resolver alias de `src/`, habilitar el preset Jest Expo, declarar imports CSS y registrar los módulos Expo aprobados. | Validación |

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
- Los imports del scaffold existente requieren `expo-image`; su instalación
  fue autorizada para permitir el type-check y la compilación.
- El temporizador HU-001 tiene un hook que recibe una duración inicial, pero la
  pantalla actual es de plantilla. T7 de
  `specs/001-temporizador-estudio/tasks.md` debe esperar a que HU-005 ofrezca
  una fuente real; no usar valores ficticios.
- La lógica de ciclo HU-002 no existe en el alcance revisado; RF-7 y su
  prueba integral requieren esa implementación y deben coordinarse con HU-002.
- HU-005 fue aprobada por el estudiante para implementación en esta sesión.


================================================
ðŸ“„ ARCHIVO: specs\005-ajustes-pomodoro\spec.md
================================================

# Spec 005 - Ajustes de Pomodoro

Estado: Aprobada
HU de origen: docs/historias/HU-005.md

## Contexto y objetivo

Permitir que el estudiante configure las duraciones del estudio y los
descansos, así como la cantidad de pomodoros antes del descanso largo, y que
sus ajustes se conserven localmente.

Esta propuesta desarrolla HU-005. Los requisitos de temporizador y
alternancia de fases siguen perteneciendo a HU-001 y HU-002, respectivamente.

## Usuarios

- Estudiante.

## Historias de usuario

Como estudiante, quiero cambiar la duración del estudio, de los descansos y la
cantidad de pomodoros antes del descanso largo, para adaptar la técnica a mi
ritmo.

## Definiciones

- **Duración de fase:** duración en minutos configurada para estudio, descanso
  corto o descanso largo.
- **Ciclo actual:** grupo de pomodoros cuyo objetivo de cantidad quedó fijado
  al comenzar ese ciclo. El cambio de ese objetivo se aplica al siguiente
  ciclo.
- **Fase siguiente:** próxima fase que comience después de guardar el ajuste;
  una fase ya iniciada conserva su duración inicial.

## Requisitos funcionales

- **RF-1:** CUANDO el estudiante guarda una duración de estudio, descanso corto
  o descanso largo entre 1 y 120 minutos inclusive, EL SISTEMA acepta el valor
  para las fases que comiencen después del guardado. Origen: HU-005, escenario
  «Cambiar un tiempo», y decisión D-001 de `decisiones.md`.
- **RF-2:** CUANDO el estudiante guarda una cantidad de pomodoros por ciclo
  entre 1 y 12 inclusive, EL SISTEMA acepta el valor para los ciclos que
  comiencen después del ciclo actual. Origen: decisiones D-001 y D-007 de
  `decisiones.md`.
- **RF-3:** SI el estudiante intenta guardar un campo vacío o un valor fuera
  del rango permitido, ENTONCES EL SISTEMA no guarda el cambio y le indica el
  rango válido para ese campo: 1–120 minutos para cada duración y 1–12 para la
  cantidad de pomodoros. Origen: HU-005, escenario «Ingresar un valor no
  válido», y decisión D-001 de `decisiones.md`.
- **RF-4:** CUANDO el estudiante abre Ajustes por primera vez o restablece los
  ajustes y confirma, EL SISTEMA usa 25 minutos de estudio, 5 minutos de
  descanso corto, 15 minutos de descanso largo y 4 pomodoros por ciclo. Origen:
  HU-005, escenario «Volver a los valores por defecto», y decisión D-002 de
  `decisiones.md`.
- **RF-5:** CUANDO el estudiante guarda cambios válidos, EL SISTEMA los
  conserva localmente para que sigan disponibles después de cerrar y volver a
  abrir la aplicación. Origen: HU-005, escenario «Cambiar un tiempo», y
  decisión D-005 de `decisiones.md`.
- **RF-6:** CUANDO el estudiante modifica la duración correspondiente a una
  fase en curso, EL SISTEMA mantiene para esa fase el tiempo inicial con el que
  comenzó y aplica la duración modificada a las fases siguientes. Origen:
  HU-005, escenario «Cambiar un tiempo con una fase en curso», y decisión D-006
  de `decisiones.md`.
- **RF-7:** MIENTRAS transcurre un ciclo, EL SISTEMA conserva para ese ciclo la
  cantidad de pomodoros que tenía configurada al comenzar y aplica una cantidad
  modificada desde el ciclo siguiente. Origen: decisión D-007 de
  `decisiones.md`.
- **RF-8:** CUANDO el estudiante solicita guardar modificaciones válidas de
  ajustes, EL SISTEMA solicita confirmación explícita antes de aplicarlas.
  Origen: Constitución, principio 6; HU-005, escenario «Cambiar un tiempo», y
  decisión D-008 de `decisiones.md`.
- **RF-9:** CUANDO el estudiante solicita restablecer los ajustes, EL SISTEMA
  solicita confirmación explícita y, si confirma, aplica los valores
  predeterminados; si cancela, conserva los valores vigentes. Origen: HU-005,
  escenario «Volver a los valores por defecto», Constitución, principio 6, y
  decisión D-004 de `decisiones.md`.
- **RF-10:** CUANDO la aplicación no puede leer o guardar los ajustes locales,
  EL SISTEMA informa claramente que la operación falló y no presenta como
  guardado un cambio que no se haya persistido correctamente. Origen:
  Constitución, principio 6, y decisión D-005 de `decisiones.md`.
- **RF-11:** CUANDO el estudiante abre la segunda pestaña de la aplicación,
  EL SISTEMA muestra la pantalla «Ajustes» con los campos de configuración de
  HU-005. Origen: decisión D-003 de `decisiones.md`.

## Requisitos no funcionales

- Los ajustes se almacenan localmente, sin requerir conexión a internet, en
  concordancia con HU-006 y la dependencia de almacenamiento autorizada por el
  estudiante.
- No se añaden cuentas, servicios remotos, analítica ni publicidad.
- Los mensajes, etiquetas y confirmaciones visibles se presentan en español.
- Los cambios de configuración deben poder verificarse con pruebas Jest y
  validación manual de la interfaz en Expo Go o emulador Android.

## Casos límite

- Los extremos 1 y 120 son válidos para cada duración; 0 y 121 no lo son.
- Los extremos 1 y 12 son válidos para la cantidad de pomodoros; 0 y 13 no lo
  son.
- Un campo vacío impide guardar el conjunto de cambios.
- Cancelar una confirmación de guardado o de restablecimiento no altera la
  configuración ya aplicada.
- Cambiar una duración no reemplaza ni reinicia la duración inicial de una fase
  activa.
- Cambiar la cantidad de pomodoros no modifica el objetivo del ciclo en curso.
- Un fallo de almacenamiento debe ser visible y no debe presentarse al usuario
  como una operación exitosa.

## Fuera de alcance

- Iniciar, pausar, reanudar o reiniciar el temporizador, especificados en
  HU-001.
- Las transiciones y el conteo de fases/ciclos, especificados en HU-002. HU-005
  define el contrato de cuándo toma efecto el ajuste, pero requiere que HU-002
  consuma la configuración.
- Recuperar una sesión al cerrar la aplicación o el comportamiento en segundo
  plano, especificados en HU-003.
- Notificaciones y alarmas, especificadas en HU-004.
- Sincronización, cuentas o almacenamiento remoto.

## Criterios de finalización

- RF-1 a RF-3 se verifican con pruebas de valores válidos en límites y valores
  inválidos, campo vacío y mensajes de rango.
- RF-4 se verifica tanto al cargar por primera vez como después de confirmar el
  restablecimiento.
- RF-5 y RF-10 se verifican guardando, reiniciando la aplicación, operando sin
  conexión y simulando fallos de lectura/escritura.
- RF-6 se verifica con una fase en curso cuyo tiempo inicial permanece
  inalterado tras guardar otra duración y cuya siguiente fase usa el valor
  nuevo.
- RF-7 se verifica al cambiar la cantidad en un ciclo en curso: ese ciclo
  conserva su objetivo y el siguiente toma la cantidad nueva. La prueba de
  integración depende de que HU-002 disponga de implementación de ciclos.
- RF-8, RF-9 y RF-11 se verifican en la interfaz, incluidas confirmación,
  cancelación y la segunda pestaña «Ajustes».

## Dudas abiertas

- Ninguna de las decisiones funcionales consultadas queda pendiente. La
  integración y verificación de RF-7 depende de HU-002, aún no implementada en
  el alcance revisado.


================================================
ðŸ“„ ARCHIVO: specs\005-ajustes-pomodoro\tasks.md
================================================

# Tareas propuestas – Ajustes de Pomodoro

Estado: Aprobado y completado
Spec: [spec.md](./spec.md)
Plan propuesto: [plan.md](./plan.md)
HU: [HU-005](../../docs/historias/HU-005.md)

Las tareas están aprobadas y se ejecutarán secuencialmente.

- [x] **T1. Escribir pruebas del modelo y validación de ajustes.** RF-1, RF-2,
  RF-3, RF-4.
  Hecho cuando: pruebas Jest cubren valores predeterminados, extremos válidos,
  valores inmediatamente fuera de rango, entradas vacías/no enteras y fallan
  antes de existir el modelo.
- [x] **T2. Implementar el modelo puro y la validación de ajustes.** RF-1,
  RF-2, RF-3, RF-4.
  Hecho cuando: las pruebas de T1 pasan para los cuatro campos, las reglas
  están aisladas de React Native y almacenamiento, y Jest pasa.
- [x] **T3. Declarar e instalar las dependencias Expo autorizadas.**
  RF-5, RF-10.
  Hecho cuando: `@react-native-async-storage/async-storage` queda disponible y
  el manifiesto/lockfile se actualizan. También se instala `expo-image`,
  autorizado para reparar imports del scaffold que bloqueaban el type-check.
- [x] **T4. Escribir pruebas del adaptador de almacenamiento.** RF-5, RF-10.
  Hecho cuando: pruebas Jest con almacenamiento simulado cubren lectura,
  escritura y fallos, y fallan antes de existir el adaptador.
- [x] **T5. Implementar el adaptador local de ajustes.** RF-5, RF-10.
  Hecho cuando: el adaptador persiste solo los cuatro valores configurados,
  propaga fallos para que puedan mostrarse y pasan las pruebas de T4.
  Depende de T2, T3 y T4.
- [x] **T6. Escribir pruebas del proveedor compartido de ajustes.** RF-4, RF-5,
  RF-6, RF-7, RF-10.
  Hecho cuando: Jest cubre carga inicial, publicación solo tras escritura
  exitosa, error de lectura/escritura y actualización del valor consumible;
  las pruebas fallan antes del proveedor. RF-7 requiere además la integración
  pendiente de HU-002.
- [x] **T7. Implementar el proveedor compartido y conectarlo al layout.**
  RF-4, RF-5, RF-6, RF-7, RF-10, RF-11.
  Hecho cuando: rutas de temporizador y ajustes consultan el mismo estado,
  valores predeterminados se muestran ante configuración inicial vacía, los
  fallos se exponen y las pruebas de T6 pasan. La prueba integral de objetivo
  de ciclo queda pendiente de HU-002.
  Depende de T2, T5 y T6.
- [x] **T8. Escribir pruebas de la pantalla y la segunda pestaña.** RF-1 a
  RF-5, RF-8, RF-9, RF-11.
  Hecho cuando: React Native Testing Library verifica campos, validaciones,
  confirmaciones, cancelaciones, accesibilidad y la pestaña «Ajustes», y
  detecta fallos antes de implementar la pantalla.
  Depende de T7.
- [x] **T9. Implementar la pantalla Ajustes y conectar la segunda pestaña.**
  RF-1 a RF-5, RF-8 a RF-11.
  Hecho cuando: la interfaz española permite guardar y restablecer con
  confirmación, rechaza y señala valores inválidos, el teclado no tapa acciones,
  y pasan las pruebas de T8 y `npx tsc --noEmit`.
  Depende de T8.
- [x] **T10. Validar ajustes en Expo Go o emulador Android.** RF-1 a RF-11.
  Hecho cuando: se comprueban pestaña, orientación, áreas seguras, teclado,
  límites, mensajes, confirmación/cancelación, persistencia tras reiniciar,
  uso sin conexión y errores; con HU-001/HU-002 disponibles se comprueba
  también que la fase/ciclo en curso conserva el valor anterior y los
  siguientes usan el nuevo. Registrar el resultado antes de cerrar la tarea.
  Depende de T9 y de las integraciones HU-001/HU-002 aplicables.
  Resultado: validación manual en Android confirmada por el usuario. No se
  registraron modelo ni versión del dispositivo.

## Dependencias y límites

- Dependencia principal: T1 → T2; T3 y T2 → T4; T2, T3 y T4 → T5; T5 y T2 →
  T6; T6 → T7; T7 → T8 → T9 → T10.
- La implementación de RF-7 depende de la lógica de ciclos de HU-002, aún
  ausente en el alcance revisado. No se inventa ni se reemplaza aquí el
  algoritmo de esa historia.
- La integración de la duración configurada con la pantalla del temporizador
  también depende de T7 de HU-001, que debe quedar condicionada a esta fuente
  real de HU-005.
- No se realizan ahora cambios de aplicación, manifiestos, lockfile ni
  `MEMORY.md`.


================================================
ðŸ“„ ARCHIVO: specs\006-hu006-offline-sin-anuncios\plan.md
================================================

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


================================================
ðŸ“„ ARCHIVO: specs\006-hu006-offline-sin-anuncios\spec.md
================================================

# Spec 006 - Uso sin registro, sin internet y sin publicidad

Estado: aprobada
HU de origen: docs/historias/HU-006.md

## Contexto y objetivo

Permitir que el estudiante empiece a usar Cotopaxi Focus sin crear una cuenta,
que pueda utilizar las funciones de la aplicación sin conexión a internet y
que no encuentre publicidad durante su uso.

Esta especificación desarrolla HU-006. Los comportamientos del temporizador,
los avisos y los ajustes permanecen definidos por HU-001 a HU-005,
respectivamente; esta historia establece que su uso no debe requerir
conectividad.

## Usuarios

- Estudiante.

## Historias de usuario

Como estudiante, quiero usar la aplicación apenas la instalo, sin crear una
cuenta, sin datos móviles y sin anuncios, para empezar a estudiar sin trabas.

## Requisitos funcionales

- **RF-1:** CUANDO el estudiante abre la aplicación por primera vez después de
  instalarla, EL SISTEMA muestra directamente el temporizador sin presentar
  una pantalla de registro ni de inicio de sesión. Origen: HU-006, escenario
  «Abrir la aplicación por primera vez».
- **RF-2:** CUANDO el estudiante usa el temporizador, los avisos o los ajustes
  sin conexión a internet, EL SISTEMA permite utilizar esas funciones sin
  requerir conexión, conforme a sus comportamientos definidos en HU-001 a
  HU-005. Origen: HU-006, escenario «Usarla sin conexión».
- **RF-3:** CUANDO el estudiante modifica ajustes sin conexión a internet, EL
  SISTEMA conserva esos ajustes en el celular para que sigan disponibles al
  volver a usar la aplicación. Origen: HU-006, escenario «Usarla sin
  conexión».
- **RF-4:** EL SISTEMA no presenta anuncios en ninguna de sus pantallas ni
  durante el uso de la aplicación. Origen: HU-006, escenario «Usarla sin
  publicidad».

## Requisitos no funcionales

- El uso descrito en esta especificación no depende de datos móviles ni de
  conexión Wi-Fi.
- Los avisos mantienen las capacidades y limitaciones definidas en HU-004;
  esta especificación no añade garantías de entrega, sonido o vibración bajo
  restricciones del sistema operativo.
- La aplicación no requiere registro ni inicio de sesión para el flujo descrito
  en HU-006.

## Casos límite

- La primera apertura ocurre sin conexión: el temporizador sigue siendo el
  destino inicial y no aparece un flujo de registro o inicio de sesión.
- La conexión se pierde mientras se usan el temporizador, los avisos o los
  ajustes: la falta de conexión no debe impedir el uso de esas funciones.
- Los ajustes modificados sin conexión siguen disponibles en un uso posterior.
- La ausencia de anuncios aplica a todas las pantallas, no solo al
  temporizador.

## Fuera de alcance

- Los detalles del temporizador, sus fases y su persistencia, cubiertos por
  HU-001, HU-002 y HU-003.
- La configuración de ajustes, cubierta por HU-005.
- Las capacidades, permisos y restricciones de los avisos, cubiertos por
  HU-004.
- Cambios en la lógica funcional de esas historias.

## Criterios de finalización

- RF-1 se verifica con la primera apertura y comprobando que se muestra el
  temporizador sin pantallas de registro o inicio de sesión.
- RF-2 se verifica con el dispositivo sin datos móviles ni Wi-Fi, usando el
  temporizador, los avisos y los ajustes conforme a las historias que los
  definen.
- RF-3 se verifica guardando ajustes sin conexión y comprobando que siguen
  disponibles después de cerrar y volver a abrir la aplicación.
- RF-4 se verifica revisando las pantallas de la aplicación y confirmando que
  no se presenta publicidad.

## Dudas abiertas

- Ninguna propia de HU-006. Los permisos y las limitaciones de los avisos
  siguen sujetos a HU-004; HU-006 no añade ni cambia esas reglas.


================================================
ðŸ“„ ARCHIVO: specs\006-hu006-offline-sin-anuncios\tasks.md
================================================

# Tareas - Spec 006: Uso sin registro, sin internet y sin publicidad

Trazabilidad: HU-006, escenario «Abrir la aplicación por primera vez» → RF-1;
«Usarla sin conexión» → RF-2 y RF-3; «Usarla sin publicidad» → RF-4. Las tareas
siguen el plan aprobado en `plan.md`. Las pruebas Jest verifican la lógica y la
integración local; la desconexión real, la primera apertura limpia y la
ausencia visible de anuncios requieren validación manual.

- [x] **T1. Comprobar el flujo de entrada y la pantalla del temporizador (20–30 min).** RF-1
  Hecho cuando: `src/app/__tests__/index.test.tsx` verifica que se presenta el temporizador sin controles o textos de registro/inicio de sesión; cualquier ajuste se limita a esa prueba existente y `npx jest src/app/__tests__/index.test.tsx` termina en verde.

- [x] **T2. Ejecutar regresión Jest del temporizador y su lógica local (20–30 min).** RF-2
  Hecho cuando: las pruebas existentes `src/domain/__tests__/pomodoro-session.test.ts` y `src/domain/__tests__/study-timer.test.ts` pasan; si falta una aserción directamente verificable según el plan, se amplían esas pruebas sin cambiar las reglas de HU-001–HU-003.

- [x] **T3. Ejecutar regresión Jest de los avisos locales (20–30 min).** RF-2
  Hecho cuando: `src/storage/__tests__/study-notifications.test.ts` pasa y cualquier aserción añadida se limita a las capacidades ya definidas por HU-004; no se presenta esta prueba como verificación de recepción real sin conexión.

- [x] **T4. Verificar por Jest validación y persistencia local de ajustes (20–30 min).** RF-2, RF-3
  Hecho cuando: `src/domain/__tests__/pomodoro-settings.test.ts` y `src/storage/__tests__/pomodoro-settings-storage.test.ts` pasan y comprueban los casos existentes de validación, lectura/escritura local y fallo de almacenamiento; cualquier ajuste se limita a esas pruebas y no cambia el formato guardado.

- [x] **T5. Verificar la presentación de ajustes y errores de operación (20–30 min).** RF-3
  Hecho cuando: `src/app/__tests__/settings.test.tsx` pasa y comprueba los estados y mensajes existentes de ajustes, incluido que un fallo de carga o guardado no se presenta como éxito; cualquier ajuste se limita a la prueba de pantalla existente.

- [x] **T6. Revisar manifiestos, navegación y dependencias contra anuncios, cuentas y red (20–30 min).** RF-1, RF-2, RF-3, RF-4
  Hecho cuando: se revisan `app.json`, `package.json`, la navegación Expo Router y las pantallas previstas en `plan.md`; queda registrado si existe alguna integración declarada de publicidad, autenticación o servicios de red, sin añadir dependencias, rutas ni permisos.
  Resultado: los manifiestos declaran Expo Router, notificaciones locales y dependencias de interfaz/almacenamiento; no declaran SDK de anuncios, autenticación ni servicios de red. El componente `ExternalLink` no tiene usos. La navegación y las rutas Temporizador/Ajustes se revisaron; no se añadieron dependencias, rutas ni permisos.

- [x] **T7. Validar manualmente la primera apertura limpia (20–30 min).** RF-1
  Hecho cuando: en una instalación limpia o tras restablecer los datos se comprueba que la primera apertura muestra el temporizador, sin pantalla de registro ni inicio de sesión.
  Depende de: T1, T6.
  Resultado: el usuario confirmó la primera apertura en APK físico Android; abrió directamente el temporizador, sin registro ni inicio de sesión.

- [x] **T8. Validar manualmente temporizador y ajustes sin conexión (20–30 min).** RF-2, RF-3
  Hecho cuando: con datos móviles y Wi-Fi desactivados se usan el temporizador y los ajustes, se guarda un cambio y, tras cerrar y reabrir la app aún desconectada, se confirma que el ajuste continúa disponible; cualquier fallo observado queda visible y la tarea permanece abierta.
  Depende de: T2, T4, T5.
  Resultado: el usuario confirmó que el temporizador y los ajustes funcionaron offline, y que un ajuste guardado permaneció disponible tras cerrar y reabrir la app sin conexión en APK físico Android.

- [x] **T9. Validar manualmente los avisos locales sin conexión (20–30 min).** RF-2
  Hecho cuando: con datos móviles y Wi-Fi desactivados se prueba el flujo de avisos conforme a HU-004 y se registra el resultado real y las condiciones del dispositivo, sin afirmar garantías adicionales de entrega, sonido o vibración.
  Depende de: T3.
  Resultado: el usuario confirmó alertas en pantalla y notificaciones con sonido/banner con datos y Wi-Fi desactivados, en primer plano, segundo plano y con pantalla bloqueada. Dispositivo/versión de Android no especificados; el resultado documenta el dispositivo probado, no una garantía general de plataforma.

- [x] **T10. Revisar ausencia visible de anuncios y ejecutar regresión completa (20–30 min).** RF-1, RF-2, RF-3, RF-4
  Hecho cuando: se recorren las pantallas y rutas accesibles y se confirma que no aparece publicidad; además, `npx jest` pasa. La revisión visual, no Jest, es la comprobación de ausencia de anuncios.
  Depende de: T1–T9.
  Resultado: el usuario confirmó que no observó anuncios ni rastreadores en el dispositivo físico. La revisión visual local previa de Temporizador y Ajustes tampoco mostró anuncios. `npx jest --runInBand` pasó (10 suites, 102 pruebas).

- [x] **T11. Evitar notificaciones duplicadas al finalizar una fase.** RF-2
  Hecho cuando: la programación cancela las notificaciones pendientes antes de agendar una nueva; los re-renders no duplican la programación de una sesión restaurada; al finalizar en primer plano se conserva el aviso del sistema sin emitir otro manual.
  Resultado: se añadieron pruebas de orden de cancelación y de re-render; `npx jest` pasó (10 suites, 102 pruebas) y `npx tsc --noEmit` pasó.


================================================
ðŸ“„ ARCHIVO: src\app\(tabs)\index.tsx
================================================

import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  CotopaxiColors,
  MaxContentWidth,
  Spacing,
} from '@/constants/theme';
import { ScreenHeader } from '@/components/screen-header';
import { ProgressRing } from '@/components/progress-ring';
import { usePomodoroSession } from '@/hooks/use-pomodoro-session';
import type { PomodoroPhase } from '@/domain/pomodoro-session';

const phaseNames: Record<PomodoroPhase, string> = {
  study: 'Estudio',
  shortBreak: 'Descanso corto',
  longBreak: 'Descanso largo',
};

export default function HomeScreen() {
  const timer = usePomodoroSession();
  const previousSessionRef = useRef(timer.session);
  const [hasExplainedNotificationPermission, setHasExplainedNotificationPermission] =
    useState(false);

  useEffect(() => {
    const previousSession = previousSessionRef.current;
    const currentSession = timer.session;

    if (
      previousSession?.status === 'running' &&
      currentSession?.status === 'ready' &&
      currentSession.lastCompletedPhase === previousSession.phase
    ) {
      const completedPeriod =
        previousSession.phase === 'study' ? 'estudio' : 'descanso';
      Alert.alert(
        '¡Tiempo finalizado!',
        `El período de ${completedPeriod} ha concluido. Presiona Iniciar para el siguiente ciclo.`,
      );
    }

    previousSessionRef.current = currentSession;
  }, [timer.session]);

  if (timer.status === 'loading') {
    return <StatusMessage message="Cargando tu sesión…" />;
  }

  if (timer.status === 'error' || timer.session === null) {
    return (
      <StatusMessage
        message="No se pudo restaurar la sesión guardada."
        error={timer.error?.message}
      />
    );
  }

  const { session } = timer;
  const phaseStatus =
    session.status === 'ready'
      ? session.lastCompletedPhase
        ? `${phaseNames[session.lastCompletedPhase]} terminado. ${phaseNames[session.phase]} listo`
        : `${phaseNames[session.phase]} listo`
      : session.status === 'running'
        ? `${phaseNames[session.phase]} en marcha`
        : `${phaseNames[session.phase]} pausado`;

  const isBreak = session.phase === 'shortBreak' || session.phase === 'longBreak';
  const progressRatio =
    session.initialDurationMs > 0
      ? Math.min(1, Math.max(0, 1 - timer.remainingMs / session.initialDurationMs))
      : 0;

  function startWithPermissionExplanation() {
    if (
      timer.notificationPermissionGranted ||
      hasExplainedNotificationPermission
    ) {
      void timer.start();
      return;
    }

    Alert.alert(
      'Avisos del temporizador',
      'Cotopaxi Focus puede mostrar un aviso local cuando termine esta fase. Puedes iniciar sin avisos o permitir las notificaciones.',
      [
        {
          text: 'Iniciar sin avisos',
          style: 'cancel',
          onPress: () => {
            setHasExplainedNotificationPermission(true);
            void timer.start();
          },
        },
        {
          text: 'Permitir avisos',
          onPress: () => {
            setHasExplainedNotificationPermission(true);
            void (async () => {
              const granted = await timer.requestPermission();
              await timer.start(granted);
            })();
          },
        },
      ],
      { cancelable: true },
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        alwaysBounceVertical={false}>
        <View style={styles.content}>
          <ScreenHeader
            title="Temporizador Pomodoro"
            variant="plain"
          />

          {/* Tarjeta Principal del Temporizador */}
          <View style={styles.timerCard}>
            {/* Indicador visual de fase actual */}
            <View style={styles.phaseHeader}>
              <View
                style={[
                  styles.phaseBadge,
                  isBreak ? styles.phaseBadgeBreak : styles.phaseBadgeStudy,
                ]}>
                <Text
                  style={[
                    styles.phaseName,
                    isBreak ? styles.phaseNameBreak : styles.phaseNameStudy,
                  ]}>
                  {phaseNames[session.phase]}
                </Text>
              </View>
              <View style={styles.phaseAccent} />
            </View>

            {/* Mensaje de estado descriptivo */}
            <Text accessibilityLiveRegion="polite" style={styles.statusMessage}>
              {phaseStatus}
            </Text>

            {session.status === 'ready' && session.lastCompletedPhase ? (
              <View
                accessibilityLiveRegion="assertive"
                style={styles.completionNotice}
                testID="phase-completion-notice">
                <Text accessibilityRole="alert" style={styles.completionTitle}>
                  ¡{phaseNames[session.lastCompletedPhase]} terminado!
                </Text>
                <Text style={styles.completionMessage}>
                  {phaseNames[session.phase]} está listo para iniciar.
                </Text>
              </View>
            ) : null}

            {/* Display de tiempo restante */}
            <ProgressRing
              accessibilityLabel={`Progreso de ${phaseNames[session.phase].toLowerCase()}`}
              color={isBreak ? CotopaxiColors.success : CotopaxiColors.gold}
              progress={progressRatio}
              time={timer.formattedRemainingTime}
            />

            {/* Contador y chips visuales de pomodoros completados en el ciclo */}
            <View style={styles.cycleContainer}>
              <Text style={styles.progress}>
                Pomodoros completados: {session.completedPomodoros} de{' '}
                {session.cycleTarget}
              </Text>
              <View style={styles.cycleDots}>
                {Array.from({ length: session.cycleTarget }).map((_, idx) => {
                  const isCompleted = idx < session.completedPomodoros;
                  const isCurrent =
                    idx === session.completedPomodoros &&
                    session.status === 'running' &&
                    session.phase === 'study';

                  return (
                    <View
                      key={`cycle-dot-${idx}`}
                      style={[
                        styles.dot,
                        isCompleted && styles.dotCompleted,
                        isCurrent && styles.dotCurrent,
                      ]}
                    />
                  );
                })}
              </View>
            </View>

            {/* Mensajes de error o avisos */}
            {timer.error ? (
              <View style={styles.alertBox}>
                <Text accessibilityRole="alert" style={styles.errorMessage}>
                  No se pudo guardar la sesión. {timer.error.message}
                </Text>
              </View>
            ) : null}
            {timer.notificationError ? (
              <View style={styles.alertBox}>
                <Text accessibilityRole="alert" style={styles.errorMessage}>
                  {timer.notificationError.message}
                </Text>
              </View>
            ) : null}
            {timer.notificationPermissionGranted === false ? (
              <View style={styles.noticeBox}>
                <Text style={styles.permissionMessage}>
                  Avisos desactivados. La cuenta continuará sin notificaciones.
                </Text>
              </View>
            ) : null}

            {/* Botones de control */}
            <View style={styles.controls}>
              {session.status === 'ready' ? (
                <TimerButton
                  label={`Iniciar ${phaseNames[session.phase].toLowerCase()}`}
                  title="Iniciar"
                  onPress={startWithPermissionExplanation}
                />
              ) : null}
              {session.status === 'running' ? (
                <TimerButton
                  label="Pausar temporizador"
                  title="Pausar"
                  onPress={() => void timer.pause()}
                />
              ) : null}
              {session.status === 'paused' ? (
                <TimerButton
                  label="Reanudar temporizador"
                  title="Reanudar"
                  onPress={() => void timer.resume()}
                />
              ) : null}
              {session.status !== 'ready' ? (
                <TimerButton
                  destructive
                  label="Reiniciar temporizador"
                  title="Reiniciar"
                  onPress={() =>
                    Alert.alert(
                      'Reiniciar temporizador',
                      'El tiempo restante volverá a la duración inicial de esta fase.',
                      [
                        { text: 'Cancelar', style: 'cancel' },
                        {
                          text: 'Reiniciar',
                          onPress: () => {
                            void timer.restart();
                          },
                        },
                      ],
                      { cancelable: true },
                    )
                  }
                />
              ) : null}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatusMessage({
  message,
  error,
}: {
  message: string;
  error?: string;
}) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.statusContainer}>
        {error ? null : (
          <ActivityIndicator
            color={CotopaxiColors.navy}
            accessibilityLabel="Cargando sesión"
          />
        )}
        <Text
          accessibilityRole="alert"
          style={[styles.statusMessage, error && styles.errorMessage]}>
          {message}
        </Text>
        {error ? <Text style={styles.errorDetails}>{error}</Text> : null}
      </View>
    </SafeAreaView>
  );
}

function TimerButton({
  label,
  title,
  onPress,
  destructive = false,
}: {
  label: string;
  title: string;
  onPress: () => void;
  destructive?: boolean;
}) {
  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        destructive ? styles.secondaryButton : styles.button,
        pressed &&
          (destructive
            ? styles.secondaryButtonPressed
            : styles.buttonPressed),
      ]}>
      <Text
        style={[
          styles.buttonText,
          destructive && styles.secondaryButtonText,
        ]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: CotopaxiColors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
    paddingBottom: Platform.OS === 'web' ? 104 : Spacing.four,
  },
  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    gap: Spacing.three,
  },
  timerCard: {
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    backgroundColor: CotopaxiColors.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: CotopaxiColors.border,
    shadowColor: CotopaxiColors.navy,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  phaseBadge: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phaseBadgeStudy: {
    backgroundColor: CotopaxiColors.background,
    borderColor: CotopaxiColors.navy,
    borderWidth: 1,
  },
  phaseBadgeBreak: {
    backgroundColor: CotopaxiColors.success,
  },
  phaseName: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  phaseNameStudy: {
    color: CotopaxiColors.navy,
  },
  phaseNameBreak: {
    color: CotopaxiColors.white,
  },
  phaseHeader: {
    width: '100%',
    alignItems: 'center',
    gap: Spacing.one,
  },
  phaseAccent: {
    width: 44,
    height: 3,
    borderRadius: 2,
    backgroundColor: CotopaxiColors.navy,
  },
  statusMessage: {
    color: CotopaxiColors.secondaryText,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  completionNotice: {
    width: '100%',
    alignItems: 'center',
    gap: Spacing.half,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: 12,
    backgroundColor: CotopaxiColors.success,
  },
  completionTitle: {
    color: CotopaxiColors.white,
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
  },
  completionMessage: {
    color: CotopaxiColors.white,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  cycleContainer: {
    alignItems: 'center',
    gap: Spacing.one,
  },
  progress: {
    color: CotopaxiColors.secondaryText,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  cycleDots: {
    flexDirection: 'row',
    gap: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: CotopaxiColors.background,
    borderColor: CotopaxiColors.border,
    borderWidth: 2,
  },
  dotCompleted: {
    backgroundColor: CotopaxiColors.gold,
    borderColor: CotopaxiColors.navy,
  },
  dotCurrent: {
    borderColor: CotopaxiColors.navy,
    borderWidth: 3,
    backgroundColor: CotopaxiColors.white,
  },
  noticeBox: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    width: '100%',
  },
  alertBox: {
    backgroundColor: CotopaxiColors.white,
    borderRadius: 12,
    borderLeftColor: CotopaxiColors.gold,
    borderLeftWidth: 3,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    width: '100%',
  },
  permissionMessage: {
    color: CotopaxiColors.secondaryText,
    fontSize: 12,
    textAlign: 'left',
    fontWeight: '500',
  },
  errorMessage: {
    color: CotopaxiColors.navy,
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '600',
  },
  controls: {
    width: '100%',
    gap: Spacing.one,
    marginTop: Spacing.two,
    paddingTop: Spacing.two,
    borderTopWidth: 1,
    borderTopColor: CotopaxiColors.border,
  },
  button: {
    minHeight: 56,
    width: '100%',
    maxWidth: 360,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: CotopaxiColors.gold,
    paddingHorizontal: Spacing.five,
    borderColor: CotopaxiColors.navy,
    borderWidth: 1,
    shadowColor: CotopaxiColors.navy,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 1,
  },
  secondaryButton: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: CotopaxiColors.navy,
    backgroundColor: CotopaxiColors.navy,
    paddingHorizontal: Spacing.four,
  },
  buttonPressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.9,
  },
  secondaryButtonPressed: {
    opacity: 0.86,
  },
  buttonText: {
    color: CotopaxiColors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  secondaryButtonText: {
    color: CotopaxiColors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  statusContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
    padding: Spacing.four,
  },
  errorDetails: {
    color: CotopaxiColors.secondaryText,
    fontSize: 14,
    textAlign: 'center',
  },
});


================================================
ðŸ“„ ARCHIVO: src\app\(tabs)\settings.tsx
================================================

import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  DEFAULT_POMODORO_SETTINGS,
  validatePomodoroSettings,
  type PomodoroSettings,
  type PomodoroSettingsFieldError,
  type PomodoroSettingsInput,
} from '@/domain/pomodoro-settings';
import { CotopaxiColors, MaxContentWidth, Spacing } from '@/constants/theme';
import { ScreenHeader } from '@/components/screen-header';
import { usePomodoroSettings } from '@/hooks/use-pomodoro-settings';

type SettingsFieldName = keyof PomodoroSettings;
const SETTINGS_FIELDS: readonly SettingsFieldName[] = [
  'studyDurationMinutes',
  'shortBreakDurationMinutes',
  'longBreakDurationMinutes',
  'pomodorosBeforeLongBreak',
];

function toFormValues(settings: PomodoroSettings): PomodoroSettingsInput {
  return {
    studyDurationMinutes: String(settings.studyDurationMinutes),
    shortBreakDurationMinutes: String(settings.shortBreakDurationMinutes),
    longBreakDurationMinutes: String(settings.longBreakDurationMinutes),
    pomodorosBeforeLongBreak: String(settings.pomodorosBeforeLongBreak),
  };
}

function errorMessage(
  field: SettingsFieldName,
  error: PomodoroSettingsFieldError,
): string {
  if (error === 'required') {
    return 'Este campo es obligatorio.';
  }

  if (error === 'integer') {
    return 'Ingresa un número entero.';
  }

  return field === 'pomodorosBeforeLongBreak'
    ? 'Ingresa entre 1 y 12 pomodoros.'
    : 'Ingresa entre 1 y 120 minutos.';
}

function toFieldErrors(
  errors: Partial<
    Record<SettingsFieldName, PomodoroSettingsFieldError>
  >,
): Partial<Record<SettingsFieldName, string>> {
  const messages: Partial<Record<SettingsFieldName, string>> = {};

  for (const field of SETTINGS_FIELDS) {
    const error = errors[field];
    if (error) {
      messages[field] = errorMessage(field, error);
    }
  }

  return messages;
}

export default function SettingsScreen() {
  const { settings, status, error, saveSettings } = usePomodoroSettings();
  const [values, setValues] = useState<PomodoroSettingsInput | null>(null);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<SettingsFieldName, string>>
  >({});
  const [operationError, setOperationError] = useState<string | null>(null);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const formValues = values ?? toFormValues(settings);

  useEffect(() => {
    if (!savedMessage) {
      return;
    }

    const timeoutId = setTimeout(() => setSavedMessage(null), 3_500);
    return () => clearTimeout(timeoutId);
  }, [savedMessage]);

  async function persistSettings(nextSettings: PomodoroSettings) {
    setIsSaving(true);
    setOperationError(null);
    setSavedMessage(null);

    try {
      await saveSettings(nextSettings);
      setValues(toFormValues(nextSettings));
      setSavedMessage('Ajustes guardados correctamente.');
    } catch (saveError: unknown) {
      const message =
        saveError instanceof Error
          ? saveError.message
          : 'Ocurrió un error inesperado.';
      setOperationError(`No se pudieron guardar los ajustes. ${message}`);
    } finally {
      setIsSaving(false);
    }
  }

  function handleSave() {
    const validation = validatePomodoroSettings(formValues);

    if (!validation.valid) {
      setFieldErrors(toFieldErrors(validation.errors));
      setSavedMessage(null);
      return;
    }

    setFieldErrors({});
    Alert.alert(
      'Guardar ajustes',
      '¿Deseas aplicar estos cambios?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Guardar',
          onPress: () => {
            void persistSettings(validation.value);
          },
        },
      ],
      { cancelable: true },
    );
  }

  function handleReset() {
    Alert.alert(
      'Restablecer ajustes',
      'Se volverá a los valores predeterminados: 25, 5, 15 minutos y 4 pomodoros.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Restablecer',
          onPress: () => {
            void persistSettings({ ...DEFAULT_POMODORO_SETTINGS });
          },
        },
      ],
      { cancelable: true },
    );
  }

  function updateField(field: SettingsFieldName, value: string) {
    setValues((currentValues) => ({
      ...(currentValues ?? toFormValues(settings)),
      [field]: value,
    }));
    setFieldErrors((currentErrors) => {
      if (!(field in currentErrors)) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      return nextErrors;
    });
    setOperationError(null);
    setSavedMessage(null);
  }

  if (status === 'loading') {
    return <StatusView message="Cargando los ajustes…" />;
  }

  if (status === 'error') {
    return (
      <StatusView
        message="No se pudieron cargar los ajustes guardados."
        error={error?.message}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">
          <View style={styles.content}>
            <ScreenHeader
              title="Ajustes"
              description="Adapta los tiempos a tu ritmo de estudio."
              variant="plain"
            />

            <View style={styles.form}>
              <View style={styles.sectionCard} testID="phase-settings-card">
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Duración de cada fase</Text>
                  <Text style={styles.sectionSubtitle}>
                    Los cambios se aplican al comenzar la siguiente fase.
                  </Text>
                </View>

                <SettingsField
                  label="Duración de estudio en minutos"
                  value={formValues.studyDurationMinutes}
                  unit="min"
                  hint="De 1 a 120 minutos."
                  error={fieldErrors.studyDurationMinutes}
                  onChangeText={(value) =>
                    updateField('studyDurationMinutes', value)
                  }
                />
                <SettingsField
                  label="Duración del descanso corto en minutos"
                  value={formValues.shortBreakDurationMinutes}
                  unit="min"
                  hint="De 1 a 120 minutos."
                  error={fieldErrors.shortBreakDurationMinutes}
                  onChangeText={(value) =>
                    updateField('shortBreakDurationMinutes', value)
                  }
                />
                <SettingsField
                  label="Duración del descanso largo en minutos"
                  value={formValues.longBreakDurationMinutes}
                  unit="min"
                  hint="De 1 a 120 minutos."
                  error={fieldErrors.longBreakDurationMinutes}
                  onChangeText={(value) =>
                    updateField('longBreakDurationMinutes', value)
                  }
                />
              </View>

              <View style={styles.sectionCard} testID="cycle-settings-card">
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Ciclo Pomodoro</Text>
                  <Text style={styles.sectionSubtitle}>
                    Cantidad de pomodoros de estudio antes de un descanso largo.
                  </Text>
                </View>

                <SettingsField
                  label="Pomodoros antes del descanso largo"
                  value={formValues.pomodorosBeforeLongBreak}
                  unit="pomodoros"
                  hint="De 1 a 12 pomodoros."
                  error={fieldErrors.pomodorosBeforeLongBreak}
                  onChangeText={(value) =>
                    updateField('pomodorosBeforeLongBreak', value)
                  }
                />
              </View>

              {operationError ? (
                <View style={styles.errorBox}>
                  <Text accessibilityRole="alert" style={styles.errorText}>
                    {operationError}
                  </Text>
                </View>
              ) : null}
              {/* Botones de acción */}
              <View style={styles.buttonGroup}>
                <SettingsButton
                  label="Guardar ajustes"
                  title={isSaving ? 'Guardando…' : 'Guardar ajustes'}
                  onPress={handleSave}
                  disabled={isSaving}
                />
                <SettingsButton
                  destructive
                  label="Restablecer valores"
                  title="Restablecer valores"
                  onPress={handleReset}
                  disabled={isSaving}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {savedMessage ? (
        <View pointerEvents="box-none" style={styles.toastLayer}>
          <View
            accessibilityLiveRegion="polite"
            accessibilityRole="alert"
            style={styles.successToast}>
            <Text style={styles.successText}>{savedMessage}</Text>
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

function StatusView({
  message,
  error,
}: {
  message: string;
  error?: string;
}) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.statusContainer}>
        {error ? null : (
          <ActivityIndicator
            color={CotopaxiColors.navy}
            accessibilityLabel="Cargando ajustes"
          />
        )}
        <Text
          accessibilityRole="alert"
          style={[styles.statusMessage, error && styles.errorText]}>
          {message}
        </Text>
        {error ? <Text style={styles.errorDetails}>{error}</Text> : null}
      </View>
    </SafeAreaView>
  );
}

function SettingsField({
  label,
  value,
  unit,
  hint,
  error,
  onChangeText,
}: {
  label: string;
  value: string;
  unit?: string;
  hint: string;
  error?: string;
  onChangeText: (value: string) => void;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={[styles.inputWrapper, error && styles.inputError]}>
        <TextInput
          accessibilityLabel={label}
          accessibilityHint={error ? `${hint} ${error}` : hint}
          keyboardType="number-pad"
          onChangeText={onChangeText}
          value={value}
          style={styles.input}
        />
        {unit ? (
          <View style={styles.unitBadge}>
            <Text style={styles.unitText}>{unit}</Text>
          </View>
        ) : null}
      </View>
      <Text style={[styles.fieldHint, error && styles.errorText]}>
        {error ?? hint}
      </Text>
    </View>
  );
}

function SettingsButton({
  label,
  title,
  onPress,
  disabled,
  destructive = false,
}: {
  label: string;
  title: string;
  onPress: () => void;
  disabled: boolean;
  destructive?: boolean;
}) {
  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        destructive ? styles.secondaryButton : styles.button,
        pressed &&
          !disabled &&
          (destructive
            ? styles.secondaryButtonPressed
            : styles.buttonPressed),
        disabled && styles.buttonDisabled,
      ]}>
      <Text
        style={[
          styles.buttonText,
          destructive && styles.secondaryButtonText,
        ]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: CotopaxiColors.background,
  },
  toastLayer: {
    position: 'absolute',
    top: Spacing.two,
    left: Spacing.three,
    right: Spacing.three,
    zIndex: 10,
    alignItems: 'center',
  },
  successToast: {
    width: '100%',
    maxWidth: 560,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: CotopaxiColors.success,
    borderTopColor: CotopaxiColors.white,
    borderTopWidth: 2,
    backgroundColor: CotopaxiColors.success,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    shadowColor: CotopaxiColors.navy,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 7,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
    paddingBottom: Platform.OS === 'web' ? 128 : Spacing.six,
  },
  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    gap: Spacing.three,
  },
  form: {
    gap: Spacing.three,
  },
  sectionCard: {
    borderColor: CotopaxiColors.border,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: CotopaxiColors.white,
    padding: Spacing.three,
    gap: Spacing.three,
    shadowColor: CotopaxiColors.navy,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  sectionHeader: {
    gap: Spacing.half,
  },
  sectionTitle: {
    color: CotopaxiColors.navy,
    fontSize: 18,
    fontWeight: '800',
  },
  sectionSubtitle: {
    color: CotopaxiColors.secondaryText,
    fontSize: 13,
    fontWeight: '500',
  },
  field: {
    gap: Spacing.one,
  },
  fieldLabel: {
    color: CotopaxiColors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  inputWrapper: {
    minHeight: 52,
    borderColor: CotopaxiColors.border,
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: CotopaxiColors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
  },
  input: {
    flex: 1,
    color: CotopaxiColors.text,
    fontSize: 18,
    fontWeight: '700',
    paddingVertical: Spacing.two,
  },
  inputError: {
    borderColor: CotopaxiColors.gold,
    backgroundColor: CotopaxiColors.white,
  },
  unitBadge: {
    backgroundColor: CotopaxiColors.navy,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: 8,
  },
  unitText: {
    color: CotopaxiColors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  fieldHint: {
    color: CotopaxiColors.secondaryText,
    fontSize: 13,
  },
  errorBox: {
    backgroundColor: CotopaxiColors.white,
    borderColor: CotopaxiColors.gold,
    borderWidth: 1,
    borderLeftWidth: 3,
    borderLeftColor: CotopaxiColors.gold,
    borderRadius: 16,
    padding: Spacing.three,
  },
  errorText: {
    color: CotopaxiColors.navy,
    fontSize: 13,
    fontWeight: '600',
  },
  successText: {
    color: CotopaxiColors.white,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  buttonGroup: {
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  button: {
    minHeight: 56,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: CotopaxiColors.gold,
    paddingHorizontal: Spacing.four,
    shadowColor: CotopaxiColors.navy,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 5,
    elevation: 1,
    borderColor: CotopaxiColors.navy,
    borderWidth: 1,
  },
  secondaryButton: {
    minHeight: 48,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: CotopaxiColors.navy,
    paddingHorizontal: Spacing.four,
    borderColor: CotopaxiColors.navy,
    borderWidth: 1,
  },
  buttonPressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.9,
  },
  secondaryButtonPressed: {
    opacity: 0.86,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: CotopaxiColors.text,
    fontSize: 17,
    fontWeight: '800',
  },
  secondaryButtonText: {
    color: CotopaxiColors.white,
    fontSize: 15,
    fontWeight: '600',
  },
  statusContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.four,
    gap: Spacing.three,
  },
  statusMessage: {
    color: CotopaxiColors.secondaryText,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  errorDetails: {
    color: CotopaxiColors.secondaryText,
    fontSize: 14,
    textAlign: 'center',
  },
});


================================================
ðŸ“„ ARCHIVO: src\app\(tabs)\_layout.tsx
================================================

import AppTabs from '@/components/app-tabs';

export default function TabsLayout() {
  return <AppTabs />;
}


================================================
ðŸ“„ ARCHIVO: src\app\explore.tsx
================================================

import { Redirect } from 'expo-router';

export default function ExploreRedirect() {
  return <Redirect href="/settings" />;
}


================================================
ðŸ“„ ARCHIVO: src\app\_layout.tsx
================================================

import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { useEffect } from 'react';
import { Platform, useColorScheme } from 'react-native';

import { PomodoroSettingsProvider } from '@/hooks/use-pomodoro-settings';
import { PomodoroSessionProvider } from '@/hooks/use-pomodoro-session';
import { configureStudyNotifications } from '@/storage/study-notifications';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (Platform.OS === 'web') {
      return;
    }

    void configureStudyNotifications().catch((error: unknown) => {
      console.error(
        'No se pudieron configurar las notificaciones locales.',
        error,
      );
    });
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <PomodoroSettingsProvider>
        <PomodoroSessionProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </PomodoroSessionProvider>
      </PomodoroSettingsProvider>
    </ThemeProvider>
  );
}


================================================
ðŸ“„ ARCHIVO: src\components\animated-icon.tsx
================================================

import { Image } from 'expo-image';
import * as SplashScreen from 'expo-splash-screen';
import { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, { Easing, Keyframe } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

const INITIAL_SCALE_FACTOR = Dimensions.get('screen').height / 90;
const DURATION = 600;

export function AnimatedSplashOverlay() {
  const [animate, setAnimate] = useState(false);
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const splashKeyframe = new Keyframe({
    0: {
      transform: [{ scale: 1 }],
      opacity: 1,
    },
    20: {
      opacity: 1,
    },
    70: {
      opacity: 0,
      easing: Easing.elastic(0.7),
    },
    100: {
      opacity: 0,
      transform: [{ scale: 1 }],
      easing: Easing.elastic(0.7),
    },
  });

  const image = <Image style={styles.image} source={require('@/assets/images/expo-logo.png')} />;

  return animate ? (
    <Animated.View
      entering={splashKeyframe.duration(DURATION).withCallback((finished) => {
        'worklet';
        if (finished) {
          scheduleOnRN(setVisible, false);
        }
      })}
      style={styles.splashOverlay}>
      {image}
    </Animated.View>
  ) : (
    <View
      onLayout={() => {
        SplashScreen.hideAsync().finally(() => {
          setAnimate(true);
        });
      }}
      style={styles.splashOverlay}>
      {image}
    </View>
  );
}

const keyframe = new Keyframe({
  0: {
    transform: [{ scale: INITIAL_SCALE_FACTOR }],
  },
  100: {
    transform: [{ scale: 1 }],
    easing: Easing.elastic(0.7),
  },
});

const logoKeyframe = new Keyframe({
  0: {
    transform: [{ scale: 1.3 }],
    opacity: 0,
  },
  40: {
    transform: [{ scale: 1.3 }],
    opacity: 0,
    easing: Easing.elastic(0.7),
  },
  100: {
    opacity: 1,
    transform: [{ scale: 1 }],
    easing: Easing.elastic(0.7),
  },
});

const glowKeyframe = new Keyframe({
  0: {
    transform: [{ rotateZ: '0deg' }],
  },
  100: {
    transform: [{ rotateZ: '7200deg' }],
  },
});

export function AnimatedIcon() {
  return (
    <View style={styles.iconContainer}>
      <Animated.View entering={glowKeyframe.duration(60 * 1000 * 4)} style={styles.glow}>
        <Image style={styles.glow} source={require('@/assets/images/logo-glow.png')} />
      </Animated.View>

      <Animated.View entering={keyframe.duration(DURATION)} style={styles.background} />
      <Animated.View style={styles.imageContainer} entering={logoKeyframe.duration(DURATION)}>
        <Image style={styles.image} source={require('@/assets/images/expo-logo.png')} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  glow: {
    width: 201,
    height: 201,
    position: 'absolute',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 128,
    height: 128,
    zIndex: 100,
  },
  image: {
    width: 76,
    height: 71,
  },
  background: {
    borderRadius: 40,
    experimental_backgroundImage: `linear-gradient(180deg, #3C9FFE, #0274DF)`,
    width: 128,
    height: 128,
    position: 'absolute',
  },
  splashOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#208AEF',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
});


================================================
ðŸ“„ ARCHIVO: src\components\animated-icon.web.tsx
================================================

import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import Animated, { Keyframe, Easing } from 'react-native-reanimated';

import classes from './animated-icon.module.css';
const DURATION = 300;

export function AnimatedSplashOverlay() {
  return null;
}

const keyframe = new Keyframe({
  0: {
    transform: [{ scale: 0 }],
  },
  60: {
    transform: [{ scale: 1.2 }],
    easing: Easing.elastic(1.2),
  },
  100: {
    transform: [{ scale: 1 }],
    easing: Easing.elastic(1.2),
  },
});

const logoKeyframe = new Keyframe({
  0: {
    opacity: 0,
  },
  60: {
    transform: [{ scale: 1.2 }],
    opacity: 0,
    easing: Easing.elastic(1.2),
  },
  100: {
    transform: [{ scale: 1 }],
    opacity: 1,
    easing: Easing.elastic(1.2),
  },
});

const glowKeyframe = new Keyframe({
  0: {
    transform: [{ rotateZ: '-180deg' }, { scale: 0.8 }],
    opacity: 0,
  },
  [DURATION / 1000]: {
    transform: [{ rotateZ: '0deg' }, { scale: 1 }],
    opacity: 1,
    easing: Easing.elastic(0.7),
  },
  100: {
    transform: [{ rotateZ: '7200deg' }],
  },
});

export function AnimatedIcon() {
  return (
    <View style={styles.iconContainer}>
      <Animated.View entering={glowKeyframe.duration(60 * 1000 * 4)} style={styles.glow}>
        <Image style={styles.glow} source={require('@/assets/images/logo-glow.png')} />
      </Animated.View>

      <Animated.View style={styles.background} entering={keyframe.duration(DURATION)}>
        <div className={classes.expoLogoBackground} />
      </Animated.View>

      <Animated.View style={styles.imageContainer} entering={logoKeyframe.duration(DURATION)}>
        <Image style={styles.image} source={require('@/assets/images/expo-logo.png')} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    zIndex: 1000,
    position: 'absolute',
    top: 128 / 2 + 138,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  glow: {
    width: 201,
    height: 201,
    position: 'absolute',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 128,
    height: 128,
  },
  image: {
    position: 'absolute',
    width: 76,
    height: 71,
  },
  background: {
    width: 128,
    height: 128,
    position: 'absolute',
  },
});


================================================
ðŸ“„ ARCHIVO: src\components\app-tabs.tsx
================================================

import { NativeTabs } from 'expo-router/unstable-native-tabs';

import { CotopaxiColors } from '@/constants/theme';

export default function AppTabs() {
  return (
    <NativeTabs
      backgroundColor={CotopaxiColors.white}
      indicatorColor={CotopaxiColors.gold}
      labelStyle={{
        selected: { color: CotopaxiColors.navy },
      }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Temporizador</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="timer" md="timer" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Label>Ajustes</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="gearshape" md="settings" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}


================================================
ðŸ“„ ARCHIVO: src\components\app-tabs.web.tsx
================================================

import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  type TabTriggerSlotProps,
} from 'expo-router/ui';
import { Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CotopaxiColors, Spacing } from '@/constants/theme';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={styles.tabSlot} />
      <TabList asChild style={styles.tabBar}>
        <SafeAreaView edges={['bottom']} style={styles.tabBar}>
          <TabTrigger name="index" href="/" asChild>
            <TabButton icon="◷">Temporizador</TabButton>
          </TabTrigger>
          <TabTrigger name="settings" href="/settings" asChild>
            <TabButton icon="⚙">Ajustes</TabButton>
          </TabTrigger>
        </SafeAreaView>
      </TabList>
    </Tabs>
  );
}

function TabButton({
  children,
  isFocused,
  icon,
  ...props
}: TabTriggerSlotProps & { icon: string }) {
  return (
    <Pressable
      {...props}
      accessibilityRole="tab"
      accessibilityState={{ selected: isFocused }}
      style={[styles.tabButton, isFocused && styles.selectedTabButton]}>
      <Text style={[styles.tabIcon, isFocused && styles.selectedTabLabel]}>
        {icon}
      </Text>
      <Text style={[styles.tabLabel, isFocused && styles.selectedTabLabel]}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tabSlot: {
    flex: 1,
  },
  tabBar: {
    position: 'absolute',
    bottom: Spacing.two,
    width: '100%',
    maxWidth: 360,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.one,
    padding: Spacing.one,
    borderRadius: 22,
    backgroundColor: CotopaxiColors.white,
    shadowColor: CotopaxiColors.navy,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  tabButton: {
    minHeight: 48,
    minWidth: 148,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    borderRadius: 18,
    paddingHorizontal: Spacing.four,
  },
  selectedTabButton: {
    backgroundColor: CotopaxiColors.background,
  },
  tabIcon: {
    fontSize: 18,
    fontWeight: '700',
  },
  tabLabel: {
    color: CotopaxiColors.secondaryText,
    fontSize: 15,
    fontWeight: '600',
  },
  selectedTabLabel: {
    color: CotopaxiColors.navy,
    fontWeight: '800',
  },
});

================================================
ðŸ“„ ARCHIVO: src\components\external-link.tsx
================================================

import { Href, Link } from 'expo-router';
import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';
import { type ComponentProps } from 'react';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: Href & string };

export function ExternalLink({ href, ...rest }: Props) {
  return (
    <Link
      target="_blank"
      {...rest}
      href={href}
      onPress={async (event) => {
        if (process.env.EXPO_OS !== 'web') {
          // Prevent the default behavior of linking to the default browser on native.
          event.preventDefault();
          // Open the link in an in-app browser.
          await openBrowserAsync(href, {
            presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
          });
        }
      }}
    />
  );
}


================================================
ðŸ“„ ARCHIVO: src\components\hint-row.tsx
================================================

import type { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { Spacing } from '@/constants/theme';

type HintRowProps = {
  title?: string;
  hint?: ReactNode;
};

export function HintRow({ title = 'Try editing', hint = 'app/index.tsx' }: HintRowProps) {
  return (
    <View style={styles.stepRow}>
      <ThemedText type="small">{title}</ThemedText>
      <ThemedView type="backgroundSelected" style={styles.codeSnippet}>
        <ThemedText themeColor="textSecondary">{hint}</ThemedText>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  stepRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  codeSnippet: {
    borderRadius: Spacing.two,
    paddingVertical: Spacing.half,
    paddingHorizontal: Spacing.two,
  },
});


================================================
ðŸ“„ ARCHIVO: src\components\progress-ring.tsx
================================================

import { StyleSheet, Text, View } from 'react-native';

import { CotopaxiColors, Fonts } from '@/constants/theme';

const RING_SIZE = 256;
const TICK_COUNT = 48;
const TICK_WIDTH = 4;
const TICK_HEIGHT = 8;
const TICK_RADIUS = 118;

type ProgressRingProps = {
  accessibilityLabel: string;
  color: string;
  progress: number;
  time: string;
};

export function ProgressRing({
  accessibilityLabel,
  color,
  progress,
  time,
}: ProgressRingProps) {
  const activeTicks = Math.floor(progress * TICK_COUNT);
  const percentage = Math.round(progress * 100);

  return (
    <View
      accessible
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: percentage }}
      style={styles.container}>
      <View style={styles.track} />
      {Array.from({ length: TICK_COUNT }, (_, index) => {
        const angle = (index / TICK_COUNT) * 2 * Math.PI;
        const left =
          RING_SIZE / 2 +
          Math.sin(angle) * TICK_RADIUS -
          TICK_WIDTH / 2;
        const top =
          RING_SIZE / 2 -
          Math.cos(angle) * TICK_RADIUS -
          TICK_HEIGHT / 2;

        return (
          <View
            key={`tick-${index}`}
            accessible={false}
            style={[
              styles.tick,
              { left, top },
              index < activeTicks && { backgroundColor: color },
            ]}
          />
        );
      })}
      <Text
        accessibilityLabel={`Tiempo restante ${time}`}
        adjustsFontSizeToFit
        numberOfLines={1}
        style={styles.time}>
        {time}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: RING_SIZE,
    height: RING_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  track: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: RING_SIZE / 2,
    borderWidth: 7,
    borderColor: CotopaxiColors.border,
  },
  tick: {
    position: 'absolute',
    width: TICK_WIDTH,
    height: TICK_HEIGHT,
    borderRadius: TICK_HEIGHT / 2,
    backgroundColor: CotopaxiColors.border,
  },
  time: {
    width: '88%',
    color: CotopaxiColors.navy,
    fontVariant: ['tabular-nums'],
    fontFamily: Fonts.mono,
    fontSize: 56,
    fontWeight: '800',
    textAlign: 'center',
  },
});


================================================
ðŸ“„ ARCHIVO: src\components\screen-header.tsx
================================================

import { StyleSheet, Text, View } from 'react-native';

import { CotopaxiColors, Spacing } from '@/constants/theme';

type ScreenHeaderProps = {
  badge?: string;
  description?: string;
  title: string;
  variant?: 'default' | 'plain';
};

export function ScreenHeader({
  badge,
  description,
  title,
  variant = 'default',
}: ScreenHeaderProps) {
  return (
    <View style={[styles.header, variant === 'plain' && styles.plainHeader]}>
      <View style={styles.badgeRow}>
        <Text
          style={[
            styles.eyebrow,
            variant === 'plain' && styles.plainEyebrow,
          ]}>
          ACADEMIA COTOPAXI
        </Text>
        {badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        ) : null}
      </View>
      <Text
        accessibilityRole="header"
        style={[styles.title, variant === 'plain' && styles.plainTitle]}>
        {title}
      </Text>
      {description ? (
        <Text
          style={[
            styles.description,
            variant === 'plain' && styles.plainDescription,
          ]}>
          {description}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    borderRadius: 24,
    backgroundColor: CotopaxiColors.navy,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.four,
    gap: Spacing.one,
    borderColor: CotopaxiColors.navy,
    borderTopColor: CotopaxiColors.white,
    borderWidth: 1,
    borderTopWidth: 2,
    shadowColor: CotopaxiColors.navy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
  plainHeader: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingHorizontal: 0,
    paddingVertical: Spacing.one,
    shadowOpacity: 0,
    elevation: 0,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    flexWrap: 'wrap',
  },
  eyebrow: {
    color: CotopaxiColors.white,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.6,
  },
  plainEyebrow: {
    color: CotopaxiColors.secondaryText,
  },
  badge: {
    backgroundColor: CotopaxiColors.gold,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: 8,
  },
  badgeText: {
    color: CotopaxiColors.text,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  title: {
    color: CotopaxiColors.white,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  plainTitle: {
    color: CotopaxiColors.navy,
  },
  description: {
    color: CotopaxiColors.white,
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 22,
  },
  plainDescription: {
    color: CotopaxiColors.secondaryText,
  },
});


================================================
ðŸ“„ ARCHIVO: src\components\themed-text.tsx
================================================

import { Platform, StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'small' | 'smallBold' | 'subtitle' | 'link' | 'linkPrimary' | 'code';
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      style={[
        { color: theme[themeColor ?? 'text'] },
        type === 'default' && styles.default,
        type === 'title' && styles.title,
        type === 'small' && styles.small,
        type === 'smallBold' && styles.smallBold,
        type === 'subtitle' && styles.subtitle,
        type === 'link' && styles.link,
        type === 'linkPrimary' && styles.linkPrimary,
        type === 'code' && styles.code,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  small: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 500,
  },
  smallBold: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 700,
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 500,
  },
  title: {
    fontSize: 48,
    fontWeight: 600,
    lineHeight: 52,
  },
  subtitle: {
    fontSize: 32,
    lineHeight: 44,
    fontWeight: 600,
  },
  link: {
    lineHeight: 30,
    fontSize: 14,
  },
  linkPrimary: {
    lineHeight: 30,
    fontSize: 14,
    color: '#3c87f7',
  },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: 700 }) ?? 500,
    fontSize: 12,
  },
});


================================================
ðŸ“„ ARCHIVO: src\components\themed-view.tsx
================================================

import { View, type ViewProps } from 'react-native';

import { ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  type?: ThemeColor;
};

export function ThemedView({ style, lightColor, darkColor, type, ...otherProps }: ThemedViewProps) {
  const theme = useTheme();

  return <View style={[{ backgroundColor: theme[type ?? 'background'] }, style]} {...otherProps} />;
}


================================================
ðŸ“„ ARCHIVO: src\components\ui\collapsible.tsx
================================================

import { SymbolView } from 'expo-symbols';
import { PropsWithChildren, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  return (
    <ThemedView>
      <Pressable
        style={({ pressed }) => [styles.heading, pressed && styles.pressedHeading]}
        onPress={() => setIsOpen((value) => !value)}>
        <ThemedView type="backgroundElement" style={styles.button}>
          <SymbolView
            name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
            size={14}
            weight="bold"
            tintColor={theme.text}
            style={{ transform: [{ rotate: isOpen ? '-90deg' : '90deg' }] }}
          />
        </ThemedView>

        <ThemedText type="small">{title}</ThemedText>
      </Pressable>
      {isOpen && (
        <Animated.View entering={FadeIn.duration(200)}>
          <ThemedView type="backgroundElement" style={styles.content}>
            {children}
          </ThemedView>
        </Animated.View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  pressedHeading: {
    opacity: 0.7,
  },
  button: {
    width: Spacing.four,
    height: Spacing.four,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    marginTop: Spacing.three,
    borderRadius: Spacing.three,
    marginLeft: Spacing.four,
    padding: Spacing.four,
  },
});


================================================
ðŸ“„ ARCHIVO: src\components\web-badge.tsx
================================================

import { version } from 'expo/package.json';
import { Image } from 'expo-image';
import { useColorScheme, StyleSheet } from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { Spacing } from '@/constants/theme';

export function WebBadge() {
  const scheme = useColorScheme();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="code" themeColor="textSecondary" style={styles.versionText}>
        v{version}
      </ThemedText>
      <Image
        source={
          scheme === 'dark'
            ? require('@/assets/images/expo-badge-white.png')
            : require('@/assets/images/expo-badge.png')
        }
        style={styles.badgeImage}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.five,
    alignItems: 'center',
    gap: Spacing.two,
  },
  versionText: {
    textAlign: 'center',
  },
  badgeImage: {
    width: 123,
    aspectRatio: 123 / 24,
  },
});


================================================
ðŸ“„ ARCHIVO: src\constants\theme.ts
================================================

/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
  },
} as const;

export const CotopaxiColors = {
  navy: '#0A1931',
  white: '#FFFFFF',
  gold: '#E6B800',
  text: '#111111',
  destructive: '#DC2626',
  success: '#10B981',
  background: '#F9FAFB',
  secondaryText: '#4B5563',
  border: '#E5E7EB',
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;


================================================
ðŸ“„ ARCHIVO: src\domain\pomodoro-session.ts
================================================

import { formatRemainingTime } from "./study-timer";
import type { PomodoroSettings } from "./pomodoro-settings";

export type PomodoroPhase = "study" | "shortBreak" | "longBreak";

type PomodoroSessionProgress = {
  phase: PomodoroPhase;
  initialDurationMs: number;
  completedPomodoros: number;
  cycleTarget: number;
};

export type ReadyPomodoroSession = PomodoroSessionProgress & {
  status: "ready";
  remainingMs: number;
  lastCompletedPhase: PomodoroPhase | null;
};

export type RunningPomodoroSession = PomodoroSessionProgress & {
  status: "running";
  endsAt: number;
};

export type PausedPomodoroSession = PomodoroSessionProgress & {
  status: "paused";
  remainingMs: number;
};

export type PomodoroSession =
  | ReadyPomodoroSession
  | RunningPomodoroSession
  | PausedPomodoroSession;

export function getPhaseDurationMs(
  phase: PomodoroPhase,
  settings: PomodoroSettings,
): number {
  const minutes = {
    study: settings.studyDurationMinutes,
    shortBreak: settings.shortBreakDurationMinutes,
    longBreak: settings.longBreakDurationMinutes,
  }[phase];

  return minutes * 60_000;
}

export function createPomodoroSession(
  settings: PomodoroSettings,
): ReadyPomodoroSession {
  const initialDurationMs = getPhaseDurationMs("study", settings);

  return {
    status: "ready",
    phase: "study",
    initialDurationMs,
    remainingMs: initialDurationMs,
    completedPomodoros: 0,
    cycleTarget: settings.pomodorosBeforeLongBreak,
    lastCompletedPhase: null,
  };
}

export function updateReadyPhaseDuration(
  session: ReadyPomodoroSession,
  settings: PomodoroSettings,
): ReadyPomodoroSession {
  const initialDurationMs = getPhaseDurationMs(session.phase, settings);

  return {
    ...session,
    initialDurationMs,
    remainingMs: initialDurationMs,
  };
}

export function getPomodoroRemainingTime(
  session: PomodoroSession,
  nowMs: number,
): number {
  if (session.status === "running") {
    return Math.max(0, session.endsAt - nowMs);
  }

  return session.remainingMs;
}

export function formatPomodoroRemainingTime(
  session: PomodoroSession,
  nowMs: number,
): string {
  return formatRemainingTime(getPomodoroRemainingTime(session, nowMs));
}

export function startPomodoroSession(
  session: ReadyPomodoroSession,
  startedAtMs: number,
): RunningPomodoroSession {
  return {
    status: "running",
    phase: session.phase,
    initialDurationMs: session.initialDurationMs,
    endsAt: startedAtMs + session.remainingMs,
    completedPomodoros: session.completedPomodoros,
    cycleTarget: session.cycleTarget,
  };
}

export function pausePomodoroSession(
  session: RunningPomodoroSession,
  pausedAtMs: number,
): PausedPomodoroSession {
  return {
    status: "paused",
    phase: session.phase,
    initialDurationMs: session.initialDurationMs,
    remainingMs: getPomodoroRemainingTime(session, pausedAtMs),
    completedPomodoros: session.completedPomodoros,
    cycleTarget: session.cycleTarget,
  };
}

export function resumePomodoroSession(
  session: PausedPomodoroSession,
  resumedAtMs: number,
): RunningPomodoroSession {
  return {
    status: "running",
    phase: session.phase,
    initialDurationMs: session.initialDurationMs,
    endsAt: resumedAtMs + session.remainingMs,
    completedPomodoros: session.completedPomodoros,
    cycleTarget: session.cycleTarget,
  };
}

export function restartPomodoroSession(
  session: PomodoroSession,
  restartedAtMs: number,
): PomodoroSession {
  if (session.status === "running") {
    return {
      ...session,
      endsAt: restartedAtMs + session.initialDurationMs,
    };
  }

  return {
    ...session,
    remainingMs: session.initialDurationMs,
  };
}

export function advancePomodoroSession(
  session: PomodoroSession,
  nowMs: number,
  settings: PomodoroSettings,
): PomodoroSession {
  if (session.status !== "running" || nowMs < session.endsAt) {
    return session;
  }

  let nextPhase: PomodoroPhase;
  let completedPomodoros = session.completedPomodoros;
  let cycleTarget = session.cycleTarget;

  if (session.phase === "study") {
    completedPomodoros += 1;
    if (completedPomodoros >= session.cycleTarget) {
      nextPhase = "longBreak";
      completedPomodoros = 0;
    } else {
      nextPhase = "shortBreak";
    }
  } else {
    nextPhase = "study";
    if (session.phase === "longBreak") {
      cycleTarget = settings.pomodorosBeforeLongBreak;
      completedPomodoros = 0;
    }
  }

  const initialDurationMs = getPhaseDurationMs(nextPhase, settings);

  return {
    status: "ready",
    phase: nextPhase,
    initialDurationMs,
    remainingMs: initialDurationMs,
    completedPomodoros,
    cycleTarget,
    lastCompletedPhase: session.phase,
  };
}

export function isPomodoroSessionRunning(
  session: PomodoroSession,
): session is RunningPomodoroSession {
  return session.status === "running";
}


================================================
ðŸ“„ ARCHIVO: src\domain\pomodoro-settings.ts
================================================

export type PomodoroSettings = {
  studyDurationMinutes: number;
  shortBreakDurationMinutes: number;
  longBreakDurationMinutes: number;
  pomodorosBeforeLongBreak: number;
};

export type PomodoroSettingsInput = Record<
  keyof PomodoroSettings,
  string
>;

export type PomodoroSettingsFieldError =
  | "required"
  | "integer"
  | "outOfRange";

export type PomodoroSettingsValidation =
  | { valid: true; value: PomodoroSettings }
  | {
      valid: false;
      errors: Partial<Record<keyof PomodoroSettings, PomodoroSettingsFieldError>>;
    };

export const DEFAULT_POMODORO_SETTINGS: Readonly<PomodoroSettings> =
  Object.freeze({
    studyDurationMinutes: 25,
    shortBreakDurationMinutes: 5,
    longBreakDurationMinutes: 15,
    pomodorosBeforeLongBreak: 4,
  });

const POMODORO_COUNT_FIELD: keyof PomodoroSettings =
  "pomodorosBeforeLongBreak";

export function validatePomodoroSettings(
  input: PomodoroSettingsInput,
): PomodoroSettingsValidation {
  const value: PomodoroSettings = {
    ...DEFAULT_POMODORO_SETTINGS,
  };
  const errors: Partial<
    Record<keyof PomodoroSettings, PomodoroSettingsFieldError>
  > = {};

  for (const field of Object.keys(value) as (keyof PomodoroSettings)[]) {
    const rawValue = input[field].trim();

    if (rawValue.length === 0) {
      errors[field] = "required";
      continue;
    }

    if (!/^\d+$/.test(rawValue)) {
      errors[field] = "integer";
      continue;
    }

    const numericValue = Number(rawValue);
    const maximum = field === POMODORO_COUNT_FIELD ? 12 : 120;

    if (numericValue < 1 || numericValue > maximum) {
      errors[field] = "outOfRange";
      continue;
    }

    value[field] = numericValue;
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return { valid: true, value };
}


================================================
ðŸ“„ ARCHIVO: src\domain\study-timer.ts
================================================

export type RunningStudyTimerState = {
  status: "running";
  initialDurationMs: number;
  targetEndTime: number;
};

export type PausedStudyTimerState = {
  status: "paused";
  initialDurationMs: number;
  remainingMs: number;
};

export type StudyTimerState =
  | RunningStudyTimerState
  | PausedStudyTimerState;

export function startStudyTimer(
  initialDurationMs: number,
  startedAtMs: number,
): RunningStudyTimerState {
  return {
    status: "running",
    initialDurationMs,
    targetEndTime: startedAtMs + initialDurationMs,
  };
}

export function getRemainingTime(
  timer: StudyTimerState,
  nowMs: number,
): number {
  if (timer.status === "paused") {
    return timer.remainingMs;
  }

  return Math.max(0, timer.targetEndTime - nowMs);
}

export function pauseStudyTimer(
  timer: RunningStudyTimerState,
  pausedAtMs: number,
): PausedStudyTimerState {
  return {
    status: "paused",
    initialDurationMs: timer.initialDurationMs,
    remainingMs: getRemainingTime(timer, pausedAtMs),
  };
}

export function resumeStudyTimer(
  timer: PausedStudyTimerState,
  resumedAtMs: number,
): RunningStudyTimerState {
  return {
    status: "running",
    initialDurationMs: timer.initialDurationMs,
    targetEndTime: resumedAtMs + timer.remainingMs,
  };
}

export function restartStudyTimer(
  timer: StudyTimerState,
  restartedAtMs: number,
): StudyTimerState {
  if (timer.status === "paused") {
    return {
      status: "paused",
      initialDurationMs: timer.initialDurationMs,
      remainingMs: timer.initialDurationMs,
    };
  }

  return {
    status: "running",
    initialDurationMs: timer.initialDurationMs,
    targetEndTime: restartedAtMs + timer.initialDurationMs,
  };
}

export function formatRemainingTime(remainingMs: number): string {
  const totalSeconds = Math.ceil(Math.max(0, remainingMs) / 1_000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}


================================================
ðŸ“„ ARCHIVO: src\hooks\use-color-scheme.ts
================================================

export { useColorScheme } from 'react-native';


================================================
ðŸ“„ ARCHIVO: src\hooks\use-color-scheme.web.ts
================================================

import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const colorScheme = useRNColorScheme();

  if (hasHydrated) {
    return colorScheme;
  }

  return 'light';
}


================================================
ðŸ“„ ARCHIVO: src\hooks\use-pomodoro-session.tsx
================================================

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { AppState } from "react-native";

import {
  advancePomodoroSession,
  createPomodoroSession,
  formatPomodoroRemainingTime,
  getPomodoroRemainingTime,
  pausePomodoroSession,
  restartPomodoroSession,
  resumePomodoroSession,
  startPomodoroSession,
  updateReadyPhaseDuration,
  type PomodoroSession,
} from "../domain/pomodoro-session";
import {
  addStudyNotificationResponseListener,
  cancelStudyEndNotification,
  getStudyNotificationPermission,
  requestStudyNotificationPermission,
  scheduleStudyEndNotification,
} from "../storage/study-notifications";
import {
  loadStudySession,
  saveStudySession,
} from "../storage/study-session-storage";
import { usePomodoroSettings } from "./use-pomodoro-settings";

export type PomodoroSessionStatus = "loading" | "ready" | "error";

export type PomodoroSessionContextValue = {
  status: PomodoroSessionStatus;
  session: PomodoroSession | null;
  remainingMs: number;
  formattedRemainingTime: string;
  notificationPermissionGranted: boolean | null;
  notificationError: Error | null;
  error: Error | null;
  start: (notificationsEnabled?: boolean) => Promise<void>;
  pause: () => Promise<void>;
  resume: () => Promise<void>;
  restart: () => Promise<void>;
  requestPermission: () => Promise<boolean>;
};

const PomodoroSessionContext =
  createContext<PomodoroSessionContextValue | null>(null);

function toError(error: unknown): Error {
  if (error instanceof Error) {
    return error;
  }

  return new Error(
    typeof error === "string"
      ? error
      : "Ocurrió un error al restaurar o guardar la sesión.",
  );
}

export function PomodoroSessionProvider({
  children,
}: PropsWithChildren) {
  const {
    settings,
    status: settingsStatus,
    error: settingsError,
  } = usePomodoroSettings();
  const [session, setSession] = useState<PomodoroSession | null>(null);
  const [status, setStatus] = useState<PomodoroSessionStatus>("loading");
  const [nowMs, setNowMs] = useState(() => Date.now());
  const [error, setError] = useState<Error | null>(null);
  const [notificationError, setNotificationError] = useState<Error | null>(
    null,
  );
  const [notificationPermissionGranted, setNotificationPermissionGranted] =
    useState<boolean | null>(null);

  const persistSession = useCallback(
    async (
      nextSession: PomodoroSession,
      previousSession: PomodoroSession | null,
      notificationsEnabled = notificationPermissionGranted,
    ) => {
      setError(null);

      const phaseCompleted =
        previousSession?.status === "running" &&
        nextSession.status === "ready" &&
        nextSession.lastCompletedPhase === previousSession.phase;

      if (!phaseCompleted) {
        try {
          await cancelStudyEndNotification();
        } catch (cancelError: unknown) {
          setNotificationError(toError(cancelError));
        }
      }

      try {
        await saveStudySession(nextSession);
      } catch (saveError: unknown) {
        const visibleError = toError(saveError);
        setError(visibleError);

        if (
          previousSession?.status === "running" &&
          notificationsEnabled &&
          !phaseCompleted
        ) {
          try {
            await scheduleStudyEndNotification(
              previousSession.phase,
              previousSession.endsAt,
            );
          } catch (scheduleError: unknown) {
            setNotificationError(toError(scheduleError));
          }
        }

        return false;
      }

      setSession(nextSession);
      setNowMs(Date.now());
      setStatus("ready");
      setError(null);

      if (phaseCompleted) {
        return true;
      }

      if (nextSession.status === "running") {
        if (notificationsEnabled) {
          try {
            await scheduleStudyEndNotification(
              nextSession.phase,
              nextSession.endsAt,
            );
            setNotificationError(null);
          } catch (scheduleError: unknown) {
            setNotificationError(toError(scheduleError));
          }
        }
      } else {
        setNotificationError(null);
      }

      return true;
    },
    [notificationPermissionGranted],
  );

  useEffect(() => {
    if (settingsStatus === "error") {
      setError(settingsError);
      setStatus("error");
      return;
    }

    if (settingsStatus !== "ready") {
      return;
    }

    let isMounted = true;

    async function restoreSession() {
      let storedSession: PomodoroSession | null;
      try {
        storedSession = await loadStudySession();
      } catch (loadError: unknown) {
        if (isMounted) {
          setError(toError(loadError));
          setStatus("error");
        }
        return;
      }

      let permissionGranted = false;
      let permissionError: Error | null = null;
      try {
        permissionGranted = await getStudyNotificationPermission();
      } catch (checkError: unknown) {
        permissionError = toError(checkError);
      }

      if (!isMounted) {
        return;
      }

      setNotificationPermissionGranted(permissionGranted);
      setNotificationError(permissionError);
      const now = Date.now();
      let restored = storedSession ?? createPomodoroSession(settings);
      restored = advancePomodoroSession(restored, now, settings);

      if (restored.status === "ready") {
        const updatedReady = updateReadyPhaseDuration(restored, settings);
        restored = {
          ...updatedReady,
          cycleTarget:
            updatedReady.phase === "study" &&
            updatedReady.completedPomodoros === 0
              ? settings.pomodorosBeforeLongBreak
              : updatedReady.cycleTarget,
        };
      }

      setSession(restored);
      setNowMs(now);
      setStatus("ready");

      if (storedSession === null || restored !== storedSession) {
        try {
          await saveStudySession(restored);
          if (isMounted) {
            setError(null);
          }
        } catch (saveError: unknown) {
          if (isMounted) {
            setError(toError(saveError));
          }
        }
      }

      try {
        if (restored.status === "running" && permissionGranted) {
          await scheduleStudyEndNotification(restored.phase, restored.endsAt);
        } else {
          await cancelStudyEndNotification();
        }
      } catch (notificationFailure: unknown) {
        if (isMounted) {
          setNotificationError(toError(notificationFailure));
        }
      }
    }

    void restoreSession();
    return () => {
      isMounted = false;
    };
  }, [settings, settingsError, settingsStatus]);

  const requestPermission = useCallback(async () => {
    try {
      const granted = await requestStudyNotificationPermission();
      setNotificationPermissionGranted(granted);
      setNotificationError(null);
      return granted;
    } catch (permissionError: unknown) {
      setNotificationPermissionGranted(false);
      setNotificationError(toError(permissionError));
      return false;
    }
  }, []);

  const start = useCallback(async (notificationsEnabled?: boolean) => {
    if (session?.status !== "ready") {
      return;
    }

    const startedAt = Date.now();
    const readyWithCurrentSettings = updateReadyPhaseDuration(
      session,
      settings,
    );
    const currentCycleTarget =
      readyWithCurrentSettings.phase === "study" &&
      readyWithCurrentSettings.completedPomodoros === 0
        ? settings.pomodorosBeforeLongBreak
        : readyWithCurrentSettings.cycleTarget;
    const nextSession = startPomodoroSession(
      { ...readyWithCurrentSettings, cycleTarget: currentCycleTarget },
      startedAt,
    );
    await persistSession(
      nextSession,
      session,
      notificationsEnabled ?? notificationPermissionGranted ?? false,
    );
  }, [notificationPermissionGranted, persistSession, session, settings]);

  const pause = useCallback(async () => {
    if (session?.status !== "running") {
      return;
    }

    const pausedAt = Date.now();
    const nextSession = pausePomodoroSession(session, pausedAt);
    await persistSession(nextSession, session);
  }, [persistSession, session]);

  const resume = useCallback(async () => {
    if (session?.status !== "paused") {
      return;
    }

    const resumedAt = Date.now();
    const nextSession = resumePomodoroSession(session, resumedAt);
    await persistSession(nextSession, session);
  }, [persistSession, session]);

  const restart = useCallback(async () => {
    if (session === null || session.status === "ready") {
      return;
    }

    const restartedAt = Date.now();
    const nextSession = restartPomodoroSession(session, restartedAt);
    await persistSession(nextSession, session);
  }, [persistSession, session]);

  useEffect(() => {
    if (status !== "ready" || session?.status !== "ready") {
      return;
    }

    const updatedReady = updateReadyPhaseDuration(session, settings);
    const nextCycleTarget =
      updatedReady.phase === "study" &&
      updatedReady.completedPomodoros === 0
        ? settings.pomodorosBeforeLongBreak
        : updatedReady.cycleTarget;
    if (
      session.initialDurationMs === updatedReady.initialDurationMs &&
      session.cycleTarget === nextCycleTarget
    ) {
      return;
    }

    void persistSession(
      { ...updatedReady, cycleTarget: nextCycleTarget },
      session,
    );
  }, [persistSession, session, settings, status]);

  useEffect(() => {
    if (status !== "ready" || session?.status !== "running") {
      return;
    }

    const intervalId = setInterval(() => {
      const now = Date.now();
      const nextSession = advancePomodoroSession(session, now, settings);

      if (nextSession !== session) {
        void persistSession(nextSession, session);
      } else {
        setNowMs(now);
      }
    }, 1_000);

    return () => clearInterval(intervalId);
  }, [persistSession, session, settings, status]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        const now = Date.now();
        setNowMs(now);
        if (session?.status === "running") {
          const nextSession = advancePomodoroSession(session, now, settings);
          if (nextSession !== session) {
            void persistSession(nextSession, session);
          }
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, [persistSession, session, settings]);

  useEffect(() => {
    const unsubscribe =
      typeof addStudyNotificationResponseListener === "function"
        ? addStudyNotificationResponseListener(() => {
            const now = Date.now();
            setNowMs(now);
            if (session?.status === "running") {
              const nextSession = advancePomodoroSession(session, now, settings);
              if (nextSession !== session) {
                void persistSession(nextSession, session);
              }
            }
          })
        : null;

    return () => {
      unsubscribe?.();
    };
  }, [persistSession, session, settings]);

  const remainingMs =
    session === null ? 0 : getPomodoroRemainingTime(session, nowMs);

  return (
    <PomodoroSessionContext.Provider
      value={{
        status,
        session,
        remainingMs,
        formattedRemainingTime:
          session === null
            ? "00:00"
            : formatPomodoroRemainingTime(session, nowMs),
        notificationPermissionGranted,
        notificationError,
        error,
        start,
        pause,
        resume,
        restart,
        requestPermission,
      }}>
      {children}
    </PomodoroSessionContext.Provider>
  );
}

export function usePomodoroSession(): PomodoroSessionContextValue {
  const context = useContext(PomodoroSessionContext);
  if (context === null) {
    throw new Error(
      "usePomodoroSession debe usarse dentro de PomodoroSessionProvider.",
    );
  }

  return context;
}


================================================
ðŸ“„ ARCHIVO: src\hooks\use-pomodoro-settings.tsx
================================================

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

import {
  DEFAULT_POMODORO_SETTINGS,
  type PomodoroSettings,
} from "../domain/pomodoro-settings";
import {
  loadPomodoroSettings,
  savePomodoroSettings,
} from "../storage/pomodoro-settings-storage";

export type PomodoroSettingsStatus = "loading" | "ready" | "error";

export type PomodoroSettingsContextValue = {
  settings: PomodoroSettings;
  status: PomodoroSettingsStatus;
  error: Error | null;
  saveSettings: (settings: PomodoroSettings) => Promise<void>;
};

const PomodoroSettingsContext =
  createContext<PomodoroSettingsContextValue | null>(null);

function toError(error: unknown): Error {
  if (error instanceof Error) {
    return error;
  }

  return new Error(
    typeof error === "string"
      ? error
      : "No se pudieron cargar o guardar los ajustes.",
  );
}

export function PomodoroSettingsProvider({
  children,
}: PropsWithChildren) {
  const [settings, setSettings] = useState<PomodoroSettings>(() => ({
    ...DEFAULT_POMODORO_SETTINGS,
  }));
  const [status, setStatus] = useState<PomodoroSettingsStatus>("loading");
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    loadPomodoroSettings().then(
      (loadedSettings) => {
        if (!isMounted) {
          return;
        }

        setSettings(loadedSettings);
        setStatus("ready");
      },
      (loadError: unknown) => {
        if (!isMounted) {
          return;
        }

        setError(toError(loadError));
        setStatus("error");
      },
    );

    return () => {
      isMounted = false;
    };
  }, []);

  const updateSettings = useCallback(
    async (nextSettings: PomodoroSettings) => {
      if (status !== "ready") {
        throw new Error("Los ajustes todavía no están disponibles.");
      }

      if (error !== null) {
        setError(null);
      }

      try {
        await savePomodoroSettings(nextSettings);
      } catch (saveError: unknown) {
        const visibleError = toError(saveError);
        setError(visibleError);
        throw visibleError;
      }

      setSettings(nextSettings);
    },
    [error, status],
  );

  return (
    <PomodoroSettingsContext.Provider
      value={{ settings, status, error, saveSettings: updateSettings }}>
      {children}
    </PomodoroSettingsContext.Provider>
  );
}

export function usePomodoroSettings(): PomodoroSettingsContextValue {
  const context = useContext(PomodoroSettingsContext);

  if (context === null) {
    throw new Error(
      "usePomodoroSettings debe usarse dentro de PomodoroSettingsProvider.",
    );
  }

  return context;
}


================================================
ðŸ“„ ARCHIVO: src\hooks\use-study-timer.ts
================================================

import { useCallback, useEffect, useState } from "react";

import {
  formatRemainingTime,
  getRemainingTime,
  pauseStudyTimer,
  restartStudyTimer,
  resumeStudyTimer,
  startStudyTimer,
  type StudyTimerState,
} from "../domain/study-timer";

export function useStudyTimer(initialDurationMs: number) {
  const [timer, setTimer] = useState<StudyTimerState | null>(null);
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    if (timer?.status !== "running") {
      return;
    }

    const intervalId = setInterval(() => {
      setNowMs(Date.now());
    }, 1_000);

    return () => clearInterval(intervalId);
  }, [timer?.status]);

  const start = useCallback(() => {
    if (timer !== null) {
      return;
    }

    const startedAtMs = Date.now();
    setNowMs(startedAtMs);
    setTimer(startStudyTimer(initialDurationMs, startedAtMs));
  }, [initialDurationMs, timer]);

  const pause = useCallback(() => {
    if (timer?.status !== "running") {
      return;
    }

    const pausedAtMs = Date.now();
    setNowMs(pausedAtMs);
    setTimer(pauseStudyTimer(timer, pausedAtMs));
  }, [timer]);

  const resume = useCallback(() => {
    if (timer?.status !== "paused") {
      return;
    }

    const resumedAtMs = Date.now();
    setNowMs(resumedAtMs);
    setTimer(resumeStudyTimer(timer, resumedAtMs));
  }, [timer]);

  const restart = useCallback(() => {
    if (timer === null) {
      return;
    }

    const restartedAtMs = Date.now();
    setNowMs(restartedAtMs);
    setTimer(restartStudyTimer(timer, restartedAtMs));
  }, [timer]);

  const remainingMs =
    timer === null
      ? initialDurationMs
      : getRemainingTime(timer, nowMs);

  return {
    status: timer?.status ?? "idle",
    remainingMs,
    formattedRemainingTime: formatRemainingTime(remainingMs),
    start,
    pause,
    resume,
    restart,
  } as const;
}


================================================
ðŸ“„ ARCHIVO: src\hooks\use-theme.ts
================================================

/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useTheme() {
  const scheme = useColorScheme();
  const theme = scheme === 'unspecified' ? 'light' : scheme;

  return Colors[theme];
}


================================================
ðŸ“„ ARCHIVO: src\storage\pomodoro-settings-storage.ts
================================================

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  DEFAULT_POMODORO_SETTINGS,
  validatePomodoroSettings,
  type PomodoroSettings,
} from "../domain/pomodoro-settings";

const POMODORO_SETTINGS_STORAGE_KEY = "@cotopaxi/pomodoro-settings";

export async function loadPomodoroSettings(): Promise<PomodoroSettings> {
  const serializedSettings = await AsyncStorage.getItem(
    POMODORO_SETTINGS_STORAGE_KEY,
  );

  if (serializedSettings === null) {
    return { ...DEFAULT_POMODORO_SETTINGS };
  }

  const storedValue: unknown = JSON.parse(serializedSettings);

  if (
    typeof storedValue !== "object" ||
    storedValue === null ||
    Array.isArray(storedValue) ||
    !("studyDurationMinutes" in storedValue) ||
    !("shortBreakDurationMinutes" in storedValue) ||
    !("longBreakDurationMinutes" in storedValue) ||
    !("pomodorosBeforeLongBreak" in storedValue) ||
    typeof storedValue.studyDurationMinutes !== "number" ||
    typeof storedValue.shortBreakDurationMinutes !== "number" ||
    typeof storedValue.longBreakDurationMinutes !== "number" ||
    typeof storedValue.pomodorosBeforeLongBreak !== "number"
  ) {
    throw new Error("Stored pomodoro settings have an invalid format.");
  }

  const validation = validatePomodoroSettings({
    studyDurationMinutes: String(storedValue.studyDurationMinutes),
    shortBreakDurationMinutes: String(storedValue.shortBreakDurationMinutes),
    longBreakDurationMinutes: String(storedValue.longBreakDurationMinutes),
    pomodorosBeforeLongBreak: String(
      storedValue.pomodorosBeforeLongBreak,
    ),
  });

  if (!validation.valid) {
    throw new Error("Stored pomodoro settings contain invalid values.");
  }

  return validation.value;
}

export async function savePomodoroSettings(
  settings: PomodoroSettings,
): Promise<void> {
  const validation = validatePomodoroSettings({
    studyDurationMinutes: String(settings.studyDurationMinutes),
    shortBreakDurationMinutes: String(settings.shortBreakDurationMinutes),
    longBreakDurationMinutes: String(settings.longBreakDurationMinutes),
    pomodorosBeforeLongBreak: String(settings.pomodorosBeforeLongBreak),
  });

  if (!validation.valid) {
    throw new Error("Cannot save invalid pomodoro settings.");
  }

  await AsyncStorage.setItem(
    POMODORO_SETTINGS_STORAGE_KEY,
    JSON.stringify(validation.value),
  );
}


================================================
ðŸ“„ ARCHIVO: src\storage\study-notifications.ts
================================================

import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { Platform } from "react-native";

import type { PomodoroPhase } from "../domain/pomodoro-session";

type NotificationsModule = typeof import("expo-notifications");
type NotificationPermissionsStatus =
  import("expo-notifications").NotificationPermissionsStatus;

const STUDY_END_NOTIFICATION_ID_KEY = "@cotopaxi/study-end-notification-id";
const STUDY_NOTIFICATION_CHANNEL_ID = "default";
const STUDY_NOTIFICATION_VIBRATION_PATTERN = [0, 250, 250, 250];
let notificationsModulePromise: Promise<NotificationsModule | null> | null =
  null;

const phaseMessages: Record<PomodoroPhase, { title: string; body: string }> = {
  study: {
    title: "Tiempo de estudio terminado",
    body: "Tu tiempo de estudio terminó. Puedes iniciar un descanso.",
  },
  shortBreak: {
    title: "Descanso corto terminado",
    body: "Tu descanso corto terminó. Puedes volver al estudio.",
  },
  longBreak: {
    title: "Descanso largo terminado",
    body: "Tu descanso largo terminó. Puedes volver al estudio.",
  },
};

function loadNotificationsModule(): Promise<NotificationsModule | null> {
  if (Constants.appOwnership === "expo") {
    return Promise.resolve(null);
  }

  notificationsModulePromise ??= Promise.resolve()
    .then(() => {
      const notifications: NotificationsModule = require("expo-notifications");
      notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldShowBanner: true,
          shouldShowList: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
          shouldVibrate: true,
          priority: notifications.AndroidNotificationPriority.MAX,
        }),
      });
      return notifications;
    })
    .catch((error: unknown) => {
      notificationsModulePromise = null;
      const detail = error instanceof Error ? ` (${error.message})` : "";
      throw new Error(
        `Las notificaciones no están disponibles en esta versión de Expo Go. El temporizador seguirá funcionando sin avisos.${detail}`,
      );
    });

  return notificationsModulePromise;
}

async function configureAndroidChannel(
  notifications: NotificationsModule,
): Promise<void> {
  if (Platform.OS !== "android") {
    return;
  }

  await notifications.setNotificationChannelAsync(
    STUDY_NOTIFICATION_CHANNEL_ID,
    {
      name: "Pomodoro Notifications",
      importance: notifications.AndroidImportance.HIGH,
      vibrationPattern: STUDY_NOTIFICATION_VIBRATION_PATTERN,
      sound: "default",
    },
  );
}

export async function configureStudyNotifications(): Promise<void> {
  const notifications = await loadNotificationsModule();
  if (notifications === null) {
    return;
  }

  await configureAndroidChannel(notifications);
}

function hasNotificationPermission(
  permissions: NotificationPermissionsStatus,
): boolean {
  return permissions.granted;
}

export async function getStudyNotificationPermission(): Promise<boolean> {
  const notifications = await loadNotificationsModule();
  if (notifications === null) {
    return false;
  }

  await configureAndroidChannel(notifications);
  const permissions = await notifications.getPermissionsAsync();
  return hasNotificationPermission(permissions);
}

export async function requestStudyNotificationPermission(): Promise<boolean> {
  const notifications = await loadNotificationsModule();
  if (notifications === null) {
    return false;
  }

  await configureAndroidChannel(notifications);
  const currentPermissions = await notifications.getPermissionsAsync();

  if (hasNotificationPermission(currentPermissions)) {
    return true;
  }

  if (!currentPermissions.canAskAgain) {
    return false;
  }

  const requestedPermissions = await notifications.requestPermissionsAsync();
  return hasNotificationPermission(requestedPermissions);
}

export async function cancelStudyEndNotification(): Promise<void> {
  const notificationId = await AsyncStorage.getItem(
    STUDY_END_NOTIFICATION_ID_KEY,
  );

  if (notificationId === null) {
    return;
  }

  const notifications = await loadNotificationsModule();
  if (notifications === null) {
    return;
  }

  await notifications.cancelScheduledNotificationAsync(notificationId);
  await AsyncStorage.removeItem(STUDY_END_NOTIFICATION_ID_KEY);
}

export async function scheduleStudyEndNotification(
  phase: PomodoroPhase,
  endsAt: number,
): Promise<void> {
  await cancelStudyEndNotification();

  if (endsAt <= Date.now()) {
    return;
  }

  const notifications = await loadNotificationsModule();
  if (notifications === null) {
    return;
  }

  await configureAndroidChannel(notifications);
  await notifications.cancelAllScheduledNotificationsAsync();
  const message = phaseMessages[phase];
  const notificationId = await notifications.scheduleNotificationAsync({
    content: {
      title: message.title,
      body: message.body,
      data: { phase },
      sound: "default",
      vibrate: STUDY_NOTIFICATION_VIBRATION_PATTERN,
      priority: notifications.AndroidNotificationPriority.MAX,
    },
    trigger: {
      type: notifications.SchedulableTriggerInputTypes.DATE,
      date: new Date(endsAt),
      ...(Platform.OS === "android"
        ? { channelId: STUDY_NOTIFICATION_CHANNEL_ID }
        : {}),
    },
  });

  try {
    await AsyncStorage.setItem(
      STUDY_END_NOTIFICATION_ID_KEY,
      notificationId,
    );
  } catch (error: unknown) {
    await notifications.cancelScheduledNotificationAsync(notificationId);
    throw error;
  }
}

export async function notifyStudyPhaseCompleted(): Promise<void> {
  const notifications = await loadNotificationsModule();
  if (notifications === null) {
    return;
  }

  await configureAndroidChannel(notifications);
  await notifications.cancelAllScheduledNotificationsAsync();
  await notifications.scheduleNotificationAsync({
    content: {
      title: "¡Tiempo finalizado!",
      body: "Tu sesión ha concluido.",
      sound: true,
      vibrate: STUDY_NOTIFICATION_VIBRATION_PATTERN,
      priority: notifications.AndroidNotificationPriority.MAX,
    },
    trigger: null,
  });
}

export function addStudyNotificationResponseListener(
  onResponse?: () => void,
): (() => void) | null {
  if (Constants.appOwnership === "expo") {
    return null;
  }

  try {
    const notifications: NotificationsModule = require("expo-notifications");
    const addListener = notifications.addNotificationResponseReceivedListener;
    if (typeof addListener !== "function") {
      return null;
    }

    const subscription = addListener(() => {
      onResponse?.();
      void notifications.dismissAllNotificationsAsync?.().catch(() => {});
    });
    if (!subscription || typeof subscription.remove !== "function") {
      return null;
    }

    return () => {
      try {
        subscription.remove();
      } catch {
        // El ciclo de vida de la app no debe depender del listener nativo.
      }
    };
  } catch {
    return null;
  }
}


================================================
ðŸ“„ ARCHIVO: src\storage\study-session-storage.ts
================================================

import AsyncStorage from "@react-native-async-storage/async-storage";

import type {
  PausedPomodoroSession,
  PomodoroPhase,
  PomodoroSession,
  ReadyPomodoroSession,
  RunningPomodoroSession,
} from "../domain/pomodoro-session";

const STUDY_SESSION_STORAGE_KEY = "@cotopaxi/study-session";
const phases: readonly PomodoroPhase[] = [
  "study",
  "shortBreak",
  "longBreak",
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isFiniteInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value);
}

function isValidSession(value: unknown): value is PomodoroSession {
  if (
    !isRecord(value) ||
    (value.status !== "ready" &&
      value.status !== "running" &&
      value.status !== "paused") ||
    !phases.includes(value.phase as PomodoroPhase) ||
    !isFiniteInteger(value.initialDurationMs) ||
    value.initialDurationMs <= 0 ||
    !isFiniteInteger(value.completedPomodoros) ||
    value.completedPomodoros < 0 ||
    !isFiniteInteger(value.cycleTarget) ||
    value.cycleTarget < 1 ||
    value.completedPomodoros >= value.cycleTarget
  ) {
    return false;
  }

  if (value.status === "running") {
    return (
      isFiniteInteger(value.endsAt) &&
      value.endsAt > 0 &&
      !("lastCompletedPhase" in value) &&
      !("remainingMs" in value)
    );
  }

  if (
    value.status === "ready" &&
    value.lastCompletedPhase !== null &&
    !phases.includes(value.lastCompletedPhase as PomodoroPhase)
  ) {
    return false;
  }

  return (
    isFiniteInteger(value.remainingMs) &&
    value.remainingMs >= 0 &&
    value.remainingMs <= value.initialDurationMs &&
    (value.status !== "paused" || !("lastCompletedPhase" in value)) &&
    !("endsAt" in value)
  );
}

export async function loadStudySession(): Promise<PomodoroSession | null> {
  const serializedSession = await AsyncStorage.getItem(
    STUDY_SESSION_STORAGE_KEY,
  );

  if (serializedSession === null) {
    return null;
  }

  const storedValue: unknown = JSON.parse(serializedSession);
  if (!isValidSession(storedValue)) {
    throw new Error("Stored study session has an invalid format.");
  }

  return storedValue;
}

export async function saveStudySession(
  session: PomodoroSession,
): Promise<void> {
  if (!isValidSession(session)) {
    throw new Error("Cannot save an invalid study session.");
  }

  await AsyncStorage.setItem(
    STUDY_SESSION_STORAGE_KEY,
    JSON.stringify(session),
  );
}

export function isRunningStudySession(
  session: PomodoroSession,
): session is RunningPomodoroSession {
  return session.status === "running";
}

export function isPausedStudySession(
  session: PomodoroSession,
): session is PausedPomodoroSession {
  return session.status === "paused";
}

export function isReadyStudySession(
  session: PomodoroSession,
): session is ReadyPomodoroSession {
  return session.status === "ready";
}


================================================
ðŸ“„ ARCHIVO: src\styles.d.ts
================================================

declare module '*.css';


================================================
ðŸ“„ ARCHIVO: tsconfig.json
================================================

{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/assets/*": [
        "./assets/*"
      ],
      "@/*": [
        "./src/*"
      ]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts"
  ]
}
