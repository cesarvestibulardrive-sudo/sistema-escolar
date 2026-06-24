/*
TITULO: LÓGICA DA TELA DE LOGIN
O QUE FAZ: Controla o formulário de login — validação, mostrar/ocultar senha e feedback visual
DATA: 2026-06-23
RESULTADO ESPERADO: Formulário valida campos e exibe mensagens de erro/sucesso ao usuário
*/

// === MOSTRAR / OCULTAR SENHA ===
const btnVerSenha = document.getElementById('btnVerSenha');
const inputSenha  = document.getElementById('senha');

btnVerSenha.addEventListener('click', () => {
  const visivel = inputSenha.type === 'text';
  inputSenha.type    = visivel ? 'password' : 'text';
  btnVerSenha.textContent = visivel ? '👁' : '🙈';
});

// === SUBMIT DO FORMULÁRIO ===
const formLogin = document.getElementById('formLogin');
const btnLogin  = document.getElementById('btnLogin');

formLogin.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value;

  // Validação básica
  if (!email || !senha) {
    Swal.fire({ icon: 'warning', title: 'Atenção', text: 'Preencha e-mail e senha.' });
    return;
  }

  if (senha.length < 6) {
    Swal.fire({ icon: 'warning', title: 'Atenção', text: 'A senha deve ter pelo menos 6 caracteres.' });
    return;
  }

  // Feedback visual no botão
  btnLogin.disabled     = true;
  btnLogin.textContent  = 'Entrando...';

  // TODO: integrar com Supabase na Etapa 05
  console.log('✅ Login enviado:', { email });

  // Simulação temporária (remover na Etapa 05)
  setTimeout(() => {
    btnLogin.disabled    = false;
    btnLogin.textContent = 'Entrar';
    Swal.fire({ icon: 'info', title: 'Em breve!', text: 'Autenticação será integrada na Etapa 05.' });
  }, 1500);

});