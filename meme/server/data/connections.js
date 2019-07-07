const express = require('express');
const Pool = require('pg').Pool;
const app = express();


//id autoincrement, name varchar(30), url varchar(30)
//5432

//6667

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'memeapi',
  password: 'password',
  port: 5432
});


//GET: /memes/:ID

const getMemeById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM memes WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}



//GET: MEMES/

const getAllMemes = (request, response) =>{
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM memes ORDER BY id asc', (error, results)=>{
        if (error){
            throw error
        }
        response.status(200).json(results.rows);
    })
}




//POST /memes

const createMeme = (request, response) => {
    const { name, url } = request.body
  
    pool.query('INSERT INTO memes (name, url) VALUES ($1, $2)', [name, url], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Meme added with ID: ${result.insertId}`)
    })
  }

  //DELETE: /memes/x

const deleteMeme = ()=>{
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM memes WHERE id = $1', [id], (error, results)=>{
    if (error)
    {
      throw error;
    }

    response.status(200).send(`Meme with ID: ${id} deleted`)

  })
}



module.exports = {
    getMemeById,
    deleteMeme,
    createMeme,
    getAllMemes
}
