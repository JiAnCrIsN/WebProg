let binaliktad = [];
let parehas = [];
let wait = false;

const images = [
    "2.JPG", 
    "3.JPG", 
    "4.JPG",
    "5.JPG",
    "6.JPG",
    "7.JPG",
    "8.JPG",
    "9.JPG"
];

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function setShuffledImages() {
    const allCards = document.querySelectorAll('.card-back img');
    let allImages = [...images];
    const totalCards = allCards.length;

    while (allImages.length < totalCards) {
        allImages = allImages.concat(images);
    }

    shuffleArray(allImages);

    allCards.forEach((img, index) => {
        img.src = allImages[index];
    });
}

function baliktad(card) {
    if (wait || card.classList.contains('bumaliktad')) {
        return;
    }

    card.classList.toggle('bumaliktad');
    binaliktad.push({ card, image: card.querySelector('.card-back img').src });

    if (binaliktad.length === 2) {
        wait = true;
        const [una, pangalawa] = binaliktad;

        if (una.image === pangalawa.image) {
            setTimeout(() => {
                una.card.classList.add('fade-out');
                pangalawa.card.classList.add('fade-out');
                parehas.push(una.card, pangalawa.card);
                binaliktad = [];
                wait = false;
                taposnaba();
            }, 490);
        } else {
            setTimeout(() => {
                una.card.classList.remove('bumaliktad');
                pangalawa.card.classList.remove('bumaliktad');
                binaliktad = [];
                wait = false;
            }, 450);
        }
    }
}

function taposnaba() {
    const vanishedCards = document.querySelectorAll('.fade-out');
    
    if (vanishedCards.length === document.querySelectorAll('.card').length) {
        document.querySelector('.retry-button').style.display = 'none';
        document.getElementById('victoryMessage').style.display = 'block';
        document.getElementById('isapaButton').style.display = 'block'; // Show play again button
    }
}

function ulit() {
    const lahat = document.querySelectorAll('.card');
    lahat.forEach(card => {
        card.classList.remove('bumaliktad');
        card.classList.remove('fade-out');
    });

    parehas = [];
    binaliktad = [];
    document.querySelector('.retry-button').style.display = 'block';
    document.getElementById('victoryMessage').style.display = 'none';
    document.getElementById('isapaButton').style.display = 'none';

    setTimeout(() => {
        setShuffledImages();
    }, 500);
}

function isapa() {
    document.getElementById('victoryMessage').style.display = 'none';
    document.getElementById('isapaButton').style.display = 'none';
    ulit();
}

window.onload = setShuffledImages;
