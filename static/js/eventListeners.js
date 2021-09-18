const headerBgImage = [
  {
  image: "Gentse-feesten-01.jpg",
  },
  {
  image: "Gentse-feesten-02.jpg",
  },
  {
  image: "Gentse-feesten-03.jpg",
  },
  {
  image: "Gentse-feesten-04.jpg",
  },
  {
  image: "Gentse-feesten-05.jpg",
  },
  {
  image: "Gentse-feesten-06.jpg",
  },
  {
  image: "Gentse-feesten-07.jpg",
  },
  {
  image: "Gentse-feesten-08.jpg",
  },
  {
  image: "Gentse-feesten-09.jpg",
  },
];

(() => {
  const app = {  
    initialize () {
      //console.log(`App started`);
      this.cacheElements();
      this.clickEventListeners();
    },

    cacheElements () {
      //console.log(`Cache elements`);
      this.$nav = document.querySelector('.nav__kleinscherm--open');
      this.$hamburger = document.querySelector('.nav__hamburger');
      this.$closing = document.querySelector('.closing');
      this.$programmaButton = document.querySelector('.programma__button');
      this.$programmaDays = document.querySelector('.programma__days');
      this.$programmaChevron = document.querySelector('.programma__chevron');
      this.$languageOptions = document.querySelector('.language--options');
      this.$languageSelect = document.querySelector('.language--select');
      this.$languageSelectSvg = document.querySelector('.language--select--svg');
    },

    clickEventListeners () {
      //console.log(`Event!`);
      this.$hamburger.addEventListener('click', (event) => {
        console.log('click');
        this.$nav.classList.toggle('nav__kleinscherm--open--active');
        document.body.style.overflowY = 'hidden';
      });

      this.$closing.addEventListener('click', (event) => {
        //console.log('click');
        this.$nav.classList.toggle('nav__kleinscherm--open--active');
        document.body.style.overflowY = 'scroll';
      });

      this.$programmaButton.addEventListener('click', (event) => {
        //console.log('click');
        this.$programmaDays.classList.toggle('programma__days--active');
        this.$programmaChevron.classList.toggle('programma__chevron--up');
      });

      this.$languageSelect.addEventListener('click', (event) => {
        this.$languageOptions.classList.toggle('language--option--active');
        this.$languageSelectSvg.classList.toggle('language--select--svg--up');
      })

      window.addEventListener('load', (event) => {
        let rdmnHeaderBg = headerBgImage[Math.floor(Math.random() * headerBgImage.length)];
        //console.log(rdmnHeaderBg.image);
        
        let rdmHeader = rdmnHeaderBg.image;
        
        let str = `url("static/media/header--image/${rdmHeader}")`;
        //console.log(str);
        document.getElementById('header__container').style.backgroundImage = str;
        //console.log(str);
      }) 
      
    },
    
  };
  app.initialize();
  
})();
