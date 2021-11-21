require('dotenv').config();
const { Router } = require('express');
const { Type } = require('../db.js');
const router = Router(); 
const axios = require('axios');

const {
  API_URL,
} = process.env;

router.get('/', async (req, res, next) => {
  //Type.findAll()
  let types;
   try{
     types = Type.findAll({
       attributes: ['name']
     });
     if(!types.length){
      types = await axios.get(`${API_URL}type`)
      types = types.data.results.map(type=>{
        return {name: type.name}
      })
      //console.log(types)
      Type.bulkCreate(types)

     }
     if(types.length > 0) return res.json(types).status(200)
     else res.send('Types not found').status(400)

   }catch(e){
      next(e);
   }
});

module.exports = router;