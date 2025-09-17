const toggle = document.getElementById('toggle');
const emoji = document.getElementById('emoji');
const body = document.body;

// Alternar Dark/Light Mode
toggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    body.classList.toggle('light');

    // Alterar emoji conforme o modo
    if (body.classList.contains('dark')) {
        emoji.textContent = '🌙';
    } else {
        emoji.textContent = '☀';
    }
});

// Partículas futuristas coloridas
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

// Ajustar canvas ao tamanho da tela
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.colorLight = `rgba(255, 255, 255, ${Math.random()})`; // Partículas brancas no dia
        this.colorDark = `rgba(0, 255, 255, ${Math.random()})`;     // Partículas ciano no modo noite
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Reaparecer do outro lado ao sair da tela
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = body.classList.contains('dark') ? this.colorDark : this.colorLight;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Criar partículas
function init() {
    particlesArray = [];
    for (let i = 0; i < 150; i++) {
        particlesArray.push(new Particle());
    }
}
init();

// Animar partículas
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}
animate();

// Redimensionar canvas ao ajustar janela
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});
