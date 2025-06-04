import React, { useState } from 'react';
import * as xlsx from 'xlsx';
import dataExcel from '../service/axios';
import "./NavBar.css";
import "./excel.css";
const Excel = () => {
  const [erreurNombre, setErreurNombre] = useState(false);
 
  const [show, setShow] = useState('');
  const [VisibleAutre, setVisibleAutre] = useState('');
  const [ExcelInfo, setExcelInfo] = useState([]);
  const [Consultation, setConsultation] = useState('');
  const [NumAffaire, setNumAffaire] = useState('');
  const [Nomdeclient, setNomdeclient] = useState('');
  const [AppelDoffre, setAppelDoffre] = useState('');
  const [Produite, setProduite] = useState('vide');
  const [Remarque, setRemarque] = useState('');
  const [Autre, setAutre] = useState('');
  
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleFile = async (e) => {
    let selectedFile = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = event.target.result;

      const excel = xlsx.read(data, { type: 'array' });
      const excelSheet = excel.Sheets[excel.SheetNames[0]];
      const excelJson = xlsx.utils.sheet_to_json(excelSheet);
      setExcelInfo(excelJson);
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const save = async (e) => {
    e.preventDefault();
    const textInput = document.getElementById('input');
    const inputValue = textInput.value;
   console.log('VisibleAutre',VisibleAutre)
    if (VisibleAutre === 'Autre'){ toggleOption(Autre)}

    console.log('show = '+ show,' Produite = '+Autre,' NatureTravaux = '+selectedOptions);
    if (
      Nomdeclient === '' ||
     
      inputValue === ''||
      NumAffaire === ''
    ) {
      setErreurNombre(true);
    } else {
      const parts = inputValue.split('\\');
      const fileName = parts[parts.length - 1];

     // console.log('File name:', fileName);

      //console.log('ExcelInfo, Nomdeclient, AppelDoffre, Produite, Remarque, fileName '+ExcelInfo, Nomdeclient, AppelDoffre, Produite, Remarque, fileName);
      dataExcel
        .postFile(ExcelInfo, Nomdeclient, AppelDoffre, Autre ,Remarque, fileName,NumAffaire,selectedOptions,Consultation, show)
        .then((res) => {});
         setErreurNombre(false);
         
    setNomdeclient('');
    setAppelDoffre('');
   setAutre('')
    setRemarque('');
    
    textInput.value = '';
    }
   
  };



  const toggleOption = (option) => {

    
 if (selectedOptions.includes(option)) {
    console.log("Autr 1e"+Autre);
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
   
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="facebook-registration-form">
            <h2>Create an Account</h2>
            
            <form>


         
              <div className="mb-3 numAff">
                <label htmlFor="NumAffaire" className="form-label">
                  Numéro d'affaire
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="NumAffaire"
                  value={NumAffaire}
                  onChange={(e) => setNumAffaire(e.target.value)}
                />
                {erreurNombre && NumAffaire === '' && (
                  <p className="error-message">* Veuillez ajouter le numéro d'affaire</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="Nomdeclient" className="form-label">
                  Nom de client
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Nomdeclient"
                  value={Nomdeclient}
                  onChange={(e) => setNomdeclient(e.target.value)}
                />
                {erreurNombre && Nomdeclient === '' && (
                  <p className="error-message">* Veuillez ajouter le nom du client</p>
                )}
              </div>
         
              <div className="mb-3 check">
        <label className="form-label">Nature des travaux</label>
        <div className="form-check">
          <input
            type="checkbox"
            id="climatisationDirecte"
            className="form-check-input"
            value="Climatisation directe"
            checked={selectedOptions.includes("Climatisation directe")}
            onChange={() => toggleOption("Climatisation directe")}
          />
          <label htmlFor="climatisationDirecte" className="form-check-label">
            Climatisation à détente directe
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            id="climatisationIndirecte"
            className="form-check-input"
            value="Climatisation indirecte"
            checked={selectedOptions.includes("Climatisation indirecte")}
            onChange={() => toggleOption("Climatisation indirecte")}
          />
          <label htmlFor="climatisationIndirecte" className="form-check-label">
            Climatisation à détente indirecte
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            id="desenfumage"
            className="form-check-input"
            value="Désenfumage"
            checked={selectedOptions.includes("Désenfumage")}
            onChange={() => toggleOption("Désenfumage")}
          />
          <label htmlFor="desenfumage" className="form-check-label">
            Désenfumage
          </label>
        </div>
        <div className="form-check">
        <input
            type="checkbox"
            id="autreCheckbox"
            className="form-check-input"
            checked={selectedOptions.includes("Autre")}
            onChange={() => {
             
              setVisibleAutre("Autre"); // Show the "Autre" input field
             
            }}
          />
          <label  htmlFor="autreCheckbox" className="form-check-label">
            Autre
          </label>
        </div>
        {VisibleAutre === 'Autre' && (
                <div className="mb-3">
                  <label  htmlFor="Autre" className="form-label">
                  Autre
                  </label>
                  <input
              type="text"
              className="form-control"
              id="Autre"
            value={Autre}
              onChange={(e) => {
                setAutre(e.target.value)
               
              }}
            />
                 
                </div>
              )}
      </div>









              <div className="radio-container">
                <div className="radio-option">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="selection"
                    checked={show === 'Consultation'}
                    onChange={() => setShow('Consultation')}
                  />
                  <label className="form-check-label">Consultation</label>
                </div>
                <div className="radio-option">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="selection"
                    checked={show === 'Appel offre'}
                    onChange={() => setShow('Appel offre')}
                  />
                  <label className="form-check-label">Appel d'offre</label>
                </div>
              </div>
              {erreurNombre && (
                <p className="error-message">
                  * Veuillez cocher au moins une option (Consultation ou Appel d'offre)
                </p>
              )}
              {show === 'Appel offre' && (
                <div className="mb-3">
                  <label htmlFor="AppelDoffre" className="form-label">
                    Appel d'offre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="AppelDoffre"
                    value={AppelDoffre}
                    onChange={(e) => setAppelDoffre(e.target.value)}
                  />
                  {show === 'Appel offre' && erreurNombre && AppelDoffre === '' && (
                    <p className="error-message">* Veuillez ajouter l'appel d'offre</p>
                  )}
                </div>
              )}
              {show === 'Consultation' && (
                <div className="mb-3">
                  <label className="form-label">Consultation</label>
                  <input
                    className="form-control"
                    value={show === 'Consultation' ? Consultation : ''}
                    onChange={(e) => setConsultation(e.target.value)}
                  />
                  {show === 'Consultation' && erreurNombre && Consultation === '' && (
                    <p style={{ color: 'red', fontSize: '11px' }}>
                      *Veillez remplir le champ Consultation
                    </p>
                  )}
                </div>
              )}
              <div className="mb-3 file">
                <label htmlFor="input" className="form-label"></label>
                <input
                  type="file"
                  className="form-control "
                  id="input"
                  onChange={(e) => handleFile(e)}
                />
                {erreurNombre && (
                  <p className="error-message">* Veuillez ajouter le fichier</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="Remarque" className="form-label">
                  Remarque
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Remarque"
                  value={Remarque}
                  onChange={(e) => setRemarque(e.target.value)}
                />
              </div>
              <button
                className="btn btn-primary"
                onClick={(e) => save(e)}
              >
                Enregistrer
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  
  
  
  );
};

export default Excel;
