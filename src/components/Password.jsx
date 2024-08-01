import Form from 'react-bootstrap/Form';
import {useState} from 'react';

function Password(props) {

    const [isValid, setIsValid] = useState(false);

    function handleChange(event) {

        const password = event.target.value;

        setIsValid(validatePasswordFormat(password));
    
        props.setValue(password);
    }

    function validatePasswordFormat(password) {

        return (password && password.length) ? true : false;
    }

    return (

        <Form.Group
            className='mb-3'
            controlId='formBasicPassword'>

            <Form.Label>{props.label}</Form.Label>

            <Form.Control 
                spellCheck='false'
                isInvalid={props.validated && !isValid}
                isValid={props.validated && isValid}
                required={props.required}
                onChange={handleChange}
                type='password'
                placeholder={props.placeholder} />

            <Form.Control.Feedback
                type='invalid'>
                {props.feedback}
            </Form.Control.Feedback>
            
        </Form.Group>
    );
}

Password.defaultProps = {
    label: 'Password',
    feedback: 'Incorrect password.',
    required: true,
    placeholder: 'Password'
};

export default Password;