import styles from './style.module.scss'

const Select = ({ 
    id,
    label,
    name,
    register = () => {},
    info,
    required,
    disabled,
    defaultValue,
    style,
    readOnly,
    options,
    onChange
}) => {
    return (
        <div style={{
                ...style, 
                display: 'flex', 
                flexDirection: 'column'
            }}
        >
            <label htmlFor={id} >{label}</label>
            <select {...register(name)}
                style={{ height: '40px'}}
                disabled={disabled}
                readOnly={readOnly}
                required={required}
                defaultValue={defaultValue}
                onChange={onChange}
            >
                {options?.map((option, idx) => (
                    <option key={idx} value={option.value} >
                        {option.label}
                    </option>
                ))}
            </select>
            {/* {error && 
                    <span className={styles.inputWaring}>
                        This field is required
                    </span>
                }
            <div className={styles.inputInfo}>{info}</div> */}
        </div>
    )
}

export default Select