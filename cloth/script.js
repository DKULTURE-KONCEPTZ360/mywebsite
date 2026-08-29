/* =====================================
   BUILT EVIL E-COMMERCE SYSTEM
===================================== */


/* PRODUCTS */

const products = [

    {
        id: 1,
        name: "BUILT EVIL Oversized Tee",
        category: "tshirts",
        price: 25000,
        description: "Premium oversized streetwear T-shirt."
    },

    {
        id: 2,
        name: "EVIL LOGO Tee",
        category: "tshirts",
        price: 22000,
        description: "Classic BUILT EVIL logo T-shirt."
    },

    {
        id: 3,
        name: "BUILT EVIL Hoodie",
        category: "hoodies",
        price: 55000,
        description: "Heavyweight premium hoodie."
    },

    {
        id: 4,
        name: "SIGNATURE Hoodie",
        category: "hoodies",
        price: 60000,
        description: "Limited edition signature hoodie."
    },

    {
        id: 5,
        name: "BUILT Cargo Pants",
        category: "pants",
        price: 48000,
        description: "Relaxed fit cargo streetwear pants."
    },

    {
        id: 6,
        name: "EVIL Denim",
        category: "pants",
        price: 45000,
        description: "Premium loose-fit denim."
    },

    {
        id: 7,
        name: "BUILT EVIL Cap",
        category: "accessories",
        price: 18000,
        description: "Signature streetwear cap."
    },

    {
        id: 8,
        name: "BUILT EVIL Tote Bag",
        category: "accessories",
        price: 15000,
        description: "Heavy-duty everyday tote."
    }

];


/* LOCAL STORAGE */

let cart = JSON.parse(
    localStorage.getItem("builtEvilCart")
) || [];

let orders = JSON.parse(
    localStorage.getItem("builtEvilOrders")
) || [];

let user = JSON.parse(
    localStorage.getItem("builtEvilUser")
) || null;


/* FORMAT MONEY */

function money(amount) {

    return "₦" + amount.toLocaleString("en-NG");

}


/* SAVE CART */

function saveCart() {

    localStorage.setItem(
        "builtEvilCart",
        JSON.stringify(cart)
    );

    updateCartCount();

}


/* CART COUNT */

function updateCartCount() {

    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    document
        .querySelectorAll("#cart-count")
        .forEach(element => {
            element.textContent = count;
        });

    const dashboardCart =
        document.getElementById("dashboard-cart");

    if (dashboardCart) {
        dashboardCart.textContent = count;
    }

}


/* ADD TO CART */

function addToCart(id) {

    const product = products.find(
        item => item.id === id
    );

    if (!product) return;

    const existing = cart.find(
        item => item.id === id
    );

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });

    }

    saveCart();

    alert(product.name + " added to cart.");

}


/* REMOVE FROM CART */

function removeFromCart(id) {

    cart = cart.filter(
        item => item.id !== id
    );

    saveCart();

    renderCart();

}


/* CHANGE QUANTITY */

function changeQuantity(id, amount) {

    const item = cart.find(
        item => item.id === id
    );

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {

        removeFromCart(id);

        return;

    }

    saveCart();

    renderCart();

}


/* RENDER PRODUCTS */

function renderProducts(list = products) {

    const container =
        document.getElementById("products");

    if (!container) return;

    container.innerHTML = "";

    if (list.length === 0) {

        container.innerHTML =
            "<p>No products found.</p>";

        return;

    }

    list.forEach(product => {

        container.innerHTML += `

            <div class="product-card">

                <div class="product-image">

                    <span>
                        PRODUCT IMAGE
                    </span>

                </div>

                <h3>${product.name}</h3>

                <p>${money(product.price)}</p>

                <p>${product.description}</p>

                <button
                    class="btn"
                    onclick="addToCart(${product.id})"
                >
                    ADD TO CART
                </button>

            </div>

        `;

    });

}


/* FEATURED PRODUCTS */

function renderFeatured() {

    const container =
        document.getElementById("featured-products");

    if (!container) return;

    container.innerHTML = "";

    products.slice(0, 4).forEach(product => {

        container.innerHTML += `

            <div class="product-card">

                <div class="product-image">
                    <span>PRODUCT IMAGE</span>
                </div>

                <h3>${product.name}</h3>

                <p>${money(product.price)}</p>

                <button
                    class="btn"
                    onclick="addToCart(${product.id})"
                >
                    ADD TO CART
                </button>

            </div>

        `;

    });

}


/* SEARCH */

function filterProducts() {

    const search =
        document
        .getElementById("search")
        ?.value
        .toLowerCase() || "";

    const category =
        document
        .getElementById("category-filter")
        ?.value || "all";

    let filtered = products.filter(product => {

        const matchesSearch =
            product.name
            .toLowerCase()
            .includes(search);

        const matchesCategory =
            category === "all" ||
            product.category === category;

        return matchesSearch &&
               matchesCategory;

    });

    const sort =
        document
        .getElementById("sort-products")
        ?.value;

    if (sort === "low") {

        filtered.sort(
            (a, b) => a.price - b.price
        );

    }

    if (sort === "high") {

        filtered.sort(
            (a, b) => b.price - a.price
        );

    }

    if (sort === "name") {

        filtered.sort(
            (a, b) =>
                a.name.localeCompare(b.name)
        );

    }

    renderProducts(filtered);

}


/* RENDER CART */

function renderCart() {

    const container =
        document.getElementById("cart-items");

    if (!container) return;

    container.innerHTML = "";

    if (cart.length === 0) {

        container.innerHTML = `

            <div>
                <h2>Your cart is empty.</h2>
                <br>
                <a class="btn" href="shop.html">
                    START SHOPPING
                </a>
            </div>

        `;

        const total =
            document.getElementById("cart-total");

        if (total) {
            total.textContent = "₦0";
        }

        return;

    }

    cart.forEach(item => {

        container.innerHTML += `

            <div class="cart-item">

                <div>

                    <h3>${item.name}</h3>

                    <p>
                        ${money(item.price)}
                    </p>

                </div>

                <div>

                    <button
                        onclick="changeQuantity(${item.id}, -1)"
                    >
                        −
                    </button>

                    ${item.quantity}

                    <button
                        onclick="changeQuantity(${item.id}, 1)"
                    >
                        +
                    </button>

                </div>

                <strong>
                    ${money(
                        item.price * item.quantity
                    )}
                </strong>

                <button
                    onclick="removeFromCart(${item.id})"
                >
                    REMOVE
                </button>

            </div>

        `;

    });


    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );

    const totalElement =
        document.getElementById("cart-total");

    if (totalElement) {

        totalElement.textContent =
            money(total);

    }

}


/* CHECKOUT */

function goToCheckout() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }

    window.location.href =
        "checkout.html";

}


/* RENDER CHECKOUT */

function renderCheckout() {

    const container =
        document.getElementById("checkout-items");

    if (!container) return;

    container.innerHTML = "";

    cart.forEach(item => {

        container.innerHTML += `

            <div class="checkout-product">

                <span>
                    ${item.name}
                    × ${item.quantity}
                </span>

                <strong>
                    ${money(
                        item.price * item.quantity
                    )}
                </strong>

            </div>

        `;

    });

    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );

    const totalElement =
        document.getElementById("checkout-total");

    if (totalElement) {

        totalElement.textContent =
            money(total);

    }

}


/* REGISTER */

const registerForm =
    document.getElementById("register-form");

if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const name =
                document.getElementById(
                    "register-name"
                ).value;

            const email =
                document.getElementById(
                    "register-email"
                ).value;

            const password =
                document.getElementById(
                    "register-password"
                ).value;

            const confirm =
                document.getElementById(
                    "confirm-password"
                ).value;


            if (password !== confirm) {

                alert("Passwords do not match.");

                return;

            }


            user = {

                name: name,
                email: email,
                password: password,
                phone: "",
                address: ""

            };


            localStorage.setItem(
                "builtEvilUser",
                JSON.stringify(user)
            );


            alert(
                "Account created successfully."
            );

            window.location.href =
                "dashboard.html";

        }
    );

}


/* LOGIN */

const loginForm =
    document.getElementById("login-form");

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const email =
                document.getElementById(
                    "login-email"
                ).value;

            const password =
                document.getElementById(
                    "login-password"
                ).value;


            const savedUser =
                JSON.parse(
                    localStorage.getItem(
                        "builtEvilUser"
                    )
                );


            if (
                savedUser &&
                savedUser.email === email &&
                savedUser.password === password
            ) {

                user = savedUser;

                alert("Welcome back!");

                window.location.href =
                    "dashboard.html";

            } else {

                alert(
                    "Invalid email or password."
                );

            }

        }
    );

}


/* FORGOT PASSWORD */

const forgotForm =
    document.getElementById("forgot-form");

if (forgotForm) {

    forgotForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            alert(
                "If an account exists with this email, password reset instructions have been sent."
            );

        }
    );

}


/* DASHBOARD */

function loadDashboard() {

    if (!user) return;

    const name =
        document.getElementById(
            "dashboard-name"
        );

    if (name) {
        name.textContent =
            user.name.toUpperCase();
    }


    const profileName =
        document.getElementById(
            "profile-name"
        );

    const profileEmail =
        document.getElementById(
            "profile-email"
        );

    const profilePhone =
        document.getElementById(
            "profile-phone"
        );

    const profileAddress =
        document.getElementById(
            "profile-address"
        );


    if (profileName) {
        profileName.value = user.name;
    }

    if (profileEmail) {
        profileEmail.value = user.email;
    }

    if (profilePhone) {
        profilePhone.value = user.phone || "";
    }

    if (profileAddress) {
        profileAddress.value =
            user.address || "";
    }


    const orderCount =
        document.getElementById(
            "order-count"
        );

    if (orderCount) {

        orderCount.textContent =
            orders.length;

    }

}


/* PROFILE */

const profileForm =
    document.getElementById("profile-form");

if (profileForm) {

    profileForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            if (!user) return;

            user.name =
                document.getElementById(
                    "profile-name"
                ).value;

            user.email =
                document.getElementById(
                    "profile-email"
                ).value;

            user.phone =
                document.getElementById(
                    "profile-phone"
                ).value;

            user.address =
                document.getElementById(
                    "profile-address"
                ).value;


            localStorage.setItem(
                "builtEvilUser",
                JSON.stringify(user)
            );

            alert(
                "Profile updated successfully."
            );

            loadDashboard();

        }
    );

}


/* DASHBOARD TABS */

function showDashboard(section) {

    document
        .getElementById("overview")
        ?.classList.add("hidden");

    document
        .getElementById("profile")
        ?.classList.add("hidden");


    document
        .getElementById(section)
        ?.classList.remove("hidden");

}


/* LOGOUT */

function logout() {

    localStorage.removeItem(
        "builtEvilLoggedIn"
    );

    alert("You have been signed out.");

    window.location.href =
        "index.html";

}


/* PLACE ORDER */

const checkoutForm =
    document.getElementById(
        "checkout-form"
    );

if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            if (cart.length === 0) {

                alert("Your cart is empty.");

                return;

            }


            const orderNumber =
                "BE-" +
                Date.now()
                .toString()
                .slice(-8);


            const total =
                cart.reduce(
                    (sum, item) =>
                        sum +
                        item.price *
                        item.quantity,
                    0
                );


            const order = {

                id: orderNumber,

                date:
                    new Date()
                    .toLocaleDateString(),

                items: [...cart],

                total: total,

                status: "Order Received",

                customer:
                    document.getElementById(
                        "checkout-name"
                    ).value,

                email:
                    document.getElementById(
                        "checkout-email"
                    ).value,

                phone:
                    document.getElementById(
                        "checkout-phone"
                    ).value,

                address:
                    document.getElementById(
                        "checkout-address"
                    ).value,

                city:
                    document.getElementById(
                        "checkout-city"
                    ).value,

                state:
                    document.getElementById(
                        "checkout-state"
                    ).value,

                payment:
                    document.getElementById(
                        "payment-method"
                    ).value

            };


            orders.push(order);


            localStorage.setItem(
                "builtEvilOrders",
                JSON.stringify(orders)
            );


            cart = [];

            saveCart();


            alert(
                "Order placed successfully! Order #" +
                orderNumber
            );


            window.location.href =
                "orders.html";

        }
    );

}


/* ORDERS */

function renderOrders() {

    const container =
        document.getElementById(
            "orders-container"
        );

    if (!container) return;

    container.innerHTML = "";


    if (orders.length === 0) {

        container.innerHTML = `

            <p>You haven't placed any orders yet.</p>

            <br>

            <a href="shop.html" class="btn">
                SHOP NOW
            </a>

        `;

        return;

    }


    [...orders]
        .reverse()
        .forEach(order => {

            let itemHTML = "";

            order.items.forEach(item => {

                itemHTML += `

                    <p>
                        ${item.name}
                        × ${item.quantity}
                    </p>

                `;

            });


            container.innerHTML += `

                <div class="order-card">

                    <h2>
                        ORDER #${order.id}
                    </h2>

                    <p>
                        Date: ${order.date}
                    </p>

                    <br>

                    ${itemHTML}

                    <br>

                    <strong>
                        Total: ${money(order.total)}
                    </strong>

                    <br>

                    <span class="order-status">
                        ${order.status}
                    </span>

                </div>

            `;

        });

}


/* CONTACT FORM */

const contactForm =
    document.getElementById(
        "contact-form"
    );

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            alert(
                "Your message has been sent. Our customer care team will contact you."
            );

            contactForm.reset();

        }
    );

}


/* SEARCH EVENTS */

document
    .getElementById("search")
    ?.addEventListener(
        "input",
        filterProducts
    );

document
    .getElementById("category-filter")
    ?.addEventListener(
        "change",
        filterProducts
    );

document
    .getElementById("sort-products")
    ?.addEventListener(
        "change",
        filterProducts
    );


/* INITIALIZE */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCartCount();

        renderProducts();

        renderFeatured();

        renderCart();

        renderCheckout();

        renderOrders();

        loadDashboard();

    }
);