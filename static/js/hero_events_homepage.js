const DATA_EVENTS = 'https://www.pgm.gent/data/gentsefeesten/events.json';
const fallbackImage = {
  "image": {
    "full": "static/media/news_foto-1.png",
  },
};

(() => {
  const app = {
      initialize() {            
          this.cacheElements();
          this.getDataFromEventsAPIEndpoint();
          
          
      },

      cacheElements() {
          this.$homepageEvents = document.querySelector('.hero__events--flex');
          
      },

      getDataFromEventsAPIEndpoint() {
          fetch(DATA_EVENTS, {})
              .then(response => {
                  if (response.status === 200) {
                      return response.json();
                  }
                  throw new Error('Something went wrong!');
              })
              .then(json => this.updateEventsUI(json))
              .catch(error => console.warn(error));
      },
      
      updateEventsUI(data) {
        //console.log(data);
        let tempStr = '';
      
        for (let i = 0; i < 3; i ++) {
          let rdmEvent = data[Math.floor(Math.random() * data.length)];
          
          tempStr += `
          <li class="hero__events__list--item">
              <a href="detail.html?day=${rdmEvent.day}&slug=${rdmEvent.slug}">
                  <div class="hero__events__container--image">
                      <img class="hero__events__image" src="${rdmEvent.image == null? fallbackImage.image.full : rdmEvent.image.thumb}" alt="">
                      <div class="hero__events__bg--layer">
                          
                      </div>
                  </div>
                  <div class="hero__events__content">
                      <div class="hero__events__date">
                          <time class="hero__events__date--time">${rdmEvent.day_of_week.slice(0,2)} ${rdmEvent.day} jul </time>
                          <time>${rdmEvent.start.replace(':','.')} u.</time>
                      </div>
                      <h2>${rdmEvent.title}</h2>
                      <p>${rdmEvent.location}</p>
  
                  </div>
              </a>
          </li>`;
          this.$homepageEvents.innerHTML = tempStr; 
        }
      },
      
  };
  app.initialize();
})();