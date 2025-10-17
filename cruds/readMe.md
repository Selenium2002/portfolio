# CRUDS Project Resource
https://www.youtube.com/watch?v=nJZAvdUhUMs&t=3595s

----------------------------------------------------------------

# Project Description 

## 1 --> Definition
### * It's a System for adding different types of products and store them so we can check them any time.
### * This system can update, delete and also search for any product that we already dragged before.

## 2 --> Create, Read Functions 
### * We can create a product by filling up the following fields ("Title", "Price", "Category") and you're not allowed to let any of them be empty.
### * If you submit the "Create" btn without typing a number in the count field, it automatically will read one product.

## 3 --> Total Element 
### * It changes its color once you write down any number in the "Price" field and it returns to its original color once eather you clear the "Price" field or press "Create" btn to read new data.
### * That element fucntions a formula of these four fields ("Price" + "Taxes" + "Ads") - "Discount"

## 4 --> Count Field 
### * You're limited to put less than or equals to 200 products in that field  

## 5 --> Update Button 
### * When you intend to update any product, all of data which belong to that product will automatically be raised over to the empty fields except the count field will vanish.

## 6 --> Delete Button
### * You can delete any product by clicking on any of delete buttons in the table.

## 7 --> Delete All Button
### * This btn just appears once you create any product and read it, but it vanishes once you click it and excute its function which is responible for clearing all the data in the table.

## 8 --> Search Field
### * First, Choose Wheather you want to search by title or by category.
### * Second, write down what you want to search for.
### * Third, the table will read just the data which include what you wrote in the "Search" field.

----------------------------------------------------------------

# Comments

### * If you create a button which updates all the products with the same date, it will be better.

### * You need to make a validation for each field of the following
#### "Title", "Category" ---> You need to drag some allowed regex patterns .e.g number of characters, allowed symbols etc..
#### "Price", "Taxes", "Ads" ---> You need to put a limitation for these fields numbers.

### * When you choose one of the two search btns, it directly changes the placeholder of the "Search" field and you want to click at any empty place to undo the placeholder change. How can you do that ?!