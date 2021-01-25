const bodyParser = require('body-parser');
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function(req , file , cb){
    cb(null , './uploads/');
  },
  filename: function (req , file , cb){
    cb(null , file.originalname);
  }
});

const upload = multer({storage : storage});

const db = knex({
    client: 'pg',
    connection: {
      host:'127.0.0.1',
      user:'postgres',
      password:'test',
      database:'utBook',
    }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

// app.post('/registerAdmin',(req,res)=>{
//     const {username , password} = req.body;
//     const hash = bcrypt.hashSync(password);
//     db.transaction(trx=>{
//         trx.insert({
//             hash:hash,
//             username:username,
//         })
//         .into('login')
//         .returning('username')
//         .then(loginName=>{
//             return trx('users')
//             .returning('*')
//             .insert({
//                 username: loginName[0],
//             })
//             .then(user=>{
//                 res.json(user[0]);
//             })
//         })
//         .then(trx.commit)
//         .catch(trx.rollback)
//     })
//     .catch(err=> res.status(400).json('unable to register'));
// })

app.post('/signIn',(req, res)=>{
    const {username,password} = req.body;
    if(!username || !password){
        return res.status(400).json('incorrect form submission');
    }
    db.select('username' , 'hash').from('login')
    .where('username' , '=' , username)
    .then(data=>{
        const isValid = bcrypt.compareSync(password , data[0].hash);
        if(isValid){
            return db.select('*').from('users')
            .where('username', '=', username)
            .then(user => {
              res.json(user[0])
            })
            .catch(err => res.status(400).json('unable to get user'))
        } else {
          res.status(400).json('wrong credentials')
        }
    })
    .catch(err => res.status(400).json('wrong credentials'));
})

var p ='';

app.post('/captureBook' ,upload.single('myFile'), (req,res)=>{
  p = req.file.path;
  res.send('book captured !!');
})

app.post('/captureBook2' , (req,res)=>{
  const {name,genre,college,writer,description} = req.body;
  fs.readFile('genre.txt' , (err,data)=>{
    if(err){
      console.log(err);
    }
    if(! data.includes(genre)){
      fs.appendFile('genre.txt' ,genre+'\n', (err)=>{
        if(err){
          console.log(err)
        }
      })
    }
  })

  db.schema.hasTable(genre).then(exists=>{
    if(exists){
      return db(genre).insert({
        name:name,
        writer: writer,
        description :description,
        path: p,
      });
    }
    else{
      return db.schema.createTable(genre, table=>{
        table.string('name');
        table.string('writer');
        table.string('description');
        table.string('path');
      }).then(()=>{
        return db(genre).insert({
          name:name,
          writer: writer,
          description :description,
          path: p,
        });
      })
    }
  });
  res.send('information captured !!');
})

app.get('/returnGenre' , (req,res)=>{
  const final = fs.readFileSync('genre.txt').toString();
  res.json(final);
})

app.post('/returnBooks' , (req,res)=>{
  const {dars} = req.body;
  db.select('name' , 'writer' , 'description' , 'path').from(dars)
  .then(data=>res.json(data))
})

app.listen(3001);