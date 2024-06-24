// import React, { useState, useEffect } from 'react';
// import './RelatedProducts.css';
// import Item from '../Item/Item';

// const RelatedProducts = () => {
//   const [relatedProducts, setRelatedProducts] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:5001/api/product')
//       .then(response => response.json())
//       .then(data => {
//         setRelatedProducts(data);
//       })
//       .catch(error => console.error('Error fetching related products:', error));
//   }, []);

//   return (
//     <div className='relatedproducts'>
//       <h1>Related Products</h1>
//       <hr />
//       <div className="relatedproducts-item">
//         {relatedProducts.map((item, i) => (
//           <Item 
//             key={i} 
//             id={item.id} 
//             name={item.name} 
//             image={item.image} // Make sure this matches the property name in the API response
//             new_price={item.new_price} 
//             old_price={item.old_price} 
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default RelatedProducts;
