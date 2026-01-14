import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"

import { Input, Select } from "../";

const Form = ({
    fields, 
    updateFields, 
    onSubmit, 
    submitButtonText='Enviar',
    submitButtonStyle,
    style
}) => {
    const [defaultValues, setDefaultValues] = useState()
    const [shortcutObject, setShortcutObject] = useState()

    useEffect(() => {
        defineDefaultValues()
        defineShortcutObject()
    }, [])

    useEffect(() => {
        updateFields?.map((updateField) => {
            const field = fields.find(field => field.name === updateField.name)
            const keys = Object.keys(updateField)

            field && keys.map((key) => field[key] = updateField[key])

            if (Array.isArray(updateField.value)) {
                setValue(updateField.name, updateField.value[0].value)
            } else setValue(updateField.name, updateField.value)
        })
        
    }, [updateFields])

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultvalues: defaultValues
    })

    const defineDefaultValues = () => {
        const defaultValues = {}

        fields.map((field) => {
            if (field?.defaultValue) {
                defaultValues[field.name] = field.defaultValue
            }
        })

        setDefaultValues(defaultValues)
    }

    const defineShortcutObject = () => {
        const shortcutObject = {}

        fields.map((field) => {
            shortcutObject[field.name] = field
        })

        setShortcutObject(shortcutObject)
    }

    return (
        <form action="" onSubmit={handleSubmit(onSubmit)}
            style={style}
        >
            {fields.map((field, idx) => (
                Array.isArray(field?.value) || field?.type === 'select' ? 
                    <Select 
                        key={idx}
                        id={field.id}
                        label={field.label}
                        style={field.style}
                        name={field.name}
                        register={register}
                        disabled={field.disabled} 
                        readOnly={field.readOnly}
                        required={field.required}
                        options={field.value}
                        onChange={field.onChange}
                    />
                :
                    <Input key={idx}
                        label={field.label} 
                        name={field.name}
                        register={register}
                        type={field.type}
                        info={field.info}
                        required={field.required}
                        disabled={field.disabled}
                        placeholder={field.placeholder}
                        defaultValue={field.defaultValue}
                        style={field.style}
                        readOnly={field.readonly}
                    />    
            ))}
            <input 
                style={{...submitButtonStyle, height: '40px'}} 
                type="submit" 
                value={submitButtonText}/>
        </form>
    )
}

export default Form