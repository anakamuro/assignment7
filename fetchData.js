var ingredientsList = `<option value="ingredients">Ingredients</option>`;
var deviceList = [];
var deviceListOptions = `<option value="ingredients">Device</option>`;
var ustensilsList = [];
var ustensilsListOptions = `<option value="ingredients">Utensils</option>`;

ingredients_search_dropdown = document.getElementById(
  "ingredients_search_dropdown"
);
device_search_dropdown = document.getElementById("device_search_dropdown");
ustensils_search_dropdown = document.getElementById(
  "ustensils_search_dropdown"
);

fetch("recipes.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    recipes = data.recipes;
    for (var i = 0; i < recipes.length; i++) {
      for (var j = 0; j < recipes[i].ingredients.length; j++) {
        ingredientsList =
          ingredientsList +
          `<option value="${recipes[i].ingredients[j].ingredient}'>${recipes[i].ingredients[j].ingredient}</option>`;
          deviceList.push(recipes[i].appliance)

           for(var k=0; k < (recipes[i].ustensils).length; k++){
             ustensilsList.push(recipes[i].ustensils[k])
           }
         console.log(ustensilsList)
          }
        }

       newDeviceList = removeDuplicates(deviceList);
       for (var i=0; i < newDeviceList.length; i++){
       deviceListOptions =
          deviceListOptions +
          `<option value="${newDeviceList[i]}'>${newDeviceList[i]}</option>`;
       }
       newUstensilsList = removeDuplicates(ustensilsList);
       for (var i=0; i < newUstensilsList.length; i++){
        ustensilsListOptions =
          ustensilsListOptions +
          `<option value="${newUstensilsList[i]}'>${newUstensilsList[i]}</option>`;
      }
    
    ingredients_search_dropdown.innerHTML =
      '<input type="text" placeholder="Search.." id="myInput" onkeyup="filterFunction()">' +
      ingredientsList;
    device_search_dropdown.innerHTML = deviceListOptions;
    ustensils_search_dropdown.innerHTML = ustensilsListOptions;
    getContent(data.recipes);
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

const searchRecipe = async (searchBox) => {
  const res = await fetch("recipes.json");
  const data = await res.json();
  //console.log(recipes)

  let fits = data.recipes.filter((recipe) => {
    console.log("try")
    const regex = new RegExp(`^${searchBox}`, "gi");
    return (
      recipe.name.match(regex) ||
      recipe.description.match(regex) ||
      recipe.ingredients[0].ingredient.match(regex) ||
      recipe.ingredients[1].ingredient.match(regex) ||
      (recipe.ingredients[2]
        ? recipe.ingredients[2].ingredient.match(regex)
        : null) ||
      (recipe.ingredients[3]
        ? recipe.ingredients[3].ingredient.match(regex)
        : null) ||
      (recipe.ingredients[4]
        ? recipe.ingredients[4].ingredient.match(regex)
        : null)
    );
  });

  if (searchBox.length === 0) {
    fits = [];
    recipeList.innerHTML = "";
  }
  outputHtml(fits);
};

const outputHtml = (fits) => {
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
      .join("");

    document.getElementById("recipeList").innerHTML = html;
  }
};

document.getElementById("search").addEventListener("input", (e) => {
  if (e.target.value.length >= 3) {
    searchRecipe(search.value);
  }
  if (e.target.value.length < 3) {
    fits = [];
    recipeList.innerHTML = "";
  }
});

const filterRecipe = async (searchBox) => {
  document.getElementById("recipeList").innerHTML = "";

  const res = await fetch("recipes.json");
  const recipes = await res.json();
  let fits = recipes.recipes.filter((recipe) => {
    return recipe.name == searchBox;
  });
  getContent(fits);
};

const filterIngredient = async (searchBox) => {
  document.getElementById("recipeList").innerHTML = "";

  const res = await fetch("recipes.json");
  const recipes = await res.json();
  console.log(recipes.recipes)
  console.log(typeof(recipes.recipes))
  let fits = recipes.recipes.filter((recipe) => {
    console.log("78452",recipe.ingredients[0].ingredient)
    return recipe.ingredients[0].ingredient == searchBox ||
           recipe.ingredients[1].ingredient == searchBox ||
           recipe.ingredients[2].ingredient == searchBox ||
           (recipe.ingredients[3]? recipe.ingredients[3].ingredient == searchBox: null) ||
           (recipe.ingredients[4]? recipe.ingredients[4].ingredient == searchBox: null)
  });
  getContent(fits);
};

const filterDevice = async (searchBox) => {
  document.getElementById("recipeList").innerHTML = "";

  const res = await fetch("recipes.json");
  const recipes = await res.json();
  console.log(recipes.recipes)
  console.log(typeof(recipes.recipes))
  let fits = recipes.recipes.filter((recipe) => {
    console.log("78452",recipe.appliance)
    return recipe.appliance == searchBox 
  });
  getContent(fits);
};

const filterUstensils = async (searchBox) => {
  document.getElementById("recipeList").innerHTML = "";

  const res = await fetch("recipes.json");
  const recipes = await res.json();
  console.log(recipes.recipes)
  console.log(typeof(recipes.recipes))
  let fits = recipes.recipes.filter((recipe) => {
    console.log("78452",recipe.appliance)
    return recipe.ustensils == searchBox 
  });
  getContent(fits);
};


const binary = (val, arr) => {
  let lower = 0;
  let upper = arr.length - 1;

  while (lower <= upper) {
    console.log("try");
    const middle = lower + Math.floor((upper - lower) / 2);

    if (val === arr[middle]) {
      return middle;
    }
    if (val < arr[middle]) {
      upper = middle - 1;
    } else {
      lower = middle + 1;
    }
  }
  return -1;
};
// console.log(binary('Brown Sugar', 'searchedValue'))
ingredientsForm.addEventListener("submit", function (e) {
  e.preventDefault();
  searchIngredients(ingreinput.value);
  ingreinput.innerHTML = " ";
});

const searchIngredients = async (value) => {
  const res = await fetch("recipes.json");
  const data = await res.json();

  ingredientsList = [];
  recipes = data.recipes;
  for (var i = 0; i < recipes.length; i++) {
    for (var j = 0; j < recipes[i].ingredients.length; j++) {
      ingredientsList.push(recipes[i].ingredients[j].ingredient);
    }
  }
  ingredientsList = ingredientsList.sort();
  if (binary(value, ingredientsList) != -1) {
    outputHtmlContent([value]);
  } else {
    outputHtmlContent([]);
  }
};

const searchDevice = async (value) => {
  const res = await fetch("recipes.json");
  const data = await res.json();

  deviceList = [];
  recipes = data.recipes;
  for (var i = 0; i < recipes.length; i++) {
      deviceList.push(recipes[i].appliance);
    }
  }
  deviceList = deviceList.sort();
  if (binary(value, deviceList) != -1) {
    outputDeviceContent([value]);
  } else {
    outputDeviceContent([]);
  }

const outputHtmlContent = (fits) => {
  if (fits.length > 0) {
    const html = fits
      .map(
        (fit) => `
          <div id="ingredientSearch" class="col s12">
           <h4 id="ingredientSearch" class="card title m1" onclick="filterIngredient('${fit}')">${fit}</h4>
        </div> `
      )
      .join("");
    document.getElementById("ingredientsList").innerHTML = html;
  } else {
    document.getElementById("ingredientsList").innerHTML = "No recipe matches your criteria...";
  }
};

const outputDeviceContent = (fits) => {
  if (fits.length > 0) {
    const html = fits
      .map(
        (fit) => `
          <div id="ingredientSearch" class="col s12">
           <h4 id="ingredientSearch" class="card title m1" onclick="filterDevice('${fit}')">${fit}</h4>
        </div> `
      )
      .join("");
    document.getElementById("deviceList").innerHTML = html;
  } else {
    document.getElementById("deviceList").innerHTML = "No recipe matches your criteria...";
  }
};

const searchUstensils = async (value) => {
  const res = await fetch("recipes.json");
  const data = await res.json();

  ustensilsList = [];
  recipes = data.recipes;
  for (var i = 0; i < recipes.length; i++) {
      ustensilsList.push(recipes[i].ustensils);
    }
  }
  ustensilsList = ustensilsList.sort();
  if (binary(value, ustensilsList) != -1) {
    outputUsetenContent([value]);
  } else {
    outputUstenContent([]);
  }

  const outputUstenContent = (fits) => {
    if (fits.length > 0) {
      const html = fits
        .map(
          (fit) => `
            <div id="ingredientSearch" class="col s12">
             <h4 id="ingredientSearch" class="card title m1" onclick="filterUstensils('${fit}')">${fit}</h4>
          </div> `
        )
        .join("");
      document.getElementById("ustensilsList").innerHTML = html;
    } else {
      document.getElementById("ustensilsList").innerHTML = "No recipe matches your criteria...";
    }
  };

function removeDuplicates(arr){
  return arr.filter((item, index)=> arr.indexOf(item) === index);
}

function selIngredient(){
  var ingredientsDropdown = document.getElementById('ingredients_search_dropdown');
  document.getElementById("ingredients_search_input").value = ingredientsDropdown.options[ingredientsDropdown.selectedIndex].text;
}
function selDevice(){
  var deviceDropdown = document.getElementById('device_search_dropdown');
  document.getElementById("device_search_input").value = deviceDropdown.options[deviceDropdown.selectedIndex].text;
}
function selUstensils(){
  var ustenDropdown = document.getElementById('ustensils_search_dropdown');
  document.getElementById("ustensils_search_input").value = ustenDropdown.options[ustenDropdown.selectedIndex].text;
}