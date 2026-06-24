/*
TITULO: APP PRINCIPAL
O QUE FAZ: Inicializa o sistema, registra o Service Worker e configura o Supabase
DATA: 2026-06-23
RESULTADO ESPERADO: Sistema inicializado com PWA e conexão com Supabase prontos
*/

// === CONFIGURAÇÃO DO SUPABASE ===
const SUPABASE_URL = 'COLE_SUA_URL_AQUI';
const SUPABASE_KEY = 'COLE_SUA_CHAVE_AQUI';

// === REGISTRO DO SERVICE WORKER (PWA) ===
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('✅ Service Worker registrado:', reg.scope))
      .catch(err => console.error('❌ Erro no Service Worker:', err));
  });
}

// === UTILITÁRIOS GLOBAIS ===
const App = {

  // Formata data para pt-BR
  formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR');
  },

  // Exibe mensagem de sucesso
  sucesso(mensagem) {
    Swal.fire({ icon: 'success', title: mensagem, timer: 2000, showConfirmButton: false });
  },

  // Exibe mensagem de erro
  erro(mensagem) {
    Swal.fire({ icon: 'error', title: 'Erro', text: mensagem });
  },

  // Retorna classe CSS pela situação do aluno
  classeSituacao(nota, minAprovacao, minRecuperacao) {
    if (nota >= minAprovacao) return 'nota-aprovado';
    if (nota >= minRecuperacao) return 'nota-recuperacao';
    return 'nota-reprovado';
  }

};