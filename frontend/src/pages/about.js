import React, { useEffect,useCallback, useState } from "react"
import "./NavBar.css"
import dataExcel from "../service/axios"
import 'datatables.net';
//import 'bootstrap/dist/css/bootstrap.min.css';


import Pagination from "./pagination";
const Recharche=()=>{

  let  tableCondition, headerTable,tfoot;
  const [data2,setdata2]=useState([]);
  const [donneeFile,setinputDAta]=useState("");
 

  const [popupVisible, setPopupVisible] = useState(false);

  /*const closePopup = () => {
    setPopupVisible(false);
  }*/
  
  

/*const loadData = useCallback(() => {
  console.log("hi")
 if(donneeFile !==''){
  console.log(donneeFile);
  dataExcel.getFileByNemeFile(donneeFile) 
    .then(response => {
      setdata2(response.data);
    })
    .catch(error => {
   //   setPopupVisible(true);
      console.error("Error:", error);
    });
//s    console.log("")

 }else{
  //alert('saisi fichier')    <Pagination
               /*   postsPerPage={postsPerPage}
                  totalPosts={data2.length}
                  paginate={paginate}
//                />
 }
   
}, [donneeFile]); 



useEffect(() => {
  loadData();
}, [loadData]);*/
       //recherche des bon par fournisseur / date
  
  
       const recherche = (e) => {
    e.preventDefault();
    if(donneeFile !==''){
      console.log(donneeFile);
      dataExcel.getFileByNemeFile(donneeFile) 
        .then(response => {
          setdata2(response.data);
        })
        .catch(error => {
       //   setPopupVisible(true);
          console.error("Error:", error);
        });

    
     }  console.log(data2)
    }
  

   
      headerTable = (
        <tr>
        <th style={{textAlign:"center"}}>N°</th>
        <th style={{textAlign:"center"}}>Designation</th>
        <th style={{textAlign:"center"}}>U</th>
        <th style={{textAlign:"center"}}>Qté</th>
        <th style={{textAlign:"center"}}>P.U/H.T</th>
        <th style={{textAlign:"center"}}>Montant/H.T</th>
        <th style={{textAlign:"center"}}>Nom Client</th>
        <th style={{textAlign:"center"}}>Appel D'Offre</th>
  
        <th style={{textAlign:"center"}}>Nature des travaux</th>
        <th style={{textAlign:"center"}}>Numéro d'affaire</th>
        <th style={{textAlign:"center"}}>Consultation</th>
        <th style={{textAlign:"center"}}>Autre</th>
        <th style={{textAlign:"center"}}>remarque</th>
    </tr>
      );
      tfoot = (
      donneeFile !==''&&  <tr>
        <th style={{textAlign:"center"}}>N°</th>
        <th style={{textAlign:"center"}}>Designation</th>
        <th style={{textAlign:"center"}}>U</th>
        <th style={{textAlign:"center"}}>Qté</th>
        <th style={{textAlign:"center"}}>P.U/H.T</th>
        <th style={{textAlign:"center"}}>Montant/H.T</th>
        <th style={{textAlign:"center"}}>Nom Client</th>
        <th style={{textAlign:"center"}}>Appel D'Offre</th>
   
        <th style={{textAlign:"center"}}>Nature des travaux</th>
        <th style={{textAlign:"center"}}>Numéro d'affaire</th>
        <th style={{textAlign:"center"}}>Consultation</th>
        <th style={{textAlign:"center"}}>Autre</th>
        <th style={{textAlign:"center"}}>remarque</th>
    </tr>
      );
  
   
      tableCondition = data2.map((item,index) => (
        <tr key={index}>
        <td>{item.n}</td>
        <td>{item.designation}</td>
        <td>{item.unit}</td>
        <td>{item.quantity}</td>
        <td>{item.unit_price}</td>
        <td>{item.amount}</td>
        <td>{item.nomclient}</td>
        <td>{item.appeloffre}</td>
      
        
        <td>{item.naturetravaux.replace(/["{}]/g, '').split(',')}</td>
        <td>{item.numaffaire}</td>
         <td>{item.consultation}</td>
         <td>{item.produite}</td>
        <td>{item.remarque}</td>
     </tr>
      ));
         return(
        <>
        
        <section className="hero">   

        <form >         
          <div className="input-group col-sm-8"> 
                    <input type="search" className="form-control"  id="input" placeholder="Search File"
                      style={{ width: '10px',margin: '0 auto', textAlign: 'center' }}
                      value={donneeFile}
                      onChange={(e) => setinputDAta(e.target.value)}
                    />
   <button className="btn  btn-outline-primary" onClick={(e) => recherche(e)} value="save">
   <div>
      
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg>
    </div>
   </button>
   </div> 
        </form>

      <table id="example" className="table table-striped">
            <thead>
                {headerTable} 
            </thead>
            <tbody>
             {tableCondition}
            </tbody>
           { donneeFile !==''&&<tfoot>
                {tfoot} 
            </tfoot>}
    </table>


    </section>
   

    </>
    )

    
}

export default Recharche;
