const pool = require('../../config/database');

const getMoves = async (req, res) => {
    const response = await pool.query('SELECT * FROM public."moves" WHERE "ID" = $1', [req.body.user]);
    res.send(response.rows);
}

const getLastMoves = async (req, res) => {
    const response = await pool.query('SELECT *FROM public."moves" order by "ID" desc limit 10');
    res.send(response.rows)
}
const getMoveById = async (req, res) => {
    try{
        const move = await pool.query('SELECT * FROM public."moves" WHERE "ID" = $1', [req.params.id]);
        res.send(move.rows);
    }catch{
        res.send("There is no movement under this ID")
    }
}

const getMovesByUser = async (req, res) => {
    const response = await pool.query('SELECT * FROM public."moves" where "user" = $1',[req.params.id]);
    console.log(response.rows);
    res.send(response.rows);
}

const createMove = async (req, res)=>{
    try {
        const newMove = await pool.query(
            'INSERT INTO public."moves" ("type", "category", "amount", "concept", "date", "user") VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
            [req.body.type,req.body.category,req.body.amount,req.body.concept, req.body.date, req.body.user]
        );
        const user = await pool.query('SELECT * FROM public."user" WHERE "ID" = $1', [req.body.user]);
        let balance;
        if(user.rows[0].balance[0]=='-'){
            balance = parseFloat(user.rows[0].balance.slice(2))*-1;
        }else{
            balance = parseFloat(user.rows[0].balance.slice(1));
        }
        console.log(balance);
        const newBalance = req.body.type=="income"? balance + req.body.amount: balance - req.body.amount;
        console.log(newBalance);
        await pool.query(
            'UPDATE public."user" SET "balance" = $1 WHERE "ID" = $2',
            [newBalance, req.body.user]
        );
        console.log(newMove);
        res.send(
            {move: newMove.rows[0],
            newBalance: newBalance}
        );
    }catch{
        res.send("Invalid request");
    }
    
}

const editMove = async (req, res) => {
    try{
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
    }catch{
        res.send("Invalid request");
    }   
}

const deleteMove = async (req, res) => {
    try{
        await pool.query('DELETE FROM public."moves" WHERE "ID" = $1', [req.params.id])
        res.send("Movement deleted succesfully");
    }catch{
        res.send("Movement ID does not exist");
    }
}

module.exports = {
    getMoves,
    getLastMoves,
    getMoveById,
    createMove,
    getMovesByUser,
    editMove,
    deleteMove
}