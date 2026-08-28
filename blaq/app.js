/* =========================
   BUILT EVIL E-COMMERCE JS
========================= */


let cart =
JSON.parse(localStorage.getItem("builtEvilCart")) || [];

let orders =
JSON.parse(localStorage.getItem("builtEvilOrders")) || [];

let user =
JSON.parse(localStorage.getItem("builtEvilUser")) || null;


/* =========================
   CART
========================= */

function addToCart(name, price, image) {

    cart.push({
        name: name,
        price: price,
        image: image
    });

    localStorage.setItem(
        "builtEvilCart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert(name + " added to cart!");

}


function updateCartCount() {

    const count =
        document.getElementById("cartCount");

    if (count) {

        count.textContent = cart.length;

    }

    const dashboardCart =
        document.getElementById("dashboardCart");

    if (dashboardCart) {

        dashboardCart.textContent =
            cart.length;

    }

}


function displayCart() {

    const container =
        document.getElementById("cartItems");

    if (!container) return;


    if (cart.length === 0) {

        container.innerHTML = `
        
        <div class="empty-state">

            <h2>Your cart is empty.</h2>

            <p>Add some BUILT EVIL pieces.</p>

            <a href="shop.html" class="btn">
                SHOP NOW
            </a>

        </div>
        
        `;

        updateCartTotal();

        return;
    }


    container.innerHTML = "";


    cart.forEach((item, index) => {

        container.innerHTML += `

        <div class="cart-item">

            <img src="${item.image}">

            <div>

                <h3>${item.name}</h3>

                <p class="price">
                    ₦${item.price.toLocaleString()}
                </p>

            </div>

            <button
            onclick="removeFromCart(${index})">

                REMOVE

            </button>

        </div>

        `;

    });


    updateCartTotal();

}


function removeFromCart(index) {

    cart.splice(index, 1);

    localStorage.setItem(
        "builtEvilCart",
        JSON.stringify(cart)
    );

    displayCart();

    updateCartCount();

}


function updateCartTotal() {

    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.price,
            0
        );


    const totalElement =
        document.getElementById("cartTotal");


    if (totalElement) {

        totalElement.textContent =
            "₦" + total.toLocaleString();

    }

}


/* =========================
   REGISTER
========================= */

function registerUser(event) {

    event.preventDefault();


    const name =
        document.getElementById(
            "registerName"
        ).value;

    const email =
        document.getElementById(
            "registerEmail"
        ).value;

    const password =
        document.getElementById(
            "registerPassword"
        ).value;


    const newUser = {

        name: name,
        email: email,
        password: password,
        profileImage:
            "images/profile.jpg"

    };


    localStorage.setItem(
        "builtEvilUser",
        JSON.stringify(newUser)
    );


    alert(
        "Account created successfully!"
    );


    window.location.href =
        "login.html";

}


/* =========================
   LOGIN
========================= */

function loginUser(event) {

    event.preventDefault();


    const email =
        document.getElementById(
            "loginEmail"
        ).value;

    const password =
        document.getElementById(
            "loginPassword"
        ).value;


    const savedUser =
        JSON.parse(
            localStorage.getItem(
                "builtEvilUser"
            )
        );


    if (!savedUser) {

        alert(
            "No account found. Please create an account first."
        );

        return;

    }


    if (
        email === savedUser.email &&
        password === savedUser.password
    ) {

        localStorage.setItem(
            "builtEvilLoggedIn",
            "true"
        );


        alert("Login successful!");

        window.location.href =
            "dashboard.html";

    } else {

        alert(
            "Incorrect email or password."
        );

    }

}


/* =========================
   LOGOUT
========================= */

function logoutUser() {

    localStorage.removeItem(
        "builtEvilLoggedIn"
    );

    alert("You have been logged out.");

    window.location.href =
        "index.html";

}


/* =========================
   PASSWORD RESET
========================= */

function resetPassword(event) {

    event.preventDefault();


    const email =
        document.getElementById(
            "resetEmail"
        ).value;


    alert(
        "If an account exists for " +
        email +
        ", a password reset link would be sent."
    );

}


/* =========================
   PROFILE
========================= */

function uploadProfile(event) {

    const file =
        event.target.files[0];

    if (!file) return;


    const reader =
        new FileReader();


    reader.onload = function(e) {

        document.getElementById(
            "profilePreview"
        ).src = e.target.result;


        document.getElementById(
            "dashboardImage"
        ).src = e.target.result;


        if (user) {

            user.profileImage =
                e.target.result;

            localStorage.setItem(
                "builtEvilUser",
                JSON.stringify(user)
            );

        }

    };


    reader.readAsDataURL(file);

}


function saveProfile(event) {

    event.preventDefault();


    const name =
        document.getElementById(
            "profileFullName"
        ).value;


    const email =
        document.getElementById(
            "profileEmailInput"
        ).value;


    if (user) {

        user.name = name;
        user.email = email;


        localStorage.setItem(
            "builtEvilUser",
            JSON.stringify(user)
        );

    }


    document.getElementById(
        "profileName"
    ).textContent = name;


    document.getElementById(
        "profileEmail"
    ).textContent = email;


    alert("Profile updated!");

}


/* =========================
   SEARCH
========================= */

function searchProducts() {

    const search =
        document.getElementById(
            "search"
        ).value.toLowerCase();


    const products =
        document.querySelectorAll(
            ".product-card"
        );


    products.forEach(product => {

        const name =
            product.dataset.name
            .toLowerCase();


        if (
            name.includes(search)
        ) {

            product.style.display =
                "block";

        } else {

            product.style.display =
                "none";

        }

    });

}


/* =========================
   FILTER
========================= */

function filterProducts() {

    const category =
        document.getElementById(
            "categoryFilter"
        ).value;


    const products =
        document.querySelectorAll(
            ".product-card"
        );


    products.forEach(product => {

        if (
            category === "all" ||
            product.dataset.category ===
            category
        ) {

            product.style.display =
                "block";

        } else {

            product.style.display =
                "none";

        }

    });

}


/* =========================
   CHECKOUT
========================= */

function placeOrder(event) {

    event.preventDefault();


    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }


    const order = {

        id:
            "BE" +
            Math.floor(
                Math.random() * 1000000
            ),

        items: cart,

        date:
            new Date().toLocaleDateString(),

        total:
            cart.reduce(
                (sum, item) =>
                    sum + item.price,
                0
            )

    };


    orders.push(order);


    localStorage.setItem(
        "builtEvilOrders",
        JSON.stringify(orders)
    );


    cart = [];


    localStorage.setItem(
        "builtEvilCart",
        JSON.stringify(cart)
    );


    alert(
        "Order placed successfully!"
    );


    window.location.href =
        "orders.html";

}


/* =========================
   CUSTOMER CARE
========================= */

function sendMessage(event) {

    event.preventDefault();


    alert(
        "Thank you! Your message has been received."
    );


    event.target.reset();

}


/* =========================
   DASHBOARD DATA
========================= */

function loadUser() {

    user =
        JSON.parse(
            localStorage.getItem(
                "builtEvilUser"
            )
        );


    if (!user) return;


    const name =
        document.getElementById(
            "dashboardName"
        );

    if (name) {

        name.textContent =
            user.name;

    }


    const image =
        document.getElementById(
            "dashboardImage"
        );

    if (
        image &&
        user.profileImage
    ) {

        image.src =
            user.profileImage;

    }


    const profileImage =
        document.getElementById(
            "profilePreview"
        );

    if (
        profileImage &&
        user.profileImage
    ) {

        profileImage.src =
            user.profileImage;

    }


    const profileName =
        document.getElementById(
            "profileName"
        );

    if (profileName) {

        profileName.textContent =
            user.name;

    }


    const profileEmail =
        document.getElementById(
            "profileEmail"
        );

    if (profileEmail) {

        profileEmail.textContent =
            user.email;

    }


    const nameInput =
        document.getElementById(
            "profileFullName"
        );

    if (nameInput) {

        nameInput.value =
            user.name;

    }


    const emailInput =
        document.getElementById(
            "profileEmailInput"
        );

    if (emailInput) {

        emailInput.value =
            user.email;

    }

}


/* =========================
   ORDERS
========================= */

function displayOrders() {

    const container =
        document.getElementById(
            "ordersContainer"
        );


    if (!container) return;


    if (orders.length === 0)
        return;


    container.innerHTML = "";


    orders.forEach(order => {

        container.innerHTML += `

        <div class="order-card">

            <h3>
                Order #${order.id}
            </h3>

            <p>
                Date: ${order.date}
            </p>

            <p>
                Total:
                <strong>
                ₦${order.total.toLocaleString()}
                </strong>
            </p>

            <p class="status">
                ORDER RECEIVED
            </p>

        </div>

        `;

    });

}


/* =========================
   STARTUP
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCartCount();

        displayCart();

        displayOrders();

        loadUser();

    }
);