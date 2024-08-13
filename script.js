const typingName = document.getElementById('typing-name');
const typingTitle = document.getElementById('typing-title');

const name = [
    { text: 'Fazli', color: '#FF9AA2' },
    { text: 'Berisha', color: '#FFB7B2' }
];

const title = [
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
    element.innerHTML = ''; // Clear any existing content
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
                observer.unobserve(titleElement); // Stop observing once typed
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the title is visible

    titles.forEach((title) => {
        observer.observe(title);
    });
}

window.onload = function() {
    typeNextChar();
    
    // Add random colors to floating language icons
    const icons = document.querySelectorAll('.floating-languages i');
    const colors = ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA'];
    
    icons.forEach(icon => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        icon.style.color = randomColor;
    });
};