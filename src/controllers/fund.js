const { User, Fund, Transaction } = require("../../models");

const Joi = require('joi');
const IMAGE_PATH = `http://localhost:3000/uploads/`
//Get all funds
exports.getFunds = async (req, res) => {
  try {
    let data = await Fund.findAll({
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

    data = JSON.parse(JSON.stringify(data))
    data = data.map(item => {
      return {
        ...item,
        thumbnail: IMAGE_PATH + item.thumbnail
      }
    })
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
  //Validating
  const schema = Joi.object({
    title: Joi.string().required(),
    goal: Joi.number().required(),
    description: Joi.string().min(5).required(),
  });
  const { error } = schema.validate(req.body);

  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });

  try {
    const newFund = await Fund.create({...req.body, thumbnail:req.file.filename})
    let data = await Fund.findOne({
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

    
    data = JSON.parse(JSON.stringify(data))
    res.send({
      status: 'success',
      data: {
        fund: {...data, thumbnail:IMAGE_PATH+data.thumbnail}
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
    let data = await Fund.findOne({
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
    data = JSON.parse(JSON.stringify(data))
    res.send({
      status: 'success',
      data: {
        fund: {...data, thumbnail: IMAGE_PATH + data.thumbnail}
      }
    });
  } catch (error) {
    console.log(error)
    res.status(401).send({status: 'failed', msg: 'get fund error'})
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

//Edit Fund
exports.updateFund = async (req, res) => {
  try {
    const { id } = req.params
    console.log(req.file)
    if (req.file) {
      await Fund.update({...req.body, thumbnail:req.file.filename}, {
        where: {id},
      }) 
    } else {
      await Fund.update(req.body, {
        where: {id},
      })
    }
    let data = await Fund.findOne({
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
    data = JSON.parse(JSON.stringify(data))
    res.send({
      status: 'success',
      data: {
        fund: {...data, thumbnail: IMAGE_PATH + data.thumbnail}
      }
    });
  } catch (error) {
    console.log(error)
    res.status(401).send({status: 'failed', msg: 'edit fund error'})
  }
}

//Edit user donate by fund
exports.updateUserDonate = async (req, res) => {
  try {
    const { idFund, idUser } = req.params
    await Transaction.update(req.body, {
      where: {idFund, idUser}
    })
    let data = await Fund.findOne({
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
    data = JSON.parse(JSON.stringify(data))
    res.send({
      status: 'success',
      data: {
        fund: {...data, thumbnail: IMAGE_PATH + data.thumbnail}
      }
    });
  } catch (error) {
    console.log(error)
    res.status(401).send({status: 'failed', msg: 'update donate by fund error'})
  }
}