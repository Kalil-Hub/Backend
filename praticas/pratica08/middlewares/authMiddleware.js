const jwt = require('jsonwebtoken');
function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1]; 

    if (token == null) {

        return res.status(401).json({ msg: 'Não autorizado' });
    }

    try {
        const usuario = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = usuario;
        next();
    } catch (err) {
        return res.status(401).json({ msg: 'Token inválido' });
    }
}
function gerarToken(payload) {
    const expiresIn = 120;
    try {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
    } catch (err) {
        throw new Error('Erro ao gerar o token');
    }
}
module.exports = {
    verificarToken,
    gerarToken
};