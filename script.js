// ==========================================
// 🐱 HUMAN → MEOW TRANSLATOR
// ==========================================


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const humanText = document.getElementById("humanText");

const translateBtn =
    document.getElementById("translateBtn");

const meowOutput =
    document.getElementById("meowOutput");

const soundStatus =
    document.getElementById("soundStatus");

const catAnimation =
    document.getElementById("catAnimation");

const replayBtn =
    document.getElementById("replayBtn");

const copyBtn =
    document.getElementById("copyBtn");


// ==========================================
// 🔊 REAL CAT MEOW SOUND
// ==========================================

const meowSound =
    new Audio("meow.mp3");


// Store the latest translation
let currentMeow = "";


// ==========================================
// 🐱 PLAY REAL CAT MEOW
// ==========================================

function playMeow() {

    // Show GIF
    catAnimation.style.display = "block";


    // Restart sound
    meowSound.currentTime = 0;


    // Play real MP3
    meowSound.play()
        .catch(function () {

            soundStatus.textContent =
                "🔊 Click the button again to hear the cat!";
        });


    // Status
    soundStatus.textContent =
        "🔊 Cat is speaking... MEOW! 🐾";
}


// ==========================================
// 🧠 TRANSLATION FUNCTION
// ==========================================

function translateToMeow(text) {

    const sentence =
        text.toLowerCase();


    // 🍗 Hungry
    if (
        sentence.includes("hungry") ||
        sentence.includes("food") ||
        sentence.includes("eat")
    ) {

        return {
            text: "MEEEOOW! MROW MROW! MEOW!",
            mood: "😺 HUNGRY"
        };
    }


    // 😸 Happy
    if (
        sentence.includes("happy") ||
        sentence.includes("good") ||
        sentence.includes("great")
    ) {

        return {
            text: "MEOW! MEOW! MEEOW! PURR PURR!",
            mood: "😸 HAPPY"
        };
    }


    // 😾 Angry
    if (
        sentence.includes("angry") ||
        sentence.includes("annoyed") ||
        sentence.includes("hate")
    ) {

        return {
            text: "MRRROW! HSSSS! MEEEOOW!",
            mood: "😾 ANGRY"
        };
    }


    // 😴 Sleepy
    if (
        sentence.includes("sleep") ||
        sentence.includes("tired") ||
        sentence.includes("bed")
    ) {

        return {
            text: "Meeeow... mmmrrr... meow...",
            mood: "😴 SLEEPY"
        };
    }


    // 👋 Greeting
    if (
        sentence.includes("hello") ||
        sentence.includes("hi") ||
        sentence.includes("hey")
    ) {

        return {
            text: "MEOW! MEEOW! MROW! 🐾",
            mood: "😺 FRIENDLY"
        };
    }


    // 😼 Generic
    return {
        text: "MEOW! MEEOW! MROW! MEEEEOW!",
        mood: "😼 CURIOUS"
    };
}


// ==========================================
// 🐾 TRANSLATE BUTTON
// ==========================================

translateBtn.addEventListener(
    "click",
    function () {


        // Get input
        const text =
            humanText.value.trim();


        // ==================================
        // EMPTY INPUT
        // ==================================

        if (text === "") {

            meowOutput.textContent =
                "🐱 Please type something first!";

            soundStatus.textContent =
                "💭 Waiting for your sentence...";

            humanText.focus();

            return;
        }


        // ==================================
        // TRANSLATE
        // ==================================

        const result =
            translateToMeow(text);


        // Save translation
        currentMeow = result.text;


        // ==================================
        // SHOW TRANSLATION
        // ==================================

        meowOutput.classList.remove(
            "translationAnimation"
        );


        // Force animation restart
        void meowOutput.offsetWidth;


        meowOutput.classList.add(
            "translationAnimation"
        );


        meowOutput.innerHTML =
            result.text +
            "<br><br>" +
            "<small>" +
            result.mood +
            "</small>";


        // ==================================
        // ENABLE ACTION BUTTONS
        // ==================================

        replayBtn.disabled = false;

        copyBtn.disabled = false;


        // ==================================
        // CHANGE TRANSLATE BUTTON
        // ==================================

        translateBtn.textContent =
            "🐱 MEOWING...";

        translateBtn.disabled = true;


        // ==================================
        // PLAY CAT
        // ==================================

        playMeow();


        // ==================================
        // FINISH
        // ==================================

        setTimeout(
            function () {

                soundStatus.textContent =
                    "😺 Translation complete!";

                translateBtn.textContent =
                    "🐾 Translate to Meow";

                translateBtn.disabled = false;

                // Hide GIF
                catAnimation.style.display =
                    "none";

            },
            1500
        );

    }
);


// ==========================================
// 🔊 MEOW AGAIN BUTTON
// ==========================================

replayBtn.addEventListener(
    "click",
    function () {

        if (currentMeow === "") {
            return;
        }

        playMeow();

        setTimeout(
            function () {

                soundStatus.textContent =
                    "😺 Meow replay complete!";

                catAnimation.style.display =
                    "none";

            },
            1500
        );

    }
);


// ==========================================
// 📋 COPY MEOW BUTTON
// ==========================================

copyBtn.addEventListener(
    "click",
    function () {

        if (currentMeow === "") {
            return;
        }


        navigator.clipboard.writeText(
            currentMeow
        )
        .then(function () {

            soundStatus.textContent =
                "📋 Meow copied! Send it to your friends! 😹";

        })
        .catch(function () {

            soundStatus.textContent =
                "❌ Could not copy the meow.";

        });

    }
);