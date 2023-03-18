const hamburger = document.querySelector(".hamburger");
const cross = document.querySelector("#cross");
const navMenu = document.querySelector(".text-container");
const body = document.querySelector("body");

hamburger.addEventListener("click", mobileMenu);
cross.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
  body.classList.toggle("stop");
}



 



