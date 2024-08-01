// Components
import InputField from './InputField';

export default function PasswordField(props) {

    function validate(value) {

        props.setPassword(value);
        
        return !!value;
    }

    return (
        <InputField 
            autoComplete='current-password'
            disabled={props.disabled}
            isValid={props.isValid}
            placeholder='Lösenord'
            setIsValid={props.setIsValid}
            showValidation={props.showValidation} 
            type='password' 
            validate={validate} />
    );
}