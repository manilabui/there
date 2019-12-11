import React, { Fragment, useState, useEffect } from 'react';
import FestCard from './FestCard';
// import { getAll, deleteItem } from '../../modules/apiManager';

// const AnimalList = props => {
//     const [animals, setAnimals] = useState([]);
    
//     const getAnimals = () => { getAll("animals").then(animals => setAnimals(animals)) };

// 	useEffect(getAnimals, []);

// 	const deleteAnimal = id => {
// 		deleteItem("animals", id)
// 			.then(() => getAll("animals")
// 	    		.then(animals => setAnimals(animals))
// 	    	);
// 	};

//     const animalsArr = animals.map(animal => {
//     	return (
//         	<AnimalCard
//         		key={animal.id}
//         		animal={animal}
//         		deleteAnimal={deleteAnimal}
//                 {...props}
//         	/>
//     	);
//     });

//     return (
//         <Fragment>
//             <section className="section-content">
//                 <button 
//                     type="button"
//                     className="btn"
//                     onClick={() => props.history.push("/animals/new")}>
//                     Admit Animal
//                 </button>
//             </section>
//             <div className="container-cards">
//             	{animalsArr}
//             </div>
//         </Fragment>
//     );
// };

// export default AnimalList;