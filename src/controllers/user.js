const { User } = require('../../models')

exports.loginUser = async (req, res) => {
    const { email, password } = req.body
    console.log(req.body, 'executed')
    try {
        const user = await User.findOne({
            where: {email, password},   
        })
        res.send({
            status: "success",
            data: {
                user: {
                    fullName: user.fullName,
                    email
                }
            }
        })
    } catch (error) {
        res.send({
            status: "Failed",
            message: "User or password is wrong"
        })
    }
}

exports.addUser = async (req, res) => {
    const { fullName } = req.body
    try {
        const user = await User.create(req.body)
        res.send({
            status: 'success',
            data: {
                user: {fullName}
            }
        })
    } catch (error) {
        res.send({
            status: "Failed",
            message: "Register error"
        })
    }
}