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