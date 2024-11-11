import express from "express";
import cors from 'cors';
import mysql from 'mysql2';

const app = express();

app.use(cors())

app.use(express.json());

const db = mysql.createPool({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'mobilephones' 
}).promise();

app.get('/phones', async (req, res) => {
    
    try {
        const temp = await db.query('SELECT * FROM phones');
        const rows = temp[0];
        const fields = temp[1];
        res.status(200).json(rows);
    } catch (error) {
        console.error(`Error retrieving phones ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.post('/phones', async (req, res) => {
    try {
        let phoneData = [req.body.brand, req.body.model, req.body.price];

        if (phoneData[0].length < 1) {
            return res.status(400).json({ error: "Phone brand must have at least 1 character" });
        }
        if (phoneData[1].length < 1) {
            return res.status(400).json({ error: "Phone model must have at least 1 character" });
        }
        if (isNaN(phoneData[2]) || parseInt(phoneData[2]) <= 0) {
            return res.status(400).json({ error: "Phone price must be a valid number greater than 0" });
        }

        const [rows, fields] = await db.query('INSERT INTO phones (brand, model, price) VALUES (?,?,?)', phoneData);
        res.status(200).json({ message: 'Phone successfully added!'});


    } catch (error) {
        console.error(`Error retrieving phones ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.delete('/phones/:phoneId', async (req, res) => {
    try {
        let phoneId = parseInt(req.params.phoneId);
        const [rows, fields] = await db.query('DELETE FROM phones WHERE id =?', [phoneId]);
        if (rows.length === 0) {
            res.status(404).json({ error: "Phone not found" });
        } else {
            res.status(200).json({ message: "Phone successfully removed" });
        }
 
    } catch (error) {
        console.error(`Error retrieving phones ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.get('/phones/:phoneId', async (req, res) => {
    try {
        let phoneId = parseInt(req.params.phoneId);
        const [rows, fields] = await db.query('SELECT id, brand, model, price FROM phones WHERE id =?', [phoneId]);
        if (rows.length == 1){
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({error: 'There is no phone with this id.'});
        }
    } catch (error) {
        console.error(`Error retrieving phones ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.listen(3000);
