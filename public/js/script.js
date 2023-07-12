'use strict'

const grande    = document.querySelector('.carrousel__slice')
const punto     = document.querySelectorAll('.carrousel__punto')


punto.forEach( ( cadaPunto , i )=> {

    punto[i].addEventListener('click',()=>{

        let posicion  = i

        let operacion = posicion * -33

        grande.style.transform = `translateX(${ operacion }%)`

        punto.forEach( ( cadaPunto , i )=>{

            punto[i].classList.remove('active')
        })
        punto[i].classList.add('active')

    })
})
console.log("que poronga este carrusel")