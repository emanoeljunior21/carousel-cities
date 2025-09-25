document.addEventListener("DOMContentLoaded", function () {
  let btnNext = document.querySelector(".arrows .next");
  let btnBack = document.querySelector(".arrows .back");
  let listItems = document.querySelectorAll(".list .list-item");
  let thumbItems = document.querySelectorAll(".thumb .thumb-item");
  let dots = document.querySelectorAll(".indicators .dot");

  let currentIndex = 0;
  let autoPlayInterval;
  const autoPlayDelay = 5000;

  function initCarousel() {
    updateCarousel();
    startAutoPlay();

    btnNext.addEventListener("click", nextSlide);
    btnBack.addEventListener("click", prevSlide);

    dots.forEach((dot) => {
      dot.addEventListener("click", function () {
        let index = parseInt(this.getAttribute("data-index"));
        goToSlide(index);
      });
    });

    thumbItems.forEach((thumb, index) => {
      thumb.addEventListener("click", function () {
        goToSlide(index);
      });
    });

    document
      .querySelector(".container")
      .addEventListener("mouseenter", pauseAutoPlay);
    document
      .querySelector(".container")
      .addEventListener("mouseleave", startAutoPlay);
  }

  function updateCarousel() {
    listItems.forEach((item) => item.classList.remove("active"));
    thumbItems.forEach((item) => item.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    listItems[currentIndex].classList.add("active");
    thumbItems[currentIndex].classList.add("active");
    dots[currentIndex].classList.add("active");
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % listItems.length;
    updateCarousel();
    resetAutoPlay();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + listItems.length) % listItems.length;
    updateCarousel();
    resetAutoPlay();
  }

  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
    resetAutoPlay();
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
  }

  function pauseAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  function resetAutoPlay() {
    pauseAutoPlay();
    startAutoPlay();
  }

  initCarousel();
});
