import React from "react"
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { fetchAuthMe, fetchGetRating, fetchUpdate } from "../redux/slices/user.js"
import { useDispatch, useSelector } from "react-redux"

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Rating } from 'react-simple-star-rating'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import axios from '../axios.js'

const Profile = () => {

    const inputImageRef = React.useRef()

    const dispatch = useDispatch();

    const [errorMessage, setErrorMessage] = React.useState('')

    const { data, rating } = useSelector((state) => state.user)

    const [phone, setPhone] = React.useState(data?.phone)

    let myRating = 0
    let result = 0
    console.log(data && data)

    React.useEffect(() => {
        dispatch(fetchGetRating())
    }, [])

    console.log(rating && rating)

    if (rating) {
        const wasd = rating?.data && rating?.data[0]
        console.log(wasd)
         result = (wasd?.correct + wasd?.wrong) == wasd?.completed ? 
           ( wasd?.correct * 100) / wasd?.completed
        : 0
        myRating = (5 * result) / 100
    }

    const handleAvatar = async (event) => {
        try {
            let file = event.target.files[0]
            const formData = new FormData();
            formData.append("image", file);
            const { data } = await axios.post("/api/upload/avatar", formData);
            console.log(data.url);
        } catch (error) {
            console.warn(error);
            alert("Аватар дұрыс көшірілген жоқ");
        }
        dispatch(fetchAuthMe());
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            username: data?.username && data?.username,
            fullname: data?.fullname && data?.fullname,
            email: data?.email && data?.email
        },
        mode: "onChange",
    });

    const onSubmit = async (values) => {
        const data = await dispatch(
            fetchUpdate({
                username: values.username,
                fullname: values.fullname,
                phone: phone && phone,
                email: values.email,
            })
        );

        dispatch(fetchAuthMe());

        alert(data.payload.message)

        if ("token" in data.payload) {
            window.localStorage.setItem("token", data.payload.token);
        }

    };

    console.log(myRating)

    return (
        <Container fluid>
            <Row>
                <Col md={2} className="profile-panel text-center" style={{
                    backgroundColor: '#001845',
                    height: '100vh',
                    paddingTop: '100px'
                }}>
                    <img
                        src={
                            data?.avatarUrl ? `http://localhost:5050${data?.avatarUrl}` :
                                "https://www.citypng.com/public/uploads/small/11639594360nclmllzpmer2dvmrgsojcin90qmnuloytwrcohikyurvuyfzvhxeeaveigoiajks5w2nytyfpix678beyh4ykhgvmhkv3r3yj5hi.png"}

                        className="img-fluid" style={{
                            width: '300px',
                            height: '280px',
                            margin: '6px auto',
                            padding: '6px'
                        }} alt="sdsdv" />

                    <h5 className="page-heading" style={{ margin: '6px auto 24px auto' }}>{data?.username?.toUpperCase()}</h5>

                    <Button className="d-block w-100 profile-panel-basic-btn" onClick={() => { inputImageRef.current.click() }}>
                        Аватар көшіру
                    </Button>
                    <input type="file" hidden ref={inputImageRef} onChange={handleAvatar} />
                    <br />
                    <hr style={{ color: 'white' }} />
                    <Row>
                        <Col md={12} style={{
                            padding: '8px 68px',
                        }}>
                            <CircularProgressbar value={result} styles={buildStyles({
                                strokeLinecap: 'butt',
                                textSize: '14px',
                                pathTransitionDuration: 0.5,
                                pathColor: `rgba(16, 34, 230, ${result / 100})`,
                                textColor: '#FFFFFF',
                                trailColor: '#d6d6d6',
                                backgroundColor: '#3e98c7'
                            })} text={`${result}%`} />
                        </Col>
                        <Col md={12} style={{
                            padding: '8px 38px',
                        }}>
                            <Rating initialValue={myRating} size={36} readonly iconsCount={5} />
                        </Col>
                    </Row>
                </Col>



                <Col md={'10'} className="profile-main-panel">
                    <br />
                    <br />
                    <Row>
                        <Col md={8} className="tiny-profile-lanel text-center">
                            <Row>
                                <Col className="col-6">
                                    <img
                                        src={
                                            data?.avatarUrl ? `http://localhost:5050${data?.avatarUrl}` :
                                                "https://www.citypng.com/public/uploads/small/11639594360nclmllzpmer2dvmrgsojcin90qmnuloytwrcohikyurvuyfzvhxeeaveigoiajks5w2nytyfpix678beyh4ykhgvmhkv3r3yj5hi.png"}

                                        className="img-fluid" style={{
                                            borderRadius: '50%',
                                            width: '120px',
                                            height: '120px',
                                            margin: '6px auto',

                                        }} alt="sdsdv" />
                                </Col>
                                <Col className="col-6">
                                    <h5 className="page-heading" style={{ margin: '6px auto 24px auto' }}>{data?.username?.toUpperCase()}</h5>

                                    <Button className="profile-panel-basic-btn" onClick={() => { inputImageRef.current.click() }}>
                                        Аватар көшіру
                                    </Button>
                                </Col>
                            </Row>
                            <hr style={{ color: 'white' }} />
                            <Row>
                                <Col md={6} xs={6}>
                                    <CircularProgressbar value={result} styles={buildStyles({
                                        strokeLinecap: 'butt',
                                        textSize: '14px',
                                        pathTransitionDuration: 0.5,
                                        pathColor: `rgba(16, 34, 230, ${result / 100})`,
                                        textColor: '#FFFFFF',
                                        trailColor: '#d6d6d6',
                                        backgroundColor: '#3e98c7',
                                    })} text={`${result}%`} />
                                </Col>
                                <Col md={12} xs={6} className="d-flex align-items-center" style={{
                                    padding: '8px 38px',
                                }}>
                                    <Rating initialValue={myRating} size={28} readonly iconsCount={5} />
                                </Col>
                            </Row>
                            <br />
                        </Col>
                    </Row>
                                
                    <h2 style={{ color: '#C1D9F2' }}>{data?.fullname ? data?.fullname : 'Толық атыңыз'}</h2>
                    <hr style={{ color: 'white' }} />


                    <Form onSubmit={handleSubmit(onSubmit)} method="post">
                        <Row>
                            <Col md={8}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Толық аты-жөніңіз</Form.Label>
                                    <Form.Control
                                        style={
                                            Boolean(errors.fullname?.message)
                                                ? { borderColor: "#ED474A" }
                                                : { borderColor: "#0E6BA8" }
                                        }
                                        className="firstname-input"
                                        type="text"
                                        // defaultValue={data?.fullname}
                                        placeholder={data?.fullname}
                                        {...register("fullname", {
                                            required: "Толық аты-жөніңізді енгізіңіз",
                                            minLength: {
                                                value: 2,
                                                message: 'Толық аты-жөніңіз кем болмауы керек'
                                            }
                                        })}
                                    />
                                    {Boolean(errors.fullname?.message) ? (
                                        <Form.Label style={{ color: "#EF393B" }}>
                                            {errors.fullname?.message}
                                        </Form.Label>
                                    ) : (
                                        ""
                                    )}
                                </Form.Group>
                            </Col>

                            <Col md={8}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Қолданушы аты</Form.Label>
                                    <Form.Control
                                        style={
                                            Boolean(errors.username?.message)
                                                ? { borderColor: "#ED474A" }
                                                : { borderColor: "#0E6BA8" }
                                        }
                                        className="firstname-input"
                                        type="text"
                                        // defaultValue={data?.username}
                                        placeholder={data?.username}
                                        {...register("username", {
                                            required: "Қолданушы атын енгізіңіз",
                                            minLength: {
                                                value: 2,
                                                message: 'Қолданушы аты 2 символдан кем болмауы керек'
                                            }
                                        })}
                                    />
                                    {Boolean(errors.username?.message) ? (
                                        <Form.Label style={{ color: "#EF393B" }}>
                                            {errors.username?.message}
                                        </Form.Label>
                                    ) : (
                                        ""
                                    )}
                                </Form.Group>
                            </Col>
                            <Col md={8}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Поштаңыз</Form.Label>
                                    <Form.Control
                                        style={
                                            Boolean(errors.email?.message)
                                                ? { borderColor: "#ED474A" }
                                                : { borderColor: "#0E6BA8" }
                                        }
                                        className="form-control email-input"
                                        type="email"
                                        // defaultValue={data?.email}
                                        placeholder={data?.email}
                                        {...register("email", {
                                            required: "Поштаңызды енгізіңіз",
                                            pattern: {
                                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                message: 'Дұрыс форматты енгізіңіз'
                                            }
                                        })}

                                    />

                                    {Boolean(errors.email?.message) ? (
                                        <Form.Label style={{ color: "#ED474A" }}>
                                            {errors.email?.message}
                                        </Form.Label>
                                    ) : (
                                        ""
                                    )}
                                </Form.Group>
                            </Col>
                            <Col md={8}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Телефон</Form.Label>
                                    <PhoneInput
                                        className="form-control phone"
                                        defaultCountry="KZ"
                                        placeholder={data && data.phone ? data.phone : phone}
                                        // value={data && data.phone ? data.phone : phone}
                                        onChange={setPhone}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className="mb-3">
                            <button
                                style={{ padding: '12px 24px', marginTop: '10px', fontSize: '16px', fontWeight: '600' }}
                                disabled={!isValid}
                                className="signup-btn"
                                type="submit"
                            >
                                {"Сақтау"}
                            </button>
                        </div>
                    </Form>

                </Col>
            </Row>
        </Container >)
}

export default Profile