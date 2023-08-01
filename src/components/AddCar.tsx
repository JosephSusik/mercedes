import { car } from "@/interfaces/car"
import { addProduct } from "@/lib/queries"
import { useState } from "react"

export default function AddCar({setter, products,popupset}:{setter:Function, products:car[], popupset:Function}) {
    
    const newCar:Partial<car> = {
        car_make: "",
        car_model: "",
        car_year: "",
        car_motor: "",
        car_color: "",
        car_gas: "",
        car_price: "",
        car_img: [1,2,3]
    }

    const [car, setCar] = useState<Partial<car>>(newCar)

    const handleAdd = () => {
        addProduct(setter, products, car)
        popupset(false);
    }

    const handleChangeMake = (event:React.FormEvent<HTMLInputElement>) => {
        setCar({...car, car_make: event.currentTarget.value});
    }
    const handleChangeModel = (event:React.FormEvent<HTMLInputElement>) => {
        setCar({...car, car_model: event.currentTarget.value});
    }
    const handleChangeYear = (event:React.FormEvent<HTMLInputElement>) => {
        setCar({...car, car_year: event.currentTarget.value});
    }
    const handleChangeMotor = (event:React.FormEvent<HTMLInputElement>) => {
        setCar({...car, car_motor: event.currentTarget.value});
    }
    const handleChangeColor = (event:React.FormEvent<HTMLInputElement>) => {
        setCar({...car, car_color: event.currentTarget.value});
    }
    const handleChangeGas = (event:React.FormEvent<HTMLInputElement>) => {
        setCar({...car, car_gas: event.currentTarget.value});
    }
    const handleChangePrice = (event:React.FormEvent<HTMLInputElement>) => {
        setCar({...car, car_price: event.currentTarget.value});
    }
    
    return(
        <div className="add-car">
            <h1>Přidat auto</h1>
            
            <div className="flex">
                <p>Značka:</p>
                <input type="text" 
                    value={car.car_make}
                    onChange={handleChangeMake}
                />
            </div>
            <div className="flex">
                <p>Model:</p>
                <input type="text" 
                    value={car.car_model}
                    onChange={handleChangeModel}    
                />
            </div>
            <div className="flex">
                <p>Rok výroby:</p>
                <input type="text" 
                    value={car.car_year}
                    onChange={handleChangeYear}    
                />
            </div>
            <div className="flex">
                <p>Objem motoru:</p>
                <input type="text" 
                    value={car.car_motor}
                    onChange={handleChangeMotor}
                />
            </div>
            
            <div className="flex">
                <p>Barva:</p>
                <input type="text" 
                    value={car.car_color}
                    onChange={handleChangeColor}
                />

            </div>
            
            <div className="flex">
                <p>Palivo:</p>
                <input type="text" 
                    value={car.car_gas}
                    onChange={handleChangeGas}
                />
            </div>
            <div className="flex">
                <p>Cena:</p>
                <input type="text" 
                    value={car.car_price}
                    onChange={handleChangePrice}
                />
            </div>
            <button onClick={handleAdd}>+ Přidat auto</button>
        </div>
    )
}