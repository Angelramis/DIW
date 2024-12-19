/* Login functions */

// Función cifrar contraseña
function hashPassword(password, salt) {
  return CryptoJS.SHA256(password + salt).toString();
}

// Función validar contraseña
function validatePassword(password, hash, salt) {
  
  const passwordHash = hashPassword(password, salt);
  return passwordHash === hash;
}

// Función generar salt para contraseña
function generateSalt() {
  return CryptoJS.lib.WordArray.random(16).toString();
}

// Función para actualizar el parágrafo de errorHTML.
function showError(errorHTML, message) {
  errorHTML = $("#text_error");
  errorHTML.html(message);
}


// Función para comprobar sintaxis del password: 
// mínimo una minuscula, mayuscula, carácter especial, longitud mínima y máxima.
function validatePasswordSyntax(password) {
  let lowerLetters = /[a-z]/g;
  let upperLetters = /[A-Z]/g;
  let numbers = /[0-9]/g;
  let specialChars = "[!@#$%?=*&]";
  let correctSyntax = true;
  let errorHTML = ""; 
  
  // Validar longitud
  if (password.length < 12 ) {
    showError(errorHTML, "La contrasenya ha de tenir al menys 12 caràcters.");
    return;
  } else if (password.length > 25) {
    showError(errorHTML, "La contrasenya ha de tenir màxim 25 caràcters.");
    return;
  }

  // Validar carácteres
  if (!password.match(lowerLetters)) {
    correctSyntax = false;
  }

  if (!password.match(upperLetters)) {
    correctSyntax = false;
  }

  if (!password.match(numbers)) {
    correctSyntax = false;
  }

  if (!password.match(specialChars)) {
    correctSyntax = false;
  }

  if (correctSyntax == false) {
    showError(errorHTML, "La contrassenya requireix al menys una lletra minúscula, majúscula i un carácter especial.");
  }
}