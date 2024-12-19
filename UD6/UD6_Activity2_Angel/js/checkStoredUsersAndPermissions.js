/* Incicializar elementos */
let logout_a = "";
let admin_a = "";
let login_bar = "";

/* Función para comprobar si el usuario no ha iniciado sesión,
ocultándole elementos no necesarios/permitidos */
function checkLogout() {
  /* Elementos DOM para ser ocultados o mostrados */
  admin_a = $(".user-admin-bar");
  logout_a = $(".logout-bar");
  login_bar = $(".login-bar");

  loggedUser = localStorage.getItem('loggedUser');

  if (!loggedUser) {
    $(logout_a).addClass("hide");
    $(admin_a).addClass("hide");
  } else if (loggedUser) {
    $(logout_a).removeClass("hide");
    $(admin_a).removeClass("hide");
    $(login_bar).addClass("hide");
  }
}

$(document).click(function () {


});

/* Verificar si hay usuarios en localStorage */
$(document).ready(function () {
  checkLogout(logout_a, admin_a);
  // Si no existen usuarios guardados, crear uno por defecto
  if (!localStorage.getItem('users')) {

    // Encriptación password
    // let password = "Ramis.20"; 
    // let salt = generateSalt();
    // let saltedPassword = password + salt;
    // let passwordHash = CryptoJS.SHA256(saltedPassword).toString();

    // console.log(salt);
    // console.log(passwordHash);

    // const keys = {
    //   hash: passwordHash,
    //   salt: salt
    // };

    // Creación usuario por defecto
    let defaultUser = {
      id: 1,
      name: "admin",
      email: "desenvolupador@iesjoanramis.org",
      password_hash: "961408558045f2698f3f273e593aade113310696f8b85dcb5f4887d26118e8de",
      salt: "85da85a60855172eb579e23b282169c4",
      edit_users: true,
      edit_news: true,
      edit_bone_files: true,
      active: true,
      is_first_login: true
    };
    
    // Guardar usuario por defecto en LS
    localStorage.setItem('users', JSON.stringify([defaultUser]));
    console.log(defaultUser);
  }

  
  // Al pulsar logout en header, si hay un usuario loggeado, deslogear
  $(logout_a).on("click", function (event) {
    let loggedUser = localStorage.getItem('loggedUser');
    
    if (loggedUser) {
      localStorage.removeItem('loggedUser');
      console.log("Sesión cerrada");
      
      checkLogout();
    }

  });

});
