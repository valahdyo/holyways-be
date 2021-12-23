const { User } = require('../../models')

exports.loginUser = async (req, res) => {
    const { email, password } = req.body
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

exports.getUsers = async (req, res) => {

    try {
        const user = await User.findAll({
            attributes: ["id", "fullName", "email"] 
        })
        res.send({
            status: "success",
            data: {
                users: user
            }
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: "Failed",
            message: "Cannot get all users"
        })
    }
}

exports.deleteUser = async (req, res) => {
    const {id} = req.params
    try {
        const user = await User.destroy({
            where: { id }
        })
        res.send({
            status: "success",
            data: {
                id
            }
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: "Failed",
            message: `Cannot delete ${id} users`
        })
    }
}