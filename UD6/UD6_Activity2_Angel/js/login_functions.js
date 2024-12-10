/* Login functions */

// Función cifrar contraseña
function hashPassword(password, salt) {
  return CryptoJS.SHA256(password + salt).toString();
}

// Función validar contraseña
function validatePassword(password, hash, salt) {
  const passwordHash = hashPassword(password, salt);
  return passwordHash == hash;
}

// Función generar salt para contraseña
function generateSalt() {
  return CryptoJS.lib.WordArray.random(16).toString();
}

// Funcion para comprobar la longitud de la contraseña
function validatePasswordLength(password, min, max) {
  if (password.value.length < min ) {
    console.log(password, ' ha de tenir al menys ' + min + " caràcters");
  } else if (password.value.length > max) {
    console.log(password, ' ha de tenir màxim ' + max + " caràcters");
  } else {
    console.log(password);
  }
}

// Funcion para comprobar que el password tenga mínimo
// una minuscula, mayuscula y un carácter especial
function validatePasswordSyntax(password) {
  
}