import React from "react"
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap"
import { useSelector } from "react-redux"
import { lessons } from '../../lessons.js'
import CodeEditor from '@uiw/react-textarea-code-editor';


const Variables = () => {

    const { data } = useSelector(state => state.user)

    const Exercise = () => {

        const [id, setId] = React.useState()
        const [s, setS] = React.useState()

        const [isTrue, setIsTrue] = React.useState('do')

        const check = () => {
            if (id == 'carName' && (s == 'volvo' || s == 'Volvo')) {
                setIsTrue('yes')
            } else {
                setIsTrue('no')
            }
        }

        return (
            <Card>
                <Card.Body className="lesson-exercise-card">
                    <h5>Жаттығулар арқылы өзіңізді сынаңыз</h5>
                    <br />
                    {
                        isTrue == 'yes' ? 
                        <div style={{
                            backgroundColor: '#D9EEE1',
                            color: '#001845',
                            padding: '24px'
                        }}>
                            <h3 style={{ color: '#04AA6D' }}>
                                Жауап дұрыс!
                            </h3>
                            <a href="http://localhost:3000/exercises">Барлық тапсырмаларға өту</a>
                          </div>
                        : isTrue == 'no' ? 
                        <div style={{
                            backgroundColor: '#FFC0C7',
                            color: '#B94A48',
                            padding: '24px'
                        }}>
                            <h3 style={{ color: '#B94A48' }}>
                                Жауап қате!
                            </h3>
                            <a className="uncorrect-answer-a" onClick={() => {setIsTrue('do')}}>қайтадан орындау</a>
                          </div>
                        : isTrue == 'do' &&
                    <div style={{
                        backgroundColor: 'white',
                        color: '#001845',
                        padding: '24px'
                    }}>
                        <h6 style={{ color: '#001845' }}>
                            Тапсырма:
                        </h6>
                        <p style={{ color: '#001845', fontSize: '18px' }}><code>carName</code>  деп аталатын айнымалы мәнді жасаңыз және оған <code>volvo</code>  мәнін тағайындаңыз.</p>
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
                        <br />
                        <Button className="signup-btn" onClick={check}>Жауапты тексеру</Button>
                    </div>

                    }
                </Card.Body>
            </Card>
        )
    }

    return (
        <Container fluid>
            <Row>
                <Col md={2} className="tutorial-left-panel" style={{
                    backgroundColor: '#001845',
                    // height: '100vh',
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
                        <Col md={12} className="text-center">
                            {
                                lessons?.map((lesson, i) =>
                                (<Button key={i + 1} className={`lesson-btn-${i + 1}`} onClick={() => {
                                    window.location.assign(`http://localhost:3000/tutorial/${lesson.color}`)
                                }}>
                                    {lesson.name}
                                </Button>))
                            }
                        </Col>
                    </Row>

                    <br />
                    <br />
                </Col>
                <Col md={2}></Col>
                <Col md={'10'} className="profile-main-panel" >
                    <h2 style={{ color: '#C1D9F2' }}>{lessons[0]?.name}</h2>
                    <hr style={{ color: 'white' }} />
                    <Col md={8}>
                        <h4 style={{ color: '#B7CFEA' }}>Айнымалылар дегеніміз не?</h4>
                        <p style={{
                            color: '#C1D9F2',
                            fontSize: '18px'
                        }}>Айнымалы мәлімдеме әрқашан қай жерде болса да,
                            код орындалмас бұрын өңделеді. <code>var</code>  арқылы жарияланған айнымалының ауқымы
                            оның ағымдағы орындалу мәтінмәні болып табылады. Бұл функциямен шектелуі мүмкін немесе функциядан тыс жарияланған айнымалылар үшін жаһандық болуы мүмкін.</p>
                        <p style={{
                            color: '#C1D9F2',
                            fontSize: '18px'
                        }}>JavaScript айнымалысын жариялаудың 4 жолы бар:</p>
                        <ol>
                            <li style={{ color: '#C1D9F2', fontSize: '18px' }}><code>var</code> пайдалану</li>
                            <li style={{ color: '#C1D9F2', fontSize: '18px' }}><code>let</code> пайдалану</li>
                            <li style={{ color: '#C1D9F2', fontSize: '18px' }}><code>const</code> пайдалану</li>
                            <li style={{ color: '#C1D9F2', fontSize: '18px' }}>Ештеңе пайдаланбау</li>
                        </ol>
                        <p style={{ color: '#C1D9F2', fontSize: '18px' }}>Айнымалылар – деректерді сақтауға арналған контейнерлер (деректер мәндерін сақтау). <br />
                            Бұл мысалда <code>x</code> , <code>y</code> және <code>z</code> - <code>let</code> кілт сөзімен жарияланған айнымалылар:</p>
                        <CodeEditor
                            value={`let x = 5;\nlet y = 6;\nlet z = x + y;`}
                            language="js"
                            disabled="true"
                            padding={15}
                            style={{
                                border: '1px solid #C1D9F2',
                                borderRadius: '4px',
                                fontSize: 18,
                                backgroundColor: "#001845",
                                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                            }}
                        />
                        <br />
                        <p style={{ color: '#C1D9F2', fontSize: '18px' }}>Бұл мысалда <code>x</code>, <code>y</code> және <code>z</code> хабарланбаған айнымалылар болып табылады:</p>
                        <CodeEditor
                            value={`x = 5;\ny = 6;\nz = x + y;`}
                            language="js"
                            disabled="true"
                            padding={15}
                            style={{
                                border: '1px solid #C1D9F2',
                                borderRadius: '4px',
                                fontSize: 18,
                                backgroundColor: "#001845",
                                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                            }}
                        />
                        <br />
                        <p style={{ color: '#C1D9F2', fontSize: '18px' }}>
                            Жалпы ережені алғыңыз келсе: әрқашан айнымалы мәндерді <code>const</code>  арқылы жариялаңыз.
                            Айнымалының мәні өзгеруі мүмкін деп ойласаңыз, <code>let</code>  пайдаланыңыз.
                            Бұл мысалда <code>price1</code>,  <code>price2</code> және <code>total</code> айнымалылар болып табылады:</p>
                        <CodeEditor
                            value={`const price1 = 5;\nconst price2 = 6;\nlet total = price1 + price2;`}
                            language="js"
                            disabled="true"
                            padding={15}
                            style={{
                                border: '1px solid #C1D9F2',
                                borderRadius: '4px',
                                fontSize: 18,
                                backgroundColor: "#001845",
                                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                            }}
                        />
                        <br />
                        <h4 style={{ color: '#B7CFEA' }}>JavaScript идентификаторлары</h4>
                        <p style={{ color: '#C1D9F2', fontSize: '18px' }}>
                            Барлық JavaScript айнымалылары бірегей атаулармен сәйкестендірілуі керек. <br /> Бұл бірегей атаулар идентификаторлар деп аталады. <br />
                            Идентификаторлар қысқа атаулар (мысалы, x және y) немесе одан да көп сипаттаушы атаулар (жас, сома, жалпы көлем) болуы мүмкін. <br /> <br />
                            Айнымалылар (бірегей идентификаторлар) үшін атауларды құрудың жалпы ережелері:</p>
                        <ul>
                            <li style={{ color: '#C1D9F2', fontSize: '18px' }}>Атауларда әріптер, сандар, астын сызу және доллар белгілері болуы мүмкін.</li>
                            <li style={{ color: '#C1D9F2', fontSize: '18px' }}>Атаулар әріптен басталуы керек.</li>
                            <li style={{ color: '#C1D9F2', fontSize: '18px' }}>Аттар да $ және _ әрпінен басталуы мүмкін (бірақ біз оны осы оқулықта қолданбаймыз).</li>
                            <li style={{ color: '#C1D9F2', fontSize: '18px' }}>Атаулар регистрді ескереді (y және Y әр түрлі айнымалылар).</li>
                            <li style={{ color: '#C1D9F2', fontSize: '18px' }}>Сақталған сөздерді (JavaScript кілт сөздері сияқты) атау ретінде пайдалану мүмкін емес.</li>
                        </ul>

                        <br />
                        <h4 style={{ color: '#B7CFEA' }}>Тағайындау операторы</h4>

                        <p style={{ color: '#C1D9F2', fontSize: '18px' }}>
                            JavaScript тіліндегі теңдік белгісі ( <code>=</code> )  «тең» операторы емес, «тағайындау» операторы болып табылады.
                            Бұл алгебрадан өзгеше. Алгебрада мыналар мағынасы жоқ:</p>
                        <CodeEditor
                            value={`x = x + 5;`}
                            language="js"
                            disabled="true"
                            padding={15}
                            style={{
                                border: '1px solid #C1D9F2',
                                borderRadius: '4px',
                                fontSize: 18,
                                backgroundColor: "#001845",
                                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                            }}
                        />
                        <br />
                        <p style={{ color: '#C1D9F2', fontSize: '18px' }}>
                            Дегенмен, JavaScript-те бұл өте мағынасы бар: ол x-ке x + 5 мәнін тағайындайды.
                            <br />
                            (Ол x + 5 мәнін есептеп, нәтижені х мәніне қояды. x мәні 5-ке артады.)</p>
                        <br />
                        <h4 style={{ color: '#B7CFEA' }}>JavaScript деректер түрлері</h4>

                        <p style={{ color: '#C1D9F2', fontSize: '18px' }}>
                            JavaScript айнымалылары 100 сияқты сандарды және "Джон До" сияқты мәтін мәндерін ұстай алады.
                            <br />
                            Бағдарламалауда мәтіндік мәндер мәтіндік жолдар деп аталады.
                            <br />
                            JavaScript деректердің көптеген түрлерін өңдей алады, бірақ әзірге сандар мен жолдар туралы ойланыңыз.
                            <br />
                            Жолдар қос немесе жалғыз тырнақшаның ішінде жазылады. Сандар тырнақшасыз жазылады.
                            <br />
                            Егер санды тырнақшаға қойсаңыз, ол мәтін жолы ретінде қарастырылады.</p>
                        <CodeEditor
                            value={`const pi = 3.14;\nlet person = "Әрсенов Кайрат";\nlet answer = 'Иә!';`}
                            language="js"
                            disabled="true"
                            padding={15}
                            style={{
                                border: '1px solid #C1D9F2',
                                borderRadius: '4px',
                                fontSize: 18,
                                backgroundColor: "#001845",
                                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                            }}
                        />
                        <br />
                        <h4 style={{ color: '#B7CFEA' }}>Value = undefined</h4>

                        <p style={{ color: '#C1D9F2', fontSize: '18px' }}>
                            Компьютерлік бағдарламаларда айнымалылар жиі мәнсіз жарияланады. Мән есептелуі керек нәрсе немесе пайдаланушы енгізуі сияқты кейінірек берілетін нәрсе болуы мүмкін.
                            <br />
                            Мәнсіз жарияланған айнымалы мән <code>undefined</code> мәнге ие болады.
                            <br />
                            carName айнымалысы осы мәлімдемені орындағаннан кейін <code>undefined</code>  мәнге ие болады:</p>
                        <CodeEditor
                            value={`let carName;`}
                            language="js"
                            disabled="true"
                            padding={15}
                            style={{
                                border: '1px solid #C1D9F2',
                                borderRadius: '4px',
                                fontSize: 18,
                                backgroundColor: "#001845",
                                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                            }}
                        />

                        <br />
                        <h4 style={{ color: '#B7CFEA' }}>JavaScript айнымалыларын қайта жариялау</h4>

                        <p style={{ color: '#C1D9F2', fontSize: '18px' }}>
                            <code>var</code>   арқылы жарияланған JavaScript айнымалы мәнін қайта жарияласаңыз, ол өз мәнін жоғалтпайды.
                            <br />
                            <code style={{ color: '#E0E6ED' }}>carName</code> айнымалысы осы мәлімдемелерді орындағаннан кейін де "Volvo" мәніне ие болады:</p>
                        <CodeEditor
                            value={`var carName = "Volvo";\nvar carName;`}
                            language="js"
                            disabled="true"
                            padding={15}
                            style={{
                                border: '1px solid #C1D9F2',
                                borderRadius: '4px',
                                fontSize: 18,
                                backgroundColor: "#001845",
                                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                            }}
                        />

                        <br />
                    </Col>
                    <hr style={{ color: 'white' }} />
                    <br />
                    <Col md={8}>
                        <Exercise />
                    </Col>
                </Col>
            </Row>
        </Container >)
}

export default Variables