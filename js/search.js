const searchRecipe = async (searchBox) => {
  const res = await fetch("recipes.json");
  const data = await res.json();
  console.time('binary')
  var recipeValue = "";
  // Output name from binary search

  data.recipes = data.recipes.sort()
  if (binarySearchNameDescription(searchBox, data.recipes) == -1) {
    recipeValue = null;
  } else {
    recipeValue = data.recipes[binarySearchNameDescription(searchBox, data.recipes)];
  }
  console.timeEnd('binary')
  let fits = data.recipes.filter((recipe) => {
    var ingredientValue = "";
    if (binarySearchIngredient(searchBox, recipe.ingredients) == -1) {
      ingredientValue = null;
    } else {
      ingredientValue =
        recipe.ingredients[binarySearchIngredient(searchBox, recipe.ingredients)]
          .ingredient;
    }
    return ingredientValue;
  });

  if (searchBox.length === 0) {
    fits = [];
    recipeList.innerHTML = "";
  }
  console.log(fits);
  if (recipeValue != null) {
    fits.push(recipeValue);
  }
  outputHtml(fits);
};

const binarySearchIngredient = (val, arr) => {
  const regex = new RegExp(`^${val}`, "gi");
  let lower = 0;
  let upper = arr.length - 1;

  while (lower <= upper) {
    // console.log("try");
    const middle = lower + Math.floor((upper - lower) / 2);

    if (arr[middle].ingredient.match(regex)) {
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

const binarySearchNameDescription = (val, arr) => {
  const regex = new RegExp(`^${val}`, "gi");

  let lower = 0;
  let upper = arr.length - 1;
  console.time('binary')
  while (lower <= upper) {
    // console.log("try");
    const middle = lower + Math.floor((upper - lower) / 2);
    if (arr[middle].name.match(regex) || arr[middle].description.match(regex)) {
      return middle;
    }
    if (val < arr[middle]) {
      upper = middle - 1;
    } else {
      lower = middle + 1;
    }
  }
  return -1;
  console.timeEnd('binary')
};

const searchIngredients = async (value) => {
    const res = await fetch("recipes.json");
    const data = await res.json();
  
    ingredientsList = [];
    recipes = data.recipes;
    for (var i = 0; i < recipes.length; i++) {
      for (var j = 0; j < recipes[i].ingredients.length; j++) {
        ingredientsList.push(recipes[i].ingredients[j].ingredient);
        console.log("ingredientsList");
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