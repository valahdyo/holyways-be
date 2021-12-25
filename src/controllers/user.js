const { User } = require('../../models')


//Get all users
exports.getUsers = async (req, res) => {

    try {
        const user = await User.findAll({
            attributes: ["id", "fullName", "email"] 
        })
        res.status(200).send({
            status: "success",
            data: {
                users: user
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: "Failed",
            message: "Cannot get all users"
        })
    }
}

//Delete user
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