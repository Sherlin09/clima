const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
})

function buscarClima(e) {
    e.preventDefault();

    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if(ciudad === '' || pais === '') {
        mostrarError('Ambos campos son obligartorios');

        return;
    }

    consultarAPI(ciudad, pais);
}

function mostrarError(mensaje){
    const alerta = document.querySelector('.bd-red-100');

    if(!alerta) {
        const alerta = document.createElement('div');

    alerta.classList.add('bd-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded',
    'max-w-md', 'mx-auto', 'mt-6', 'text-center');

    alerta.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block">${mensaje}</span>
    `;
    container.appendChild(alerta);

    setTimeout(() => {
        alerta.remove();
    }, 5000);
    }

}

function consultarAPI(ciudad, pais){

    const appId = '5ba6ef6f88107296d5c4d1466c010f4d';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`

    fetch(url)
        .then( respuesta => respuesta.json())
        .then( datos => {
            console.log(datos);
            if(datos.cod === "404") {
                mostrarError('Ciudad no encontrada')
            }
        })

}
