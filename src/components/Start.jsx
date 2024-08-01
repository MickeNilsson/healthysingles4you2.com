import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import Home from './Home';

function Start(props) {

    const [emailField, setEmailField] = useState({ isValid: false, value: '' });

    const [firstNameField, setFirstNameField] = useState({ isValid: false, value: '' });

    const [genderField, setGenderField] = useState({ isValid: false, value: '' });

    const [passwordField, setPasswordField] = useState({ isValid: false, value: '' });

    const [showPassword, setShowPassword] = useState(false);

    const [showValidation, setShowValidation] = useState(false);

    // Event handlers //////

    function emailChange(event_o) {

        setEmailField(current_o => {

            const isValid_b = event_o.target.value.match(/^\S+@\S+\.\S+$/);

            return { isValid: event_o.target.value.match(/^\S+@\S+\.\S+$/), value: event_o.target.value };
        });
    }

    function firstNameChange(event_o) {

        setFirstNameField(current_o => {

            return { isValid: !!event_o.target.value, value: event_o.target.value };
        });
    }

    function genderChange(gender_s) {

        setGenderField(current_o => {

            return { isValid: true, value: gender_s };
        });
    }

    function passwordChange(event_o) {

        setPasswordField(current_o => {

            return { isValid: event_o.target.value.length > 5 && event_o.target.value.length < 21, value: event_o.target.value };
        });
    }

    function formSubmit(event_o) {

        event_o.preventDefault();

        event_o.stopPropagation();

        setShowValidation(current_o => {

            return true;
        });

        if (emailField.isValid && firstNameField.isValid && genderField.isValid && passwordField.isValid) {

            const payload_o = {
                email: emailField.value,
                password: passwordField.value,
                firstname: firstNameField.value,
                gender: genderField.value
            };

            axios.post('https://healthysingles4you2.com/api/members/', payload_o)

                .then(function (response_o) {

                    if (response_o.data && response_o.data.status && response_o.data.status === 'ok') {

                        const member_o = payload_o;

                        member_o.id = response_o.data.data.id;

                        member_o.isLoggedIn = true;


                        props.setMember(member_o);

                        props.setPage(<Home member={member_o} />);

                        // props.setIsLoggedIn(true);

                        // props.setPage(<Home firstname={firstNameField.value} />);
                    }
                })

                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    return (

        <>

            <Container className='my-3 p-3 top'>

                <Row>

                    <Col xs={12} sm={12} md={12} lg={4}>

                        <Card className='left-card-home-page'>

                            <Card.Body>

                                <Card.Title>

                                    &ldquo;The social dating site for singles with the ambition of a
                                    more active and helthier lifestyle&rdquo;

                                </Card.Title>

                                <ul>

                                    <li>

                                        <i className='bi bi-check-square'></i> Meet singles online and be a VIP member for one week and use all our features for free

                                    </li>

                                    <li>

                                        <i className='bi bi-check-square'></i> Body diagram with a health
                                        prosperity line that helps you to have a healthier lifestyle

                                    </li>

                                    <li>

                                        <i className='bi bi-check-square'></i> Have your own personal diary

                                    </li>

                                    <li>

                                        <i className='bi bi-check-square'></i> Personalized calendar

                                    </li>

                                </ul>

                            </Card.Body>

                        </Card>

                    </Col>

                    <Col className='p-2' xs={12} sm={12} md={12} lg={4}></Col>

                    <Col xs={12} sm={12} md={12} lg={4}>

                        <Card>

                            <Card.Body>

                                <Card.Title>Meet singles today</Card.Title>

                                <Form className='mt-3'
                                    noValidate
                                    onSubmit={formSubmit}
                                    spellCheck='false'
                                >

                                    <Form.Group className='mb-3'>

                                        <Form.Control
                                            autoComplete='given-name'
                                            defaultValue=''
                                            isInvalid={!firstNameField.isValid && showValidation}
                                            isValid={firstNameField.isValid && showValidation}
                                            onChange={firstNameChange}
                                            placeholder='First name'
                                            required
                                            size='sm'
                                            type='text'
                                        />

                                        <Form.Control.Feedback type='invalid'>

                                            Please enter your first name.

                                        </Form.Control.Feedback>

                                    </Form.Group>

                                    <Form.Group className='text-center mb-3'>

                                        <Form.Check className='gender-radio'
                                            aria-label='Male'
                                            inline
                                            isInvalid={!genderField.isValid && showValidation}
                                            isValid={genderField.isValid && showValidation}
                                            name='gender-radio'
                                            onChange={() => genderChange('male')}
                                            type='radio'
                                        />

                                        <i className='bi bi-gender-male text-primary'></i>

                                        <span className='gender-center'></span>

                                        <Form.Check className='gender-radio'
                                            aria-label='Female'
                                            inline
                                            isInvalid={!genderField.isValid && showValidation}
                                            isValid={genderField.isValid && showValidation}
                                            name='gender-radio'
                                            onChange={() => genderChange('female')}
                                            type='radio'
                                        />

                                        <i className='bi bi-gender-female text-danger'></i>

                                        <Form.Control.Feedback type='invalid'>

                                            Please choose your gender

                                        </Form.Control.Feedback>

                                    </Form.Group>

                                    <Form.Group className='mb-3'>

                                        <Form.Control
                                            autoComplete='email'
                                            defaultValue=''
                                            isInvalid={!emailField.isValid && showValidation}
                                            isValid={emailField.isValid && showValidation}
                                            onChange={emailChange}
                                            placeholder='E-mail'
                                            size='sm'
                                            type='email'
                                        />

                                        <Form.Control.Feedback type='invalid'>

                                            Please enter your e-mail.

                                        </Form.Control.Feedback>

                                    </Form.Group>

                                    <Form.Group className='mb-3'>

                                        <Form.Control
                                            autoComplete='new-password'
                                            defaultValue=''
                                            isInvalid={!passwordField.isValid && showValidation}
                                            isValid={passwordField.isValid && showValidation}
                                            onChange={passwordChange}
                                            placeholder='Password'
                                            size='sm'
                                            type={showPassword ? 'text' : 'password'}
                                        />

                                        <Form.Check
                                            label='Show password'
                                            type='checkbox'
                                            onClick={() => setShowPassword(!showPassword)} />

                                        <Form.Control.Feedback type='invalid'>

                                            Please enter a password that is 6-20 characters long.

                                        </Form.Control.Feedback>

                                    </Form.Group>

                                    <div className='d-grid gap-2'>

                                        <Button
                                            size='sm'
                                            type='submit'
                                            variant='success'
                                        >
                                            Join now for free

                                        </Button>

                                    </div>

                                </Form>

                            </Card.Body>

                        </Card>

                    </Col>

                </Row>

            </Container>

            <Container className='bottom pt-3'>

                <Row xs={1} sm={3}>

                    <Col className='mb-3'>

                        <h5 className='header'>Your own diary</h5>

                        <div>

                            Here you can enter events for the day. You can also skip back in the diary and read about exciting things you have done in the past.

                        </div>

                    </Col>

                    <Col className='mb-3'>

                        <h5 className='header'>Calendar page</h5>

                        <div>Store your daily activities in this personalized calendar page. Once  you confirm your activity, it will be registered in the body diagram.</div>

                    </Col>

                    <Col className='mb-3'>

                        <h5 className='header'>Body diagram</h5>

                        <div>The body diagram will guide you to your body balance goals. In the graph you can follow you way to a healthier lifestyle.</div>

                    </Col>

                </Row>

                <Row xs={1} sm={3}>

                    <Col className='mb-3'>

                        <h5 className='header'>Chat room</h5>

                        <div>This feature will give you the opportunity to communicate with all members.</div>

                    </Col>

                    <Col className='mb-3'>

                        <h5 className='header'>Donate to charity</h5>

                        <div>One dollar of each members fee for paying members will be donated to ten well selected charitable organizations.</div>

                    </Col>

                    <Col className='mb-3'>

                        <h5 className='header'>World clocks</h5>

                        <div>Five world clocks in different time zones will be available to help you to see what time you friend has in another part of the world.</div>

                    </Col>

                </Row>

            </Container>
        </>
    );
}

export default Start;
