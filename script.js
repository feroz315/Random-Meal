const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const resultHeading = document.getElementById('result-heading');
const mealContainer = document.getElementById('meals');
const selectedMeal = document.getElementById('selected-meal');


// Function to search meal from API and fetch the data
function searchMeal(e) {
    e.preventDefault();

    //clear selected meal
    selectedMeal.innerHTML = '';

    // Get the search term form input field
    const term = search.value;
    
    if(term.trim()) {
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                 resultHeading.innerHTML = `<h2>Search result for '${term}':</h2`
                 if(data.meals === null){
                   resultHeading.innerHTML = `<p>There are no search results for '${term}'please try anthor item.`
              }else{
                    mealContainer.innerHTML = data.meals.map( meal => ` 
                     <div class ="meal">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" /> 
                        <div class="meal-info" data-mealID="${meal.idMeal}">
                            <h3>${meal.strMeal}</h3>
                             </div>
                        </div>
                  
                    `)                     
                    .join('') 
                }
            
                
            })
    }else{
            alert('please enter a valid search.')
    }
    
            //clear search
            search.value = '';   

}

 
//Function to fetch Meal data using the meal id
function getMealById(mealID){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then( res => res.json())
        .then( data => {
            const meal = data.meals[0];
            addMealToDOM(meal);
        }) 
        
}


// Function to add a meal to DOM
function addMealToDOM(meal) {
    const ingredients = [];
    for(let i = 1; i <= 20; i++) {
        if(meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            break;
        }
    }; 

    selectedMeal.innerHTML = `
    <div class ="selected-meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/> 
    <div class="selected-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</P>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</P>` : ''}

        </div>
        <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
           ${ingredients.map( ingredient => `<li>${ingredient}</li>`).join('')}
        
            </ul>
        </div>
    </div>
    `;
}


//Function for random meal fetch data
function RandomMealGet() {
    resultHeading.innerHTML = '';
    mealContainer.innerHTML = '';
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then( res => res.json())
    .then (data =>{
        const RandomMeal = data.meals[0];
        addMealToDOM(RandomMeal);
    })
}


// Event Listeners
// 1.Submit
// 2.Random Meal 
random.addEventListener('click',RandomMealGet);
submit.addEventListener('submit', searchMeal);


//2. When clicking  a Meal
mealContainer.addEventListener('click', e =>  {

    const mealinfo = e.path.find( item => {
          if(item.classList) {
              return item.classList.contains('meal-info');
          }else{
              return false
          }
    });
        if(mealinfo)  {
            const mealID = mealinfo.getAttribute('data-mealid');
            getMealById(mealID);
        }

});





















