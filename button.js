//let ingredrop = document.getElementById('ingredients_search_dropdown');
let ingreinput = document.getElementById('ingredients_search_input');
           

ingredients_search_dropdown.addEventListener('click', function(){
  document.getElementById('ingredients_search_dropdown').style.zindex = "-1"
  document.getElementById('ingredients_search_input').style.display = "block"
  document.getElementById('ingredients_search_input').style.zindex = "1"
  document.querySelector('.fa-angle-up.ingre').style .display = "block"
  document.querySelector('.fa-angle-up.ingre').style .zindex = "1"
 })

 ingreinput.addEventListener('click', function(){
    document.getElementById('ingredients_search_dropdown').style.zindex = "1"
    document.getElementById('ingredients_search_dropdown').style.width = "200px"
    document.getElementById('ingredients_search_input').stytle.color = "transparent"
    document.getElementById('ingredients_search_input').style.display = none
   })

   let coInput = document.querySelector('.coco');
   /*
   ingreinput.addEventListener('input', function(e){
     coInput.innerHTML = ingreinput.e.target.value;
     })
     */
let devicedrop = document.getElementById('device_search_dropdown');
let deviceinput = document.getElementById('device_search_input');                  

devicedrop.addEventListener('click', function(){
  document.getElementById('device_search_input').style.display = "block"
  document.getElementById('device_search_dropdown').style.zindex = "-1"
  document.getElementById('device_search_dropdown').style.width = "160px"
  document.getElementById('device_search_input').style.zindex = "1"
 })

let usteDrop = document.getElementById('ustensils_search_dropdown');
let usteInput = document.getElementById('ustensils_search_input');                  

ustensils_search_dropdown.addEventListener('click', function(){
  document.getElementById('ustensils_search_input').style.display = "block"
  document.getElementById('ustensils_search_dropdown').style.zindex = "-1"
  document.getElementById('ustensils_search_dropdown').style.width = "200px"
  document.getElementById('ustensils_search_input').style.zindex = "1"
 })
/*
 let search = document.getElementById('search');

    ingredrop.addEventListener('click', function(){
     search.innerHTML = ingreinput.value;
    })
    */

    let cotext = document.getElementById('cotext');
  //  let coInput = document.querySelector('.coco');
    let point = document.querySelector('.fa-times-circle-o'); 

cotext.addEventListener("click", (e) => {
   coInput.style.display ="inline";
   cotext.style.display = "none"
   point.style.display = "none"
}
)

let ingreCancel = document.querySelector('i#ingre-cancel');
let ingredientsSearch = document.getElementById('ingre');

ingreCancel.addEventListener("click", (e) => {
  ingredientsSearch.style.display = "none";
}
)

