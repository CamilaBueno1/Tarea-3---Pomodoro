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
