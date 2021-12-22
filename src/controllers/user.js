const { User } = require('../../models')

exports.loginUser = async (req, res) => {
    const { id, password } = req.params
    try {
        const user = await User.findOne({
            where: {id, password}
        })
        res.send({
            status: "success",
            data: {
                user
            }
        })
    } catch (error) {
        res.send({
            status: "Failed",
            message: "User not found"
        })
    }
}