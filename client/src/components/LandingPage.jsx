import React from 'react';
import {Link} from 'react-router-dom';
import './landingPage.css';



export default function LandingPage(){
    return (
        
        <div className="landing_page">
          <div>
            <h4 className='title_landing'>WELCOME TO API VIDEOGAMES</h4>
            <h5 className='subtitle_landing'>Through this single page application, you will be able to search for existing video games or create one!</h5>
            
            <Link to = '/home'>

                <button className='button_landing'>Play</button>
                
            </Link>
          </div>
        </div>
    )

}







//export default LandingPage;