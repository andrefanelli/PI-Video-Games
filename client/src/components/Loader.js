
import zombie_gif from '../image/zombie_gif.gif';
import './loader.css';

export default function Loader() {
    return(
    <div className="loader">
        <img src={zombie_gif} alt="loading"/>
        <h3><strong>LOADING . . .</strong></h3>
    </div>
    )
};