import './formInput.styles.scss';

const FormInput = ({label, type,  ...otherProps}) => {
    return (
        
<div className="group">
             <input type={type} label={label} className="form-input" required {...otherProps}/>
            { label && (
            <label className={`${otherProps.value ? 'shrink' : '' } form-input-label`} >{label}</label>
            )}
        </div>

    )
}

export default FormInput;