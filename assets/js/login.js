/*
TITULO: AUTENTICAÇÃO REAL COM SUPABASE
O QUE FAZ: Realiza login via Supabase Auth e redireciona pelo papel do usuário
DATA: 2026-06-24
RESULTADO ESPERADO: Usuário autenticado é redirecionado ao dashboard correto
*/

// === MOSTRAR / OCULTAR SENHA ===
const btnVerSenha = document.getElementById('btnVerSenha');
const inputSenha  = document.getElementById('senha');

btnVerSenha.addEventListener('click', () => {
  const visivel = inputSenha.type === 'text';
  inputSenha.type         = visivel ? 'password' : 'text';
  btnVerSenha.textContent = visivel ? '👁' : '🙈';
});

// === VERIFICAR SE JÁ ESTÁ LOGADO ===
window.addEventListener('DOMContentLoaded', async () => {
  const { data: { session } } = await db.auth.getSession();
  if (session) {
    window.location.href = 'pages/dashboard/index.html';
  }
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
  btnLogin.disabled    = true;
  btnLogin.textContent = 'Entrando...';

  // Autenticação via Supabase
  const { data, error } = await db.auth.signInWithPassword({ email, password: senha });

  if (error) {
    btnLogin.disabled    = false;
    btnLogin.textContent = 'Entrar';
    Swal.fire({ icon: 'error', title: 'Erro ao entrar', text: 'E-mail ou senha incorretos.' });
    return;
  }

  // Login bem-sucedido
  console.log('✅ Login realizado:', data.user.email);
  window.location.href = 'pages/dashboard/index.html';

});