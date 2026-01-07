/* --- INTERACTIVE BACKGROUND SCRIPT --- */
const canvas = document.getElementById('roboCanvas');
const ctx = canvas.getContext('2d');


let particlesArray;


// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let mouse = {
    x: null,
    y: null,
    radius: (canvas.height/80) * (canvas.width/80)
}


// Track Mouse Position
window.addEventListener('mousemove',
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
);


// Create Particle Class
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    // Draw individual particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#60a5fa'; // Light Blue dot
        ctx.fill();
    }
    // Update particle position
    update() {
        // Check if particle is still within canvas
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }


        // Check collision detection - mouse position / particle position
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
       
        // Interaction: Push particles slightly if mouse is close
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - 10) {
                this.x += 10;
            }
            if (mouse.x > this.x && this.x > 10) {
                this.x -= 10;
            }
            if (mouse.y < this.y && this.y < canvas.height - 10) {
                this.y += 10;
            }
            if (mouse.y > this.y && this.y > 10) {
                this.y -= 10;
            }
        }
       
        // Move particle
        this.x += this.directionX;
        this.y += this.directionY;
       
        this.draw();
    }
}


// Create particle array
function init() {
    particlesArray = [];
    // Number of particles based on screen size
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
   
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1; // Random size 1-3
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 2) - 1; // Speed -1 to 1
        let directionY = (Math.random() * 2) - 1;
        let color = '#60a5fa';
       
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}


// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth, innerHeight);
   
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}


// Draw lines between close particles
function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
            + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
           
            if (distance < (canvas.width/7) * (canvas.height/7)) {
                opacityValue = 1 - (distance/20000);
                // Line color (faint blue)
                ctx.strokeStyle = 'rgba(96, 165, 250,' + opacityValue + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}


// Handle Window Resize
window.addEventListener('resize',
    function() {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mouse.radius = ((canvas.height/80) * (canvas.height/80));
        init();
    }
);


// Start
init();
animate();

