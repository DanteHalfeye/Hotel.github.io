document.addEventListener('DOMContentLoaded', function () {
    // Initialize the cart from localStorage if it exists, or as an empty array if it doesn't
    let cart = JSON.parse(localStorage.getItem('hotelCart')) || [];

    // Function to update the cart in localStorage and UI
    function updateCart(input) {
        const name = input.dataset.name;
        const price = parseInt(input.dataset.price);
        const quantity = parseInt(input.value);
        const image = input.dataset.image;  // Get the image URL from data attribute

        // Find the item in the cart, if it exists
        const existingItemIndex = cart.findIndex(item => item.name === name);
        if (existingItemIndex !== -1) {
            if (quantity > 0) {
                cart[existingItemIndex].quantity = quantity;  // Update quantity in cart
            } else {
                cart.splice(existingItemIndex, 1);  // Remove item if quantity is 0
            }
        } else if (quantity > 0) {
            // Add new item to the cart
            cart.push({ name, price, quantity, image });  // Include image in cart item
        }

        // Save the updated cart to localStorage
        localStorage.setItem('hotelCart', JSON.stringify(cart));

        // Update the total price in UI
        calculateTotal();
    }

    // Increment quantity when "+" button is clicked
    document.querySelectorAll('.increment').forEach(button => {
        button.addEventListener('click', function () {
            const input = button.previousElementSibling;  // Get the related input field
            input.value = parseInt(input.value) + 1;  // Increment value
            updateCart(input);  // Update the cart and localStorage
        });
    });

    // Decrement quantity when "-" button is clicked
    document.querySelectorAll('.decrement').forEach(button => {
        button.addEventListener('click', function () {
            const input = button.nextElementSibling;  // Get the related input field
            const currentValue = parseInt(input.value) || 0;
            if (currentValue > 0) {
                input.value = currentValue - 1;  // Decrement value
                updateCart(input);  // Update the cart and localStorage
            }
        });
    });

    // Function to calculate total price for the cart
    function calculateTotal() {
        let total = 0;
        cart.forEach(item => {
            total += item.quantity * item.price;
        });
        document.getElementById('totalPrice').textContent = total.toFixed(2);
    }

    // Initialize total price calculation
    calculateTotal();
});
