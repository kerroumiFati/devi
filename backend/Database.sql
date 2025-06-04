CREATE DATABASE devi;

CREATE TABLE DeviInfo(
    id_deviino INT REFERENCES info (id),
    n VARCHAR (5000),
    designation VARCHAR (5000),
    unit VARCHAR (5000),
    quantity VARCHAR (5000),
    unit_price VARCHAR (5000),
    amount VARCHAR (5000)
   
);

CREATE TABLE excel(  
    id_excel SERIAL PRIMARY KEY,
    n VARCHAR (5000),
    designation VARCHAR (5000),
    unit VARCHAR (5000),
    quantity VARCHAR (5000),
    unit_price VARCHAR (5000),
    amount VARCHAR (5000),
    id INTEGER 
  
);


CREATE TABLE info(
    id SERIAL PRIMARY KEY ,
    nomClient VARCHAR (250),
    appelOffre VARCHAR (250),
    produite VARCHAR (250),
   remarque VARCHAR (250),   
    fileName  VARCHAR(250),
      NumAffaire VARCHAR (5000),
    NatureTravaux VARCHAR (5000),
    Consultation VARCHAR (5000),
    show VARCHAR (5000)
   
);

