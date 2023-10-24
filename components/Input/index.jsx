import { useState } from "react";

import styles from './style.module.scss'

const Input = ({
    id, 
    name,
    register = () => {}, 
    defaultValue = '', 
    type,
    label, 
    error, 
    placeholder,
    info
}) => {
    const [value, setValue] = useState(defaultValue);

    const handleChange = (event) => {
        const value = event.target.value;
		setValue(value);
	};

    return (
        <div className={styles.inputContaier}>
            <label htmlFor={id} >{label}</label>
            <input 
                id={id}
                {   
                    // If don't have name else use id, if don't have, else use label
                    ...register(
                        name ? name : 
                        id ? id : 
                        label ? label : 'fieldName'
                    )
                }
                value={value} 
                onChange={handleChange}
                placeholder={placeholder}
                type={type ? type : 'text'}
            />
            {error && 
                <span className={styles.inputWaring}>
                    This field is required
                </span>
            }
            <div className={styles.inputInfo}>{info}</div>
        </div>
    )
}

export default Input