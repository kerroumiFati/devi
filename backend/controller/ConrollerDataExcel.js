const pool =require ("../db")
const dataExcel= require("../queries/querie.fileExcel")
const xlsx = require('xlsx');



 
ajouterFile = async (req, res) => {
  //  const client = await pool.connect(); // Acquire a client from the connection pool for the transaction
  // ajutouter file  des champs de test
  try {
    const fileData = req.body.file;
    const {Nomdeclient, AppelDoffre,  Produite, Remarque,fileName,NumAffaire,NatureTravaux,Consultation, show} = req.body;
   // console.log( fileData);
    const formattedData = [];
    let currentEntry = null; // Initialize the currentEntry as null

   // const formattedData = [];
    let currentSection = null;
    let x = false;
   for (const row of fileData) {
  
   // console.log(' row.__EMPTY_1', row.__EMPTY_1 +'    '+row.__EMPTY);
   
    if((row.__EMPTY !==undefined && row.__EMPTY_1 !==undefined )&& (row.__EMPTY !=='' && row.__EMPTY_1 !=='')){ x= true ; console.log('x= ',x);   break;} 
  

   }
   
   if(x ){//console.log('nrml    x',x);
   
    for (const row of fileData) {
      if(row.__EMPTY ) {
        currentSection = {
          n: row.__EMPTY,
          designation: row.__EMPTY_1,
          unit: row.__EMPTY_2,
          quantity: row.__EMPTY_3,
          unit_price: row.__EMPTY_4,
          amount: row.__EMPTY_5,
          description: [],
        };
        
      formattedData.push(currentSection);
      }
      else   currentSection.description.push(row.__EMPTY_1);

    
  
    }
   x=false;
   }
   else{// décaler 
   // console.log('decaler')
    for (const row of fileData) {
      if(row.__EMPTY_1 ) {
        currentSection = {
          n: row.__EMPTY_1,
          designation: row.__EMPTY_2,
          unit: row.__EMPTY_3,
          quantity: row.__EMPTY_4,
          unit_price: row.__EMPTY_5,
          amount: row.__EMPTY_6,
          description: [],
        };  formattedData.push(currentSection);
      }
      else currentSection.description.push(row.__EMPTY_2);//if ligne 2 est row.__EMPTY vide  est décalé-------------------------------------
      //  formattedData.push(currentSection);
    
    }
  
   }
    

    

    // Début de la transaction
    await pool.query('BEGIN');

    const infoQuery = 'INSERT INTO info (nomClient, appelOffre, produite, remarque, filename,NumAffaire,NatureTravaux,Consultation, show) VALUES ($1, $2, $3, $4, $5,$6,$7,$8,$9) RETURNING id';
    //const infoValues = ['valueForNomClient', 'valueForAppelOffre', 'valueForProduite', 'valueForRemarque'];

    const result = await pool.query(infoQuery,[Nomdeclient, AppelDoffre,  Produite, Remarque,fileName,NumAffaire,NatureTravaux,Consultation, show]);
    const id = result.rows[0].id;
    //console.log("id=",id);
    // Construct the SQL statement with the id value included
    const excelQuery = `INSERT INTO excel (n,designation, unit, quantity, unit_price, amount,id) VALUES ($1, $2, $3, $4, $5, $6,$7)`;

    // Insert formatted data into the database
   // console.log('formattedData',formattedData)
    for (const entry of formattedData) {
   if(entry.designation !=='Désignation'&& entry.n!=='N°')  { const combinedDescription = entry.description.join(' '); // Join description lines
      try {
        await pool.query(excelQuery, [
          entry.n,
          entry.designation +' '+combinedDescription,
          entry.unit,
          entry.quantity,
          entry.unit_price,
          entry.amount,
          id,
          //entry.description.join(' '),
        ]);
      } catch (error) {
        console.error('Error inserting into excel table:', error);
        // Optionally, add more detailed error handling here
      }}
    }
    
    // Commit the transaction
    await pool.query('COMMIT');

    res.status(200).json({ message: 'Data imported successfully' });
  } catch (error) {
    // Rollback the transaction in case of an error
    await pool.query('ROLLBACK');
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  } 
};



getCountTable=(req,res)=>{
  const fileName = req.params.fileName; 
    console.log(fileName);
    pool.query(dataExcel.selectCount, [fileName], (error, result) => {  
      console.log("Nombre de line",res.data)  
      if (error) throw error 
      res.status(200).json(result.rows)
      console.log(result.rows);
  })
}

getCountAllTable=(req,res)=>{
    pool.query(dataExcel.CountLineTable, (error, result) => {  
      console.log("Nombre de line",res.data)  
      if (error) throw error 
      res.status(200).json(result.rows)
      console.log(result.rows);
  })
}

getFileByNemeFile=(req,res)=>{
  const fileName = req.params.fileName; 
    console.log(fileName);  
     pool.query(dataExcel.select, ['%'+fileName+'%']
     , (error, result) => {  
      if (error) throw error 
      res.status(200).json(result.rows)
      
  })

}


/*
getFileByNemeFile = async (req, res) => {
  const fileName = req.params.fileName;
  console.log(fileName);

  const result = await pool.query(dataExcel.select_id, ['%' + fileName + '%']);
  console.log(result.rows);

  if (result.rows.length === 0) {
    res.status(404).send({ message: 'No matching record found.' });
  } else {
    const responseData = []; // Collect the results here

    for (let i = 0; i < result.rows.length; i++) {
      const id = result.rows[i].id;
      console.log('id' + id);

      // Use async/await to query the database
      try {
        const queryResult = await pool.query(dataExcel.select, [id]);
        responseData.push(queryResult.rows);
      } catch (error) {
        console.error(error);
      }
    }

    // Send the collected data as a single response after the loop
    res.status(200).json(responseData);
  }
};
*/

getAllDeviInfo = (req, res) => {
   pool.query(dataExcel.getAllDeviInfo, (error, result) => {
       if (error) throw error 
       res.status(200).json(result.rows)
   })
}




module.exports = {
    getAllDeviInfo,
    getFileByNemeFile,
    ajouterFile,
    getCountTable,
    getCountAllTable };

