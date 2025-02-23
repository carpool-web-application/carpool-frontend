// const GetARide = () => {

//     return (
//       <div className="getride">
//         <h1> TO </h1>
//         <input type="text"></input>
//         <br />
//         <h1> From </h1>
//         <input type="text"></input>
//         <br />
//         <h1> Seats </h1>
//         <select>
//           <option value="1">1 seat</option>
//           <option value="2">2 seats</option>
//           <option value="3">3 seats</option>
//           <option value="4">4 seats</option>
//         </select>
//       </div>
//     )
//   };
  
//   export default GetARide;

import { useState } from 'react';

const PostACommute = () => {
  const [formData, setFormData] = useState({
    to: '',
    from: '',
    seats: ''
  });

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can post the ride using the formData object
    console.log(formData);
  };

  return (
/*     <form className="getride" onSubmit={handleSubmit}>
      <h1> TO </h1>
      <input type="text" name="to" value={formData.to} onChange={handleInputChange} />
      <br />
      <h1> From </h1>
      <input type="text" name="from" value={formData.from} onChange={handleInputChange} />
      <br />
      <h1> Seats </h1>
      <select name="seats" value={formData.seats} onChange={handleInputChange}>
        <option value="1">1 seat</option>
        <option value="2">2 seats</option>
        <option value="3">3 seats</option>
        <option value="4">4 seats</option>
      </select>
      <br />
      <h1> Post a Ride </h1>
      <button type="submit">Post ride</button>
    </form> */
    <>
    <h1>hello</h1>
    </>
  );
};

export default PostACommute;