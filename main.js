'use strict';

//Opening or closing side bar

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function() {elementToggleFunc(sidebar); })

//Activating Modal-testimonial

const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');

const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const testimonialsModalFunc = function () {
    modalContainer.classList.toggle('active');
    overlay.classList.toggle('active');
}

for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener('click', function () {
        modalImg.src = this.querySelector('[data-testimonials-avatar]').src;
        modalImg.alt = this.querySelector('[data-testimonials-avatar]').alt;
        modalTitle.innerHTML = this.querySelector('[data-testimonials-title]').innerHTML;
        modalText.innerHTML = this.querySelector('[data-testimonials-text]').innerHTML;

        testimonialsModalFunc();
    })
}

//Activating close button in modal-testimonial

modalCloseBtn.addEventListener('click', testimonialsModalFunc);
overlay.addEventListener('click', testimonialsModalFunc);

//Activating Filter Select and filtering options

const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');

select.addEventListener('click', function () {elementToggleFunc(this); });

for(let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener('click', function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);

    });
}

const filterItems = document.querySelectorAll('[data-filter-item]');

const filterFunc = function (selectedValue) {
    for(let i = 0; i < filterItems.length; i++) {
        if(selectedValue == "all") {
            filterItems[i].classList.add('active');
        } else if (selectedValue == filterItems[i].dataset.category) {
            filterItems[i].classList.add('active');
        } else {
            filterItems[i].classList.remove('active');
        }
    }
}

//Enabling filter button for larger screens 

let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
    
    filterBtn[i].addEventListener('click', function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        lastClickedBtn.classList.remove('active');
        this.classList.add('active');
        lastClickedBtn = this;

    })
}

/* Enabling Contact Form

const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

for(let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener('input', function () {
        if(form.checkValidity()) {
            formBtn.removeAttribute('disabled');
        } else { 
            formBtn.setAttribute('disabled', '');
        }
    })
}
*/

// Enabling Page Navigation 
const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

navigationLinks.forEach(link => {
  link.addEventListener('click', () => {
    const targetPage = link.dataset.navLink;

    // Remove active from all pages and links
    pages.forEach(page => page.classList.remove('active'));
    navigationLinks.forEach(nav => nav.classList.remove('active'));

    // Activate matching page and link
    const target = document.querySelector(`[data-page="${targetPage}"]`);
    if (target) {
      target.classList.add('active');
      link.classList.add('active');
      window.scrollTo(0, 0);
    }
  });
});





let currentSlide = 0;

function moveSlide(direction) {
    const wrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    currentSlide += direction;

    // Loop back to start/end
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }

    // Calculate the move distance
    const offset = -currentSlide * 100;
    wrapper.style.transform = `translateX(${offset}%)`;
}




// ======================
// Enhanced Contact Form
// ======================

const form = document.querySelector('#contact-form');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');
const formStatus = document.querySelector('[data-form-status]');

const updateButtonState = () => {
    const isValid = form.checkValidity();
    formBtn.disabled = !isValid;
    
    // Optional: subtle visual feedback
    formBtn.style.opacity = isValid ? '1' : '0.65';
};

formInputs.forEach(input => {
    input.addEventListener('input', updateButtonState);
    input.addEventListener('blur', () => {
        input.classList.toggle('invalid', !input.validity.valid);
    });
});

formInputs.forEach(input => {
    input.addEventListener('input', function () {
        if (input.validity.valid) {
            input.classList.remove('invalid');
        } else {
            input.classList.add('invalid');
        }
    });
});

// Form submission (demo – replace with your backend or Formspree/Netlify/etc)
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Disable button during submission
    formBtn.disabled = true;
    formBtn.innerHTML = '<span>Sending...</span>';
    
    // Simulate sending (replace with real fetch/AJAX)
    try {
        // Example with Formspree or any endpoint
        // const response = await fetch('https://formspree.io/your@email', {
        //     method: 'POST',
        //     body: new FormData(form),
        //     headers: { 'Accept': 'application/json' }
        // });
        
        // For demo purposes only:
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        formStatus.textContent = 'Message sent successfully! Thank you.';
        formStatus.className = 'form-status success';
        form.reset();
        formBtn.disabled = true;
        updateButtonState();
        
    } catch (error) {
        formStatus.textContent = 'Sorry, something went wrong. Please try again.';
        formStatus.className = 'form-status error';
    } finally {
        setTimeout(() => {
            formStatus.textContent = '';
            formStatus.className = 'form-status';
            formBtn.innerHTML = '<ion-icon name="paper-plane-outline"></ion-icon><span>Send Message</span>';
        }, 5000);
    }

    
});