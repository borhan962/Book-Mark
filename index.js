var bookName = document.getElementById("bookName");
var site = document.getElementById("site");
var productList 
var mainIndex = 0;

//localStorage//

if(localStorage.getItem('productList') == null){
    productList = [];
}else{
    productList = JSON.parse(localStorage.getItem('productList'));
    displayProduct(productList)
}

//validation//

var nameRegex = /^[A-Za-z_]{1,}$/
function vaildName (){
    if(nameRegex.test(bookName.value)){
        return true
    }else{
        return false
    
    }
}

var urlRegex = /^(https:\/\/)?(www\.)?[a-zA-Z0-9_\.]{1,}\.[a-z]{3}$/
function vaildUrl (){
    if(urlRegex.test(site.value)){
        return true
    }else{
       return false
    }
}

bookName.onkeyup = function(){
    if(vaildName() && vaildUrl()){
        add.removeAttribute("disabled")
    }else{
        add.disabled = "true";
    }
}

site.onkeyup = function(){
    if(vaildName() && vaildUrl()){
        add.removeAttribute("disabled")
    }else{
        add.disabled = "true";
    }
}

//addSites//

 function addProduct(){
    if(add.innerHTML === "Update"){
       add.innerHTML = "Add Site";
        var bookmark = {
            name: bookName.value,
            site: site.value,
        } 
        productList.splice(mainIndex,1, bookmark);
    }
    else{
        var bookmark = {
            name: bookName.value,
            site: site.value,
        }   
        productList.push(bookmark);
    }
    displayProduct(productList);
    localStorage.setItem("productList", JSON.stringify(productList))
    clearForm()
}

//display//

function displayProduct(productList){
    var blackBox = '';
    for (var i=0; i < productList.length; i++){
        blackBox += 
        `
        <tr>
        <td>${ i + 1}</td>
        <td>${productList[i].name }</td>
        <td><a href ="${productList[i].site}"target="_blank">  <button class="btn btn-warning btn-sm">visit</button></a></td>
        <td><button onclick="updateProduct(${i})" class="btn btn-success btn-sm">Update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger btn-sm">Delete</button></td>
      </tr>
      `
    }
    console.log(blackBox);

    document.getElementById("tBody").innerHTML = blackBox;
}

//clear//

function clearForm(){
     bookName.value = ''
     site.value = ''
}

//delete//

function deleteProduct(index){
    productList.splice(index,1)
    localStorage.setItem("productList", JSON.stringify(productList))
    displayProduct(productList)
}

//search//

function searchItem(term){
    var foundItem=[]
    for (var i = 0; i < productList.length; i++){
        if ((productList[i].name.toLowerCase().includes(term.toLowerCase()))){
        foundItem.push(productList[i])
        }
    }
    displayProduct(foundItem)
}

 //update //

 function updateProduct(i){
 bookName.value = productList[i].name;
 site.value =productList[i].site;
 add.innerHTML = "Update"
 mainIndex = i;
 }