// Quick action buttons

const buttons = document.querySelectorAll(".action-button");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const action = button.innerText.trim();

        alert(`${action} feature selected.`);

    });

});


// Investment buttons

const investmentButtons = document.querySelectorAll(".plan-button");

investmentButtons.forEach(button => {

    button.addEventListener("click", () => {

        const plan = button
            .closest(".plan")
            .querySelector(".plan-name")
            .innerText;

        alert(`You selected the ${plan} investment plan.`);

    });

});


// Navigation

const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(item => {

    item.addEventListener("click", function(event) {

        event.preventDefault();

        navItems.forEach(nav => {
            nav.classList.remove("active");
        });

        this.classList.add("active");

    });

});