import Form from 'react-bootstrap/Form';
import {useState} from 'react';

function Email(props) {

    const [isValid, setIsValid] = useState(false);

    function handleChange(event) {

        const email = event.target.value;

        setIsValid(validateEmailFormat(email));
    
        props.setValue(email);
    }

    function validateEmailFormat(email) {

        return email.match(/^\S+@\S+\.\S+$/);
    }

    return (

        <Form.Group
            className='mb-3'
            controlId='formBasicEmail'>

            <Form.Label>{props.label}</Form.Label>

            <Form.Control 
                spellCheck='false'
                isInvalid={props.validated && !isValid}
                isValid={props.validated && isValid}
                required={props.required}
                onChange={handleChange}
                type='email'
                placeholder={props.placeholder} />

            <Form.Control.Feedback
                type='invalid'>
                {props.feedback}
            </Form.Control.Feedback>
            
        </Form.Group>
    );
}

Email.defaultProps = {
    label: 'Email address',
    feedback: 'Please enter your e-mail address.',
    required: true,
    placeholder: 'Email address'
};

export default Email;