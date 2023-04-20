import './formInput.styles.scss';

const FormInput = ({label, type,  ...otherProps}) => {
    return (
        
<div className="group">
             <input className="form-input" required {...otherProps}/>
            { label && (
            <label className={`${otherProps.value.length ? 'shrink' : '' } form-input-label`} >{label}</label>
            )}
        </div>

    )
}

export default FormInput;