/*
TITULO: MENU LATERAL (SIDEBAR)
O QUE FAZ: Gera o menu lateral dinamicamente conforme o papel do usuário
DATA: 2026-06-24
RESULTADO ESPERADO: Menu lateral responsivo com itens corretos por papel
*/

// === ITENS DO MENU POR PAPEL ===
const MENU_ITENS = {
  super_admin: [
    { icon: '🏠', label: 'Dashboard',    href: '/pages/dashboard/index.html' },
    { icon: '🏫', label: 'Escolas',      href: '/pages/escolas/index.html' },
    { icon: '👥', label: 'Usuários',     href: '/pages/usuarios/index.html' },
  ],
  gestor: [
    { icon: '🏠', label: 'Dashboard',    href: '/pages/dashboard/index.html' },
    { icon: '👥', label: 'Alunos',       href: '/pages/alunos/index.html' },
    { icon: '🎓', label: 'Professores',  href: '/pages/professores/index.html' },
    { icon: '📚', label: 'Turmas',       href: '/pages/turmas/index.html' },
    { icon: '📋', label: 'Disciplinas',  href: '/pages/disciplinas/index.html' },
    { icon: '⚖️',  label: 'Atividades',  href: '/pages/atividades/index.html' },
    { icon: '📊', label: 'Relatórios',   href: '/pages/relatorios/index.html' },
  ],
  coordenador: [
    { icon: '🏠', label: 'Dashboard',    href: '/pages/dashboard/index.html' },
    { icon: '👥', label: 'Alunos',       href: '/pages/alunos/index.html' },
    { icon: '📚', label: 'Turmas',       href: '/pages/turmas/index.html' },
    { icon: '📊', label: 'Relatórios',   href: '/pages/relatorios/index.html' },
  ],
  secretario: [
    { icon: '🏠', label: 'Dashboard',    href: '/pages/dashboard/index.html' },
    { icon: '👥', label: 'Alunos',       href: '/pages/alunos/index.html' },
    { icon: '🎓', label: 'Professores',  href: '/pages/professores/index.html' },
    { icon: '📚', label: 'Turmas',       href: '/pages/turmas/index.html' },
    { icon: '📋', label: 'Disciplinas',  href: '/pages/disciplinas/index.html' },
    { icon: '📄', label: 'Boletins',     href: '/pages/boletim/index.html' },
  ],
  professor: [
    { icon: '🏠', label: 'Dashboard',    href: '/pages/dashboard/index.html' },
    { icon: '📝', label: 'Notas',        href: '/pages/notas/index.html' },
    { icon: '📅', label: 'Frequência',   href: '/pages/frequencia/index.html' },
    { icon: '📊', label: 'Relatórios',   href: '/pages/relatorios/index.html' },
  ],
  aluno: [
    { icon: '🏠', label: 'Dashboard',    href: '/pages/dashboard/index.html' },
    { icon: '📝', label: 'Minhas Notas', href: '/pages/notas/index.html' },
    { icon: '📄', label: 'Boletim',      href: '/pages/boletim/index.html' },
  ],
  pai: [
    { icon: '🏠', label: 'Dashboard',    href: '/pages/dashboard/index.html' },
    { icon: '📝', label: 'Notas do Filho', href: '/pages/notas/index.html' },
    { icon: '📄', label: 'Boletim',        href: '/pages/boletim/index.html' },
  ],
};

// === GERAR SIDEBAR ===
function gerarSidebar(papel) {
  const itens = MENU_ITENS[papel] || MENU_ITENS['gestor'];
  const paginaAtual = window.location.pathname;

  const html = `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <span class="sidebar-logo">🏫</span>
        <span class="sidebar-titulo">Gestão Escolar</span>
        <button class="sidebar-fechar" id="btnFecharSidebar">✕</button>
      </div>
      <nav class="sidebar-nav">
        ${itens.map(item => `
          <a href="${item.href}"
             class="sidebar-item ${paginaAtual.includes(item.href.replace('/pages','').replace('/index.html','')) && item.href !== '/pages/dashboard/index.html' ? 'ativo' : paginaAtual.includes('dashboard') && item.href.includes('dashboard') ? 'ativo' : ''}"
          >
            <span class="sidebar-item-icon">${item.icon}</span>
            <span class="sidebar-item-label">${item.label}</span>
          </a>
        `).join('')}
      </nav>
      <div class="sidebar-footer">
        <button class="sidebar-sair" id="btnSairSidebar">
          <span>🚪</span> Sair
        </button>
      </div>
    </aside>
    <div class="sidebar-overlay" id="sidebarOverlay"></div>
  `;

  document.getElementById('sidebar-container').innerHTML = html;

  // Fechar sidebar no mobile
  document.getElementById('btnFecharSidebar').addEventListener('click', fecharSidebar);
  document.getElementById('sidebarOverlay').addEventListener('click', fecharSidebar);

  // Botão sair
  document.getElementById('btnSairSidebar').addEventListener('click', async () => {
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
      window.location.href = '/index.html';
    }
  });
}

// === ABRIR / FECHAR SIDEBAR (MOBILE) ===
function abrirSidebar() {
  document.getElementById('sidebar').classList.add('aberta');
  document.getElementById('sidebarOverlay').classList.add('visivel');
}

function fecharSidebar() {
  document.getElementById('sidebar').classList.remove('aberta');
  document.getElementById('sidebarOverlay').classList.remove('visivel');
}