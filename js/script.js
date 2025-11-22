// --- MENU HAMBÚRGUER ---

const btnHamburguer = document.getElementById('hamburguer');
const menu = document.querySelector('.menu');

if (btnHamburguer && menu) {
  btnHamburguer.addEventListener('click', function () {
    menu.classList.toggle('menu-aberto');
  });

  // Fecha o menu quando clicar em algum link
  const linksMenu = menu.querySelectorAll('a');
  linksMenu.forEach(link => {
    link.addEventListener('click', function () {
      menu.classList.remove('menu-aberto');
    });
  });
}

// --- SLIDER DA HOME ---

const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dots .dot');
const btnPrev = document.querySelector('.hero-prev');
const btnNext = document.querySelector('.hero-next');

let indiceAtual = 0;

function mostrarSlide(indice) {
  if (!slides.length) return; 

  // Loop
  if (indice < 0) {
    indiceAtual = slides.length - 1;
  } else if (indice >= slides.length) {
    indiceAtual = 0;
  } else {
    indiceAtual = indice;
  }

  slides.forEach(slide => slide.classList.remove('ativo'));
  dots.forEach(dot => dot.classList.remove('ativo'));

  slides[indiceAtual].classList.add('ativo');
  if (dots[indiceAtual]) {
    dots[indiceAtual].classList.add('ativo');
  }
}

if (slides.length && dots.length && btnPrev && btnNext) {
  btnNext.addEventListener('click', function () {
    mostrarSlide(indiceAtual + 1);
  });

  btnPrev.addEventListener('click', function () {
    mostrarSlide(indiceAtual - 1);
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', function () {
      mostrarSlide(i);
    });
  });

  // Slide inicial
  mostrarSlide(0);

  // Troca automática
  setInterval(function () {
    mostrarSlide(indiceAtual + 1);
  }, 8000);
}

// --- VALIDAÇÃO DO FORMULÁRIO DE CONTATO ---

const formContato = document.querySelector('.contato-form');

if (formContato) {
  formContato.addEventListener('submit', function (event) {
    event.preventDefault(); // evita envio imediato

    let formularioValido = true;

    // Remove mensagens de erro antigas
    const mensagensErro = formContato.querySelectorAll('.erro-texto');
    mensagensErro.forEach(msg => msg.remove());

    const camposComErro = formContato.querySelectorAll('.erro');
    camposComErro.forEach(campo => campo.classList.remove('erro'));

    // Campos
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const tipo = document.getElementById('tipo');
    const assunto = document.getElementById('assunto');
    const mensagem = document.getElementById('mensagem');

    function criaErro(campo, mensagem) {
      formularioValido = false;
      campo.classList.add('erro');

      const span = document.createElement('span');
      span.classList.add('erro-texto');
      span.textContent = mensagem;

      campo.parentElement.appendChild(span);
    }

    // Validações
    if (!nome.value.trim()) {
      criaErro(nome, 'Por favor, informe o seu nome completo.');
    } else if (nome.value.trim().length < 3) {
      criaErro(nome, 'O nome deve ter pelo menos 3 caracteres.');
    }

    const emailValor = email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValor) {
      criaErro(email, 'Por favor, informe o seu e-mail.');
    } else if (!emailRegex.test(emailValor)) {
      criaErro(email, 'Informe um e-mail válido.');
    }

    if (!tipo.value) {
      criaErro(tipo, 'Selecione uma opção.');
    }

    if (!assunto.value.trim()) {
      criaErro(assunto, 'Informe um assunto.');
    }

    if (!mensagem.value.trim()) {
      criaErro(mensagem, 'Descreva a sua necessidade.');
    } else if (mensagem.value.trim().length < 10) {
      criaErro(mensagem, 'A mensagem deve ter pelo menos 10 caracteres.');
    }

    if (formularioValido) {
      alert('Formulário enviado com sucesso!');
      formContato.reset();
    } else {
      alert('Por favor, corrija os campos destacados em vermelho.');
    }
  });
}
