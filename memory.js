// Tablica z nazwami plików, obrazków
var pictures = [
"ciri.png",
"geralt.png",
"jaskier.png",
"iorweth.png",
"triss.png",
"yen.png"];

// Tablica do przechowywania wylosowanych obrazków
var cards = [];

// Tablica z numerami od 0 do 11
var arrayOfNumbers = [0,1,2,3,4,5,6,7,8,9,10,11];

// Losowe ustawianie obrazków
for(let i=0;i<6;i++){

  let randomNumber;
  // Losujemy liczbę z tablicy liczb, to pozycja, na którą wstawimy dany obrazek
  randomNumber = arrayOfNumbers[Math.floor( (Math.random() * arrayOfNumbers.length))];
  // Wstawiamy obrazek
  cards[randomNumber] = pictures[i];
  // Usuwamy wylosowaną liczbę aby się nie powtórzyła
  arrayOfNumbers.splice(arrayOfNumbers.indexOf(randomNumber), 1);

  // Losujemy drugą liczbę
  randomNumber = arrayOfNumbers[Math.floor( (Math.random() * arrayOfNumbers.length))];
  // Wstawiamy obrazek
  cards[randomNumber] = pictures[i];
  // Usuwamy wylosowaną liczbę aby się nie powtórzyła
  arrayOfNumbers.splice(arrayOfNumbers.indexOf(randomNumber), 1);

}


var card = [];
// Dodawanie zdarzeń do każdego elementu div id card
for (let i=0;i<12;i++){

    var id = "card" + i;
    card[i] = document.getElementById(id);
    card[i].addEventListener("click", function(){revealCard(i)} );
    }


// Zmienne
// ------------------------------------
// Czy jedna karta jest odkryta
var oneVisible = false;
// Licznik
var turnCounter = 0;
// Numer karty, która jest odkryta
var visibleNumber;
// Blokada na odkrywanie większej ilości kart
var lock = false;
// Ilość odkrytych par
var pairsLeft = 6;
// ------------------------------------


// Deklaracje funkcji
function changeBackground(numberOfCard,picture){

  // Odkrycie karty
  $('#card'+numberOfCard).css('background-image',picture);
  $('#card'+numberOfCard).addClass('cardActive');
  $('#card'+numberOfCard).removeClass('card');
}

function changeBackgroundToCardBack(numberOfCard){

  // Zakrycie karty
  $('#card'+numberOfCard).css('background-image','url(img/karta.png)');
  $('#card'+numberOfCard).addClass('card');
  $('#card'+numberOfCard).removeClass('cardActive');

  // Blokada odkrycia następnej karty
  lock = false;
}


function hide2Cards(number1,number2){
    // Ukrywamy dwie karty
    $('#card'+number1).css('opacity','0');
    $('#card'+number2).css('opacity','0');

    // Jedna para mniej do odkrycia
    pairsLeft--;

    // Sprawdzenie końca rozgrywki
    if (pairsLeft === 0){
      $('.board').html("<h1>You win! <br> Done in "+ turnCounter + " turns </h1>");
    }
    // Blokada odkrycia następnej karty
    lock = false;
}

// -------------------------------------

// Główna funckja gry

function revealCard(numberOfCard) {
  // alert(numberOfCard);

  // Sprawdzenie widoczności klikniętej karty
  var opacityValue = $('#card'+numberOfCard).css('opacity');

  //  Widoczność !=0  |  blokada wyłączona | ta sama karta nie jest kliknięta drugi raz
  if(opacityValue !==0 && lock === false && visibleNumber!==numberOfCard){

      // blokada włączona
      lock = true;

      // wartość dla background-image
      var picture =  "url(img/"+cards[numberOfCard]+")";

      // zmieniamy tło
      changeBackground(numberOfCard,picture);
      // Sprawdzamy ile kart jest odkrytych
      if(oneVisible === false){
        // first card
        oneVisible = true;
        // Zapamiętujemy, która karta jest już widoczna
        visibleNumber = numberOfCard;
        // blokada wyłączona
        lock = false;

      } else {
            // second card
            // Sprawdzamy czy tła są identyczne
            if(cards[visibleNumber] === cards[numberOfCard]){
                // Ukrywamy te karty
                setTimeout(function (){hide2Cards(numberOfCard,visibleNumber)},750 );
            }
            else {
              // Zmieniamy tło na początkowe
              setTimeout(function (){changeBackgroundToCardBack(numberOfCard)},1000 );
              setTimeout(function (){changeBackgroundToCardBack(visibleNumber)},1000 );
            }

            // Zwiększamy licznik tur
            turnCounter++;
            // Wypisujemy licznik tur
            $('.score').html('Turn counter: ' + turnCounter);
            // Żadna karta nie jest widoczna
            oneVisible = false;
      }

    }
}
