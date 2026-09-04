const burger = document.querySelector('.burger');
const sidebar = document.querySelector('.sidebar');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    sidebar.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

sidebar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        sidebar.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.2
});

document.querySelectorAll(
  '.home, .home nav, .home .main .main-text h1, .home .main .main-text h3, .home .main-text p, .home .main .main-text .buttons, .home .main .main-text .eyebrow p, .home .main .image img, ' +
  '.quote .text h1, ' +
  '.about-us .container .image img, .about-us .container .main .text h3, .about-us .container .main .text p, .about-us .container .main .text .path-title, .about-us .container .main .text .path-item, .about-us .container .main .text .member, .about-us .container .main .text .line, .about-us .container .main .button a, ' +
  '.services .main-text h1, .services .box-container .box, ' +
  '.price .main-text h1, .price .main .box, ' +
  '.products .main-text h1, .products .card, ' +
  '.reviews .main-text h1, .cert-carousel, ' +
  '.faq .main-text h1, .faq .main .box, ' +
  '.contacts .main-text h1, .contacts .text p, .contacts .social-medias a, ' +
  '.footer'
).forEach(el => {
  observer.observe(el);
});



(function(){
  function initCarousel(carousel){
    const track = carousel.querySelector('.cert-track');
    const cards = Array.from(track.children);
    const prevBtn = carousel.querySelector('.prev-arrow');
    const nextBtn = carousel.querySelector('.next-arrow');

    let visibleCount = getVisibleCount();
    let index = 0;

    function getVisibleCount(){
      const w = window.innerWidth;
      if (w <= 560) return 1;
      if (w <= 900) return 2;
      return 3;
    }

    function update(){
      const cardWidth = cards[0].getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(track).gap) || 0;
      const offset = index * (cardWidth + gap);
      track.style.transform = `translateX(-${offset}px)`;

      prevBtn.disabled = index === 0;
      nextBtn.disabled = index >= cards.length - visibleCount;
    }

    prevBtn.addEventListener('click', () => {
      if (index > 0){
        index--;
        update();
      }
    });

    nextBtn.addEventListener('click', () => {
      if (index < cards.length - visibleCount){
        index++;
        update();
      }
    });

    window.addEventListener('resize', () => {
      visibleCount = getVisibleCount();
      index = Math.min(index, Math.max(0, cards.length - visibleCount));
      update();
    });

    update();
  }

  document.querySelectorAll('.cert-carousel').forEach(initCarousel);
})();



(function () {
    const boxes = document.querySelectorAll('.price .box');

    boxes.forEach(box => {
        const button = box.querySelector('.price-arrow');

        button.addEventListener('click', () => {
            const isOpen = box.classList.contains('open');

            boxes.forEach(other => other.classList.remove('open'));

            if (!isOpen) {
                box.classList.add('open');
            }
        });
    });
})();


(function () {
    const boxes = document.querySelectorAll('.faq .box');

    boxes.forEach(box => {
        const toggle = box.querySelector('.faq-toggle');

        toggle.addEventListener('click', () => {
            const isOpen = box.classList.contains('open');

            boxes.forEach(other => other.classList.remove('open'));

            if (!isOpen) {
                box.classList.add('open');
            }
        });
    });
})();