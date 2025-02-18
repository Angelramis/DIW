// Imports
import { obtenerTareas, addTarea, eliminarTarea, obtenerTarea, actualizarTarea } from "./firebase.js";

$(document).ready( function () {
  // Variables DOM
  let crearTareaForm = $("#crear-tarea-form");
  let divTareas = $("#div-tareas");

  // Variables
  let editandoTarea = false;
  let idTarea = '';
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
    if (!editandoTarea) { 
      addTarea(tarea); 
    } else { // si esta editando no añadir de más
      actualizarTarea(idTarea, tarea);

      editandoTarea = false;
    }

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

  // Cuando se pulsa botón editar tarea, delegado del div al dinámico
  divTareas.on("click", ".editar-tarea", async function(e) {
    // Obtener el atributo data del boton que conteiene el id de la tarea
    // y guardarlo para pasar el id para actualizar
    idTarea = e.target.dataset.id;

    // Llamar función BBBDD para obtener la tarea indidivual
    let tarea = await obtenerTarea(idTarea);

    // Obtener los datos del doc tarea
    tarea = tarea.data();

    // Insertar los datos de la tarea en los inputs
    $("#nombre-tarea").val(tarea.nombre);
    $("#descripcion-tarea").val(tarea.descripcion);
    $("#prioridad-tarea").val(tarea.prioridad);

    editandoTarea = true;

    $("#crear-tarea").text("Actualizar");
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
                            <button class='editar-tarea' data-id=${tarea.id}>Editar</button>
                            <button class='eliminar-tarea' data-id=${tarea.id}>Eliminar</button>
                          </nav>
                        </div>`);
    });

    $("#crear-tarea").text("Crear");
  }
  


  // Mostrar inicialmente las tareas
  mostrarTareas();


 
});