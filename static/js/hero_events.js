const DATA_HERO_EVENTS_PARAMS = 'https://www.pgm.gent/data/gentsefeesten/events.json';
const fallbackImage = {
  "image": {
    "full": "static/media/news_foto-1.png",
  },
};


(() => {
  const app = {
      initialize() {           
        this.getDataFromEventsAPIEndpoint(); 
      },

      getDataFromEventsAPIEndpoint() {
          fetch(DATA_HERO_EVENTS_PARAMS, {})
              .then(response => {
                  if (response.status === 200) {
                      return response.json();
                  }
                  throw new Error('Something went wrong!');
              })
              .then(json => {
                //console.log(json);
                this.events = json;
                this.generateHTMLForUrlparams();
              })
              .catch(error => console.warn(error));
      },
      
      generateHTMLForUrlparams () {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        //console.log(params.has('day'));

        const urlType = params.get('day');
        //console.log(urlType);

        if (urlType !== null) {         

          const weekDays = this.events.filter((wkday) => {
            return wkday.day === urlType;            
          });
          
          $heroEvents = document.querySelector('.hero__events--flex');
          
          let str = '';
          for (let i = 0; i < 3; i ++) {
            
          let rdmEventHero = weekDays[Math.floor(Math.random() * weekDays.length)];
            
            if (rdmEventHero) {
              
              str += `
              <li class="hero__events__list--item">
                  <a href="detail.html?day=${rdmEventHero.day}&slug=${rdmEventHero.slug}">
                      <div class="hero__events__container--image">
                          <img class="hero__events__image" src="${rdmEventHero.image == null? fallbackImage.image.full : rdmEventHero.image.thumb}" alt="">
                          <div class="hero__events__bg--layer">
                              
                          </div>
                      </div>
                      <div class="hero__events__content">
                          <div class="hero__events__date">
                              
                              <time>${rdmEventHero.start.replace(':','.')} u.</time>
                          </div>
                          <h2>${rdmEventHero.title}</h2>
                          <p>${rdmEventHero.location}</p>
      
                      </div>
                  </a>
              </li>`;
  
            $heroEvents.innerHTML = str;
            } else {
              str = `<h1>Sorry, er ging iets mis.</h1>
              <p>Klik <strong><a href="index.html">hier</a></strong> om terug naar de homepagina te gaan</p>`;
            $heroEvents.innerHTML = str; 
            }
          };
          
        }
      }, 
      
  };
  app.initialize();
})();