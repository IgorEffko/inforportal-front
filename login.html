const form =
    document.getElementById("cadastroForm");

const mensagem =
    document.getElementById("mensagem");

const jornalista =
    document.getElementById("jornalista");

const conviteContainer =
    document.getElementById("conviteContainer");

const codigoConvite =
    document.getElementById("codigoConvite");


// ==========================================
// USUÁRIOS
// ==========================================

function obterUsuarios() {

    const dados =
        localStorage.getItem(
            "usuariosInfoPortal"
        );

    if (!dados) {

        return [];

    }

    try {

        return JSON.parse(dados);

    } catch {

        return [];

    }

}


function salvarUsuarios(usuarios) {

    localStorage.setItem(
        "usuariosInfoPortal",
        JSON.stringify(usuarios)
    );

}


// ==========================================
// MENSAGEM
// ==========================================

function mostrarMensagem(
    texto,
    tipo
) {

    mensagem.textContent = texto;

    mensagem.className =
        `mensagem ${tipo}`;

}


// ==========================================
// JORNALISTA
// ==========================================

jornalista.addEventListener(
    "change",
    function() {

        if (jornalista.checked) {

            conviteContainer.classList.add(
                "visivel"
            );

        } else {

            conviteContainer.classList.remove(
                "visivel"
            );

            codigoConvite.value = "";

        }

    }
);


// ==========================================
// CADASTRO
// ==========================================

form.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const nome =
            document
                .getElementById("nome")
                .value
                .trim();


        const email =
            document
                .getElementById("email")
                .value
                .trim()
                .toLowerCase();


        const dataNascimento =
            document
                .getElementById("dataNascimento")
                .value;


        const senha =
            document
                .getElementById("senha")
                .value;


        const confirmarSenha =
            document
                .getElementById("confirmarSenha")
                .value;


        // ==================================
        // VALIDAÇÕES
        // ==================================

        if (nome.length < 3) {

            mostrarMensagem(
                "Informe seu nome completo.",
                "erro"
            );

            return;

        }


        if (!email.includes("@")) {

            mostrarMensagem(
                "Informe um e-mail válido.",
                "erro"
            );

            return;

        }


        if (!dataNascimento) {

            mostrarMensagem(
                "Informe sua data de nascimento.",
                "erro"
            );

            return;

        }


        if (senha.length < 6) {

            mostrarMensagem(
                "A senha deve possuir pelo menos 6 caracteres.",
                "erro"
            );

            return;

        }


        if (senha !== confirmarSenha) {

            mostrarMensagem(
                "As senhas não coincidem.",
                "erro"
            );

            return;

        }


        // ==================================
        // VERIFICAR IDADE
        // ==================================

        const nascimento =
            new Date(dataNascimento);

        const hoje =
            new Date();

        let idade =
            hoje.getFullYear() -
            nascimento.getFullYear();

        const mes =
            hoje.getMonth() -
            nascimento.getMonth();

        if (
            mes < 0 ||
            (
                mes === 0 &&
                hoje.getDate() <
                nascimento.getDate()
            )
        ) {

            idade--;

        }


        // ==================================
        // JORNALISTA
        // ==================================

        let perfil =
            "LEITOR";


        if (jornalista.checked) {

            if (idade < 16) {

                mostrarMensagem(
                    "O cadastro de jornalista exige idade mínima de 16 anos.",
                    "erro"
                );

                return;

            }


            if (
                codigoConvite.value
                    .trim()
                    .length === 0
            ) {

                mostrarMensagem(
                    "Informe o código do convite corporativo.",
                    "erro"
                );

                return;

            }


            /*
             * Código de convite de teste.
             *
             * No backend real, o convite deverá
             * ser validado no servidor.
             */

            if (
                codigoConvite.value
                    .trim()
                    .toUpperCase()
                !==
                "INFO2026"
            ) {

                mostrarMensagem(
                    "Código de convite inválido.",
                    "erro"
                );

                return;

            }


            perfil =
                "JORNALISTA";

        }


        // ==================================
        // BUSCAR USUÁRIOS
        // ==================================

        const usuarios =
            obterUsuarios();


        // ==================================
        // E-MAIL ÚNICO
        // ==================================

        const emailExiste =
            usuarios.some(
                usuario =>
                    usuario.email === email
            );


        if (emailExiste) {

            mostrarMensagem(
                "Este e-mail já está cadastrado.",
                "erro"
            );

            return;

        }


        // ==================================
        // CRIAR USUÁRIO
        // ==================================

        const novoUsuario = {

            id:
                Date.now(),

            nome:
                nome,

            email:
                email,

            dataNascimento:
                dataNascimento,

            senha:
                senha,

            perfil:
                perfil

        };


        usuarios.push(
            novoUsuario
        );


        salvarUsuarios(
            usuarios
        );


        // ==================================
        // LOGIN AUTOMÁTICO
        // ==================================

        localStorage.setItem(

            "usuarioLogado",

            JSON.stringify({

                id:
                    novoUsuario.id,

                nome:
                    novoUsuario.nome,

                email:
                    novoUsuario.email,

                perfil:
                    novoUsuario.perfil

            })

        );


        mostrarMensagem(

            "Cadastro realizado com sucesso! Entrando...",

            "sucesso"

        );


        form.reset();


        conviteContainer.classList.remove(
            "visivel"
        );


        // ==================================
        // REDIRECIONAR
        // ==================================

        setTimeout(

            function() {

                window.location.href =
                    "login.html";

            },

            1200

        );

    }
);