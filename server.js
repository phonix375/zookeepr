const express = require('express');
const fs = require('fs');
const path = require('path');



const app = express();
//pars ubcoming string or array data
app.use(express.urlencoded({extended: true}));
//pars incoming JSON data
app.use(express.json());
const {animals} = require('./data/animals')
const PORT = process.env.PORT || 3001;

function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
  };

function createNewAnimal(body, animalsArray){
    const animal = body;
    animalsArray.push(animal);
    fs.writeFileSync(
        path.join(__dirname, './data/animals.json'),
        JSON.stringify({animals:animalsArray})
    )
    
    return animal;
}


function filterByQuery(query, animalsarray){
    let personalityTraitsArray = [];
    let filteredResults =animalsarray;
    console.log(query);
        if(query.personalityTraits){
            if(typeof query.personalityTraits === 'string'){
                personalityTraitsArray = [query.personalityTraits];
            }else{
                personalityTraitsArray = query.personalityTraits;
            }
            personalityTraitsArray.forEach(trait => {
                filteredResults = filteredResults.filter(animal => animal.personalityTraits.indexOf(trait) !== -1
                );
            });
        }
     
        if(query.diet){
            filteredResults = filteredResults.filter(animal => animal.diet === query.diet)
        }
        if (query.species) {
            filteredResults = filteredResults.filter(animal => animal.species === query.species)
        }
        if (query.name) {
            console.log('going to the if');
            filteredResults = filteredResults.filter(animal => animal.name === query.name)
            console.log(filteredResults);
        }
        return filteredResults;
    }


app.get('/api/animals', (req, res) =>{
    let results = animals;
    if(req.query){
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
  });

  app.post('/api/animals', (req, res) => {
      req.body.id = animals.length.toString();
    // req.body is where our incoming content will be
    const animal = createNewAnimal(req.body, animals);


    res.json(animal);
  });

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);

  });