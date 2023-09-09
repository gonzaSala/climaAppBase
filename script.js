let urlBase = 'https://api.openweathermap.org/data/2.5/weather'
let api_key = '7ff9d9cbc57e623b505e441ad526179c'
let difKelvin = 273.15;
const loaders = document.getElementById('loader');
loaders.style.display = 'none'



document.getElementById('botonBusqueda').addEventListener('click', () => {
    const ciudad = document.getElementById('ciudadEntrada').value
    if (ciudad) {
        fetchDatosClima(ciudad)
    }
    else {
        // Mostrar un mensaje de error en lugar de realizar la búsqueda
        mostrarError("Por favor, ingrese una ciudad válida.");
    }
})

function fetchDatosClima(ciudad) {
    loaders.style.display = 'block'
    fetch(`${urlBase}?q=${ciudad}&appid=${api_key}`)
        .then(response => {
            if (!response.ok) {
                mostrarError("No se encontraron datos para la ciudad ingresada.");
                loaders.style.display = 'none'; 
                throw new Error("No se encontraron datos para la ciudad ingresada.");
            }
            return response.json();
        })
        .then(data => mostrarDatosClima(data))
        .catch(error => {
            console.error(error); 
            loaders.style.display = 'none'; 
        });
}


function mostrarDatosClima(data) {
    loaders.style.display = 'none'
    const divDatosClima = document.getElementById('datosClima')
    divDatosClima.innerHTML = ''
    const ciudadNombre = data.name
    const paisNombre = data.sys.country
    const temperatura = data.main.temp
    const humedad = data.main.humidity
    const descripcion = data.weather[0].description
    const icono = data.weather[0].icon


    const ciudadTitulo = document.createElement('h2')
    ciudadTitulo.textContent = `${ciudadNombre}, ${paisNombre}`

    const temperaturaInfo = document.createElement('p')
    temperaturaInfo.textContent = `La temperatura es: ${Math.floor(temperatura - difKelvin)}ºC`

    const humedadInfo = document.createElement('p')
    humedadInfo.textContent = `La humedad es: ${humedad}%`

    const iconoInfo = document.createElement('img')
    iconoInfo.src = `https://openweathermap.org/img/wn/${icono}@2x.png`


    const descripcionInfo = document.createElement('p')
    descripcionInfo.textContent = `La descripción meteorológica es: ${descripcion}`

    divDatosClima.appendChild(ciudadTitulo)
    divDatosClima.appendChild(temperaturaInfo)
    divDatosClima.appendChild(humedadInfo)
    divDatosClima.appendChild(iconoInfo)
    divDatosClima.appendChild(descripcionInfo)
}
function mostrarError(mensaje) {
    const divDatosClima = document.getElementById('datosClima');
    divDatosClima.innerHTML = '';
    const errorMensaje = document.createElement('p');
    errorMensaje.textContent = mensaje;
    divDatosClima.appendChild(errorMensaje);
}
