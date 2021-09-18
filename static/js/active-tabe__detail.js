let calenderDayListItem = document.querySelector('.calender__day__list--item');
let calenderDayListLinks = document.getElementsByClassName('calender__day__list--link');
let path = document.URL.split('?').pop()
let n = path.split('&').shift()

console.log(calenderDayListLinks[0].href.split('?').pop())
console.log(n);

for (let i = 0; i < calenderDayListLinks.length; i++) {
  if (calenderDayListLinks[i].href.split('?').pop() == n) {
    calenderDayListLinks[i].className = 'calender__day--active';
  }  
}
