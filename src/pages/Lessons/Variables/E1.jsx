import React from "react"
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { lessons } from "../../../lessons.js"

const E1 = () => {

    const { id } = useParams()

    const sortedName = []

    lessons?.forEach((lesson, i) => {
        if (lesson.id == id) {
            sortedName.push(lesson)
        }
    })

    console.log(sortedName && sortedName)

    const { data } = useSelector(state => state.user)


    const [iden, setId] = React.useState()
    const [s, setS] = React.useState()

    const [isTrue, setIsTrue] = React.useState('do')

    const check = () => {
        if (iden == 'carName' && (s == 'volvo' || s == 'Volvo')) {
            setIsTrue('yes')
        } else {
            setIsTrue('no')
        }
    }

    return (
        <Container fluid>
            <Row>
                <Col md={2} className="tutorial-left-panel" style={{
                    backgroundColor: '#001845',
                    paddingTop: '100px'
                }}>
                    <Row>
                        <Row>
                            <Col className="col-6">
                                <img
                                    src={
                                        data?.avatarUrl ? `http://localhost:5050${data?.avatarUrl}` :
                                            "https://www.citypng.com/public/uploads/small/11639594360nclmllzpmer2dvmrgsojcin90qmnuloytwrcohikyurvuyfzvhxeeaveigoiajks5w2nytyfpix678beyh4ykhgvmhkv3r3yj5hi.png"}
                                    For
                                    className="img-fluid" style={{
                                        width: '120px',
                                        height: '120px',
                                        margin: '6px auto',

                                    }} alt="sdsdv" />
                            </Col>
                            <Col className="col-6 d-flex row align-items-center">
                                <h5 className="page-heading" style={{ margin: '6px auto 24px auto' }}>{data?.fullname}</h5>
                            </Col>
                        </Row>
                    </Row>
                    <hr style={{ color: 'white' }} />
                    <Row>
                        <Col>
                            <Button className="d-block exercise-link-btn" href={`http://localhost:3000/lessons/${id}/${sortedName[0].color}/1`}>Тапсырма 1</Button>
                            <Button className="d-block exercise-link-btn" href={`http://localhost:3000/lessons/${id}/${sortedName[0].color}/2`}>Тапсырма 2</Button>
                            <Button className="d-block exercise-link-btn" href={`http://localhost:3000/lessons/${id}/${sortedName[0].color}/3`}>Тапсырма 3</Button>
                            <Button className="d-block exercise-link-btn" href={`http://localhost:3000/lessons/${id}/${sortedName[0].color}/4`}>Тапсырма 4</Button>
                            <Button className="d-block exercise-link-btn" href={`http://localhost:3000/lessons/${id}/${sortedName[0].color}/5`}>Тапсырма 5</Button>
                        </Col>
                    </Row>
                    <br />
                    <br />
                </Col>

                <Col md={2}></Col>
                <Col md={'10'} className="profile-main-panel" style={{
                    backgroundColor: '#C1D9F2',
                    height: '100vh'
                }}>
                    <h2 style={{ color: '#001845' }}>{sortedName[0].name + ". " + 'Тапсырма: 1'}</h2>
                    <hr style={{ color: '#001845' }} />
                    <Col md={8}>
                        {/* //////////////////////МЫНА ЖЕРДЕ ТАПСЫРМА//// */}
                        {
                            isTrue == 'yes' ?
                                <div className="d-flex row align-items-center" style={{
                                    backgroundColor: '#D9EEE1',
                                    color: '#001845',
                                    padding: '24px',
                                    height: '580px'
                                }}>
                                    <h2 style={{ color: '#04AA6D' }}>
                                        Жауап дұрыс!
                                    </h2>
                                </div>
                                : isTrue == 'no' ?
                                    <div className="d-flex row align-items-center" style={{
                                        backgroundColor: '#FFC0C7',
                                        color: '#B94A48',
                                        padding: '24px',
                                        height: '580px'
                                    }}>
                                        <div>
                                            <h2 style={{ color: '#B94A48' }}>
                                                Жауап қате!
                                            </h2>
                                            <a className="uncorrect-answer-a" onClick={() => { setIsTrue('do') }}>қайтадан орындау</a>
                                        </div>
                                    </div>
                                    : isTrue == 'do' &&
                                    <>
                                        <div  style={{
                                            backgroundColor: 'white',
                                            color: '#001845',
                                            padding: '24px',
                                            height: '580px'
                                        }}>
                                            <Row >
                                                <Col className="col-12">
                                                    <p style={{ color: '#001845', fontSize: '18px' }}><code>carName</code>  деп аталатын айнымалы мәнді жасаңыз және оған <code>volvo</code>  мәнін тағайындаңыз.</p>
                                                </Col>
                                                <Col className="col-12">
                                                    <div className="" style={{
                                                        backgroundColor: '#013369',
                                                        color: '#001845',
                                                        padding: '24px'
                                                    }}>
                                                        <Row>
                                                            <Col className="col-auto d-flex column justify-content-end">
                                                                <code>var</code>&nbsp;&nbsp;&nbsp;&nbsp;
                                                                <input type="text"
                                                                    onChange={(event) => {
                                                                        setId(event.target.value)
                                                                    }}
                                                                    className="identificator-input" style={{ width: '100px' }} />
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                <div style={{ color: 'white', fontSize: '18px', fontWeight: '600' }}>=</div>
                                                            </Col>
                                                            <Col className="col-auto d-flex column justify-content-start">
                                                                <div style={{ color: '#00B000', fontSize: '18px', fontWeight: '600' }}>"</div>
                                                                <input type="text"
                                                                    onChange={(event) => {
                                                                        setS(event.target.value)
                                                                    }}
                                                                    className="string-input" style={{ width: '100px' }} />
                                                                <div style={{ color: '#00B000', fontSize: '18px', fontWeight: '600' }}>"</div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Col>
                                            </Row>


                                        </div>
                                        <Button className="signup-btn" style={{ margin: '20px 0px' }} onClick={check}>Жауапты тексеру</Button>
                                    </>
                        }

                        {/* ///////////////////////////////////////////// */}
                    </Col>
                </Col>
            </Row>
        </Container >)
}

export default E1