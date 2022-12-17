let verificacion='';

fetch('/Usuario_Contraseña.json')
.then(response => response.json())
.then(data => {
    verificacion=data;
})

const usuario=document.getElementById('usuario');
const contrasenia=document.getElementById('contrasenia');
const boton=document.getElementById('aceptar');
const ediciones=document.querySelectorAll('.editar');
const edicionesarch=document.querySelectorAll('.editararch');
const editarch=document.querySelectorAll('.editarch');
const cerrar=document.getElementsByClassName('cerrar');
const login_logout=document.getElementById('Login');
const modal = new bootstrap.Modal(document.getElementById('ModalLogin'));
const collapseElementList = document.querySelectorAll('.collapse')
const collapseList = [...collapseElementList].map(collapseEl => new bootstrap.Collapse(collapseEl, {toggle: false}))
const input= document.getElementsByClassName('input');
const formulario=document.getElementById('form');
const divInvalidU = document.createElement("div");
const divInvalidC = document.createElement("div");
const CI =document.createTextNode("contraseña invalida");
const UI =document.createTextNode("uasuario invalido");
divInvalidU.setAttribute("class", "invalid-feedback");
divInvalidC.setAttribute("class", "invalid-feedback");
divInvalidU.appendChild(UI);
divInvalidC.appendChild(CI);

boton.addEventListener('click', (e) => {
    logearse();
})

document.addEventListener('keydown', (e) => {
    if(modal._isShown){
        if(e.code==='Enter'){
            logearse();
        }
    }
    else if(e.code==='Enter') e.preventDefault();
})

function logearse(e){
    if(usuario.value==verificacion.usuario && contrasenia.value==verificacion.contrasenia){
        usuario.value="";
        contrasenia.value="";
        modal.toggle();
        login_logout.setAttribute("class", "Salir btn btn-danger btn-sm bi-box-arrow-left");
        login_logout.removeAttribute("data-bs-toggle");
        login_logout.removeAttribute("data-bs-target");
        login_logout.innerHTML=" Salir";
        edicionesarch[0].setAttribute("class", "editararch btn bi-pencil-fill");
        edicionesarch[1].setAttribute("class", "editararch btn bi-pencil-fill");
        for(let i=0; i<ediciones.length; i++)
            ediciones[i].setAttribute("class", "editar btn btn-success bi-pencil-fill rounded-circle");
        for(let i=0; i<cerrar.length; i++)
            cerrar[i].setAttribute("class", "cerrar btn btn-success bi-x-lg rounded-circle");
    }
    else{
        if(contrasenia.value!==verificacion.contrasenia){
            input[1].setAttribute("class", "input form-control is-invalid");
        }
        else input[1].setAttribute("class", "input form-control is-valid");

        if(usuario.value!==verificacion.usuario){
            input[0].setAttribute("class", "input form-control is-invalid");
        }
        else input[0].setAttribute("class", "input form-control is-valid");
    } 
}

login_logout.addEventListener('click', (e) => {
    if(login_logout.getAttribute("class") == "Salir btn btn-danger btn-sm bi-box-arrow-left"){
        login_logout.setAttribute("class", "Login btn btn-success btn-sm bi-pencil-fill");
        login_logout.setAttribute("data-bs-toggle", "modal");
        login_logout.setAttribute("data-bs-target", "#ModalLogin");
        login_logout.innerHTML=" Editar";
        edicionesarch[0].setAttribute("class", "editararch btn bi-pencil-fill d-none");
        edicionesarch[1].setAttribute("class", "editararch btn bi-pencil-fill d-none");
        for(let i=0; i<ediciones.length; i++)
            ediciones[i].setAttribute("class", "editar btn btn-success bi-pencil-fill rounded-circle d-none");
        for(let i=0; i<cerrar.length; i++)
            cerrar[i].setAttribute("class", "cerrar btn btn-success bi-x-lg rounded-circle d-none");
    }
})

ediciones.forEach((btn, i) => {
    btn.addEventListener('click', (e) => {
        cuandoSeHaceClick(i, false);
    });
});

editarch.forEach((btn, i) => {
    btn.addEventListener('click', (e) => {
        cuandoSeHaceClick(i, true);
    });
});

function cuandoSeHaceClick(i, arch){
    if(!arch) i+=3;
    else i+=1;
    switch(i){
        case 1:
            console.log("boton banner");
            break;
        case 2:
            console.log("boton perfil");
            break;
        case 3:
            let ap, nom;
            ap=document.getElementById('Apellido').innerHTML;
            nom=document.getElementById('Nombre').innerHTML;
            collapseElementList[0].addEventListener('shown.bs.collapse', function() {
                console.log("borra lo que vas a editar");
                document.getElementById('Apellido').innerHTML="";
                document.getElementById('Nombre').innerHTML="";
            })

            collapseElementList[0].addEventListener('hide.bs.collapse', function() {
                if(document.getElementById('apellido').value==="" || document.getElementById('nombre').value===""){
                    console.log("coloca los valores que estaban" + ap + nom);
                    document.getElementById('Apellido').innerHTML=ap;
                    document.getElementById('Nombre').innerHTML=nom;
                } 
                else{
                    document.getElementById('Apellido').innerHTML = document.getElementById('apellido').value;
                    document.getElementById('Nombre').innerHTML = document.getElementById('nombre').value;
                    console.log("coloca nuevos valores");
                }
              })
              document.getElementById('apellido').value="";
              document.getElementById('nombre').value="";
            break;
        case 4:
            console.log("boton biografia");
            break;
    }
}