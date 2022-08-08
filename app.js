const menuItems = [
  {
    name: "French Fries with Ketchup",
    price: 2.23,
    image: "images/plate__french-fries.png",
    alt: "French Fries",
    count: 0,
  },
  {
    name: "Salmon and Vegetables",
    price: 5.12,
    image: "images/plate__salmon-vegetables.png",
    alt: "Salmon and Vegetables",
    count: 0,
  },
  {
    name: "Spaghetti with Meat Sauce",
    price: 7.82,
    image: "images/plate__spaghetti-meat-sauce.png",
    alt: "Spaghetti with Meat Sauce",
    count: 0,
  },
  {
    name: "Bacon, Eggs, and Toast",
    price: 5.99,
    image: "images/plate__bacon-eggs.png",
    alt: "Bacon, Eggs, and Toast",
    count: 0,
  },
  {
    name: "Chicken Salad with Parmesan",
    price: 6.98,
    image: "images/plate__chicken-salad.png",
    alt: "Chicken Salad with Parmesan",
    count: 0,
  },
  {
    name: "Fish Sticks and Fries",
    price: 6.34,
    image: "images/plate__fish-sticks-fries.png",
    alt: "Fish Sticks and Fries",
    count: 0,
  },
];

const addToCartBtns = document.getElementsByClassName("add");
const cartContainer = document.querySelector("#list");
const totalContainer = document.querySelector("#totalContainer");
const cartHeading = document.querySelector("#heading");

for (const btn of addToCartBtns) {
  btn.addEventListener("click", () => addToCart(btn.dataset.value));
}

//Do the addtocart opration for the item
function addToCart(itemName, order = "insc") {
  const index = menuItems.findIndex((items) => items.name === itemName);

  if (order === "desc") {
    menuItems[index].count -= 1;
  } else {
    menuItems[index].count += 1;
  }

  const { image, alt, count, name, price } = menuItems[index];

  //Creating Li tag to store the added item
  const li = document.createElement("li");
  li.id = `${name}`;

  //Checking if quantity is 0 than removing the li tag and updating the total and changeing the item Btntext
  if (menuItems[index].count === 0) {
    const itemsLists = document.getElementById(`${itemName}`);
    itemsLists.remove();
    changeBtnText(itemName);
    calculateTotal();
    return;
  }

  //Creating HTML that will go under Li tag to store item
  const cartRow = `
      <div class="plate">
        <img src=${image} alt="${alt}" class="plate" />
        <div class="quantity">${count}</div>
      </div>
      <div class="content">
        <p class="menu-item">${name}</p>
        <p class="price"> ${price}</p>
      </div>
      <div class="quantity__wrapper">
        <button  id="desc${name}" decrease" data-value= "${name}" class="decrease">
          <img src="images/chevron.svg" />
        </button>
        <div class="quantity">${count}</div>
        <button id="insc${name}" data-value= "${name}" class="increase">
          <img src="images/chevron.svg" />
        </button>
      </div>
      <div class="subtotal">
        ${(price * count).toFixed(2)}
      </div>
`;

  //checking If the Li tag of item is present than just updating it's innerHTML
  if (document.getElementById(`${itemName}`)) {
    const itemsLists = document.getElementById(`${itemName}`);
    itemsLists.innerHTML = cartRow;
  }

  //checking if Li tag of item is not present than just appending that li tag
  else {
    li.innerHTML = cartRow;
    cartContainer.append(li);
  }

  changeBtnText(itemName);
  IncrAndDecrement(itemName);
  calculateTotal();
}

//change the text of 'Add to cart' Btn to 'In cart'
function changeBtnText(name) {
  let btn;
  for (const x of addToCartBtns) {
    if (x.dataset.value === name) {
      btn = x;
    }
  }
  const buttons = document.getElementsByClassName("in-cart");
  for (const x of buttons) {
    if (x.dataset.value === name) {
      btn = x;
    }
  }
  const item = menuItems.find((items) => items.name === name);
  if (item.count >= 1) {
    const inCart = `<img src="images/check.svg" alt="Check" />
        In Cart`;

    btn.innerHTML = inCart;
    btn.classList.remove("add");
    btn.classList.add("in-cart");
  } else {
    const addToCart = `Add to Cart`;
    btn.innerHTML = addToCart;
    btn.classList.remove("in-cart");
    btn.classList.add("add");
  }
}

//Adding event listener to increment and decrement btn
function IncrAndDecrement(name) {
  const descBtn = document.getElementById(`desc${name}`);

  descBtn.addEventListener("click", () => addToCart(name, "desc"));

  const inscBtn = document.getElementById(`insc${name}`);

  inscBtn.addEventListener("click", () => addToCart(name));
}

//Used to calculate the Total Price
function calculateTotal() {
  let subtotal = 0;
  for (const i of menuItems) {
    subtotal += i.price * i.count;
  }
  const tax = subtotal ? 1.05 : 0;
  const total = (subtotal + tax).toFixed(2);
  subtotal = subtotal.toFixed(2);

  cartHeading.innerHTML = total >= 1 ? "Your Cart" : "OOPS Your Cart Is Empty!";

  const div = document.createElement("div");
  div.id = "added";
  const totalDiv = ` 
   <div class="line-item">
   <div class="label">Subtotal:</div>
   <div class="amount price subtotal">$${subtotal}</div>
 </div>
 <div class="line-item">
   <div class="label">Tax:</div>
   <div class="amount price tax">$${tax}</div>
 </div>
 <div class="line-item total">
   <div class="label">Total:</div>
   <div class="amount price total">$${total}</div>
 </div>`;

  div.innerHTML = totalDiv;
  if (document.getElementById("added")) {
    const itemsLists = document.getElementById("added");
    itemsLists.innerHTML = totalDiv;
  } else {
    totalContainer.append(div);
  }
}
