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

device_search_dropdown.addEventListener('click', function(){
  document.getElementById('device_search_dropdown').style.zindex = "-1"
  document.getElementById('device_search_input').style.display = "block"
  document.getElementById('device_search_input').style.zindex = "1"
  document.querySelector('.fa-angle-up.device').style .display = "block"
  document.querySelector('.fa-angle-up.device').style .zindex = "1"
 })

  ustensils_search_dropdown.addEventListener('click', function(){
  document.getElementById('ustensils_search_dropdown').style.width = "200px"
  document.getElementById('ustensils_search_input').style.zindex = "1"
  document.getElementById('ustensils_search_dropdown').style.zindex = "-1"
  document.getElementById('ustensils_search_input').style.display = "block"
  document.getElementById('ustensils_search_input').style.zindex = "1"
  document.querySelector('.fa-angle-up.uste').style .display = "block"
  document.querySelector('.fa-angle-up.uste').style .zindex = "1"
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
    let cocoClose = document.querySelector('.coco-close');

    /*
cotext.addEventListener("click", (e) => {
   coInput.style.display ="inline";
   cotext.style.display = "none"
   point.style.display = "inline"
   cocoClose.style.display = "inline"
}
)

let ingreCancel = document.querySelector('i#ingre-cancel');
let ingredientsSearch = document.getElementById('ingre');
@@ -72,5 +45,5 @@ ingreCancel.addEventListener("click", (e) => {
  ingredientsSearch.style.display = "none";
}
)
*/
$(document).on('click', 'select', function(){
  $(this).find('option').get(0).remove()
})