/*===== MENU SHOW Y HIDDEN =====*/
const navMenu = document.getElementById('nav-menu'),
    toggleMenu = document.getElementById('nav-toggle'),
    closeMenu = document.getElementById('nav-close')

// SHOW
toggleMenu.addEventListener('click', ()=>{
    navMenu.classList.toggle('show')
})

// HIDDEN
closeMenu.addEventListener('click', ()=>{
    navMenu.classList.remove('show')
})
var rellax = new Rellax('.parallax');
const srr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: true
})

/*===== MOUSEMOVE HOME IMG =====*/
document.addEventListener('mousemove', move);
function move(e){
    this.querySelectorAll('.vietdu').forEach(layer =>{
      //  const speed = layer.getAttribute('data-speed')
        const speed =layer.getAttribute('data-speed')

        const x = (-window.innerWidth  -e.pageX*speed)/120
        const y = (-window.innerWidth  -e.pageY*speed)/120

        layer.style.transform = `translateX(${x}px) translateY(${y}px)`
    })
    
}

/*SCROLL ABOUT*/
srr.reveal('.about__img', {delay: 500})
srr.reveal('.about__subtitle', {delay: 300})
srr.reveal('.about__profession', {delay: 400})
srr.reveal('.about__text', {delay: 500})
srr.reveal('.about__social-icon', {delay: 600, interval: 200})
/*contact*/

srr.reveal('.contact__subtitle', {})
srr.reveal('.contact__text', {interval: 200})
srr.reveal('.contact__input', {delay: 400})
srr.reveal('.contact__button', {delay: 600})


/*====== ANIMATE GSAP ======*/
/*Navbar*/
gsap.from('.nav__logo', {opacity:0, duration: 3, delay: .5, y: 30, ease:'expo.out'});
gsap.from('.nav__toggle', {opacity:0, duration: 3, delay: .7, y: 30, ease:'expo.out'});
gsap.from('.nav__item', {opacity: 0, duration: 3, delay: .7, y: 35, ease:'expo.out', stagger: .2})

/*Text*/
gsap.from('.home__title', {opacity:0, duration: 3, delay: 1.3, y: 35, ease:'expo.out'});
gsap.from('.home__subtitle', {opacity:0, duration: 3, delay: 1.1 , y: 35, ease:'expo.out'});

/*Scroll*/
gsap.from('.home__scroll', {opacity:0, duration: 3, delay: 1.5, y: 25, ease:'expo.out'});


/*====== SCROLL REVEAL SECTION ======*/
const sr = ScrollReveal({
    duration: 2500,
    reset: true
});

/*Data*/
sr.reveal('.section__data',{origin: 'left',distance: '70px'}); 

/*Imgs*/
sr.reveal('.section__img',{origin: 'left',distance: '90px',delay: 200}); 

