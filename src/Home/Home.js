import { BrowserRouter as Router, Route, Routes ,Link } from 'react-router-dom';
import './Home.css';
import img from '../Images/home5.jpeg';

const Home = () =>{

    return(
        
  

        <div className='main'>
             <img className='home5' src={img}  alt="logo"/>
                <div className = 'container-button'>
                <Link to ='/login'>
                    <button className='car'>
                        Car Pool It !
                    </button>
                </Link>
                </div>
        </div> 
      
            
    );

  
};
export default Home;