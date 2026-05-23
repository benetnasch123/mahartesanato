/* =========================================================
   ATELIÊ MARINA — Script principal
   ========================================================= */

/* ---------- 1. Dados dos produtos ---------- */
const produtos = [
  { nome: 'Galinhas Stardew Valley',       desc: 'Pelúcias em Amigurumi como as Galinhas Stardew Valley', imagem: 'imagem/Pelúcias 1.jpeg', icon: 'fa-solid fa-paw',          cor: 'linear-gradient(135deg,#e9b8b0,#d29a93)' },
  { nome: 'Pokemons em Pelúcia',     desc: 'Pokemons em Pelúcia, perfeito para presentear.',        imagem: 'imagem/Pelúcia 2.jpeg', icon: 'fa-solid fa-rabbit',       cor: 'linear-gradient(135deg,#f1e4d3,#e3d0b8)' },
  { nome: 'boneco em Amigurumi',      desc: 'Boneco em Amigurumi com a linha tradicional.',     imagem: 'imagem/Bonecos Piticos MahArtesanatos 1.jpeg', icon: 'fa-solid fa-cat',          cor: 'linear-gradient(135deg,#e9b8b0,#b89880)' },
  { nome: 'Bonecos Piticos em Amigurumi',   desc: 'Bonecos Piticos em Amigurumi, mexem 10 cm, Ordem Paranormal.',           imagem: 'imagem/Bonecos Piticos MahArtesanatos 2.jpeg', icon: 'fa-solid fa-otter',        cor: 'linear-gradient(135deg,#f1e4d3,#e9b8b0)' },
  { nome: 'Bonecos Piticos em Amigurumi',desc: 'Bonecos Piticos em Amigurumi, mexem 10 cm, Ordem Paranormal..',    imagem: 'imagem/Bonecos Piticos MahArtesanatos 3.jpeg', icon: 'fa-solid fa-dog',          cor: 'linear-gradient(135deg,#e3d0b8,#b89880)' },
  { nome: 'Bonecos Piticos em Amigurumi',   desc: 'Bonecos Piticos em Amigurumi, mexem 10 cm, Ordem Paranormal..',      imagem: 'imagem/Bonecos Piticos MahArtesanatos 4.jpeg', icon: 'fa-solid fa-cloud',        cor: 'linear-gradient(135deg,#faf5ef,#e9b8b0)' },
  { nome: 'Marca Páginas Geek',desc: 'Marca-páginas artesanal para fãs do mundo geek.',         imagem: 'imagem/Marca Páginas 1.jpeg', icon: 'fa-solid fa-bookmark',     cor: 'linear-gradient(135deg,#e9b8b0,#f1e4d3)' },
  { nome: 'Marca-páginas Folha',desc: 'Delicado e único, para amantes do café.',        imagem: 'imagem/Marca Páginas 2.jpeg', icon: 'fa-solid fa-leaf',         cor: 'linear-gradient(135deg,#e3d0b8,#b89880)' },
  { nome: 'Santinha Maria',    desc: 'Santinha de pelúcia, símbolo de fé e carinho.',      imagem: 'imagem/santinhas.jpeg', icon: 'fa-solid fa-dove',         cor: 'linear-gradient(135deg,#faf5ef,#e3d0b8)' },
  { nome: 'Nossa Senhora',desc: 'Com 25 cm, em linhas Amigurumi Padrão e detalhes na Linha Encanto, toda bordada.',              imagem: 'imagem/santinhas 2.jpeg', icon: 'fa-solid fa-hands-praying',cor: 'linear-gradient(135deg,#f1e4d3,#d29a93)' },
  { nome: 'Brinco Pixel Art',  desc: 'Brinco artesanal estilo pixel, super charmoso.',      imagem: 'imagem/brincos.jpeg', icon: 'fa-solid fa-gem',          cor: 'linear-gradient(135deg,#d29a93,#8a6a55)' },
  { nome: 'Utilitários Porta Batom Cogumelo',desc: 'Utilitário de porta em crochê, decora e organiza.',imagem: 'imagem/Utilitários - Porta.jpeg',icon: 'fa-solid fa-heart',        cor: 'linear-gradient(135deg,#e9b8b0,#d29a93)' },
];

/* ---------- 2. Renderiza cards do carrossel ---------- */
const track = document.getElementById('carouselTrack');
const waLink = 'https://wa.me/12996042276?text=';

produtos.forEach(p => {
  const card = document.createElement('article');
  card.className = 'produto-card';
  card.innerHTML = `
    <div class="produto-imagem" style="background:${p.cor}">
      <img src="${p.imagem}" alt="${p.nome}" />
    </div>
    <div class="produto-info">
      <h3>${p.nome}</h3>
      <p>${p.desc}</p>
      <a href="${waLink}${encodeURIComponent('Olá Marina! Tenho interesse no produto: ' + p.nome)}"
         class="btn-encomendar" target="_blank" rel="noopener">
        Encomendar <i class="fa-solid fa-arrow-right"></i>
      </a>
    </div>
  `;
  track.appendChild(card);
});

/* ---------- 3. Lógica do carrossel ---------- */
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('carouselDots');

let currentIndex = 0;
let autoplayTimer = null;

function getVisibleCount() {
  if (window.innerWidth <= 640) return 1;
  if (window.innerWidth <= 900) return 2;
  return 3;
}

function getMaxIndex() {
  return Math.max(0, produtos.length - getVisibleCount());
}

function buildDots() {
  dotsContainer.innerHTML = '';
  const total = getMaxIndex() + 1;
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Ir para slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  }
  updateDots();
}

function updateDots() {
  [...dotsContainer.children].forEach((d, i) => {
    d.classList.toggle('active', i === currentIndex);
  });
}

function goTo(index) {
  const max = getMaxIndex();
  currentIndex = Math.max(0, Math.min(index, max));
  const card = track.querySelector('.produto-card');
  if (!card) return;
  const gap = parseFloat(getComputedStyle(track).gap) || 0;
  const offset = (card.offsetWidth + gap) * currentIndex;
  track.style.transform = `translateX(-${offset}px)`;
  updateDots();
}

function next() {
  const max = getMaxIndex();
  goTo(currentIndex >= max ? 0 : currentIndex + 1);
}
function prev() {
  const max = getMaxIndex();
  goTo(currentIndex <= 0 ? max : currentIndex - 1);
}

prevBtn.addEventListener('click', () => { prev(); resetAutoplay(); });
nextBtn.addEventListener('click', () => { next(); resetAutoplay(); });

/* Autoplay */
function startAutoplay() { autoplayTimer = setInterval(next, 5000); }
function resetAutoplay() { clearInterval(autoplayTimer); startAutoplay(); }

/* Touch / swipe no mobile */
let touchStartX = 0;
track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
track.addEventListener('touchend', e => {
  const diff = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(diff) > 50) {
    diff > 0 ? prev() : next();
    resetAutoplay();
  }
}, { passive: true });

/* Resize: rebuild dots and reset position */
window.addEventListener('resize', () => {
  buildDots();
  goTo(0);
});

buildDots();
goTo(0);
startAutoplay();

/* ---------- 4. Galeria estilo Instagram ---------- */
const galeria = document.getElementById('galeriaGrid');
const galeriaItens = [
  { imagem: 'imagem/foto1.png' },
  { imagem: 'imagem/foto2.png' },
  { imagem: 'imagem/foto3.png' },
  { imagem: 'imagem/foto4.png' },
  { imagem: 'imagem/foto5.png' },
  { imagem: 'imagem/foto6.png' },
];
galeriaItens.forEach(g => {
  const div = document.createElement('div');
  div.className = 'galeria-item';
  div.style.backgroundImage = `url('${g.imagem}')`;
  div.setAttribute('role', 'img');
  div.setAttribute('aria-label', 'Foto da galeria');
  galeria.appendChild(div);
});

/* ---------- 5. Menu mobile ---------- */
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

/* ---------- 6. Reveal on scroll ---------- */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ---------- 7. Ano dinâmico no rodapé ---------- */
document.getElementById('year').textContent = new Date().getFullYear();
