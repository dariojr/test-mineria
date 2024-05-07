// -------------------------------------------------------------------------------
// ************* Funcion redimensión imagen escritorio *************
// -------------------------------------------------------------------------------
function redimensionarAreasEscritorio() {
  var areas = document.getElementsByTagName('area');
  var img = document.getElementById('img_ID_escritorio');
  var proporcionX = img.clientWidth / 1920;
  var proporcionY = img.clientHeight / 1080;
  var minSize = 5; 

  console.log("0");
  for (var i = 0; i < areas.length; i++) {
      var coords = areas[i].getAttribute('coords').split(',');
      var shape = areas[i].getAttribute('shape').toLowerCase();

      if (shape === 'circle') {
          // Redimensionar mapa circular
          var centerX = parseInt(coords[0]);
          var centerY = parseInt(coords[1]);
          var radio = parseInt(coords[2]);

          var normalizedRadio = Math.min(radio, Math.min(centerX, centerY));
          coords[0] = Math.max(Math.round(centerX * proporcionX), minSize);
          coords[1] = Math.max(Math.round(centerY * proporcionY), minSize);
          coords[2] = Math.max(Math.round(normalizedRadio * (proporcionX + proporcionY) / 2), minSize);
      } else if (shape === 'rect') {
          // Redimensionar mapa rectangular
          for (var j = 0; j < coords.length; j++) {
              if (j % 2 === 0) {
                  coords[j] = Math.max(Math.round(parseInt(coords[j]) * proporcionX), minSize);
              } else {
                  coords[j] = Math.max(Math.round(parseInt(coords[j]) * proporcionY), minSize);
              }
          }
      }

      areas[i].setAttribute('coords', coords.join(','));
  }
}
window.addEventListener('resize', function() {
  redimensionarAreasEscritorio();
});

window.onload = function() {
      redimensionarAreasEscritorio();
};

// -------------------------------------------------------------------------------
// ************* Abrir Fichas desde el mapeo *************
// -------------------------------------------------------------------------------
// Función para manejar el clic en el área del mapa de imagen
function abrirImagen(event) {
    // Evitar que el enlace se abra en una nueva ventana o pestaña
    event.preventDefault();

    // Obtener la URL de la imagen de los datos personalizados (data-imagen) del área
    var imagenURL = event.target.getAttribute('data-imagen');

    // Mostrar la imagen abierta en el contenedor
    var contenedorImagen = document.getElementById('imagenAbierta');
    var imagenAbiertaImg = document.getElementById('imagenAbiertaImg');
    imagenAbiertaImg.src = imagenURL; // Establecer la URL de la imagen
    contenedorImagen.style.display = 'block';
}

// Función para cerrar la imagen abierta
function cerrarImagen() {
  var contenedorImagen = document.getElementById('imagenAbierta');
  var imagenAbiertaImg = document.getElementById('imagenAbiertaImg');
  imagenAbiertaImg.src = ''; // Vaciar el src de la imagen para que no se muestre
  contenedorImagen.style.display = 'none'; // Ocultar el contenedor
}

// Obtener todas las áreas del mapa de imagen
var areas = document.querySelectorAll('area');
// Agregar un controlador de eventos clic a cada área
areas.forEach(function(area) {
    area.addEventListener('click', abrirImagen);
});

// -------------------------------------------------------------------------------
// ************* Abrir Fichas desde la lista de imagenes *************
// -------------------------------------------------------------------------------

// Función para manejar el clic en las imágenes de la lista
function abrirImagenLista(event) {
  // Obtener la URL de la imagen de los datos personalizados (data-user) de la imagen
  var imagenURL = event.target.getAttribute('data-user');

  // Mostrar la imagen abierta en el contenedor
  var contenedorImagen = document.getElementById('imagenAbierta');
  var imagenAbiertaImg = document.getElementById('imagenAbiertaImg');
  imagenAbiertaImg.src = imagenURL; // Establecer la URL de la imagen
  contenedorImagen.style.display = 'block';
}

// Obtener todas las imágenes de la lista
var imagenesLista = document.querySelectorAll('.botones img');
// Agregar un controlador de eventos clic a cada imagen de la lista
imagenesLista.forEach(function(imagen) {
  imagen.addEventListener('click', abrirImagenLista);
});




