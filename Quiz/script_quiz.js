//informações do quiz como as perguntas, respostas, número de perguntas e as alternativas corretas.
const quiz = {
    codigo_resp: [],
    quant_quest: 3,
    respostas_corretas: [0,0,0],
    num_quest: {
        num_perg: () => {
            if (contador === 1) {
                return quiz.quests.perguntas[0]
            } else if (contador === 2) {
                return quiz.quests.perguntas[1]
            } else {
                return quiz.quests.perguntas[2]
            }
        },

        num_resp: () => {
            if (contador === 1) {
                return quiz.quests.respostas[0]
            } else if (contador === 2) {
                return quiz.quests.respostas[1]
            } else {
                return quiz.quests.respostas[2]
            }
        }
    },
    quests: {
        respostas: [
            ['Resposta certa','Resposta errada','Resposta errada','Resposta errada'],

            ['Resposta certa','Resposta errada', 'Resposta errada', 'Resposta errada'],

            ['Resposta certa', 'Resposta errada', 'Resposta errada', 'Resposta errada']
        ],
        perguntas: [
            'Pergunta 1',

            'Pergunta 2',
            
            'Pergunta 3'
        ]
    }
}

//Funções de manipulação das informações do quiz, esseciais para o seu funcionamento

//inicia o quiz 
function iniciar_quiz() {
    alter_layout(0)
}

//variável para que vai armazenar o número da perguna do quiz 
let contador = 1
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

//Envia o código que foi capturado pelo catch_cod do botão para o código_resp depois que o botão de 
//mudar pergunta foi clicado 
function send_cod() {
    quiz.codigo_resp.push(cat_cod)
}

//Função mãe que executa outras funções dependendo do número da pergunta do quiz
function alter_quest() {
    button_color()
    //condição para conferir se o usuário assinalou alguma alternativa
    if (cat_cod.length === 0 && contador>1) {
        alert('Escolha uma alternativa para continuar o quiz.')
        contador--
    }else{
        if(contador>1 && contador<=4){
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
        Show_res(quiz.codigo_resp)
    }
}

//Essa função escreve as perguntas e respostas do quiz. 
//Ela é chamada toda vez que a pergunta do quiz muda 

function write_data() {
    if (contador === quiz.quant_quest) {
        document.querySelector('#btn_mp').innerHTML = 'Mostrar resultado'
    }
    document.querySelector('p').innerHTML = quiz.num_quest.num_perg()

    for (let nq = 0; nq < 4; nq++) {
        btn_resp[nq].innerHTML = quiz.num_quest.num_resp()[nq]
    }
}

//Mostra o resultado do quiz para o usuário
function Show_res(cod) {
    let arr_respostas = []

    //loop para armazenar no arr_respostas as respostas erradas e corretas
    quiz.respostas_corretas.forEach( (_,i)=>{
        arr_respostas.push([])
        arr_respostas[i].push(`PERGUNTA ${i+1}`)
        arr_respostas[i].push(cod[i] == quiz.respostas_corretas[i])
    } )
        
    //estrutura para mostrar para o usuário as perguntas que ele errou ou acertou.
    if(arr_respostas.every((n) => n[1] == true)){
        res.innerHTML = 'PARABÉNS!<br>Você acertou todas as perguntas &#127942;'
    }else if(arr_respostas.every((n) => n[1] == false)){
        res.innerHTML = 'Que pena<br>Você não acertou nenhuma questão &#128577;<br>'
    }else{
        arr_respostas.forEach((e)=>{
            if(e[1]){
                res.innerHTML += `<p>${e[0]}<spam id="icon-acerto">&#10004;</spam><br></p>`
            }else{
                res.innerHTML += `<p>${e[0]}<spam id="icon-erro">&#10008;</spam><br></p>`
            }
        })
    }
    
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

