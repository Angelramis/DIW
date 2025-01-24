$(document).ready(function () {

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

  // Para prueba varios usuarios
  // let new_user = {
  //   id: 2,
  //   name: "user2",
  //   email: "desenvolupador2@iesjoanramis.org",
  //   password_hash: "961408558045f2698f3f273e593aade113310696f8b85dcb5f4887d26118e8de",
  //   salt: "85da85a60855172eb579e23b282169c4",
  //   edit_users: true,
  //   edit_news: true,
  //   edit_bone_files: true,
  //   active: true,
  //   is_first_login: true
  // };

  // users.push(new_user);
  // localStorage.setItem('users', JSON.stringify(users));

  let userTableDesktopHead = `
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
        </thead>`;

  let userTableDesktopClose = `
      </table>
  `;


  $("#users-section").append(userTableDesktopHead);
  // Obtener por cada usuario sus datos y añadirlos a una tabla individual
  users.forEach(user => {
    
    /* --- Tabla mobile --- */
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
                <a href="">Editar</a> <!-- Verificación para no poder eliminar usuario admin -->
                ${user.name != "admin" ? `<a href="">Eliminar</a>` : ""} 
              </div>
            </td>
          </tr>
        </tbody>
      </table>`;

      /* --- Filas para tabla Desktop --- */
      let userTableDesktopBody = `
          <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.edit_bone_files ? "F," : ""} ${user.edit_news ? "N," : ""} ${user.edit_users ? "U" : ""}</td>
            <td>${user.active ? "Sí" : "No"}</td>
            <td class="user-management-td">
              <div class="user-management-div">
                <a href="">Editar</a>
                 ${user.name != "admin" ? `<a href="">Eliminar</a>` : ""} 
              </div>
            </td>
          </tr>`;

      $(".user-table-desktop").append(userTableDesktopBody);
      
      $("#users-section").append(userTable); // Tabla de movil
    
  });
  $(".user-table-desktop").append(userTableDesktopClose);

  // Añadir el cierre del section al html
  $("main").append(usersCloseSection);
});