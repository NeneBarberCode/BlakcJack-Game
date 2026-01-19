let deck    = []

const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A','J', 'Q', 'K']

// Funcion que permite crear Un deck
const crearDeck = () =>{

for (let i=2; i<=10; i++){
    for(let tipo of tipos ){
        deck.push(i + tipo)
    }
}

for(let tipo of tipos){
    for(let esp of especiales ){
        deck.push(esp + tipo)
    }

}
// console.log(deck)
 deck= _.shuffle(deck)
console.log(deck)

}


crearDeck();

//Funcion que permite tomar una carta

const pedirCarta = () =>{
    const carta= deck.shift();

for(let i =0; i<1; i++){
    carta= (deck[i]);

}



    console.log(deck)
    console.log(carta);

    return carta;

}

pedirCarta();