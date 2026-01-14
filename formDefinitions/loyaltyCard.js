const loyaltyCard = [
    {
        label: 'Nome:',
        name: "accountName" ,
        type: "text" ,
        info: 'Ex.: Pablo Vaz',
        required: ''
    },
    {
        label: 'Cashback:',
        name: "loyaltyPoints" ,
        type: "text" ,
        required: ''
    },
    {
        label: 'Estado:',
        name: "state" ,
        type: "select" ,
        required: ''
    },
    {
        label: 'Data inicial:',
        name: "validTimeInterval.start" ,
        type: "text",
        required: ''
    },
    {
        label: 'Data final:',
        name: "validTimeInterval.end" ,
        type: "text",
        required: ''
    },
]

export default loyaltyCard