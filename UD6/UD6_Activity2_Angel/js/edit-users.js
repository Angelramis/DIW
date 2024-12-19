$(document).ready(function () {

  /* Declarar elementos base */
  let titulo = $("<div>").addClass("titulo");
  
  let h1Titulo = $("<h1>").text("GESTIÓ SUPERUSUARI");

  // Añadir el h1Titulo al div titulo
  titulo.append(h1Titulo);

  let editUsersStart = `<nav class="edit-users-start">
                    <nav class="nav-user-search">
                      <input type="search" placeholder="Cercar usuaris..." name="user-search" id="inputSearch">
                      <button type="submit" name="search-user-submit" class="search-submit">
                        <img src="../assets/icons/search.png" alt ="Icona cercador">
                      </button>
                    </nav>
                      <button type='button' class='call-to-action-button'>
                              <img src='../assets/icons/mas.png' alt='mas'>Crear usuari
                            </button>
                    </nav>`;

  let usersOpenSection = `<section class="users-section" id="users-section">`;
  let usersCloseSection = `</section>`;
  let permissionsLegend = `<div class="permissions-legend-div">
                              <p>Permissos d'edició</p>
                              <p>F: Fitxes, N: Notícies, U: Usuaris</p>
                            </div>`;


  /* Añadir elementos en orden */
  $("main").append(titulo);
  $("main").append(editUsersStart);
  $("main").append(permissionsLegend);
  $("main").append(usersOpenSection);

  // Obtener array users LS
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Obtener por cada usuario sus datos y añadirlos a una tabla individual
  users.forEach(user => {
    let userTable = `
      <table class="user-table ">
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
            <td>${user.email}</td>
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
                <a href="">Editar</a>
                <a href="">Eliminar</a>
              </div>
            </td>
          </tr>
            
        </tbody>
      </table>`;

    // Añadir el elemento de la tabla al html section
    $("#users-section").append(userTable);
  });

  // Añadir el cierre del section al html
  $("main").append(usersCloseSection);
});