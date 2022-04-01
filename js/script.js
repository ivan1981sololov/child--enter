const body = document.querySelector('body')
var active = document.getElementsByClassName('active');
const header = document.querySelector('.header'); 
const burgerIcon = header.querySelector('.burger-icon');
const burger = document.querySelector('.burger');

const pointStartFixed = window.pageYOffset + document.querySelector('.home').getBoundingClientRect().bottom;

window.addEventListener('scroll', (e) =>{
    headerFixed()
    
}, true)


const sections = document.querySelectorAll('section');


 function offset(e1) {
      const rect = e1.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return {top:Math.round(rect.top + scrollTop), left: Math.round(rect.left + scrollLeft)};
}
    

 const headerFixed = () => {  
    const windowY = Math.round(document.documentElement.scrollTop);
    if(pointStartFixed <= windowY){
        header.classList.add('fixed')
    } else {
        if(header.classList.contains('fixed')){
            header.classList.add('fixed-hidden')
        }
        setTimeout(() => {
            header.classList.remove('fixed')
            header.classList.remove('fixed-hidden')
        }, 500);
    }
 }


const headerBurger = () => {
    
    
    burgerIcon.addEventListener('click', () => {
        body.classList.toggle('lock');
        burger.classList.toggle('active');
        
        if(!header.classList.contains('fixed') && !burgerIcon.classList.contains('active')){
            header.classList.add('fixed');
        } else if(!(pointStartFixed <= Math.round(document.documentElement.scrollTop))) {
            
            header.classList.remove('fixed');
        }
        burgerIcon.classList.toggle('active');
    })    
}
headerBurger()

const teamSwiper = new Swiper('.team-swiper', {
    // Default parameters
    observer:true,
    // width: 400,
    observeParents: true,
    slidesPerView: 1,   
    spaceBetween : 32,
    // watchOverflow: 32,
    loop: true,
    parallax: true,
    speed: 1000,
    slidesPerView: 1,
    spaceBetween: 10,
    direction: 'horizontal',
    
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'bullets',
    },
})


const anchors = document.querySelectorAll('a[href*="#"]')
for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const blockID = anchor.getAttribute('href').substr(1)
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    window.location.href.split('#')[0]

    if(burgerIcon.classList.contains('active')){
        body.classList.remove('lock');
        burgerIcon.classList.remove('active');
        burgerMenu.classList.remove('active');
    }
  })
}

const modalGallery = document.querySelector('.modal-gallery');

const modalGalleryInit = () => {
    
    
    const openModalBtns = document.querySelectorAll('.gallery-item');
    const closeModalBtn = modalGallery.querySelector('.modal-gallery__close');
    openModalBtns.forEach(item => {
        item.addEventListener('click', () => {
            tempalteGallerySwiper(item.dataset.gallery)
            initialSwiperGallery();
            modalGallery.classList.add('active');
        })
    })
    closeModalBtn.addEventListener('click', () => {
        modalGallery.classList.remove('active');
    })
}

const images = {
    parties: {
        quantity: 6,     
    }
}

const tempalteGallerySwiper = (gallery) => {
    
    const arrTemplate = [];
    const quantity = images[gallery].quantity;
    console.log(Array(quantity))
    
    for (let index = 0; index < quantity; index++) {
        const tempalte = `
        <div class="swiper-slide">
            <div class="swiper-slide__img swiper-zoom-container">
                <img src="img/${gallery}/${index+1}.png"/>
            
            </div>
        </div>`
        arrTemplate.push(tempalte)
    }
    modalGallery.querySelector('.swiper-wrapper').innerHTML = arrTemplate.join(' ')

}

const initialSwiperGallery = () => {
    const swiperGallery = new Swiper('.swiper-gallery', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
      
        zoom: {
            maxRatio: 3,
            minRatio:1
        },
        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            type: 'bullets',
        },  
      
        // Navigation arrows
        
        
        // And if we need scrollbar
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
      });

}


modalGalleryInit();


const form = document.querySelector('form');
const input = form.querySelector('input');

form.addEventListener('submit', (e) => {
    e.preventDefault()
    inputValidate(input.value);
})

const validateEmail = (email) => {
    return String(email)
    .toLowerCase()
    .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const inputValidate = (text) => {
    const mail =  validateEmail(text);
    
    if(mail != null) {
        form.classList.remove('fail');
        input.value = '';
        input.placeholder = 'Ваш e-mail';
    } else {
        form.classList.add('fail');
        input.value = '';
        input.placeholder = 'Правильно введите e-mail';
    }
}

