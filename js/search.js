const searchRecipe = async (searchBox) => {
  const res = await fetch("recipes.json");
  const data = await res.json();
  console.time();
  let fits = data.recipes.filter((recipe) => {
    console.log("try");
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