
const getAllDeviInfo = "SELECT * FROM excel z INNER JOIN info i ON z.id = i.id ";


//const select_id = 'SELECT id FROM info WHERE LOWER(filename) ILIKE LOWER($1)';
const select_id = "SELECT id FROM info WHERE LOWER(filename) iLIKE $1";
//(\'%\' || $1 || \'%\')

const select = 'SELECT *FROM excel z INNER JOIN info i ON z.id = i.id WHERE LOWER(filename) ILIKE $1  OR LOWER(consultation) ILIKE $1 OR LOWER(show) ILIKE $1 OR LOWER(naturetravaux) ILIKE $1 or LOWER(numaffaire) ILIKE $1'
 
const selectCount='SELECT COUNT(*) FROM info JOIN excel ON info.filename = $1 WHERE info.id = excel.id;'




  module.exports = {
     getAllDeviInfo,select_id,select,selectCount
  };


  