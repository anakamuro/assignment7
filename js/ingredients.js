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
    html += `</div>`;
    html += `<div class="col s12">
     </div>`;
    document.getElementById("ingredientsList").innerHTML = html;
  } else {
    document.getElementById("ingredientsList").innerHTML =
      "No ingredient matches your criteria...";
  }
};


function removeTag(index) {
    ingredientsTags.splice(index, 1);
    outputHtmlContent(ingredientsTags);
    
    if (ingredientsTags.length == 0) {
      document.getElementById("ingredientsList").innerHTML = "";
    }
  }
  


