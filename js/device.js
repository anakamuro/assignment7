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
      .join("");
    html += `</div>`;
    html += `<div class="col s12">
        </div> `;
    document.getElementById("applianceList").innerHTML = html;
  } else {
    document.getElementById("applianceList").innerHTML =
      "No Appliance matches your criteria...";
  }
};

function removeDeviceTag(index) {
  appliancesTags.splice(index, 1);
  outputDeviceHtmlContent(appliancesTags);
  if (appliancesTags.length == 0) {
    document.getElementById("applianceList").innerHTML = "";
  }
}
