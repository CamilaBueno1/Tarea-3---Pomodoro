**Decisión:** La aplicación usa notificaciones locales con los permisos
concedidos y la prioridad configurada para Android. No intenta evadir el modo
silencio, No molestar ni otras restricciones del sistema operativo.

**Límite técnico:** La entrega visual en pantalla de bloqueo y el sonido o la
vibración dependen de los permisos, la configuración del dispositivo y las
políticas del sistema operativo. La aplicación no garantiza que el aviso
interrumpa esas restricciones; al volver a abrirla, la sesión se reconcilia
con el estado y el tiempo de finalización persistidos.