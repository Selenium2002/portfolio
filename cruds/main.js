// Dark Mode & Light Mode
const moonImg = document.querySelector("#darkIcon");
const theme = localStorage.getItem('theme');

if(theme === 'light-mode') {
    document.body.classList.add('light-mode');
    moonImg.style.backgroundColor = "#ffffffff";
    moonImg.src = "aspects/sun-icon.png";
}else{
    document.body.classList.add('dark-mode');
    moonImg.style.backgroundColor = "#b2b2b2ff";
    moonImg.src = "aspects/moon-icon.png";
}
 //short circuiting

moonImg.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    if(document.body.classList.contains("light-mode")) {
        moonImg.src = "aspects/sun-icon.png";
        moonImg.style.backgroundColor = "#ffffffff";
        localStorage.setItem('theme', 'light-mode');
    }else{
        moonImg.src = "aspects/moon-icon.png";
        moonImg.style.backgroundColor = "#b2b2b2ff";
        localStorage.setItem('theme', 'dark-mode');
    }
})


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
let searchInput = document.querySelector("#search");
let searchTitleBtn = document.getElementById("searchByTitle");
let searchCategoryBtn = document.getElementById("searchByCategory");
let tbodyElement = document.querySelector("#pushData");
let dataMode = "create";
let updatedItem;




// Create a Product
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

    // Count Products
    if(titleInput.value != '' &&
        priceInput.value != '' &&
        categoryInput.value != '' &&
        newProduct.count <= 200 
    ){
        if(dataMode === "create") {
            if(newProduct.count > 1) {
            for(i = 0; i < newProduct.count; i++) {
                dataProduct.push(newProduct);
            }
            }else{
                dataProduct.push(newProduct);
            }
        }else{
            dataProduct[updatedItem] = newProduct;
            dataMode = "create";
            submitBtn.innerHTML = "Create";
            count.style.display = "block";
        }
        clearData();
    }

    


    // Store a Product
    localStorage.setItem("product", JSON.stringify(dataProduct));
    readData();
}


// Read a Product
const readData = () => {
    getTotal();
    let dataTable = '';
    for (i = 0; i < dataProduct.length; i++){
        dataTable += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick = "updateItem(${i})" id = "update">Update</button></td>
                <td><button onclick = "deleteItem(${i})" id = "delete">Delete</button></td>
            </tr>
        `
    }
    tbodyElement.innerHTML = dataTable;
    let deletAllBtn = document.getElementById("deleteAll");
    if(dataProduct.length > 0){
        deletAllBtn.innerHTML = `
        <button onclick = "deleteAll()">Delete All Data ( ${dataProduct.length} )</button>
        `
    }else{
        deletAllBtn.innerHTML = '';
    }
 
    
}



// Get Total
let totalInputs = document.querySelectorAll(".price input[type = number]");
const getTotal = () => {
    if(priceInput.value != '') {
        let result = (+priceInput.value + +taxesInput.value + +adsInput.value) - +discountInput.value;
        totalField.innerHTML = result;
        totalField.style.backgroundColor = "var(--total-change)";
    }else{
        totalField.innerHTML = '';
        totalField.style.backgroundColor = 'var(--total-bg)';
    }
}
totalInputs.forEach(totalInput => totalInput.addEventListener("keyup", getTotal));

readData();



// Update a Product
const updateItem = i => {
    title.value = dataProduct[i].title; 
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    getTotal();
    count.style.display = "none";
    category.value = dataProduct[i].category;
    submitBtn.innerHTML = "Update";
    dataMode = "update";
    updatedItem = i;
    scroll({
        top: 0,
        behavior: 'smooth',
    })
    
}


// Delete a Product
const deleteItem = i => {
    dataProduct.splice(i, 1);
    localStorage.product = JSON.stringify(dataProduct);
    readData();
}


// Delete All Table Data
const deleteAll = () => {
    localStorage.clear();
    dataProduct.splice(0);
    readData();
}



// Search For a Product
let searchMode = 'Title';
const getSearchMode = id => {
    if(id == "searchByTitle"){
        searchMode = 'Title';
    }else{
        searchMode = 'Category';
    }
    searchInput.placeholder = "Search By " + searchMode;
    searchInput.focus();
    searchInput.value = '';
    readData()
}

const searchForData = value => {
    let dataTable = '';
    for(i = 0; i < dataProduct.length; i++){
        if(searchMode == 'Title'){
            if(dataProduct[i].title.includes(value.toLowerCase())){        
                dataTable += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button onclick = "updateItem(${i})" id = "update">Update</button></td>
                        <td><button onclick = "deleteItem(${i})" id = "delete">Delete</button></td>
                    </tr>
                `
            }
        }else{
            if(dataProduct[i].category.includes(value.toLowerCase())){ 
            dataTable += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button onclick = "updateItem(${i})" id = "update">Update</button></td>
                    <td><button onclick = "deleteItem(${i})" id = "delete">Delete</button></td>
                </tr>
            `
            }
        }    
    }
    
    tbodyElement.innerHTML = dataTable;
    
}



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
