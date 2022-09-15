import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { fetchRecipes } from '../api/recipes';
import Card from 'react-bootstrap/Card'

const Home = () => {
  let [selected, setSelected] = useState(null);
  let [recipe, setRecipe] = useState(null);
let [category,setCategory] = useState(null)
let [recipes,setRecipes] = useState(null)

  function handleSelect(evt,key) {
    setSelected(evt);
    setCategory(key.target.id)
  }
  async function handleSubmit(){
     let data = await fetchRecipes(category)
    setRecipes(data.results)
     let number = Math.floor(Math.random()*20)
     setRecipe(data.results[number])
     
  }
 
  function newRecipe(){
    if(recipes.length === 0){
      setRecipe(false)
    }
    else {
      let length = recipes.length - 1
      let number = Math.floor(Math.random()*length)
      setRecipe(recipes.splice(number, 1)[0])
    }
  }
  return (
    <div>
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle variant="success">
          {selected ? selected : 'Category'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey='American' id='american'>American</Dropdown.Item>
          <Dropdown.Item eventKey='Indian' id='indian'>Indian</Dropdown.Item>
          <Dropdown.Item eventKey='Vegetarian' id='vegetarian'>Vegetarian</Dropdown.Item>
          <Dropdown.Item eventKey='Vegan' id='vegan'>Vegan</Dropdown.Item>
          <Dropdown.Item eventKey='Chinese' id='chinese'>Chinese</Dropdown.Item>
          <Dropdown.Item eventKey='Korean' id='korean'>Korean</Dropdown.Item>
          <Dropdown.Item eventKey='Italian' id='italian'>Italian</Dropdown.Item>
          <Dropdown.Item eventKey='Mexican' id='mexican'>Mexican</Dropdown.Item>
          <Dropdown.Item eventKey='Quick' id='under_30_minutes'>Quick</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Button onClick={handleSubmit}>Find me a recipe!</Button>
      {recipe && 
      <div>
      <Card style={{width:'30rem'}}>
        <Card.Title>{recipe.name}</Card.Title>
        <img src={recipe.thumbnail_url} alt={recipe.name}/>
        <Card.Body>
          {recipe.yields}
          {recipe.prep_time_minutes}
          {recipe.instructions&& recipe.instructions.map(step =>{
            return (
              <div key={step.position}>
                <h3>{step.position}.</h3>
                {step.display_text}
              </div>
            )
          })}
          {recipes.length === 0 && <div>Pick another category!</div>}
        </Card.Body>
        </Card>
        <Button onClick={newRecipe}>Find another recipe</Button>
        </div>
        }
        
    </div> 

  );
};

export default Home;
