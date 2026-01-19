let deck    = []

const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A','J', 'Q', 'K']

//Referencias del HTML 
const btnPedir= document.querySelector('#btnPedir') ;
const btnDetener= document.querySelector('#btnDetener') ;
const btnNuevo = document.querySelector('#btnNuevo');

const puntos= document.querySelectorAll('small');

const divjugadorCartas = document.querySelector('#jugador-cartas');
const divComputadoraCartas = document.querySelector('#computadora-cartas');


let puntosJugador = 0,
 puntosComputador = 0;

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
deck= _.shuffle(deck)
console.log(deck)


}

crearDeck();

//Funcion que permite tomar una carta

const pedirCarta = () =>{

    if (deck.length === 0){
        console.log('No hay cartas en el Deck')
    }
 else{
 const carta= deck.pop();
 console.log(carta);
 

    return carta;

 }

}

 //pedirCarta();

const valorCarta = (carta) =>{

    const valor = carta.substring(0, carta.length -1);
 return (isNaN(valor) ) ?
          (valor==='A') ? 11:10
           :valor *1
}



const turnoComputadora = (puntosMinimos) =>{
do {
    const carta = pedirCarta();

  puntosComputador = puntosComputador + valorCarta( carta );

  
  puntos[1].innerText= puntosComputador;

 const imgcarta= document.createElement('img')
 imgcarta.src= `assets/cartas/${ carta }.png`;
 imgcarta.classList.add('carta');

 divComputadoraCartas.append(imgcarta)


 if(puntosMinimos >21){
    break;
 }
}

while((puntosComputador < puntosMinimos) &&(puntosMinimos<=21)){
}

setTimeout( () => {mensaje()},100);


}

//Eventos

btnPedir.addEventListener('click', () =>{

 const carta = pedirCarta();

  puntosJugador = puntosJugador + valorCarta( carta );

  
  puntos[0].innerText= puntosJugador;
  console.log(puntosJugador);

 const imgcarta= document.createElement('img')
 imgcarta.src= `assets/cartas/${ carta }.png`;
 imgcarta.classList.add('carta');

 divjugadorCartas.append(imgcarta)


if (puntosJugador > 21){
    btnDetener.disabled = true;


    console.warn('Lo siento perdiste!');
    btnPedir.disabled = true;
    turnoComputadora(puntosJugador);
}else if(puntosJugador === 21){
    console.warn('21, Genial!');
    turnoComputadora(puntosJugador);

}



});

btnDetener.addEventListener('click', () =>{

    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora(puntosJugador);

});


btnNuevo.addEventListener('click', () =>{

    btnPedir.disabled = false;
    btnDetener.disabled = false;

   deck = [];
   crearDeck();
   puntosComputador =   0;
   puntosJugador = 0;

   puntos[0].innerText = 0;
puntos[1].innerText = 0;

 let imagenes = document.querySelectorAll('img')

 let i=0;
 for(img of imagenes){
    imagenes[i].remove();
    i++;
 }

});

const mensaje = () =>{

    
if((puntosComputador > puntosJugador) && (puntosComputador <=21) ){
    alert('Lo siento perdiste!');
}
else if(puntosJugador > 21){
    alert('Lo siento perdiste!')
}
else if (puntosComputador === puntosJugador){
    alert('Empate')
}
else alert('Ganaste');

};