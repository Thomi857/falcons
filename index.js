document.addEventListener("DOMContentLoaded", () => {

  // Fetch the cocktail data from the JSON server using .then()
  const getCocktails = () => {
    fetch('http://localhost:3000/cocktails') 
      .then(response => response.json()) 
      .then(data => {
      console.log(data); 
      displayCocktailNames(data); 
      })
      .catch(error => {
      console.error("Error fetching cocktails:", error); 
      });
  };

  // Function to display cocktail names in the display div
  const displayCocktailNames = (cocktails) => {
    const filteredCocktails = cocktails.filter(cocktail => cocktail.id >= 1 && cocktail.id <= 10);
    cocktails = filteredCocktails;
    const displayDiv = document.querySelector('#display');
    displayDiv.innerHTML = '';

    // Iterate over the cocktails and create clickable names
    cocktails.forEach(cocktail => {
      const cocktailNameDiv = document.createElement('div');
      cocktailNameDiv.classList.add('cocktail-name');
      
      // Fallback for all cocktail data(in case it is missing or undefined)
      cocktailNameDiv.textContent = cocktail.name  

      const imageUrl = cocktail.image || "path/to/default-image.jpg"; 
      cocktailNameDiv.dataset.image = imageUrl;
      cocktailNameDiv.dataset.name = cocktail.name ,
      cocktailNameDiv.dataset.ingredients = JSON.stringify(cocktail.ingredients ),
      cocktailNameDiv.dataset.price = String(cocktail.price),
      
      displayDiv.appendChild(cocktailNameDiv);

      // Add hover event listener to show image
      cocktailNameDiv.addEventListener('mouseenter', () => {
        displayImage(cocktailNameDiv.dataset.image);
      });

      // event listener to show data
      cocktailNameDiv.addEventListener('click', () => {
        displayCocktailData(
          cocktailNameDiv.dataset.name, 
          cocktailNameDiv.dataset.ingredients, 
          cocktailNameDiv.dataset.price);
      });
    });
  };

  // Function to display the image in the imagespace1 div
  const displayImage = (imageUrl) => {
    const imageSpace = document.querySelector('#imagespace1');
    imageSpace.innerHTML = ''; 

    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    imgElement.alt = 'Cocktail Image';
    imgElement.style.width = '470px'; 
    imgElement.style.height = '290px'; 

    imageSpace.appendChild(imgElement);
  };

  // Function to display the data in the description div
  const displayCocktailData = (name, ingredients, price) => {
    const dataSpace = document.querySelector('#description');
    dataSpace.innerHTML = ''; 

    const nameElement = document.createElement('p');
    nameElement.textContent = `Name: ${name}`;

    const ingredientsElement = document.createElement('p');
    ingredientsElement.textContent = `Ingredients: ${ingredients}`;

    const priceElement = document.createElement('p');
    priceElement.textContent = `Price: ${price}`;

    // Append elements to the description div
    dataSpace.appendChild(nameElement);
    dataSpace.appendChild(ingredientsElement);
    dataSpace.appendChild(priceElement);
  };

  getCocktails(); // Fetch cocktail data

});



const FormEl = document.getElementById("feedback-form");

FormEl.addEventListener("submit", event => {
  event.preventDefault();

  const formData = new FormData(FormEl);
  const data = Object.fromEntries(formData.entries());
  console.log(data);

 fetch("http://localhost:3000/cocktails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log( data);
  })
  .catch(error => {
    console.error("Error:", error);
  });
});

const fetchFeedback = () => {
  fetch("http://localhost:3000/cocktails")
    .then(response => response.json())
    .then(feedbackData => {

      const filteredFeedback = feedbackData.filter(feedback => feedback.id < 1 || feedback.id > 10);

      const feedbackContainer = document.getElementById("feedback-display");
      feedbackContainer.innerHTML = ""; 

      filteredFeedback.forEach(feedback => {
        const feedbackDiv = document.createElement("div");
        feedbackDiv.classList.add("feedback-item");

        const nameElement = document.createElement("p");
        nameElement.textContent = `Name: ${feedback.name}`;

        const emailElement = document.createElement("p");
        emailElement.textContent = `Email: ${feedback.email}`;

        const messageElement = document.createElement("p");
        messageElement.textContent = `Message: ${feedback.message}`;

        feedbackDiv.appendChild(nameElement);
        feedbackDiv.appendChild(emailElement);
        feedbackDiv.appendChild(messageElement);

        feedbackContainer.appendChild(feedbackDiv);
      });
    })
    .catch(error => {
      console.error("Error fetching feedback:", error);
    });
};

// Call fetchFeedback to display feedback on page load
fetchFeedback();