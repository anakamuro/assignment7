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
        .join("");
      html += `</div>`;
  
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
  
  deviceForm.addEventListener("submit", function (e) {
    e.preventDefault();
    searchDevice(device_search_input.value);
    deviceinput.innerHTML = " ";
  });
  