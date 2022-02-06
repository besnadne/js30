import i18Obj from "./translate.js";
window.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector('.hamburger'),
        nav = document.querySelector('.header__nav'),
        headerOverflou = document.querySelector('.header__content'),
        line = document.querySelectorAll('.line'),
        navList = document.querySelectorAll('.link--hover'),
        portfolioImgs = document.querySelectorAll('.portfolio-content__img'),
        portfolioBtns = document.querySelector('.portfolio__buttons'),
        portfolioBtn = document.querySelectorAll('.portfolio__button'),
        switcher = document.querySelector('.header__language-switcher'),
        switcherLink = document.querySelectorAll('.header__switcher-link'),
        themeChanger = document.querySelector('.theme-switcher');
    let body = document.querySelector('body');



    btn.addEventListener('click', () => {
        btn.classList.toggle('active');

        navList.forEach(el => {
            if (!el.classList.contains('link--active')) {
                navList.forEach(el => {
                    el.classList.add('link--active')
                })
            } else {
                navList.forEach(el => {
                    el.classList.remove('link--active')
                })
            }
        })

        nav.classList.toggle('header__nav--active');
        headerOverflou.classList.toggle('header__content--active')

    });

    function burgerToggler() {
        line.forEach(el => {
            el.classList.remove('line--gold')
        })

        btn.addEventListener('mouseover', () => {

            line.forEach(el => el.classList.add('line--gold'))
        })

        btn.addEventListener('mouseout', () => {
            line.forEach(el => el.classList.remove('line--gold'))
        })

    }

    burgerToggler()

    navList.forEach(link => {
        link.addEventListener('click', (e) => {
            if (e.target.classList.contains('link--active')) {
                btn.classList.toggle('active');
                nav.classList.toggle('header__nav--active');
                headerOverflou.classList.toggle('header__content--active')
                navList.forEach(el => {
                    el.classList.remove('link--active')
                })
            }
        })
    });

    let language = 'lang'; 
    let theme = 'theme';
    let active = 'active'

    // localStorage.setItem(active , 'en')
    console.log(theme);
    const seasons = ['winter', 'spring', 'summer', 'autumn'];

    function changeImages(dataset) {
        seasons.forEach(season => {
            if (season === dataset) {
                portfolioImgs.forEach((img, index) => {
                    img.classList.add('opacity');
                    img.addEventListener('transitionend', () => {
                        img.src = `assets/img/portfolio/${season}/${index + 1}.jpg`;
                        setTimeout(() => {
                            img.classList.remove('opacity')
                        }, 16)
                    })
                })
            }
        })
    }

    function preloadImages () {
        seasons.forEach (season =>{
            portfolioImgs.forEach((img, index) => {
                img = new Image();
                img.src = `assets/img/portfolio/${season}/${index + 1}.jpg`;
            })
        })
    }
    preloadImages()
    
    function changeClassActive(active, elements) {

        elements.forEach(el=>{
            el.addEventListener('click', (e) => {
                e.preventDefault();
                elements.forEach(element => {
                    element.classList.remove(`${active}--active`)
                })
                e.target.classList.add(`${active}--active`)
            })
        })
    }
    
    portfolioBtn.forEach(btn => {
        btn.classList.remove('portfolio__button--active')
    })

    portfolioBtns.addEventListener('click', (e) => {
        if (e.target.classList.contains('portfolio__button')) {
            changeImages(e.target.dataset.season);
        }
    })

    function getTranslate (lang) {
        const stringsElements = document.querySelectorAll('[data-i18n]')
        stringsElements.forEach(element => {
            for(let key in i18Obj[lang]){
                if(element.dataset.i18n === key){
                    element.textContent = i18Obj[lang][key]
                }
                if(element.dataset.i18n === key && element.placeholder){
                    element.placeholder = i18Obj[lang][key];
                }
            }
            
        })
    } 

//  СМЕНА ЯЗЫКА

    if (localStorage.getItem(language)){
        getTranslate(localStorage.getItem(language))
    }
     
    if(localStorage.getItem(active)){
        changeClassActive('header__switcher-link', switcherLink)
    }

    switcher.addEventListener('click', (e)=>{
        getTranslate(e.target.dataset.lang);
        localStorage.setItem(language , e.target.dataset.lang);
        localStorage.setItem(active, e.target.dataset.lang)
    })

    let elementsForThemSwithc = document.querySelectorAll('.header, .title-text, .link, .contacts, button, .light__icon, [placeholder], .header__switcher-link, .header__nav, .line, .contacts__title' )

    if(localStorage.getItem(theme)){
        setThemeChange()
    }
    themeChanger.addEventListener('click', setThemeChange);

    function setThemeChange() {
        themeChanger.classList.toggle('theme-switcher__light')
        body.classList.toggle ('light-theme')
        elementsForThemSwithc.forEach(element =>{
            if(element.classList.contains('header') ) {
                element.classList.toggle('light-background__hero')
            }
            if(element.classList.contains('contacts')) {
                element.classList.toggle('light-background__contacts')
                element.classList.toggle('light-theme-fontsize')
            }
            if (element.classList.contains('link')){
                element.classList.toggle('light-theme-fontsize')
                element.classList.toggle('link-light--hover')
            }
            if(element.classList.contains('title-text') ){
                element.classList.toggle('light-theme')
            }
            if(element.classList.contains('golden-btn') ){
                element.classList.toggle('light-theme-gold__button')
            }
            if(element.classList.contains('light__icon')){
                element.classList.toggle('light-theme__icon')
            }
            if(element.classList.contains('white-btn')){
                element.classList.toggle('light-theme-white__button')
            }
            if(element.placeholder){
                element.classList.toggle('light-theme__input')
            }
            if(element.classList.contains('header__switcher-link')){
                element.classList.toggle('light-theme-fontsize')
            }
            if(element.classList.contains('header__nav')){
                element.classList.toggle('light-nav')
            }
            if(element.classList.contains('line')){
                element.classList.toggle('light-theme__line')
            }
            if(element.classList.contains('contacts__title')){
                element.classList.toggle('light-theme-fontsize')
            }
        })
        localStorage.setItem(theme, 'light');
        if(!body.classList.contains('light-theme')){
            localStorage.removeItem(theme)
        }
    }    
        
    changeClassActive('header__switcher-link', switcherLink);
    changeClassActive('portfolio-light__button', portfolioBtn);

    //custom-video

   const playPause = document.querySelector('.video-controls__play'),
         playerButton = document.querySelector('.video-player__icon'),
         timeElapsed = document.querySelector('.time-elapsed'),
         duration = document.querySelector('.duration'),
         progressBar = document.querySelector('.progress-bar'),
         seek = document.querySelector('.seek'),
         seekTooltip = document.querySelector('.seek-tooltip'),
         volumeButton = document.querySelector('.volume-button'),
         volume = document.querySelector('.volume'),
         fullscreen = document.querySelector('.fullscreen'),
         videoFullscreen = document.querySelector('.video__content'),
         videoPlayer = document.querySelector('.video-player');

         playerButton.addEventListener('click', togglePlayPause);
         videoPlayer.addEventListener('click', togglePlayPause);
         playPause.addEventListener('click', togglePlayPause);

         console.log(seek, progressBar)

    function togglePlayPause (){
        if(videoPlayer.paused ){
            videoPlayer.play();
            playPause.classList.add('video-controls__pause')
            playerButton.classList.add('hidden')
            videoInitialize()
        }else {
            videoPlayer.pause()
            playPause.classList.remove('video-controls__pause');
            playerButton.classList.remove('hidden')
        }
    }

    videoPlayer.addEventListener('ended' , () =>{
        videoPlayer.pause()
        playPause.classList.remove('video-controls__pause');
        playerButton.classList.remove('hidden')
    
    })

    function timeConverter (time){
        const result = new Date(time * 1000).toISOString().slice();
        // console.log(result)

        return {
            minutes: result.substring(14, 16),
            seconds: result.substring(17, 19),
            }
   }

   function videoInitialize (){
       const videoDuration = Math.round(videoPlayer.duration),
             time = timeConverter(videoDuration);
        seek.setAttribute('max', videoDuration);
        progressBar.setAttribute('max' , videoDuration)
        duration.innerHTML = `${time.minutes}:${time.seconds}`;
        duration.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
   }

   function updateProgress() {
    seek.value = Math.floor(videoPlayer.currentTime);
    progressBar.value = Math.floor(videoPlayer.currentTime);
  }

 
    function updateTimeElapsed() {
        const time = timeConverter(Math.round(videoPlayer.currentTime));
        timeElapsed.innerText = `${time.minutes}:${time.seconds}`;
        timeElapsed.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
    }

   
    function updateSeekTooltip(event) {
        const skipTo = Math.round((event.offsetX / event.target.clientWidth) * parseInt(event.target.getAttribute('max'), 10));
        console.log(skipTo)
        seek.setAttribute('data-seek', skipTo)
        const t = timeConverter(skipTo);
        seekTooltip.textContent = `${t.minutes}:${t.seconds}`;
        const rect = videoPlayer.getBoundingClientRect();
        seekTooltip.style.left = `${event.pageX - rect.left}px`;
    }

    function skipAhead(event){
        const skipTo = event.target.dataset.seek ? event.target.dataset.seek : event.target.value;
        videoPlayer.currentTime = skipTo;
        progressBar.value = skipTo;
        seek.value = skipTo;
    }


    seek.addEventListener('mousemove', updateSeekTooltip);
    videoPlayer.addEventListener('timeupdate', updateTimeElapsed);
    videoPlayer.addEventListener('timeupdate', updateProgress)
    seek.addEventListener('input', skipAhead);

    //volume
    function updateVolume (){
        if (videoPlayer.muted) {
            videoPlayer.muted = false;
        }
        videoPlayer.volume = volume.value;
    }

    volume.addEventListener('input', updateVolume);

    function changeVolumeIcon (){
        if(videoPlayer.volume < 0.1){
            volumeButton.classList.add('volume-mute');
        }else{
            volumeButton.classList.remove('volume-mute')
        }
    }
    console.log(videoPlayer.volume)
    videoPlayer.addEventListener('volumechange', changeVolumeIcon)

    volumeButton.addEventListener('click', ()=>{
       
        videoPlayer.muted = !videoPlayer.muted;

        if(videoPlayer.muted){
            volume.setAttribute('data-volume', volume.value)
            volume.value = 0;
            videoPlayer.volume = 0;
        }else{
            volume.value = volume.dataset.volume;
            videoPlayer.volume = volume.value;
        }
        
    })

    //Fullscreen
    function toggleFullScreen() {
        fullscreen.classList.toggle('fullsceen-small')
        if (document.fullscreenElement) {
        document.exitFullscreen();
        } else if (document.webkitFullscreenElement) {
        document.webkitExitFullscreen();
        } else if (videoFullscreen.webkitRequestFullscreen) {
            videoFullscreen.webkitRequestFullscreen();
        } else {
            videoFullscreen.requestFullscreen();
        }
    }

    fullscreen.addEventListener('click', toggleFullScreen)


})





