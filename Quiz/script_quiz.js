/* 
=================================================================================================
informações do quiz como as perguntas, respostas, número de perguntas e as alternativas corretas.
=================================================================================================
*/
const quiz = {
    
    quant_quest: 3, //quantidade de questões

    respostas_corretas: [0,2,2],//Respostas corretas

    quests: {
        perguntas: [
            'As máquinas simples apresentam dois tipos de força que são: ',

            'O que é uma alavanca?',
            
            'Quantas alavancas existem na experiência?'
        ],
        
        respostas: [
            [
                'Força Motriz ou Potente e Força Resistente',
                'Força Peso e Força Motriz',
                'Força de Atrito e Força de Empuxo',
                'Força Elástica e Força Magnética'
            ],

            [
                'É um tipo de máquina simples que não altera a força aplicada sobre um objeto',
                'É um tipo de máquina composta que multiplica a força aplicada sobre um objeto ',
                'É um tipo de máquina simples utilizada para multiplicar a força aplicada sobre um objeto',
                'Nenhuma das ateriores'
            ],

            [
                'Há duas alavancas com pontos de apoio iguais', 
                'Há uma alavanca sem ponto de apoio', 
                'Há duas alavancas com pontos de apoio distintos', 
                'Não há alavancas no experimento']
            ]
    },

    comment_results:[
        'Que pena<br>Você não acertou nenhuma questão &#128577',//comentário se todas as respostas estiverem erradas
        'Você pode melhorar 🤔',//comentário se um acerto
        'Você está quase lá 😉',//comentário se dois acertos
        'PARABÉNS!<br>Você acertou todas as perguntas &#127942;'//comentário se todas as respostas estiverem certas
    ]
}

/* 
================================================================================================================
Funções para o funcionamento do quiz
================================================================================================================
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

    for(nq = 0; nq < quiz.quests.respostas[contador-1].length; nq++) {
        btn_resp[nq].innerHTML = quiz.quests.respostas[contador-1][nq]
    }

    button_color()//função button_color para remover a cor do botão da pergunta passada
}

//Função que muda a cor do botão das respostas
function button_color(n=''){
    for(let n_b = 0;n_b < quiz.quests.respostas[contador-1].length; n_b++){
       btn_resp[n_b].style.backgroundColor =''
    }
    if(n.length != ''){
        btn_resp[n].style.backgroundColor = 'rgb(0 , 110, 150 , .2)'
    }   
}

/* 
====================================
Funções para calcular os resultados
====================================
*/

/* função para saber quais respostas estão corretas ou incorretas para armazenar no isTrue_orFalse
e retornar esse array para a variável arr_respostas do show_res */
function isCorrect_orNo(cod){
    let isTrue_orFalse = []
    quiz.respostas_corretas.forEach( (_,i)=>{
        isTrue_orFalse.push([])
        isTrue_orFalse[i].push(cod[i] == quiz.respostas_corretas[i])
        isTrue_orFalse[i].push(quiz.quests.perguntas[i])
        isTrue_orFalse[i].push(quiz.quests.respostas[i][codigo_resp[i]])
    } )
    return isTrue_orFalse
}

//Essa função vai retornar o número de acertos do usuário
function num_hit_success(cod){
    let n_hit = 0
    quiz.respostas_corretas.forEach( (_,i)=>{
        if(cod[i] == quiz.respostas_corretas[i]){
            n_hit++
        }
    } )
    return n_hit
}
//Essa função pega os comentários de resultado do quiz e retorna para o show_res em um array
function correct_answers(){
    let num_correctAnswers = []
    for(let i = 0; i < quiz.quant_quest+1 ; i++){
        num_correctAnswers.push(
            [
                Number(quiz.quant_quest-quiz.quant_quest + i),
                quiz.comment_results[i]
            ]
        )
    }
    return num_correctAnswers
}

//Mostra quantas e quais questões o usuário acertou
function Show_res() {
    const arr_respostas = isCorrect_orNo(codigo_resp)
    const num_hit = num_hit_success(codigo_resp)
    const numberOf_correctAnswers = correct_answers()

    res.innerHTML = (numberOf_correctAnswers.find(n => n[0] === num_hit))[1]/*Mostra o comentário
    referente ao número de acertos*/

    res.innerHTML +=`<p>${num_hit}/${quiz.quant_quest}</p>`//mostra a quantidade de acertos
        arr_respostas.forEach((e,i)=>{ //mostra quais questões foram acertadas
            if(e[0]){
                res.innerHTML += `<p id="resposta-correta"><b>${i+1}) ${e[1]}</b><br></p>`
                res.innerHTML += `<p id="resposta-correta">${e[2]}<spam id="icon-acerto">&#10004;</spam><br></p>`
            }else{
                res.innerHTML += `<p id="resposta-incorreta"><b>${i+1}) ${e[1]}</b><br></p>`
                res.innerHTML += `<p id="resposta-incorreta">${e[2]}<spam id="icon-erro">&#10008;</spam><br></p>`
            }
        })
}



