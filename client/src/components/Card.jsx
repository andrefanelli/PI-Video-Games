import React from 'react';


export default function Card({image, name, gender}) {
    return (
        <div>
            <img src={image} alt='image not found' width="200px" height={"250px"}/>
            <h3>{name}</h3>
            <h5>{gender}</h5>
        </div>
    );
}