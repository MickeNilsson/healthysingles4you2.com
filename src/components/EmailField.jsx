// Components
import InputField from './InputField';

export default function EmailField(props) {

    function validate(value) {

        props.setEmail(value);
        
        return !!(value && value.match(/^\S+@\S+\.\S+$/));
    }

    return (
        <InputField 
            autoComplete='email'
            disabled={props.disabled}
            isValid={props.isValid}
            placeholder='E-mail'
            setIsValid={props.setIsValid}
            showValidation={props.showValidation} 
            type='email' 
            validate={validate}
            value={props.value} />
    );
}