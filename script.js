const home = document.getElementById("home");
const yesPage = document.getElementById("yesPage");
const noPage = document.getElementById("noPage");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const message = document.getElementById("message");

let noTouched = false;


/* =========================
   EVET
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

    const margin = 20;

    const maxX =
        window.innerWidth -
        buttonWidth -
        margin;

    const maxY =
        window.innerHeight -
        buttonHeight -
        margin;

    let newX;
    let newY;

    let attempts = 0;


    do {

        newX =
            margin +
            Math.random() *
            Math.max(1, maxX - margin);

        newY =
            margin +
            Math.random() *
            Math.max(1, maxY - margin);

        attempts++;

    } while (
        Math.hypot(
            newX + buttonWidth / 2 - mouseX,
            newY + buttonHeight / 2 - mouseY
        ) < 170
        &&
        attempts < 100
    );


    noBtn.style.position = "fixed";

    noBtn.style.left = newX + "px";

    noBtn.style.top = newY + "px";


    message.textContent =
        "HAYIR BUTONU KAÇTI 😭";


    /*
       İlk kez HAYIR'a yaklaşınca
       kötü kediler açılıyor.
    */

    if (!noTouched) {

        noTouched = true;

        setTimeout(function () {

            showNoPage();

        }, 250);

    }

}


/* =========================
   MOUSE HAREKETİ
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
           Mouse butona yaklaşınca
           HAYIR kaçar.
        */

        if (distance < 70) {

            moveNoButton(
                event.clientX,
                event.clientY
            );

        }

    }
);


/* =========================
   HAYIR'A BASILIRSA
========================= */

noBtn.addEventListener(
    "click",
    function () {

        showNoPage();

    }
);


/* =========================
   TELEFON
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
            12 +
            Math.random() * 18 +
            "px";


        piece.style.animationDelay =
            Math.random() * 1.5 +
            "s";


        container.appendChild(piece);

    }

}
