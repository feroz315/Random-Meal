const submit = document.getElementById('submit');
const search = document.getElementById('search');
const random = document.getElementById('random');
const mealContainer = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const selectedMeal = document.getElementById('selected-meal');

const Form = document.getElementById('user-login');


function Checkdata() {
  alert('Get Data by User')
}



//Function for SearchMeal fetch data
function searchMeal(e){
  e.preventDefault();

  selectedMeal.innerHTML ='';

  const term = search.value;


if(term.trim()){
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
  .then(res => res.json())
  .then(data => {
    resultHeading.innerHTML = `<h1>search the Meal ${term}: </h1>`;
    if(data.meals === null){
      resultHeading.innerHTML = `<p>There is no search Result ${term}: </p>`;
    }else{
      mealContainer.innerHTML = data.meals.map( meal => `
      <div class="meal">
      <img src='${meal.strMealThumb}' alt='${meal.strMeal}'/>
      <div class="meal-info" data-mealID="${meal.idMeal}">
      <h3>${meal.strMeal}</h3>
      </div>    
         
      </div>
  
      `).join('')
    }
})

  }else{
  alert('please Enter vaild item')

  search.value = '';
}
  };

 
//Function for random meal fetch data
function RandomMeal(){
  selectedMeal.innerHTML ="";
  mealContainer.innerHTML = "";
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
  .then(res => res.json())
  .then(data => {
   const randommeal = data.meals[0];
   addMealToDOM(randommeal);
  })
}

//Function for Add to Meal DOM
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


//Function to fetch Meal data using the meal id
function getMealById(mealID){
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
  .then(res => res.json())
  .then(data => {
    const meal = data.meals[0];
    addMealToDOM(meal);
  })
} 

// Event Listeners
// 1.Submit
// 2.Random Meal 
random.addEventListener('click', RandomMeal);
submit.addEventListener('submit', searchMeal);



//2. When clicking  a Meal
mealContainer.addEventListener('click', e => {

    const mealinfo = e.path.find( item => {
      if(item.classList){
        return item.classList.contains('meal-info');
      }else{
         return false;
         }    
    });
    if(mealinfo){
    const mealID = mealinfo.getAttribute('data-mealid');
     getMealById(mealID); 

    }
      });














