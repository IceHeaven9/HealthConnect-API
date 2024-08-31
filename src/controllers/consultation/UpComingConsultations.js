<<<<<<< HEAD
// Controlador para obtener todas las consultas futuras de un usuario

import { getFutureConsultations } from '../../database/consultation.js';

export const getUpcomingConsultationsController = async (req, res) => {
	const consultations = await getFutureConsultations(req, res);
	res.status(200).json(consultations);
};
=======
import { getUpcomingConsultations } from '../database/consultation.js';
import { generateErrors } from '../utils/generateErrors.js';


export const getUpcomingConsultationsController = async (req, res) => {
    const userId = req.currentUser.id;
    const { filter, search, sort } = req.query;  

    try {
       
        const consultations = await getUpcomingConsultations(userId, filter, search, sort);
        res.status(200).json(consultations);
    } catch (error) {
     
           generateErrors(500, 'SERVER_ERROR','mensaje');
    }
};
>>>>>>> ce7edb1 (Endpoint finished and upcoming Consultations)
