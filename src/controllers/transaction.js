const Joi = require('joi')
const { User, Fund, Transaction } = require("../../models");
const IMAGE_PATH = `http://localhost:3000/uploads/`


//Add Transaction
exports.addTransaction = async (req, res) => {
    //Validating
    const schema = Joi.object({
      status: Joi.string().required(),
      donateAmount: Joi.number().required(),
    });
    const { error } = schema.validate(req.body);
  
    if (error)
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
  
    try {

      await Transaction.create({
        ...req.body, 
        proofAttachment:req.file.filename,
        idUser: req.id.id,
        idFund: req.params.idFund
      })
      let data = await Fund.findOne({
        where: {id: req.params.idFund},
        include: {
          model: User,
          as: "userDonate",
          through: {
            model: Transaction,
            as: "transaction",
            attributes: ["donateAmount", "status", "proofAttachment"],
          },
          attributes: {
              exclude: ["password", "createdAt", "updatedAt"],
            }
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        }
      })
      
      
      data = JSON.parse(JSON.stringify(data))
      data.userDonate.map(item => {
          item.transaction.proofAttachment = IMAGE_PATH + req.file.filename
          return {
             ...item,
          }
      })
      res.status(200).send({
        status: 'success',
        data: {
          fund: {...data, thumbnail:IMAGE_PATH+data.thumbnail}
        }
      });
    } catch (error) {
      console.log(error)
      res.status(500).send({status: 'failed', msg: 'Add transaction fund error'})
    }
  }