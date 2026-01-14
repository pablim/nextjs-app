const formatDate = () => {
    const currentDate = new Date()
    return `${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}` 
}

const cardCreateFormFields = [
    {
        label:'Loyalty:',
        name:"loyaltyName" ,
        type:"select" ,
        info:'Ex.: DamascenoBarberShop',
        required: true,
        style: {
            gridColumn: '1 / 2'
        }
    },
    {
        label:'E-mail do usuario:',
        name:"userId" ,
        type:"email" ,
        info:'Ex.: vazsk8@gmail.com',
        required: true,
        style: {
            gridColumn: '1 / 2'
        }
    },
    {
        label:'Nome do membro:',
        name:"memberName" ,
        type:"text" ,
        info:'Ex.: Pablo Vaz Gondim Faria',
        required: true,
        style: {
            gridColumn: '1 / 2'
        }
    },
    {
        label:'Tipo de pontuação:',
        name:"pointsType" ,
        type:"select" ,
        info:'Ex.: Cashback',
        value: [
            {label: 'Pontos', value:'points'}, 
            {label: 'Cashback', value: 'cashback'}
        ],
        style: {
            gridColumn: '1 / 2'
        }
    },
    {
        label:'Pontos de início:',
        name:"initialPoints" ,
        type:"text" ,
        defaultValue:"0",
        required: true,
        style: {
            gridColumn: '1 / 2'
        }
    },
    {
        label:'Data de início:',
        name:"startDate" ,
        type:"text",
        placeholder:"00/00/0000",
        defaultValue: formatDate(),
        style: {
            gridColumn: '1 / 2'
        }
    },
    {
        label:'Data de expiração:',
        name:"endDate" ,
        type:"text",
        placeholder:"00/00/0000" ,
        style: {
            gridColumn: '1 / 2'
        }
    }
]

export default cardCreateFormFields


