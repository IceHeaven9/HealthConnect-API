const express = require('express');
const router = express.Router();
const { crearCita } = require('../models/consultation')


router.post('/consutation', async (req, res) => {
    const { title, description, severity, specialyid, patientid, doctorid, date } = req.body;

    
    if (!title || !description || !severity || !specialyid || !patientid || !doctorid || !date) {
        return res.status(400).json({ mensaje: 'Faltan datos necesarios' });
    }

    try {
        
        const idConsultation = await crearCita({ title, description, severity, specialyid, patientid, doctorid, date });
        res.status(201).json({ mensaje: 'Cita creada', id: idConsultation });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la cita', error });
    }
});

module.exports = router;