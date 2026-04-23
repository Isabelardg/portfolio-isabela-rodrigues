/* scroll */
function irParaProjetos() {
  document.getElementById("projetos").scrollIntoView({
    behavior: "smooth"
  });
}

/* animação do scroll */
const elements = document.querySelectorAll('.hidden');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
});

elements.forEach((el) => observer.observe(el));


/* particulas */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

const mouse = {
  x: null,
  y: null
};

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 0.5;
    this.speedX = Math.random() * 0.2 - 0.1;
    this.speedY = Math.random() * 0.2 - 0.1;
    this.opacity = Math.random();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
    if (this.y > canvas.height || this.y < 0) this.speedY *= -1;

    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 120) {
      this.x -= dx / 50;
      this.y -= dy / 50;
    }
  }

  draw() {
    ctx.fillStyle = `rgba(199,125,255,${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  particlesArray = [];

  const quantidade = window.innerWidth < 768 ? 60 : 120;

  for (let i = 0; i < quantidade; i++) {
    particlesArray.push(
      new Particle(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      )
    );
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});


/* mouse glow */
const glow = document.querySelector(".mouse-glow");

window.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});


/* email (emailjs) */


(function () {
  emailjs.init("o4UYzF8F67bmC_VoD");
})();

const form = document.getElementById("form-contato");
const status = document.getElementById("status-email");

if (form) {
  const botao = form.querySelector("button");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    botao.disabled = true;
    botao.innerText = "Enviando...";

    emailjs.sendForm("service_qq2b3pq", "template_906bmi5", this)
      .then(() => {

        status.innerText = "Mensagem enviada com sucesso!";
        status.className = "status-email sucesso";

        setTimeout(() => {
          status.innerText = "";
          status.className = "status-email";
        }, 3000);

        form.reset();

        botao.disabled = false;
        botao.innerText = "Enviar por Email";

      })
      .catch(() => {

        status.innerText = "Erro ao enviar. Tente novamente.";
        status.className = "status-email erro";

        setTimeout(() => {
          status.innerText = "";
          status.className = "status-email";
        }, 3000);

        botao.disabled = false;
        botao.innerText = "Enviar por Email";

      });
  });
}


// linguagens (traduções)

// digitando


let typingInterval = null;
let typingTimeout = null;
let typingIndex = 0;

// textos e funções (i18n + digitando)


const textos = {
  pt: {
    "nav.home": "Home",
    "nav.about": "Sobre",
    "nav.services": "Serviços",
    "nav.projects": "Projetos",
    "nav.contact": "Contato",

    "home.status": "Disponível para projetos",
    "home.title": "Isabela Rodrigues",
    "home.subtitle": "",
    "home.desc": "Aprendendo, construindo e evoluindo na tecnologia.",
    "home.button": "Ver projetos",

    "about.title": "Sobre mim",
    "about.p1": "Sou estudante de Sistemas de Informação e tenho interesse na área de tecnologia desde cedo.",
    "about.p2": "Tenho experiência em HTML, CSS e JavaScript, além de Python, C e Java. Também já tive contato com bancos de dados, SQL e modelagem de dados.",
    "about.p3": "Gosto de aprender na prática, desenvolvendo projetos e melhorando minhas habilidades de resolução de problemas e trabalho em equipe.",
    "about.p4": "Atualmente, estou em busca de oportunidades para aplicar meus conhecimentos e crescer na área de tecnologia.",

    "services.title": "Serviços",
    "services.s1.title": "Sistemas e Automação",
    "services.s1.desc": "Desenvolvimento de sistemas e automações com Python, C e Java.",
    "services.s2.title": "Desenvolvimento Web",
    "services.s2.desc": "Criação de sites responsivos com HTML, CSS e JavaScript.",
    "services.s3.title": "Banco de Dados",
    "services.s3.desc": "Organização e manipulação de dados com SQL e modelagem.",
    "services.s4.title": "Interface (UI/UX)",
    "services.s4.desc": "Criação de interfaces intuitivas com foco na experiência do usuário.",

    "projects.title": "Projetos",
    "projects.p1.title": "Site de Pizzaria Interativo",
    "projects.p1.desc": "Site responsivo com interface moderna para simulação de pedidos online.",
    "projects.p2.title": "Automação de Dados",
    "projects.p2.desc": "Sistema para leitura e organização de dados em JSON.",
    "projects.p3.title": "Jogo do Mario",
    "projects.p3.desc": "Jogo interativo desenvolvido com JavaScript.",
    "projects.view": "Ver projeto",
    "projects.all": "Ver mais projetos no GitHub",

    "contact.title": "Contato",
    "contact.text": "Me envie uma mensagem e vamos conversar :)",
    "contact.name": "Seu nome",
    "contact.email": "Seu email",
    "contact.message": "Sua mensagem",
    "contact.button": "Enviar por Email",
    "contact.whatsapp": "Ou fale comigo pelo WhatsApp",

    "footer": "© 2026 Isabela Rodrigues - Todos os direitos reservados",

    typing: [
      "Desenvolvedora e estudante de Sistemas de Informação"
    ]
  },

  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.contact": "Contact",

    "home.status": "Available for projects",
    "home.title": "Isabela Rodrigues",
    "home.subtitle": "",
    "home.desc": "Learning, building and growing in technology.",
    "home.button": "See projects",

    "about.title": "About me",
    "about.p1": "I am an Information Systems student with an interest in technology since an early age.",
    "about.p2": "I have experience with HTML, CSS and JavaScript, as well as Python, C and Java. I also have experience with databases, SQL and data modeling.",
    "about.p3": "I enjoy learning through hands-on projects and continuously improving my problem-solving and teamwork skills.",
    "about.p4": "I am currently looking for opportunities to apply my knowledge and grow in the technology field.",

    "services.title": "Services",
    "services.s1.title": "Systems & Automation",
    "services.s1.desc": "Development of systems and automation using Python, C and Java.",
    "services.s2.title": "Web Development",
    "services.s2.desc": "Building responsive websites with HTML, CSS and JavaScript.",
    "services.s3.title": "Databases",
    "services.s3.desc": "Data organization, SQL queries and modeling.",
    "services.s4.title": "UI/UX",
    "services.s4.desc": "Designing intuitive interfaces focused on user experience.",

    "projects.title": "Projects",
    "projects.p1.title": "Interactive Pizza Website",
    "projects.p1.desc": "Responsive website for online order simulation.",
    "projects.p2.title": "Data Automation System",
    "projects.p2.desc": "System for reading and structuring data into JSON.",
    "projects.p3.title": "Mario Game",
    "projects.p3.desc": "Interactive game developed with JavaScript.",
    "projects.view": "View project",
    "projects.all": "See more projects on GitHub",

    "contact.title": "Contact",
    "contact.text": "Send me a message and let's talk :)",
    "contact.name": "Your name",
    "contact.email": "Your email",
    "contact.message": "Your message",
    "contact.button": "Send Email",
    "contact.whatsapp": "Or contact me on WhatsApp",

    "footer": "© 2026 Isabela Rodrigues - All rights reserved",

    typing: [
      "Developer and Information Systems student"
    ]
  },

  es: {
    "nav.home": "Inicio",
    "nav.about": "Sobre mí",
    "nav.services": "Servicios",
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",
    
    "home.status": "Disponible para proyectos",
    "home.title": "Isabela Rodrigues",
    "home.subtitle": "",
    "home.desc": "Aprendiendo y creciendo en tecnología.",
    "home.button": "Ver proyectos",

    "about.title": "Sobre mí",
    "about.p1": "Soy estudiante de Sistemas de Información con interés en tecnología desde temprana edad.",
    "about.p2": "Tengo experiencia con HTML, CSS y JavaScript, además de Python, C y Java. También tengo conocimientos en bases de datos, SQL y modelado de datos.",
    "about.p3": "Me gusta aprender mediante proyectos prácticos y mejorar continuamente mis habilidades de resolución de problemas y trabajo en equipo.",
    "about.p4": "Actualmente busco oportunidades para aplicar mis conocimientos y crecer en el área de tecnología.",

    "services.title": "Servicios",
    "services.s1.title": "Sistemas y Automatización",
    "services.s1.desc": "Desarrollo de sistemas y automatizaciones con Python, C y Java.",
    "services.s2.title": "Desarrollo Web",
    "services.s2.desc": "Creación de sitios web responsivos con HTML, CSS y JavaScript.",
    "services.s3.title": "Bases de Datos",
    "services.s3.desc": "Organización de datos, consultas SQL y modelado.",
    "services.s4.title": "UI/UX",
    "services.s4.desc": "Diseño de interfaces intuitivas centradas en el usuario.",

    "projects.title": "Proyectos",
    "projects.p1.title": "Sitio de Pizza Interactivo",
    "projects.p1.desc": "Sitio web responsivo para simulación de pedidos online.",
    "projects.p2.title": "Automatización de Datos",
    "projects.p2.desc": "Sistema para estructurar datos en JSON.",
    "projects.p3.title": "Juego Mario",
    "projects.p3.desc": "Juego interactivo desarrollado con JavaScript.",
    "projects.view": "Ver proyecto",
    "projects.all": "Ver más proyectos en GitHub",

    "contact.title": "Contacto",
    "contact.text": "Envíame un mensaje y hablemos :)",
    "contact.name": "Tu nombre",
    "contact.email": "Tu email",
    "contact.message": "Tu mensaje",
    "contact.button": "Enviar",
    "contact.whatsapp": "O contáctame por WhatsApp",

    "footer": "© 2026 Isabela Rodrigues - Todos los derechos reservados",

    typing: [
      "Desarrolladora y estudiante de Sistemas de Información"
    ]
  }
};

// digitando funçaõ


function iniciarTyping(lang) {
  const el = document.getElementById("digitando");
  if (!el) return;

  const frases = textos?.[lang]?.typing || [];
  if (!frases) return;

  clearInterval(typingInterval);
  clearTimeout(typingTimeout);

  typingInterval = null;
  typingTimeout = null;
  typingIndex = 0;
  el.textContent = "";

  function escrever() {
    const texto = frases[typingIndex];
    let i = 0;

    el.textContent = "";

    clearInterval(typingInterval);

    typingInterval = setInterval(() => {
      el.textContent += texto[i];
      i++;

      if (i >= texto.length) {
        clearInterval(typingInterval);
        typingInterval = null;

        typingTimeout = setTimeout(() => {
          typingIndex = (typingIndex + 1) % frases.length;
          escrever();
        }, 1500);
      }
    }, 60);
  }

  escrever();
}

// mudar o idioma


function mudarIdioma(lang) {
  localStorage.setItem("lang", lang);

  document.querySelectorAll(".lang-buttons button").forEach(btn => {
    btn.classList.remove("active");
    if (btn.textContent.toLowerCase() === lang) {
      btn.classList.add("active");
    }
  });

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (textos[lang] && textos[lang][key]) {
      el.textContent = textos[lang][key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (textos[lang] && textos[lang][key]) {
      el.placeholder = textos[lang][key];
    }
  });

  iniciarTyping(lang);
}

// salva o idioma e carrega ele 


document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "pt";
  mudarIdioma(savedLang);
});