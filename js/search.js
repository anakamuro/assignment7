function linearSearch(value, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}




const searchRecipe = async (searchBox) => {
  const res = await fetch("recipes.json");
  const data = await res.json();
  console.time('binary')
  var recipeValue = "";
  // Output name from binary search

  data.recipes = data.recipes.sort()
  if (linearSearch(searchBox, data.recipes) == -1) {
    recipeValue = null;
  } else {
    recipeValue = data.recipes[linearSearch(searchBox, data.recipes)];
  }
  console.timeEnd('binary')
  let fits = data.recipes.filter((recipe) => {
    var ingredientValue = "";
    if (linearSearch(searchBox, recipe.ingredients) == -1) {
      ingredientValue = null;
    } else {
      ingredientValue =
        recipe.ingredients[linearSearch(searchBox, recipe.ingredients)]
          .ingredient;
    }
    return ingredientValue;
  });
}

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
  
    if (linearSearch(value, ingredientsList) != -1) {
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
    if (linearSearch(value, applianceList) != -1) {
      appliancesTags.push(value);
      allTags.push(value);
      outputDeviceHtmlContent(appliancesTags);
      filterAll(value);
    } else {
      outputDeviceHtmlContent([]);
    }
  
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
    if (linearSearch(value, ustensilssList) != -1) {
      ustensTags.push(value);
      allTags.push(value);
      outputUstenHtmlContent(ustensTags);
      filterAll(value);
    } else {
      outputUstenHtmlContent([]);
    }
  };