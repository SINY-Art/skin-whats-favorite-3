document.addEventListener("DOMContentLoaded", function(event) {
    findDevice()
    if(body.classList.contains('mobile') && window.innerWidth > window.innerHeight){
        body.classList.add('rotate')
    }
    detectTouchDevice()
    if(body.classList.contains('mouse')){
        hoverItems();
    }
    if(body.classList.contains('touch')){
        tapWrap();
    }
    window.addEventListener('resize', () => {
        let width;
        if(window.innerWidth != width){
            width = window.innerWidth;
            fix100vh()
        }
        if(body.classList.contains('mobile') && window.innerWidth > window.innerHeight){
            body.classList.add('rotate')
        } else {
            if(body.classList.contains('rotate')){
                body.classList.remove('rotate')
            }
        }
    })
});

window.addEventListener('load', () => {
    setTimeout(stopPreloader, 1500)
})

const wrap = document.querySelector('.wrap'),
    wrapItems = document.querySelectorAll('.wrap__item'),
    body = document.querySelector('body'),
    wrapInner = document.querySelector('.wrap__inner'),
    preloadSkin = document.querySelector('.preloader__skin'),
    preloader = document.querySelector('.preloader'),
    width = window.innerWidth;

const detectTouchDevice = () => {
    if ("ontouchstart" in document.documentElement) {
        body.classList.add('touch');
    } else {
        body.classList.add('mouse');
    }
}

function findDevice(){
    let detect = new MobileDetect(window.navigator.userAgent)
    if(detect.phone()){
        body.classList.add('mobile')
    } else {
        body.classList.add('no-mobile')
    }
}
let intervalPreloader;

function startPreload(){
    body.classList.add('locked')
    let imgs = preloadSkin.querySelectorAll('img');
    function generateIndexesArray(count) {
        let indexes = [];
        for (let i = 0; i < count; i++) {
            indexes.push(i);
        }
        return indexes;
        }
        function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        }
        function getNextImageIndex() {
        if (imageIndexes.length === 0) {
            imageIndexes = generateIndexesArray(imageCount);
            shuffleArray(imageIndexes);
        }
        return imageIndexes.pop();
        }
        
        let imageCount = imgs.length - 1;
        let imageIndexes = generateIndexesArray(imageCount);
        shuffleArray(imageIndexes);
        let nextImageIndex;
        let prevImageIndex;
        function showNextImage() {
        if(prevImageIndex || prevImageIndex === 0){
            imgs[prevImageIndex].style.opacity = 0
            
        } else {
            nextImageIndex = getNextImageIndex();
            imgs[nextImageIndex].style.opacity = 0
            prevImageIndex = nextImageIndex;
        }
        nextImageIndex = getNextImageIndex();
        prevImageIndex = nextImageIndex;

        imgs[nextImageIndex].style.opacity = 1
        }
    intervalPreloader = setInterval(showNextImage, 300);
}

startPreload()

function hoverItems(){
    wrapItems.forEach((item,i) => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('active')
            wrap.classList.add(`active${i+1}`)
        })
        item.addEventListener('mouseleave', () => {
            item.classList.remove('active')
            wrap.classList.remove(`active${i+1}`)
        })
    })
}

function fix100vh() {
    const doc = document.documentElement
    doc.style.setProperty('--app-height', `${window.innerHeight}px`)
}

function closeWrap(){
    if(!wrapInner.classList.contains('hide')){
        wrapInner.classList.add('hide')
    }
}

function tapWrap(){
    wrapItems.forEach((item,i) => {
        item.addEventListener('click', () => {
            if(!wrapInner.classList.contains('hide')){
                wrapInner.classList.add('hide')
            } else {
                if(!item.classList.contains('active')){
                    wrapItems.forEach((item,i) => {
                        if(wrap.classList.contains(`active${i+1}`)){
                            wrap.classList.remove(`active${i+1}`)
                        }
                        if(item.classList.contains('active')){
                            item.classList.remove('active')
                        }
                    })
                    item.classList.add('active')
                    if(!wrap.classList.contains(`active${i+1}`)){
                        wrap.classList.add(`active${i+1}`)
                    }
                } else {
                    item.classList.remove('active')
                    wrap.classList.remove(`active${i+1}`)
                    wrapItems.forEach((item,i) => {
                        if(wrap.classList.contains(`active${i+1}`)){
                            wrap.classList.remove(`active${i+1}`)
                        }
                        if(item.classList.contains('active')){
                            item.classList.remove('active')
                        }
                    })
                }
            }
        })
    })
}



function stopPreloader(){
    body.classList.remove('locked');
    preloader.classList.add('hide')
    setTimeout(closeWrap, 3000);
    clearInterval(intervalPreloader);
    function hidePreload(){
        preloader.classList.add('none')
    }
    setTimeout(hidePreload, 1000)
}

function showPolicy() {
    const banner = document.querySelector('.cookies-policy-banner');
    banner.style.bottom = '0'
    banner.style.animation = 'fadeIn .5s ease'
}

setTimeout(showPolicy, 3000)
