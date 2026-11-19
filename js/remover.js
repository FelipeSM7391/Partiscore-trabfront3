import './components.js';
import { API_URL, headers } from './config.js';

const lista = document.querySelector('#lista');
const mensagem = document.querySelector('#mensagem');

// Lista as partituras com um botão Remover em cada (GET)
async function listarPartituras() {
  const resposta = await fetch(API_URL + '?order=id', { headers });
  const partituras = await resposta.json();

  lista.innerHTML = '';
  partituras.forEach((p) => {
    lista.innerHTML += `
      <article class="partitura-card">
        <span class="selo" data-nivel="${p.dificuldade}">${p.dificuldade}</span>
        <h3>${p.titulo}</h3>
        <p class="compositor">${p.compositor}</p>
        <p class="info">${p.instrumento}</p>
        <div class="acoes">
          <button class="btn pequeno perigo" data-id="${p.id}">Remover</button>
        </div>
      </article>`;
  });
}

// Um único "ouvinte" para todos os botões Remover
lista.addEventListener('click', (e) => {
  if (e.target.matches('button[data-id]')) {
    removerPartitura(e.target.dataset.id);
  }
});

// Apaga a partitura escolhida (DELETE)
async function removerPartitura(id) {
  if (!confirm('Deseja remover esta partitura?')) return;

  try {
    const resposta = await fetch(API_URL + '?id=eq.' + id, { method: 'DELETE', headers });
    if (!resposta.ok) throw new Error('Status ' + resposta.status);

    mensagem.innerHTML = '<p class="aviso ok">Partitura removida com sucesso!</p>';
    listarPartituras();
  } catch (error) {
    console.error('Erro ao remover:', error);
    mensagem.innerHTML = '<p class="aviso erro">Erro ao remover a partitura.</p>';
  }
}

listarPartituras();
