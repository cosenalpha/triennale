gsap.registerPlugin(ScrollTrigger);

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".text-container");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}


let progetti = Array.from(document.querySelectorAll(".nome-progetto")) 
let immagini = Array.from(document.querySelectorAll("#container-immagine img"))

for(let i = 0; i < progetti.length; i++) {

    progetti[i].addEventListener("mouseenter", attivaImmagine)

    function attivaImmagine() {immagini[i].style.opacity = 1}

    
    progetti[i].addEventListener("mouseleave", disattivaImmagine)

    function disattivaImmagine() {immagini[i].style.opacity = 0}

}


//let mobile = window.matchMedia("(max-width: 600px)")

let mobile = window.matchMedia("(max-width: 600px)")

function update() {
  
  for(let i = 0; i < progetti.length; i++) {
    
    let y = progetti[i].getBoundingClientRect().y 
    let enter = 40 / 100 * window.innerHeight
    let escher = 59.3 / 100 * window.innerHeight

    if (y > enter && y < escher ) {
      progetti[i].querySelector(".border").style.opacity = 1
      progetti[i].querySelector(".fill").style.opacity = 0
      immagini[i].style.opacity = 1
    }
    else {
      progetti[i].querySelector(".fill").style.opacity = 1
      progetti[i].querySelector(".border").style.opacity = 0
      immagini[i].style.opacity = 0
    }
  }


}


if(mobile.matches) {

  setInterval(update, 6)  

  console.log("mobile device")

}

