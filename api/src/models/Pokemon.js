const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    hp:{
      type: DataTypes.INTEGER,
    },
    attack:{
      type: DataTypes.INTEGER
    },
    defense:{
      type: DataTypes.INTEGER
    },
    speed:{
      type: DataTypes.INTEGER
    },
    height:{
      type: DataTypes.FLOAT,
    },
    weight:{
      type: DataTypes.FLOAT,
    },
    image:{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'https://as01.epimg.net/meristation/imagenes/2020/02/14/noticias/1581656735_610153_1581656812_noticia_normal.jpg',
    }
  },{
    timestamps:false
  });
};
