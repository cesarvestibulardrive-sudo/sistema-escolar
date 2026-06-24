/*
TITULO: LÓGICA DO DASHBOARD
O QUE FAZ: Verifica sessão ativa, exibe nome do usuário e controla logout
DATA: 2026-06-24
RESULTADO ESPERADO: Usuário não autenticado volta ao login; autenticado vê seu nome e papel
*/

// === VERIFICAR SESSÃO E CARREGAR DADOS ===
window.addEventListener('DOMContentLoaded', async () => {

  // Verifica se há sessão ativa
  const { data: { session }, error } = await db.auth.getSession();

  if (!session) {
    window.location.href = '../../index.html';
    return;
  }

  const usuario = session.user;

  // Exibe email do usuário no header
  document.getElementById('nomeUsuario').textContent = usuario.email;

  // Busca perfil do usuário na tabela perfis
  const { data: perfil } = await db
    .from('perfis')
    .select('nome, papel')
    .eq('id', usuario.id)
    .single();

  if (perfil) {
    document.getElementById('nomeUsuario').textContent = perfil.nome;
    document.getElementById('papelUsuario').textContent =
      'Papel: ' + perfil.papel.charAt(0).toUpperCase() + perfil.papel.slice(1);
  } else {
    document.getElementById('papelUsuario').textContent =
      'Bem-vindo! Perfil ainda não configurado.';
  }

});

// === BOTÃO SAIR ===
document.getElementById('btnSair').addEventListener('click', async () => {

  const confirmacao = await Swal.fire({
    icon: 'question',
    title: 'Sair do sistema?',
    showCancelButton: true,
    confirmButtonText: 'Sim, sair',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#dc2626'
  });

  if (confirmacao.isConfirmed) {
    await db.auth.signOut();
    window.location.href = '../../index.html';
  }

});