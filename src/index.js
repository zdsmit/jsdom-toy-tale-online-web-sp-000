let addToy = false;
let toyCollection = document.querySelector("#toy-collection");

function getToys() {
  return fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toys => {
    toys.forEach(toy => {
      createToys(toy);
    });
  });
  //.then(function(object) {
    //object.forEach(toy => {
      //let card = document.createElement('div')
      //card.class='card'
     // toyCollection.appendChild(card)
    //})
  //});
}

function postToy(toyData) {
  fetch("http://localhost:3000/toys", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      "name": toyData.name.value,
      "image": toyData.image.value,
      "likes": 0
    })
  })
  .then(res => res.json())
  .then((obj) => {
    createToys(obj)
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
      toyForm.addEventListener('submit', event => {
        event.preventDefault()
        postToy(event.target)
      })
    } else {
      toyForm.style.display = "none";
    }
  });
  getToys()
});

function createToys(toy) {
  let name = document.createElement('h2')
  name.innerText = toy.name

  let image = document.createElement('img')
  image.setAttribute('src', toy.image)
  image.setAttribute('class', 'toy-avatar')

  let likes = document.createElement('p')
  likes.innerText = `${toy.likes} likes`

  let button = document.createElement('button')
  button.setAttribute('class', 'like-btn')
  button.setAttribute('id', toy.id)
  button.innerText = "like"
  button.addEventListener('click', (button) => {
    console.log(button.target.dataset);
    increaseLikes(button)
  })

  let div = document.createElement('div')
  div.setAttribute('class', 'card')
  div.append(name, image, likes, button)
  document.querySelector("#toy-collection").append(div)
}

function increaseLikes(button) {
  let plusOne = parseInt(button.target.previousElementSibling.innerText) + 1
  fetch(`http://localhost:3000/toys/${button.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": plusOne
    })
  })
  .then(res => res.json())
  .then((like) => {
    button.target.previousElementSibling.innerText = `${plusOne} likes`;
  })
}
