const pool = require('../database/structure/db')

async function createConsultation({title,description,severity,specialityid,patientid,doctorid,date}){

    const [result]= await pool.query(
            'INSERT INTO consultation (title, descripcion,severity, specialyid,parentid,doctorid,date) VALUES (?,?,?,?,?,?;?)',
            [title, description, severity, specialityid, patientid, doctorid, date]
          );
    return result.insertid;


    }


    module.exports={
        createConsultation,
    };