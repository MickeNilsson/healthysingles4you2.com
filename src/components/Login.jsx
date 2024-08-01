import { Button, Card, Form } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import Home from './Home';


export default function Login(props) {

    const [emailField, setEmailField] = useState({ value: '' });

    const [incorrectCredentials, setIncorrectCredentials] = useState(false);

    const [passwordField, setPasswordField] = useState({ value: '' });

    const [resetPassword, setResetPassword] = useState(false);

    const [sendingLoginRequest, setSendingLoginRequest] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [showValidation, setShowValidation] = useState(false);

    const [resetPasswordRequestIsSent, setResetPasswordRequestIsSent] = useState(false);

    // Event handlers //////

    function emailChange(event_o) {

        setEmailField(current_o => {

            return { value: event_o.target.value };
        });
    }

    function formSubmit(event_o) {

        event_o.preventDefault();

        event_o.stopPropagation();

        setSendingLoginRequest(true);

        const email_s = emailField.value;

        const password_s = passwordField.value;

        axios.post('https://healthysingles4you2.com/api/login/', {
            email: email_s,
            password: password_s
        })

            .then(function (response_o) {

                if (response_o.data && response_o.data.data && response_o.data.data.firstname) {

                    props.setMember({ ...response_o.data.data, isLoggedIn: true });

                    props.setPage(<Home member={response_o.data.data} setPage={props.setPage} />);

                } else {

                    setShowValidation(current_o => {

                        return true;
                    });

                    setIncorrectCredentials(current_o => {

                        return true;
                    });

                    setSendingLoginRequest(current_o => {

                        return false;
                    });
                }
            })

            .catch(function (error) {

                console.log(error);
            });
    }

    function passwordChange(event_o) {

        setPasswordField(current_o => {

            return { value: event_o.target.value };
        });
    }

    function sendResetPasswordRequest() {

        axios.get('https://healthysingles4you2.com/api/mail/reset-password.php?email=' + emailField.value)

            .then(function (response_o) {

                setResetPasswordRequestIsSent(true);
            });
    }

    return (

        <Card className='login-card'>

            <Card.Body>

                {!resetPassword && !resetPasswordRequestIsSent &&

                    <>
                        <Form
                            noValidate
                            onSubmit={formSubmit}
                        >
                            <Form.Group className='mb-3'>

                                <Form.Control
                                    autoComplete='email'
                                    defaultValue=''
                                    disabled={sendingLoginRequest}
                                    isInvalid={incorrectCredentials && showValidation}
                                    onChange={emailChange}
                                    placeholder='E-mail'
                                    size='sm'
                                    type='email'
                                />

                            </Form.Group>

                            <Form.Group className='mb-3'>

                                <Form.Control
                                    autoComplete='password'
                                    defaultValue=''
                                    disabled={sendingLoginRequest}
                                    isInvalid={incorrectCredentials && showValidation}
                                    onChange={passwordChange}
                                    placeholder='Password'
                                    size='sm'
                                    type={showPassword ? 'text' : 'password'}
                                />

                                <Form.Check
                                    label='Show password'
                                    type='checkbox'
                                    onClick={() => setShowPassword(!showPassword)} />

                                <span className='forgot-pw' onClick={() => setResetPassword(true)}>Forgot password?</span>

                                <Form.Control.Feedback type='invalid'>

                                    Incorrect email or password

                                </Form.Control.Feedback>

                            </Form.Group>

                            <div className='d-grid'>

                                <Button
                                    disabled={sendingLoginRequest}
                                    size='sm'
                                    type='submit'
                                    variant='success'
                                >
                                    Log in
                                </Button>

                            </div>

                        </Form>

                    </>
                }

                {resetPassword && !resetPasswordRequestIsSent &&

                    <>
                        <Card.Text><small>Do you want to reset your password?</small></Card.Text>

                        <Button
                            className='float-end'
                            onClick={() => sendResetPasswordRequest()}
                            size='sm'
                            variant='primary'>Yes, continue</Button>

                        <Button
                            className='me-2 float-end'
                            onClick={() => setResetPassword(false)}
                            size='sm'
                            variant='secondary'>No, cancel</Button>
                    </>
                }

                {resetPasswordRequestIsSent && 

                    <>
                        <Card.Text><small>Instructions on how to update your password has been sent to your e-mail address</small></Card.Text>

                        <Button 
                            className='float-end'
                            onClick={() => {setResetPassword(false); setResetPasswordRequestIsSent(false);}}
                            size='sm'
                            variant='primary'>OK</Button>
                    </>
                }

            </Card.Body>

        </Card>
    );
}