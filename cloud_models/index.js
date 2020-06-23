import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

module.exports = (config) => {
  const basename = path.basename(__filename);
  let sequelize;
  const db = {};
  sequelize = new Sequelize(
       config.database, config.username, config.password, config
    );
  
  fs
    .readdirSync(__dirname)
    .filter((file) => {
      return (file.indexOf('.') !== 0) && 
             (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach((file) => {
      const model = sequelize.import(path.join(__dirname, file));
      db[model.name] = model;
    });
  
  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
    db[modelName].sync({force: true}).then((result) => {
      console.log({r: result});
    }).catch((err) => {
      console.log({mes: err.toString()});
    })
  });
  
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  return db;
}