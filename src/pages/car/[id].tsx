import DisplayCar from '@/components/DisplayCar';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { car } from "@/interfaces/car";
import { getProductById } from '@/lib/queries';
import { CircularProgress } from '@mui/material';

export default function car() {
    const router = useRouter();
    const id = Number(router.query.id);

    const [products, setProducts] = useState<car[]>([]);
    const [loading, setLoading] = useState(true)

   
    useEffect(() => {
        getProductById(setProducts, id).then(()=>setLoading(false));
    },[id])
    
    if (isNaN(id) || typeof id !== "number") {
        return <p>ERROR</p>
    }

    return (
        <div className='car-id'>
            {loading?
                <div className="loading">
                    <CircularProgress className="loader"/>
                </div>
            :
                <DisplayCar props={products} setter={setProducts}  />
            }
        </div>
    );
}