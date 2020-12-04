import Anuncio_Auto from "./Anuncio_Auto.js";
import crearTabla from "./gestionTablas.js";

let listaEntidades = [];
let nextId;
const divTabla = fnGet("divTabla");
const Divcustom = fnGet("custom");
export const btnLimpiarTabla = fnGet("btnLimpiarTabla");
export const btnBaja = fnGet("btnBaja");
export const btnModificar = fnGet("btnModificar");
export const btnCancelar = fnGet("btnCancelar");
export const btnGuardar = fnGet("btnGuardar");
const form = document.forms[0];




window.addEventListener('load', inicializarManejadores);

function inicializarManejadores() {

    listaEntidades = obtenerEntidades();
    actualizarLista("Bienvenidx");
    nextId = obtenerId();
   

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        if (confirm("Este anuncio será dado de alta, ¿Desea Continuar?")) {
            AltaEntidad();
        }

    });

}


 btnLimpiarTabla.addEventListener('click', function (e) {

    btnBaja.classList.add('deshabilitar');
    btnModificar.classList.add('deshabilitar');
    btnGuardar.classList.remove('deshabilitar');
    actualizarLista("Hola de nuevo");

 });




btnModificar.addEventListener('click', (e) => {
    e.preventDefault();
    let camposCompletos = document.forms[0].checkValidity();
    if (camposCompletos) {
        if (confirm("Este anuncio será modificado, ¿Desea Continuar?")) {
            modificarEntidad();
            
        }
    } else {
        alert("Debe completar todos los campos");
    }

});

btnBaja.addEventListener('click', (e) => {
    if (confirm("Este anuncio será dado de baja, ¿Desea Continuar?")) {
        bajaEntidad();
        
    }
});

btnCancelar.addEventListener('click', (e) => {
  
    window.location.reload();
    limpiarCampos();

});


function modificarEntidad() {
    let idAnuncio = parseInt(fnGet("txtId").value);
    for (let i = 0; i < listaEntidades.length; i++) {
        if (listaEntidades[i].id === idAnuncio) {
            listaEntidades[i].titulo = fnGet('txtTitulo').value;
            listaEntidades[i].descripcion = fnGet('txtDescripcion').value;
            listaEntidades[i].precio = fnGet('numbPrecio').value;
            if (fnGet('rdoV').checked) {
                listaEntidades[i].transaccion = "venta";
            } else {
                listaEntidades[i].transaccion = "alquiler";
            }
            listaEntidades[i].puertas = fnGet('numbPuertas').value;
            listaEntidades[i].KMS = fnGet('numbKMs').value;
            listaEntidades[i].potencia = fnGet('numbPotencia').value;
            listaEntidades[i].frenos = checkboxTildado(fnGet('frenos_ok').checked);
            listaEntidades[i].luces = checkboxTildado(fnGet('luces_ok').checked);
            listaEntidades[i].aceite = checkboxTildado(fnGet('aceite_ok').checked);

            if (fnGet('rdoU').checked) {
                listaEntidades[i].estado = "Usado";
            } else {
                listaEntidades[i].estado = "Nuevo";
            }
            break;
        }
    }

    guardarDatos();
    actualizarLista("Modificacion realizada con exito");
    limpiarCampos();
}

function bajaEntidad() {
    let idAnuncio = parseInt(fnGet("txtId").value);
    for (let i = 0; i < listaEntidades.length; i++) {
        if (listaEntidades[i].id === idAnuncio) {
            listaEntidades.splice(i, 1);
            guardarDatos();
            actualizarLista("Baja realizada con exito");
            limpiarCampos(); 
            window.location.reload();
            break;
        }
    }

   
}


function AltaEntidad() {

    var id = nextId;
    var txtTitulo = fnGet('txtTitulo').value;
    var txtTranVenta = fnGet('rdoV').checked;
    var transaccion = "venta";
    if (txtTranVenta === false) {
        transaccion = "alquiler";
    }
    var kilometros = fnGet('numbKMs').value;
    var txtDescripcion = fnGet('txtDescripcion').value;
    var txtPrecio = fnGet('numbPrecio').value;
    var txtPuertas = fnGet('numbPuertas').value;
    var txtPotencia = fnGet('numbPotencia').value;
    var frenos_ok = checkboxTildado(fnGet('frenos_ok').checked);
    
    var luces_ok = checkboxTildado(fnGet('luces_ok').checked);
    var aceite_ok = checkboxTildado(fnGet('aceite_ok').checked);

    var estado = fnGet('rdoU').checked;
    var tipoEstado = "Usado";
    if (estado === false) {
        transaccion = "Nuevo";
    }


    let nuevaEntidad = new Anuncio_Auto(id, txtTitulo, transaccion, txtDescripcion, txtPrecio, txtPuertas, kilometros, txtPotencia, frenos_ok, luces_ok, aceite_ok, tipoEstado);

    if (nuevaEntidad) {
        listaEntidades.push(nuevaEntidad);
        nextId++;
        guardarDatos(listaEntidades, nextId);
        actualizarLista("Alta realizada con exito");
    }
}

function fnGet(id) {
    return document.getElementById(id);
}

function actualizarLista(msg) {
    if (divTabla) {
        if (localStorage.length !== 0) {
            divTabla.textContent = "";
        }
    }
    if(Divcustom)
    {
        Divcustom.innerHTML = "";
        let msgEnviar = document.createElement('p');
      
        msgEnviar.textContent = msg;
        Divcustom.appendChild(msgEnviar);
    }
        divTabla.innerHTML = "";
        let table = crearTabla(listaEntidades);
        divTabla.appendChild(Spinner());



        setTimeout(() => {
            divTabla.innerHTML = "";
            divTabla.appendChild(table);

        }, 3000);
    
    

}

function limpiarCampos() {
    fnGet('txtTitulo').value = '';
    fnGet('txtDescripcion').value = '';
    fnGet('numbPrecio').value = '';
    fnGet('rdoV').checked = true;
    fnGet('rdoA').checked = false;
    fnGet('numbPuertas').value = '';
    fnGet('numbKMs').value = '';
    fnGet('numbPotencia').value = '';
    fnGet('frenos_ok').checked = false;
    fnGet('luces_ok').checked = false;
    fnGet('aceite_ok').checked = false;
    fnGet('rdoU').checked = true;
    fnGet('rdoN').checked = false;
    
    

}


function Spinner() {
    var spinner = document.createElement('img');
    spinner.setAttribute('src', './images/AUTO.gif');
    spinner.setAttribute('alt', 'spinner');
    spinner.width = 200;
    return spinner;
}

function obtenerEntidades() {
    return JSON.parse(localStorage.getItem('ENTIDAD')) || [];
}

function obtenerId() {
    return JSON.parse(localStorage.getItem('nextId')) || 1;
}

function guardarDatos() {
    localStorage.setItem('ENTIDAD', JSON.stringify(listaEntidades));
    localStorage.setItem('nextId', nextId);
}

function checkboxTildado(checkBox)
{
    if(checkBox === true)
    {
        return "SI";
    }else
    {
        return "NO";
    }
}
