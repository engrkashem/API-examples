const inputField = document.getElementById('input-field')
const mealContainer = document.getElementById('meals')
const error = document.getElementById('error-message');
error.style.display = 'none'
const loadMeal = () => {
    const inputText = inputField.value;
    mealContainer.textContent = '';
    inputField.value = ''
    if (inputText === '') {
        error.style.display = 'block'
    }
    else if (isNaN(parseInt(inputText))) {
        error.style.display = 'none'
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`)
            .then(res => res.json())
            .then(data => displayMeal(data.meals))

    }
    else {
        error.style.display = 'block'
    }
}


const displayMeal = meals => {
    meals.forEach(meal => {
        console.log(meal)
        const div = document.createElement('div');
        div.classList.add('col-lg-4', 'col-md-6')
        div.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
             <div class="card-body">
                 <h5 class="card-title">${meal.strMeal}</h5>
                <h6>Food catagory: ${meal.strCategory}</h6>
                <h6>Food Origin: ${meal.strArea}</h6>
                <a onclick="loadDetails('${meal.idMeal}')" href="#" class="btn btn-primary">See Details</a>
            </div>
        </div>
        `;
        mealContainer.appendChild(div)
    });
}
const loadDetails = mealId => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res => res.json())
        .then(data => displayDetails(data.meals))
}
const displayDetails = mealDetails => {
    mealDetails.forEach(detail => {
        mealContainer.textContent = '';
        console.log(detail)
        const div = document.createElement('div');
        div.classList.add('col-lg-4', 'col-md-6')
        div.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="${detail.strMealThumb}" class="card-img-top" alt="...">
             <div class="card-body">
                 <h5 class="card-title">${detail.strMeal}</h5>
                <h6>Food catagory: ${detail.strCategory}</h6>
                <h6>Food Origin: ${detail.strArea}</h6>
                <h6>Instruction: ${detail.strInstructions}</h6>
            </div>
        </div>
        `;
        mealContainer.appendChild(div)
    })
}