const { RetrieveResultLocator } = require("jsforce");
const jwt = require("jsonwebtoken");
const salesforceUser = require("../models/salesforceUser");
module.exports = async(req, res, next)=>{
    const token = req.body.token;
    try{
        const decoded = await jwt.verify(token,process.env.JWT_SECRET);
        if(decoded.exp > Date.now() ){
            res.json({
                statusCode:400,
                payload:{
                    msg:"Session Expired!"
                }
            })
        }
        else{
            try{
                const result = await salesforceUser.find({"User_ID":decoded.data.User_ID});
                if(result.length > 0){
                    req.body.token = result[0].access_token;
                    req.body.url = result[0].instance_url;
                    next();
                }
            }
            catch(err){
                res.json({
                    statusCode:200,
                    payload:{
                        msg:"No Data found!"
                    }
                })
            }
            
        }
    }
    catch(err){
        res.json({
            statusCode:401,
            payload:{
                msg:err.message,
            }
        })
    }

}