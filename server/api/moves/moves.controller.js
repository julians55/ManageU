const pool = require('../../config/database');

const getMoves = async (req, res) => {
    const response = await pool.query('SELECT * FROM public."moves"');
    console.log(response.rows);
    res.send(response.rows);
}

const getMoveById = async (req, res) => {
    const move = await pool.query('SELECT * FROM public."moves" WHERE "ID" = $1', [req.params.id]);
    res.send(move.rows);
}

const getMovesByUser = async (req, res) => {
    const response = await pool.query('SELECT * FROM public."moves" where "user" = $1',[req.params.id]);
    console.log(response.rows);
    res.send(response.rows);
}

const createMove = async (req, res)=>{
    const { type, category, amount, concept, date} = req.body;
    if (!type ) {
      res.status(401).json({message: "Bad request"});
    }
    console.log(req.body);
    const newMove = await pool.query(
        'INSERT INTO public."moves" ("type", "category", "amount", "concept", "date", "user") VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
        [req.body.type,req.body.category,req.body.amount,req.body.concept, req.body.date, req.body.user]
    );
    const user = await pool.query('SELECT * FROM public."user" WHERE "ID" = $1', [req.body.user]);
    const balance = parseFloat(user.rows[0].balance.slice(1));

    const newBalance = req.body.type=="income"? balance + req.body.amount: balance - req.body.amount;
    
    await pool.query(
        'UPDATE public."user" SET "balance" = $1 WHERE "ID" = $2',
        [newBalance, req.body.user]
    );
    console.log(newMove);
    res.send(
        {move: newMove.rows[0],
        newBalance: newBalance}
    );
    
}

const editMove = async (req, res) => {
    if(req.body.type){
        await pool.query('UPDATE public."moves" SET "type" = $1 WHERE "ID" = $2',[req.body.type, req.params.id] );
    }
    if(req.body.amount){
        await pool.query('UPDATE public."moves" SET "amount" = $1 WHERE "ID" = $2',[req.body.amount, req.params.id] );
    }
    if(req.body.category){
        await pool.query('UPDATE public."moves" SET "category" = $1 WHERE "ID" = $2',[req.body.category, req.params.id] );
    }
    if(req.body.concept){
        await pool.query('UPDATE public."moves" SET "concept" = $1 WHERE "ID" = $2',[req.body.concept, req.params.id] );
    }
    if(req.body.date){
        await pool.query('UPDATE public."moves" SET "date" = $1 WHERE "ID" = $2',[req.body.date, req.params.id] );
    }

    const move = await pool.query('SELECT * FROM public."moves" WHERE "ID" = $1', [req.params.id]);
    res.send(move.rows);
}

module.exports = {
    getMoves,
    getMoveById,
    createMove,
    getMovesByUser,
    editMove
}