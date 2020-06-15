module.exports = app => {
    const userprofils = require("../controllers/userprofil.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Userprofil
    router.post("/", userprofils.create);
  
    // Retrieve all Userprofils
    router.get("/", userprofils.findAll);
  
    // Retrieve all published Userprofils
    router.get("/published", userprofils.findAllPublished);
  
    // Retrieve a single Userprofil with id
    router.get("/:id", userprofils.findOne);
  
    // Update a Userprofil with id
    router.put("/:id", userprofils.update);
  
    // Delete a Userprofil with id
    router.delete("/:id", userprofils.delete);
  
    // Create a new Userprofil
    router.delete("/", userprofils.deleteAll);
  
    app.use('/api/userprofils', router);
  };