const quoteContainer = document.getElementById('quote-container'),
    quoteElement = document.getElementById('q'),
    authorElement = document.getElementById('author'),
    twitterButton = document.getElementById('twitter'),
    newQuoteButton = document.getElementById('new-quote'),
    loaderElement = document.getElementById('loader');

console.dir(newQuoteButton);

const showLoadingSpinner = () => {
    loaderElement.style.display = 'grid';
    quoteContainer.style.display = 'none';
}

const hideLoadingSpinner = () => {
    if (loaderElement.style.display === 'grid') {
        loaderElement.style.display = 'none';
        quoteContainer.style.display = 'block';
    }
}

const updateQuoteDOM = (quoteText = '', quoteAuthor = '') => {
    if (quoteText === '') {
        authorElement.innerText = 'Неизвестный'
    } else {
        authorElement.innerText = quoteAuthor;
    }
    if (quoteText.length >= 120) {
        quoteElement.classList.add('quote-text--long');
    } else {
        quoteElement.classList.remove('quote-text--long');
    }
    quoteElement.innerText = quoteText;
}


const generateErrorDOM = () => {
    quoteElement.innerText = 'Произошла какая-то ошибка';
    twitterButton.style.display = 'none';
    authorElement.style.display = 'none';
    loaderElement.style.display = 'none';
    quoteContainer.style.display = 'block';
    newQuoteButton.innerText = 'Попробовать снова';
    newQuoteButton.classList.add('error');
}

const getQuote = async () => {
    showLoadingSpinner();
    const proxy = 'https://stormy-eyrie-89486.herokuapp.com/';
    const apiUrl = `http://api.forismatic.com/api/1.0/?method=getQuote&lang=ru&format=json`;
    try {
        const response = await fetch(proxy + apiUrl);
        const data = await response.json();
        updateQuoteDOM(data.quoteText, data.quoteAuthor);
        // throw new Error('oops');
        hideLoadingSpinner();
    } catch (error) {
        console.log('Error', error);
        generateErrorDOM();
    };
}

const tweetQuote = () => {
    const str = `${q.innerText} - ${author.innerText}`;
    const intentUrl = `https://twitter.com/intent/tweet?text=${str}`;
    window.open(intentUrl, '_blank');
}

twitterButton.addEventListener('click', tweetQuote);
newQuoteButton.addEventListener('click', getQuote);

getQuote();
