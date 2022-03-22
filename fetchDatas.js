const searchInput = document.querySelector(".search");

searchInput.addEventListener("input", (e) => {
  const value = e.target.value;
  console.log(value);
});
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
    let ingredientsList = [];
 // const ingredients = recipes.ingredients;
    for (var i = 0; i < recipes.length; i++){
    //  for (var j = 0; j < ingredients.length; j++){
    //    const {ingredients} = recipes[i].ingredients
     //   console.log(ingredients)
    //const {appliance, description, id, ingredients} = recipes[i];
    //console.log(id, ingredients, description, appliance)
   var output = document.querySelector('.content')
   console.log(output);
   recipeList.push(`<li>
   <div class="col-12 col-lg-4">
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
               <span>${recipes[i].name}: ${recipes[i].ingredients} ${recipes[i].ingredients}</span><br/>
               <span>${recipes[i].ingredients.ingredient}:  ${recipes[i].ingredients} ${recipes[i].ingredients}</span><br/>
               <span>${recipes[i].ingredients}:  ${recipes[i].ingredients} ${recipes[i].ingredients} cuilleres</span><br/>
               <span>${recipes[i].ingredients}:  ${recipes[i].ingredients} ${recipes[i].ingredients}</span><br/>
               <span>${recipes[i].ingredients}:  ${recipes[i].ingredients} ${recipes[i].ingredients}</span><br/>
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
//  }
}
  output.innerHTML = recipeList;
}
  
