/*jshint esversion: 6 */

/**
 * Sets references to document objects onload
 */
const SubButton = document.getElementById("subButton");
const PrintArea = document.getElementById("printHere");
const UrbanWord = document.getElementById("InputUrbanWord");

/**
 * @param {*} json - json data
 * This event renders the json data into a useable list.
 */
const renderJSON = (json) => {
  if (json.list.length > 0) {
    let rendered = json.list.map((x, index) => {
      return (
        `
          <br>
          <div class="card" key="${index}">
          <div class="card-body">
          <h5 class="card-title">${x.word}</h5>
          <p class="card-text"> ${x.definition} </p>
          <p class="card-text">Example: ${x.example}</p>
          <a href="${x.permalink}" class="btn btn-primary">Source</a>
          <br>
          <small class="text-muted">${x.written_on} by ${x.author}</small>
          </div>
          </div>
          `
      );
    });
    return rendered;
  }
  else {
    // this is the page that comes up with no results 
    return (
      `
      <br>
      <div class="card" key="${1}">
      <div class="card-body">
      <h5 class="card-title text-danger">Sorry that does not exist</h5>
      <p class="card-text"> Sorry the word you are looking for does not exist try another word.</p>
	<a href="https://www.urbandictionary.com/add.php" target="__blank">You can make a new word here</a>
 <br>
      </div>
      </div>
      `
    )
  }
}

/**
 * @param {*} word - word you want to search for 
 * this function sends a get request to the Urban Dictionary API
 */
const getUrbWord = (word) => {
  let url = `https://api.urbandictionary.com/v0/define?term=${word}`;
  fetch(url)
    .then(data => {
      return data.json()
    })
    .then(json => {
      console.log(json)
      return renderJSON(json)
    })
    .then(rendered => {
      PrintArea.innerHTML = rendered;
    })
    .catch(err => {
      console.log(err);
    });
}

/**
 * Triggered by pressing enter on input field
 */
UrbanWord.addEventListener("keyup", (event) => {
  event.preventDefault();
  if (event.keyCode === 13) {
    SubButton.click()
  }
});

/**
 * Triggered on Button Click
 */
SubButton.onclick = () => {
  try {
    let WordVal = UrbanWord.value;
    getUrbWord(WordVal);
  }
  catch (err) {
    console.log(err)
  }
};
