let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descriçao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right')
let numeros = document.querySelector('.d-1-3');

let etapaAtual = 0;
let numero = '';
let branco1 = false;

function comecarEtapa(){
    
    let etapa = etapas[etapaAtual];
    let numeroHtml = '';
    numero = '';
    branco1 = false;
    
    for(let i=1; i <= etapa.numeros; i++){
        if(i === 1){
            numeroHtml += '<div class="numero pisca"></div>'
        }
         else{
             numeroHtml += '<div class="numero"></div>'
        }
    }
    


    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descriçao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;

}
function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero){
            return true;
        }else{
            return false;
        }
    })
    if(candidato.length > 0){
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descriçao.innerHTML = `Nome: ${candidato.nome}<br/> Partido: ${candidato.partido}`;
        
        let fotosHtml = '';
        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotosHtml +=`<div class="d-1-image small"> <img src="${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`
            }else{
                fotosHtml +=`<div class="d-1-image"> <img src="${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`
            }
            
        }

        lateral.innerHTML = fotosHtml;

    }else{
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descriçao.innerHTML = '<div class="avisao pisca">VOTO NULO</div>';
    }

  

}


function clique(x){
       let elNumero = document.querySelector('.numero.pisca');
       if(elNumero !== null){
           elNumero.innerHTML = x;
           numero = `${numero}${x}`;
           elNumero.classList.remove('pisca');
           if(elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add('pisca');
           }else{
               atualizaInterface();
           }
           
       }
}
function branco(){
     if(numero === ''){
         branco1 = true;
         seuVotoPara.style.display = 'block';
         aviso.style.display = 'block';
         numeros.innerHTML = '';
         descriçao.innerHTML = '<div class="avisao pisca">VOTO EM BRANCO</div>';

     }else{
         alert('Para votar EM BRANCO, aperte em CORRIGE e tente novamente')
     }
}
function corrige(){
    comecarEtapa();
}
function confirmar(){
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;
    if(branco1 === true){
        votoConfirmado = true;
        console.log("Confirmando como BRANCO");
    }else if(numero.length === etapa.numeros){
        votoConfirmado = true;
        console.log(`Confirmando como ${numero}`);
    }

   if(votoConfirmado){
       etapaAtual++;
      if(etapas[etapaAtual] !== undefined){
        comecarEtapa();
    }else{
        document.querySelector('.tela').innerHTML ='<div class="avisao2 pisca">FIM</div>';
    }
}
}




comecarEtapa();
