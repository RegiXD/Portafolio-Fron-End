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

function readImage(file, img) {
    if (file.type && !file.type.startsWith('image/')) {
      console.log('File is not an image.', file.type, file);
      return;
    }
  
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        file.src = event.target.result;
        if(img=="banner")
            document.getElementById("banner").setAttribute("style", "background-image: url("+ file.src +")");
        else if(img=="perfil")
            document.getElementById("img").setAttribute("style", "background-image: url("+ file.src +")");
    });
    reader.readAsDataURL(file);
  }

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

function Borrar(id1, id2){
    console.log("borra lo que vas a editar");
    document.getElementById(id1).innerHTML="";
    document.getElementById(id2).innerHTML="";
}

function Control(ap, nom, id1, id2, id3, id4){
    if(document.getElementById(id3).value==="" || document.getElementById(id4).value===""){
        console.log("coloca los valores que estaban" + ap + nom);
        document.getElementById(id1).innerHTML=ap;
        document.getElementById(id2).innerHTML=nom;
    } 
    else{
        document.getElementById(id1).innerHTML = document.getElementById(id3).value;
        document.getElementById(id2).innerHTML = document.getElementById(id4).value;
        console.log("coloca nuevos valores");
    }
}

function cuandoSeHaceClick(i, arch){
    if(!arch) i+=3;
    else i+=1;
    switch(i){
        case 1:
            console.log("boton banner");
            edicionesarch[0].addEventListener('change', (e) => {
                let file=e.target.files[0];
                readImage(file, "banner");
            })
            break;
        case 2:
            console.log("boton perfil");
            edicionesarch[1].addEventListener('change', (e) => {
                let file=e.target.files[0];
                readImage(file, "perfil");
            })
            break;
        case 3:
            let ap, nom;
            ap=document.getElementById('Apellido').innerHTML;
            nom=document.getElementById('Nombre').innerHTML;
            collapseElementList[0].addEventListener('shown.bs.collapse', ()=> {Borrar('Apellido', 'Nombre')}, {once: true});
            collapseElementList[0].addEventListener('hide.bs.collapse', ()=> {Control(ap, nom, 'Apellido', 'Nombre', 'apellido', 'nombre')}, {once: true});
            document.getElementById('apellido').value="";
            document.getElementById('nombre').value="";
            break;
        case 4:
            let tit, bio;
            tit=document.getElementById('tituloDes').innerHTML;
            bio=document.getElementById('Biografia').innerHTML;
            collapseElementList[1].addEventListener('shown.bs.collapse', ()=> {Borrar('tituloDes', 'Biografia')}, {once: true});
            collapseElementList[1].addEventListener('hide.bs.collapse', ()=> {Control(tit, bio, 'tituloDes', 'Biografia', 'tituloDesarrollo', 'biografia')}, {once: true});
            document.getElementById('tituloDesarrollo').value="";
            console.log(document.getElementById('biografia').value="");
            break;
    }
}