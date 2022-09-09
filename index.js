let inputItem = document.querySelector("#inputItem");
let botaoAdicionar = document.querySelector("#botaoAdicionar");
let cartaoItem = document.querySelector("#cartaoItem");
let listaItens = document.querySelector("#listaItens");

let indice = 0;
let inputItemTemp;

function adicionarItem(){
    let item = document.createElement('div');
    item.id = "div"+indice;
    item.className = 'item'; 
    
    let painelTextoItem = document.createElement('div');
    let itemText = document.createElement('span');
    itemText.id = 'textoItem'+indice;
    itemText.className = 'textoItem'; 
    itemText.appendChild(document.createTextNode(inputItem.value));
    painelTextoItem.appendChild(itemText);
    painelTextoItem.className = 'painelTextoItem';
    item.appendChild(painelTextoItem);

    let painelBotoes = document.createElement('div');
    painelBotoes.id= 'painelBotoes';
    painelBotoes.className = 'painelBotoes';

    let botaoEditar = document.createElement('a');
    botaoEditar.className = 'link';
    let imgEditar = document.createElement('img');
    imgEditar.id = 'imgEditar'+indice;
    imgEditar.src = './edit.png';
    imgEditar.width=20;
    imgEditar.height=20;
    botaoEditar.onclick=selecionarItemParaEdicao
    botaoEditar.appendChild(imgEditar);
    
    let botaoRemover = document.createElement('a');
    botaoRemover.className = 'link';
    let imgRemover = document.createElement('img');
    imgRemover.id = 'imgRemover'+indice;
    imgRemover.src = './lixeira.png';
    imgRemover.width=20;
    imgRemover.height=20;
    botaoRemover.onclick=removerItem
    botaoRemover.appendChild(imgRemover);
    
    painelBotoes.appendChild(botaoEditar);
    painelBotoes.appendChild(botaoRemover);

    item.appendChild(painelBotoes);
    
    cartaoItem.appendChild(item);
    inputItem.value = '';

    indice++;
}

function selecionarItemParaEdicao(event){
    const targetId = event.target.id;
    const id = targetId.charAt(targetId.length-1);
    inputItemTemp = document.querySelector("#textoItem"+id);
    inputItem.value = inputItemTemp.textContent;
    let element = document.querySelector("#botaoAdicionar");
    element.textContent = "Atualizar";
    element.onclick=atualizarItem;
}

function atualizarItem(){
    inputItemTemp.textContent = inputItem.value;
    let element = document.querySelector("#botaoAdicionar");
    element.textContent = "Adicionar";
    element.onclick=adicionarItem;
}

function removerItem(event){
    const targetId = event.target.id;
    const id = targetId.charAt(targetId.length-1);
    let itemTemp = document.querySelector("#div"+id);
    itemTemp.remove();
}

function toggleElement(id) {
    let element = document.querySelector("#"+id);
    if (element.style.display === "none") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
  }