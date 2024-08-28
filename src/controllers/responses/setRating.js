// controlador para insertar un rating a una respuesta 

import { getResponseById } from "../../database/responses.js";

export const setRatingController = async (req , res ) => {
    const {id} = req.params
    const {rating} =req.body
    const userId = req.currentUser.id;
    const response = await getResponseById(id);
    
  if(!response){
    return res.status(404).json({message: 'respuesta no encontrada'})
    }

 if(response.rating){
    return res.status(400).json({message: 'la respuesta ya ha sido valorada'})
}


if(userId===response.doctorId){
    return res.status(400).json({message: 'Los dostores no pueden valorar las consultas'})
}

await setRating(id, rating);
};


