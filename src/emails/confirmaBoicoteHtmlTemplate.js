require('dotenv').config();
// TODO - COLOCAR ENDEREÇO REACT?
function html(boicote, autor) {
  const body = `<p>Olá <b>${autor.nome}</b>. Por favor, confirme a criação do boicote "<b>${boicote.titulo}</b>" criado no <b>Boicote.App</b></p>
  <p>É só clicar <a href="${process.env.APP_FRONTEND_URL}/boicotes/confirmar/${boicote.id}/${boicote.token}">neste link</a>,
  ou acessar este endereço pelo seu navegador: <br/>${process.env.APP_FRONTEND_URL}/boicotes/confirmar/${boicote.id}/${boicote.token}</p>
  <p>Obrigado por usar o <b><a href="${process.env.APP_FRONTEND_URL}">Boicote.App</a></b></p>
  <small>Consumir é um ato político.</small>
  `;
  return body;
}

module.exports = html;
