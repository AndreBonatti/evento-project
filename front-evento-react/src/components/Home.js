import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';


const Home = () => {


    return (
        <div className="outlook-theme">
            <Container>
                <Row className="mt-5">
                    <Col>
                        <h1>Bem-vindo ao Sistema SPA</h1>
                        <p>Este é um sistema de demonstração, construído com React e React-Bootstrap.</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;