// const PostACommute = () => {
   
//       return (
//         <>
//         Post a Commute
//         </>
//       )
//     };
    
//      export default PostACommute;

import React from 'react';

import PostACommute from '../Driver/PostACommute.css';

// console.log(user); 

// function Header() {

//    <div className='Profile'></div>
//   // Import result is the URL of your image
//   return <img src={user}   className='user' alt="user" />;
  
// }

function Profile(){
    return (
      <div className='profile'>
        <div style={{
            backgroundImage: 'url("images/background.png")'
        }}></div>
        <header className='userprofile'> Profile </header>
        <div className='image-container'>
          <img className='user' src='/images/userr.png' alt=''></img>
          <div className='image-caption'>Caption goes here</div>
        </div>
      </div>
    )
  }

  export default Profile;

// function Profile(){
//     return (
//       <div className='profile' style={{ 
//         backgroundImage: "url('/images/background.png')", 
//         backgroundRepeat: 'no-repeat',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center'
//       }}>
//         <header className='userprofile'> Profile </header>
//         <div className='image-container'>
//           <img className='user' src='/images/userr.png' alt=''></img>
//           <div className='image-caption'>Caption goes here</div>
//         </div>
//       </div>
//     )
//   }
  
//   export default Profile;




    
    
    