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
    const displayDiv = document.querySelector('#display');
    displayDiv.innerHTML = '';

    // Iterate over the cocktails and create clickable names
    cocktails.forEach(cocktail => {
      const cocktailNameDiv = document.createElement('div');
      cocktailNameDiv.classList.add('cocktail-name');
      
      // Fallback for all cocktail data(in case it is missing or undefined)
      cocktailNameDiv.textContent = cocktail.name || "Unknown Cocktail"; 

      const imageUrl = cocktail.image || "path/to/default-image.jpg"; 
      cocktailNameDiv.dataset.image = imageUrl;
      cocktailNameDiv.dataset.name = cocktail.name || "Unknown",
      cocktailNameDiv.dataset.ingredients = JSON.stringify(cocktail.ingredients || []),
      cocktailNameDiv.dataset.price = String(cocktail.price || "N/A"),
      
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


document.getElementById("feedback-form").addEventListener("submit", async function(event) {
  event.preventDefault(); 

  // Gather input values
  const name = document.getElementById("feedback-name").value;
  const email = document.getElementById("feedback-email").value;
  const message = document.getElementById("feedback-message").value;

  // Create a feedback object
  const feedbackData = {
      name: name,
      email: email,
      message: message
  };

  try {
      // Send a PATCH request to your server
      const response = await fetch("http://localhost:3000/feedback", {
          method: "PATCH", 
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(feedbackData)
      });

      if (!response.ok) {
          throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Feedback submitted successfully:", result);
      
      // Optionally, clearthe form fields
      document.getElementById("feedback-form").reset();
  } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
  }
});

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

app.patch("/feedback", (req, res) => {
    const feedback = req.body; // Get the feedback data from the request body
    // Here you would typically update your JSON data or database
    console.log("Received feedback:", feedback);
    res.status(200).json({ message: "Feedback received successfully!" });
});




//       // Send the data to the server
//       postData('http://localhost:3000/cocktails', drink);
//     });
//   }

// // Function to send data to the server
// async function postData(url = '', data = {}) {
//   try {
//     const response = await fetch(url, {
//       method: 'POST', 
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data)
//     });         
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     const result = await response.json();
//     console.log('Success:', result);
//     return result;
//   } catch (error) {
//     console.error('Error posting data:', error);
//   }
// }



