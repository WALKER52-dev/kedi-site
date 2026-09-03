const home = document.getElementById("home");
const yesPage = document.getElementById("yesPage");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const message = document.getElementById("message");


/* =========================
   EVET BUTONU
========================= */

yesBtn.addEventListener("click", function () {

    home.classList.remove("active");
    yesPage.classList.add("active");

    createConfetti();

});


/* =========================
   HAYIR BUTONU
   RASTGELE YERE IŞINLAN
========================= */

document.addEventListener("mousemove", function (event) {

    if (!home.classList.contains("active")) {
        return;
    }

    const rect = noBtn.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distance = Math.hypot(
        event.clientX - centerX,
        event.clientY - centerY
    );


    // Mouse HAYIR'a yaklaşınca
    if (distance < 80) {

        teleportNoButton();

    }

});


/* =========================
   RASTGELE KONUM
========================= */

function teleportNoButton() {

    const rect = noBtn.getBoundingClientRect();

    const margin = 25;

    const maxX =
        window.innerWidth -
        rect.width -
        margin;

    const maxY =
        window.innerHeight -
        rect.height -
        margin;


    const randomX =
        margin +
        Math.random() *
        (maxX - margin);


    const randomY =
        margin +
        Math.random() *
        (maxY - margin);


    noBtn.style.position = "fixed";

    noBtn.style.left =
        randomX + "px";

    noBtn.style.top =
        randomY + "px";


    if (message) {
        message.textContent =
            "YAKALAYAMAZSIN 😭";
    }

}


/* =========================
   TELEFON
========================= */

noBtn.addEventListener(
    "touchstart",
    function (event) {

        event.preventDefault();

        teleportNoButton();

    },
    {
        passive: false
    }
);


/* =========================
   KONFETİ
========================= */

function createConfetti() {

    const container =
        document.getElementById("confetti");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    const symbols = [
        "❤️",
        "💕",
        "💖",
        "🐾",
        "✨",
        "🎉"
    ];


    for (let i = 0; i < 80; i++) {

        const piece =
            document.createElement("div");

        piece.className =
            "confetti-piece";

        piece.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        piece.style.left =
            Math.random() * 100 + "vw";


        piece.style.fontSize =
            12 +
            Math.random() * 18 +
            "px";


        piece.style.animationDelay =
            Math.random() * 1.5 +
            "s";


        container.appendChild(piece);

    }

}
