const express = require('express');
const app = express();
const cors = require("cors");
const multer = require('multer');
const xlsx = require('xlsx');
const entrepotRoute = require("./routes/route.dataExcel");
//const pagination = require("./routes/route.pagination");

app.use(cors({ origin: 'http://localhost:3000' }));

////app.use(cors());
app.use(express.json()); //req.body
app.use(express.urlencoded({ extended: false }));

// Set up Multer for file upload
const storage = multer.memoryStorage();
//const upload = multer({ storage });

const upload = multer().single('file');
app.use("/entrepot", entrepotRoute);
//app.use("/pagination", pagination);

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

//"package": "electron-builder build --mac --win -c.extraMetadata.main=build/electron.js --publish never",
//"publish": "electron-builder build --mac--win --publish always "

// Start the server
const PORT =8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
