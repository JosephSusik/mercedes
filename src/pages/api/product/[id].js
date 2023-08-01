import { query } from '@/lib/db'

//const superagent = require("superagent");

export default async function handler(req, res) {
    const id = Number(req.query.id);

    if (isNaN(id) || typeof id !== "number") {
        res.status(400).send("Invalid request!!");
    }
    
    if (req.method === 'GET') {
        const products = await query ({
            query: "SELECT * FROM car WHERE car_id = ?",
            values: [id]
        })
        
        res.status(200).json({ products: products })
    }
}