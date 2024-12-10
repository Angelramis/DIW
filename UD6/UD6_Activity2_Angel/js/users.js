/* Verificar si hay usuario en localStorage */

$(document).ready(function () {

  // Si no existe el usuario, crearlo 
  if (!localStorage.getItem('users')) {

    // Encriptación password
    let password = "Ramis.20"; 
    let salt = generateSalt();
    let saltedPassword = password + salt;
    let passwordHash = CryptoJS.SHA256(saltedPassword).toString();

    // const keys = {
    //   hash: passwordHash,
    //   salt: salt
    // };

    // Creación usuario
    let defaultUser = {
      id: 1,
      name: "admin",
      email: "desenvolupador@iesjoanramis.org",
      password_hash: passwordHash,
      salt: salt,
      edit_users: true,
      edit_news: true,
      edit_bone_files: true,
      active: true,
      is_first_login: true
    };
    
    // Guardar usuario en LS
    localStorage.setItem('users', JSON.stringify([defaultUser]));
    console.log(defaultUser);
  }


  

});