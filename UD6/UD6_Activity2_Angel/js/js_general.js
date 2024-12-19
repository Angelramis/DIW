function displayPagesMenu(id) {
  document.getElementById(id).classList.toggle("show_menu");
}

/* ACCESSIBILITY */

/*Clase pasada como parámetro*/
function toggleContrast(contrastClass) {
  document.body.classList.toggle(contrastClass);
}

/*Font size*/
function toggleFontSize() {
  /*Eliminar clases si se han añadido antes*/
  document.body.classList.remove("font_size_small");
  document.body.classList.remove("font_size_medium");
  document.body.classList.remove("font_size_large");
  document.body.classList.remove("font_size_xlarge");

  /*Añadir clase correspondiente al valor del range*/
  fontSizeRange = document.getElementById('fontSizeRange');
  if (fontSizeRange.value == 0) {
    document.body.classList.toggle("font_size_small");
  } else if (fontSizeRange.value == 1) {
    document.body.classList.toggle("font_size_medium");
  } else if (fontSizeRange.value == 2) {
    document.body.classList.toggle("font_size_large");
  } else if (fontSizeRange.value == 3) {
    document.body.classList.toggle("font_size_xlarge");
  }
}

/*Line spacing*/
function toggleLineSpacing() {
  document.body.classList.remove("line_spacing_small");
  document.body.classList.remove("line_spacing_medium");
  document.body.classList.remove("line_spacing_large");
  document.body.classList.remove("line_spacing_xlarge");
  
  lineSpacingRange = document.getElementById('lineSpacingRange');
  if (lineSpacingRange.value == 0) {
    document.body.classList.toggle("line_spacing_small");
  } else if (lineSpacingRange.value == 1) {
    document.body.classList.toggle("line_spacing_medium");
  } else if (lineSpacingRange.value == 2) {
    document.body.classList.toggle("line_spacing_large");
  } else if (lineSpacingRange.value == 3) {
    document.body.classList.toggle("line_spacing_xlarge");
  }
}

/*Word spacing*/
function toggleWordSpacing() {
  document.body.classList.remove("word_spacing_small");
  document.body.classList.remove("word_spacing_medium");
  document.body.classList.remove("word_spacing_large");
  document.body.classList.remove("word_spacing_xlarge");
  
  wordSpacingRange = document.getElementById('wordSpacingRange');
  if (wordSpacingRange.value == 0) {
    document.body.classList.toggle("word_spacing_small");
  } else if (wordSpacingRange.value == 1) {
    document.body.classList.toggle("word_spacing_medium");
  } else if (wordSpacingRange.value == 2) {
    document.body.classList.toggle("word_spacing_large");
  } else if (wordSpacingRange.value == 3) {
    document.body.classList.toggle("word_spacing_xlarge");
  }
}


/*Letter spacing*/
function toggleLetterSpacing() {
  document.body.classList.remove("letter_spacing_small");
  document.body.classList.remove("letter_spacing_medium");
  document.body.classList.remove("letter_spacing_large");
  document.body.classList.remove("letter_spacing_xlarge");

  letterSpacingRange = document.getElementById('letterSpacingRange');
  if (letterSpacingRange.value == 0) {
    document.body.classList.toggle("letter_spacing_small");
  } else if (letterSpacingRange.value == 1) {
    document.body.classList.toggle("letter_spacing_medium");
  } else if (letterSpacingRange.value == 2) {
    document.body.classList.toggle("letter_spacing_large");
  } else if (letterSpacingRange.value == 3) {
    document.body.classList.toggle("letter_spacing_xlarge");
  }
}

/*Al clicar boton de accesibilidad, aplicar nueva apariencia*/
function activeButton(id) {
  button = document.getElementById(id);
  button.classList.toggle("active_button");
}
