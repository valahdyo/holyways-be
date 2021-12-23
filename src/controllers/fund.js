const { User, Fund, Transaction } = require("../../models");

exports.getFunds = async (req, res) => {
  try {
    const data = await Fund.findAll({
      include: {
        model: User,
        as: "userDonate",
        through: {
          model: Transaction,
          as: "transaction",
          attributes: ["donateAmount", "status", "proofAttachment"],
        },
        attributes: {
            exclude: ["createdAt", "updatedAt"],
          }
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      fund: data,
    });
  } catch (error) {
    console.log(error);
    res.send({ status: "failed", msg: "get fund error" });
  }
};
