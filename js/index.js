import './components.js';
import { API_URL, headers } from './config.js';

const lista = document.querySelector('#lista');
const mensagem = document.querySelector('#mensagem');

async function listarPartituras() {
  try {
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
            ${p.link_pdf ? `<a class="btn pequeno" href="${p.link_pdf}" target="_blank">Abrir partitura</a>` : ''}
          </div>
        </article>`;
    });
  } catch (error) {
    console.error('Erro ao listar:', error);
    mensagem.innerHTML = '<p class="aviso erro">Erro ao carregar as partituras.</p>';
  }
}

listarPartituras();
