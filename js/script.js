//1 traernos lo que nos interesa del html
//2 crear las promesas, cuenta atras y numero azar
//3 comparar los numeros 

//llamamos a todos los elementos del Html que nos interesa
const cuentaAtras = document.getElementById('countdown')
const numeroUsuario = document.getElementById('userInput')
const resultado = document.getElementById('result')
const reinicio = document.getElementById('restart')
let ultimasPartidas=JSON.parse(localStorage.getItem('historialPartidas'))||[] 
let bombas = JSON.parse(localStorage.getItem('bombas'))|| 0
let numeroAzar

//creamos la promesa

userInput.addEventListener('click',()=>{
let contador = new Promise((resolve) => {
    let segundos = 5;
    setInterval(()=>{
        if(segundos >= 0){
            cuentaAtras.innerHTML = `<p class='red'>Tiempo restante: ${segundos}</p>`
            segundos--
                }else{
                    resolve()
                }
                }, 1000)
                })
                
                

//La promesa que nos devuelve un numero al azar entre 1 y 3
let promesaAzar = new Promise ((resolve) =>{
    setTimeout(()=>{
        numeroAzar = Math.floor(Math.random()*( 4 - 1 ) + 1)
        resolve(numeroAzar);
    }, 5000)
})

//comparamos los numeros 
contador.then(()=>{
    return promesaAzar
}).then(()=>{
    if(numeroUsuario.value == numeroAzar){

        ultimasPartidas.push('Ganada')
        localStorage.setItem('historialPartidas',JSON.stringify(ultimasPartidas))
        bombas ++
        localStorage.setItem('bombas',JSON.stringify(bombas))
       

        resultado.innerHTML = `<h3 class='green'>¡Felicidades! Has desactivado la bomba</h3>
        <h4>Has escojido el ${numeroUsuario.value} que es el mismo que ${numeroAzar}</h4>
        <p>Llevas ${bombas} y tu historial ha sido = ${ultimasPartidas}</p>`
     
    }else {

        ultimasPartidas.push('Perdida')
        localStorage.setItem('historialPartidas',JSON.stringify(ultimasPartidas))
        bombas ++
        localStorage.setItem('bombas',JSON.stringify(bombas))
    

        resultado.innerHTML = `<h3 class='red'>Lo siento la bomba ha estallado </h3>
        <h4>Has escojido el ${numeroUsuario.value} que es el distinto a ${numeroAzar}</h4>
        <p>Llevas ${bombas} y tu historial ha sido = ${ultimasPartidas}</p>`
    }

})

})


//para reiniciar el juegom y las memorias de las partidas
reinicio.addEventListener(`click`,()=>{
    
    localStorage.setItem('historialPartidas',0)
    localStorage.setItem('bombas',0)
    ultimasPartidas = [];
    bombas = 0
    resultado.innerHTML='',
    cuentaAtras.innerHTML= ''

})