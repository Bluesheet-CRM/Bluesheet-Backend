const express = require("express");
var jsforce = require("jsforce");
const axios = require("axios");
const router = express.Router();

  router.post("/email", async (req, res) => {

    var conn = new jsforce.Connection({
        instanceUrl : req.body.url,
        accessToken : req.body.token
      });

    try {
      const data = await conn.query("SELECT Id FROM EmailMessage");
      res.json({
        statusCode: 200,
        payload: {
          data: data,
        },
      });
    } catch (err) {
      console.log(err.message);
      res.json({
        statusCode: 500,
        payload: {
          msg: "Server Error",
        },
      });
    }
  });

router.post('/mutipleEmailMessage',async(req,res)=>{

    
    var conn = new jsforce.Connection({
        instanceUrl : req.body.url,
        accessToken : req.body.token
      });

    try{
        const result = await conn.sobject("EmailMessage").retrieve(req.body.id);
        res.json({
            statusCode:200,
            payload:{
                data: result
            }
        })

    }catch(err){
        res.json({
            statusCode:500,
            payload:{
                msg:"Server Error"
            }
        })
    }
    
})
router.post("/sendEmail", async(req,res)=>{
    console.log(req.body);

    axios({
        method:"post",
        url:`${req.body.url}/services/data/v50.0/actions/standard/emailSimple`,
        data:req.body.data,
        headers:{
          Authorization: `Bearer ${req.body.token}`
        }
      })
      .then((data)=>{
        res.json({
          statusCode:200,
          payload:{
              data:"Success"
          }
          
      });
      })
      .catch((err)=>{
       res.send(err.message);
      })
})


router.post("/addEmail", async(req,res)=>{
    console.log(req.body)

        
    var conn = new jsforce.Connection({
        instanceUrl : req.body.url,
        accessToken : req.body.token
      });
    try{
        const data = await conn.sobject("EmailMessage").create(req.body.emailMessage)
        res.json({
            statusCode:200,
            payload:{
                data:data
            }
            
        });
    }catch(err){
        console.log(err)
        res.json({
            statusCode:500,
            payload:{
                msg:"Server Error"
            }
        })
    }
})

router.post("/updateEmail", async(req,res)=>{
    console.log(req.body)
    try{
        const data = await conn.sobject("EmailMessage").update(req.body);
          res.json({
            statusCode:200,
            payload:{
                data:data
            }
        });
    }
    catch(err){
        console.log(err)
        res.json({
            statusCode:500,
            payload:{
                msg:"Server Error"
            }
        })
    }   
})

router.delete('/deleteEmailMessage/:id',async(req,res)=>{

    var conn = new jsforce.Connection({
        instanceUrl : req.body.url,
        accessToken : req.body.token
      }); 
  console.log(req.params.id)
  try{
      const data = await conn.sobject("EmailMessage").destroy(req.params.id);
          res.json({
              statusCode:200,
              payload:{
                  data:data
              }
          });
  }
  catch(err){
      res.json({
          statusCode:500,
          payload:{
              msg:"Server Error"
          }
      })
  }
  
})





module.exports = router;


