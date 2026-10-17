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
