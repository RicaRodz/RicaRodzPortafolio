
// Scroll animations
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    });
    
    // Section animations on scroll
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
    threshold: 0.25
    };
    
    const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        }
    });
    }, observerOptions);
    
    sections.forEach(section => {
    observer.observe(section);
    });
});
