/* 
=================================================================================================
informações do quiz como as perguntas, respostas, número de perguntas e as alternativas corretas.
=================================================================================================
*/
const quiz = {
    
    quant_quest: 3, //quantidade de questões

    respostas_corretas: [0,0,0],//Respostas corretas

    quests: {
        respostas: [
            [
                'Resposta certa',
                'Resposta errada',
                'Resposta errada',
                'Resposta errada'
            ],

            [
                'Resposta certa',
                'Resposta errada',
                'Resposta errada', 
                'Resposta errada'
            ],

            [
                'Resposta certa',
                'Resposta errada',
                'Resposta errada',
                'Resposta errada'
            ],
        ],

        perguntas: [
            'Pergunta 1',

            'Pergunta 2',
            
            'Pergunta 3'
        ]
    },

    comment_results:[
        'Que pena<br>Você não acertou nenhuma questão &#128577;<br>',//comentário se todas as respostas estiverem erradas
        'Você pode melhorar',//comentário se um acerto
        'Você está quase lá',//comentário se dois acertos
        'PARABÉNS!<br>Você acertou todas as perguntas &#127942;'//comentário se todas as respostas estiverem certas
    ]
}

/* 
===================================================================================
Funções de manipulação das informações do quiz, esseciais para o seu funcionamento.
===================================================================================
*/

const codigo_resp = [] /* Esse array vai armazenar as respostas do usuário de acordo com o código do botão 
    que o usuário selecionou */

//inicia o quiz 
function iniciar_quiz() {
    alter_layout(0)
}


let contador = 1 //variável que vai armazenar o número da pergunta em que o usuário está
document.querySelector('#btn_mp').addEventListener('click',()=>{
    contador++
    alter_quest()
})

//Essa função vai ser ativada quando um botão de respostas do quiz é clicado
let cat_cod = ''
function catch_cod(n) {
    cat_cod = n
    button_color(n)
}

/* Essa função envia o código que foi capturado pelo catch_cod do botão para o código_resp depois que o botão de 
mudar pergunta foi clicado  */
function send_cod() {
    codigo_resp.push(cat_cod)
}

//Função mãe que executa outras funções dependendo do número da pergunta do quiz
function alter_quest() {
    button_color()//função button_color para remover a cor do botão da pergunta passada
    if (cat_cod.length === 0 && contador>1) { //condição para conferir se o usuário assinalou alguma alternativa
        alert('Escolha uma alternativa para continuar o quiz.')
        contador--
    }else{
        if(contador>1 && contador<=quiz.quant_quest+1){
            send_cod()
            cat_cod = ''
        }
        if (contador > quiz.quant_quest) {
            alter_layout()
        } else {
            write_data()
        }
        
    }
    
}

//Funções de troca de layout da página e interação com o usuário
const res = document.querySelector('#res')
const btn_resp = document.getElementsByName('btn_resp')
const acertos = document.querySelector('#acertos')

//Essa função serve para alterar o layout do quiz.
function alter_layout(n) {
    if (n === 0) {
        document.querySelector('#inicio').setAttribute('hidden','')
        document.querySelector('#quiz').removeAttribute('hidden')
        alter_quest()
    } else {
        document.querySelector('#quiz').setAttribute('hidden','')
        res.removeAttribute('hidden')
        document.querySelector('#reset_quiz').removeAttribute('hidden')
        Show_res()
    }
}

/* Essa função escreve as perguntas e respostas do quiz. 
Ela é chamada toda vez que a pergunta do quiz muda  */
function write_data() {

    if (contador === quiz.quant_quest) {
        document.querySelector('#btn_mp').innerHTML = 'Mostrar resultado'
    }

    document.querySelector('p').innerHTML = quiz.quests.perguntas[contador-1]

    for (let nq = 0; nq < quiz.quant_quest+1; nq++) {
        btn_resp[nq].innerHTML = quiz.quests.respostas[contador-1][nq]
    }
}

/* função para saber quais respostas estão corretas ou incorretas para armazenar no isTrue_orFalse
e retornar esse array para a variável arr_respostas do show_res */
function isCorrect_orNo(cod){
    let isTrue_orFalse = []
    quiz.respostas_corretas.forEach( (_,i)=>{
        isTrue_orFalse.push([])
        isTrue_orFalse[i].push(`PERGUNTA ${i+1}`)
        isTrue_orFalse[i].push(cod[i] == quiz.respostas_corretas[i])
    } )
    return isTrue_orFalse
}

//Essa função vai retornar o número de acertos do usuário
function num_hit_sucess(cod){
    let n_hit = 0
    quiz.respostas_corretas.forEach( (_,i)=>{
        if(cod[i] == quiz.respostas_corretas[i]){
            n_hit++
        }
    } )
    return n_hit
}

//Mostra quantas e quais questões o usuário acertou
function Show_res() {
    const arr_respostas = isCorrect_orNo(codigo_resp)
    const num_hit = num_hit_sucess(codigo_resp)
    
    const numberOf_correctAnswers = []
    for(let i = 0; i < quiz.quant_quest+1 ; i++){
        numberOf_correctAnswers.push(
            [
                Number(quiz.quant_quest-quiz.quant_quest + i),
                quiz.comment_results[i]
            ]
        )
    }

    res.innerHTML = (numberOf_correctAnswers.find(n => n[0] === num_hit))[1]/*Mostra o comentário
    referente ao número de acertos*/

    res.innerHTML +=`<br>${num_hit}/${quiz.quant_quest}`//mostra a quantidade de acertos

        arr_respostas.forEach((e)=>{ //mostra quais questões foram acertadas
            if(e[1]){
                res.innerHTML += `<p>${e[0]}<spam id="icon-acerto">&#10004;</spam><br></p>`
            }else{
                res.innerHTML += `<p>${e[0]}<spam id="icon-erro">&#10008;</spam><br></p>`
            }
        })
}

//Função que muda a cor do botão das respostas
function button_color(n=''){
    for(let n_b = 0;n_b < 4; n_b++){
       btn_resp[n_b].style.backgroundColor =''
    }
    if(n.length != ''){
        btn_resp[n].style.backgroundColor = 'rgb(0 , 110, 150 , .2)'
    }   
}

