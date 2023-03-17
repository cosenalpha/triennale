const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".text-container");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

gsap.to(".textleft", {
    duration: 8,
    scrollTrigger: {
        trigger: ".i-container",
        start: "top 50%",
        end: "bottom 80%",
        scrub: 4,
        toggleActions: "restart none none none",
        pin: ".textleft",
        markers: true,
        pinSpacing: true
    }
})