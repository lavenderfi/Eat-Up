import axios from 'axios';

export const fetchRecipes = async (category) => {
  try {
    const res = await axios.get(
      'https://tasty.p.rapidapi.com/recipes/list',
      {params: { from: '0', size: '20', tags: category },
        headers: {
          'X-RapidAPI-Key':
            'a2a156c5b2msh239bce402adb856p13b617jsnb295a5962103',
          'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

// export async function getCategories() {
//   try {
//     let url = 'https://tasty.p.rapidapi.com/tags/list';
//     const res = await axios.get(url, {
//       headers: {
//         'X-RapidAPI-Key': 'a2a156c5b2msh239bce402adb856p13b617jsnb295a5962103',
//         'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
//       },
//     });
//     console.log(res.data);
// 	return res.data
//   } catch (err) {
//     console.error(err);
//   }
// }


