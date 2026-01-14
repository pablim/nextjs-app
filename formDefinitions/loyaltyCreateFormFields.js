const loyaltyCreateFormFields = [
    {
        label: 'Nome cliente:',
        name: "issuerName" ,
        type: "text" ,
        info: 'Ex.: Jhonnys Barber',
        required: ''
    },
    {
        label: 'Nome classe:',
        name: "loyaltyName" ,
        required: '',
        type: "text" ,
        info: 'Deve incluir apenas caracteres alfanuméricos, ".", "_" ou "-". Ex.: JhonnysBarber',
    },
    {
        label: 'Nome programa:',
        name: "programName" ,
        type: "text" ,
        info: 'Nome do programa de fidelidade',
    },
    {
        label: 'Telefone contato:',
        name: "contactPhone" ,
        type: "text" ,
        info: 'Telefone de contato comercial do cliente. Ex.: 37998294580',
    },
    {
        label: 'Localização:',
        name: "locationLink" ,
        type: "text" ,
        info: 'Localização comercial do cliente. Ex.: https://maps.app.goo.gl/ErM1fyjKMuk8qSKR9',
    },
    {
        label: 'Latitude:',
        name: "locations[0][latitude]" ,
        type: "text" ,
    },
    {
        label: 'Longitude:',
        name: "locations[0][longitude]" ,
        type: "text" ,
    },
    {
        label: 'Logo:',
        name: "imagens[programLogo]" ,
        type: "text" ,
        info: 'Endereço web da imagem de logo. Ex.: https://i.postimg.cc/L62LwCN0/34009403.png',
    },
    {
        label: 'Descrição logo:',
        name: "imagens[programLogoContentDescription]",
        type: "text" ,
        info: 'Descrição da imagem de logo. Ex.: Jhonnys Barber logo image',
    },
    {
        label: 'Imagem card:',
        name: "imagens[image]" ,
        type: "text" ,
        info: 'Ex.: https://i.postimg.cc/fRbW0mRb/34009403.png',
    },
    {
        label: 'Descrição imagem card:',
        name: "imagens[imageDescription]",
        type: "text" ,
        info: 'Ex.: Loyalty image logo',
    },
    {
        label: 'Imagem principal:',
        name: "imagens[mainImage]" ,
        type: "text" ,
        info: 'Ex.: https://i.postimg.cc/BvjJ63Q7/34009404.png',
    },
    {
        label: 'Descrição imagem principal:',
        name: "imagens[mainImageDescription]",
        type: "text" ,
        info: 'Ex.: Image module description',
    },
    {
        label: 'Home page:',
        name: "homepageUri" ,
        type: "text" ,
        info: 'URI da home page',
    },
    {
        label: 'Página de login:',
        name: "loginPage" ,
        type: "text" ,
        info: 'URI da página de login',
    },
    {
        label: 'Descrição da página de login:',
        name: "loginPageDescription" ,
        type: "text",
    },
    {
        label: 'Página de inscrição:',
        name: "enrollmentPage" ,
        type: "text" ,
        info: 'URI da página de inscrição',
    },
    {
        label: 'Descrição da página de inscrição:',
        name: "enrollmentPageDescription" ,
        type: "text" ,
    },
    {
        label: 'Tipo pontuação:',
        name: "info[info1Text]" ,
        type: "text" ,
    },
    {
        label: 'Titulo texto informativo 2:',
        name: "info[info2Header]" ,
        type: "text" ,
    },
    {
        label: 'Titulo texto informativo 3:',
        name: "info[info3Header]" ,
        type: "text" ,
    },
    {
        label: 'Texto informativo 1:',
        name: "info[info3Text]" ,
        type: "text" ,
    },
    {
        label: 'Título mensagem temporária:',
        name: "temporaryMessage[temporaryMessageTitle]" ,
        type: "text" ,
    },
    {
        label: 'Texto mensagem temporária:',
        name: "temporaryMessage[temporaryMessageText]" ,
        type: "text" ,
    },
    {
        label: 'Data início:',
        name: "temporaryMessage[temporaryMessageStartDate]" ,
        type: "text" ,
    },
    {
        label: 'Data fim:',
        name: "temporaryMessage[temporaryMessageEndDate]" ,
        type: "text" ,
    }
]

export default loyaltyCreateFormFields