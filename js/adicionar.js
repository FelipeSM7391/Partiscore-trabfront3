import './components.js';
import { API_URL, headers } from './config.js';

const form = document.querySelector('#form-partitura');
const mensagem = document.querySelector('#mensagem');

form.addEventListener('submit', criarPartitura);

async function criarPartitura(e) {
  e.preventDefault();

  const partitura = {
    titulo: form.titulo.value,
    compositor: form.compositor.value,
    instrumento: form.instrumento.value,
    dificuldade: form.dificuldade.value,
    link_pdf: form.link_pdf.value || null,
  };

  try {
    const resposta = await fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(partitura),
    });
    if (!resposta.ok) throw new Error('Status ' + resposta.status);

    mensagem.innerHTML = '<p class="aviso ok">Partitura adicionada com sucesso!</p>';
    form.reset();
  } catch (error) {
    console.error('Erro ao adicionar:', error);
    mensagem.innerHTML = '<p class="aviso erro">Erro ao adicionar a partitura.</p>';
  }
}
