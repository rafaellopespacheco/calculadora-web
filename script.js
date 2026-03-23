
const teclado = document.querySelector('.teclado');
let numeroAnterior = null;
let numeroAtual = null;
let operador = null;
let resultado = null;

function alerta(mensagem) {
   const cooldown = document.querySelector('.cooldown');

   document.body.innerHTML += `
   <div class="notificacao">
      <div class="notificacao-container">
         <span class="material-symbols-outlined">error</span>
         <p>${mensagem}</p>
      </div>
      <div class="cooldown"></div>
   </div>`;

   const notificacao = document.querySelector('.notificacao');
   
   notificacao.addEventListener("click", function() {
      notificacao.style.opacity = 0;
      setTimeout(() => {
         notificacao.remove()
      }, 200);
   })

   setTimeout(() => {
      notificacao.style.opacity = 0;
      setTimeout(() => {
         notificacao.remove()
      }, 200);
   }, 5000);
}

function calcular(num1, num2, operador) {
   if (num1 == null || operador == null) return 0

   if (operador === '/' && num2 == 0) {
      alerta('Não é possível dividir um número por zero.')
      return 0;
   }


   if (operador === '+') return num1 + num2;
   else if (operador === '-') return num1 - num2;
   else if (operador === "/") return num1 / num2;
   else if (operador === "x") return num1 * num2;
   else if (operador === "%") return num1 * (num2 / 100); // ESTÁ ERRADO, irei arrumar
}

function processarEntrada(valorClicado, tipo) {
   if (valorClicado != undefined) {
      const visor = document.querySelector(".visor");
      if (tipo === 'number') {
         if (visor.value == 0) {
            visor.value = '';
         }
         visor.value += valorClicado.replace(',', '.');
      }
      else if (tipo === 'operator') {
         
         if (numeroAnterior !== null) {
            numeroAnterior = calcular(numeroAnterior, Number(visor.value), operador)
         } else { 
            numeroAnterior = Number(visor.value);
         }
         visor.value = '';
         operador = valorClicado;

      } else if (tipo === 'action') {
         if (valorClicado === 'backspace') {
            let backupVisor = visor.value;
            visor.value = backupVisor.substring(0, backupVisor.length - 1);

            if (visor.value == '') {
               visor.value = 0;
            }

         } else if (valorClicado == 'CE') {
            operador = null;
            numeroAnterior = null;
            numeroAtual = null;
            visor.value = '0';
         } else if (valorClicado === '=') {
            if (numeroAtual === '') {}
            numeroAtual = Number(visor.value);
            visor.value = calcular(numeroAnterior, numeroAtual, operador);
            numeroAnterior = Number(visor.value);
         }
      }
   }
}

const mapa = {
   '1': { valor: '1', tipo: 'number' },
   '2': { valor: '2', tipo: 'number' },
   '3': { valor: '3', tipo: 'number' },
   '4': { valor: '4', tipo: 'number' },
   '5': { valor: '5', tipo: 'number' },
   '6': { valor: '6', tipo: 'number' },
   '7': { valor: '7', tipo: 'number' },
   '8': { valor: '8', tipo: 'number' },
   '9': { valor: '9', tipo: 'number' },
   '0': { valor: '0', tipo: 'number' },
   '+': { valor: '+', tipo: 'operator' },
   '-': { valor: '-', tipo: 'operator' },
   '*': { valor: 'x', tipo: 'operator' },
   '/': { valor: '/', tipo: 'operator' },
   '%': { valor: '%', tipo: 'operator' },
   '=': { valor: '=', tipo: 'action' },
   'Enter': { valor: '=', tipo: 'action' },
   'Escape': { valor: 'CE', tipo: 'action' },
   'Backspace': { valor: 'backspace', tipo: 'action' },
}

document.addEventListener('keydown', function(event) {
   const tecla = mapa[event.key]
   if(tecla) processarEntrada(tecla.valor, tecla.tipo)
})

teclado.addEventListener("click", function(event) {
   const alvo = event.target;
   const valorClicado = alvo.dataset.value;
   const tipo = alvo.dataset.type;
   processarEntrada(valorClicado, tipo)
})

const aparencia = document.getElementById('aparencia');
const toggleAparencia = document.querySelector('.thumb');

aparencia.addEventListener('change', function(event) {
   if (aparencia.checked) {
      toggleAparencia.classList.add('active');
      document.body.classList.remove('escuro')
   } else {
      toggleAparencia.classList.remove('active');
      document.body.classList.add('escuro')
   }
   
})