(function(){

    const botonMenu = document.querySelector('#menu-despregable');
    const menu = document.querySelector('#mobile-menu');

    const botonMenuPerfil = document.querySelector('#user-menu-button');
    const menuPerfil = document.querySelector('#menu-perfil')

    botonMenu.addEventListener('click', ()=>{
        if(menu.classList.contains('hidden')){
            menu.classList.remove('hidden');
        } else {
            menu.classList.add('hidden');
        }
    })

    botonMenuPerfil.addEventListener('click', ()=>{
        if(menuPerfil.classList.contains('hidden')){
            menuPerfil.classList.remove('hidden');
        } else {
            menuPerfil.classList.add('hidden');
        }
    })
    
})()