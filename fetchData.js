
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
    getContent(data.recipes);
  })
  .catch(function (err) {
    console.log("err", err);
  });

function getContent(recipes) {
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
  

/*
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
*/

//const searchInput = document.querySelector(".search");
  const searchStates = async searchText => {
    const res = await fetch('recipes.json')
    const data = await res.json();
    //console.log(recipes)
  
    let matches = data.recipes.filter(recipe =>{
      for (let i = 0; i < recipe.ingredients.length; i++) {
        for (let j = 0; j < recipe.ingredients[i].ingredient.length; j++) {
      const regex = new RegExp(`^${searchText}`, 'gi');
      return recipe.name.match(regex) || recipe.description.match(regex) || recipe.ingredients[i].ingredient[j].match(regex)
      }
    }
    });

    if(searchText.length === 0){
      matches = [];
      matchList.innerHTML = ''
    }
    outputHtml(matches)
  }

  const outputHtml = matches => {
    if(matches.length > 0) {
     const html = matches.map(match => `
       <div class="card card-body mb-1">
     <h4>${match.name}
       </h4>
       
       </div>
     `
     )
     .join('')

     document.getElementById('matchList').innerHTML = html
    }
  }

  document.getElementById('search').addEventListener('input', (e)=>{
    if((e.target.value).length >= 3){
       searchStates(search.value)
    }
    if((e.target.value).length < 3){
      matches = [];
      matchList.innerHTML = '';
   }
  })

 const filterRecipe = async searchText =>{
 document.getElementById('matchList').innerHTML = '';

  const res = fetch('recipes.json');
  const recipes =  await res.json()

  let matches = recipes.recipes.filter(recipe => {
      return recipe.name == searchText
  })
  console.log(matches)
  getContent(matches)
 }

/*
    function ingredientsContent(){
          getContent()
            .then((recipes) => {
    console.log(recipes)
 // const ingredients = recipes.ingredients;
    
    //    const {ingredients} = recipes[i].ingredients
     //   console.log(ingredients)
    //const {appliance, description, id, ingredients} = recipes[i];
    //console.log(id, ingredients, description, appliance)
   let ingredientContent = document.querySelector('.ingredient');
    
   let ingredientList = []
   for (var i = 0; i < recipes.length; i++){
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
*/
  //output.appendChild(divList).join('');
  ingredientsContent()

            
    