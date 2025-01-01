(function(html) {

    "use strict";

    html.className = html.className.replace(/\bno-js\b/g, '') + ' js ';


   /* Enhanced Animations
    * -------------------------------------------------- */
    const tl = anime.timeline({
        easing: 'easeInOutCubic',
        duration: 1200,
        autoplay: false
    })
    .add({
        targets: '#loader',
        opacity: [1, 0],
        scale: [1, 1.2],
        duration: 1000,
        begin: function(anim) {
            window.scrollTo(0, 0);
        }
    })
    .add({
        targets: '#preloader',
        opacity: [1, 0],
        scale: [1, 0.9],
        complete: function(anim) {
            document.querySelector("#preloader").style.visibility = "hidden";
            document.querySelector("#preloader").style.display = "none";
        }
    })
    .add({
        targets: '.s-header',
        translateY: [-150, 0],
        opacity: [0, 1],
        duration: 1000
    }, '-=300')
    .add({
        targets: [ '.s-intro .text-pretitle', '.s-intro .text-huge-title'],
        translateX: [150, 0],
        opacity: [0, 1],
        scale: [0.8, 1],
        delay: anime.stagger(300)
    })
    .add({
        targets: '.circles span',
        keyframes: [
            {opacity: [0, 0.4], scale: [0.8, 1]},
            {opacity: [0.4, 0.1], delay: anime.stagger(120, {direction: 'reverse'})}
        ],
        delay: anime.stagger(120, {direction: 'reverse'})
    })
    .add({
        targets: '.intro-social li',
        translateX: [-70, 0],
        opacity: [0, 1],
        scale: [0.8, 1],
        delay: anime.stagger(150, {direction: 'reverse'})
    })
    .add({
        targets: '.intro-scrolldown',
        translateY: [120, 0],
        opacity: [0, 1],
        rotate: ['10deg', '0deg']
    }, '-=900');


   /* Preloader
    * -------------------------------------------------- */
    const ssPreloader = function() {

        const preloader = document.querySelector('#preloader');
        if (!preloader) return;
        
        window.addEventListener('load', function() {
            document.querySelector('html').classList.remove('ss-preload');
            document.querySelector('html').classList.add('ss-loaded');

            document.querySelectorAll('.ss-animated').forEach(function(item){
                item.classList.remove('ss-animated');
            });

            tl.play();
        });

    }; // end ssPreloader


   /* Initialize
    * ------------------------------------------------------ */
    (function ssInit() {

        ssPreloader();

    })();

})(document.documentElement);
