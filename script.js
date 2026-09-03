const home = document.getElementById("home");
const yesPage = document.getElementById("yesPage");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const message = document.getElementById("message");


/* =========================
   EVET
========================= */

yesBtn.addEventListener("click", function () {

    home.classList.remove("active");
    yesPage.classList.add("active");

    createConfetti();

});


/* =========================
   HAYIR KAÇIŞI
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


    /*
       Mouse HAYIR'a yaklaşınca
       ters yöne kaç
    */

    if (distance < 100) {

        const dx = centerX - event.clientX;
        const dy = centerY - event.clientY;


        /*
           Mouse'un ters yönünü hesapla
        */

        const length =
            Math.hypot(dx, dy) || 1;

        const directionX =
            dx / length;

        const directionY =
            dy / length;


        /*
           Ne kadar kaçacağı
        */

        const escapeDistance = 180;


        let newX =
            rect.left +
            directionX * escapeDistance;

        let newY =
            rect.top +
            directionY * escapeDistance;


        /*
           Ekranın dışına çıkmasını engelle
        */

        const margin = 20;

        newX = Math.max(
            margin,
            Math.min(
                window.innerWidth -
                rect.width -
                margin,
                newX
            )
        );

        newY = Math.max(
            margin,
            Math.min(
                window.innerHeight -
                rect.height -
                margin,
                newY
            )
        );


        /*
           Butonu yeni konuma taşı
        */

        noBtn.style.position = "fixed";

        noBtn.style.left =
            newX + "px";

        noBtn.style.top =
            newY + "px";


        /*
           Küçük mesaj
        */

        if (message) {
            message.textContent =
                "YAKALAYAMAZSIN 😭";
        }

    }

});


/* =========================
   TELEFONDA DOKUNUNCA KAÇ
========================= */

noBtn.addEventListener(
    "touchstart",
    function (event) {

        event.preventDefault();

        const rect =
            noBtn.getBoundingClientRect();

        const margin = 20;


        let newX =
            Math.random() *
            (
                window.innerWidth -
                rect.width -
                margin * 2
            ) + margin;


        let newY =
            Math.random() *
            (
                window.innerHeight -
                rect.height -
                margin * 2
            ) + margin;


        noBtn.style.position = "fixed";

        noBtn.style.left =
            newX + "px";

        noBtn.style.top =
            newY + "px";

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
