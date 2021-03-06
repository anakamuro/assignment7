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
    html += `</div>`;
    html += `<div class="col s12">
   </div> `;
    document.getElementById("ustensilssList").innerHTML = html;
  } else {
    document.getElementById("ustensilssList").innerHTML =
      "No ustensils matches your criteria...";
  }
};

function removeUstensilsTag(index) {
  ustensTags.splice(index, 1);
  outputUstenHtmlContent(ustensTags);
  if (ustensTags.length == 0) {
    document.getElementById("ustensilssList").innerHTML = "";
  }
}