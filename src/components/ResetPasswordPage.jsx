// Node modules
import axios from 'axios';
import { Button, Card, Form } from 'react-bootstrap';
import { useState } from 'react';

export default function ResetPasswordPage(props) {

    const [resetPassword, setResetPassword] = useState(false);

    const [showCard, setShowCard] = useState(true);

    const [password, setPassword] = useState('');

    const [passwordFieldIsValid, setPasswordFieldIsValid] = useState(false);

    const [responseErrorMessage, setResponseErrorMessage] = useState('');

    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [showValidation, setShowValidation] = useState(false);

    const [passwordIsUpdated, setPasswordIsUpdated] = useState(false);

    const [waitingForResponse, setWaitingForResponse] = useState(false);

    function passwordChange(event_o) {

        const password_s = event_o.target.value;

        setPassword(password_s);

        setPasswordFieldIsValid(password_s.length > 5 && password_s.length < 21);
    }

    function handleSubmit(event_o) {

        event_o.preventDefault();

        event_o.stopPropagation();

        if (passwordFieldIsValid) {
           
            setWaitingForResponse(true);

            axios.put('https://healthysingles4you2.com/api/members/', {
                password: password,
                uuid: props.uuid
            })
                .then(function (response_o) {

                    if (response_o.status === 200) {

                        setPasswordIsUpdated(true);
                    }
                })
                .catch(function (error_o) {
                    debugger;
                    setStudentAccountCreationPending(false);

                    switch (error_o.response.status) {

                        case 409:

                            setResponseErrorMessage('Det finns redan ett konto med den e-postadressen.');

                            setEmailFieldIsValid(false);

                            break;
                    }
                });
        }

        setShowValidation(true);
    }

    return (

        <>
            {showCard &&

                <Card className='login-card'>

                    <Card.Body>

                        {passwordIsUpdated &&

                            <>
                                <Card.Text><small>Your password has now been updated</small></Card.Text>

                                <Button
                                    className='float-end'
                                    onClick={() => setShowCard(false)}
                                    size='sm'
                                    variant='primary'>OK</Button>
                            </>
                        }

                        {!passwordIsUpdated &&

                            <>
                                <Card.Text><small>Please enter a new password</small></Card.Text>

                                <Form
                                    noValidate
                                    onSubmit={handleSubmit}>

                                    {/* <PasswordField
                                        disabled={isUpdatingPassword}
                                        isValid={passwordFieldIsValid}
                                        setIsValid={setPasswordFieldIsValid}
                                        setPassword={setPassword}
                                        showForgotPasswordField={false}
                                        showValidation={showValidation} /> */}

                                    <Form.Control
                                        autoComplete='new-password'
                                        defaultValue=''
                                        isInvalid={!passwordFieldIsValid && showValidation}
                                        isValid={passwordFieldIsValid && showValidation}
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

                                   {/*  <ResetPasswordButton disabled={!passwordFieldIsValid || isUpdatingPassword} /> */}

                                    <small className='text-danger'>{responseErrorMessage}</small>

                                    <div className='d-grid gap-2'>

                                        <Button
                                            disabled={waitingForResponse}
                                            size='sm'
                                            type='submit'
                                            variant='success'>Update password</Button>

                                    </div>

                                </Form>
                            </>
                        }

                    </Card.Body>

                </Card>
            }
        </>
    );
}