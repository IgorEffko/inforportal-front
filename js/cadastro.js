const form = document.getElementById("cadastroForm");
const resultado = document.getElementById("resultado");

function pegarDados() {
    const dados = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        dataNascimento: document.getElementById("dataNascimento").value,
        senha: document.getElementById("senha").value,
        confirmarSenha: document.getElementById("confirmarSenha").value
    };

    return dados;
}

function validarDados(dados) {
    if (dados.senha !== dados.confirmarSenha) {
        resultado.innerHTML = "As senhas não coincidem.";
        return false;
    }

    return true;
}

function salvarDados(dados) {
    const usuario = {
        nome: dados.nome,
        email: dados.email,
        dataNascimento: dados.dataNascimento
    };

    localStorage.setItem(
        "usuario",
        JSON.stringify(usuario)
    );
}

function retornarDados(dados) {
    resultado.innerHTML = `
        <h2>Cadastro realizado!</h2>
        <p>Nome: ${dados.nome}</p>
        <p>E-mail: ${dados.email}</p>
        <p>Data de nascimento: ${dados.dataNascimento}</p>
    `;
}

function cadastrar() {
    const dados = pegarDados();

    if (!validarDados(dados)) {
        return;
    }

    salvarDados(dados);
    retornarDados(dados);

    form.reset();
}

form.addEventListener("submit", function(event) {
    event.preventDefault();
    cadastrar();
});