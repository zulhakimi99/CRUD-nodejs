module.exports = (sequelize, Sequelize) => {
    const Userprofil = sequelize.define("userprofil", {
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Userprofil;
  };