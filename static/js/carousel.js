const flexCarousel = document.querySelector('.flex__carousel');
const carouselImage = document.querySelectorAll('.carousel__image');

const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let n = 1;
const width = carouselImage[0].clientWidth;

flexCarousel.style.transform = 'translateX(' + (-width * n) + 'px)';

prevButton.addEventListener('click', (event) => {
  if (n <= 0) return;
  flexCarousel.style.transition = 'transform 0.4s ease';
  n--;
  flexCarousel.style.transform = 'translateX(' + (-width * n) + 'px)';
  
})

nextButton.addEventListener('click', (event) => {
  
  if (n >= carouselImage.length - 1) return;
  flexCarousel.style.transition = 'transform 0.4s ease';
  n++;
  flexCarousel.style.transform = 'translateX(' + (-width * n) + 'px)';
  
});

flexCarousel.addEventListener('transitioned', (event) => {
  if (carouselImage[n].id === 'last') {
    flexCarousel.style.transition = 'none';
    n = carouselImage.length - 2;
    flexCarousel.style.transform = 'translateX(' + (-size * counter) + 'px)';
  }
});

flexCarousel.addEventListener('transitioned', (event) => {
  if (carouselImage[n].id === 'first') {
    flexCarousel.style.transition = 'none';
    n = carouselImage.length - n;
    flexCarousel.style.transform = 'translateX(' + (-size * counter) + 'px)';
  }
})


