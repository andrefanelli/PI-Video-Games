import React from 'react';
import {Link} from 'react-router-dom';
import './landingPage.css';



export default function LandingPage(){
    return (
        
            <div className="landing_page">
            <h3>WELCOME TO API VIDEOGAMES</h3>
            
            <Link to = '/home'>

                <button className='button'>Play</button>
                
            </Link>
        </div>
    )

}







//export default LandingPage;