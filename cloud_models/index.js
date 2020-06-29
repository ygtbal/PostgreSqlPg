import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';


const createDB = async (config) => {
    const basename = path.basename(__filename);
    let sequelize;
    const db = {};
    sequelize = await new Sequelize(
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
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
      await db[modelName].sync({}).then((result) => {
        console.log({r: result});
      }).catch((err) => {
        console.log({mes: err.toString()});
      })
    });
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
    return db;
}


module.exports = async (config) => {
  const cloudDB = await createDB(config);
  return cloudDB;
 }