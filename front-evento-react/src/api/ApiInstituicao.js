const url = process.env.REACT_APP_API_BASEURL;

const buscarInstitutos = async (limit, offset) => {
  try {
    let request = `${url}/v1/instituicao?limit=${limit}&offset=${offset}`;
    const resposta = await fetch(request);

    if (!resposta.ok) {
      let err = new Error("HTTP status code: " + resposta.status);
      err.resposta = resposta;
      err.status = resposta.status;
      throw err;
    }

    return await resposta.json();
  } catch (error) {
    console.error('Erro ao buscar instituições:', error);
  }
}

const apagarInstituto = async (id) => {
  try {
    let request = `${url}/v1/instituicao/${id}`;
    const resposta = await fetch(request, { method: 'DELETE' });

    if (!resposta.ok) {
      let err = new Error("HTTP status code: " + resposta.status);
      err.resposta = resposta;
      err.status = resposta.status;
      throw err;
    }

    return resposta;
  } catch (error) {
    console.error('Erro ao apagar instituição:', error);
  }
}

const findById = async (id) => {
  try {
    let request = `${url}/v1/instituicao/${id}`;
    const resposta = await fetch(request, { method: 'GET' });

    if (!resposta.ok) {
      let err = new Error("HTTP status code: " + resposta.status);
      err.resposta = resposta;
      err.status = resposta.status;
      throw err;
    }

    return await resposta.json();
  } catch (error) {
    console.error('Erro ao buscar instituição por ID:', error);
    throw error;
  }
}

const atualizaInstituicao = async (id, instituicao) => {
  try {
    let request = `${url}/v1/instituicao/${id}`;
    const resposta = await fetch(request, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(instituicao)
    });

    if (!resposta.ok) {
      let err = new Error("HTTP status code: " + resposta.status);
      err.resposta = resposta;
      err.status = resposta.status;
      throw err;
    }

    return resposta;
  } catch (error) {
    console.error('Erro ao atualizar instituição:', error);
  }
}

const cadastrarInstituicao = async (instituicao) => {
  try {
    let request = `${url}/v1/instituicao/`;
    const resposta = await fetch(request, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(instituicao)
    });

    if (!resposta.ok) {
      let err = new Error("HTTP status code: " + resposta.status);
      err.resposta = resposta;
      err.status = resposta.status;
      throw err;
    }

    return resposta;
  } catch (error) {
    console.error('Erro ao cadastrar instituição:', error);
  }
}

const ApiInstituicao = {
  buscarInstitutos,
  apagarInstituto,
  findById,
  atualizaInstituicao,
  cadastrarInstituicao
};

export default ApiInstituicao;

