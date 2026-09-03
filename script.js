const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");

const mainScreen = document.getElementById("mainScreen");
const yesScreen = document.getElementById("yesScreen");
const noScreen = document.getElementById("noScreen");

const escapeText = document.getElementById("escapeText");

let noAttempts = 0;


/* =========================
   EKRAN DEĞİŞTİRME
========================= */

function showYesScreen() {

    mainScreen.classList.remove("active");

    yesScreen.classList.add("active");

    createConfetti();
}


function showNoScreen() {

    mainScreen.classList.remove("active");

    noScreen.classList.add("active");
}


/* =========================
   HAYIR BUTONUNU KAÇIR
========================= */

function moveNoButton(mouseX, mouseY) {

    const rect = noButton.getBoundingClientRect();

    const buttonWidth = rect.width;
    const buttonHeight = rect.height;

    const padding = 20;

    const maxX =
        window.innerWidth -
        buttonWidth -
        padding;

    const maxY =
        window.innerHeight -
        buttonHeight -
        padding;

    let newX;
    let newY;

    /*
       Yeni konum mouse'a yakın olmasın.
    */

    let attempts = 0;

    do {

        newX =
            padding +
            Math.random() * Math.max(1, maxX - padding);

        newY =
            padding +
            Math.random() * Math.max(1, maxY - padding);

        attempts++;

        /*
           Sonsuz döngüye karşı güvenlik.
        */

        if (attempts > 100) {
            break;
        }

    } while (
        Math.hypot(
            newX - mouseX,
            newY - mouseY
        ) < 220
    );


    noButton.style.left =
        ${newX}px;

    noButton.style.top =
        ${newY}px;


    noAttempts++;


    const messages = [
        "HAYIR BUTONU KAÇTI 😭",
        "Yakalayamazsın 🏃‍♂️",
        "Anne yaklaşma 😭",
        "Biraz daha dene 😂",
        "O buton senden hızlı.",
        "KEDİ İÇİN MÜCADELE EDİYORUZ 🐱",
        "Hayır demek o kadar kolay değil 😈",
        "Pes et artık 😭🐱"
    ];


    escapeText.textContent =
        messages[
            Math.min(
                noAttempts - 1,
                messages.length - 1
            )
        ];
}


/* =========================
   MOUSE HAYIR'A YAKLAŞIRSA
========================= */

document.addEventListener(
    "mousemove",
    function(event) {

        if (
            !mainScreen.classList.contains("active")
        ) {
            return;
        }


        const rect =
            noButton.getBoundingClientRect();


        const centerX =
            rect.left +
            rect.width / 2;

        const centerY =
            rect.top +
            rect.height / 2;


        const distance =
            Math.hypot(
                event.clientX - centerX,
                event.clientY - centerY
            );


        /*
           Mouse butona 140px yaklaşırsa
           HAYIR kaçıyor.
        */

        if (distance < 140) {

            moveNoButton(
                event.clientX,
                event.clientY
            );

        }

    }
);


/* =========================
   MOBİL
========================= */

noButton.addEventListener(
    "touchstart",
    function(event) {

        /*
           Mobilde dokunmaya çalışınca
           HAYIR da kaçıyor.
        */

        event.preventDefault();


        const touch =
            event.touches[0];


        moveNoButton(
            touch.clientX,
            touch.clientY
        );

    },
    {
        passive: false
    }
);


/*
   Mobilde gerçekten tıklama oluşursa
   kötü kedi ekranını aç.
*/

noButton.addEventListener(
    "click",
    function() {

        showNoScreen();

    }
);


/* =========================
   EVET
========================= */

yesButton.addEventListener(
    "click",
    function() {

        showYesScreen();

    }
);


/* =========================
   KONFETİ
========================= */

function createConfetti() {

    const container =
        document.getElementById(
            "confettiContainer"
        );


    const symbols = [
        "❤️",
        "💖",
        "💕",
        "🐾",
        "🎉",
        "✨",
        "💗"
    ];


    for (
        let i = 0;
        i < 90;
        i++
    ) {

        const piece =
            document.createElement("div");


        piece.classList.add(
            "confetti"
        );


        piece.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        piece.style.left =
            Math.random() *
            100 +
            "vw";


        piece.style.animationDelay =
            Math.random() *
            1.5 +
            "s";


        piece.style.fontSize =
            12 +
            Math.random() *
            20 +
            "px";


        container.appendChild(
            piece
        );

    }

}


/* =========================
   İLK HAYIR KONUMU
========================= */

function setInitialNoPosition() {

    const yesRect =
        yesButton.getBoundingClientRect();


    noButton.style.left =
        ${yesRect.right + 20}px;


    noButton.style.top =
        ${yesRect.top}px;

}


/*
   Sayfa tamamen yüklenince
   ilk konumu ayarla.
*/

window.addEventListener(
    "load",
    function() {

        setInitialNoPosition();

    }
);


/* =========================
   EKRAN BOYUTU DEĞİŞİRSE
========================= */

window.addEventListener(
    "resize",
    function() {

        if (
            !mainScreen.classList.contains("active")
        ) {
            return;
        }


        const rect =
            noButton.getBoundingClientRect();


        let x = rect.left;
        let y = rect.top;


        if (
            x + rect.width >
            window.innerWidth
        ) {

            x =
                window.innerWidth -
                rect.width -
                20;

        }


        if (
            y + rect.height >
            window.innerHeight
        ) {

            y =
                window.innerHeight -
                rect.height -
                20;

        }


        if (x < 10) {
            x = 10;
        }


        if (y < 10) {
            y = 10;
        }


        noButton.style.left =
            ${x}px;


        noButton.style.top =
            ${y}px;

    }
);
