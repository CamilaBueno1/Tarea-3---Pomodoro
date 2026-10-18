**Límite técnico:** 
La exactitud estricta del comportamiento audible y de vibración bajo silencio absoluto o "No Molestar" **no está garantizada por la aplicación ni por el código**, ya que depende directamente de las políticas y permisos asignados por el sistema operativo

**Solución implementada:** 

   - Se configurarán las notificaciones locales con canal de alta prioridad (tipo alarma/urgente) y permisos explícitos solicitados al usuario.
   - En caso de que el sistema operativo o un modo "No Molestar" silencie el sonido, se garantiza que la **alerta visual se muestre en la pantalla de bloqueo** y que la fase/temporizador se actualice correctamente al abrir la app.