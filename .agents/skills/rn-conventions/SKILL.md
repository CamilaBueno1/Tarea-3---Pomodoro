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