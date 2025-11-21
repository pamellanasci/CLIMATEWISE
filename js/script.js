// --- MENU HAMBÚRGUER ---

const btnHamburguer = document.getElementById('hamburguer');
const menu = document.querySelector('.menu');

if (btnHamburguer && menu) {
  btnHamburguer.addEventListener('click', function () {
    menu.classList.toggle('menu-aberto');
  });

  //Fecha o menu quando clicar em algum link
  const linksMenu = menu.querySelectorAll('a');
  linksMenu.forEach(link => {
    link.addEventListener('click', function () {
      menu.classList.remove('menu-aberto');
    });
  });
}


// Seleciona todos os slides e controles do carrossel
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dots .dot');
const btnPrev = document.querySelector('.hero-prev');
const btnNext = document.querySelector('.hero-next');

let indiceAtual = 0;

function mostrarSlide(indice) {
  // Tratamento de "loop": se passar do último, volta pro primeiro
  if (indice < 0) {
    indiceAtual = slides.length - 1;
  } else if (indice >= slides.length) {
    indiceAtual = 0;
  } else {
    indiceAtual = indice;
  }

  // Remove "ativo" de todos os slides e dots
  slides.forEach(slide => slide.classList.remove('ativo'));
  dots.forEach(dot => dot.classList.remove('ativo'));

  // Adiciona "ativo" no slide atual e no dot correspondente
  slides[indiceAtual].classList.add('ativo');
  dots[indiceAtual].classList.add('ativo');
}

btnNext.addEventListener('click', function() {
  mostrarSlide(indiceAtual + 1);
});

btnPrev.addEventListener('click', function() {
  mostrarSlide(indiceAtual - 1);
});

dots.forEach((dot, i) => {
  dot.addEventListener('click', function() {
    mostrarSlide(i);
  });
});

setInterval(function() {
  mostrarSlide(indiceAtual + 1);
}, 8000);


