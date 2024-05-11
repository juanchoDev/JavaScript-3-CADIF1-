Requerimientos generales:
Atienda a los requerimientos que se listan a continuacion

Requerimientos específicos:
1.- En una pagina web establecer que al iniciar hay una sesion iniciada cuyo username se encuentra registrado en el localStorage y que con ese valor hay un mensaje en la pagina que dice Bienvenido (username).

2.- Programar que al cabo de 10 segundos posterior a la carga de todos los elementos de la pagina aparezca un alert de la libreria Sweet Alert preguntando al usuario se desea continuar con su sesion iniciada.

3.- En base al requerimiento 2, En caso negativo debe cerrar la sesion, esto es, borrar el username del localStorage y hacer aparecer un boton para "Iniciar Sesion"

4.- En base al requerimiento 2, en caso positivo llevar un conteo de tiempo que al cabo de 15 segundos si no se ha hecho click en el body (permitir el burbujeo de eventos de sus componentes para que el metodo en el body se dispare y reinicie el conteo de tiempo); pregunte con un alert de Sweet Alert si desea mantener la sesion iniciada. Esto debe iniciar un conteo de hasta 10 segundos.

5.- En base al requerimiento 4, programar que dicho conteo de 10 segundos sea visible en la pagina (que no se tape con el alert) y se vaya descontando, esperando la respuesta del usuario a la pregunta del requerimiento 4. Si el usuario no responde "cerrar la sesion".