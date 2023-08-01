import { car } from "@/interfaces/car";

/*
    setter -> useState setter function
*/
async function getProducts(setter:Function) {
    const postData = {
      method: 'GET',
      headers: {
        'Content-Type':'application/json',
      },
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/products`, 
      postData
    );

    const response = await res.json();

    setter(response.products);
}

/*
    setter -> useState setter function
    id -> car id
*/
async function getProductById(setter:Function, id:number) {
    const postData = {
      method: 'GET',
      headers: {
        'Content-Type':'application/json',
      },
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/product/${id}`, 
      postData
    );

    const response = await res.json();
    
    setter(response.products);
}
  
/*
    setter -> useState setter function
    products -> useState value
    newCar -> new car object
*/
async function addProduct(setter:Function, products:car[], newCar:Partial<car>) {
  
  const postData = {
        method: 'POST',
        headers: {
        'Content-Type':'application/json',
        },
        body: JSON.stringify({
          car_make: newCar.car_make,
          car_model: newCar.car_model,
          car_year: newCar.car_model,
          car_motor: newCar.car_motor,
          car_color: newCar.car_color,
          car_gas: newCar.car_gas,
          car_price: newCar.car_price,
          car_img: newCar.car_img
        })
    };

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/products`, 
        postData
    );

    const response = await res.json();
    if (response.response.message !== 'Success') return;

    const newProduct = response.response.product;

    setter([
        ...products,
        newProduct
    ]);
}

/*
    setter -> useState setter function
    products -> useState value
    carId -> id of car in db
    valIdChange -> key of value we want to change
    valChangeTo -> new value
*/
async function  editProduct(setter:Function, products:car[], carId:number, valIdChange:string, valChangeTo:string|number) {    
    const car_ID = carId;
    const valueIdChange = valIdChange;
    const changeToValue = valChangeTo;

    const postData = {
        method: 'PUT',
        headers: {
        'Content-Type':'application/json',
        },
        body: JSON.stringify({
        car_id:car_ID,
        id_to_change:valueIdChange,
        new_value:changeToValue
        })
    };


    const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/products`, 
        postData
    );

    const response = await res.json();

    if (response.response.message !== 'Success') return;

    const updateProdId = parseFloat(response.response.product.car_id);
    const updateProdVal = response.response.product[valueIdChange];

    //update state
    const prodStateAfterUpdate = products.map((product) => {
        if(product.car_id === updateProdId) {
        const productUpdated = {
            ...product,
            [valueIdChange]: updateProdVal,
        };
        return productUpdated;
        } else {
        return {
            ...product,
        }
        }
    });

    setter(prodStateAfterUpdate)
}

/*
    setter -> useState setter function
    products -> useState value
    id -> carId
*/
async function  deleteProduct(setter:Function, products:car[], id:number) {    
        
    const postData = {
      method: 'DELETE',
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        car_id:id
      })
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/products`, 
      postData
    );

    const response = await res.json();

    if (response.response.message !== 'Success') return;

    const idToRemove = parseFloat(response.response.product_id);
    setter(products.filter(item => item.car_id !== idToRemove));
}


export { getProducts, getProductById, addProduct, editProduct, deleteProduct};