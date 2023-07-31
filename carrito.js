// Obtener productos del carrito del almacenamiento local
let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito) || [];

// Obtener referencias a los elementos del DOM
const contenedorCarritoVacio = document.querySelector("#carritoVacio");
const contenedorCarritoProductos = document.querySelector("#carritoProductos");
const botonComprar = document.querySelector("#comprarAhora");
const contenedorCarritoComprado = document.querySelector("#graciasCompra");
const contenedorTotal = document.querySelector("#total");
let botonesEliminar;

// Cargar los productos en el carrito al cargar la página
function cargarProductosCarrito() {
  if (productosEnCarrito.length > 0) {
    contenedorCarritoVacio.classList.add("disable");
    contenedorCarritoProductos.classList.remove("disable");
    botonComprar.classList.remove("disable");

    const tbody = document.querySelector("#carritoProductos tbody");
    tbody.innerHTML = "";

    productosEnCarrito.forEach((producto) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td><img src="${producto.imagen}" alt="${producto.titulo}"></td>
        <td>${producto.titulo}</td>
        <td>${producto.cantidad}</td>
        <td>$${producto.precio}</td>
        <td>$${producto.precio * producto.cantidad}</td>
        <td><button class="botonEliminar" id="${producto.id}" ><i class="bi bi-trash btn btn-danger"></i></button></td>
      `;
      tbody.appendChild(fila);
    });
  } else {
    contenedorCarritoVacio.classList.remove("disable");
    contenedorCarritoComprado.classList.add("disable");
    contenedorCarritoProductos.classList.add("disable");
    botonComprar.classList.add("disable");
  }

  // Actualizar eventos de los botones de eliminar
  actualizarBotonesEliminar();

  // Actualizar el número de productos en el aside
  actualizarNumeritoAside();

  // Actualizar el total
  actualizarTotal();
}

// Actualizar eventos de los botones de eliminar
function actualizarBotonesEliminar() {
  botonesEliminar = document.querySelectorAll(".botonEliminar");
  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", eliminarDelCarrito);
  });
}


// Eliminar producto del carrito
function eliminarDelCarrito(e) {
  const idBoton = e.currentTarget.id;

  const index = productosEnCarrito.findIndex((producto) => producto.id === idBoton);

  if (index !== -1) {
    if (productosEnCarrito[index].cantidad > 1) {
      productosEnCarrito[index].cantidad--;
    } else {
      productosEnCarrito.splice(index, 1);
    }

    // Actualizar el almacenamiento local con los productos del carrito
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    // Actualizar la visualización del carrito
    cargarProductosCarrito();
  }
}

// Actualizar el número de productos en el aside
function actualizarNumeritoAside() {
  const cantidadTotal = productosEnCarrito.reduce((total, producto) => total + producto.cantidad, 0);
  const numeritoAside = document.querySelector("#numeritoAside");
  numeritoAside.innerText = cantidadTotal;
}

// Actualizar el total
function actualizarTotal() {
  const totalCalculado = productosEnCarrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );
  const totalElement = document.querySelector("#total");
  totalElement.textContent = `Total: $${totalCalculado}`;
}

// Vaciar el carrito
const botonVaciarCarrito = document.querySelector("#vaciarCarrito");
botonVaciarCarrito.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
  productosEnCarrito = [];
  localStorage.removeItem("productos-en-carrito");
  cargarProductosCarrito();
}
// Comprar ahora
botonComprar.addEventListener("click", mostrarOpcionesCompra);

function comprarAhora() {
  // Mostrar el mensaje de agradecimiento
  contenedorCarritoProductos.classList.add("disable");
  contenedorCarritoComprado.classList.remove("disable");

  // Vaciar el carrito después de un tiempo para que el mensaje sea visible
  setTimeout(() => {
    vaciarCarrito();
    contenedorCarritoComprado.classList.add("disable");
    contenedorCarritoVacio.classList.remove("disable");
  }, 4000);
}

// Cargar los productos en el carrito al cargar la página
cargarProductosCarrito();


function mostrarOpcionesCompra() {
  Swal.fire({
    title: 'COMPRA ONLINE',
    text: "¿Desea retirar en el local, que se lo enviemos a domicilio o cancelar el pedido?",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar pedido',
    confirmButtonText: 'Envío a domicilio',
    showDenyButton: true,
    denyButtonColor: '#f0ad4e',
    denyButtonText: 'Retiro en el local',
    buttons: {
      confirm: {
        className: 'swal-button-primary',
      },
      deny: {
        className: 'swal-button-third',
      },
      cancel: {
        className: 'swal-button-secondary',
      },
    },
    footer: '<a href="/contacto.html">¿Necesitas ayuda? Contáctanos</a>',
  }).then((result) => {
    if (result.isConfirmed) {

      Swal.fire(
        'Envío a domicilio',
        'Presiona "OK" para calcular tu envío.',
        'success'
      ).then(() => {

        window.location.href = 'envio.html';
      });
    } else if (result.isDenied) {

      comprarAhora() 
      Swal.fire(
        'Retiro en el local',
        'Tu compra fue exitosa! Te esperamos en el local.',
        'success'
      ).then(() => {

      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {

      Swal.fire(
        'Pedido cancelado',
        'Tu pedido ha sido cancelado.',
        'error'
      );
    }
  });
}


