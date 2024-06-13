import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal, Col, Row, Pagination } from "react-bootstrap";
import { toast } from 'react-toastify';
import ApiInstituicao from "../api/ApiInstituicao";

const Institutos = () => {
    const [institutos, setInstitutos] = useState([]);
    const [id, setId] = useState(0);
    const [tipo, setTipo] = useState('');
    const [nome, setNome] = useState('');
    const [modal, setModal] = useState(false);

    const [paginaAtual, setPaginaAtual] = useState(1);
    const [itensPorPagina] = useState(5);
    const [totalItens, setTotalItens] = useState(0);

    useEffect(() => {
        console.log('Inicia Pagina Instituicao');
        buscarInstitutos();
    }, []);

    useEffect(() => {
        buscarInstitutos();
    }, [paginaAtual]);

    const handlePaginaChange = (pagina) => {
        setPaginaAtual(pagina);
    };

    const buscarInstitutos = () => {
        ApiInstituicao.buscarInstitutos(itensPorPagina, paginaAtual - 1)
            .then(dados => {
                setInstitutos(dados.content);
                setTotalItens(dados.totalElements);
            });
    }

    const apagarInstituto = (id) => {
        ApiInstituicao.apagarInstituto(id)
            .then(resposta => {
                if (resposta.ok) {
                    buscarInstitutos();
                }
            });
    }

    const findByid = (id) => {
        ApiInstituicao.findById(id)
            .then(instituicao => {
                setId(instituicao.idInstituicao);
                setNome(instituicao.nome);
                setTipo(instituicao.tipo);
                abrirModal();
            });
    }

    const atualizaInstituicao = (instituicao) => {
        ApiInstituicao.atualizaInstituicao(id, instituicao)
            .then(resposta => {
                if (resposta.ok) {
                    buscarInstitutos();
                    fecharModal();
                    toast.success('Atualizado com sucesso!');
                } else {
                    toast.error('Erro na atualização! Tente mais tarde');
                    console.log(resposta);
                }
            });
    }

    const cadastrarInstituicao = (instituicao) => {
        ApiInstituicao.cadastrarInstituicao(instituicao)
            .then(resposta => {
                if (resposta.ok) {
                    buscarInstitutos();
                    fecharModal();
                    toast.success('Cadastrado com sucesso!');
                } else {
                    toast.error('Erro no cadastro! Tente mais tarde');
                    console.log(resposta);
                }
            });
    }

    const salvar = () => {
        const instituicao = {
            nome: nome,
            tipo: tipo
        }

        if (id === 0) {
            cadastrarInstituicao(instituicao);
        } else {
            atualizaInstituicao(instituicao);
        }
    }

    const clear = () => {
        setId(0);
        setNome('');
        setTipo('');
        abrirModal();
    }

    const atualizaNome = (e) => { setNome(e.target.value); }

    const atualizaTipo = (e) => { setTipo(e.target.value); }

    const fecharModal = () => { setModal(false); }

    const abrirModal = () => { setModal(true); }

    const renderTabela = () => {
        return (<div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Tipo</th>
                        <th>Opcoes</th>
                    </tr>
                </thead>
                <tbody>
                    {institutos && institutos.length > 0 ? (
                        institutos.map((instituto) =>
                            <tr key={instituto.idInstituicao}>
                                <td>{instituto.nome}</td>
                                <td>{instituto.tipo}</td>
                                <td>
                                    <Button variant="primary" onClick={() => findByid(instituto.idInstituicao)}>Editar</Button>
                                    <Button variant="danger" onClick={() => apagarInstituto(instituto.idInstituicao)}>Excluir</Button>
                                </td>
                            </tr>
                        )) : (
                        <tr>
                            <td colSpan="3">Nenhuma instituição encontrada</td>
                        </tr>
                    )
                    }
                </tbody>
            </Table>
            {renderPaginacao()}
        </div>
        );
    }

    const renderPaginacao = () => {
        const paginas = Math.ceil(totalItens / itensPorPagina);

        return (
            <Pagination>
                {Array.from({ length: paginas }, (_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === paginaAtual}
                        onClick={() => handlePaginaChange(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        );
    }

    const formInstituicao = () => {
        return (
            <div>
                <Modal show={modal} onHide={fecharModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Inserir instituição</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="3">ID</Form.Label>
                                <Col sm="8">
                                    <Form.Control type="text" value={id} readOnly={true} disabled={true} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" >
                                <Form.Label column sm="3">Nome instituição</Form.Label>
                                <Col sm="8">
                                    <Form.Control required type="text" placeholder="Digite o nome" value={nome} onChange={atualizaNome} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="3">Tipo de instituição</Form.Label>
                                <Col sm="8">
                                    <Form.Select value={tipo} onChange={atualizaTipo}>
                                        <option value="CONFEDERACAO">Conferacao</option>
                                        <option value="SINGULAR">Singular</option>
                                        <option value="CENTRAL">Central</option>
                                        <option value="COOPERATIVA">Cooperativa</option>
                                    </Form.Select>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={fecharModal}>Close</Button>
                        <Button variant="success" onClick={salvar}>Salvar</Button>
                    </Modal.Footer>
                </Modal>

                <Button variant="success" onClick={clear}>Novo</Button>
            </div>
        );
    }

    return (
        <div>
            <h1>Instituicao</h1>
            {formInstituicao()}
            {renderTabela()}
        </div>
    );
}

export default Institutos;