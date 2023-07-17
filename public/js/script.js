'use strict'
// funcionalidad carrusel
const carrouselSlice = document.querySelector('.carrousel__slice');
const carrousePunto = document.querySelectorAll('.carrousel__punto');

carrousePunto.forEach( ( cadaPunto , i )=> {
    carrousePunto[i].addEventListener('click',()=>{
        let posicion  = i;
        let operacion = posicion * -33;

        carrouselSlice.style.transform = `translateX(${ operacion }%)`;

        carrousePunto.forEach( ( cadaPunto , i )=>{
            carrousePunto[i].classList.remove('active');
        })
        carrousePunto[i].classList.add('active');
    })
})
console.log("que poronga este carrusel");

// funcionalidad menu-desplegable

const menu = document.querySelector(".header__menu-burger");
const menuDesplegado = document.querySelector(".menu__desplegable");


menu.addEventListener("click",()=>{
    menu.classList.toggle("active");
    menuDesplegado.classList.toggle("desplegado");
})