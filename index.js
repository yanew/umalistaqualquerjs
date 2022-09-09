let form = document.querySelector("form");
let container = document.querySelector("#container");
let inputItem = document.querySelector("#inputItem");
let botaoAdicionar = document.querySelector("#botaoAdicionar");
let cartaoItem = document.querySelector("#cartaoItem");
let listaItens = document.querySelector("#listaItens");

let indice = 0;
let inputItemTemp;

const renderItens = async () => {
    
    const uri = 'http://localhost:3000/item';
    const res = await fetch(uri);
    const itens = await res.json();

    indice = itens.length+1;
    let template = '';
    
    itens.forEach(item => {
        template+= `
            <div id="div${item.id}" class="item">
                <div id="painelTexto${item.id}" class="painelTextoItem">
                    <span id="textoItem${item.id}" class="textoItem">${item.conteudo}</span>
                </div>
                <div id="painelBotoes${item.id}" class="painelBotoes">
                    <a id="linkEditar${item.id}" class="link" onClick="selecionarItemParaEdicao(event)">
                        <img id="imgEditar${item.id}" src="./edit.png" width="20" height="20"/>
                    </a>
                    <a id="linkRemover${item.id}" class="link" onClick="removerItem(event)">
                        <img id="imgRemover${item.id}" src="./lixeira.png" width="20" height="20"/>
                    </a>
                </div>
            </div> `
    });

    cartaoItem.innerHTML = template;
}

window.addEventListener('DOMContentLoaded', () => renderItens());

const criarItem = async () => {
    const doc = {
        conteudo: form.inItem.value
    }

    await fetch('http://localhost:3000/item',{
        method: 'POST',
        body: JSON.stringify(doc),
        headers: {'Content-Type': 'application/json'}
    });

    window.location.replace('index.html');
}

const editarItem = async (id) => {
    const doc = {
        conteudo: form.inItem.value
    }

    await fetch(`http://localhost:3000/item/${id}`,{
        method: 'PUT',
        body: JSON.stringify(doc),
        headers: {'Content-Type': 'application/json'}
    });

    window.location.replace('index.html');
}

/*const removerItem = async (id) => {
    await fetch(`http://localhost:3000/item/${id}`,{
        method: 'DELETE'
    });
}*/

function adicionarItem(){
    criarItem();
    let item = document.createElement('div');
    item.id = indice;
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
    painelBotoes.id= 'painelBotoes'+indice;
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
    /*botaoRemover.addEventListener('click', async (e) => {
        alert('yane')
        const res =  await fetch(`http://localhost:3000/item/${id}`,{
            method: 'DELETE'
        })
    });*/
    
    painelBotoes.appendChild(botaoEditar);
    painelBotoes.appendChild(botaoRemover);

    item.appendChild(painelBotoes);
    
    cartaoItem.appendChild(item);
    inputItem.value = '';

    indice++;
}

function selecionarItemParaEdicao(event){
    const targetId = event.target.id;
    const id = targetId.substr('imgEditar'.length, targetId.length-1);
    inputItemTemp = document.querySelector("#textoItem"+id);
    inputItem.value = inputItemTemp.textContent;
    let element = document.querySelector("#botaoAdicionar");
    element.textContent = "Atualizar";
    element.onclick=atualizarItem;
}

function atualizarItem(){
    const id = inputItemTemp.id.substr('textoItem'.length, inputItemTemp.id.length-1);
    editarItem(id);
    inputItemTemp.textContent = inputItem.value;
    let element = document.querySelector("#botaoAdicionar");
    element.textContent = "Adicionar";
    element.onclick=adicionarItem;
}

function removerItem(event){
    const targetId = event.target.id;
    const id = targetId.substr('imgRemover'.length, targetId.length-1);
    let itemTemp = document.querySelector("#div"+id);
    itemTemp.remove();
    //removerItem(id);
}