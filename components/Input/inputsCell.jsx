const InputCell = ({ label, ...inputProps }) => (
    <Columns>
        <Text>{label}</Text>
        <Input 
            id={inputProps.name} 
            onChange={handleInputChange} 
            {...inputProps} />
    </Columns>
)

const SelectCell = ({ 
    label, 
    list=[], 
    listAcessorLabel, 
    listAcessorId, 
    selectedIndex,
    ...selectProps 
}) => (
    <Columns>
        <Text>{label}</Text>
        <Select 
            id={selectProps.name} 
            onChange={handleInputChange}
            {...selectProps}
        >
            <option value={""}></option>
            {list && list.map((item, idx) => (
                <option key={listAcessorId ? item[listAcessorId] : idx}
                    value={listAcessorId ? item[listAcessorId] : idx}
                    selected={idx === selectedIndex}
                >
                    {listAcessorLabel ? item[listAcessorLabel] : item}
                </option>
            ))}
        </Select>
    </Columns>
)

const TextAreaCell = ({ label, ...textAreaProps  }) => {
    console.log('update');
    return (
    
    <Columns>
        <Text>{label}</Text>
        <TextArea
            id={textAreaProps.name} 
            onChange={handleInputChange} 
            {...textAreaProps}
        ></TextArea>
    </Columns>
)}
