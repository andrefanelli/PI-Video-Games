import React from 'react';
import {Link} from 'react-router-dom';
import './landingPage.css';



export default function LandingPage(){
    return (
        
        <div className="landing_page">
          <div>
            <h4 className='title'>WELCOME TO API VIDEOGAMES</h4>
            <h5 className='subtitle'>Through this single page application, you will be able to search for existing video games or create one!</h5>
            
            <Link to = '/home'>

                <button className='button'>Play</button>
                
            </Link>
          </div>
        </div>
    )

}







//export default LandingPage;