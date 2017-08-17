var membersModel = require('../models').Member
var hash = require('object-hash')
var jwt = require('jsonwebtoken')

var signUp = function (req, res) {
  membersModel.create({
    name: req.body.name,
    email: req.body.email,
    password: hash(req.body.password)
  })
  .then(function (member) {
    res.send(member)
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

var signIn = function (req, res) {
  membersModel.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(function (member) {
    if (!member) {
      res.status(404).send({msg: `${req.body.email} not found!`})
    } else {
      if (member.password === hash(req.body.password)) {
        res.send({token: jwt.sign({member_id: member.id}, process.env.JWT)})
      } else {
        res.send({msg: `Password not match`})
      }
    }
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

var getAllUsers = function (req, res) {
  membersModel.findAll()
  .then(function (members) {
    if (!members) {
      res.status(404).send({msg: 'No members currently'})
    } else {
      res.send(members)
    }
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

var deleteMember = function (req, res) {
  membersModel.findOne({
    where: {
      id: req.params.member_id
    }
  })
  .then(function (member) {
    if (!member) {
      res.status(404).send({msg: `Member with id ${req.params.member_id} not found`})
    } else {
      member.destroy()
      .then(function () {
        res.send({msg: `Member deleted`})
      })
      .catch(function (err) {
        res.status(500).send(err)
      })
    }
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

var updateMember = function (req, res) {
  membersModel.findOne({
    where: {
      id: req.params.member_id
    }
  })
  .then(function (member) {
    if (!member) {
      res.status(404).send({msg: `Member with id ${req.params.member_id} not found`})
    } else {
      membersModel.update({
        name: req.body.name || member.name,
        email: req.body.email || member.email,
        password: hash(req.body.password) || member.password
      })
      .then(function () {
        res.send({msg: 'Member updated'})
      })
      .catch(function (err) {
        res.status(500).send(err)
      })
    }
  })
  .catch(function (err) {
    res.status(500).send(err)
  })
}

module.exports = {
  signUp,
  signIn,
  getAllUsers,
  deleteMember,
  updateMember
}
