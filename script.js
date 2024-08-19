const typingName = document.getElementById('typing-name');
const typingTitle = document.getElementById('typing-title');

const name = [
    { text: 'Fazli', color: '#FF9AA2' },
    { text: 'Berisha', color: '#FFB7B2' }
];

const title = [
    { text: 'Junior', color: '#FFDAC1' },
    { text: 'Software', color: '#FFDAC1' },
    { text: '{Developer}', color: '#E2F0CB' },
    { text: '&', color: '#B5EAD7' },
    { text: 'Engineer', color: '#C7CEEA' }
];

const sectionTitles = [
    { text: 'About Me', color: '#FF9AA2' },
    { text: 'Projects', color: '#FFDAC1' },
    { text: 'Contact Me', color: '#E2F0CB' }
];

let nameIndex = 0;
let titleIndex = 0;
let charIndex = 0;
const typingSpeed = 100;

function typeNextChar() {
    if (nameIndex < name.length) {
        typeWord(typingName, name, () => {
            nameIndex++;
            charIndex = 0;
            if (nameIndex === name.length) {
                setTimeout(() => typeNextChar(), typingSpeed * 3);
            } else {
                typeNextChar();
            }
        });
    } else if (titleIndex < title.length) {
        typeWord(typingTitle, title, () => {
            titleIndex++;
            charIndex = 0;
            if (titleIndex === title.length) {
                setTimeout(() => setupIntersectionObserver(), typingSpeed * 3);
            } else {
                typeNextChar();
            }
        });
    }
}

function typeWord(element, words, callback) {
    const currentWord = words[words === name ? nameIndex : titleIndex];
    if (charIndex < currentWord.text.length) {
        element.innerHTML += `<span style="color:${currentWord.color}">${currentWord.text[charIndex]}</span>`;
        charIndex++;
        setTimeout(() => typeWord(element, words, callback), typingSpeed);
    } else {
        element.innerHTML += ' ';
        callback();
    }
}

function typeSectionTitle(element, text, color) {
    let i = 0;
    element.innerHTML = '';
    function typeChar() {
        if (i < text.length) {
            element.innerHTML += `<span style="color:${color}">${text[i]}</span>`;
            i++;
            setTimeout(typeChar, typingSpeed);
        } else {
            element.innerHTML += '<span class="cursor">|</span>';
        }
    }
    typeChar();
}

function setupIntersectionObserver() {
    const titles = document.querySelectorAll('.section-title');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const titleElement = entry.target;
                const titleText = titleElement.getAttribute('data-text');
                const titleColor = sectionTitles.find(t => t.text === titleText).color;
                typeSectionTitle(titleElement, titleText, titleColor);
                observer.unobserve(titleElement);
            }
        });
    }, { threshold: 0.5 });

    titles.forEach((title) => {
        observer.observe(title);
    });
}

// Add card shuffling functionality
const cards = document.querySelectorAll('.card');
const prevBtn = document.getElementById('prevCard');
const nextBtn = document.getElementById('nextCard');
let currentCardIndex = 0;

function showCard(index) {
    cards.forEach((card, i) => {
        if (i === index) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
}

function nextCard() {
    currentCardIndex = (currentCardIndex + 1) % cards.length;
    showCard(currentCardIndex);
}

function prevCard() {
    currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length;
    showCard(currentCardIndex);
}

nextBtn.addEventListener('click', nextCard);
prevBtn.addEventListener('click', prevCard);

window.onload = function() {
    typeNextChar();
    
    // Add random colors to floating language icons
    const icons = document.querySelectorAll('.floating-languages i');
    const colors = ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA'];
    
    icons.forEach(icon => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        icon.style.color = randomColor;
    });

    // Initialize the first card
    showCard(currentCardIndex);
};

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.project-card').forEach(card => {
        const btn = card.querySelector('.expand-btn');
        const details = card.querySelector('.project-details');
        
        btn.addEventListener('click', () => {
            // Close all other cards
            document.querySelectorAll('.project-card').forEach(otherCard => {
                if (otherCard !== card && otherCard.classList.contains('expanded')) {
                    otherCard.classList.remove('expanded');
                    otherCard.querySelector('.expand-btn').textContent = 'Read More';
                    otherCard.querySelector('.project-details').style.maxHeight = "0";
                }
            });

            // Toggle the clicked card
            card.classList.toggle('expanded');
            if (card.classList.contains('expanded')) {
                btn.textContent = 'Read Less';
                details.style.maxHeight = details.scrollHeight + "px";
                card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
            } else {
                btn.textContent = 'Read More';
                details.style.maxHeight = "0";
            }
        });
    });
});