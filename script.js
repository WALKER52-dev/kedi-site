const home = document.getElementById("home");
const yesPage = document.getElementById("yesPage");
const noPage = document.getElementById("noPage");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const message = document.getElementById("message");

let noTouched = false;


/* =========================
   EVET BUTONU
========================= */

yesBtn.addEventListener("click", function () {

    home.classList.remove("active");
    yesPage.classList.add("active");

    createConfetti();

});


/* =========================
   HAYIR EKRANI
========================= */

function showNoPage() {

    home.classList.remove("active");
    noPage.classList.add("active");

}


/* =========================
   HAYIR BUTONUNU KAÇIR
========================= */

function moveNoButton(mouseX, mouseY) {

    const buttonWidth = noBtn.offsetWidth;
    const buttonHeight = noBtn.offsetHeight;

    const padding = 20;

    const maxX =
        window.innerWidth -
        buttonWidth -
        padding;

    const maxY =
        window.innerHeight -
        buttonHeight -
        padding;

    let x;
    let y;
    let tries = 0;

    do {

        x =
            padding +
            Math.random() *
            Math.max(1, maxX - padding);

        y =
            padding +
            Math.random() *
            Math.max(1, maxY - padding);

        tries++;

    } while (
        Math.hypot(
            x + buttonWidth / 2 - mouseX,
            y + buttonHeight / 2 - mouseY
        ) < 180 &&
        tries < 100
    );


    noBtn.style.position = "fixed";
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";


    message.textContent =
        "HAYIR BUTONU KAÇTI 😭";


    /*
       Mouse HAYIR'a geldiği anda
       kötü kediler açılır.
    */

    if (!noTouched) {

        noTouched = true;

        setTimeout(function () {
            showNoPage();
        }, 250);

    }

}


/* =========================
   MOUSE TAKİBİ
========================= */

document.addEventListener(
    "mousemove",
    function (event) {

        if (!home.classList.contains("active")) {
            return;
        }


        const rect =
            noBtn.getBoundingClientRect();


        const centerX =
            rect.left + rect.width / 2;

        const centerY =
            rect.top + rect.height / 2;


        const distance =
            Math.hypot(
                event.clientX - centerX,
                event.clientY - centerY
            );


        /*
           Mouse HAYIR'ın üzerine
           geldiğinde kaçır.
        */

        if (distance < 45) {

            moveNoButton(
                event.clientX,
                event.clientY
            );

        }

    }
);


/* =========================
   HAYIR'A GERÇEKTEN BASILIRSA
========================= */

noBtn.addEventListener("click", function () {

    showNoPage();

});


/* =========================
   MOBİL
========================= */

noBtn.addEventListener(
    "touchstart",
    function (event) {

        event.preventDefault();

        showNoPage();

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
            (
                12 +
                Math.random() * 18
            ) + "px";


        piece.style.animationDelay =
            Math.random() * 1.5 + "s";


        container.appendChild(piece);

    }

}


/* =========================
   BAŞLANGIÇ AYARLARI
========================= */

window.addEventListener(
    "load",
    function () {

        noBtn.style.position = "relative";
        noBtn.style.left = "0px";
        noBtn.style.top = "0px";

    }
);
