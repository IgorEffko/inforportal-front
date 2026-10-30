
const form = document.getElementById("cadastroForm");
const resultado = document.getElementById("resultado");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    resultado.textContent = "Realizando cadastro...";
    resultado.className = "";

    const dados = {
        nome: document.getElementById("nome").value.trim(),
        email: document.getElementById("email").value.trim(),
        dataNascimento: document.getElementById("dataNascimento").value,
        senha: document.getElementById("senha").value,
        confirmarSenha: document.getElementById("confirmarSenha").value
    };

    if (dados.senha !== dados.confirmarSenha) {
        resultado.textContent = "As senhas não coincidem.";
        resultado.className = "mensagem-erro";
        return;
    }

    try {
        const resposta = await axios.post(
            "http://localhost:3000/api/cadastro",
            dados,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        const retorno = resposta.data;

        resultado.textContent = retorno.mensagem;

        if (resposta.status === 200 && retorno.sucesso) {
            resultado.className = "mensagem-sucesso";
            form.reset();
        } else {
            resultado.className = "mensagem-erro";
        }

    } catch (erro) {
        console.error("Erro no cadastro:", erro);

        resultado.textContent =
            erro.response?.data?.mensagem ||
            "Não foi possível conectar ao servidor.";

        resultado.className = "mensagem-erro";
    }
});
