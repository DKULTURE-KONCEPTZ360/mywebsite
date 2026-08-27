const productForm = document.getElementById("productForm");

const productImage = document.getElementById("productImage");

const imagePreview = document.getElementById("imagePreview");

const previewContainer = document.getElementById("previewContainer");

const availableClothes = document.getElementById("availableClothes");

const soldOutClothes = document.getElementById("soldOutClothes");

const totalClothes = document.getElementById("totalClothes");

const availableCount = document.getElementById("availableCount");

const soldOutCount = document.getElementById("soldOutCount");

const availableBadge = document.getElementById("availableBadge");

const soldBadge = document.getElementById("soldBadge");

const profileUpload = document.getElementById("profileUpload");

const profileImage = document.getElementById("profileImage");

const logoutBtn = document.getElementById("logoutBtn");


let products = [];

let selectedImage = "";


/* PRODUCT IMAGE PREVIEW */

productImage.addEventListener("change", function () {

    const file = this.files[0];

    if (file) {

        const reader = new FileReader();

        reader.onload = function (event) {

            selectedImage = event.target.result;

            imagePreview.src = selectedImage;

            previewContainer.style.display = "block";

        };

        reader.readAsDataURL(file);

    }

});


/* ADD PRODUCT */

productForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const name =
        document.getElementById("productName").value;

    const price =
        document.getElementById("productPrice").value;

    const category =
        document.getElementById("productCategory").value;

    const status =
        document.getElementById("productStatus").value;


    if (!selectedImage) {

        alert("Please upload a picture of the clothing item.");

        return;

    }


    const product = {

        id: Date.now(),

        name: name,

        price: price,

        category: category,

        status: status,

        image: selectedImage

    };


    products.push(product);


    renderProducts();


    productForm.reset();


    previewContainer.style.display = "none";


    selectedImage = "";

});


/* DISPLAY PRODUCTS */

function renderProducts() {

    availableClothes.innerHTML = "";

    soldOutClothes.innerHTML = "";


    const availableProducts =
        products.filter(product => product.status === "available");


    const soldProducts =
        products.filter(product => product.status === "sold");


    /* AVAILABLE PRODUCTS */

    if (availableProducts.length === 0) {

        availableClothes.innerHTML = `
            <div class="empty-message">
                No available clothes yet.
            </div>
        `;

    } else {

        availableProducts.forEach(product => {

            availableClothes.innerHTML += `

                <div class="product-card">

                    <div class="product-image-container">

                        <img
                            src="${product.image}"
                            alt="${product.name}"
                        >

                    </div>


                    <div class="product-info">

                        <p class="product-category">
                            ${product.category}
                        </p>


                        <h3 class="product-name">
                            ${product.name}
                        </h3>


                        <p class="product-price">
                            ₦${Number(product.price).toLocaleString()}
                        </p>


                        <div class="product-actions">

                            <button
                                class="sold-btn"
                                onclick="changeStatus(${product.id}, 'sold')"
                            >

                                Mark Sold Out

                            </button>


                            <button
                                class="delete-btn"
                                onclick="deleteProduct(${product.id})"
                            >

                                Delete

                            </button>

                        </div>

                    </div>

                </div>

            `;

        });

    }


    /* SOLD OUT PRODUCTS */

    if (soldProducts.length === 0) {

        soldOutClothes.innerHTML = `
            <div class="empty-message">
                No sold out clothes yet.
            </div>
        `;

    } else {

        soldProducts.forEach(product => {

            soldOutClothes.innerHTML += `

                <div class="product-card">

                    <div class="product-image-container">

                        <img
                            src="${product.image}"
                            alt="${product.name}"
                        >

                        <div class="sold-overlay">
                            SOLD OUT
                        </div>

                    </div>


                    <div class="product-info">

                        <p class="product-category">
                            ${product.category}
                        </p>


                        <h3 class="product-name">
                            ${product.name}
                        </h3>


                        <p class="product-price">
                            ₦${Number(product.price).toLocaleString()}
                        </p>


                        <div class="product-actions">

                            <button
                                class="available-btn"
                                onclick="changeStatus(${product.id}, 'available')"
                            >

                                Make Available

                            </button>


                            <button
                                class="delete-btn"
                                onclick="deleteProduct(${product.id})"
                            >

                                Delete

                            </button>

                        </div>

                    </div>

                </div>

            `;

        });

    }


    updateStatistics();

}


/* CHANGE PRODUCT STATUS */

function changeStatus(id, newStatus) {

    products = products.map(product => {

        if (product.id === id) {

            product.status = newStatus;

        }

        return product;

    });


    renderProducts();

}


/* DELETE PRODUCT */

function deleteProduct(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this clothing item?"
    );


    if (confirmDelete) {

        products =
            products.filter(product => product.id !== id);


        renderProducts();

    }

}


/* UPDATE DASHBOARD NUMBERS */

function updateStatistics() {

    const available =
        products.filter(product => product.status === "available").length;


    const sold =
        products.filter(product => product.status === "sold").length;


    totalClothes.textContent =
        products.length;


    availableCount.textContent =
        available;


    soldOutCount.textContent =
        sold;


    availableBadge.textContent =
        `${available} Items`;


    soldBadge.textContent =
        `${sold} Items`;

}


/* PROFILE PICTURE UPLOAD */

profileUpload.addEventListener("change", function () {

    const file = this.files[0];


    if (file) {

        const reader = new FileReader();


        reader.onload = function (event) {

            profileImage.src =
                event.target.result;

        };


        reader.readAsDataURL(file);

    }

});


/* LOGOUT */

logoutBtn.addEventListener("click", function (event) {

    event.preventDefault();


    const logout = confirm(
        "Are you sure you want to logout?"
    );


    if (logout) {

        window.location.href =
            "index.html";

    }

});


/* SCROLL TO UPLOAD */

function scrollToUpload() {

    document
        .getElementById("upload")
        .scrollIntoView({

            behavior: "smooth"

        });

}