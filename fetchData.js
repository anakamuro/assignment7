import recipes from "./recipes.js"


const searchInput = document.querySelector('.saerch');

searchInput.addEventListener("input", e =>{
  const value = e.target.value;
  console.log(value)
})
/*
async function getData() {
  return await (await fetch("https://akihikonakamura125.website/assignment7/recipes.json")).json();
}
getData()

function fetchData() {
  getData
    .then((data) => {
        console.log(data.data, 'data')
      const recipes = data.recipes
      console.log(recipes)
    }
    )}

fetchData()
*/

window.onload = () => {
  getData()
}
async function getData(){
  const response  = await fetch('recipes.json');
  const data = await response.json();
  console.log(data)
}

//let myRequest = new Request("recipes.json", recipes)
/*
const recipes = JSON.stringify(recipes)
console.log(recipes)
const fetchData = fetch('recipes.js')
  .then((response) => response.json())
  .then((data) => {
    return data;
    console.log(data)
  });

  
  function getData() {
    fetchData
      .then((data) => {
          console.log(data, 'data')
        const recipes = data.recipes
        console.log(recipes)
      }
      )}

  getData()




/*
fetch('./recipes.js')
  .then((response) => response.json())

  .then((data) => {
    fetchData(data);
    return data;
    console.log(data)
  })
  .catch((error) => {
    console.log(error);
  });



  /*
   function fetchData(){

    let recipes = data.recipes;
    
   }
   */