import { Container, Row, Col, Card } from "react-bootstrap";

const Main = () => {

    return (<Container fluid style={{

        backgroundColor: 'white',
        height: '100vh'
    }}>
        <Container >
            <Row style={{
            height: '100vh'
        }}>
                <Col className="d-flex row align-items-center justify-content-end" md={6}>
                    <div>
                       <h2 style={{color: '#013369'}}>JS тілін үйрену қосымшасы</h2>
                    <p>Біздің веб-қосымшамызда Сіз JavaScript тілін онлайн үйренуге қол жеткізе аласыздар. Онлайн үйрену барысында өздеріңіздің үйренген ақпарттарыңыз бойынша орындалған тапсырмалардан жалпы рейтингіңіз құрылатын болады. 
                        Ең алдымен жеке профильге кіріп өзіңіздің жеке ақпаратыңызды толықтырыңыз</p> 
                        <button className="signup-btn" onClick={() => {
                            window.location.assign(`http://localhost:3000/profile`)
                        }} style={{
                            padding: '8px 24px'
                        }}>Жеке профильге өту</button>
                    </div>
                    
                </Col>
                <Col className="d-flex row align-items-center" md={6}>
                    <img src="https://img.freepik.com/free-vector/programmers-using-javascript-programming-language-computer-tiny-people-javascript-language-javascript-engine-js-web-development-concept_335657-2412.jpg?w=2000" className="flex-fill img-fluid" alt="" />
                </Col>
            </Row>
        </Container>

    </Container>)
}

export default Main