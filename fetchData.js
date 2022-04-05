var ingredientsList = `<option value="ingredients">Ingredients</option>`
 var deviceList = `<option value="ingredients">Device</option>`
 var ustensilsList = `<option value="ingredients">Utensils</option>`

 ingredients_search_dropdown = document.getElementById("ingredients_search_dropdown")
 device_search_dropdown = document.getElementById("device_search_dropdown")
 ustensils_search_dropdown = document.getElementById("ustensils_search_dropdown")

fetch("recipes.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    recipes = data.recipes
    for (var i = 0; i < recipes.length; i++) {
      for (var j = 0; j < recipes[i].ingredients.length; j++){
        ingredientsList = ingredientsList +(`<option value="${recipes[i].ingredients[j].ingredient}'>${recipes[i].ingredients[j].ingredient}</option>`)
        deviceList = deviceList +(`<option value="${recipes[i].appliance}'>${recipes[i].appliance}</option>`)
        ustensilsList = ustensilsList +(`<option value="${recipes[i].ustensils}'>${recipes[i].ustensils}</option>`)
      }
    }
    console.log(deviceList)
    ingredients_search_dropdown.innerHTML = '<input type="text" placeholder="Search.." id="myInput" onkeyup="filterFunction()">' + (ingredientsList)
    device_search_dropdown.innerHTML = (deviceList)
    ustensils_search_dropdown.innerHTML = (ustensilsList)
    getContent(data.recipes)
  })
  .catch(function (err) {
    console.log("err", err);
  });

function getContent(recipes) {
  console.log(recipes);
  let recipeList = [];
  for (var i = 0; i < recipes.length; i++) {
    var output = document.querySelector(".row");

    let ingredient_list = [];
    for (var j = 0; j < recipes[i].ingredients.length; j++) {
      {
        ingredient_list.push(`<strong>${
          recipes[i].ingredients[j].ingredient
        }:</strong>
       ${
         recipes[i].ingredients[j].quantity
           ? recipes[i].ingredients[j].quantity
           : ""
       } ${
          recipes[i].ingredients[j].unit ? recipes[i].ingredients[j].unit : ""
        } <br>`);
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
   </li>`);

  }
  output.innerHTML = recipeList;
}


const searchRecipe = async searchBox => {
  const res = await fetch("recipes.json");
  const data = await res.json();
  //console.log(recipes)

  let fits = data.recipes.filter(recipe => {
        const regex = new RegExp(`^${searchBox}`, "gi");
        return recipe.name.match(regex) || recipe.description.match(regex) || recipe.ingredients[0].ingredient.match(regex) 
          || recipe.ingredients[1].ingredient.match(regex) || (recipe.ingredients[2] ? recipe.ingredients[2].ingredient.match(regex) :null)
          ||(recipe.ingredients[3] ? recipe.ingredients[3].ingredient.match(regex) :null) || (recipe.ingredients[4] ? recipe.ingredients[4].ingredient.match(regex) :null) 
         // || (recipe.ingredients[5] ? recipe.ingredients[5].ingredient.match(regex) :null)
      });

  if (searchBox.length === 0) {
    fits = [];
    recipeList.innerHTML = "";
  }
  outputHtml(fits);
};

const outputHtml = fits => {
  if (fits.length > 0) {
    const html = fits
      .map(
        (fit) => `
       <div class="row">
       <div class="col s12">
       <div class="card grey darken-4 darken-1">
       <div class="card-content white-text">
     <h4 id="recipeSearch class="card-title m1" onclick="filterRecipe('${fit.name}')">${fit.name}</h4>
       </div>
       </div>
       </div>
       </div>
       </div>
       `
       )
      .join('');

    document.getElementById("recipeList").innerHTML = html;
  }
};

document.getElementById('search').addEventListener("input", (e) => {
  if ((e.target.value).length >= 3) {
    searchRecipe(search.value);
  }
  if ((e.target.value).length < 3) {
    fits = [];
    recipeList.innerHTML = "";
  }
});

const filterRecipe = async searchBox => {
  document.getElementById('recipeList').innerHTML = ""

  const res = await fetch("recipes.json");
  const recipes = await res.json();

  let fits = recipes.recipes.filter(recipe => {
    return recipe.name == searchBox;
  });
  console.log(fits);
  getContent(fits);
};


let ingredrop = document.getElementById('select#ingredients_search_dropdown');
let ingreinput = document.getElementById('input#ingredients_search_input.btn.btn-primary.btn2');                  

 ingredrop.addEventListener('click', function(){
  document.getElementById('select#ingredients_search_dropdown').style.display = "none"
  document.getElementById('input#ingredients_search_input.btn.btn-primary.btn2').style.display = "block"
 })

 let devicedrop = document.getElementById('select#device_search_dropdown');
let deviceinput = document.getElementById('input#device_search_input.btn.btn-primary.btn2');                  

 devicedrop.addEventListener('click', function(){
  document.getElementById('select#device_search_dropdown').style.display = "none"
  document.getElementById('input#device_search_input.btn.btn-primary.btn2').style.display = "block"
 })

 let usteDrop = document.getElementById('select#ustensils_search_dropdown');
let usteInput = document.getElementById('input#ustensils_search_input.btn.btn-primary.btn2');                  

 usteDrop.addEventListener('click', function(){
  document.getElementById('select#ustensils_search_dropdown').style.display = "none"
  document.getElementById('input#ustensils_search_input.btn.btn-primary.btn2').style.display = "block"
 })


 /*
 var search = function(nums, target){
   let left = 0;
   let right = nums.length - 1
   return bst(left, right, nums, target)
 }

 const bst = (left, right, nums, target)=> {
   const mid = (left + Math.floor((right - left)/2))
   if(left < right){
     if (nums[mid] === target){
       return mid
     } else if (nums [mid] < target){
       return bst (mid + 1, right, nums, target)
     } else {
       return bst(left, mid-1, nums, target)
     }
   }
   return -1;
 }
 */