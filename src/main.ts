import { CanvasContext } from './components/canvasContext';
import { Player } from './components/player';
import { Projectile } from './components/projectile';
import { Enemy } from './components/enemy';
import { Particle } from './components/particle';
import { AudioState } from './components/audioHandler';
import './style.css';
import gsap from 'gsap';

const canvasContext = CanvasContext.getInstance();

//player instance
let player: Player;
let hpBar = document.querySelector('#hp-bar') as HTMLElement;
let startMenu = document.querySelector('#start-menu') as HTMLElement;
let startBtn = document.querySelector('#startBtn') as HTMLElement;
let gameOverMenu = document.querySelector('#game-over-menu') as HTMLElement;
let restartBtn = document.querySelector('#restartBtn') as HTMLElement;
let isReady = false;

// animate everything
let isAlive: number;

let projectiles: Projectile[] = [];
let particles: Particle[] = [];
let enemies: Enemy[] = [];

function init() {
    player = new Player(20, 'white')
    hpBar.style.width = `${player.hp}%`;
    projectiles = [];
    particles = [];
    enemies = [];
}

function animate(): void {
    isAlive = requestAnimationFrame(animate);
    canvasContext.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    canvasContext.ctx.fillRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
    player.spawn();

    //particles
    particles.forEach((particle, ptId) => {
        if (particle.alpha <= 0) {
            particles.splice(ptId, 1)
        } else {
            particle.update();
        }
    });

    projectiles.forEach((projectile, pid) => {
        projectile.update();

        if (projectile.x - projectile.radius < 0 ||
            projectile.x + projectile.radius > canvasContext.canvas.width ||
            projectile.y - projectile.radius < 0 ||
            projectile.y + projectile.radius > canvasContext.canvas.height
            ) {
            projectiles.splice(pid, 1);
        }
    });

    enemies.forEach((enemy, id) => {
        enemy.update();

        const playerDist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
        const currentTime = Date.now(); //collider cd for enemies

        //player hitpoints
        if (playerDist - enemy.radius - player.radius < 1 &&
            currentTime - enemy.lastDamageTime > enemy.damageCd
        ) {
            AudioState.PlayerHit.play();
            enemies.splice(id, 1);
            for (let i = 0; i < enemy.radius * 2; i++) {

                const particleSize = Math.random() * 3;

                particles.push(
                    new Particle(
                        enemy.x,
                        enemy.y,
                        particleSize,
                        enemy.color,
                        {
                            x: (Math.random() - 0.5) * (Math.random() * 4),
                            y: (Math.random() - 0.5) * (Math.random() * 4)
                        }
                ));
            }

            player.takeDamage(20);
            hpBar.style.width = `${player.hp}%`
            enemy.lastDamageTime = currentTime;
            console.log(`Player has ` + player.hp + ` left`);

            if (!player.isAlive) {
                setTimeout(() => {
                    isReady = false;
                    cancelAnimationFrame(isAlive);
                    gameOverMenu.style.display = 'flex'
                }, 500);
            };
        };

        projectiles.forEach((projectile, pid) => {
            const dist = Math.hypot(projectile.x - enemy.x,
                projectile.y - enemy.y
            );

            //projectile collider
            if (dist - enemy.radius - projectile.radius < 1) {

                for (let i = 0; i < enemy.radius * 2; i++) {

                    const particleSize = Math.random() * 3;

                    particles.push(
                        new Particle(
                            projectile.x,
                            projectile.y,
                            particleSize,
                            enemy.color,
                            {
                                x: (Math.random() - 0.5) * (Math.random() * 4),
                                y: (Math.random() - 0.5) * (Math.random() * 4)
                            }
                    ));
                }

                //deal dmg
                if (enemy.radius - 5 > 5) {
                    gsap.to(enemy, {
                        radius: enemy.radius - 5
                    });
                    setTimeout(() => {
                        projectiles.splice(pid, 1);
                    }, 0);
                } else {
                    setTimeout(() => {
                        enemies.splice(id, 1)
                        projectiles.splice(pid, 1);
                    }, 0);
                }
            }
        });
    });
}

function spawnEnemies() {
    setInterval(() => {
        //hp, min-hp
        const radius = Math.random() * (20 - 5) + 5;

        let x: number = 0;
        let y: number = 0;

        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius : canvasContext.canvas.width + radius;
            y = Math.random() * canvasContext.canvas.height;
        } else {
            x = Math.random() * canvasContext.canvas.width;
            y = Math.random() < 0.5 ? 0 - radius : canvasContext.canvas.height + radius;
        }


        const color = `hsl(${Math.random() * 360}, 50%, 50%)`

        const angle = Math.atan2(
            canvasContext.canvas.height / 2 - y,
            canvasContext.canvas.width / 2 - x
        )

        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        enemies.push(new Enemy(x, y, radius, color, velocity));
    }, 1500);
}

//mouse click event
window.addEventListener('click', (event) => {

    if (player.isAlive && isReady) {
        AudioState.Shoot.play();
    }

    const angle = Math.atan2(
        event.clientY - canvasContext.canvas.height / 2,
        event.clientX - canvasContext.canvas.width / 2
    )

    //player fire rate
    const velocity = {
        x: Math.cos(angle) * 1.5,
        y: Math.sin(angle) * 1.5
    }

    //shoot projectile
    if (isReady) {
        projectiles.push(new Projectile(
            canvasContext.canvas.width / 2, canvasContext.canvas.height / 2,
            7,
            'white', velocity
        ));
    }
});

startBtn.addEventListener('click', () => {
    isReady = true;
    startMenu.style.display = 'none';
    hpBar.style.display = 'block';
    init();
    animate();
    spawnEnemies();
});

restartBtn.addEventListener('click', () => {
    isReady = true;
    gameOverMenu.style.display = 'none';
    init();
    animate();
    spawnEnemies();
});
