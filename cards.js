/*
 * Cards
 */

var cards = (function(window, _) {
  'use strict';

  //***************************//
  /***** private variables *****/
  //***************************//
  // -- cached DOM elements
  // -- list of players
  var playerList = document.querySelector( '#playerList' );
  // -- input field: numbers of players, valid value are integers greater than 0
  var playersField = document.querySelector( '#players' );
  // -- button: validate input field then start the app
  var startBtn = document.querySelector( '#start' );
  // -- button: restart app
  var restartBtn = document.querySelector( '#restart' );

  // -- Variables and parameters
  // ** Deck of cards - initial deck
  var deck = [
    {
      'suite': 'S',
      'rank': ['A',2,3,4,5,6,7,8,9,10,'J','Q','K'],
    },
    {
      'suite': 'H',
      'rank': ['A',2,3,4,5,6,7,8,9,10,'J','Q','K'],
    },
    {
      'suite': 'D',
      'rank': ['A',2,3,4,5,6,7,8,9,10,'J','Q','K'],
    },
    {
      'suite': 'C',
      'rank': ['A',2,3,4,5,6,7,8,9,10,'J','Q','K'],
    },
  ];
  // ** Deck of cards - for every new game
  var newDeck = [];
  // ** Array of player/players
  var players = [];

  //*************************//
  /***** private methods *****/
  //*************************//
  // ** validate players field
  var validate = function () {
    // ** if value is invalid, display error message
    if ( !(playersField.value > 0) ) {
        playersField.classList.add('is-invalid');
    }
    // ** if value is valid, return true
    return playersField.value > 0;
  };

  // ** get card and assign to player, return value: card
  var getCard = function () {
    var suite = newDeck[Math.floor(Math.random()*newDeck.length)];
    var rank = suite.rank.splice(Math.floor(Math.random()*suite.rank.length), 1);
    var card = suite.suite + '-' + rank

    newDeck.forEach( function( v, i ) {
      // if suite is empty, remove from deck
      if ( !newDeck[i].rank.length ) {
        newDeck.splice( i, 1 );
      }
    });

    return card;
  };

  // ** display players and their cards on list
  var displayPLayerList = function () {
    players.forEach( function( v, i ) {
      var li = dom( 'li', { 'class': 'list-group-item justify-content-start align-items-center fade d-flex show'} );
      li.innerHTML = '<div class="player-id p-0 mr-3" style="min-width: 50px;"><i class="fas fa-user" style="font-size: 22px; margin-right: 8px;"></i><h3 style="display: inline-block;"></h3></div><div class="player-cards "></div>';
      li.querySelector('.player-id h3').textContent = i + 1;
      li.querySelector('.player-cards').textContent = v.cards.length ? v.cards.toString() : 'No cards!';

      playerList.appendChild( li );
    });
  };

  // ** create players list: param1 = number of players
  var createPLayerList = function ( count ) {
    while ( count ) {
      // players.push( getCard() );
      players.push({
        'cards': [],
      });

      count--;
    }

    // ** distribute cards while there are cards in deck
    while( newDeck.length  ) {
      players.some( function( v, i ) {
        players[i].cards.push( getCard() );

        if ( !newDeck.length ) {
          console.log( 'Deck is Empty! no more cards!!' );
        }
        return !newDeck.length;
      });
    };

    displayPLayerList();

    // console.dir( players );
    // console.log(deck);
    // console.log(newDeck);
  };

  // ** start the cards app
  var startApp = function ( event ) {
  	event.preventDefault();

    // ** if value is invalid: display error message, else continue
    if ( validate() ) {
      // ** hide start button
      startBtn.classList.remove('show');
      startBtn.classList.add('d-none');
      // ** show restart button
      restartBtn.classList.add('show');
      restartBtn.classList.remove('d-none');
      // ** disable input field
      playersField.setAttribute( 'disabled', '');
      createPLayerList( playersField.value );
    } else {
      return false;
    }
  };

  // ** restart the cards app
  var restartApp = function ( event ) {
  	event.preventDefault();

    // ** reset game deck
    deck.forEach(function(v,i) {
    	newDeck.push({
    		'suite': v.suite,
    		'rank': [].concat(v.rank),
        });
    });

    // ** reset players
    players = [];
    playersField.value = '';
    // ** reset players list
    while (playerList.hasChildNodes()) {
      playerList.removeChild(playerList.firstChild);
    }

    // ** show start button
    startBtn.classList.add('show');
    startBtn.classList.remove('d-none');
    // ** hide restart button
    restartBtn.classList.remove('show');
    restartBtn.classList.add('d-none');
    // ** enable input field
    playersField.removeAttribute('disabled');
  };

  // -- helper methods
  // ** create dom element: param 1 = HTML tag, param 2 = HTML attributes
  function dom(name, attrs) {
      var el = document.createElement(name.toString());

      !!attrs && Object.keys(attrs).forEach(function(key) {
        el.setAttribute(key, attrs[key]);
      });

      return el;
  };

  //**********************//
  /***** public method *****/
  //**********************//
  // ** main init method
  function init() {
    // set Deck for App
    deck.forEach(function(v,i) {
    	newDeck.push({
    		'suite': v.suite,
    		'rank': [].concat(v.rank),
        });
    });

    // ** start button click event listener
    startBtn.addEventListener( 'click', startApp, false );
    // ** restart button click event listener
    restartBtn.addEventListener( 'click', restartApp, false );
    // ** remove error validation on player field
    playersField.addEventListener( 'change', function() { playersField.classList.remove('is-invalid'); }, false );
  }

  //*******************************//
  /***** export public methods *****/
  //*******************************//
  return {
    deck: deck,
    init: init,
  };
}(window));

// Run after page load
window.addEventListener('load', function () {
	cards.init();
}, false);
