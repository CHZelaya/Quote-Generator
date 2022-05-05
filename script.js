//-> Import Statements
import { localQuotes as localQuotes } from './quotes.js'


//-> Global Variables
let apiQuotes = [];
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
  return
}

function hideLoadingSpinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;
  return
}


//-> Get local quotes from quotes.js
function getLocalQuotes() {
  try {
    const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)]
    //! Check if Author field is blank and replace with "unknown"
    if (!quote.author) {
      authorText.textContent = "Unknown"

    } else {
      authorText.textContent = quote.author;
      //! Check quote Length to determine styling

    } if (quote.text.length > 120) {
      quoteText.classList.add("long-quote");

    } else {
      quoteText.classList.remove("long-quote");
    }

    quoteText.textContent = quote.text;

    console.log('localQuotes:', quote)
    // throw new Error("oops")
  } catch (e) {
    authorText.textContent = "Unknown Developer";
    quoteText.textContent = "We have encountered an error that has broken the program...My apologies."
    return hideLoadingSpinner();
  }
}

//-> Pick Random quote from apiQuotes Array
function newQuote() {
  try {
    
    showLoadingSpinner();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    //! Check if Author field is blank and replace with "unknown"
    if (!quote.author) {
      authorText.textContent = "Unknown"

    } else {
      authorText.textContent = quote.author;

      //! Change styling based on quote length
    } if (quote.text.length > 120) {
      quoteText.classList.add("long-quote");

    } else {
      quoteText.classList.remove("long-quote");
    }
    //-> Set Quote, hide Loader
    quoteText.textContent = quote.text;
    hideLoadingSpinner();
    console.log("newQuote:", quote);
    return;
  
  } catch (e) {
    console.log(e);
    return getLocalQuotes();
  }
}

async function getQuotes() {
  const apiUrl = 'https://type.fit/api/quotes';

  try {
    //  throw new Error("oh noes!")
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();

  } catch (err) {
    console.log(err, "Error caugth with API, invoking getLocalQuotes function");
    return getLocalQuotes();
  }

}


//-> Tweet a Quote 
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  return window.open(twitterUrl, '_blank');
}

//-> Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuote);

//-> On Loading
getQuotes();
hideLoadingSpinner()



