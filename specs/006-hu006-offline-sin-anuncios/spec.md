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
