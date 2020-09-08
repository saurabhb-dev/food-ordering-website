let mainData;
let sortedData;

// Fetch all the restaurant details
function httpCall(){
  fetch('./restaurant-data.json')
  .then(response => {
    return response.json()
  })
  .then(data => {
    mainData = data;
    sortedData = [].concat(mainData);
    console.log('Main Data is: ')
    console.log(mainData)
    renderData(mainData);
  })
  .catch(err => {
    // Do something for an error here
    console.log(err);
    alert('Issue in retrieving resturant details from server');
  });
}
httpCall();

function removeElements(){
  var child = wholeList.lastElementChild;  
  while (child) { 
    wholeList.removeChild(child); 
      child = wholeList.lastElementChild; 
  } 
}

  function renderData(arr){
      
arr.map(item => {
  var onediv = document.createElement('div')
  onediv.setAttribute("class", "one-restaurant");
  
  document.getElementById("wholeList").appendChild(onediv);


  var imgnode = document.createElement("img");
  imgnode.setAttribute("src", item.img);
  imgnode.setAttribute("class", "restaurant-image");
  onediv.appendChild(imgnode);

  var namenode = document.createElement("div");
  namenode.setAttribute("class", "restaurant-text");
  namenode.setAttribute("id", "res-name");
  var textnode = document.createTextNode(item.name);
  namenode.appendChild(textnode);
  onediv.appendChild(namenode);

  var etanode = document.createElement("div");
  etanode.setAttribute("class", "restaurant-text");
  var textnode = document.createTextNode(item.eta + ' mins delivery time');
  etanode.appendChild(textnode);
  onediv.appendChild(etanode);

  var ratingnode = document.createElement("div");
  ratingnode.setAttribute("class", "restaurant-text");
  var stars = '';
  for(let i = 0 ; i< item.rating ; i++){
    stars = stars.concat('☆')
  }
  var textnode = document.createTextNode(stars);

  ratingnode.appendChild(textnode);
  onediv.appendChild(ratingnode);

  var tagsnode = document.createElement("div");
  tagsnode.setAttribute("class", "restaurant-text");
  var textnode = document.createTextNode('Tags: ' + item.tags);
  tagsnode.appendChild(textnode);
  onediv.appendChild(tagsnode);

  console.log(item.tags)
 
})

const searchBtn = document.getElementsByClassName('search-button')[0];
const searchBox = document.getElementsByClassName('search-box')[0];
const wholeList = document.getElementById("wholeList");

function performSearch(){
  if(searchBox.value == ''){
    location.reload();
   } else {
  removeElements();
    let x = mainData.filter((item) => {
      return item.name.toLowerCase().includes(searchBox.value.toLowerCase()) || item.tags.toLowerCase().includes(searchBox.value.toLowerCase());
      
    });
    renderData(x);
   }
  
}
searchBtn.onclick = performSearch;
searchBox.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    // code for enter
    performSearch();
  }
});
}

function renderAfterSorting(data){
  removeElements();
  renderData(data)
}
let sortByType = 'None';
let sorting = document.getElementById('sorting');


sorting.addEventListener('change', () => {

if(sorting.value == 'Estimated Delivery Time'){
  sortByType = 'Estimated Delivery Time';
  sortedData.sort((a,b) => {
    return a.eta-b.eta;
  });
  renderAfterSorting(sortedData)
} else if(sorting.value == 'Rating'){
  sortByType = 'Rating';
  sortedData.sort((a,b) => {
    return b.rating-a.rating;
  });
  renderAfterSorting(sortedData)
} else {
  sortByType = 'None';
  renderAfterSorting(mainData)
}

})

function renderAfterTagging(filtered){
  removeElements();
  renderData(filtered);
}

var checkbox = document.querySelectorAll("input[type=checkbox]");
let checkedAr = [];
checkbox.forEach(chkbx => {
  chkbx.addEventListener( 'change', function() {
     if(this.checked) {
      // Checkbox is checked..
       console.log(this.name)
      checkedAr.push(this.name);
      
  } else {
      // Checkbox is not checked..
      let indexToRemove = checkedAr.indexOf(this.name);
      checkedAr.splice(indexToRemove,1);

  }

if(checkedAr.length > 0){
  // var filtered = mainData.filter(
    if(sortedData == 'None'){
      var filtered = mainData.filter(
        function(val) {
          for (var i = 0; i < checkedAr.length; i++) {
            if (val.tags.includes(checkedAr[i])) {
              return true;
            }
          }
          return false;
        }
      ); 
    } else {
      var filtered = sortedData.filter(
        function(val) {
          for (var i = 0; i < checkedAr.length; i++) {
            if (val.tags.includes(checkedAr[i])) {
              return true;
            }
          }
          return false;
        }
      ); 
    }
    
  
  renderAfterTagging(filtered);
} else {
  renderAfterTagging(mainData)
}

  

});
})

