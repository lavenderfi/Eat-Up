import axios from 'axios';


export const fetchRecipes = async (category) => {
	const res = await axios.get(
		`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
	);
	return res.data;
};

export const fetchCategories = async () => {
	const res = await axios.get(
		`https://www.themealdb.com/api/json/v1/1/list.php?c=list`
	);
	return res.data;
};
