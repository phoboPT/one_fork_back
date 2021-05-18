const Users = require('../models/User')
const jwt = require("jsonwebtoken");
const { permissions } = require('./permissions')

// exports.convertToId = async function (token) {
//     let idToken = ''
//     try {
//         idToken = jwt.verify(token, "MySecret").id
//     } catch {
//         return ('The token is invalid!')
//     }
//     return idToken
// }

exports.convertToToken = async function (id) {
    const token = jwt.sign({ id: id }, "MySecret")
    return token
}


exports.verifyPermission = async function (token) {
    let idToken = ''
    try {
        idToken = jwt.verify(token, process.env.JWT_SECRET).id
    } catch {
        return ('The token is invalid!')
    }

    let result = await Users.findOne({
        where: {
            id: idToken
        }
    })

    if (!result) {
        console.log('The user does not exists!')
    }


    return [result.id, result.permission]

}
