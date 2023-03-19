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

const itversion = document.getElementById('itversion');
		const enversion = document.getElementById('enversion');
		const italianText = document.querySelectorAll('.it');
		const englishText = document.querySelectorAll('.en');

		itversion.addEventListener('click', function(event) {
			event.preventDefault();
			italianText.forEach(function(element) {
      element.style.display = 'block';
    });
      englishText.forEach(function(element) {
      element.style.display = 'none';
    });
			itversion.classList.add('active');
			enversion.classList.remove('active');
      itversion.style.opacity = '1';
      enversion.style.opacity = '0.3';
		});

		enversion.addEventListener('click', function(event) {
			event.preventDefault();
			englishText.forEach(function(element) {
      element.style.display = 'block';
    });
      italianText.forEach(function(element) {
      element.style.display = 'none';
    });
			enversion.classList.add('active');
			itversion.classList.remove('active');
      enversion.style.opacity = '1';
      itversion.style.opacity = '0.3';
		});









 



