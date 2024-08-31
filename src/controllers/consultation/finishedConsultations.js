<<<<<<< HEAD
// Controlador para obtener todas las consultas finalizadas (status = completed)

import { getFinishedConsultations } from '../../database/consultation.js';

export const getFinishedConsultationsController = async (req, res) => {
	const consultations = await getFinishedConsultations(req, res);
	res.json(consultations);
=======
import { getFinishedConsultations } from '../database/consultation.js';
import { generateErrors } from '../utils/generateErrors.js';

export const getFinishedConsultationsController = async (req, res) => {
    const userId = req.currentUser.id;
    const { filter, search, sort } = req.query;  

    try {            
        const consultations = await getFinishedConsultations(userId, filter, search, sort);
        res.status(200).json(consultations);
    } catch (error) {
        
        generateErrors(500, 'SERVER_ERROR','mensaje');
    }
>>>>>>> ce7edb1 (Endpoint finished and upcoming Consultations)
};
