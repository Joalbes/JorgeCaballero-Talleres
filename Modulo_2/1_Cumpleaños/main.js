//Clase
class Persona {
  //Atributos
  cedula;
  nombres;
  apellidos;
  fechaNacimiento;
  edad;

  //constructor
  constructor(cedula, nombres, apellidos, fechaNacimiento, edad) {
    this.cedula = cedula;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.fechaNacimiento = fechaNacimiento;
    this.edad = edad;
  }

  //********************************* Métodos *****************************//
//*******************************************************************************//
//Calcula la edad de la persona  
cacularEdad(fecha) {
    this.edad = 2023 - parseFloat(fecha.slice(0, 4));
    return this.edad;
  }
//Genera nombre completo
  nombreCompleto() {
    let nombreCompleto = `${this.nombres} ${this.apellidos}`;
    return nombreCompleto;
  }
//Determina si la perosna está cumpliendo años
  birthday(fecha) {
    // Busca mes y dia actual
    const date = new Date();
    let mesActual = date.getMonth() + 1;
    let hoy = date.getDate();
    console.log(`mesActual:${mesActual}`);
    console.log(`hoy:${hoy}`);

    // Busca mes y dia de nacimiento
    let dateN = new Date(fecha);
    let mesNacimiento = parseFloat(dateN.getMonth()) + 1;
    let diaNacimiento = parseFloat(dateN.getDate()) + 1;
    console.log(`mesNacimiento:${mesNacimiento}`);
    console.log(`diaNacimiento:${diaNacimiento}`);

    if (hoy == diaNacimiento && mesActual == mesNacimiento) {
      return "Si";
    } else {
      return "No";
    }
  }
}

//*************Creacion del vector ***************//
//************************************************//

//variables
let fechaCumple;
let fechaActual = new Date();
let esDia = false;
let diasFaltantes;
let vectorDatos = [];
let vectorCedulas = [];
//variables bandera
let cedulaEsta = 0;

//Referencia a vistas en html
const cedulaP = document.querySelector("#cedula");
const nombreP = document.querySelector("#nombre");
const apellidosP = document.querySelector("#apellidos");
const fechaNacimientoP = document.querySelector("#fecha");
const btn = document.querySelector("#btn");
const btnlupa = document.querySelector("#btnlupa");
const formulario = document.querySelector("#formulario");
const nombreslistas = document.querySelector("#nombreslistas");
const cumplelistas = document.querySelector("#cumplelistas");
const listaCedulas = document.querySelector("#cedulas");
const inputCedula = document.querySelector("#inputcedula");
const informacumple = document.querySelector("#informacumple");

//Eventos
btn.addEventListener("click", imprimir);
formulario.addEventListener("submit", form);
btnlupa.addEventListener("click", buscarCedula);

//*********************************Funcion Imprimir *****************************//
//*******************************************************************************//
function imprimir() {
  //crecion de Objetos
  const usuario = new Persona(
    cedulaP.value,
    nombreP.value,
    apellidosP.value,
    fechaNacimientoP.value
  );
  usuario.edad = usuario.cacularEdad(fechaNacimientoP.value);
  vectorDatos.push(usuario);
  vectorCedulas.push(usuario.cedula);
  //datos tabla
  nombreslistas.innerHTML += `<p id="nombrelista" >${usuario.nombreCompleto()}</p>`;
  cumplelistas.innerHTML += `<p id="cumplelistas" >${usuario.birthday(fechaNacimientoP.value)}</p>`;
  //validando si cumple años
  if (usuario.birthday(fechaNacimientoP.value) == "Si") {
    esDia = true;
  } else {
    esDia = false;
  }
}

//*********************************Funcion bloquear formulario *****************************//
//*******************************************************************************//
function form(e) {
  e.preventDefault();
}

//*********************************Funcion Buscar cedula  *****************************//
//*******************************************************************************//
function buscarCedula() {
  vectorCedulas.forEach((element) => {
    listaCedulas.innerHTML += `<option value="${element}"></option>`;
  });
// Rellenado con numeros de cedula el input.
  vectorCedulas.forEach((element) => {
    console.log(`input: ${inputCedula.value}`);
    console.log(`Elemento del array: ${element}`);
    if (inputCedula.value == element) {
      console.log("cedula esta");
      cedulaEsta = 1;
    }
  });
//calculo de dias faltantes
  diasFaltantes = periodoDiasFaltantes();
//Almacenamiento en el local storage
  localStorage.setItem("nombreCompleto", `${nombreP.value} ${apellidosP.value}`);
  localStorage.setItem("Fecha Cumpleaños",`Día:${fechaNacimientoP.value.slice(8,10)} del mes:${fechaNacimientoP.value.slice(5, 7)}`);
  localStorage.setItem("Cumple Años", esDia);
  localStorage.setItem("Dias faltantes", diasFaltantes);
//validadndo si existe cedula
  if (cedulaEsta == 0) {
    informacumple.innerHTML = `<p class="text-center text-2xl font-bold text-orange-600  p-[1rem]">Cédula no exite</p>`;
  } else {
    cedulaEsta = 0;
    location.href = "index2.html";
  }
}
//*********************************Funcion dias Faltantes *****************************//
//*******************************************************************************//
function periodoDiasFaltantes() {
  // Busca mes y dia actual
  let date = new Date();
  let mesActual = date.getMonth() + 1;
  let hoy = date.getDate();
  let fechaActual = `2023-${mesActual}-${hoy}`;
  fechaActual = new Date(fechaActual);
  console.log(`fechaActual: ${fechaActual}`);

  // Busca mes y dia de nacimiento
  let dateN = new Date(fechaNacimientoP.value);
  let mesNacimiento = parseFloat(dateN.getMonth()) + 1;
  let diaNacimiento = parseFloat(dateN.getDate()) + 1;
  let fechaCumple = `2023-${mesNacimiento}-${diaNacimiento}`;
  fechaCumple = new Date(fechaCumple);
  console.log(`fechaCumple: ${fechaCumple}`);
// Calculando el numero de dias faltantes
  let diasFaltantes = (fechaCumple - fechaActual) / (1000 * 60 * 60 * 24);
  console.log(`diasFaltantes: ${diasFaltantes}`);
  return diasFaltantes;
}
