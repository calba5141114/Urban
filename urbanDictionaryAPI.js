/*jshint esversion: 6 */
const SubButton = document.getElementById("subButton");
const PrintArea = document.getElementById("printHere");

function getUrbanWord(urbanWord) {
  const url = `https://api.urbandictionary.com/v0/define?term=${urbanWord}`;
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.responseType = "json";
  request.send();

  request.onload = function(urbanResponse) {
    var list = urbanResponse.target.response.list;
    var printThis = "";

    for (var i = 0; i < list.length; i++) {
      
  //     console.log(`
  //        ${list[i].definition}
  //        ${list[i].permalink}
  //        ${list[i].thumbs_up}
  //        ${list[i].author}
  //        ${list[i].word}
  //        ${list[i].defid}
  //        ${list[i].current_vote}
  //        ${list[i].written_on}
  //        ${list[i].example}
  //        ${list[i].thumbs_down}
  //  `);

      var card = `
      <br>
   <div class="card">
   <div class="card-body">

   <h5 class="card-title">${list[i].word}</h5>
   <p class="card-text"> ${list[i].definition} </p>
   <p class="card-text">Example: ${list[i].example}</p>
   <a href="${list[i].permalink}" class="btn btn-primary">Source</a>
   <br>
   <small class="text-muted">${list[i].written_on} by  ${
        list[i].author
      }  </small>

   </div>
   </div>
   `;

      printThis += card;
    }

    PrintArea.innerHTML = printThis;
  };
}

// getUrbanWord('french');

SubButton.onclick = () => {
const UrbanWord = document.getElementById("InputUrbanWord");
  var WordVal = UrbanWord.value;
    getUrbanWord(`${WordVal}`);
 
};
