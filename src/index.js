let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const toyCollection = document.getElementById('toy-collection');
  const toyForm = document.getElementById('new-toy-form');

  // Display existing toys when the page loads
  displayToys();
  toyForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission from reloading the page

    // Gather data from form fields
    const name = document.getElementById('name').value;
    const image = document.getElementById('image').value;
    const likes = document.getElementById('likes').value;

    const newToy = {
      name: name,
      image: image,
      likes: likes
    };

    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers:
            {
              "Content-Type": "application/json",
               Accept: "application/json"
            },

      body: JSON.stringify({
          "name": "Jessie",
          "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
          "likes": 0
    })

    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add new toy');
      }
      return response.json();
    })
    .then(toy => {
      // Add new toy to the DOM
      addToyToDOM(toy);
      // Clear form fields
      toyForm.reset();
    })
    .catch(error => {
      console.error('Error adding new toy:', error);
      // Handle error (e.g., display error message)
    });
  });

  function displayToys() {
    // Fetch existing toys and display them on the DOM
    fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
    // Implement this function based on your server response
  }
  function handleLikeButtonClick(toyId) {
    // Capture toy's ID and calculate new number of likes
    const newNumberOfLikes = calculateNewLikes(toyId);
    // Submit PATCH request to update the number of likes
    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "likes": newNumberOfLikes
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update likes for toy');
      }
      return response.json();
    })
    .then(updatedToy => {
      // Update the toy's card in the DOM with the new number of likes
      updateToyCardInDOM(updatedToy);
    })
    .catch(error => {
      console.error('Error updating likes for toy:', error);
      // Handle error (e.g., display error message)
    });
  }


  // Function to add new toy to the DOM
  function addToyToDOM(toy) {
    // Create card for the new toy and append it to the toy collection
    const card = document.createElement('div');
    card.classList.add('card');

    // Create image element
    const image = document.createElement('img');
    image.src = toy.image;
    image.alt = toy.name;
    card.appendChild(image);

    const name = document.createElement('h2');
    name.textContent = toy.name;
    card.appendChild(name);

    const likes = document.createElement('p');
    likes.textContent = 'Likes: ' + toy.likes;
    card.appendChild(likes);

    // Append card to toyCollection div
    toyCollection.appendChild(card);
    
  }
})