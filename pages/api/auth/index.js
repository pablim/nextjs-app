import jwt_decode from "jwt-decode";

export default function handler(req, res) {
    const { credential } = req.body
    console.log('req', credential)

    var token = credential
    var decoded = jwt_decode(token);

    console.log(decoded);

    // decode header by passing in options (useful for when you need `kid` to verify a JWT):
    var decodedHeader = jwt_decode(token, { header: true });

    console.log(decodedHeader);

    // Crie a conta no banco de dados com os dados do usuário
    res.status(200).json({ name: decoded.name })
}