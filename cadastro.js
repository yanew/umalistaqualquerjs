let form = document.querySelector("form");
let inputLogin = document.querySelector("#login");
let inputSenha = document.querySelector("#senha");
let inputNome = document.querySelector("#nome");

const cadastrar = () =>{
    if((inputLogin.value!=undefined&&inputSenha.value!=undefined)
        && (inputLogin.value!=''&&inputSenha.value!='')){
        criarUsuario();
        location.href = "login.html";
    }else{
        alert('tente de novo');
    }
}

const criarUsuario = async () => {
    const doc = {
        login: form.login.value,
        senha: form.senha.value,
        nome: form.nome.value
    }

    await fetch('http://localhost:3000/usuario',{
        method: 'POST',
        body: JSON.stringify(doc),
        headers: {'Content-Type': 'application/json'}
    });
}