import { obtenerElementos, addElemento, actualizarElemento, eliminarElemento, obtenerElemento } from "../js/gestionDB.js";


$(document).ready(async function () {

  let loggedUser = localStorage.getItem('loggedUser');
  // Si no ha iniciado sesión o no tiene permisos, salir de la página
  if (!loggedUser) { 
    window.location.href = "../index.html";
  }

  /* Forma 1 de declarar elementos */
  let titulo = $("<div>").addClass("titulo");
  
  let h1Titulo = $("<h1>").text("GESTIÓ SUPERUSUARI");

  // Añadir el h1Titulo al div titulo
  titulo.append(h1Titulo);

  /* Forma 2 de declarar elementos */
  let editUsersStart = `<nav class="edit-users-start">
                    <nav class="nav-user-search">
                      <input type="search" placeholder="Cerca usuaris per nom..." name="user-search" id="input-search">
                    </nav>
                    <a href="/views/edit-user.html" style="align-self: center;">
                      <button type='button' class='call-to-action-button'>
                        <img src='../assets/icons/mas.png' alt='mas'>Crear usuari
                      </button>
                    </a>
                    </nav>`;

  let usersSection = `<section class="users-section" id="users-section"></section>`;
  let permissionsLegend = `<div class="permissions-legend-div">
                              <p>Permissos d'edició</p>
                              <p>F: Fitxes, N: Notícies, U: Usuaris</p>
                            </div>`;


                            
  /* Añadir elementos en orden */
  $("main").append(titulo, editUsersStart, permissionsLegend, usersSection);


  async function mostrarUsuarios(filtro = "") {
    // Obtener users Firebase
    let users = await obtenerElementos("users", filtro);
    
    $("#users-section").empty();

    // Tabla escritorio
    let userTableDesktop = `
      <table class="user-table-desktop">
        <thead>
          <tr>
            <td>ID</td>
            <td>Nom</td>
            <td>Email</td>
            <td>Permisos</td>
            <td>Actiu</td>
            <td colspan="2">Gestió</td>
          </tr>
        </thead>
        <tbody>
          ${users
            .map(
              (user) => `
            <tr>
              <td>${user.id}</td>
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td>${user.edit_bone_files ? "F," : ""} ${user.edit_news ? "N," : ""} ${user.edit_users ? "U" : ""}</td>
              <td>${user.active ? "Sí" : "No"}</td>
              <td class="user-management-td">
                <div class="user-management-div">
                  <a href="./edit-user.html?id=${user.id}">Editar</a>
                  ${user.name !== "admin" ? `<button data-id="${user.id}" class="boton-eliminar">Eliminar</button>` : "" }
                </div>
              </td>
            </tr>`
            )
            .join("")}
        </tbody>
      </table>`;

    // Tabla móvil
    let userTablesMobile = users
      .map(
        (user) => `
      <table class="user-table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>${user.id}</td>
          </tr>
          <tr>
            <td>Nom</td>
            <td>${user.name}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td class="td-email"><p>${user.email}</p></td>
          </tr>
          <tr>
            <td>Permisos</td>
            <td>${user.edit_bone_files ? "F," : ""} ${user.edit_news ? "N," : ""} ${user.edit_users ? "U" : ""}</td>
          </tr>
          <tr>
            <td>Actiu</td>
            <td>${user.active ? "Sí" : "No"}</td>
          </tr>
          <tr class="user-management-tr">
            <td>Gestió</td>
            <td>
              <div class="user-management-div">
              ${user.name !== "admin" ? 
                `<a href="./edit-user.html?id=${user.id}">Editar</a>
                <button data-id="${user.id}" class="boton-eliminar">Eliminar</button>` 
                : ""}
              </div>
            </td>
          </tr>
        </tbody>
      </table>`
      )
      .join("");

    $("#users-section").append(userTableDesktop, userTablesMobile);
  }

  await mostrarUsuarios();

  // Evento para eliminar usuario
  $(".boton-eliminar").on("click", async function(e) {
    console.log("clicado");
    let userId = $(this).data("id");

    if (confirm("Estás segur que vols eliminar l'usuari?")) {
      await eliminarElemento("users", userId.toString());
      location.reload(); // Recargar página
    }
  });


  // Evento buscar usuarios por nombre
  $("#input-search").on("input", async function () {
    let inputSearch = $(this).val().trim();
    await mostrarUsuarios(inputSearch);
  });
});