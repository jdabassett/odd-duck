'use strict';

// ********** DOM WINDOWS **********

let buttonResults = document.querySelector("#display-results");
let displayResults = document.querySelector("#results-container");

let productParent = document.querySelector("#grid-item-products"); 
let productOne = document.querySelector("#product-one");
let productTwo = document.querySelector("#product-two");
let productThree = document.querySelector("#product-three");

// ********** GLOBAL VARIABLES **********

let imageNames = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','water-can','wine-glass'];
let imageExt = ['jpg','jpg','jpg','jpg','jpg','jpg','jpg','jpg','jpg','jpg','jpg','jpg','jpg','jpg','png','jpg','jpg','jpg','jpg'];
let arrayObjects = [];
let threeNumbers = [];
let totalViews = 0;
let allowedViews = 10;

let productDOM = [productOne,productTwo,productThree];

// ********** CONSTRUCTOR FUNCTIONS **********

// constructor to for products
function Product(name,imgExt,location){
  this.name=name;
  this.img=`${location}/${name}.${imgExt}`;
  this.shown=0;
  this.clicked=0;
}

// ********** HELPER FUNCTIONS **********

// make array of objects
function makeObjects(location,arrayNames,arrayExtensions){
  for(let i = 0; i<arrayNames.length;i++){
    let object = new Product(arrayNames[i],arrayExtensions[i],location);
    arrayObjects.push(object);
  }
}

// random number generator
function randomNumber(array){
  return Math.floor(Math.random()*(array.length));
}

// generate three random objects for display
function threeRandomNumbers(array){
  let one;
  let two;
  let three;
  
  do {
    one = randomNumber(array);
    two = randomNumber(array);
    three = randomNumber(array);

    for (let i=0; i<threeNumbers.length; i++){
      if (one === threeNumbers[i]){
        one = randomNumber(array);
      } else if (two === threeNumbers[i]){
        two = randomNumber(array);
      } else if (three === threeNumbers[i]) {
        three = randomNumber(array);
      }
    }
  } while( !(one !== two && two !== three && one !== three));
  threeNumbers = [];
  threeNumbers = [one,two,three];
}

// interate through objects to render
function iterateRender(array){
  for(let i=0;i<array.length;i++){
    productDOM[i].src=arrayObjects[array[i]].img;
    productDOM[i].alt=arrayObjects[array[i]].name;
    productDOM[i].title=arrayObjects[array[i]].name;
    arrayObjects[array[i]].shown++;
  }
}

// parent click handler function
function handlerClick(event){
  addViews(event.target.title);
  threeRandomNumbers(imageNames);
  iterateRender(threeNumbers);
  totalViews++;
  if(totalViews >= allowedViews){
    productParent.removeEventListener("click",handlerClick);
  }
}

// iterate to add views to objects
function addViews(title){
  for(let i=0;i<arrayObjects.length;i++){
    if(arrayObjects[i].name===title){
      arrayObjects[i].clicked++;
      break;
    }
  }
}

// render results
function handlerShowResults(){
  if (totalViews>=allowedViews){
    for(let i=0;i<arrayObjects.length;i++){
      let liElem = document.createElement("li");
      liElem.textContent=`${arrayObjects[i].name} had ${arrayObjects[i].clicked} votes, and was seen ${arrayObjects[i].shown} times`;
      displayResults.appendChild(liElem);
    }
    buttonResults.removeEventListener("click", handlerShowResults);
  }else {
    alert("Must finish voting before results can be displayed.");
  }
}

// ********** EVENT HANDLERS **********

productParent.addEventListener("click",handlerClick);
buttonResults.addEventListener("click",handlerShowResults);




// ********** EXECUTABLE **********
//make array of objects
makeObjects("img",imageNames,imageExt);

//generate array of objects to render
threeRandomNumbers(imageNames);

// initial render of images
iterateRender(threeNumbers);











