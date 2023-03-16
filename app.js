const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".text-container");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}


let progetti = Array.from(document.querySelectorAll(".nome-progetto")) 
let immagini = Array.from(document.querySelectorAll("#container-immagine img"))

console.log(progetti, immagini)

for(let i = 0; i < progetti.length; i++) {

    progetti[i].addEventListener("mouseenter", attivaImmagine)

    function attivaImmagine() {immagini[i].style.display = "block"}

    
    progetti[i].addEventListener("mouseleave", disattivaImmagine)

    function disattivaImmagine() {immagini[i].style.display = "none"}

}