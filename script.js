// ============================================
// Mobile Menu
// ============================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
}

function closeMobileMenu() {
    if (hamburger) hamburger.classList.remove('active');
    if (mobileMenu) mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
}

if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeMobileMenu);
    });
}

// ============================================
// Contact Form (Formspree)
// ============================================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const form = this;
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;

        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(function (response) {
            if (response.ok) {
                form.innerHTML = '<div style="text-align: center; padding: 60px 20px; background: #f0f9f4; border-radius: 12px;"><h3 style="color: #059669; font-size: 26px; margin-bottom: 16px;">Thank You</h3><p style="font-size: 17px; color: #1a1a1a; margin-bottom: 12px;">Your inquiry has been received.</p><p style="font-size: 15px; color: #666;">Our team will respond within 48 hours to schedule a discovery call.</p></div>';
            } else {
                throw new Error('Submission failed');
            }
        })
        .catch(function () {
            alert('There was a problem submitting your form. Please email us directly at hello@avacompli.com');
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        });
    });
}

// ============================================
// Insights Carousel
// ============================================
const track = document.querySelector('.insights-track');
const slides = document.querySelectorAll('.insight-slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (track && slides.length && prevBtn && nextBtn) {
    let currentIndex = 0;

    function getSlidesToShow() {
        const w = window.innerWidth;
        if (w < 768) return 1;
        if (w < 1024) return 2;
        return 3;
    }

    function getMaxIndex() {
        return Math.max(slides.length - getSlidesToShow(), 0);
    }

    function updateCarousel() {
        const slideWidth = slides[0].offsetWidth + 24;
        track.style.transform = 'translateX(-' + (currentIndex * slideWidth) + 'px)';
    }

    prevBtn.addEventListener('click', function () {
        currentIndex = Math.max(currentIndex - 1, 0);
        updateCarousel();
    });

    nextBtn.addEventListener('click', function () {
        currentIndex = Math.min(currentIndex + 1, getMaxIndex());
        updateCarousel();
    });

    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            currentIndex = Math.min(currentIndex, getMaxIndex());
            updateCarousel();
        }, 150);
    });
}
