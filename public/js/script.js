'use strict'
// nodos carruoselBanner
const carrouselSlice = document.querySelector(".carrousel__slice");
const carrousePunto = document.querySelectorAll(".carrousel__punto");
const carrouselSection = document.querySelectorAll(".carrousel__section");
// nodos menu
const menu = document.querySelector(".header__menu-burger");
const menuDesplegado = document.querySelector(".menu__desplegable");

// funcionalidad menu-desplegable
    menu.addEventListener("click",()=>{
    menu.classList.toggle("active");
    menuDesplegado.classList.toggle("desplegado");
})

// funcionalidad carrusel
// automatizacion del carrousel para desplazarce
setInterval(()=>{
    slice()
},7000);

let operacion = 0;
let contador = 0;
let tamañoSlice = 100 / carrouselSection.length; 

function slice(){
    if(contador >= carrouselSection.length-1){
        contador = 0;
        operacion = 0;
        carrouselSlice.style.transform = `translate(-${operacion}%)`;
        return
    }else{
        contador++
        operacion = operacion + tamañoSlice;
        carrouselSlice.style.transform = `translate(-${operacion}%)`;
        carrouselSlice.style.transition = "all ease .6s";
    };
}

// puntos para navegar en el carrusel
carrousePunto.forEach( ( cadaPunto , i )=> {
    carrousePunto[i].addEventListener("click",()=>{
        let posicion  = i;
        let operacion = posicion * -33;

        carrouselSlice.style.transform = `translateX(${ operacion }%)`;

        carrousePunto.forEach( ( cadaPunto , i )=>{
            carrousePunto[i].classList.remove("active");
        })
        carrousePunto[i].classList.add("active");
    })
})



const carrouselProductsSlice = document.querySelector(".carrousel__products-slice");
const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");
const product = document.querySelectorAll(".product");
// funcionalidad carrouselProduct
arrowRight.addEventListener("click", e => sliceRight());
arrowLeft.addEventListener("click", e => sliceLeft());

    let operacionProducts = 0;
    let contadorProducts = 0;
    let tamañoSliceProducts = 100 / product.length; 

function sliceRight(){
    if(contadorProducts >= product.length-1){
        contadorProducts = 0;
        operacionProducts = 0;
        carrouselProductsSlice.style.transform = `translate(-${operacionProducts}%)`;
        carrouselProductsSlice.style.transition = "none";
        return;
    }else{
        contadorProducts++;
        operacionProducts = operacionProducts + tamañoSliceProducts;
        carrouselProductsSlice.style.transform = `translate(-${operacionProducts}%)`;
        carrouselProductsSlice.style.transition = "all ease .6s";
    }
}
// function sliceLeft() {
//     contadorProducts--;
//     if (contadorProducts < 0) {
//         contadorProducts = product.length - 1;
//         operacionProducts = tamañoSliceProducts * (product.length - 1);
//         carrouselProductsSlice.style.transition = "none";
//     } else {
//         operacionProducts = (operacionProducts - tamañoSliceProducts + 100) % 100;
//         carrouselProductsSlice.style.transition = "all ease .6s";
//     }
//     carrouselProductsSlice.style.transform = `translate(-${operacionProducts}%)`;
// }

function sliceLeft(){
    contadorProducts--;
    if (contadorProducts < 0 ) {
        contadorProducts = product.length-1;
        operacionProducts = tamañoSliceProducts * (product.length-1);
        carrouselProductsSlice.style.transform = `translate(-${operacionProducts}%)`;
        carrouselProductsSlice.style.transition = "none";
        return
    } else{
        operacionProducts = operacionProducts - tamañoSliceProducts;
        carrouselProductsSlice.style.transform = `translate(-${operacionProducts}%)`;
        carrouselProductsSlice.style.transition = "all ease .6s"
    }
}