const marca = document.querySelector('#marca');
const yearFilter = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');


const resultado = document.querySelector('#resultado');
//Fecha
const max = new Date().getFullYear();
const min = max - 12;

let marcaSeleccionada;
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
    img: ''
}


document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos();
    addYears();

    //Creamos los eventos para cuando cambias de opciones en los filtros
    for (let i = 0; i <= 6; i++) {
        const variables = [marca, yearFilter, minimo, maximo, puertas, transmision, color];

        variables[i].addEventListener('change', e => {

            datosBusqueda[e.target.id] = e.target.value
            filtrarAuto();
        });
    }
});

function mostrarAutos() {
    autos.forEach(auto => {

        const { marca, modelo, year, precio, puertas, color, transmision, img } = auto;

        const imagenHTML = document.createElement('img');
        const autoHTML = document.createElement('p');
        autoHTML.textContent = `
        ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio}$ - Color: ${color}
        `;

        imagenHTML.src = 'img/' + img;


        resultado.appendChild(autoHTML);
        resultado.appendChild(imagenHTML);

    });
}

function addYears() {

    for (let index = max; index >= min; index--) {
        const opcion = document.createElement('option');

        opcion.value = index;
        opcion.textContent = index;

        //Si es el año actual pongo otro texto
        if (index == max) {
            opcion.textContent = `${index} -Actual-`
        }

        yearFilter.appendChild(opcion);

    }
}

//Filtra en base a la busqueda
function filtrarAuto() {
    const resultadoFiltro = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMin).filter(filtrarprecioMax).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);

    //Mostrar el resultado en pantalla
    borrarResultado();
    resultadoFiltro.forEach((auto) => {
        const imagenHTML = document.createElement('img');

        const resultadoHTML = document.createElement('p');
        const { marca, year, precio, puertas, transmision, color, img } = auto;

        resultadoHTML.innerHTML = `
            ${marca} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio}$ - Color: ${color}
        `;
        imagenHTML.src = 'img/' + img;

        //Metemos el resultado en el HTML

        resultado.appendChild(resultadoHTML);
        resultado.appendChild(imagenHTML);


    })

    if (resultado.childElementCount == 0) {
        const resultadoHTML = document.createElement('p');
        resultadoHTML.innerHTML = 'Sin resultados';

        resultado.appendChild(resultadoHTML);
    }
}
//Filtrar por marca
function filtrarMarca(auto) {
    const { marca } = datosBusqueda;
    if (marca) {
        return auto.marca === marca
    }
    return auto;
}
//Filtrar por año
function filtrarYear(auto) {
    const { year } = datosBusqueda;
    if (year) {
        return auto.year == year
    }
    return auto;
}
//Filtrar por precio minimo
function filtrarMin(auto) {
    const { minimo } = datosBusqueda
    if (minimo) {
        return auto.precio >= minimo;
    }

    return auto;
}
//Filtrar por precio máximo
function filtrarprecioMax(auto) {
    const { maximo } = datosBusqueda;

    if (maximo) {
        return auto.precio <= maximo;
    }

    return auto;
}
//Filtrar por puertas
function filtrarPuertas(auto) {
    const { puertas } = datosBusqueda
    if (puertas) {
        return auto.puertas == puertas;
    }

    return auto;
}
//Filtrar por transmision
function filtrarTransmision(auto) {
    const { transmision } = datosBusqueda
    if (transmision) {
        return auto.transmision == transmision;
    }

    return auto;
}
//Filtrar por transmision
function filtrarColor(auto) {
    const { color } = datosBusqueda
    if (color) {
        return auto.color == color;
    }

    return auto;
}

function borrarResultado() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}