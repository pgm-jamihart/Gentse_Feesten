const DATA_DETAIL_EVENTS_PROGRAMMA = 'https://www.pgm.gent/data/gentsefeesten/events.json';
const fallbackImage = {
  "image": {
    "full": "static/media/news_foto-1.png",
  },
};

const wheelchairIcon = {
  "icon": {
    "true": "static/media/svg/wheelchair.svg",
  },
};

(() => {
  const app = {
      initialize() {        
        this.getEventsIDFromAPI(); 
        
      },

      getEventsIDFromAPI () {
          fetch(DATA_DETAIL_EVENTS_PROGRAMMA, {})
              .then(response => {
                  if (response.status === 200) {
                      return response.json();
                  }
                  throw new Error('Something went wrong!');
              })
              
                
              .then(json => this.generateHTMLForDetail(json))
                
              
              .catch(error => console.warn(error));
      },
      
      generateHTMLForDetail (eventsDetails) {
        console.log(eventsDetails)
        const search = window.location.search;
        const params = new URLSearchParams(search);
        console.log(params.has('day'));
        console.log(params.has('slug'));

        const urlType = params.get('day');
        const urlSlug = params.get('slug')
        console.log(urlType);
        console.log(urlSlug);


        if (urlType !== null) { 
        let eventDay;
        for (let i = 0; i < eventsDetails.length; i++) {
          if (eventsDetails[i].day === urlType && eventsDetails[i].slug === urlSlug) {
            eventDay = eventsDetails[i];
          };
        };  
        console.log(eventDay)

        $eventDetailPage = document.getElementById('event__detail--page');

        if (eventDay) {
          let tempStr = `
          <h1>${eventDay.title}</h1>
            <a class="detail--page__locatie" href="#">${eventDay.location}</a>
            <time class="detail--page__time">${eventDay.day_of_week} ${eventDay.day} juli - ${eventDay.start.replace(':','.')} u. > ${eventDay.end.replace(':','.')} u.</time>

            <div class="flex-container__detail-page">
                <div class="detail-page__image">
                    <img src="${eventDay.image == null? fallbackImage.image.full : eventDay.image.thumb}" alt="">
                </div>

                <div class="detail-page__content">
                    <p>
                        ${eventDay.description == undefined? '' : eventDay.description} 
                    </p>

                    <div class="detail-page__content--info">
                        <p>Website:</p>
                        <a href="#">${eventDay.url == null? '' : eventDay.url}</a>
                    </div>
                    <div class="detail-page__content--info">
                        <p>Organisator:</p>
                        <a href="#">${eventDay.organizer}</a>
                    </div>
                    <div class="detail-page__content--info">
                        <p>Categorieën:</p>
                        <ul>
                          ${eventDay.category.map((ctg) => {
                            return `<li><a href="#">${ctg}</a></li>`
                          }).join('')}
                        </ul>
                    </div>

                    <div class="flex__detail-page__info-icons">
                        <svg class="detail-page__icon--dialect" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 189 32"><path d="M12.059 24.593H8.641V7.596h3.418v16.997zM30.386 7.596v16.902h-2.849L20.89 14.053v10.445h-3.229V7.596h2.849l6.647 10.635V7.596h3.229zm16.807 6.742h5.887V7.596h3.418v16.902H53.08v-7.312h-5.887v7.312h-3.418V7.596h3.418v6.742zm25.163-6.742v2.944h-7.122v3.798h6.362v2.944h-6.362v4.463h7.122v2.944h-10.54V7.597h10.54zm15.668 0v2.944h-4.653v14.053h-3.418V10.54H75.3V7.596h12.724zM96 0H.095v32h188.961V0H96zm-1.899 30.101H1.994V1.899h92.107v28.202zm21.46-12.819c0 5.223-2.374 7.501-6.267 7.501-3.798 0-6.457-2.279-6.457-7.501v-2.184c0-5.507 2.659-7.691 6.457-7.691 3.608 0 5.697 1.994 6.172 5.507h-3.323c-.285-1.519-1.234-2.564-2.944-2.564-1.994 0-3.039 1.329-3.039 4.558v2.374c0 3.229 1.044 4.558 3.039 4.558 1.899 0 2.754-1.234 2.944-3.229h-2.849v-2.944h6.172l.095 1.614zm15.383-6.742h-7.122v3.798h6.362v2.944h-6.362v4.463h7.122v2.944h-10.54V7.597h10.54v2.944zm16.997 14.053h-2.849l-6.647-10.445v10.445h-3.228V7.596h2.849l6.647 10.635V7.596h3.228v16.997zm16.617-14.053h-4.653v14.053h-3.418V10.54h-4.653V7.596h12.724v2.944zm9.59 14.243c-2.944 0-5.033-.855-6.552-2.754l2.659-1.804c.95 1.139 1.899 1.709 3.703 1.709 1.994 0 2.659-.855 2.659-1.899 0-1.139-.76-1.804-3.418-2.564-3.323-.855-5.033-2.469-5.033-5.317 0-2.659 1.804-4.748 5.792-4.748 2.659 0 4.748.95 5.982 2.754l-2.564 1.804c-.76-1.139-1.614-1.709-3.323-1.709-1.519 0-2.374.76-2.374 1.899 0 1.329 1.044 1.899 3.323 2.469 3.513.855 5.128 2.184 5.128 5.223-.19 2.754-2.089 4.938-5.982 4.938z"/></svg>
                        <img class="detail-page__icon--wheelchair" src="${eventDay.wheelchair_accessible == true? wheelchairIcon.icon.true : ''}" alt="">
                          
                        
                    </div>

                    <ul class="flex__detail-page--socials">
                        <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M12.973 24c7.17 0 11.093-5.77 11.093-10.773 0-.164-.003-.328-.013-.49a7.865 7.865 0 001.93-1.935l.017-.025a7.759 7.759 0 01-2.202.591l-.038.004a3.842 3.842 0 001.706-2.068l.008-.027a7.785 7.785 0 01-2.427.912l-.05.008c-1.473-1.526-3.942-1.603-5.512-.172a3.733 3.733 0 00-1.232 2.761v.001c0 .29.035.58.103.863-3.134-.153-6.055-1.59-8.036-3.956-1.032 1.73-.504 3.942 1.208 5.054a3.947 3.947 0 01-1.787-.483l.021.01v.048c0 1.802 1.307 3.355 3.125 3.712a3.915 3.915 0 01-1.027.133 4.11 4.11 0 01-.758-.071l.025.004c.512 1.541 1.975 2.598 3.642 2.63a7.907 7.907 0 01-4.814 1.62h-.027.001c-.31 0-.62-.017-.929-.053A11.147 11.147 0 0012.953 24h.022-.001"/></svg></a></li>
                        <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M17.49 25v-8.21h2.95l.44-3.2h-3.39v-2.043c0-.927.276-1.558 1.697-1.558L21 9.988V7.126A25.196 25.196 0 0018.445 7h-.091.005c-2.614 0-4.403 1.491-4.403 4.23v2.36H11v3.2h2.956V25h3.535z"/></svg></a></li>
                        <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M8.625 13.486c0 1.396.614 3.464 2.234 3.911.057 0 .112.057.224.057.392 0 .615-1.006.615-1.286 0-.335-.895-1.062-.895-2.402 0-2.906 2.347-4.917 5.42-4.917 2.627 0 4.582 1.397 4.582 3.911 0 1.9-.838 5.475-3.464 5.475-.95 0-1.788-.67-1.788-1.563 0-1.341 1.006-2.682 1.006-4.079 0-.838-.503-1.564-1.509-1.564-1.341 0-2.124 1.396-2.124 2.458 0 .614.057 1.285.392 1.844-.559 2.124-1.62 5.308-1.62 7.487 0 .671.111 1.341.167 2.012v.112l.168-.056c1.956-2.459 1.844-2.962 2.738-6.203.447.838 1.676 1.285 2.682 1.285 4.079 0 5.923-3.688 5.923-7.04 0-3.52-3.297-5.867-6.929-5.867-3.911-.001-7.822 2.458-7.822 6.425z"/></svg></a></li>
                    </ul>

                    <div class="detail-page--informatiepunt">
                        <h2>Informatiepunt + Reservatie</h2>
                        <p>Les Quatre au Quai</p>
                        <p>August Van Lokerenstraat 76</p>
                        <p>9050 Ledeberg</p>
                          
                        <a href="mailto:info@les4auquai.be">info@les4auquai.be</a>
                        <a href="http://www.les4auquai.be">http://www.les4auquai.be</a>
                    </div>


                </div>
               
            </div>

            <div class="andere-evenementen">
                <h2>Andere evenementen van les4auquai.be</h2>
                <ul>
                    <li class=".events__list--item__list--view">
                        <a href="#">
                            <div class="events__container--image__list--view">
                                <img class="events__image__list--view" src="" alt="">
                                <div class="events__bg--layer__list--view">
                                    
                                </div>
                            </div>
                            <div class="events__content__list--view">
                                <div class="flex-container__listview--active">
                                    <div class="events__date__list--view">
                                        
                                        <time>15.00 u.</time>
                                    </div>
                                    
                                        <h4 class="title__events__list--view">Alors On Chante Quand Même</h4>
                                    </div>
                                    <p>Feestzaal Cocteau</p>
                            </div>
                        </a>
                    </li>
                    <li class=".events__list--item__list--view">
                        <a href="#">
                            <div class="events__container--image__list--view">
                                <img class="events__image__list--view" src="" alt="">
                                <div class="events__bg--layer__list--view">
                                    
                                </div>
                            </div>
                            <div class="events__content__list--view">
                                <div class="flex-container__listview--active">
                                    <div class="events__date__list--view">
                                        
                                        <time>15.00 u.</time>
                                    </div>
                                    
                                        <h4 class="title__events__list--view">Alors On Chante Quand Même</h4>
                                    </div>
                                    <p>Feestzaal Cocteau</p>
                            </div>
                        </a>
                    </li>
                    <li class=".events__list--item__list--view">
                        <a href="#">
                            <div class="events__container--image__list--view">
                                <img class="events__image__list--view" src="" alt="">
                                <div class="events__bg--layer__list--view">
                                    
                                </div>
                            </div>
                            <div class="events__content__list--view">
                                <div class="flex-container__listview--active">
                                    <div class="events__date__list--view">
                                        
                                        <time>15.00 u.</time>
                                    </div>
                                    
                                        <h4 class="title__events__list--view">Alors On Chante Quand Même</h4>
                                    </div>
                                    <p>Feestzaal Cocteau</p>
                            </div>
                        </a>
                    </li>
                    <li class=".events__list--item__list--view">
                        <a href="#">
                            <div class="events__container--image__list--view">
                                <img class="events__image__list--view" src="" alt="">
                                <div class="events__bg--layer__list--view">
                                    
                                </div>
                            </div>
                            <div class="events__content__list--view">
                                <div class="flex-container__listview--active">
                                    <div class="events__date__list--view">
                                        
                                        <time>15.00 u.</time>
                                    </div>
                                    
                                        <h4 class="title__events__list--view">Alors On Chante Quand Même</h4>
                                    </div>
                                    <p>Feestzaal Cocteau</p>
                            </div>
                        </a>
                    </li>
                </ul>
                <a class="all__events--organisator" href="#">Alle evenementen van deze organisator</a>
            </div>
          `;
  
          $eventDetailPage.innerHTML = tempStr; 
        } else {
          tempStr = `<h1>Sorry, er ging iets mis.</h1>
          <p>Klik <strong><a class="error--home" href="index.html">hier</a></strong> om terug naar de homepagina te gaan</p>`;
          $eventDetailPage.innerHTML = tempStr;
        }
        
      };
      }, 
     
  };
  app.initialize();
})();