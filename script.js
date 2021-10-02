const tareaInpu = document.getElementById('tarea');
const form = document.getElementById('form-data');
const resultado = document.getElementById('tareasPorHacer');
const inputTask = document.getElementById('inputTask');
const totalTareas = document.getElementById('totalTareas');
const tareasCompletadas = document.getElementById('tareasCompletadas');

let tareas = [];
let tareasTerminadas = [];

function documentoCargado() {
    form.addEventListener('submit', AgregarTarea);

    document.addEventListener('DOMContentLoaded', function () {

        tareas = JSON.parse(localStorage.getItem('task')) || [];
        
        crearTareaHtml();

    })
}

function AgregarTarea(e) {
    e.preventDefault()
    limpiarHtml();
    let task = tareaInpu.value;
    if (task === "") {
        error();
        crearTareaHtml();
        form.reset();
    } else {
        tareas.push({ 'id': Date.now(), 'tarea': task, estado: false });
        crearTareaHtml();
        form.reset();
    }
}

//Crear HTML para mostrar tarea.

function crearTareaHtml() {

    if (tareas.length > 0) {

        tareas.forEach(e => {
            const div = document.createElement('div');
            const parrafo = document.createElement('p');
            //const iconoUno = document.createElement('i');
            //const iconoDos = document.createElement('i');
            const iconoCompletar = document.createElement('a');
            const iconoEliminar = document.createElement('a');


            const contenidoParrafo = document.createTextNode(e.tarea);

            div.classList.add('task');
            //iconoUno.classList.add('far', 'fa-check-square');
            //iconoDos.classList.add('fas', 'fa-trash');
            iconoCompletar.classList.add('far', 'fa-check-square');
            iconoEliminar.classList.add('fas', 'fa-trash');

            iconoCompletar.setAttribute('id', e.id)
            iconoEliminar.setAttribute('id', e.id)

            iconoCompletar.onclick = () => {
                completarTarea(e.id);
            }

            parrafo.appendChild(contenidoParrafo);

            div.appendChild(parrafo);
            //div.appendChild(iconoUno);
            //div.appendChild(iconoDos);
            div.appendChild(iconoCompletar);
            div.appendChild(iconoEliminar);

            resultado.appendChild(div)
            if (e.estado === true) {
                div.classList.add('tareaCompleta');
                tareasCompletadas.appendChild(div);
               
            }
        })
    }

    enviarDatosLS();
}

function enviarDatosLS() {
    localStorage.setItem('task', JSON.stringify(tareas));
}

function limpiarHtml() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function clean(){
    while(tareasCompletadas.firstChild){
        tareasCompletadas.removeChild(tareasCompletadas.firstChild);
    }
}


function error() {
    tareaInpu.classList.add('error')
    setTimeout(function () {
        tareaInpu.classList.remove('error')

    }, 4000)
}

function completarTarea(id) {
    tareas.forEach(e => {
        if (id === e.id) {
            e.estado = true;
            clean();
            limpiarHtml();
            crearTareaHtml();
            enviarDatosLS();
        }
    })

}

function cantidad(){
    let t = tareas.length;
    console.log(t);

    totalTareas.value(t)
}

documentoCargado();
