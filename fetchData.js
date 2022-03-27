
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


window.onload = () => {
  getData()
}
*/
fetch("recipes.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    getContent(data);
  })
  .catch(function (err) {
    console.log("err", err);
  });

function getContent(data) {
  const recipes = data.recipes;
    console.log(recipes)
    let recipeList = []
 // const ingredients = recipes.ingredients;
    for (var i = 0; i < recipes.length; i++){
    
    //    const {ingredients} = recipes[i].ingredients
     //   console.log(ingredients)
    //const {appliance, description, id, ingredients} = recipes[i];
    //console.log(id, ingredients, description, appliance)
   var output = document.querySelector('.row');

   let ingredient_list = []
   for(var j = 0; j < (recipes[i].ingredients).length; j++){
     {
       ingredient_list.push(`<strong>${recipes[i].ingredients[j].ingredient}:</strong>
       ${recipes[i].ingredients[j].quantity ? recipes[i].ingredients[j].quantity: ''} ${recipes[i].ingredients[j].unit ? recipes[i].ingredients[j].unit : ''} <br>`)
     }
   }
   recipeList.push(`<li>
   <div class="col dot">
       <div class="card row mr-4 mb-4">
         <svg class="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg"
         preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Image cap">
         <title>Placeholder</title>
         <rect width="100%" height="100%" fill="#C7BFBD"></rect>
       </svg>
       <div class="card-body row c1">
           <h5 class="card-title">${recipes[i].name} <span class="watch"><i class="fa fa-clock-o"></i>&nbsp;10 min</span></h5>
           <div class="row">
           <div class="card-text text-left w-50 col-6">
           <span class="list">${ingredient_list}</span><br/>
           
           </div>
             <div class="card-text2 text-left w-50 col-6">
               ${recipes[i].description}
                 </div>
                 </div>
         </div>
       </div>
     </div>
   
   
   
   
   
   </li>`)
  
   
  //output.appendChild(divList).join('');
 }
  output.innerHTML = recipeList
}
  
const searchInput = document.querySelector(".search");

searchInput.addEventListener("input", (e) => {
  e.preventDefault()
  const searchQuery = e.target.value;
     getContent(searchQuery)
  })
  
  async function getContent(searchQuery){
    const response = await fetch(`akihikonakamura125.website/assignment7/${searchQuery}`)
    const responseData = await response.json()
    console.log(responseData)
  }

  /*
  const searchStates = async searchText => {
    const data = await fetch('recipes.json')
    const recipes = data.recipes;
    console.log(recipes)
  
    let matches = recipes.filter(recipe =>{
      const regex = new RegExp(`^${searchText}`, `gi`);
      return recipe.name.match(regex) || recipe.id.match(regex)
    })
    console.log(matches)
  }
*/

/*
    function ingredientsContent(){
          getContent()
            .then((data) => {
            const recipes = data.recipes;
    console.log(recipes)
 // const ingredients = recipes.ingredients;
    for (var i = 0; i < recipes.length; i++){
    
    //    const {ingredients} = recipes[i].ingredients
     //   console.log(ingredients)
    //const {appliance, description, id, ingredients} = recipes[i];
    //console.log(id, ingredients, description, appliance)
   let ingredientContent = document.querySelector('.ingredient');
    
   let ingredientList = []
   for(var j = 0; j < (recipes[i].ingredients).length; j++){
     {
       ingredientList.push(`<strong>${recipes[i].ingredients[j].ingredient}:</strong><br>`)
     }
   }
  
   ingredientContent.innerHTML = `<li>
   <div class="col dot">
       <div class="card row mr-4 mb-4">
        ${ingredientList}
       </div>
     </div>
   </li>`
    }
  }
}
  //output.appendChild(divList).join('');
  ingredientsContent()
*/
            
    