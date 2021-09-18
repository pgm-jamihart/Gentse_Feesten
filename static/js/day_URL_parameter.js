const DATA_EVENTS_PROGRAMMA = 'https://www.pgm.gent/data/gentsefeesten/events.json';
const DATA_CATEGORIES_PROGRAMMA = 'https://www.pgm.gent/data/gentsefeesten/categories.json';


(() => {
  const app = {
      initialize() {   
        this.$dataContentGrid = document.getElementById('data__content--grid');  
        //this.$dataContentList = document.getElementById('data__content--list');  
        this.$categoryList = document.querySelector('.category__list');
        this.getCategoriesFromAPI();       
        this.getEventsFromAPI(); 
        this.cacheElements();
        this.clickEventListeners();
        this.differentDisplayMode();
      },

      getCategoriesFromAPI () {
        fetch(DATA_CATEGORIES_PROGRAMMA, {})
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
                throw new Error('Something went wrong!');
            })
            .then(json => {
              //console.log(json);
              this.categories = json;
              this.getHTMLForCategoryList();
              this.getEventsFromAPI();
            })
            .catch(error => console.warn(error));
      },

      getEventsFromAPI () {
          fetch(DATA_EVENTS_PROGRAMMA, {})
              .then(response => {
                  if (response.status === 200) {
                      return response.json();
                  }
                  throw new Error('Something went wrong!');
              })
              .then(json => {
                //console.log(json);
                this.events = json;
                this.generateHTMLForDay();
              })
              .catch(error => console.warn(error));
      },
      
      generateHTMLForDay () {
        //console.log(this.categories);
        //console.log(this.events);
        const search = window.location.search;
        const params = new URLSearchParams(search);
        //console.log(params.has('day'));

        const urlType = params.get('day');
        //console.log(urlType);

        if (urlType !== null) {   
          const weekDays = this.events.filter((wkday) => {
            //console.log(wkday.day === urlType)
            return wkday.day === urlType;            
          });
                    
          const tempStr = this.categories.map((category) => {
            //console.log(category)
            
            const eventsFilter = weekDays.filter((event) => {
              return event.category.indexOf(category) > -1; 
            });

  
            eventsFilter.sort((eventFirstElmnt, eventSecondElmnt) => {
              return eventFirstElmnt.sort_key.localeCompare(eventSecondElmnt.sort_key);
            });
  
            const eventList = eventsFilter.map((event) => {
              return `
              <li class="events__list--item">
                <a href="detail.html?day=${event.day}&slug=${event.slug}">
                    <div class="events__container--image">
                        <img class="events__image" src="${event.image == null? fallbackImage.image.full : event.image.thumb}" alt="">
                        <div class="events__bg--layer">
                            
                        </div>
                    </div>
                    <div class="events__content">
                        <div class="flex-container__listview">
                            <div class="events__date">
                                
                                <time>${event.start.replace(':','.')} u.</time>
                            </div>
                            
                                <h4 class="title__events">${event.title}</h4>
                            </div>
                            <p>${event.location}</p>
                    </div>
                </a>
              </li>
              `;
            }).join('');
  
            return `
              <h3 id="${category}">${category}</h3>
              <a class"scroll-to-categories" href="#filters-and-categories"><svg class="scroll-to-categories__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M13.682 11.791l-6.617 6.296L4 15.171 15.74 4 28 15.665l-2.935 2.793-7.113-6.768v16.311h-4.269z"/></svg></a>
              <ul class="hero__events--flex">
                  ${eventList}
              </ul>
            `;
          }).join('');
  
          this.$dataContentGrid.innerHTML = tempStr;
          //this.$dataContentList.innerHTML = tempStr;
          
        };
      }, 

      getHTMLForCategoryList () {
        const tempStr = this.categories.map((category) => {
          return `
          <li>
            <a href="#${category}">${category}</a>
          </li>
          `
        }).join('');

        this.$categoryList.innerHTML = tempStr;
      },

      cacheElements () {
        //console.log(`Cache elements`);
        this.$rasterButton = document.getElementById('raster');
        this.$listButton = document.getElementById('list');
      },

      clickEventListeners () {
        //console.log(`Event!`); 
        this.$rasterButton.addEventListener('click', (event) => {
          if (! this.$rasterButton.classList.contains('filter__button--display--active')) {
            this.differentDisplayMode();
          }
          //this.$rasterButton.classList.add('filter__button--display--active');
          //this.$listButton.classList.remove('filter__button--display--active');
        })
  
        this.$listButton.addEventListener('click', (event) => {
          if (! this.$listButton.classList.contains('filter__button--display--active')) {
            this.differentDisplayMode();
          }
          //this.$listButton.classList.add('filter__button--display--active');
          //this.$rasterButton.classList.remove('filter__button--display--active');
        })
      },
  
      differentDisplayMode () {
        document.querySelectorAll('.events--flex').forEach((event) => event.classList.toggle('events--flex--list'));
        document.querySelectorAll('.events__list--item').forEach((event) => event.classList.toggle('events__list--item__list--view'));
        document.querySelectorAll('.events__container--image').forEach((event) => event.classList.toggle('events__container--image__list--view'));
        document.querySelectorAll('.events__content').forEach((event) => event.classList.toggle('events__content__list--view'));
        document.querySelectorAll('.flex-container__listview').forEach((event) => event.classList.toggle('flex-container__listview--active'));
        document.querySelectorAll('.events__date').forEach((event) => event.classList.toggle('events__date__list--view'));
        document.querySelectorAll('.title__events').forEach((event) => event.classList.toggle('title__events__list--view'));
        this.$listButton.classList.toggle('filter__button--display--active');
        this.$rasterButton.classList.toggle('filter__button--display--active');
      },

      
  };
  app.initialize();
})();