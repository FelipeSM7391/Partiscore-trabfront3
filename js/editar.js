import './components.js';
import { API_URL, headers } from './config.js';

const seletor = document.querySelector('#seletor');
const form = document.querySelector('#form-partitura');
const mensagem = document.querySelector('#mensagem');

async function carregarLista() {
  const resposta = await fetch(API_URL + '?select=id,titulo&order=titulo', { headers });
  const partituras = await resposta.json();

  seletor.innerHTML = '<option value="">Escolha uma partitura</option>';
  partituras.forEach((p) => {
    seletor.innerHTML += `<option value="${p.id}">${p.titulo}</option>`;
  });
}

seletor.addEventListener('change', async () => {
  if (!seletor.value) {
    form.hidden = true;
    return;
  }

  const resposta = await fetch(API_URL + '?id=eq.' + seletor.value, { headers });
  const [p] = await resposta.json();

  form.titulo.value = p.titulo;
  form.compositor.value = p.compositor;
  form.instrumento.value = p.instrumento;
  form.dificuldade.value = p.dificuldade;
  form.link_pdf.value = p.link_pdf || '';
  form.hidden = false;
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const alteracoes = {
    titulo: form.titulo.value,
    compositor: form.compositor.value,
    instrumento: form.instrumento.value,
    dificuldade: form.dificuldade.value,
    link_pdf: form.link_pdf.value || null,
  };

  try {
    const id = seletor.value;
    const resposta = await fetch(API_URL + '?id=eq.' + id, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(alteracoes),
    });
    if (!resposta.ok) throw new Error('Status ' + resposta.status);

    mensagem.innerHTML = '<p class="aviso ok">Partitura atualizada com sucesso!</p>';
    await carregarLista();
    seletor.value = id;
  } catch (error) {
    console.error('Erro ao editar:', error);
    mensagem.innerHTML = '<p class="aviso erro">Erro ao salvar as alterações.</p>';
  }
});

carregarLista();
