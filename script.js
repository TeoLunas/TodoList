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

/*function crearTareaHtml(t){
    let nuevoParrafo = document.createElement('p');
    let contenido = document.createTextNode(t)
    nuevoParrafo.appendChild(contenido);
    nuevoParrafo.classList.add('border', 'border-secondary', 'rounded-pill', 'w-50', 'text-center', 'mt-3')
    resultado.appendChild(nuevoParrafo);
};*/

function crearTareaHtml(t){
    const div = document.createElement('div');
    const parrafo = document.createElement('p');
    const iconoUno = document.createElement('i');
    const iconoDos = document.createElement('i');

    const contenidoParrafo = document.createTextNode(t);

    div.classList.add('task');
    iconoUno.classList.add('far', 'fa-check-square');
    iconoDos.classList.add('fas', 'fa-trash');


    parrafo.appendChild(contenidoParrafo);

    div.appendChild(parrafo);
    div.appendChild(iconoUno);
    div.appendChild(iconoDos);
    
    resultado.appendChild(div)

}

function limpiarHtml(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

//Registrar tarea en arreglo


crearTarea();