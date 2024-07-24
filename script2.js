function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomDreamInterpretation(words) {
    const subject = getRandomElement(subjects);
    const action = getRandomElement(actions);
    const action2 = getRandomElement(actions2);
    const outcome = getRandomElement(outcomes);
    const phrase = getRandomElement(phrases);
    const highlightedWords = words.map(word => `<span class="highlight-green">${word}</span>`).join(" ");
    const highlightedOutcome = `<span class="highlight-green">${outcome}</span>`;
    return `${subject} ${highlightedWords} ${phrase}, ${action} ${highlightedOutcome} <p></p>`;
}

function generateOutcomeDetail() {
    const outcomeDetail = getRandomElement(outcomesDetails);
    const sentences = outcomeDetail.split(". ");
    if (sentences.length > 1) {
        sentences[sentences.length - 1] = `<span class="highlight-red">${sentences[sentences.length - 1]}</span>`;
    }
    return sentences.join(". ");
}

function containsBannedWords(input) {
    const words = input.split(" ");
    return words.some(word => bannedWords.includes(word.toLowerCase()));
}

let timeout = null;
const inputField = document.getElementById('dreamInput');

inputField.addEventListener('input', function() {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
        const inputText = inputField.value.toLowerCase();

        if (inputText.trim() === "") {
            document.getElementById('result').innerHTML = "Lütfen bir rüya yazın.";
            return;
        }

        if (containsBannedWords(inputText)) {
            inputField.value = "";
            inputField.setAttribute("placeholder", "tekrar deneyiniz");
            inputField.classList.add("error-placeholder");

            // Üç saniye sonra placeholder'ı eski haline döndür
            setTimeout(function() {
                inputField.setAttribute("placeholder", "Rüyanızı yazın...");
                inputField.classList.remove("error-placeholder");
            }, 3000);

            return;
        }

        const words = inputText.split(" ");
        let result = generateRandomDreamInterpretation(words);

        document.getElementById('result').innerHTML = result;

        // Yarım saniye sonra outcomes_detail kısmını ekle
        setTimeout(function() {
            const outcomeDetail = generateOutcomeDetail();
            document.getElementById('result').innerHTML += `<div class="outcome-detail">${outcomeDetail}</div>`;
        }, 500);

        // outcomes_detail kısmından sonra actions2 kısmını ekle
        setTimeout(function() {
            const action2 = getRandomElement(actions2);
            document.getElementById('result').innerHTML += `<p>${action2}</p>`;
        }, 600);

        inputField.value = '';
    }, 3000);
});

inputField.addEventListener('focus', function() {
    if (inputField.classList.contains("error-placeholder")) {
        inputField.classList.remove("error-placeholder");
        inputField.setAttribute("placeholder", "Rüyanızı yazın...");
    }
});
