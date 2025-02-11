// Imports
import { obtenerTareas, addTarea, eliminarTarea } from "./firebase.js";

$(document).ready( function () {
  // Variables
  let crearTareaForm = $("#crear-tarea-form");
  let divTareas = $("#div-tareas");


  // EVENTOS

  // Al crear una tarea
  crearTareaForm.on("submit", function(e) {
    e.preventDefault();

    // Valores formulario
    let nombre = $("#nombre-tarea").val();
    let descripcion = $("#descripcion-tarea").val();
    let prioridad = $("#prioridad-tarea").val();

    // Declarar un objeto tarea con sus campos
    let tarea = {nombre, descripcion, prioridad};

    // Añadir tarea a la BBDD usando addDoc
    addTarea(tarea); 

     // Limpiar formulario
    crearTareaForm.trigger("reset");

    // Llamar a la función para mostrar las tareas con la nueva añadida
    mostrarTareas();
  });

  // Cuando se pulsa botón eliminar tarea, delegado del div al dinámico
  divTareas.on("click", ".eliminar-tarea", function(e) {
    // Obtener el atributo data del boton que conteiene el id de la tarea
    let idTarea = e.target.dataset.id;

    // Llamar la función de BBDD para eliminarla
    eliminarTarea(idTarea);

    // Actualizar las tareas disponibles
    mostrarTareas();
  });



  // FUNCIONES
  async function mostrarTareas() {
    // Llamar función de BBDD para obtener todas las tareas
    let tareas = await obtenerTareas();

    let abrirOpcionesTarea = `<nav class="opciones-tarea">`;

    // Vaciar div para rellenarlo
    divTareas.empty();

    // Dentro de todas las tareas existentes, añadirlas al div 
    $.each(tareas, function (indice, tarea) { // for each
      divTareas.append(`<div class='tarea'>
                          <div>
                            <li>${tarea.nombre}</li>
                            <li>${tarea.descripcion}</li>
                            <li>${tarea.prioridad}</li>
                          </div>

                          ${abrirOpcionesTarea}
                            <button>Editar</button>
                            <button class='eliminar-tarea' data-id=${tarea.id}>Eliminar</button>
                          </nav>
                        </div>`);
    });
  }
  


  // Mostrar inicialmente las tareas
  mostrarTareas();


 
});