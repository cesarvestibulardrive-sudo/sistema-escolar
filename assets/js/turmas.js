/*
TITULO: CRUD DE TURMAS
O QUE FAZ: Lista, cria, edita e exclui turmas via Supabase
DATA: 2026-06-24
RESULTADO ESPERADO: Tabela de turmas com modal de criação/edição funcional
*/

// === INICIALIZAÇÃO ===
window.addEventListener('DOMContentLoaded', async () => {

  // Verifica sessão
  const { data: { session } } = await db.auth.getSession();
  if (!session) { window.location.href = '../../index.html'; return; }

  // Carrega sidebar
  const { data: perfil } = await db.from('perfis').select('nome, papel').eq('id', session.user.id).single();
  gerarSidebar(perfil?.papel || 'gestor');

  // Botão menu mobile
  const btnMenu = document.getElementById('btnMenuMobile');
  if (btnMenu) btnMenu.addEventListener('click', abrirSidebar);

  // Carrega turmas
  await carregarTurmas();

  // Eventos do modal
  document.getElementById('btnNovaTurma').addEventListener('click', abrirModalNovo);
  document.getElementById('btnFecharModal').addEventListener('click', fecharModal);
  document.getElementById('btnCancelar').addEventListener('click', fecharModal);
  document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target.id === 'modalOverlay') fecharModal();
  });
  document.getElementById('formTurma').addEventListener('submit', salvarTurma);

});

// === CARREGAR TURMAS ===
async function carregarTurmas() {
  const corpo = document.getElementById('corpoTabelaTurmas');
  corpo.innerHTML = '<tr><td colspan="6" class="tabela-loading">Carregando...</td></tr>';

  const { data: turmas, error } = await db
    .from('turmas')
    .select('*')
    .order('nome');

  if (error || !turmas?.length) {
    corpo.innerHTML = '<tr><td colspan="6" class="tabela-loading">Nenhuma turma cadastrada.</td></tr>';
    return;
  }

  const turnos = { manha: 'Manhã', tarde: 'Tarde', noite: 'Noite', integral: 'Integral' };

  corpo.innerHTML = turmas.map(t => `
    <tr>
      <td><strong>${t.nome}</strong></td>
      <td>${t.serie}</td>
      <td>${turnos[t.turno] || t.turno}</td>
      <td>${t.ano_letivo}</td>
      <td><span class="badge ${t.ativo ? 'badge-ativo' : 'badge-inativo'}">${t.ativo ? 'Ativo' : 'Inativo'}</span></td>
      <td>
        <div class="acoes">
          <button class="btn-editar" onclick="abrirModalEditar('${t.id}')">✏️ Editar</button>
          <button class="btn-excluir" onclick="excluirTurma('${t.id}', '${t.nome}')">🗑️ Excluir</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// === ABRIR MODAL NOVO ===
function abrirModalNovo() {
  document.getElementById('modalTitulo').textContent = 'Nova Turma';
  document.getElementById('turmaId').value = '';
  document.getElementById('formTurma').reset();
  document.getElementById('turmaAno').value = new Date().getFullYear();
  document.getElementById('modalOverlay').classList.add('aberto');
}

// === ABRIR MODAL EDITAR ===
async function abrirModalEditar(id) {
  const { data: turma } = await db.from('turmas').select('*').eq('id', id).single();
  if (!turma) return;

  document.getElementById('modalTitulo').textContent = 'Editar Turma';
  document.getElementById('turmaId').value = turma.id;
  document.getElementById('turmaNome').value = turma.nome;
  document.getElementById('turmaSerie').value = turma.serie;
  document.getElementById('turmaTurno').value = turma.turno;
  document.getElementById('turmaAno').value = turma.ano_letivo;
  document.getElementById('modalOverlay').classList.add('aberto');
}

// === FECHAR MODAL ===
function fecharModal() {
  document.getElementById('modalOverlay').classList.remove('aberto');
}

// === SALVAR TURMA ===
async function salvarTurma(e) {
  e.preventDefault();

  const id   = document.getElementById('turmaId').value;
  const dados = {
    nome:       document.getElementById('turmaNome').value.trim(),
    serie:      document.getElementById('turmaSerie').value.trim(),
    turno:      document.getElementById('turmaTurno').value,
    ano_letivo: parseInt(document.getElementById('turmaAno').value),
    ativo:      true
  };

  const btn = document.getElementById('btnSalvarTurma');
  btn.disabled = true;
  btn.textContent = 'Salvando...';

  let error;

  if (id) {
    ({ error } = await db.from('turmas').update(dados).eq('id', id));
  } else {
    ({ error } = await db.from('turmas').insert(dados));
  }

  btn.disabled = false;
  btn.textContent = 'Salvar';

  if (error) {
    App.erro('Erro ao salvar turma. Verifique os dados.');
    return;
  }

  App.sucesso(id ? 'Turma atualizada!' : 'Turma criada!');
  fecharModal();
  await carregarTurmas();
}

// === EXCLUIR TURMA ===
async function excluirTurma(id, nome) {
  const confirmacao = await Swal.fire({
    icon: 'warning',
    title: `Excluir "${nome}"?`,
    text: 'Esta ação não pode ser desfeita.',
    showCancelButton: true,
    confirmButtonText: 'Sim, excluir',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#dc2626'
  });

  if (!confirmacao.isConfirmed) return;

  const { error } = await db.from('turmas').delete().eq('id', id);

  if (error) {
    App.erro('Erro ao excluir turma.');
    return;
  }

  App.sucesso('Turma excluída!');
  await carregarTurmas();
}