const tareaInpu = document.getElementById('tarea');
const form = document.getElementById('form-data');
const resultado = document.getElementById('tareasPorHacer');

let tareas = [];

function documentoCargado() {
    form.addEventListener('submit', AgregarTarea);

    document.addEventListener('DOMContentLoaded', function(){

        tareas = JSON.parse(localStorage.getItem('task')) || [];

        crearTareaHtml();

    })
}

function AgregarTarea(e) {
    e.preventDefault()
    limpiarHtml();
    let task = tareaInpu.value;
    tareas.push({ 'id': Date.now(), 'tarea': task, estado: false });
    crearTareaHtml();
    form.reset();

}

//Crear HTML para mostrar tarea.

function crearTareaHtml() {

    if(tareas.length > 0){
        
        tareas.forEach(e => {
            const div = document.createElement('div');
            const parrafo = document.createElement('p');
            const iconoUno = document.createElement('i');
            const iconoDos = document.createElement('i');
        
            const contenidoParrafo = document.createTextNode(e.tarea);
        
            div.classList.add('task');
            iconoUno.classList.add('far', 'fa-check-square');
            iconoDos.classList.add('fas', 'fa-trash');
        
        
            parrafo.appendChild(contenidoParrafo);
        
            div.appendChild(parrafo);
            div.appendChild(iconoUno);
            div.appendChild(iconoDos);
        
            resultado.appendChild(div)
        })
    }

    enviarDatosLS();
}

function enviarDatosLS(){
    localStorage.setItem('task', JSON.stringify(tareas));
}

function limpiarHtml() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

//Registrar tarea en arreglo


documentoCargado();