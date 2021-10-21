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

        //cantidad();
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
        clean();
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
            const iconoCompletar = document.createElement('a');
            const iconoEliminar = document.createElement('a');

            //Div para dar estilo a iconos
            const divIconos = document.createElement('div');
            //Clase para dar estilo a divIconos
            divIconos.classList.add('seccionIconos')

            iconoCompletar.onclick = () => {
                completarTarea(e.id);
            }

            iconoEliminar.onclick = () => {
                eliminarTask(e.id);
            }

            const contenidoParrafo = document.createTextNode(e.tarea);

            div.classList.add('task');
            
            iconoCompletar.classList.add('far', 'fa-check-square');
            iconoEliminar.classList.add('fas', 'fa-trash');

            iconoCompletar.setAttribute('id', e.id)
            iconoEliminar.setAttribute('id', e.id)

            parrafo.appendChild(contenidoParrafo);

            div.appendChild(parrafo);

            //Agregar a divIconos iconos
            divIconos.appendChild(iconoCompletar);
            divIconos.appendChild(iconoEliminar);

            //div.appendChild(iconoCompletar);
            
            //div.appendChild(iconoEliminar);

            //Agregar divIconos al div principal
            div.appendChild(divIconos);

            resultado.appendChild(div)
            if(e.estado === true) {
                div.classList.add('tareaCompleta');
                divIconos.removeChild(iconoCompletar)
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
        resultado.removeChild(resultado.lastChild);
    }
}

function clean(){
    while(tareasCompletadas.lastChild){
        tareasCompletadas.removeChild(tareasCompletadas.lastChild);
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

const eliminarTask = (id) => {
    let opcion = confirm('Quieres eliminar la tarea?');
    if(opcion){
        tareas = tareas.filter( (tarea) => tarea.id != id)
    }else{

    }
    
    clean();
    limpiarHtml();
    crearTareaHtml();
    enviarDatosLS();
    //cantidad();

}

/* function cantidad(){
    let t = tareas.length;
    console.log(t);
    
    let parrafoss = document.createElement('span');
    let contenidoss = document.createTextNode(t);

    parrafoss.appendChild(contenidoss);

    totalTareas.appendChild(parrafoss)

} */



documentoCargado();
