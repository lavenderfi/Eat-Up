import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { fetchRecipes } from '../api/recipes';
import Card from 'react-bootstrap/Card'

const Home = () => {
  let [selected, setSelected] = useState(null);
  let [recipe, setRecipe] = useState(null);
let [category,setCategory] = useState(null)
  function handleSelect(evt,key) {
    setSelected(evt);
    setCategory(key.target.id)
  }
  async function handleSubmit(){
     let recipes = await fetchRecipes(category)
     let number = Math.floor(Math.random()*20) + 1
     setRecipe(recipes.results[number])
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
     
      <Card style={{width:'18rem'}}> {console.log(recipe)}
        <Card.Title>{recipe.name}</Card.Title>
        <img src={recipe.thumbnail_url} alt={recipe.name}/>
        <Card.Body>
          {recipe.yields}
          {recipe.prep_time_minutes}
          {recipe.instructions.map(step =>{
            return (
              <div key={step.position}>
                {step.position}:
                {step.display_text}
              </div>
            )
          })}
        </Card.Body>
        </Card>
        }
    </div>

  );
};

export default Home;
