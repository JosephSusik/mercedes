import { car } from "@/interfaces/car";

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

import { useState } from "react";
import { deleteProduct, editProduct } from "@/lib/queries";
import Router from 'next/router';


export default function DisplayCar({props, setter}:{props:car[], setter:Function}) {
    
    const [popup, setPopup] = useState(false);
    const [name, setName] = useState('')
    const [value, setValue] = useState<string|number>()
    const [change, setChange] = useState('')
    const [input, setInput] = useState('');
    const [deletePop, setDeletePop] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(0);

    const goToSlide = (slideIndex: any) => {
        setCurrentIndex(slideIndex);
    };
    

    let CzechCrown = new Intl.NumberFormat('cs-CZ', {
        style: 'currency',
        currency: 'CZK',
    });

    const fillPopup = (n:string, v:string|number, c:string) => {setName(n); setValue(v); setChange(c)}
    
    const handleInput = (event:React.FormEvent<HTMLInputElement>) => {
        setInput(event.currentTarget.value);
    }

    const handleDelete = () => {
        deleteProduct(setter, props, props[0].car_id);
        Router.push('/');
    }

    return(
        <div className="display-car-wrapper">
            <div className="display-car">
                <div className="img">
                    <div className="big-img">
                        <img src={'../../img/'+props[0].car_img[currentIndex]+'.jpg'} alt="" />
                    </div>
                    <div className="img-mini">                
                        {props[0].car_img.map((id, index) => {
                            return(
                                <div onClick={()=>goToSlide(index)} className="img-mini-point">
                                    <img src={'../../img/'+props[0].car_img[index]+'.jpg'} alt="" />
                                </div>
                            )
                        })}
                    </div>
                    
                </div>
                <div className="data">
                    <h1>
                        <span>{props[0].car_make}</span>
                        <EditOutlinedIcon className="icon" 
                            onClick={()=>{setPopup(true);
                            fillPopup('Značka', props[0].car_make, 'car_make')}}/>
                    </h1>
                    <h1>
                        <span>{props[0].car_model}</span>
                        <EditOutlinedIcon className="icon" 
                            onClick={()=>{setPopup(true);
                            fillPopup('Model', props[0].car_model, 'car_model')}}/>
                    </h1>
                    <p>
                        V provozu od: 
                        <span>{props[0].car_year}</span>
                        <EditOutlinedIcon className="icon" 
                            onClick={()=>{setPopup(true);
                            fillPopup('V provozu od', props[0].car_year, 'car_year')}}/>
                    </p>
                    
                    <p>
                        Objem motoru: 
                        <span>{props[0].car_motor}</span> 
                        <span>cm<sup>3</sup></span>
                        <EditOutlinedIcon className="icon" 
                            onClick={()=>{setPopup(true);
                            fillPopup('Objem motoru', props[0].car_motor, 'car_motor')}}/>
                    </p>
                    
                    <p>
                        Palivo: 
                        <span>{props[0].car_gas}</span>
                        <EditOutlinedIcon className="icon" 
                            onClick={()=>{setPopup(true);
                            fillPopup('Palivo', props[0].car_gas, 'car_gas')}}/>
                    </p>

                    <p>
                        Barva: 
                        <span>{props[0].car_color}</span>
                        <EditOutlinedIcon className="icon" 
                            onClick={()=>{setPopup(true);
                            fillPopup('Barva', props[0].car_color, 'car_color')}}/>
                    </p>
                    <p>
                        Cena:
                        <span>{CzechCrown.format(Number(props[0].car_price))}</span><EditOutlinedIcon className="icon" 
                            onClick={()=>{setPopup(true);
                            fillPopup('Cena', props[0].car_price, 'car_price')}}/>
                    </p>
                    
                    <button className="delete"
                        onClick={()=>setDeletePop(true)}
                    ><DeleteOutlineOutlinedIcon />Odstranit auto</button>
                </div>
            </div>
            {popup &&
            <ClickAwayListener onClickAway={()=>setPopup(false)}>
                <div className="popup">
                    <div className="popup-inner">
                        <p>Změnit hodnotu</p>
                        <h3>{name}:</h3>
                        <div className="flex">
                            <p>{value}</p>
                            <ArrowForwardOutlinedIcon className="icon"/>
                            <input type="text" value={input} onChange={handleInput}/>
                        </div>
                        <button onClick={()=>
                            {editProduct(setter, props, props[0].car_id, change, input);
                            setPopup(false);
                            setInput('');
                            }}><SaveOutlinedIcon /> ULOŽIT</button>
                    </div>
                </div>
            </ClickAwayListener>
            }
            {deletePop &&
            <ClickAwayListener onClickAway={()=>setDeletePop(false)}>
                <div className="del-pop">
                    <p>Opravdu chcete smazat tento vůz:</p>
                    <h3>{props[0].car_make} {props[0].car_model}</h3>
                    <button onClick={handleDelete} className="delete"><DeleteOutlineOutlinedIcon />Odstranit auto</button>
                </div>
            </ClickAwayListener>
            }
        </div>
    );
}