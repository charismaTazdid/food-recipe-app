const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');


// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () =>{
    mealDetailsContent.parentElement.classList.remove('showRecipe')
})

//get meal list 
// function that mathches with search
function getMealList() {
    let searchInput = document.getElementById('search-input').value.trim();
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`
    fetch(url)
        .then(res => res.json())
        .then(data => mealItem(data.meals))
}

function mealItem(data){
    let html = "";
    if(data != null){          
        data.forEach(meal => {
            html += `
            <div class="meal-item" data-id= "${meal.idMeal}">
                <div class="meal-img">
                    <img src="${meal.strMealThumb}" alt="">
                </div>

                <div class="meal-name">
                    <h3>${meal.strMeal}</h3>
                     <a href="#" class="recipe-btn"> Get Recipe</a>
                </div>
            </div>
            `;                
        });
        mealList.classList.remove('notFound');
    }
   else{
        html = "Sorry we don't find any meal for you. Try another menu Please..."
        mealList.classList.add('notFound')
        document.getElementById('search-result').innerText = " ";
    }
    mealList.innerHTML = html;
    document.getElementById('search-input').value = " "
}


// Get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem =  e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(res=> res.json())
        .then(data => mealRecipe(data.meals))
    }
}


function mealRecipe(meal){
    meal = meal[0];
    let html = `
    <h2 class="recipe-title"> ${meal.strMeal}</h2>
    <p class="catagory">${meal.strCategory}</p>
    <div class="recipe-instruction">
        <h3>Instraction: </h3>
        <p> ${meal.strInstructions}</p>
    </div>
    <div class="recipe-meal-img">
        <img src="${meal.strMealThumb}" alt="">
    </div>
    <div class="recipe-link">
        <a href="${meal.strYoutube}" target="_blank">See More >> </a>
    </div>
    
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe')
}