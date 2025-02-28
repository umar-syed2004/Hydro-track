const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", () => {
    //Toggle mobile menu visibility
    document.body.classList.toggle("show-mobile-menu");
});

//Close menu when clicking on a close button
menuCloseButton.addEventListener("click", () => menuOpenButton.click());


//Initialize Swiper
const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    grabCursor: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // Enable autoplay
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },

    //Responsive breakpoints
    breakpoints: {
        0: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 3
        }
    }
});


// Modal functionality
document.addEventListener('DOMContentLoaded', () => {
    const signupModal = document.getElementById('signup-modal');
    const loginModal = document.getElementById('login-modal');
    const signupBtn = document.getElementById('signup-btn');
    const loginBtn = document.getElementById('login-btn');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const switchToLoginLink = document.getElementById('switch-to-login');
    const switchToSignupLink = document.getElementById('switch-to-signup');
    const fadeElements = document.querySelectorAll(".fade-in");
    const observerOptions = {
        threshold: 0.2, // Trigger when 20% of the element is visible
    };
    let lastScrollY = window.scrollY;
    // Open signup modal
    // signupBtn.addEventListener('click', () => {
    //     signupModal.style.display = 'block';
    // });

    // Open Sign-Up Modal
    document.getElementById("signup-btn").addEventListener("click", () => {
        signupModal.style.display = "block";
    });


    // Open Login Modal
    document.getElementById("login-btn").addEventListener("click", () => {
        loginModal.style.display = "block";
    });


    // Open login modal
    // loginBtn.addEventListener('click', () => {
    //     loginModal.style.display = 'block';
    // });

    // Close modal when clicking on close button
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            signupModal.style.display = 'none';
            loginModal.style.display = 'none';
        });
    });

    // Close modal when clicking outside of modal
    window.addEventListener('click', (event) => {
        if (event.target === signupModal) {
            signupModal.style.display = 'none';
        }
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });

    // Switch between login and signup modals
    switchToLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        signupModal.style.display = 'none';
        loginModal.style.display = 'block';
    });

    switchToSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'none';
        signupModal.style.display = 'block';
    });

    // Signup form submission (placeholder)
    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add signup logic here (e.g., Firebase authentication)
        alert('Signup form submitted');
    });

    // Login form submission (placeholder)
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add login logic here (e.g., Firebase authentication)
        alert('Login form submitted');
    });

    // Social login buttons (placeholders)
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Add social login logic here (e.g., Firebase social authentication)
            alert(`Attempting ${button.textContent} login`);
        });
    });

    // const observer = new IntersectionObserver((entries) => {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting) {
    //             entry.target.classList.add("visible"); // Fade in when in view
    //         } else {
    //             entry.target.classList.remove("visible"); // Fade out when out of view
    //         }
    //     });
    // });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Add visible class when element enters viewport
                    entry.target.classList.add("visible");
                    entry.target.classList.remove("fade-out");
                } else {
                    // Determine scroll direction based on bounding rect
                    const rect = entry.target.getBoundingClientRect();
                    if (rect.top > window.innerHeight) {
                        // Element exited from bottom while scrolling up
                        entry.target.classList.add("fade-out");
                    } else {
                        // Reset for reverse scrolling
                        entry.target.classList.remove("visible", "fade-out");
                    }
                }
            });
        },
        { threshold: 0.2 } // Adjust threshold for trigger sensitivity
    );

    fadeElements.forEach((el) => observer.observe(el));

    

});




