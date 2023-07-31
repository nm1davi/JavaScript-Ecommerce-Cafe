const productos = [
    //Cafe Molidos
    {
        id: "cafe-01",
        titulo: "Varanda Blend",
        imagen: "./assets/img/cafe_bolsa_veranda.png",
        descripcion:"Ligeramente tostado, delicado y sabroso, con una agradable suavidad.",
        categoria:{
            nombre:"Molido",
            id:"molido"
        },
        precio: 580
    },
    {
        id: "cafe-02",
        titulo: "Colombia",
        imagen: "./assets/img/colombia.png",
        descripcion:"Bebé y saboreá este café colombiano de origen único con cuerpo redondo, sabor jugoso y un característico final a nuez.",
        categoria:{
            nombre:"Molido",
            id:"molido"
        },
        precio: 580
    },
    {
        id: "cafe-03",
        titulo: "House Blend",
        imagen: "./assets/img/house_blend.png",
        descripcion:"Este café latinoamericano está cargado de sabor, equilibrando los gustos a nueces y cacao, con un toque de dulzura que aporta el tostado.",
        categoria:{
            nombre:"Molido",
            id:"molido"
        },
        precio: 650
    },
    {
        id: "cafe-04",
        titulo: "Verona",
        imagen: "./assets/img/verona.png",
        descripcion:"El tostado dulce con notas de cacao oscuro de esta mezcla, hacen esta taza de café rica y equilibrada.",
        categoria:{
            nombre:"Molido",
            id:"molido"
        },
        precio: 680
    },

    //Cafe en Capsula
    {
        id: "cafe-05",
        titulo: "Expreso Roast",
        imagen: "./assets/img/Nespresso_EspressoRoast_Longshadow.png",
        descripcion:"Una deliciosa mezcla de cafés latinoamericanos y de Asia, este espresso tiene una dulzura rica y acaramelada.",
        categoria:{
            nombre:"Capsula",
            id:"capsula"
        },
        precio: 490
    },
    {
        id: "cafe-06",
        titulo: "Blonde Expreso Roast",
        imagen: "./assets/img/Blonde-Espresso-Roast.png",
        descripcion:"Saboreá un café latinoamericano con un sabor audaz pero suave y notas dulces y vibrantes. Disfrutá de nuestro café tostado más ligero en tu casa.",
        categoria:{
            nombre:"Capsula",
            id:"capsula"
        },
        precio: 500
    },
    {
        id: "cafe-07",
        titulo: "House Blend",
        imagen: "./assets/img/House-Blend-lungo.png",
        descripcion:"Este café latinoamericano está cargado de sabor, equilibrando los gustos a nueces y cacao, con un toque de dulzura que aporta el tostado.",
        categoria:{
            nombre:"Capsula",
            id:"capsula"
        },
        precio: 490
    },
];

const contenedorProductos = document.querySelector("#contenedor-productos");
let botonesAgregar = document.querySelectorAll(".boton");
const numerito = document.querySelector("#numerito");
const numeritoHeader = document.querySelector("#numeritoHeader");


function cargarProductos() {
    productos.forEach(producto => {
      const div = document.createElement("div");
      div.classList.add("contendorImg");
      div.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.titulo}">
        <h2>$${producto.precio}</h2>
        <h1>${producto.titulo}</h1>
        <p>${producto.descripcion}</p>
        <div class="carrito">
          <a href="carrito.html">
            <i class="fa-solid fa-cart-shopping fa-xl" style="color: #463318;"></i>
            <span id="numerito-${producto.id}" class="numerito">0</span>
          </a>
        </div>
        <div class="botonTarjeta">
          <button class="boton" id="${producto.id}">COMPRAR</button>
        </div>
      `;
  
      contenedorProductos.append(div);
    });
  
    actualizarBotonesAgregar();
  }

cargarProductos();



function actualizarBotonesAgregar() {

    botonesAgregar= document.querySelectorAll(".boton");
    botonesAgregar.forEach(boton =>{
        boton.addEventListener("click",agregarAlCarrito);
    })
}

let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
  productosEnCarrito = JSON.parse(productosEnCarritoLS);
  actualizarNumerito(); 
  actualizarNumeritoHeader();
}else {
  productosEnCarrito = []
}

//Agregar cosas al carrito
function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);
  
    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
      const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
      productosEnCarrito[index].cantidad++;
    } else {
      productoAgregado.cantidad = 1;
      productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito();
    actualizarNumeritoHeader() ;
    localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito));
  }
  

  //Actualizar Numero de los carritos el de la tarjeta y el de header
  function actualizarNumerito() {
    productosEnCarrito.forEach(producto => {
      const numerito = document.querySelector(`#numerito-${producto.id}`);
      if (numerito) {
        numerito.innerText = producto.cantidad;
      }
    });
}
function actualizarNumeritoHeader() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad,0)
    numeritoHeader.innerText = nuevoNumerito;
}


