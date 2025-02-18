

// FUNCIONES

// Cifrar contraseña
function hashPassword(password, salt) {
  return CryptoJS.SHA256(password + salt).toString();
}

// Generar salt para cifrar más seguro la contraseña
function generateSalt() {
  return CryptoJS.lib.WordArray.random(16).toString();
}

// Validar contraseña al iniciar sesión
function validarPassword(password, hash, salt) {
  const passwordHash = hashPassword(password, salt);
  return passwordHash === hash;
}



