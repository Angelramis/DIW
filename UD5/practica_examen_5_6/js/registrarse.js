$(function () {
  
  // Variables DOM
  let formRegistrarse = $("#registrarse-form");


  // EVENTOS
  // Al pulsar boton registrarse formulario
  formRegistrarse.on("submit", function(e){
    e.preventDefault();
    // Capturar datos inputs
    let correo = $("#correo-cuenta").val().trim();
    let pwd = $("#pwd-cuenta").val().trim();

    // Verificación inputs
    if (correo == "" || pwd == "") {
      alert("Los campos no pueden estar vacíos.");
    }

    // Encriptar contraseña
    let salt = generateSalt();
    let saltedPassword = pwd + salt;
    let passwordHash = CryptoJS.SHA256(saltedPassword).toString();

    // Obtener datos de keys.json
    $.getJSON("/data/keys.json", function (data) {
      console.log("Datos actuales en keys.json:", data);
    }); 
  
    // Añadir salt y hash a keys.json
    let pwdGuardado = {
      "hash": passwordHash,
      "salt": salt
    }

    // Añadir el pwd encriptado al archivo keys.json
    

  });


});