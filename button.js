let ingredrop = document.getElementById('ingredients_search_dropdown');
let ingreinput = document.getElementById('ingredients_search_input');
let ingredientsForm = document.getElementById('ingredientsForm');                  

ingredrop.addEventListener('click', function(){
  document.getElementById('ingredients_search_dropdown').style.zindex = "-1"
  document.getElementById('ingredients_search_input').style.display = "block"
  document.getElementById('ingredients_search_input').style.zindex = "1"
  document.querySelector('fa-angle-up').style .display = "block"
 })

 ingreinput.addEventListener('click', function(){
    document.getElementById('ingredients_search_dropdown').style.zindex = "1"
    document.getElementById('ingredients_search_input').stytle.color = "transparent"
    document.getElementById('ingredients_search_input').style.display = none
   })
let devicedrop = document.getElementById('device_search_dropdown');
let deviceinput = document.getElementById('device_search_input');                  

device_search_dropdown.addEventListener('click', function(){
  document.getElementById('device_search_input').style.display = "block"
  document.getElementById('device_search_dropdown').style.zindex = "-1"
  document.getElementById('device_search_dropdown').style.width = "200px"
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