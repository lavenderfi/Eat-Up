import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { fetchCategories, fetchRecipes } from '../api/recipes';
import Card from 'react-bootstrap/Card'

const Home = () => {
  let [selected, setSelected] = useState(null);
  let [categories, setCategories] = useState(null);
  let [recipes, setRecipes] = useState(null);
  useEffect(() => {
    async function fetchData() {
      let data = await fetchCategories();
      setCategories(data.meals);
    }
    fetchData();
  }, []);
  function handleSelect(evt) {
    setSelected(evt);
  }
  async function handleSubmit(){
    let recipes = await fetchRecipes(selected)
    setRecipes(recipes.meals)
  }
  return (
    <div>
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle variant="success">
          {selected ? selected : 'Category'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {categories &&
            categories.map((category, i) => {
              return (
                <Dropdown.Item eventKey={category.strCategory} key={i}>
                  {category.strCategory}
                </Dropdown.Item>
              );
            })}
          <Dropdown.Item>All</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Button onClick={handleSubmit}>Find me a recipe!</Button>
{recipes && recipes.map(recipe => {
  return (
    <Card style={{width:'18rem'}}>
      {recipe.strMeal}
      <img src={recipe.strMealThumb} />
    </Card>
  )
})}
    </div>
  );
};

export default Home;
