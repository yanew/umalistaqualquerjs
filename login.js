let form = document.querySelector("form");
let inputLogin = document.querySelector("#login");
let inputSenha = document.querySelector("#senha");


const url = "http://localhost:3000/usuario";

/*const getUsuarios = () => {
    axios.get(url)
    .then(resp => 
        alert(JSON.stringify(resp.data)))
    .catch(error => console.error(error))
}

getUsuarios();*/

const getUsuario = (usuario) => {
    if(usuario.login==form.login.value){
        return usuario;
    }
}


const conferirUsuario = async () => {
    const uri = 'http://localhost:3000/usuario';
    const res = await fetch(uri);
    const usuarios = await res.json();

    //const u = usuarios.filter(getUsuario);

    let usu = {
        login: "",
        senha: "",
        nome: ""
    };

    usuarios.forEach(usuario =>{
        if((usuario.login==form.login.value)&&(usuario.senha==form.senha.value)){
            usu = {
                login: usuario.login,
                senha: usuario.senha,
                nome: usuario.nome
            }
        }
    });

    if(form.login.value===usu.login&&form.senha.value===usu.senha){
        //window.location.replace("http://127.0.0.1:5500/index.html");
        location.href = "http://127.0.0.1:5500/index.html";
    }else{
        alert('tente de novo');
    }


    return valido;
}

const logar = () =>{
    conferirUsuario();
}