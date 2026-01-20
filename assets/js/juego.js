const miModulo = (() =>{
    'use strick'

    let deck    = []
    const tipos = ['C', 'D', 'H', 'S'],
    especiales  = ['A','J', 'Q', 'K'];
    
    let puntosJugadores = [0,0];

    //Referencias del HTML 
    const btnPedir   = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo   = document.querySelector('#btnNuevo');

          const divCartasJugadores = document.querySelectorAll('.divcartas'),
                puntos             = document.querySelectorAll('small');

                // funcion que inicializa el juego
             const inicializarJuego = (numJugadores =2 ) =>{
                 deck = crearDeck();
                 
                 puntosJugadores= [];
                 for(let i=0; i < numJugadores; i++) {
                     puntosJugadores.push(0)
                    }
                    
                    puntos.forEach(elem =>elem.innerText =0);
                    divCartasJugadores.forEach( elem => elem.innerHTML='' );
                    btnPedir.disabled = false;
                    btnDetener.disabled = false;
                }

                // Funcion que permite crear Un deck
                const crearDeck = () =>{
                    deck=[];

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
                    return _.shuffle(deck);
                }
                
                //Funcion que permite tomar una carta
    
                const pedirCarta = () =>{
           
                    if (deck.length === 0){
                        throw('No hay cartas en el Deck')
                    }
                    return deck.pop();
                }

                const valorCarta = (carta) =>{
                    const valor = carta.substring(0 , carta.length -1);
                    return (isNaN(valor) ) ?
                    (valor==='A') ? 11:10
                    :valor *1
                }
                    
                // Turno: 0 = primer juador y el ultimo jugador es la computadora
                const acumularPuntos =(carta , turno) => {
                    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
                    puntos[turno].innerText= puntosJugadores[turno];
                    return puntosJugadores[turno];
                }  
                
                const crearCarta =(carta, turno) =>{
                    const imgcarta= document.createElement('img')
                    imgcarta.src= `assets/cartas/${ carta }.png`;
                    imgcarta.classList.add('carta');
                    divCartasJugadores[turno].append(imgcarta);
                }
                
                const determinarGanador=() =>{
                    const [ puntosMinimos, puntosComputador] = puntosJugadores;
                    setTimeout( () => {
                        if((puntosComputador > puntosMinimos) && (puntosComputador <=21) ){
                            alert('Lo siento perdiste!');
                        }
                        else if(puntosMinimos > 21){
                            alert('Lo siento perdiste!')
                        }
                        else if (puntosComputador === puntosMinimos){
                            alert('Empate')
                        }
                        else alert('Ganaste');
                    },100);
                }

                // turno computadora
                const turnoComputadora = (puntosMinimos) =>{
                    let puntosComputador = 0;

                    do {
                        const carta = pedirCarta();
                        puntosComputador = acumularPuntos(carta , puntosJugadores.length -1)
                        crearCarta(carta, puntosJugadores.length-1);
                    }
                    while((puntosComputador < puntosMinimos) &&(puntosMinimos<=21)){
                    }
                    
                    determinarGanador();
                }
                
                //Eventos
                btnPedir.addEventListener('click', () =>{
                    const carta = pedirCarta();
                    const puntosJugador = acumularPuntos(carta , 0);
                    crearCarta(carta, 0);
    
                    if (puntosJugador > 21){
                        btnDetener.disabled = true;
                        console.warn('Lo siento perdiste!');
                        btnPedir.disabled = true;
                        turnoComputadora(puntosJugador);
                    }else if(puntosJugador === 21){
                        console.warn('21, Genial!');
                        btnDetener.disabled =true;
                        btnPedir.disabled =true;
                        turnoComputadora(puntosJugador);
                    }
                });

                btnDetener.addEventListener('click', () =>{
                    btnPedir.disabled = true;
                    btnDetener.disabled = true;
                    turnoComputadora(puntosJugadores[0]);

                });

                return {
    
                    nuevoJuego : inicializarJuego};
                })();