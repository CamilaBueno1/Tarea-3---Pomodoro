# Constitución – Cotopaxi Focus

Principios innegociables. Toda spec, plan y tarea debe cumplir con ellos.

1. **La spec manda:** Ningún comportamiento o código se implementa sin una especificación activa aprobada. Ante cualquier vacío, se detiene el desarrollo y se consulta.
2. **Sencillez y privacidad:** Solo las dependencias autorizadas. Sin cuentas, backend, analítica, publicidad, ni permisos que las Historias de Usuario (HU-006) no requieran.
3. **Tiempo comprobable:** La marca temporal de finalización (`targetEndTime`) es la única fuente de verdad del conteo. El intervalo visual solo refresca la pantalla para garantizar precisión al bloquear el celular (HU-003).
4. **Responsabilidades separadas:** Las transiciones y reglas del Pomodoro son funciones puras en `src/domain/`; React presenta el estado visual y AsyncStorage conserva los datos localmente.
5. **Pruebas como puerta:** Las reglas de dominio cuentan con pruebas Jest. Lint, TypeScript y las pruebas deben pasar en verde antes de cerrar cualquier tarea.
6. **Datos seguros y visibles:** Los fallos se muestran claramente y no se ocultan. Reiniciar una fase, modificar tiempos o restaurar ajustes exige confirmación explícita del usuario para evitar pérdidas accidentales.
