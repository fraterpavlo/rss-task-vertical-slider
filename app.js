const upBtn = document.querySelector('.up-btn');
const downBtn = document.querySelector('.down-btn');
const leftSlider = document.querySelector('.left-slider');
const rightSlider = document.querySelector('.right-slider');
const leftSlides = leftSlider.querySelectorAll('.left-slider__slide');
const rightSlides = rightSlider.querySelectorAll('.right-slider__slide');
const slidesCount = rightSlider.querySelectorAll('div').length;
let isEnabled = true;

let indexActiveSlide = 0;

// leftSlider.style.top = `-${(slidesCount - 1) * 100}vh`;

// function changeSlide (newIndex) {
//   changeIndexActiveSlide(newIndex);
//   rightSlider.style.transform = `translateY(-${indexActiveSlide * 100}vh)`;
//   leftSlider.style.transform = `translateY(${indexActiveSlide * 100}vh)`;
// }

function changeIndexActiveSlide (newIndex) {
  indexActiveSlide = (newIndex + slidesCount) % slidesCount;
}

function hideItem (directionL, directionR) {
  isEnabled = false;
  leftSlides[indexActiveSlide].classList.add(directionL);
  rightSlides[indexActiveSlide].classList.add(directionR);
  leftSlides[indexActiveSlide].addEventListener('animationend', function () {
    this.classList.remove('active', directionL);
  });
  rightSlides[indexActiveSlide].addEventListener('animationend', function () {
    this.classList.remove('active', directionR);
  });
}

function showItem (directionL, directionR) {
  leftSlides[indexActiveSlide].classList.add('next', directionL);
  rightSlides[indexActiveSlide].classList.add('next', directionR);
  leftSlides[indexActiveSlide].addEventListener('animationend', function () {
    this.classList.remove('next', directionL);
    this.classList.add('active');
  });
  rightSlides[indexActiveSlide].addEventListener('animationend', function () {
    this.classList.remove('next', directionR);
    this.classList.add('active');
    isEnabled = true;
  });
}

function nextItem (index) {
  hideItem('to-bottom', 'to-top');
  changeIndexActiveSlide(index + 1);
  showItem('from-top', 'from-bottom');
}

function previousItem (index) {
  hideItem('to-top', 'to-bottom');
  changeIndexActiveSlide(index - 1);
  showItem('from-bottom', 'from-top');
}



upBtn.addEventListener('click', () => {
  if (isEnabled) {
    nextItem(indexActiveSlide);
  }
});

downBtn.addEventListener('click', () => {
  if (isEnabled) {
    previousItem(indexActiveSlide);
  }
});


leftSlider.addEventListener('wheel', (event) => {
  let deltaY = event.deltaY;
  if (deltaY < 0 && isEnabled) {
    nextItem(indexActiveSlide);
  } else if (deltaY > 0 && isEnabled) {
    previousItem(indexActiveSlide);
  }
});

rightSlider.addEventListener('wheel', (event) => {
  let deltaY = event.deltaY;
  if (deltaY < 0 && isEnabled) {
    previousItem(indexActiveSlide);
  } else if (deltaY > 0 && isEnabled) {
    nextItem(indexActiveSlide);
  }
});

const swipedetect = (el) => {

  let surfplace = el;
  let startX = 0;
  let startY = 0;
  let distanceX = 0;
  let distanceY = 0;
  let startTime = 0;
  let elapsedTime = 0;

  let minDistance = 150;
  let restraint = 100;
  let allowedTime = 300;

  function dragstart (event) {
    startX = event.pageX;
    startY = event.pageY;
    startTime = new Date().getTime();
    event.preventDefault();
  }

  function dragend (event) {
    distanceX = startX - event.pageX;
    distanceY = startY - event.pageY;
    elapsedTime = new Date().getTime() - startTime;
    if (elapsedTime < allowedTime && 
        Math.abs(distanceY) > minDistance && 
        Math.abs(distanceX) < restraint) {
          
        }
  }

  surfplace.addEventListener('mousedown', dragstart);
  surfplace.addEventListener('mouseup', dragend); 









};

const el = document.querySelector('.slider-container');
swipedetect(el);