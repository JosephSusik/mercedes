import AddCar from "@/components/AddCar";
import PreviewCar from "@/components/PreviewCar";
import { car } from "@/interfaces/car";
import { getProducts } from "@/lib/queries";
import { ClickAwayListener } from "@mui/material";
import { useEffect, useState } from "react"
import CircularProgress from '@mui/material/CircularProgress';

export default function index() {
  
  const [products, setProducts] = useState<car[]>([]);
  const [loading, setLoading] = useState(true)
  const [popup, setPopup] = useState(false)

  useEffect(() => {
    getProducts(setProducts)
      .then(()=>setLoading(false));
  },[])
  
  return (
    <main className="main">
      <header>
        <p>Všechny auta:</p>
        <button onClick={()=> setPopup(true)}>+ Přidat auto</button>
      </header>
      {loading?
        <div className="loading">
          <CircularProgress className="loader"/>
        </div>
      :
        <>
        {products.map((item) => {
          return(
              <PreviewCar 
                img={item.car_img[0]} 
                make={item.car_make} 
                model={item.car_model} 
                year={item.car_year} 
                price={item.car_price}
                motor={item.car_motor}
                id={item.car_id}
              />
          )
        })}
        </>
      }
      {popup &&
        <ClickAwayListener onClickAway={()=>setPopup(false)}>
          <div className="popup-car">
            <AddCar setter={setProducts} products={products} popupset={setPopup}/>                        
          </div>
        </ClickAwayListener>
      }
    </main>
  )
}
