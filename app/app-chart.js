'use strict';

// ********** DOM WINDOWS **********

let displayResults = document.querySelector("#myChart");



// ********** GLOBAL VARIABLES **********


let arrayObjectsReturned = [];


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
function getResults() {
  //check if array is stored
  if (localStorage.arrayObjectsStored){
    //access stored array
    let arrayObjectsStored=JSON.parse(localStorage.getItem('arrayObjectsStored'));
    
    //make new array of objects
    for(let i=0; i<arrayObjectsStored.length;i++){
      let name = arrayObjectsStored[i].name;
      let product = new Product(name,null,null);
      product.shown = arrayObjectsStored[i].shown;
      product.clicked = arrayObjectsStored[i].clicked;

      arrayObjectsReturned[i]=product;
    }

    handlerShowResults();

  } else {
    alert("Please click 'Go to Voting Page' to finish voting. Results are not available to be viewed once voting has finished.");
  }
}

// render results
function handlerShowResults(){
  let arrayNames = [];
  let arrayVotes = [];
  let arrayViews = [];

  for(let i=0;i<arrayObjectsReturned.length;i++){
    arrayNames[i]=arrayObjectsReturned[i].name;
    arrayVotes[i]=arrayObjectsReturned[i].clicked;
    arrayViews[i]=arrayObjectsReturned[i].shown;
  }

  console.log(arrayNames,arrayVotes,arrayViews);

  let chartData = {
    type: 'bar',
    data: {
      labels: arrayNames,
      datasets: [
        {label: '# of Votes',
          data: arrayVotes,
          borderWidth: 1,
          borderColor: '#C1121F',
          backgroundColor: '#C1121F', 
        },
        {label: '# times Shown',
          data: arrayViews,
          borderWidth: 1,
          borderColor: '#669BBC',
          backgroundColor: '#669BBC',
        }]},
    options: {scales: {y: {beginAtZero: true}}}
  }

  //render results
  Chart.defaults.borderColor = '#003049';
  Chart.defaults.color = '#003049';

  new Chart(displayResults, chartData);}
  
  

// ********** EVENT HANDLERS **********




// ********** EXECUTABLE **********
getResults();