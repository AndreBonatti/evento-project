const url = process.env.REACT_APP_API_BASEURL;

const buscarEventos = async (limit, offset) => {
  try {
    let request = `${url}/v1/evento?limit=${limit}&offset=${offset}`;
    const resposta = await fetch(request);

    if (!resposta.ok) {
      let err = new Error("HTTP status code: " + resposta.status)
      err.resposta = resposta
      err.status = resposta.status
      throw err;
    }

    return resposta.json();
  } catch (erro) {
    console.error('Erro ao buscar eventos:', erro);
    throw erro;
  }
};

const cadastrarEvento = (evento) => {
  let request = `${url}/v1/evento/`;
  return fetch(request, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(evento)
  }).then(resposta => {
    if (!resposta.ok) {
      let err = new Error("HTTP status code: " + resposta.status)
      err.resposta = resposta
      err.status = resposta.status
      throw err;
    }
    return resposta;
  });
}

const buscarInstitutos = async () => {
  try {
    let request = `${url}/v1/instituicao?limit=100&offset=0`;
    const resposta = await fetch(request);

    if (!resposta.ok) {
      let err = new Error("HTTP status code: " + resposta.status)
      err.resposta = resposta
      err.status = resposta.status
      throw err;
    }

    return resposta.json();
  } catch (erro) {
    console.error('Erro ao buscar eventos:', erro);
    throw erro;
  }
};

const apagarEvento = (id) => {
  let request = `${url}/v1/evento/${id}`;
  return fetch(request, { method: 'DELETE' })
    .then(resposta => {
      if (resposta.ok) {
        return true;
      }
      return false;
    });
}

const findByid = async (id) => {

  try {
    let request = `${url}/v1/evento/${id}`;
    const resposta = await fetch(request, { method: 'GET' });

    if (!resposta.ok) {
      let err = new Error("HTTP status code: " + resposta.status)
      err.resposta = resposta
      err.status = resposta.status
      throw err;
    }

    return resposta.json();
  } catch (erro) {
    console.error('Erro ao buscar eventos:', erro);
    throw erro;
  }
}

const atualizaEvento = (id, instituicao) => {
  let request = `${url}/v1/evento/${id}`;
  return fetch(request,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(instituicao)
    })
    .then(resposta => {
      return resposta;
    });
}


const ApiEvento = {
  buscarEventos,
  cadastrarEvento,
  buscarInstitutos,
  apagarEvento,
  findByid,
  atualizaEvento
}

export default ApiEvento;
