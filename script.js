const tarea = document.getElementById('tarea');
const form = document.getElementById('form-data');
const resultado = document.getElementById('tareasPorHacer');

const tareas = [];

function crearTarea() {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        limpiarHtml();
        let task = tarea.value;
        tareas.push({'id': Date.now(), 'tarea' :task, estado : false})
        tareas.forEach(e => {
            crearTareaHtml(e.tarea)
        });
        
        //console.log(tareas);
    });
}

//Crear HTML para mostrar tarea.

function crearTareaHtml(t){
    let nuevoParrafo = document.createElement('p');
    let contenido = document.createTextNode(t)
    nuevoParrafo.appendChild(contenido);
    resultado.appendChild(nuevoParrafo);
};

function limpiarHtml(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

//Registrar tarea en arreglo


crearTarea();