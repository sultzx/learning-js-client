import React from "react"
import { Container, Row, Col, Button, Card, Form, ProgressBar } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { lessons } from "../../../lessons.js"
import { fetchGetScore, fetchSetScore } from "../../../redux/slices/user.js"
import rb from '../../../images/rb.png'
import gb from '../../../images/gb.png'
import r from '../../../images/r.png'
import g from '../../../images/g.png'
const E5 = () => {

    const { id } = useParams()

    const sortedName = []

    const dispatch = useDispatch()

    lessons?.forEach((lesson, i) => {
        if (lesson.id == id) {
            sortedName.push(lesson)
        }
    })

    console.log(sortedName && sortedName)

    const { data, score } = useSelector(state => state.user)
    const [count, setCount] = React.useState(0)
    const [isTrue, setIsTrue] = React.useState('do')


    const [iden, setIden] = React.useState()
    const [comma, setComma] = React.useState()
    const [str, setStr] = React.useState()
    const [iden2, setIden2] = React.useState()
    const [numb, setNumb] = React.useState()


    React.useEffect(() => {
        dispatch(fetchGetScore(sortedName[0]?.color))
    }, [])

    const sortedScore = []



    sortedScore.push(score?.data?.fifth)



    console.log(sortedScore && sortedScore[0])

    const check = async () => {
        if ((iden == 'firstName') && (comma == ',') && (str == '"Doe",') && (iden2 == 'age') && (numb == 35)) {
            setIsTrue('yes')
            await dispatch(fetchSetScore({
                chapter: sortedName[0]?.color,
                lesson: 5,
                score: 1
            }))
            setInterval(() => {
                setCount(prevcount => prevcount + 1)
            }, 200);
        } else {
            setIsTrue('no')
            await dispatch(fetchSetScore({
                chapter: sortedName[0]?.color,
                lesson: 5,
                score: 0
            }))
            setInterval(() => {
                setCount(prevcount => prevcount + 1)
            }, 200);
        }
    }

    if (count && count >= 10) {
        window.location.reload()
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
                                        borderRadius: '50%',
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
                            <Button className="d-block exercise-link-btn" href={`http://localhost:3000/lessons/${id}/${sortedName[0].color}/1`}>
                                <img src={score?.data?.first == 1 ? g : score?.data?.first == 0 ? r : ''} width={'32px'} alt="" />&nbsp; Тапсырма 1</Button>
                            <Button className="d-block exercise-link-btn" href={`http://localhost:3000/lessons/${id}/${sortedName[0].color}/2`}>
                                <img src={score?.data?.second == 1 ? g : score?.data?.second == 0 ? r : ''} width={'32px'} alt="" />&nbsp; Тапсырма 2</Button>
                            <Button className="d-block exercise-link-btn" href={`http://localhost:3000/lessons/${id}/${sortedName[0].color}/3`}>
                                <img src={score?.data?.third == 1 ? g : score?.data?.third == 0 ? r : ''} width={'32px'} alt="" />&nbsp; Тапсырма 3</Button>
                            <Button className="d-block exercise-link-btn" href={`http://localhost:3000/lessons/${id}/${sortedName[0].color}/4`}>
                                <img src={score?.data?.fourth == 1 ? g : score?.data?.fourth == 0 ? r : ''} width={'32px'} alt="" />&nbsp; Тапсырма 4</Button>
                            <Button className="d-block exercise-link-btn" href={`http://localhost:3000/lessons/${id}/${sortedName[0].color}/5`}>
                                <img src={score?.data?.fifth == 1 ? g : score?.data?.fifth == 0 ? r : ''} width={'32px'} alt="" />&nbsp; Тапсырма 5</Button>
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
                    <h2 style={{ color: '#001845' }}>{sortedName[0].name + ". " + 'Тапсырма: 5 '}
                    <img src={sortedScore && sortedScore[0] == 1 ? gb : sortedScore[0] == 0 ? rb : ''} width={'50px'} alt="" />
                    </h2>
                    
                    <hr style={{ color: '#001845' }} />
                    <Col md={8}>
                    <ProgressBar striped variant="primary" style={{
                        border: '1 solid',
                        padding: '0',
                        margin: '0'
                    }} animated max={10} now={count} />
                        {/* //////////////////////МЫНА ЖЕРДЕ ТАПСЫРМА */}

                        {
                            isTrue == 'yes' ?
                                <div className="d-flex row align-items-center" style={{
                                    backgroundColor: '#D9EEE1',
                                    color: '#001845',
                                    padding: '24px',
                                    height: '420px'
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
                                        height: '420px'
                                    }}>
                                        <div>
                                            <h2 style={{ color: '#B94A48' }}>
                                                Жауап қате!
                                            </h2>
                                            <a className="uncorrect-answer-a" onClick={() => { setIsTrue('do') }}>қайтадан орындау</a>
                                        </div>
                                    </div>

                                    /////////////////////////////////////////////

                                    : isTrue == 'do' &&
                                    <>
                                        <div style={{
                                            backgroundColor: 'white',
                                            color: '#001845',
                                            padding: '24px',
                                            height: '420px'
                                        }}>
                                            <Row >
                                                <Col className="col-12">
                                                    <p style={{ color: '#001845', fontSize: '18px' }}>
                                                        Бір жолда келесі атаулары мен мәндері бар үш айнымалы мәнді жариялаңыз:
                                                        <br />
                                                        <br />firstName = "John"<br />
                                                        lastName = "Doe"<br />
                                                        age = 35
                                                        <hr style={{ color: 'transparent' }} />

                                                    </p>
                                                </Col>
                                                <Col className="col-12">
                                                    <div className="" style={{
                                                        backgroundColor: '#013369',
                                                        color: '#001845',
                                                        padding: '24px'
                                                    }}>
                                                        <Row>
                                                            <Col className="col-auto d-flex column justify-content-end">
                                                                <code>var</code>&nbsp;&nbsp;&nbsp;
                                                                <input type="text"
                                                                    onChange={(event) => {
                                                                        setIden(event.target.value)
                                                                    }}
                                                                    className="identificator-input" style={{ width: '100px' }} />
                                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                                <div style={{ color: 'white', fontSize: '18px', fontWeight: '600' }}>=&nbsp;&nbsp;"John"
                                                                    <input type="text"
                                                                        onChange={(event) => {
                                                                            setComma(event.target.value)
                                                                        }}
                                                                        className="identificator-input" style={{ width: '10px' }} />
                                                                    &nbsp;&nbsp; lastname &nbsp;&nbsp; = &nbsp;&nbsp;
                                                                    <input type="text"
                                                                        onChange={(event) => {
                                                                            setStr(event.target.value)
                                                                        }}
                                                                        className="string-input" style={{ width: '60px' }} />
                                                                    &nbsp;&nbsp;
                                                                    <input type="text"
                                                                        onChange={(event) => {
                                                                            setIden2(event.target.value)
                                                                        }}
                                                                        className="identificator-input" style={{ width: '40px' }} />
                                                                    &nbsp;&nbsp; = &nbsp;&nbsp;
                                                                    <input type="text"
                                                                        onChange={(event) => {
                                                                            setNumb(event.target.value)
                                                                        }}
                                                                        className="iden-input" style={{ width: '30px' }} />
                                                                    &nbsp;&nbsp;
                                                                </div>
                                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <Button className="signup-btn" style={{ margin: '20px 0px' }} onClick={check}>Жауапты тексеру</Button>
                                    </>
                        }
                        { /*  ///////////////////////////////////////////// */}
                    </Col>
                </Col>
            </Row>
        </Container >)
}

export default E5