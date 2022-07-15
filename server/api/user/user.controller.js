const crypto = require('crypto');
const pool = require('../../config/database');
const bcrypt = require('bcrypt');

const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM public."user"');
    console.log(response.rows);
    res.send(response.rows);
}

const getUserById = async (req, res) => {
    const user = await pool.query('SELECT * FROM public."user" WHERE "email" = $1', [req.params.id]);
    res.send(user.rows);
}

const createUser = async (req, res)=>{
    const { name, password, email} = req.body;
    if (!name || !password || !email) {
      res.status(400).json({message: "Bad request"});
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    const newUser = await pool.query(
        'INSERT INTO public."user" (name, balance, email, password) VALUES ($1,$2,$3,$4) RETURNING *',
        [req.body.name,0,req.body.email,hash]
    );
    res.send({user: newUser.rows[0]});
}

module.exports = {
    getUsers,
    getUserById,
    createUser
}