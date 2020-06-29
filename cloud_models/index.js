import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';


const createDB = async (config) => {
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
    
     await Object.keys(db).forEach(async (modelName) => {
       console.log('foreach running');
      if (db[modelName].associate) {
        console.log('table created ONE');
         db[modelName].associate(db);
      }
     });
      db.sequelize = sequelize;
      db.Sequelize = Sequelize;
      console.log('db created')
      return db;
    }


module.exports = (config) => {
  const cloudDB = createDB(config);
  return cloudDB;
 }