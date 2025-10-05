// Elements Declaration
let titleInput = document.querySelector("#title");
let priceInput = document.getElementById("price");
let taxesInput = document.querySelector("#taxes");
let adsInput = document.getElementById("ads");
let discountInput = document.getElementById("discount");
let totalField = document.getElementById("total");
let countInput = document.querySelector("#count");
let categoryInput = document.getElementById("category");
let submitBtn = document.querySelector("#submit");
let searchTitleBtn = document.getElementById("searchByTitle");
let searchCategoryBtn = document.getElementById("searchByCategory");


console.log(searchCategoryBtn);
console.log("test");





// Create Product
let dataProduct;
if(localStorage.product != null) {
    dataProduct = JSON.parse(localStorage.product);
}else{
    dataProduct = [];
} 
submitBtn.onclick = () => {
    let newProduct = {
        title:titleInput.value,
        price:priceInput.value,
        taxes:taxesInput.value,
        ads:adsInput.value,
        discount:discountInput.value,
        total:totalField.innerHTML,
        count:countInput.value,
        category:categoryInput.value,
    }
    dataProduct.push(newProduct);

    // Store Product
    localStorage.setItem("product", JSON.stringify(dataProduct));
    clearData();
}


// Read Product
// Update Product
// Delete Product
// Search For a Product


// Get Total
let totalInputs = document.querySelectorAll(".price input[type = number]");
const getTotal = () => {
    if(priceInput.value != '') {
        let result = (+priceInput.value + +taxesInput.value + +adsInput.value) - +discountInput.value;
        totalField.innerHTML = result;
        totalField.style.backgroundColor = "#040";
    }else{
        totalField.innerHTML = '';
        totalField.style.backgroundColor = "#a00d02";
    }
} 
totalInputs.forEach(totalInput => totalInput.addEventListener("keyup", getTotal));


// Count Product
// Clear Inputs
const clearData = () => {
    titleInput.value = '';
    priceInput.value = '';
    taxesInput.value = '';
    adsInput.value = '';
    discountInput.value = '';
    totalField.innerHTML = '';
    countInput.value = '';
    categoryInput.value = '';
}


// Clean Data