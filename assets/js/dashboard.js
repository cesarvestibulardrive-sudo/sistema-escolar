/*
TITULO: LÓGICA DO DASHBOARD COM SIDEBAR
O QUE FAZ: Verifica sessão, carrega sidebar pelo papel do usuário e exibe dados
DATA: 2026-06-24
RESULTADO ESPERADO: Dashboard com menu lateral correto para cada papel de usuário
*/

// === VERIFICAR SESSÃO E CARREGAR DADOS ===
window.addEventListener('DOMContentLoaded', async () => {

  // Verifica se há sessão ativa
  const { data: { session } } = await db.auth.getSession();

  if (!session) {
    window.location.href = '../../index.html';
    return;
  }

  const usuario = session.user;

  // Busca perfil do usuário
  const { data: perfil } = await db
    .from('perfis')
    .select('nome, papel')
    .eq('id', usuario.id)
    .single();

  const papel = perfil?.papel || 'gestor';
  const nome  = perfil?.nome  || usuario.email;

  // Gera o menu lateral com o papel correto
  gerarSidebar(papel);

  // Exibe informações no dashboard
  document.getElementById('papelUsuario').textContent =
    perfil
      ? `Bem-vindo, ${nome}! Papel: ${papel.charAt(0).toUpperCase() + papel.slice(1)}`
      : `Bem-vindo, ${usuario.email}! Perfil ainda não configurado.`;

  // Botão menu mobile
  const btnMenu = document.getElementById('btnMenuMobile');
  if (btnMenu) btnMenu.addEventListener('click', abrirSidebar);

});