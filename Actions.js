let verificacion='';

fetch('/Usuario_Contraseña.json')
.then(response => response.json())
.then(data => {
    verificacion=data;
})

const usuario=document.getElementById('usuario');
const contrasenia=document.getElementById('contrasenia');
const boton=document.getElementById('aceptar');
const ediciones=document.getElementsByClassName('editar');
const cerrar=document.getElementsByClassName('cerrar');
const login_logout=document.getElementById('Login');
const modal = new bootstrap.Modal(document.getElementById('ModalLogin'));

boton.addEventListener('click', (e) => {
    if(usuario.value==verificacion.usuario && contrasenia.value==verificacion.contrasenia){
        usuario.value="";
        contrasenia.value="";
        modal.toggle();
        login_logout.setAttribute("class", "Salir btn btn-danger btn-sm bi-box-arrow-left");
        login_logout.removeAttribute("data-bs-toggle");
        login_logout.removeAttribute("data-bs-target");
        login_logout.innerHTML=" Salir";
        for(let i=0; i<ediciones.length; i++)
            ediciones[i].setAttribute("class", "editar btn btn-success bi-pencil-fill rounded-circle");
        for(let i=0; i<cerrar.length; i++)
            cerrar[i].setAttribute("class", "cerrar btn btn-success bi-x-lg rounded-circle");
    }
    else console.log("INAVÁLIDO");
})

login_logout.addEventListener('click', (e) => {
    if(login_logout.getAttribute("class") == "Salir btn btn-danger btn-sm bi-box-arrow-left"){
        login_logout.setAttribute("class", "Login btn btn-success btn-sm bi-pencil-fill");
        login_logout.setAttribute("data-bs-toggle", "modal");
        login_logout.setAttribute("data-bs-target", "#ModalLogin");
        login_logout.innerHTML=" Editar";
        for(let i=0; i<ediciones.length; i++)
            ediciones[i].setAttribute("class", "editar btn btn-success bi-pencil-fill rounded-circle d-none");
        for(let i=0; i<cerrar.length; i++)
            cerrar[i].setAttribute("class", "cerrar btn btn-success bi-x-lg rounded-circle d-none");
    }
})