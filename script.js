// ============================================================
// 🌻 FLORES AMARILLAS - SCRIPT.JS
// ============================================================


// ============================================================
// ELEMENTOS
// ============================================================

const openBtn =
    document.getElementById("open-btn");

const replayBtn =
    document.getElementById("replay-btn");

const modal =
    document.getElementById("modal");

const modalCard =
    document.getElementById("modal-card");

const music =
    document.getElementById("bg-music");

const musicToggle =
    document.getElementById("music-toggle");


// ============================================================
// ESTRELLAS
// ============================================================

const starsCanvas =
    document.getElementById("stars");

const starsContext =
    starsCanvas.getContext("2d");

let stars = [];


function resizeStars() {

    starsCanvas.width =
        window.innerWidth;

    starsCanvas.height =
        window.innerHeight;

    createStars();
}


function createStars() {

    stars = [];

    const amount =
        Math.floor(
            (window.innerWidth *
                window.innerHeight) / 9000
        );


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        stars.push({

            x:
                Math.random() *
                starsCanvas.width,

            y:
                Math.random() *
                starsCanvas.height,

            radius:
                Math.random() * 1.5 + 0.3,

            alpha:
                Math.random() * 0.7 + 0.2,

            speed:
                Math.random() * 0.01 + 0.002,

            phase:
                Math.random() * Math.PI * 2

        });

    }
}


function drawStars() {

    starsContext.clearRect(
        0,
        0,
        starsCanvas.width,
        starsCanvas.height
    );


    const time =
        Date.now() * 0.001;


    stars.forEach(star => {

        const opacity =
            star.alpha +
            Math.sin(
                time * star.speed * 100 +
                star.phase
            ) * 0.15;


        starsContext.beginPath();


        starsContext.arc(
            star.x,
            star.y,
            star.radius,
            0,
            Math.PI * 2
        );


        starsContext.fillStyle =
            `rgba(255,255,220,${Math.max(0.1, opacity)})`;


        starsContext.fill();

    });


    requestAnimationFrame(
        drawStars
    );
}


window.addEventListener(
    "resize",
    resizeStars
);


resizeStars();
drawStars();


// ============================================================
// DATOS DE LAS FLORES
// ============================================================

const flowersData = [

    { x: 50, y: 38, delay: 100 },
    { x: 43, y: 43, delay: 180 },
    { x: 57, y: 43, delay: 260 },

    { x: 35, y: 48, delay: 340 },
    { x: 65, y: 48, delay: 420 },

    { x: 28, y: 54, delay: 500 },
    { x: 72, y: 54, delay: 580 },

    { x: 39, y: 53, delay: 660 },
    { x: 61, y: 53, delay: 740 },

    { x: 50, y: 50, delay: 820 },

    { x: 24, y: 61, delay: 900 },
    { x: 76, y: 61, delay: 980 },

    { x: 34, y: 60, delay: 1060 },
    { x: 66, y: 60, delay: 1140 },

    { x: 43, y: 59, delay: 1220 },
    { x: 57, y: 59, delay: 1300 },

    { x: 18, y: 67, delay: 1380 },
    { x: 82, y: 67, delay: 1460 },

    { x: 29, y: 68, delay: 1540 },
    { x: 71, y: 68, delay: 1620 },

    { x: 39, y: 66, delay: 1700 },
    { x: 61, y: 66, delay: 1780 },

    { x: 50, y: 63, delay: 1860 },

    { x: 22, y: 73, delay: 1940 },
    { x: 78, y: 73, delay: 2020 },

    { x: 33, y: 74, delay: 2100 },
    { x: 67, y: 74, delay: 2180 }

];


// ============================================================
// GENERAR RAMO
// ============================================================

function generateBouquet() {

    const svg =
        document.getElementById(
            "bouquet"
        );


    if (!svg) {

        console.error(
            "No existe el SVG #bouquet"
        );

        return;
    }


    // Eliminar flores anteriores
    svg.querySelectorAll(
        ".flower-generated"
    ).forEach(element => {

        element.remove();

    });


    const namespace =
        "http://www.w3.org/2000/svg";


    flowersData.forEach(
        (flower, index) => {


            // =================================================
            // GRUPO PRINCIPAL
            // =================================================

            const flowerGroup =
                document.createElementNS(
                    namespace,
                    "g"
                );


            flowerGroup.classList.add(
                "flower-generated"
            );


            // =================================================
            // POSICIÓN DE LA CABEZA
            // =================================================

            const x =
                (flower.x / 100) * 400;

            const y =
                (flower.y / 100) * 400;


            // =================================================
            // TALLO
            // =================================================

            const stem =
                document.createElementNS(
                    namespace,
                    "path"
                );


            // ESTE PUNTO ESTÁ DENTRO DE LA TIERRA
            const startX = 200;
            const startY = 329;


            // Curva del tallo
            const controlX =
                startX +
                (x - startX) * 0.45;


            const controlY =
                startY +
                (y - startY) * 0.50;


            const pathData =
                `M ${startX} ${startY}
                 Q ${controlX} ${controlY}
                 ${x} ${y}`;


            stem.setAttribute(
                "d",
                pathData
            );


            stem.classList.add(
                "flower-stem"
            );


            // =================================================
            // ANIMACIÓN DEL TALLO
            // =================================================

            const pathLength = 400;


            stem.style.strokeDasharray =
                pathLength;


            stem.style.strokeDashoffset =
                pathLength;


            flowerGroup.appendChild(
                stem
            );


            // =================================================
            // CABEZA
            // =================================================

            const flowerHead =
                document.createElementNS(
                    namespace,
                    "g"
                );


            flowerHead.classList.add(
                "flower-head"
            );


            // La flor empieza invisible
            flowerHead.setAttribute(
                "transform",
                `translate(${x}, ${y}) scale(0)`
            );


            // =================================================
            // PÉTALOS
            // =================================================

            const petalCount = 12;


            for (
                let p = 0;
                p < petalCount;
                p++
            ) {

                const angle =
                    (360 / petalCount) * p;


                const petal =
                    document.createElementNS(
                        namespace,
                        "ellipse"
                    );


                petal.setAttribute(
                    "cx",
                    "0"
                );


                petal.setAttribute(
                    "cy",
                    "-14"
                );


                petal.setAttribute(
                    "rx",
                    "7"
                );


                petal.setAttribute(
                    "ry",
                    "16"
                );


                petal.setAttribute(
                    "transform",
                    `rotate(${angle})`
                );


                petal.classList.add(
                    "flower-petal"
                );


                petal.setAttribute(
                    "fill",
                    index % 2 === 0
                        ? "url(#petalGradient)"
                        : "url(#petalGradient2)"
                );


                flowerHead.appendChild(
                    petal
                );

            }


            // =================================================
            // CENTRO OSCURO
            // =================================================

            const center =
                document.createElementNS(
                    namespace,
                    "circle"
                );


            center.setAttribute(
                "cx",
                "0"
            );


            center.setAttribute(
                "cy",
                "0"
            );


            center.setAttribute(
                "r",
                "10"
            );


            center.classList.add(
                "flower-center"
            );


            flowerHead.appendChild(
                center
            );


            // =================================================
            // ANILLO INTERIOR
            // =================================================

            const inner =
                document.createElementNS(
                    namespace,
                    "circle"
                );


            inner.setAttribute(
                "cx",
                "0"
            );


            inner.setAttribute(
                "cy",
                "0"
            );


            inner.setAttribute(
                "r",
                "7"
            );


            inner.classList.add(
                "flower-inner"
            );


            flowerHead.appendChild(
                inner
            );


            // =================================================
            // PUNTO CENTRAL
            // =================================================

            const dot =
                document.createElementNS(
                    namespace,
                    "circle"
                );


            dot.setAttribute(
                "cx",
                "-2"
            );


            dot.setAttribute(
                "cy",
                "-2"
            );


            dot.setAttribute(
                "r",
                "2"
            );


            dot.classList.add(
                "flower-dot"
            );


            flowerHead.appendChild(
                dot
            );


            // =================================================
            // AGREGAR CABEZA
            // =================================================

            flowerGroup.appendChild(
                flowerHead
            );


            // =================================================
            // AGREGAR TODO AL SVG
            // =================================================

            svg.appendChild(
                flowerGroup
            );


            // =================================================
            // ANIMAR TALLO
            // =================================================

            setTimeout(() => {

                stem.style.transition =
                    "stroke-dashoffset 1.7s ease";

                stem.style.strokeDashoffset =
                    "0";

            }, flower.delay);


            // =================================================
            // HACER APARECER LA FLOR
            // =================================================

            setTimeout(() => {

                // IMPORTANTE:
                // No usamos flowerHead.style.transform.
                // Usamos directamente el atributo SVG.

                flowerHead.setAttribute(
                    "transform",
                    `translate(${x}, ${y}) scale(1)`
                );


                flowerGroup.classList.add(
                    "sway"
                );

            }, flower.delay + 1500);

        }
    );
}


// ============================================================
// CARTAS
// ============================================================

const cards = [

    {
        icon: "🌻",

        title: "Para ti",

        text:
            "🌻 Para ti, en este día de las flores amarillas 💛\n\n" +

            "Hoy no quería regalarte solamente una flor amarilla… " +

            "quería regalarte un recuerdo, un pequeño momento que " +

            "puedas guardar y volver a mirar cuando quieras.\n\n" +

            "Porque a veces un pequeño detalle puede decir mucho " +

            "más que mil palabras, y hoy quería que estas flores " +

            "llevaran un poquito de ese cariño hasta ti."
    },


    {
        icon: "💛",

        title: "Lo que significan",

        text:
            "Dicen que las flores amarillas representan alegría, " +

            "esperanza y nuevos comienzos, pero para mí hoy " +

            "significan algo más: pensar en ti y querer hacerte sonreír.\n\n" +

            "Porque cuando alguien ocupa un lugar especial en " +

            "nuestros pensamientos, cualquier detalle puede convertirse " +

            "en una forma bonita de decir: me acordé de ti.\n\n" +

            "Y hoy, entre tantas flores, elegí estas pensando en ti."
    },


    {
        icon: "✨",

        title: "Un recuerdo",

        text:
            "Quizás una flor pueda marchitarse con el tiempo, " +

            "pero hay momentos que permanecen para siempre en el corazón.\n\n" +

            "Y este es uno de ellos.\n\n" +

            "Tal vez algún día estas flores ya no estén aquí, " +

            "pero me gustaría que cuando recuerdes este momento " +

            "puedas sonreír y recordar que alguien quiso regalarte " +

            "algo diferente: un instante hecho para ti."
    },


    {
        icon: "🌙",

        title: "Algo especial",

        text:
            "🌻 Por eso, estas flores son para ti.\n\n" +

            "No solamente por ser 21 de septiembre, sino porque " +

            "hay personas que merecen recibir algo bonito simplemente " +

            "por existir y formar parte de nuestras vidas.\n\n" +

            "Y si esta pequeña página consigue regalarte aunque " +

            "sea una sonrisa, entonces todo este detalle habrá valido " +

            "la pena.\n\n" +

            "Porque verte feliz también puede convertirse en " +

            "un bonito motivo para sonreír."
    },


    {
        icon: "❤️",

        title: "Para terminar",

        text:
            "Espero que cuando veas estas flores recuerdes que " +

            "alguien pensó en ti con cariño y quiso convertir " +

            "un pequeño detalle en un recuerdo especial.\n\n" +

            "Feliz Día de las Flores Amarillas. 💛🌻\n\n" +

            "Y si pudiera elegir una flor entre todas, " +

            "volvería a elegir una para ti.\n\n" +

            "No porque sea la flor más bonita del mundo, " +

            "sino porque hoy lleva tu nombre en mis pensamientos.\n\n" +

            "Que esta pequeña flor amarilla te recuerde que " +

            "hay momentos, personas y detalles que llegan " +

            "sin avisar… y terminan guardándose para siempre " +

            "en algún rincón del corazón. ❤️"
    }

];


// ============================================================
// CARTA ACTUAL
// ============================================================

let currentCard = 0;


// ============================================================
// ELEMENTOS DE LAS CARTAS
// ============================================================

const cardsContainer =
    document.getElementById(
        "cards-container"
    );


const messageArea =
    document.getElementById(
        "message-area"
    );


const letterIcon =
    document.getElementById(
        "letter-icon"
    );


const letterTitle =
    document.getElementById(
        "letter-title"
    );


const letterText =
    document.getElementById(
        "letter-text"
    );


const prevCard =
    document.getElementById(
        "prev-card"
    );


const nextCard =
    document.getElementById(
        "next-card"
    );


const dots =
    document.querySelectorAll(
        ".dot"
    );


// ============================================================
// EFECTO DE ESCRITURA
// ============================================================

let typingTimer = null;


function typeMessage(text) {

    if (typingTimer !== null) {

        clearInterval(
            typingTimer
        );

    }


    letterText.textContent =
        "";


    let position = 0;


    typingTimer =
        setInterval(() => {

            if (
                position <
                text.length
            ) {

                letterText.textContent +=
                    text.charAt(
                        position
                    );

                position++;

            } else {

                clearInterval(
                    typingTimer
                );

                typingTimer = null;

            }

        }, 18);
}


// ============================================================
// ACTUALIZAR PUNTOS
// ============================================================

function updateDots() {

    dots.forEach(
        (dot, index) => {

            if (
                index === currentCard
            ) {

                dot.classList.add(
                    "active"
                );

            } else {

                dot.classList.remove(
                    "active"
                );

            }

        }
    );
}


// ============================================================
// BOTONES ANTERIOR / SIGUIENTE
// ============================================================

function updateNavigation() {

    if (prevCard) {

        prevCard.disabled =
            currentCard === 0;

    }


    if (nextCard) {

        nextCard.disabled =
            currentCard ===
            cards.length - 1;

    }


    updateDots();
}


// ============================================================
// MOSTRAR CARTA
// ============================================================

function showCard(index) {

    if (
        index < 0 ||
        index >= cards.length
    ) {

        return;
    }


    currentCard = index;


    const card =
        cards[currentCard];


    // Ocultar menú
    cardsContainer.classList.add(
        "hidden"
    );


    // Mostrar mensaje
    messageArea.classList.remove(
        "hidden"
    );


    letterIcon.textContent =
        card.icon;


    letterTitle.textContent =
        card.title;


    typeMessage(
        card.text
    );


    updateNavigation();
}


// ============================================================
// MOSTRAR MENÚ DE CARTAS
// ============================================================

function showCards() {

    if (typingTimer !== null) {

        clearInterval(
            typingTimer
        );

        typingTimer = null;

    }


    cardsContainer.classList.remove(
        "hidden"
    );


    messageArea.classList.add(
        "hidden"
    );


    currentCard = 0;

    updateNavigation();
}


// ============================================================
// BOTONES DE LAS 5 CARTAS
// ============================================================

document
    .querySelectorAll(".mini-card")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const index =
                    parseInt(
                        button.dataset.card,
                        10
                    );


                showCard(index);

            }
        );

    });


// ============================================================
// SIGUIENTE
// ============================================================

if (nextCard) {

    nextCard.addEventListener(
        "click",
        () => {

            if (
                currentCard <
                cards.length - 1
            ) {

                showCard(
                    currentCard + 1
                );

            }

        }
    );

}


// ============================================================
// ANTERIOR
// ============================================================

if (prevCard) {

    prevCard.addEventListener(
        "click",
        () => {

            if (
                currentCard > 0
            ) {

                showCard(
                    currentCard - 1
                );

            }

        }
    );

}


// ============================================================
// ABRIR MODAL
// ============================================================

function openModal() {

    modal.classList.remove(
        "pointer-events-none"
    );


    modal.classList.remove(
        "opacity-0"
    );


    modalCard.classList.remove(
        "scale-95"
    );


    modalCard.classList.add(
        "scale-100"
    );


    showCards();

}


// ============================================================
// CERRAR MODAL
// ============================================================

function closeModal() {

    modal.classList.add(
        "opacity-0"
    );


    modalCard.classList.remove(
        "scale-100"
    );


    modalCard.classList.add(
        "scale-95"
    );


    setTimeout(() => {

        modal.classList.add(
            "pointer-events-none"
        );

    }, 350);

}


// ============================================================
// ABRIR DETALLE
// ============================================================

if (openBtn) {

    openBtn.addEventListener(
        "click",
        () => {

            openModal();

            // El navegador permite iniciar
            // la música después del clic.
            playMusic();

        }
    );

}


// ============================================================
// CERRAR
// ============================================================

document
    .querySelectorAll(".close-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            closeModal
        );

    });


// ============================================================
// CERRAR AL HACER CLIC FUERA
// ============================================================

modal.addEventListener(
    "click",
    event => {

        if (
            event.target === modal
        ) {

            closeModal();

        }

    }
);


// ============================================================
// ESC
// ============================================================

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeModal();

        }

    }
);


// ============================================================
// MÚSICA
// ============================================================

async function playMusic() {

    if (!music) {

        return;

    }


    try {

        await music.play();


        musicToggle.textContent =
            "🔊";


        musicToggle.title =
            "Pausar música";

    } catch (error) {

        console.log(
            "La reproducción necesita interacción del usuario."
        );

    }

}


function pauseMusic() {

    if (!music) {

        return;

    }


    music.pause();


    musicToggle.textContent =
        "🎵";


    musicToggle.title =
        "Reproducir música";

}


if (musicToggle) {

    musicToggle.addEventListener(
        "click",
        () => {

            if (
                music.paused
            ) {

                playMusic();

            } else {

                pauseMusic();

            }

        }
    );

}


// ============================================================
// REPLAY DEL RAMO
// ============================================================

if (replayBtn) {

    replayBtn.addEventListener(
        "click",
        () => {

            generateBouquet();

        }
    );

}


// ============================================================
// INICIAR RAMO
// ============================================================

window.addEventListener(
    "load",
    () => {

        generateBouquet();

    }
);