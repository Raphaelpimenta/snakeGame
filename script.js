(function(){
    'use strict'

    var stage = document.getElementById("stage");
    var contxt = stage.getContext('2d');
    document.addEventListener('keydown', keyPush);

    setInterval(game, 60);

    //Definições de variáveis
    const vel = 1; //velocidade; quantas casas a cobrinha vai andar

    var vx = 0; //velocidadeX e velocidadeY é igual a zero no ponto inicial
    var vy = 0;
    var px = 10; //posiçãoX
    var py = 15; //posiçãoY
    var Tq = 20; //Tq = Tamanho do quadrado, cada quadradro tera que ter 20 de width e 20 de height
    var Qq = 20; //Qq = Quantidade de quadrados
    var Mx = 15; //Posição X inicial da Maçã
    var My = 15; //Posição Y inicial da Maçã

    var trail = []; //Rastro da cobra (Vazio)
    var tail = 3; //Tamanho da calda

    function game(){
        px += vx; //posição da cabeça da cobra na velocidade 0
        py += vy;

        if(px < 0){ //Quanda a cobra bate na borda ela aparece do outro lado da borda (bate na borda esquerda)
            px = Qq - 1;
        }

        if(px > Qq -1){ //Borda da parte direita
            px = 0
        }

        if(py < 0){  //Borda da parte de baixo
            py = Qq - 1;
        }

        if(py > Qq - 1){ //Borda da parte de cima
            py = 0
        }

        contxt.fillStyle = "black"; //aplicando cor no stage 
        contxt.fillRect(0,0, stage.width, stage.height); //0, 0 é a posição, e stage.width, stage.height é onde eu quero aplicar a cor

        contxt.fillStyle = "red"; //Aplicando cor na maçã
        contxt.fillRect(Mx * Qq, My * Qq, Tq, Tq); //Mx* Qq, My * Qq - multiplicando a posição da maçã com a quandtidade de quadrados 15*20

        contxt.fillStyle = "gray"; //Aplicando cor na cobra
        for (var i = 0; i < trail.length; i++){ 
            contxt.fillRect(trail[i].x * Tq, trail[i].y * Tq, Tq - 1, Tq - 1); //Rastro da cobra - 4 parâmetro //Tq - 1 são o quad da cobra

            //Verificação
            if(trail[i].x == px && trail[i].y == py){ //Se o rastro x for igual a posiçãoX dará game over, o mesmo vale para posição py
                vx = vy = 0; //As velocidades se anulam
                tail = 3; //A calda volta para posição inicial
            }
        }

        //Movimento da cobra
        trail.push({x: px, y:py}); //Objeto - x na posiçãoX atual e y na posiçãoY atual / Colocando o primeiro elemento na array
        while(trail.length > tail){ //Enquanto o tamanho do rastro for maior que a calda, então tire o rastro
            trail.shift(); //Tirando o elemento da array
        }

        //Aumentando o tamanho da cobra
        if(Mx == px && My == py){ //Se a maçãX for igual a posiçãoX (o mesmo para o y), então aumente o tamanho da calda
            tail++;
            Mx = Math.floor(Math.random() * Qq); //Math.floor arredonda para baixo/Math.random a maçã aparecerá em algum lugar aleatório
            My = Math.floor(Math.random() * Qq); 
        }

    }

    //Movimentação da cobra - controle
    function keyPush(event){
        switch(event.keyCode){
            case 37: //tecla da esquerda: Left
                vx = -vel; //direita para a esquerda (+X = direita e -X = esquerda)
                vy = 0;
                break;

            case 38: //tecla de cima: Up
                vx = 0; 
                vy = -vel; //Para subir a velocidade é negativa
                break;

            case 39: //tecla da direita: Right
                vx = vel; //Da esquerda para direira (+X = direita e -X = esquerda)
                vy = 0;
                break;

            case 40: //tecla de baixo: Down
                vx = 0; 
                vy = vel; //Para descer a velocidade é
                break;
            default:

                break;
        }
    }

})()