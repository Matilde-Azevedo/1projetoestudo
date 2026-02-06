document.addEventListener('DOMContentLoaded', function () {
    // Mostrar/Ocultar Senha
    const mostrarsenha = document.querySelectorAll('span.olho')
    const senhaOlho = document.querySelectorAll('input.senhasolho')
    
    mostrarsenha.forEach((icone, index) => {
        const acaolho = senhaOlho[index]
        icone.addEventListener('click', () => {
            const visivel = acaolho.type === 'password'
            acaolho.type = visivel ? 'text' : 'password'
            icone.textContent = visivel ? 'visibility_off' : 'visibility'
        })
    })

    //_____________________________ Funções Reutilizáveis _____________________________

    // Exibir/Ocultar Mensagem de Erro
    function exibirErro(input, msgErro, mensagem = '') {
        if (mensagem) {
            msgErro.textContent = mensagem
            msgErro.style.display = 'block'
            input.style.backgroundColor = 'rgba(255, 0, 0, 0.347)'
        } else {
            msgErro.style.display = 'none'
            input.style.backgroundColor = ''
        }
    }

    // Validação Genérica
    function validarCampo(input, msgErro, regex = null, mensagemErro = '*Preencha o campo corretamente!') {
        const valor = input.value.trim()
        if (!valor) {
            exibirErro(input, msgErro, mensagemErro)
            return false
        } else if (regex && !regex.test(valor)) {
            exibirErro(input, msgErro, mensagemErro)
            return false
        } else {
            exibirErro(input, msgErro)
            return true
        }
    }

    //__________________________________ Usuário __________________________________
    const usuario = document.getElementById('novousuario')
    const msgErroUsu = document.getElementById('msgnovousuarioErro')
    usuario.addEventListener('blur', () => validarCampo(usuario, msgErroUsu))

    //__________________________________ Email _______________________________
    const email = document.querySelectorAll('input.email')
    const mensagem = document.querySelectorAll('.emailUsuario .erromensagem')

    email.forEach((input, index) => {
        const msgErro = mensagem[index]
        const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

        input.addEventListener('blur', () => 
            validarCampo(input, msgErro, regexEmail, '*E-mail inválido!')
        )

        input.addEventListener('input', () => {
            input.value === '' && exibirErro(input, msgErro)
        })
    });

    //__________________________________ Senha _____________________________
    const senha = document.querySelectorAll('.senhas')
    const msgerrosenha = document.querySelectorAll('.senhaUsuario .erromensagem')

    senha.forEach((input, index) => {
        const msgErro = msgerrosenha[index]
        input.addEventListener('blur', () => {
            const valor = input.value.trim()
            const eRegistro = input.classList.contains('registrar')

            if (!valor) {
                exibirErro(input, msgErro, '*A senha não pode estar vazia!')
            } else if (eRegistro && !/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(valor)) {
                exibirErro(input, msgErro, '*A senha deve ter 8 caracteres, uma maiúscula e um número!')
            } else if (valor.length < 8) {
                exibirErro(input, msgErro, '*A senha deve ter pelo menos 8 caracteres!')
            } else {
                exibirErro(input, msgErro)
            }
        })

        input.addEventListener('input', () => {
            input.value === '' && exibirErro(input, msgErro)
        })
    })

    //______________ Alternar entre Login e Registro _____________________________
    const registrar = document.querySelector('.registrarLink')
    const login = document.querySelector('.loginLink')
    const cadastro = document.querySelector('#iniciarSessao')

    registrar.addEventListener('click', function(e) {
        e.preventDefault()
        cadastro.classList.add('modoRegistro')
    });

    login.addEventListener('click', function(e) {
        e.preventDefault()
        cadastro.classList.remove('modoRegistro')
    })
})

document.addEventListener('DOMContentLoaded', function () {

    // Função para validar o formato do email
    function validarEmail(email) {
        const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regexEmail.test(email)
    }

    // Função para validar a senha (mínimo de 8 caracteres, 1 maiúscula, 1 número)
    function validarSenha(senha) {
        const regexSenha = /^(?=.*[A-Z])(?=.*\d).{8,}$/
        return regexSenha.test(senha)
    }

    function emailRegistrado(email){
        const usuarioRegistros = JSON.parse(localStorage.getItem('usuarios')) || []

        return usuarioRegistros.some(user => user.email === email) 
    }

    // Função para verificar se todos os campos estão preenchidos e válidos
    function verificarCampos() {
        const usuario = document.getElementById('novousuario').value.trim()
        const email = document.querySelectorAll('.email')[1].value.trim()
        const senha = document.querySelectorAll('.senhas')[1].value.trim()

        // Verifica se os campos estão preenchidos
        if (!usuario || !email || !senha) {
            erroModal('Preencha os campos!')
            return false
        } 

        // Valida o formato do email
        if (!validarEmail(email)) {
            erroModal('E-mail inválido')
            return false
        } 
        
        if(emailRegistrado(email)){
            erroModal('E-mail inválida, já está em uso')
            return false
        }

        // Valida a senha
        if (!validarSenha(senha)) {
            erroModal('Senha inválida')
            return false
        }

        return true
    }

    // Função para limpar os campos do formulário
    function limparCampos() {
        document.getElementById('novousuario').value = ''
        document.querySelectorAll('.email')[1].value = ''
        document.querySelectorAll('.senhas')[1].value = ''
    }

    function salvarUsuario(){
         const usuario = document.getElementById('novousuario').value
            const email = document.querySelectorAll('.email')[1].value
            const senha = document.querySelectorAll('.senhas')[1].value

            const dadosUsuario = {
                usuario: usuario,
                email: email,
                senha: senha
            }

            let usuarioRegistros = JSON.parse(localStorage.getItem('usuarios')) || []

            usuarioRegistros.push(dadosUsuario)

            // Salvar no localStorage
            localStorage.setItem('usuarios', JSON.stringify(usuarioRegistros))

    }

    const btnRegistrar = document.querySelector('.btnRegistro')

    btnRegistrar.addEventListener('click', function (e) {
        e.preventDefault() // Previne o comportamento padrão do formulário

        if(verificarCampos()){
            salvarUsuario()

            limparCampos()
            sucessoModal()
        }
    })
});

document.addEventListener('DOMContentLoaded', function () {

    // Função para verificar o login
    function verificarLogin() {
        const usuarioLogin = document.getElementById('usuario').value.trim()
        const senhaLogin = document.getElementById('senha').value.trim()

        // Verificar se o campo de usuário e senha não estão vazios
        if (!usuarioLogin || !senhaLogin) {
            /* alert('Por favor, preencha todos os campos.') */
            erroModal('Por favor, preencha todos os campos')
            
            return false
        }

        // Buscar os dados do usuário armazenados no localStorage
        const usuarioRegistros = JSON.parse(localStorage.getItem('usuarios')) || []

        const usuarioSalvo = usuarioRegistros.find(user => user.email === usuarioLogin && user.senha === senhaLogin) 

        // Verificar se os dados existem no localStorage
        if (usuarioSalvo) {
            // **Salvar o usuário logado**
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioSalvo));
    
            // Redirecionar para a página principal
            window.location.replace('index.html');
        } else {
            erroModal('Usuário ou senha inválidos.');
        }
    }

    // Adicionar evento ao botão de login
    const btnLogin = document.querySelector('.Entrar')

    btnLogin.addEventListener('click', function (e) {
        e.preventDefault() // Previne o comportamento padrão do formulário

        // Chamar a função para verificar o login
        verificarLogin()
    });
});

function fecharModal(){
    document.getElementById('modal').style.display = 'none'
    document.getElementById('fundoModal').style.display = 'none'
}

function sucessoModal(){
    const sucessoModal = document.getElementById('modal')
    const corModal = document.querySelector('div.conteudo_modal')
    const iconeModal = document.querySelector('span.emojiModal')
    const tituloModal = document.querySelector('h4.tituloModal')
    const pModal = document.querySelector('p.paragrafoModal')
    const btnModal = document.querySelector('button.erroModal')
    const fundomodal = document.querySelector('div#fundoModal')

    corModal.style.border = '8px solid var(--cor2)'
    iconeModal.textContent = 'check'
    iconeModal.style.color = 'var(--cor2)'
    tituloModal.textContent = 'Bem-vindo(a)'
    pModal.textContent = 'Cadastro realizado com sucesso!'
    btnModal.style.backgroundColor = 'var(--cor2)'
    fundomodal.style.display= 'block'
    sucessoModal.style.display = 'block'

    
}

function erroModal(msg){
    const erroModal = document.getElementById('modal')
    const corModal = document.querySelector('div.conteudo_modal')
    const iconeModal = document.querySelector('span.emojiModal')
    const tituloModal = document.querySelector('h4.tituloModal')
    const pModal = document.querySelector('p.paragrafoModal')
    const btnModal = document.querySelector('button.erroModal')
    const fundomodal = document.querySelector('div#fundoModal')

    corModal.style.border = '8px solid rgba(255, 0, 0, 0.634)'
    iconeModal.textContent = 'dangerous'
    iconeModal.style.color = 'rgba(255, 0, 0, 0.634)'
    tituloModal.textContent = 'Ocorreu um erro'
    pModal.textContent = msg
    btnModal.style.backgroundColor = 'rgba(255, 0, 0, 0.634)'
    fundomodal.style.display= 'block'
    erroModal.style.display = 'block'
}