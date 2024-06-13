import React, { useState, useEffect } from 'react';
import ApiEvento from '../api/ApiEvento';
import ApiInstituicao from "../api/ApiInstituicao";
import { Table, Button, Form, Modal, Col, Row, Pagination } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import { toast } from 'react-toastify';
import ptBR from 'date-fns/locale/pt-BR';
registerLocale('ptBR', ptBR);

const Evento = () => {
    const [eventos, setEventos] = useState([]);
    const [id, setId] = useState(0);
    const [nome, setNome] = useState('');
    const [dataInicial, setDataInicial] = useState(new Date());
    const [dataFinal, setDataFinal] = useState('');
    const [idInstituicao, setIdInstituicao] = useState(0);
    const [modal, setModal] = useState(false);
    const [institutos, setInstitutos] = useState([]);

    const [paginaAtual, setPaginaAtual] = useState(1);
    const [itensPorPagina] = useState(5);
    const [totalItens, setTotalItens] = useState(0);

    useEffect(() => {
        console.log('Inicia Pagina Evento');
        buscarEventos();
        buscarInstitutos();
    }, []);

    useEffect(() => {
        buscarEventos();
    }, [paginaAtual]);

    const handlePaginaChange = (pagina) => {
        setPaginaAtual(pagina);
    };

    const buscarEventos = () => {
        ApiEvento.buscarEventos(itensPorPagina, paginaAtual - 1)
            .then(dados => {
                setEventos(dados.content);
                setTotalItens(dados.totalElements);
            })
    }

    const buscarInstitutos = () => {
        ApiInstituicao.buscarInstitutos(1000,0)
            .then(dados => { setInstitutos(dados.content) })
    }

    const apagarEvento = (id) => {
        ApiEvento.apagarEvento(id)
            .then(resposta => {
                if (resposta) {
                    buscarEventos();
                }
            });
        toast.success('Apagado registro: ' + id);
    }

    const findByid = (id) => {
        ApiEvento.findByid(id)
            .then(evento => {
                setId(evento.idEvento);
                setNome(evento.nome);
                setDataInicial(evento.dataInicial);
                setDataFinal(evento.dataFinal);
                setIdInstituicao(evento.instituicao.idInstituicao);
            });
        abrirModal();
    }

    const cadastrarEvento = (evento) => {
        ApiEvento.cadastrarEvento(evento)
            .then(resposta => {
                if (resposta.ok) {
                    buscarEventos();
                    fecharModal();
                    toast.success('Cadastrado com sucesso!');
                } else {
                    toast.error('Erro no cadastro! Tente mais tarde');
                    console.log(resposta);
                }
            });
    }

    const atualizaEvento = (instituicao) => {
        ApiEvento.atualizaEvento(id, instituicao)
            .then(resposta => {
                if (resposta.ok) {
                    buscarEventos();
                    fecharModal();
                    toast.success('Atualizado com sucesso!');
                } else {
                    toast.error('Erro na atualização! Tente mais tarde');
                    console.log(resposta);
                }
            });
    }

    const salvar = () => {
        const evento = {
            nome: nome,
            dataInicial: dataInicial,
            dataFinal: dataFinal,
            instituicaoId: idInstituicao
        }

        if (id === 0) {
            cadastrarEvento(evento);
        } else {
            atualizaEvento(evento);
        }
    }

    const fecharModal = () => { setModal(false) }

    const abrirModal = () => { setModal(true) }

    const atualizaDataInicial = (date) => { setDataInicial(date) }

    const atualizaDataFinal = (date) => { setDataFinal(date) }

    const atualizaInstituicao = (e) => { setIdInstituicao(e.target.value) }

    const formatarData = (dataString) => {
        const data = new Date(dataString.replace('Z', '') + "T00:00:00");
        const ano = data.getFullYear();
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const dia = String(data.getDate()).padStart(2, '0');
        return `${dia}/${mes}/${ano}`;
    };

    const clear = () => {
        setId(0);
        setNome('');
        setDataInicial(null);
        setDataFinal(null);
        setIdInstituicao(0);
        abrirModal();
    }

    const formEvento = () => {
        return (
            <div>

                <Modal show={modal} onHide={fecharModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Inserir evento</Modal.Title>
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
                                <Form.Label column sm="3">Nome evento</Form.Label>
                                <Col sm="8">
                                    <Form.Control required type="text" placeholder="Digite o nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" >
                                <Form.Label column sm="3">Data Inicial</Form.Label>
                                <Col sm="8">
                                    <DatePicker showIcon locale="ptBR"
                                        placeholderText="Informe a data incial"
                                        selected={dataInicial}
                                        onChange={atualizaDataInicial} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" >
                                <Form.Label column sm="3">Data Final</Form.Label>
                                <Col sm="8">
                                    <DatePicker showIcon locale="ptBR"
                                        placeholderText="Informe a data final"
                                        selected={dataFinal}
                                        onChange={atualizaDataFinal} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3">
                                <Form.Label column sm="3">Instituições</Form.Label>
                                <Col sm="8">
                                    <Form.Select value={idInstituicao} onChange={atualizaInstituicao}>
                                        <option value={-1}>Selecione uma instituição</option>
                                        {
                                            institutos.map(instituicao => (
                                                <option key={instituicao.idInstituicao} value={instituicao.idInstituicao}>{instituicao.nome}</option>
                                            ))
                                        }
                                    </Form.Select>
                                </Col>
                            </Form.Group>

                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={fecharModal}>Close</Button>
                        <Button variant="success" onClick={salvar}> Salvar </Button>
                    </Modal.Footer>
                </Modal>

                <Button variant="success" onClick={clear}> Novo </Button>
            </div >
        );
    }


  
    const renderTabela = () => {
        return <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Data Inicial</th>
                        <th>Data Final</th>
                        <th>Instituição</th>
                        <th>Ativo</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {eventos.map((evento) => (
                        <tr key={evento.idEvento}>
                            <td>{evento.nome}</td>
                            <td>{formatarData(evento.dataInicial)}</td>
                            <td>{formatarData(evento.dataFinal)}</td>
                            <td>{evento.instituicao.nome}</td>
                            <td>
                                <div className="circle-container">
                                    <div className={`circle ${evento.ativo ? 'green' : 'red'}`}></div>
                                </div>
                            </td>
                            <td>
                                <Button variant="primary" onClick={() => findByid(evento.idEvento)}>
                                    Editar
                                </Button>
                                <Button variant="danger" onClick={() => apagarEvento(evento.idEvento)}>
                                    Excluir
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {renderPaginacao()}
        </div>
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

    return (
        <div>
            <h1>Eventos</h1>            
            {formEvento()}
            {renderTabela()}
        </div>
    );
}

export default Evento;
