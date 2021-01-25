import React from 'react';
import './Image.css';
import img from  './undraw.png';

const Image = ()=>{
    return(
        <div className="container">
            <img className="cover" alt="" src={img} />
        </div>
    )
}

export default Image;