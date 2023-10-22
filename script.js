const quoteContainer = document.getElementById("quote-container");
const quoteText= document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-qoute");
const loader = document.getElementById("loader");

let apiQuotes =[];

const showLoadingSpinner =()=>{
    loader.hidden = false;
    quoteContainer.hidden = true;
}

const removeLoadingSpinner =()=>{
    loader.hidden = true;
    quoteContainer.hidden = false;
}

//show new Quote 

const newQuote=()=>{
    //Pick a random quote from apiQuotes
    showLoadingSpinner();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    if(!quote.author){
        authorText.textContent = "Unknown";
    }else{
        authorText.textContent = quote.author;
    }
    // Check the quote length
    if(quote.text.length>130){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    // Set the quote, Hide loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

// Get quotes from API 


async function getQuotes(){
    showLoadingSpinner();
    const  apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
       const response = await fetch(apiUrl);
       apiQuotes = await response.json();
       newQuote();
    }catch(err){
        console.log("Opps something went wrong ", err);

    }
}
//Tweet Quote
const tweetQuote=()=>{
    const twitterUrl =`https://twitter.com/intent/tweet=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, "_blank");
}

//Event Listener
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote)


//on load 
getQuotes();

