// Variable global para el mapa
let map;
// Variable global para almacenar las coordenadas de tu dirección
let tuUbicacion;

// Variable global para el geocoder del cliente
let geocoderCliente;

// Variable global para el objeto de dirección del servicio de Google Maps
let directionsService;

// Variable global para el objeto de representación de direcciones en el mapa
let directionsDisplay;

function vaciarCarrito() {
  productosEnCarrito = [];
  localStorage.removeItem("productos-en-carrito");
}
// Función para verificar si el formulario está completo
function formularioCompleto() {
  const nombres = document.getElementById("nombres").value;
  const telefono = document.getElementById("telefono").value;
  const direccion = document.getElementById("direccion").value;
  return nombres !== "" && telefono !== "" && direccion !== "";
}

// Función para habilitar o deshabilitar los botones "SI" y "NO" según el estado del formulario
function actualizarBotones() {
  const botonSi = document.getElementById("botonSi");
  const botonNo = document.getElementById("botonNo");

  if (formularioCompleto()) {
    botonSi.disabled = false;
    botonNo.disabled = false;
  } else {
    botonSi.disabled = true;
    botonNo.disabled = true;
  }
}

// Vincula el evento de cambio de los campos del formulario con la función actualizarBotones()
document.getElementById("nombres").addEventListener("input", actualizarBotones);
document.getElementById("telefono").addEventListener("input", actualizarBotones);
document.getElementById("direccion").addEventListener("input", actualizarBotones);


function initMap() {
  // Tu dirección que deseas geocodificar
  const tuDireccion = "Av. San Martín 1202, M5500 Mendoza";


  const geocoder = new google.maps.Geocoder();


  geocoderCliente = new google.maps.Geocoder();


  geocoder.geocode({ address: tuDireccion }, (results, status) => {
    if (status === "OK") {
      // Obtener las coordenadas de tu dirección
      tuUbicacion = results[0].geometry.location;


      map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: tuUbicacion,
        mapId: "DEMO_MAP_ID",
      });


      const marker = new google.maps.Marker({
        map: map,
        position: tuUbicacion,
        title: "Tu Ubicación",
      });

      // Crear un objeto de dirección del servicio de Google Maps
      directionsService = new google.maps.DirectionsService();


      directionsDisplay = new google.maps.DirectionsRenderer();
    } else {
      alert("No se pudo encontrar tu ubicación. Error: " + status);
    }
  });
}

// Función para verificar si la dirección del cliente es válida
function verificarDireccionCliente() {
  const direccionCliente = document.getElementById("direccion").value;


  geocoderCliente.geocode({ address: direccionCliente }, (results, status) => {
    if (status === "OK") {

      document.getElementById("botonSi").disabled = false;
      document.getElementById("botonNo").disabled = false;
    } else {

      document.getElementById("botonSi").disabled = true;
      document.getElementById("botonNo").disabled = true;
    }
  });
}

// Agregar un event listener al botón de "PEDIR AHORA" para calcular la distancia al enviar el formulario
document.getElementById("botonEnviarFormulario").addEventListener("click", (event) => {
  event.preventDefault();
  calcularDistancia();
});

// Función para mostrar el mensaje SweetAlert de pedido enviado con éxito y redireccionar al index.html
function pedidoEnviado() {
  Swal.fire({
    title: "Pedido Enviado",
    text: "Tu pedido ha sido enviado con éxito. Pronto llegará a tu domicilio.",
    icon: "success",
  }).then(() => {
    vaciarCarrito();
    // Reseteamos el formulario
    document.getElementById("form").reset();
    // Redireccionamos al index.html
    window.location.href = "./index.html";
  });
}

// Función para mostrar el mensaje SweetAlert de envío cancelado y redireccionar al carrito.html
function envioCancelado() {
  Swal.fire({
    title: "Envío Cancelado",
    text: "Tu envío ha sido cancelado.",
    icon: "error",
  }).then(() => {
    // Reseteamos el formulario
    document.getElementById("form").reset();
    // Redireccionamos al carrito.html
    window.location.href = "./carrito.html";
  });
}

function calcularDistancia() {
  const direccionCliente = document.getElementById("direccion").value;

  // Crear un objeto geocoder para la dirección del cliente
  const geocoder = new google.maps.Geocoder();

  // Realizar la solicitud de geocodificación para la dirección del cliente
  geocoder.geocode({ address: direccionCliente }, (results, status) => {
    if (status === "OK") {
      // Obtener las coordenadas de la dirección del cliente
      const ubicacionCliente = results[0].geometry.location;
      if (!directionsDisplay.getMap()) {
        directionsDisplay.setMap(map);
      }

      const directionsService = new google.maps.DirectionsService();


      if (!directionsDisplay.getMap()) {
        directionsDisplay.setMap(map);
      }

      // Realizar la solicitud de la ruta desde tu ubicación hasta la dirección del cliente
      const request = {
        origin: tuUbicacion,
        destination: ubicacionCliente,
        travelMode: google.maps.TravelMode.DRIVING,
      };

      directionsService.route(request, (response, status) => {
        if (status === "OK") {
          // Mostrar la ruta en el mapa
          directionsDisplay.setDirections(response);

        } else {
          alert("No se pudo encontrar la ruta. Error: " + status);
        }
      });
    } else {
      alert("No se pudo encontrar la ubicación del cliente. Error: " + status);
    }
  });
}

// Agregar un event listener al botón de "PEDIR AHORA" para calcular la distancia al enviar el formulario
document.getElementById("botonEnviarFormulario").addEventListener("click", (event) => {
  event.preventDefault();
  calcularDistancia();
});
// Vincular los botones "SI" y "NO" con las funciones pedidoEnviado() y envioCancelado()
document.getElementById("botonSi").addEventListener("click", () => {
  pedidoEnviado();
});

document.getElementById("botonNo").addEventListener("click", () => {
  envioCancelado();
});
