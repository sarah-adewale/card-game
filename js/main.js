// //Example fetch using pokemonapi.co
// document.querySelector('button').addEventListener('click', getFetch)
// let deck_id = ''

// function getFetch(){
//   // const choice = document.querySelector('input').value
//   const url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
//   document.querySelector('#player1').style.display = 'block'
//   document.querySelector('#player2').style.display = 'block'

//   fetch(url)
//       .then(res => res.json()) // parse response as JSON
//       .then(data => {
//         console.log(data) //console.log parsed data
//        deck_id = data.deck_id //fetches the deck_id data and adds it the the deck_id variable
       
//       })
//       .catch(err => {
//           console.log(`error ${err}`)
//       });

// }

let deck_id = ''
SHUFFLE_URL = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'

fetch(SHUFFLE_URL)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    deck_id = data.deck_id
  })

.catch(err => {
  console.log(`error ${err}`)
})

document.querySelector('button').addEventListener('click', getDraw)

function getDraw(){
  const CARDS_URL = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=2`
  document.querySelector('#player1').style.display = 'block'
  document.querySelector('#player2').style.display = 'block'

  fetch(CARDS_URL)
  .then(res => res.json())
  .then(data => {
    console.log(data.cards[0].image)
    document.querySelector('#player1').src = data.cards[0].image
    document.querySelector('#player2').src = data.cards[1].image

    let player1Val = convertToNum(data.cards[0].value)
    let player2Val = convertToNum(data.cards[1].value)
    if(player1Val > player2Val){
      document.querySelector('h3').innerText = `${data.cards[0].suit} ${data.cards[0].value} WINS!`
    }else if(player1Val < player2Val){
      document.querySelector('h3').innerText = `${data.cards[1].suit} ${data.cards[1].value} WINS!`
    }else{
      document.querySelector('h3').innerText = 'READY TO WAR!'
    }
  })

}

function convertToNum(val){
  if(val === 'ACE'){
    return 14
  }else if(val === 'KING'){
    return 13
  }else if(val === 'QUEEN'){
    return 12
  }else if(val === 'JACK'){
    return 11
  }else{
    return Number(val)
  }
}