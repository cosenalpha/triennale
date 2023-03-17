gsap.registerPlugin(ScrollTrigger);


//hamburger menu mobile

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".text-container");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

//scroll pin

let mm = gsap.matchMedia();

mm.add("(min-width: 600px)", () => {
    gsap.to("#text1", {
        duration: 8,
        scrollTrigger: {
            trigger: "#scenario",
            start: "top 10%",
            end: "bottom 40%",
            scrub: 4,
            toggleActions: "restart none none none",
            pin: "#text1",
            markers: true,
            pinSpacing: false
        }
  });
});

mm.add("(min-width: 600px)", () => {
    gsap.to("#text2", {
        duration: 8,
        scrollTrigger: {
            trigger: "#concept",
            start: "top 10%",
            end: "bottom 60%",
            scrub: 4,
            toggleActions: "restart none none none",
            pin: "#text2",
            markers: true,
            pinSpacing: false
        }
  });
});

mm.add("(min-width: 600px)", () => {
    gsap.to("#text3", {
        duration: 8,
        scrollTrigger: {
            trigger: "#interazione",
            start: "top 10%",
            end: "bottom 65%",
            scrub: 4,
            toggleActions: "restart none none none",
            pin: "#text3",
            markers: true,
            pinSpacing: false
        }
  });
});

