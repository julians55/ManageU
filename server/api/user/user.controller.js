const pool = require('../../config/database');

const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM public."user"');
    console.log(response.rows);
    res.send(response.rows);
}

module.exports = {
    getUsers
}