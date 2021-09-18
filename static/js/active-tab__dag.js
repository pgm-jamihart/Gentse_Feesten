let calenderDayListItem = document.querySelector('.calender__day__list--item');
let calenderDayListLinks = document.getElementsByClassName('calender__day__list--link');
let path = document.URL

console.log(calenderDayListLinks[0].href)
console.log(path);

for (let i = 0; i < calenderDayListLinks.length; i++) {
  if (calenderDayListLinks[i].href == path) {
    
    calenderDayListLinks[i].className = 'calender__day--active';
  } 
}

