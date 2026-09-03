const mainScreen =
    document.getElementById("mainScreen");

const yesScreen =
    document.getElementById("yesScreen");

const noScreen =
    document.getElementById("noScreen");

const yesButton =
    document.getElementById("yesButton");

const noButton =
    document.getElementById("noButton");

const escapeMessage =
    document.getElementById("escapeMessage");


let escapeCount = 0;


/* =========================
   EVET
========================= */

yesButton.addEventListener(
    "click",
    function () {

        mainScreen.classList.remove("active");

        yesScreen.classList.add("active");

        startConfetti();

    }
);


/* =========================
   HAYIR EKRANI
========================= */

function showNoScreen() {

    mainScreen.classList.remove("active");

    noScreen.classList.add("active");

}


/* =========================
   HAYIR BUTONUNU KAÇIR
========================= */

function escapeNoButton(
    mouseX,
    mouseY
) {

    const width =
        noButton.offsetWidth;

    const height =
        noButton.offsetHeight;


    const padding = 15;


    const maxX =
        window.innerWidth -
        width -
        padding;


    const maxY =
        window.innerHeight -
        height -
        padding;


    let newX;
    let newY;

    let tries = 0;


    do {

        newX =
            padding +
            Math.random() *
            Math.max(1, maxX - padding);


        newY =
            padding +
            Math.random() *
            Math.max(1, maxY - padding);


        tries++;

    } while (

        Math.hypot(
            newX - mouseX,
            newY - mouseY
        ) < 220

        &&

        tries < 100

    );


    noButton.style.left =
        newX + "px";

    noButton.style.top =
        newY + "px";


    escapeCount++;


    const messages = [

        "HAYIR KAÇTI 😭",

        "Yakalayamazsın! 🏃",

        "Anne yaklaşma 😭",

        "Kedi için mücadele ediyoruz! 🐱",

        "O kadar kolay değil 😂",

        "HAYIR BUTONU SENİ İSTEMİYOR 😭",

        "Biraz daha hızlı olmalısın! 🏃‍♂️"

    ];


    escapeMessage.textContent =
        messages[
            Math.min(
                escapeCount - 1,
                messages.length - 1
            )
        ];

}


/* =========================
   MOUSE TAKİBİ
========================= */

document.addEventListener(
    "mousemove",
    function (event) {

        if (
            !mainScreen.classList.contains(
                "active"
            )
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
           160 piksel yaklaşınca kaç.
        */

        if (distance < 160) {

            escapeNoButton(
                event.clientX,
                event.clientY
            );

        }

    }
);


/* =========================
   HAYIR'A TIKLANIRSA
========================= */

noButton.addEventListener(
    "click",
    function () {

        showNoScreen();

    }
);


/* =========================
   MOBİL
========================= */

/*
   Telefonda mouse olmadığı için
   parmak HAYIR'a dokunduğunda
   direkt kötü kedi ekranı açılıyor.

   Böylece mobilde de kedi4 ve kedi5
   kesinlikle çıkıyor.
*/

noButton.addEventListener(
    "touchstart",
    function (event) {

        event.preventDefault();

        showNoScreen();

    },
    {
        passive: false
    }
);


/* =========================
   HAYIR İLK KONUM
========================= */

function placeNoButton() {

    const yesRect =
        yesButton.getBoundingClientRect();


    noButton.style.left =
        (
            yesRect.right + 18
        ) + "px";


    noButton.style.top =
        yesRect.top + "px";

}


/* =========================
   SAYFA AÇILINCA
========================= */

window.addEventListener(
    "load",
    function () {

        placeNoButton();

    }
);


/* =========================
   EKRAN DÖNERSE
========================= */

window.addEventListener(
    "resize",
    function () {

        if (
            !mainScreen.classList.contains(
                "active"
            )
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
                15;

        }


        if (
            y + rect.height >
            window.innerHeight
        ) {

            y =
                window.innerHeight -
                rect.height -
                15;

        }


        if (x < 10) {
            x = 10;
        }


        if (y < 10) {
            y = 10;
        }


        noButton.style.left =
            x + "px";

        noButton.style.top =
            y + "px";

    }
);


/* =========================
   KONFETİ
========================= */

function startConfetti() {

    const container =
        document.getElementById(
            "confetti"
        );


    const things = [
        "❤️",
        "💕",
        "💖",
        "🐾",
        "✨",
        "🎉",
        "💗"
    ];


    for (
        let i = 0;
        i < 100;
        i++
    ) {

        const piece =
            document.createElement(
                "div"
            );


        piece.className =
            "confetti-piece";


        piece.textContent =
            things[
                Math.floor(
                    Math.random() *
                    things.length
                )
            ];


        piece.style.left =
            Math.random() *
            100 +
            "vw";


        piece.style.fontSize =
            (
                12 +
                Math.random() *
                20
            ) +
            "px";


        piece.style.animationDelay =
            Math.random() *
            1.5 +
            "s";


        container.appendChild(
            piece
        );

    }

}
