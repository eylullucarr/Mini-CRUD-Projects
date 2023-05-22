
const pool=require("./db")
const queries=require("./querys")

//dataları çağırır
const getUsers=(req,res)=>{
    pool.query(queries.getUsers,(error, results) => {
        if (error) {
          res.status(500).json({ error: 'Database could not be accessed.' });
        } else {
          res.status(200).json(results.rows);
        }
      });
}

//idye göre dataları getirir
const getUsersById=(req,res)=>{
  const id= parseInt(req.params.id);
  pool.query(queries.getUsersGetbyId,[id],(error, results) => {
      if (error) {
        res.status(500).json({ error: 'Database could not be accessed.' });
      } else {
        res.status(200).json(results.rows);
      }
    });
}

//data ekler
const addUser=(req,res)=>{
  const {name,surname,job}=req.body
  pool.query(queries.addUser,[name,surname,job],(error, results) => {
      if (error) {
        res.status(500).json({ error: 'Database could not be accessed.' });
      } else {
        res.status(200).json({message: 'User succesfully added.' });
      }
    });
}

//data günceller
const updateUser=(req,res)=>{
  const id= parseInt(req.params.id);
  const {name,surname,job}=req.body
//güncellencek data var mı diye kontrol ediyor 
  pool.query(queries.getUsersGetbyId,[id],(error, results) => {
    const noUserFound=!results.rows.length
    //sonuç 0 dönerse  (!results.rows.length) ile true olarak alıyor ve aşağıda databasede öyle bir data olmadığını söylüyor,eğer varsa da güncelleme işlemini yapıyor
    if (noUserFound) {
      res.send("User does not exist in the database.")
    } else {
      pool.query(queries.updateUser,[name,surname,job,id],(error, results) => {
        if (error) {
          res.status(500).json({ error: 'Database could not be accessed.' });
        } else {
          res.status(200).json({message: 'User succesfully updated.' });
        }
      });
    }
  });
}

//data siler
const deleteUser=(req,res)=>{
  const id= parseInt(req.params.id);
  //silinecek data var mı diye kontrol ediyor 
  pool.query(queries.getUsersGetbyId,[id],(error, results) => {
    const noUserFound=!results.rows.length
      //sonuç 0 dönerse (!results.rows.length) ile  true olarak alıyor ve aşağıda databasede öyle bir data olmadığını söylüyor,eğer varsa da silme işlemini yapıyor
    if (noUserFound) {
      res.send("User does not exist in the database.")
    } else {
      pool.query(queries.removeUser,[id],(error, results) => {
        if (error) {
          res.status(500).json({ error: 'Database could not be accessed.' });
        } else {
          res.status(200).json({message: 'User succesfully deleted.'});
        }
      });
    }
  });
}


module.exports = {
    getUsers,
    getUsersById,
    addUser,
    deleteUser,
    updateUser
}