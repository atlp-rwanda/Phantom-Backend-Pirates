import User from '../models/user';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

export async function getUsers(req, res) {
try{
   let getdata = await User.findAll(req.body);
   if(getdata){
        res.json({
            success: true,
            message:"User Fetch Successfully",
            data:getdata
        });
    }
}catch(err){
    console.log(err);
    res.status(500).json({
         success: false,
         message:"Something went wrong!"
    })
}
}

  export async function getUser(req, res) {
    try{
        const id = req.params.id;
        User.findByPk(id)
        .then(createdata => {
            if(createdata){
                res.json({
                   success: true,
                   message:"User fetch Successfully",
                   data:createdata
               });
            }
        })
        
     }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message:"Something went wrong!"
       })
    }
  }


export async function createUser(req, res) {
    try{
       let checkdata = await User.findOne({where:{email:req.body.email}});
       if(checkdata){
            res.json({
                message:"Already Exist",
                data:checkdata
            });
       }else{
           let createdata = await User.create(req.body, {fields: ['name', 'email', 'password', 'phone', 'profile_pic']});
           if(createdata){
                res.json({
                  success: true,
                  message:"User Created Successfully", 
                  data:createdata
                });
           }
       }
     }catch(err){
         console.log(err);
         res.status(500).json({
             success: false,
             message:"Something went wrong!"
         })
     }
}

export async function deleteUser(req, res) {
    try{
        const id = req.params.id;
        //let deletedata = await User.destroy({where:{id:req.body.id}});
        User.destroy({
            where: { id: id}
        })
        .then (deletedata => {
            if (deletedata == 1){
                res.send({
                    message: "User was deleted successfully!"
                });
            }
            else {
                res.send({
                  message: `Cannot delete User with id=${id}. Maybe user was not found!`
                });
              }
        })
    }catch(err){
        res.status(500).send({
            message: "Could not delete user" 
          });
    }
}

export async function updateUsers(req, res) {
    try{
        const id = req.params.id;
        User.update(req.body, {
          where: { id: id }
        })
        .then (finddata => {
            if (finddata == 1){
                res.send({
                    success: true,
                    message:"User Updated Successfully",
                    data:finddata
                });
            }
            else {
                res.send({
                  message: `Cannot delete User with id=${id}. Maybe user was not found!`
                });
              }
        })
     }catch(err){
         console.log(err);
         res.status(500).json({
             success: false,
             message:"Something went wrong!"
         })
     }
}
