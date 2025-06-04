import axios from "axios";

const POST_ENTREPOT = "http://192.168.1.110:8080/entrepot/getFileByNemeFile/";
const GET_ALL_ENTREPOT = "http://192.168.1.110:8080/entrepot/getAllEntrepot";
const POST_FILE = "http://192.168.1.110:8080/entrepot/ajouterFile";
const POST_COUNT = "http://192.168.1.110:8080/entrepot/getCountTable/";

class dataExcel {

 

  async postFile(file,Nomdeclient,AppelDoffre,Produite,Remarque,fileName,NumAffaire,NatureTravaux,Consultation,show) {
    // Create an object with the provided data
    const entrepot = {
      file ,
      Nomdeclient,
      AppelDoffre,
      Produite,
      Remarque,
      fileName,NumAffaire,NatureTravaux,Consultation,show
      };
    console.log(file,Nomdeclient,
      AppelDoffre,
      Produite,
      Remarque,fileName);
  return  axios.post(POST_FILE,entrepot)

  }


  
  async getFileByNemeFile(inputValue) {
  return  axios.get(POST_ENTREPOT+inputValue)

  }



  getAllEntrepot() {
        return axios.get(GET_ALL_ENTREPOT);
    }



    async getCountTable(InputValue){
      return  axios.get(POST_COUNT+InputValue)
    }
}



const dataService = new dataExcel();

export default dataService;
