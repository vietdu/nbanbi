/*===== MENU SHOW Y HIDDEN =====*/
const navMenu = document.getElementById('nav-menu'),

    toggleMenu = document.getElementById('nav-toggle'),
    closeMenu = document.getElementById('nav-close'),
    dangnhapMenu = document.getElementById('dangnhap-menu'),
    dangnkyMenu = document.getElementById('dangky-menu'),
    closedangnhap=document.getElementById('dangnhap'),
    closedangnhap1=document.getElementById('dangnhap1'),
    closedangnhap2=document.getElementById('dangnhap2'),
    closedangnhap3=document.getElementById('dangnhap3'),
    closedangnhap4=document.getElementById('out'),
    closedangnhap5=document.getElementById('out1')
    
  

// SHOW
toggleMenu.addEventListener('click', ()=>{
    navMenu.classList.toggle('show')
})
closedangnhap.addEventListener('click', ()=>{
  dangnhapMenu.classList.toggle('andangnhap'),
  navMenu.classList.remove('show')
})
closedangnhap1.addEventListener('click', ()=>{
  dangnhapMenu.classList.toggle('andangnhap'),
  dangnkyMenu.classList.add('dangky')
})
closedangnhap2.addEventListener('click', ()=>{
  dangnhapMenu.classList.toggle('andangnhap'),
  dangnkyMenu.classList.remove('dangky')
})
closedangnhap3.addEventListener('click', ()=>{
  dangnhapMenu.classList.toggle('andangnhap'),
  dangnkyMenu.classList.add('dangky'),
  dangnhapMenu.classList.remove('andangnhap')
})
closedangnhap4.addEventListener('click', ()=>{
  dangnhapMenu.classList.toggle('andangnhap'),
  dangnkyMenu.classList.add('dangky')
})
closedangnhap5.addEventListener('click', ()=>{
  
  dangnkyMenu.classList.add('dangky')
  
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
        const y = (-window.innerWidth  -e.pageY*speed)/240

        layer.style.transform = `translateX(${x}px) translateY(${y}px)`
    })
    
}

/*SCROLL ABOUT*/
srr.reveal('.about__img', {delay: 500})
srr.reveal('.about__subtitle', {delay: 350})
srr.reveal('.about__profession', {delay: 400})
srr.reveal('.about__text', {delay: 500})
srr.reveal('.about__social-icon', {delay: 600, interval: 200})


window.onscroll = function() {myFunction()};

var header2 = document.getElementById("myheader2");
var sticky = header2.offsetTop;
var w = window.innerWidth;
var banner1 = document.getElementById("banner_id1");
var banner_zom1 = banner1.offsetTop;
var banner2 = document.getElementById("banner_id2");
var banner_zom2 = banner2.offsetTop;
var banner3 = document.getElementById("banner_id3");
var banner_zom3 = banner3.offsetTop;




function myFunction() {

  
  if (((window.pageYOffset+125) > (sticky-1))) {
    header2.classList.add("sticky");
    


    if (((window.pageYOffset+1000) > banner_zom1)) {
      banner1.classList.add("banner_zom");
    } 
    else{
      banner1.classList.remove("banner_zom");
    }

    
    if (((window.pageYOffset+350) > banner_zom2)) {
      banner2.classList.add("banner_zom");
    } 
    else{
      banner2.classList.remove("banner_zom");
    }
    if (((window.pageYOffset+350) > banner_zom3)) {
      banner3.classList.add("banner_zom");
    } 
    else{
      banner3.classList.remove("banner_zom");
    }
  


  } 
  else  {
    header2.classList.remove("sticky");
    banner2.classList.remove("banner_zom");
  }

}



/*contact*/

srr.reveal('.contact__subtitle', {})
srr.reveal('.contact__text', {interval: 200})
srr.reveal('.contact__input', {delay: 400})
srr.reveal('.contact__button', {delay: 600})


/*====== ANIMATE GSAP ======*/
/*Navbar*/
gsap.from('.nav__logo', {opacity:0, duration: 3, delay: .7, y: 30, ease:'expo.out'});
gsap.from('.nav__toggle', {opacity:0, duration: 3, delay: .7, y: 30, ease:'expo.out'});
gsap.from('.nav__item', {opacity: 0, duration: 3, delay: .7, y: 35, ease:'expo.out', stagger: .2})

/*Text*/

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

function myFunction1() {
  document.getElementById("banner_id1").style.visibility = "visible";
  document.getElementById("khoangtrang").style.visibility = "hidden";
  location.href = "#khoangtrang";
}

const srr1 = ScrollReveal({
  origin: 'left',
  distance: '80px',
  duration: 2000,
  reset: this,
})

srr1.reveal('.form_bn2', {delay: 450})

const srr2 = ScrollReveal({
  origin: 'right',
  distance: '80px',
  duration: 2000,
  reset: this,
})

srr2.reveal('.form_bn3', {delay: 450})


const btnOpenVideo = document.querySelectorAll('.islands__video-content')
const islandsPopup = document.getElementById('popup')

function poPup(){
    islandsPopup.classList.add('show-popup')
}
btnOpenVideo.forEach(b => b.addEventListener('click', poPup))

const btnCloseVideo = document.getElementById('popup-close')

btnCloseVideo.addEventListener('click', ()=> {
    islandsPopup.classList.remove('show-popup')
})
