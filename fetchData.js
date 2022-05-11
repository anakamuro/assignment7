var ingredientsTags = [];
var allTags = [];
var appliancesTags = [];
var ustensTags = [];
var ingredientsList = `<option value="ingredients">Ingredients</option>`;
var deviceList = [];
var deviceListOptions = `<option value="devices">Device</option>`;
var ustensilsList = [];
var ustensilsListOptions = `<option value="ustensils">Ustensils</option>`;

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
          `<option value="${recipes[i].ingredients[j].ingredient}">${recipes[i].ingredients[j].ingredient}</option>`;
          deviceList.push(recipes[i].appliance);

           for(var k=0; k < (recipes[i].ustensils).length; k++){
             ustensilsList.push(recipes[i].ustensils[k]);
           }
          }
        }

       newDeviceList = removeDuplicates(deviceList);
       for (var i = 0; i < newDeviceList.length; i++){
       deviceListOptions =
          deviceListOptions +
          `<option value="${newDeviceList[i]}">${newDeviceList[i]}</option>`;
       }
       newUstensilsList = removeDuplicates(ustensilsList);
       for (var i = 0; i < newUstensilsList.length; i++){
        ustensilsListOptions =
          ustensilsListOptions +
          `<option  value="${newUstensilsList[i]}" >${newUstensilsList[i]}</option>`;
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
  var output = document.querySelector(".row");
  if(recipes.length != 0){
  let recipeList = [];
  for (var i = 0; i < recipes.length; i++) {
     
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
} else {
  output.innerHTML = "No items are found"
}
}

const searchRecipe = async (searchBox) => {
  const res = await fetch("recipes.json");
  const data = await res.json();
   console.time();
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
  console.timeEnd()
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
     <h4 id="recipeSearch" class="card-title m1" onclick="filterRecipe('${fit.name}')">${fit.name}</h4>
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

const filterRecipe = async (searchBox) => {
  document.getElementById("recipeList").innerHTML = "";
  document.getElementById("search").value = searchBox;
  const res = await fetch("recipes.json");
  const recipes = await res.json();
  let fits = recipes.recipes.filter((recipe) => {
    return recipe.name == searchBox;
  });
  getContent(fits);
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

//ingredients

const searchIngredients = async (value) => {
  const res = await fetch("recipes.json");
  const data = await res.json();

  ingredientsList = [];
  recipes = data.recipes;
  for (var i = 0; i < recipes.length; i++) {
    for (var j = 0; j < recipes[i].ingredients.length; j++) {
      ingredientsList.push(recipes[i].ingredients[j].ingredient);
      console.log('ingredientsList')
    }
  }
  ingredientsList = ingredientsList.sort();
  if (binary(value, ingredientsList) != -1) {
    ingredientsTags.push(value);
    allTags.push(value);
    outputHtmlContent(ingredientsTags);
    filterAll(value);
  } else {
    outputHtmlContent([]);
  }
};


const filterIngredient = async (searchBox) => {
  document.getElementById("recipeList").innerHTML = "";

  const res = await fetch("recipes.json");
  const recipes = await res.json();
  let fits = recipes.recipes.filter((recipe) => {
    return (
        recipe.ingredients[0].ingredient == searchBox ||
        recipe.ingredients[1].ingredient == searchBox ||
        recipe.ingredients[2].ingredient == searchBox ||
        (recipe.ingredients[3]
          ? recipe.ingredients[3].ingredient == searchBox
          : null) ||
        (recipe.ingredients[4]
          ? recipe.ingredients[4].ingredient == searchBox
          : null)
    );
  });
  getContent(fits);
};

const outputHtmlContent = (fits) => {
  if (fits.length > 0) {
    var html = `<div id="ingredientMain">`;
     html = fits
      .map(
        (fit, index) => `
        
        <h4 id="ingredientsSearch" class="card title m1" onclick="filterAll('${fit}')">${fit}&nbsp;<i id="ingre-cancel" onclick=removeTag(${index}) class="fa fa-times-circle-o ingre-cancel" aria-hidden="true"></i></h4>
       `
      )
      .join("");
     html+= `</div>`
     html+=  `<div class="col s12">
      <h4 id="ingredientSearch" class="card title m1" onclick="filterAll('${fits[fits.length - 1]}')">${fits[fits.length -1]}</h4>
   </div>`
    document.getElementById("ingredientsList").innerHTML = html;
  } else {
    document.getElementById("ingredientsList").innerHTML = "No ingredient matches your criteria...";
  }
};

function removeTag(index){
  allTags.splice(index, 1)
  ingredientsTags.splice(index, 1)
  outputHtmlContent(allTags)
  if(ingredientsTags.length == 0 | allTags.length == 0){
    document.getElementById("ingredientsList").innerHTML = "";
  }
}

ingredientsForm.addEventListener("submit", function (e) {
  e.preventDefault();
  searchIngredients(ingreinput.value);
  ingreinput.innerHTML = " ";
});

//Device

const searchDevice = async (value) => {
  const res = await fetch("recipes.json");
  const data = await res.json();

  applianceList = [];
  recipes = data.recipes;
  for (var i = 0; i < recipes.length; i++) {
      applianceList.push(recipes[i].appliance);
  }
  applianceList = applianceList.sort();
  if (binary(value, applianceList) != -1) {
    appliancesTags.push(value);
    allTags.push(value);
    outputDeviceHtmlContent(appliancesTags);
    filterAll(value);
  } else {
    outputDeviceHtmlContent([]);
  }
};

const filterDevice = async (searchBox) => {
  document.getElementById("recipeList").innerHTML = "";
  const res = await fetch("recipes.json");
  const recipes = await res.json();
  let fits = recipes.recipes.filter((recipe) => {
    return recipe.appliance == searchBox;
  });
  getContent(fits);
};

const outputDeviceHtmlContent = (fits) => {
  if (fits.length > 0) {
    var html = `<div id="applianceMain">`;
    html = fits
     .map(
       (fit, index) => `
        <h4 id="devicesSearch" class="card title m1" onclick="filterAll('${fit}')">${fit}&nbsp;<i id="ingre-cancel" onclick=removeDeviceTag(${index}) class="fa fa-times-circle-o" aria-hidden="true"></i></h4>
        `
      )
      .join("")
    html+= `</div>`;
    html+= `<div class="col s12">
           <h4 id="deviceSearch" class="card title m1" onclick="filterAll('${fits[fits.length-1]}')">${fits[fits.length-1]}</h4>
        </div> `;
    document.getElementById("applianceList").innerHTML = html;
  } else {
    document.getElementById("applianceList").innerHTML = "No Appliance matches your criteria...";
  }
};

function removeDeviceTag(index) {
  appliancesTags.splice(index,1);
  allTags.splice(index, 1)
  outputDeviceHtmlContent(allTags);
  if (appliancesTags.length == 0){
  document.getElementById("applianceList").innerHTML = "";
}
}

deviceForm.addEventListener("submit", function (e) {
  e.preventDefault();
  searchDevice(device_search_input.value);
  deviceinput.innerHTML = " ";
});

//ustensils

const searchUstensils = async (value) => {
  const res = await fetch("recipes.json");
  const data = await res.json();

  ustensilssList = [];
  recipes = data.recipes;
  for (var i = 0; i < recipes.length; i++) {
    for (var j = 0; j < recipes[i].ustensils.length; j++) {
      ustensilssList.push(recipes[i].ustensils[j]);
    }
  }
  ustensilssList = ustensilssList.sort();
  if (binary(value, ustensilssList) != -1) {
    ustensTags.push(value);
    allTags.push(value);
    outputUstenHtmlContent(ustensTags);
    filterAll(value);
  } else {
    outputUstenHtmlContent([]);
  }
};

const filterUstensils = async (searchBox) => {
  document.getElementById("recipeList").innerHTML = "";

  const res = await fetch("recipes.json");
  const recipes = await res.json();
  let fits = recipes.recipes.filter((recipe) => {
    return (
      recipe.ustensils[0] == searchBox ||
      recipe.ustensils[1] == searchBox ||
      (recipe.ustensils[2] ? recipe.ustensils[2] == searchBox : null) ||
      (recipe.ustensils[3] ? recipe.ustensils[3] == searchBox : null) ||
      (recipe.ustensils[4] ? recipe.ustensils[4] == searchBox : null) 
    );
  });
  getContent(fits);
};

const outputUstenHtmlContent = (fits) => {
  if (fits.length > 0) {
    var html = `<div id="ustenMain">`;
     html = fits
      .map(
        (fit, index) => `
        <h4 id="ustensSearch" class="card title m1" onclick="filterAll('${fit}')">${fit}&nbsp;<i id="ingre-cancel" onclick=removeUstensilsTag(${index}) class="fa fa-times-circle-o" aria-hidden="true"></i></h4>
       `
      )
      .join("");
      html+= `</div>`
      html+= `<div class="col s12">
      <h4 id="ustenSearch" class="card title m1" onclick="filterAll('${fits[fits.length - 1]}')">${fits[fits.length - 1]}</h4>
   </div> `;
    document.getElementById("ustensilssList").innerHTML = html;
  } else {
    document.getElementById("ustensilssList").innerHTML = "No ustensils matches your criteria...";
  }
};

function removeUstensilsTag(index){
  ustensTags.splice(index,1);
  allTags.splice(index, 1);
  outputUstenHtmlContent(allTags);
  if (ustensTags.length == 0){
  document.getElementById("ustensilssList").innerHTML = "";
}
}

ustenForm.addEventListener("submit", function (e) {
  e.preventDefault();
  searchUstensils(ustensils_search_input.value);
  usteInput.innerHTML = " ";
});

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
/*
 const obj = JSON.parse('./recipes.json');
 console.log(obj)
 */

 let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9 ];

  function linearSearch(arr, elem){
    for(let i = 0; i< arr.length; i++){
      if(arr[i] === elem){
        return i;
      }
    }
    return -1;
  }

  console.log(linearSearch(arr, -5))

  // ingredientsTags
  // appliancesTags
  // ustensTags

   const filterAll = async (searchBox) => {
     searchBox = allTags
     document.getElementById("recipeList").innerHTML = '';

     const res = await fetch("recipes.json");
     const recipes = await res.json();
     console.log("search", searchBox)

     let fits = [];
    for (var i = 0; i < searchBox.length; i++){
       fits.push(recipes.recipes.filter((recipe) => {
         filtered_data =
         (recipe.ingredients[0].ingredient == searchBox[i] ||
         recipe.ingredients[1].ingredient == searchBox[i] ||
         recipe.ingredients[2].ingredient == searchBox[i] ||
        (recipe.ingredients[3]? recipe.ingredients[3].ingredient == searchBox[i]: null) ||
        (recipe.ingredients[4]? recipe.ingredients[4].ingredient == searchBox[i]: null) )||
        (recipe.ustensils[0] == searchBox[i] ||
         recipe.ustensils[1] == searchBox[i] ||
        (recipe.ustensils[2] ? recipe.ustensils[2] == searchBox[i]: null) ||
        (recipe.ustensils[3] ? recipe.ustensils[3] == searchBox[i]: null) ||
        (recipe.ustensils[4] ? recipe.ustensils[4] == saerchBox[i]: null)) ||
        (recipe.appliance == searchBox[i])
              
        return filtered_data
     }));
    }

    let final_array = []
    let id_array = []
    for(var i=0; i< fits.length; i++){
      for(var j=0; j<fits[i].length; j++){
        final_array.push(fits[i][j])
      }
    }

    for(var i =0; i<final_array.length; i++){
      id_array.push(final_array[i].id)
    }
  //********* */
    console.log(id_array)
    const set = new Set(id_array);
    const duplicates = id_array.filter(item =>{
      if(set.has(item)){
        set.delete(item)
      } else {
        return item;
      }
    });

    console.log("dup", duplicates)
  //************* */

  if(searchBox.length <= 1){
    getContent(final_array)
  }
  else{
    if(duplicates.length !=0){
      let process_array = []
  
  
      for(var i=0; i<duplicates.length; i++){
        
        for(var j=0; j<final_array.length;j++ ){
  
          if(parseInt(final_array[i].id) == parseInt(duplicates[j])){
  
            process_array.push(final_array[i])
    
          }
        }
      }
      console.log(process_array)
      final_array = process_array
      getContent(final_array)
    }
    else{
      getContent([])
    }
   
    // ************************** 
  }};