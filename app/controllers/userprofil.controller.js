const db = require("../models");
const Userprofil = db.userprofils;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const userprofil = {
    username: req.body.username,
    password: req.body.password,
    published: req.body.published ? req.body.published : false
  };

  // Save Tutorial in the database
  Userprofil.create(userprofil)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Userprofil."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const username = req.query.username;
    var condition = username ? { username: { [Op.iLike]: `%${username}%` } } : null;
  
    Userprofil.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving userprofils."
        });
      });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Userprofil.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Userprofil with id=" + id
        });
      });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Userprofil.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Userprofil was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Userprofil with id=${id}. Maybe Userprofil was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Userprofil with id=" + id
        });
      });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Userprofil.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Userprofil was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Userprofil with id=${id}. Maybe Userprofil was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Userprofil with id=" + id
        });
      });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Userprofil.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Userprofils were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all tutorials."
          });
        });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    Userprofil.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving userprofils."
      });
    });
};