const { User, Fund, Transaction } = require("../../models");

//Get all funds
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
      status: 'success',
      data: {
        fund: data
      }
    })
  } catch (error) {
    console.log(error);
    res.send({ status: "failed", msg: "get fund error" });
  }
};

// Add Fund
exports.addFund = async (req, res) => {
  try {
    const newFund = await Fund.create(req.body)
    const data = await Fund.findOne({
      where: {id: newFund.id},
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
      }
    })
    res.send({
      status: 'success',
      data: {
        fund: data
      }
    });
  } catch (error) {
    console.log(error)
    res.status(401).send({status: 'failed', msg: 'add fund error'})
  }
}

//Get Detail Fund
exports.getFund = async (req, res) => {
  const { id } = req.params
  try {
    const data = await Fund.findOne({
      where: {id},
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
      }
    })
    res.send({
      status: 'success',
      data: {
        fund: data
      }
    });
  } catch (error) {
    console.log(error)
    res.status(401).send({status: 'failed', msg: 'get fund error'})
  }
}

//Edit Fund
exports.updateFund = async (req, res) => {
  try {
    const { id } = req.params
    await Fund.update(req.body, {
      where: {id},
    })
    const data = await Fund.findOne({
      where: {id},
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
      }
    })
    res.send({
      status: 'success',
      data: {
        fund: data
      }
    });
  } catch (error) {
    console.log(error)
    res.status(401).send({status: 'failed', msg: 'edit fund error'})
  }
}

//Delete Fund
exports.deleteFund = async (req, res) => {
  const {id} = req.params
  try {
      const user = await Fund.destroy({
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
          message: `Cannot delete fund with id ${id}`
      })
  }
}

//Edit user donate by fund
exports.updateUserDonate = async (req, res) => {
  try {
    const { idFund, idUser } = req.params
    await Transaction.update(req.body, {
      where: {idFund, idUser}
    })
    const data = await Fund.findOne({
      where: {id:idFund},
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
      }
    })
    res.send({
      status: 'success',
      data: {
        fund: data
      }
    });
  } catch (error) {
    console.log(error)
    res.status(401).send({status: 'failed', msg: 'update donate by fund error'})
  }
}