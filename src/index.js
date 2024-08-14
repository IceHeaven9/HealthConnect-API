const express = require('express');
const app = express();
const connectDB = require('./database/structure/db'); 

app.use(express.json()); 

connectDB(); 

const ConsultationRoutes = require('./routes/consultation'); 
app.use('/consultation', ConsultationRoutes); 

const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
