import model from '../../server/models';

const { User } = model;

class Users {
    static create(req, res) {
        const { name, username, email } = req.body
          return User
            .create({
              name,
              username,
              email
            })
            .then(userData => res.status(201).send({
              success: true,
              message: 'User successfully created',
              userData
            }))
            .catch(error => res.status(400).send("already exist"));
        }

    //list all user
    static listAll(req, res) {
        return User
          .findAll()
          .then(users => res.status(200).send(users))
          .catch(error => res.status(400).send(error));
      }

    //list one user user
    static list(req, res) {
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
            else{
                res.status(400).send("user id not found");
            }
        })
        .catch(error => res.status(400).send(error));
      }
      
    //update  user 
    static modify(req, res) {
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

    static delete(req, res) {
        return User
          .findByPk(req.params.id)
          .then(user => {
            if(!user) {
              return res.status(400).send({
              message: 'user Not Found',
              });
            }
            return user
              .destroy()
              .then(() => res.status(200).send({
                message: 'user successfully deleted'
              }))
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error))
      }
}

export default Users;
