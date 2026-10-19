# Spec 006 - Usar la aplicación sin registro, sin internet y sin publicidad

Estado: borrador
HU de origen: docs/historias/HU-006.md

## Contexto y objetivo

Permitir que el estudiante empiece a usar la aplicación sin crear una cuenta,
continúe usando el temporizador, los avisos y los ajustes sin conexión a
internet, conserve sus ajustes en el dispositivo y no vea anuncios.

## Usuarios

- Estudiante.

## Historias de usuario

Como estudiante, quiero usar la aplicación apenas la instalo, sin crear una
cuenta, sin datos móviles y sin anuncios, para empezar a estudiar sin trabas.

## Requisitos funcionales

- **RF-1:** CUANDO el estudiante abre por primera vez la aplicación recién
  instalada, EL SISTEMA muestra directamente el temporizador sin mostrar ni
  exigir pantallas de registro o inicio de sesión. Origen: HU-006, escenario
  «Abrir la aplicación por primera vez».
- **RF-2:** CUANDO el estudiante usa el temporizador, los avisos o los ajustes
  sin datos móviles ni Wi-Fi, EL SISTEMA mantiene disponibles esas funciones
  sin requerir conexión a internet. Origen: HU-006, escenario «Usarla sin
  conexión».
- **RF-3:** CUANDO el estudiante usa los ajustes sin conexión a internet, EL
  SISTEMA conserva los ajustes en el dispositivo para que su disponibilidad no
  dependa de una conexión a internet. Origen: HU-006, escenario «Usarla sin
  conexión».
- **RF-4:** EL SISTEMA no muestra anuncios en ninguna de sus pantallas. Origen:
  HU-006, escenario «Usarla sin publicidad».

## Requisitos no funcionales

No se identifican requisitos no funcionales adicionales en HU-006.

## Casos límite

- El estudiante abre la aplicación por primera vez sin haber creado una cuenta.
- El estudiante utiliza el temporizador, los avisos y los ajustes con los
  datos móviles y Wi-Fi desactivados.
- El estudiante recorre cualquiera de las pantallas de la aplicación.

## Fuera de alcance

- Definir comportamientos de temporizador, avisos o ajustes que no estén
  descritos en HU-006.
- Afirmar que el sistema operativo o el dispositivo entregará un aviso bajo
  cualquier condición.

## Criterios de finalización

- RF-1 se verifica abriendo la aplicación recién instalada y comprobando que
  se presenta el temporizador sin flujo de registro o inicio de sesión.
- RF-2 y RF-3 se verifican usando el temporizador, los avisos y los ajustes
  sin datos móviles ni Wi-Fi, y comprobando que los ajustes se conservan en el
  dispositivo.
- RF-4 se verifica recorriendo todas las pantallas y comprobando que no se
  muestra ningún anuncio.

## Dudas abiertas

- [NECESITA ACLARACIÓN] El escenario «Usarla sin conexión» indica que «todo
  funciona igual», incluidos los avisos, pero no precisa si esto significa que
  están disponibles sin conexión a internet o si exige garantizar su entrega
  incluso cuando existan restricciones del sistema operativo o del
  dispositivo. Esta spec no establece tal garantía.
