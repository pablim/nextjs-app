const Form = ({ fields, setFields, onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            {fields?.id && <>
                <input type='text' onChange={(e) => setFields(prev => ({ ...prev, name: e.target.value }))} 
                    value={fields.id} placeholder='id'/>
                <br />
            </>
            }
            <input type='text' onChange={(e) => setFields(prev => ({ ...prev, name: e.target.value }))} 
                value={fields.name} placeholder='name'/>
            <br />
            <input type='text' onChange={(e) => setFields(prev => ({ ...prev, email: e.target.value }))} 
                value={fields.email} placeholder='email'/>
            <br />
            <input type='submit'  value="Salvar"/>
        </form>
    )
}

export default Form;



