/*
 * Create a list that holds all of your cards
 */
let cardSymbols = ["diamond","paper-plane-o","anchor","bolt","cube","leaf","bicycle","bomb","diamond","paper-plane-o","anchor","bolt","cube","leaf","bicycle","bomb"];
let deck = document.getElementsByClassName("deck");
let stars = document.getElementsByClassName("stars");
let displyMov = document.getElementsByClassName("moves");
let timer = document.getElementsByClassName("timer");
let openCard = [];
let matched = 0;
let starNum = 0;
let counter = 0;
let interval;
let time = 
{
 second : 0,
 minute : 0,
 hour : 0
};
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array)
{
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function initial()
{
 //initial inner html to the start point
    timer[0].innerHTML = "0Mins 0Secs";
    stars[0].innerHTML = '<li><i class="fa fa-star"></i></li>'+'<li><i class="fa fa-star"></i></li>'+'<li><i class="fa fa-star"></i></li>';
    displyMov[0].textContent = 0;
     
 //initial all variables
    matched = 0;
    starNum = 0;
    counter = 0;
    time.hour = 0;
    time.minute = 0;
    time.second = 0;
    clearInterval(interval);
    
   startDeck();
}

//function to restart the game
function reStart()
{
  initial();
}

//function to calculat the playing time
function startTimer()
{
    interval = setInterval(function(){
        timer[0].innerHTML = time.minute+"Mins "+time.second+"Secs";
        time.second = time.second + 1;
        if(time.second == 60){
            time.minute = time.minute + 1;
            time.second = 0;
        }
        if(time.minute == 60){
            time.hour = time.hour + 1;
            time.minute = 0;
        }
    },1000);
}

function movesAndRating()
{
 // display number of moves
 counter = counter + 1;
 if(counter == 1)
    {
    startTimer();
    }
 displyMov[0].textContent = counter;
 
 //change the number of star rating
 starNum = 3;
 if (counter>30)
  {
    stars[0].innerHTML= "";
	stars[0].innerHTML = '<li><i class="fa fa-star"></i></li>';
    starNum = 1;
  }
  else if(counter>19)
  {
    stars[0].innerHTML= "";
	stars[0].innerHTML = '<li><i class="fa fa-star"></i></li>' + '<li><i class="fa fa-star"></i></li>';
    starNum = 2;
  }
}


//function that hides the card's symbols if not match
function notMatchedCards()
{
   	openCard[0].setAttribute('class', 'card');
    openCard[1].setAttribute('class', 'card');
 	openCard = [];
}

//function that locks the matched cards in the open position
function matchedCards()
{
  	openCard[0].setAttribute('class', 'card match');
    openCard[1].setAttribute('class', 'card match');
 	matched = matched + 2;
    openCard = [];
    if (matched == 16)
     { 
      if (confirm("You Win Congratulation! \n Time you took: "+time.minute+"Mins "+time.second+"Secs \n The star rating was: "+starNum+"\n Do you want to play again ?")) 
      {
       initial();
      }
      else
      {
       clearInterval(interval);
      }
     }
}


//function that chick for match cards
function opend(target)
{
   openCard.push(target);
   if (openCard.length > 1)
 	{ 
 	   if (openCard[0].innerHTML === openCard[1].innerHTML)
 		{
           matchedCards();
 		}
      else
        {
           setTimeout(notMatchedCards, 300); 
        }
 	}
}

// function that display clicked card
function display(event)
{
 let clickedCard = event.target;
  if (!(clickedCard.outerHTML.startsWith("<ul") || clickedCard.outerHTML.startsWith("<i")))
      {
       if (!(clickedCard.classList.contains("show") || clickedCard.classList.contains("match")))
        {
            clickedCard.setAttribute('class', 'card open show');
            movesAndRating();
            opend(clickedCard);
        }
       }
}

//funcion to shuffle symbols and initial the deck with closed cards
function startDeck()
{
     let cards = shuffle(cardSymbols);
	deck[0].innerHTML= "";
 
	for (let i=0; i<cards.length; i++)
	{
		deck[0].innerHTML = deck[0].innerHTML + '<li class = "card"><i class="fa fa-' + cards[i] + '"></i></li>';
	}
}

//the start function of the project
function main()
{    
   startDeck();
   deck[0].addEventListener('click',function(event){
            event = event || window.event;
            event.preventDefault();
            display(event);
   }); 
}

window.onload = main();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
