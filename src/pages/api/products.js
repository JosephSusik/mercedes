import { query } from '@/lib/db'

export default async function handler(req, res) {
    let message;

    if (req.method === 'GET') {
        const products = await query ({
            query: "SELECT * FROM car",
            values: []
        })
        
        res.status(200).json({ products: products })
    }

    if(req.method === 'POST') {
        const carMake = req.body.car_make;
        const carModel = req.body.car_model;
        const carYear = req.body.car_year;
        const carMotor = req.body.car_motor;
        const carColor = req.body.car_color;
        const carGas = req.body.car_gas;
        const carPrice = req.body.car_price;
        const carImg = req.body.car_img;
        
        const addProducts = await query ({
            query: "INSERT INTO car (car_make, car_model, car_year, car_motor, car_color, car_gas, car_price, car_img) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            values: [carMake, carModel, carYear, carMotor, carColor, carGas, carPrice, carImg]
        })
        
        if(addProducts.insertId) {
            message = "Success"
        } else {
            message = "Error"
        }

        let product = {
            car_id: addProducts.insertId,
            car_make: carMake,
            car_model: carModel,
            car_year: carYear,
            car_motor: carMotor,
            car_color: carColor,
            car_gas: carGas,
            car_price: carPrice,
            car_img: carImg
        }
        res.status(200).json({ response: {message: message, product: product}});
    }

    if(req.method === 'PUT') {
        const carId = req.body.car_id;
        const changeIdentifier = req.body.id_to_change;
        const newValue = req.body.new_value;

        const editProducts = await query ({
            query: `UPDATE car SET ${changeIdentifier} = ? WHERE car_id = ?`,
            values: [newValue, carId]
        });

        if(editProducts.affectedRows) {
            message = "Success"
        } else {
            message = "Error"
        }
        
        let product = {
            car_id: carId,
            [changeIdentifier]: newValue 
        }

        res.status(200).json({ response: {message: message, product: product}});
    }

    if(req.method === 'DELETE') {
        const carId = req.body.car_id;
        const deleteProduct = await query ({
            query: 'DELETE FROM car WHERE car_id = ?',
            values: [carId]
        });

        if(deleteProduct.affectedRows) {
            message = "Success"
        } else {
            message = "Error"
        }

        res.status(200).json({ response: {message: message, product_id: carId}});
    }
}