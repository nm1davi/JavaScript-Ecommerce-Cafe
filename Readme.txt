Profe la página es una página de Cafe. La idea es venta de cafe en forma online.

En el index estan los productos cargados con JS, esos productos tienen un carrito con un numero alado, donde se puede observar cuantos items
del mismo producto estamos comprando. En header tambien podemos observar un numero alado de otro carrito pero ese nos dice cuantos productos 
en TOTAL tenemos al hacer click en cualquier carrito, nos llevara a la pagina de carrito.

Cree una página de carrito donde se puede observar los productos que llevo comprado, con una imagen un nombre un precio y un subtotal. Ademas 
tambien tenemos la opcion de eliminar producto por producto si cargamos el carrito de mas, o de vaciar directamente el carrito si no estamos
de acuerdo con la compra que llevamos, una vez que estemos dispuestos a comprar los productos podemos ir a comprar ahora y eso simula que
finalizamos nuestra comrpas.

Además tambien cree paginas de contacto y nosotros, pero en donde segui utilzando JS, fue en contacto, en el fomrmulario, cree un formulario
el cual esta disponible por si alguna persona tiene alguna duda o necesita contactarse con la empresa, coloca sus datos y envia ese formulario
al apretar el boton enviar, simula enviar el formulario.



 Lo corregido:
 - Profe en primer punto corregí lo de retiro en local, cuando se compra y se presiona el botón de retiro en local se abre un alerta "Retiro en local (checked) Tu compra fue exitosa" y el carrito tarda unos segundos en vaciarse por el tema de que
 se aplica la class "contenedorCarritoComprado", pero son solamente 4 s, luego se borran los productos del LocalStorage. 
- El segundo punto también lo corregí, también no se puede solicitar ningún pedido sin tener los campos completados del formulario.
- Ahora corregí la API y utilice la de Google maps, que es mejor que resto. Ahora ya calcula la distancia hasta donde se solicite con el trazado. Lo que si profe yo soy de Mendoza y probé con algunas direcciones de acá, le dejo algunas si quiere probar (Sáenz Peña 421, Luján de Cuyo, Telba Barrera 2336, Luján de Cuyo, Carriego 1071, Godoy Cruz
Almirante Brow, Chacras).