// Evito que se envíe el formulario por defecto
document.getElementById('botonEnviar').addEventListener('click', function(event) {
    event.preventDefault(); 
    
    // Obtengo los valores del formulario
    let nombre = document.getElementById('nombres').value;
    let correo = document.getElementById('correo').value;
    let celular = document.getElementById('celular').value;
    let mensaje = document.getElementById('mensaje').value;

    // Simulo enviar el formulario
    // Muestro el mensaje por consola, para despues poder agregar esto a una futura Base De Datos
    console.log('Nombre:', nombre);
    console.log('Correo:', correo);
    console.log('Celular:', celular);
    console.log('Mensaje:', mensaje);

    // Deshabilito la clase contacto para que no se vea
    let formElements = document.getElementsByClassName('contacto');
    for (let i = 0; i < formElements.length; i++) {
      formElements[i].classList.add('disable');
    }

    // Deshabilito el boton enviar tambien 
    let botonEnviar = document.getElementById('botonEnviar');
    botonEnviar.classList.add('disable');

    // Muestro el mensaje de agradecimientos y previo saque las otras clases
    let graciasFormulario = document.getElementsByClassName('graciasFormulario')[0];
    graciasFormulario.classList.remove('disable');

    // Vacio los campos que habia llenado antes con el nombre, numero, etc. Y le doy disable a la clase graciasFormulario y vuelve a mostras las clases de formulario para poder llenarlo nuevamente.
    setTimeout(function() {
      for (let i = 0; i < formElements.length; i++) {
        formElements[i].classList.remove('disable');
        formElements[i].reset();
      }
      botonEnviar.classList.remove('disable');
      graciasFormulario.classList.add('disable');
    }, 3000);
  });