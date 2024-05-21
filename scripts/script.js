const cards = document.querySelectorAll(".card");
timeTag = document.querySelector(".time b")
flipsTag = document.querySelector(".flips b")
refreshBtn = document.querySelector(".score button")

let maxTime = 0;
let timeLeft = maxTime;
let flips = 0;
let matchedCards = 0;
let disableDeck = false;
let isPlaying = false;
let cardOne, cardTwo, timer;

function initTimer() {
    timeLeft++;
    timeTag.innerText = timeLeft;
}

function flipCard({target: clickedCard}){
  /* Si no existe un usuarioLogueado, no se puede jugar */
    if (localStorage.getItem("usuarioLogueado")) {
      if(!isPlaying) {
        isPlaying = true;
        timer = setInterval(initTimer, 1000);
    }

    if(clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
        flips++;
        flipsTag.innerText = flips;
        clickedCard.classList.add("flip");
        if(!cardOne){
        return cardOne = clickedCard
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneIcon = cardOne.querySelector(".back-view i").classList.value;
        cardTwoIcon = cardTwo.querySelector(".back-view i").classList.value;
        matchCards(cardOneIcon, cardTwoIcon);
    }
    }
}

function matchCards(icon1, icon2) {
    if (icon1 === icon2) {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "¡Acertaste!",
            showConfirmButton: false,
            timer: 1500,
            backdrop: false,
            width: '30vw',
            height: '10vh',
          });
        matchedCards++;
            if (matchedCards == 8 && timeLeft > 0){
                saveGame(timeLeft, flips)
                Swal.fire({
                    title: '¡Lo hiciste!',
                    text: `Tu tiempo fue de ${timeLeft} en ${flips} saltos`,
                    icon: 'success',
                    timer: 2000, 
                    showConfirmButton: false,
                  });
                return clearInterval(timer);
            }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    } else {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "¡Fallaste!",
            showConfirmButton: false,
            timer: 1500,
            backdrop: false,
            width: '30vw',
            height: '10vh',
          });
    }

    setTimeout(() => {
       cardOne.classList.add("shake");
       cardTwo.classList.add("shake");
    }, 400);

    setTimeout(()=>{
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200)
}

function shuffleCards(){
    timeLeft = maxTime;
    flips = matchedCards = 0;
    cardOne = cardTwo = "";
    clearInterval(timer);
    timeTag.innerText = timeLeft;
    flipsTag.innerText = flips;
    disableDeck = isPlaying = false;

    let arr = ["tanjiro", "nezuko", "tomioka", "inosuke", "tengen", "tokito", "zenitsu", "muzan"];
    arr = arr.concat(arr.slice().reverse()); arr.sort(() => Math.random() > 0.5? 1 : -1);

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let iconTag = card.querySelector(".back-view i");
        setTimeout(() => {
            iconTag.classList.value = `${arr[index]}`;
        }, 500);
        card.addEventListener("click", flipCard);
    });
}

shuffleCards();
refreshBtn.addEventListener("click", shuffleCards);

cards.forEach(card =>{
    card.addEventListener("click", flipCard);
})


/* Usuarios */

let usuarios = [];

class Usuario {
    constructor(email, bestTime, bestFlips, lastTime, lastFlips) {
      this.id = usuarios.length + 1;
      this.email = email;
      this.bestTime = bestTime;
      this.bestFlips = bestFlips;
      this.lastTime = lastTime; 
      this.lastFlips = lastFlips;
    }
  
    //Metodos
    static agregarUsuario() {
        let usuario = new Usuario(
            document.registerUser.email.value,
            0, // bestTime
            0, // bestFlips
            0, // lastTime
            0 // lastFlips
          );

      /* Aregar Usuario */
      let auxUsuario = JSON.stringify(usuario);
      localStorage.setItem("usuarioLogueado", auxUsuario);
      usuarios.push(JSON.parse(auxUsuario));
      let usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
      document.getElementById("userEmail").innerText = usuarioLogueado.email; 
      
      /* Actualiza usuarios Existentes */
      localStorage.setItem("usuariosExistentes", JSON.stringify(usuarios));
    }
  }

window.onload = function() {
  if (localStorage.getItem("usuariosExistentes")) {
    usuarios = JSON.parse(localStorage.getItem("usuariosExistentes"));
  }
  if (localStorage.getItem("usuarioLogueado")) {
   mostrarUsuarioLogueado() 
  } else {
    mostrarModal();
  }
 };

 /* Mostrar información de usuarioLogueado */

 function mostrarUsuarioLogueado() {
  let usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
  
  document.getElementById('userEmail').innerText = usuarioLogueado.email;
    document.getElementById('userBestTime').innerText = usuarioLogueado.bestTime;
    document.getElementById('userBestFlips').innerText = usuarioLogueado.bestFlips;
    document.getElementById('userLastTime').innerText = usuarioLogueado.lastTime;
 }


/* Validar usuario existente  */

function validateUser(email) {
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email == email) {
      localStorage.setItem("usuarioLogueado", JSON.stringify(usuarios[i]))
      Swal.fire({
        title: '¡Bienvenido de vuelta!',
        text: `Tu record actual es ${usuarios[i].bestTime} en ${usuarios[i].bestFlips} saltos`,
        icon: 'success',
        confirmButtonText: '¡Vamos!'
      }, 3000, mostrarUsuarioLogueado()) ; 
      
      console.log("Correo electrónico encontrado");
      return false;
    }
  }
  Usuario.agregarUsuario();
  console.log("Correo electrónico no encontrado");
  return true;
}

  
  // Función para mostrar el modal
  async function mostrarModal() {
    const { value: formUsuario } = await Swal.fire({
      title: '¿Cual es tu nombre?',
      html: `
      <form class="form-inline col-sm-12 mt-3" name="registerUser">
        <input required class="form-control col-sm-7" id="UserName" name="email" type="text" autofocus style="color: #2e7d32; padding: 1em;">
      </form>`,
      backdrop: false,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Entrar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#40B340',
      cancelButtonColor: '#FF0000',
      showCloseButton: true,
      focusConfirm: true,
      focusCancel: false,
      preConfirm: () => {
        return [
          validateUser(document.registerUser.email.value)
          /* document.getElementById('UserName').value, */
        ];
      }
    });
  
    if (formUsuario && formUsuario[0] !== '' && formUsuario[1] !== '') {
      
      Swal.fire({
        title: '¡A Jugar!',
        icon: 'success',
        backdrop: false
      });
    } else {
      Swal.fire({
        title: 'Datos incorrectos',
        icon: 'warning',
        backdrop: false
      }), 500;
      mostrarModal();
    }
  }

  function saveGame(timeLeft, flips) {
    let usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
    usuarioLogueado.lastTime = timeLeft;
    usuarioLogueado.lastFlips = flips;
        if (usuarioLogueado.lastTime < usuarioLogueado.bestTime || usuarioLogueado.bestTime == 0) {
            usuarioLogueado.bestTime = usuarioLogueado.lastTime;   
            usuarioLogueado.bestFlips = usuarioLogueado.lastFlips;
        }
    let auxUsuario = JSON.stringify(usuarioLogueado);
    localStorage.setItem("usuarioLogueado", auxUsuario);

    // Actualizar el arreglo de usuarios con los nuevos datos de usuarioLogueado
    let usuarios = JSON.parse(localStorage.getItem("usuariosExistentes"));
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].id === usuarioLogueado.id) {
            usuarios[i] = usuarioLogueado;
            break;
        }
    }
    localStorage.setItem("usuariosExistentes", JSON.stringify(usuarios));

    // Actualizar los elementos HTML con los ids userBestTime, userBestFlips y userLastTime
    document.getElementById('userBestTime').innerText = usuarioLogueado.bestTime
    document.getElementById('userBestFlips').innerText = usuarioLogueado.bestFlips
    document.getElementById('userLastTime').innerText = usuarioLogueado.lastTime
}

    /* Cerrar Sesión */
    document.getElementById("signOffBtn").addEventListener("click", () =>{
      localStorage.removeItem("usuarioLogueado")
      location.reload();
    })

    /* Abrir otro usuario */
    document.getElementById("signInBtn").addEventListener("click", ()=> {
      mostrarModal();
    })