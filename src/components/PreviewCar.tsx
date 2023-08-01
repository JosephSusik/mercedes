import Link from "next/link"

interface previewCarInterface {
    img: number,
    make: string,
    model: string,
    year:string,
    price:string,
    motor:string
    id:number
}


export default function PreviewCar(props:previewCarInterface) {

    let CzechCrown = new Intl.NumberFormat('cs-CZ', {
        style: 'currency',
        currency: 'CZK',
    });

    return(
        <Link href={'/car/'+props.id} className='preview-car'>
            <div className='img'>
                <img src={'img/'+props.img+'.jpg'} alt="" />
            </div>
            <div className='info'>
                <h1>{props.make} {props.model}</h1>               
                <p>V provozu od: {props.year}</p>
                <p>Objem motoru: {props.motor} cm<sup>3</sup></p>
                <p className="price">{CzechCrown.format(Number(props.price))}</p>
            </div>
        </Link>
    );
}