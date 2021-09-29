const tarea = document.getElementById('tarea');
const form = document.getElementById('form-data');
const resultado = document.getElementById('tareasPorHacer');

const tareas = [];

function crearTarea() {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let task = tarea.value;
        tareas.push({'id': Date.now(), 'tarea' :task, estado : false})
        crearTareaHtml(tareas[0].tarea)
        console.log(tareas);
    });
}

//Crear HTML para mostrar tarea.

function crearTareaHtml(t){
    let nuevoParrafo = document.createElement('p');
    let contenido = document.createTextNode(t)
    nuevoParrafo.appendChild(contenido);
    resultado.appendChild(nuevoParrafo);
};


//Registrar tarea en arreglo


crearTarea();