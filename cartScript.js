document.addEventListener('DOMContentLoaded', function () {
    // Retrieve the cart from localStorage
    let cart = JSON.parse(localStorage.getItem('hotelCart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('totalPrice');
    const whatsappButton = document.getElementById('checkoutButton'); // Add reference to the checkout button

    // Function to render cart items
    function renderCartItems() {
        cartItemsContainer.innerHTML = ''; // Clear any existing items

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>No hay artículos en el carrito.</p>';
            totalPriceElement.textContent = '0.00';
            return;
        }

        let total = 0; // Initialize total price

        cart.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cartItems';
            itemDiv.innerHTML = `
                <div class="cart-item-content">
                    <img src="${item.image}" alt="${item.name}" class="item-image">
                    <div class="item-details">
                        <p>${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <button class="erase-item" data-name="${item.name}" data-index="${index}">Eliminar 1</button>
                </div>
            `;

            cartItemsContainer.appendChild(itemDiv);
            total += item.price * item.quantity; // Update total
        });

        totalPriceElement.textContent = total.toFixed(2); // Update total price display
    }

    // Function to handle removing an item from the cart
    function removeItem(name) {
        cart = cart.filter(item => item.name !== name); // Remove item from cart
        localStorage.setItem('hotelCart', JSON.stringify(cart)); // Update local storage
        renderCartItems(); // Re-render cart items
    }

    // Function to erase one unit of an item
    function eraseCartItem(index) {
        const item = cart[index];

        if (item.quantity > 1) {
            item.quantity -= 1; // Decrease quantity by 1
        } else {
            cart.splice(index, 1); // Remove item if quantity reaches 0
        }

        localStorage.setItem('hotelCart', JSON.stringify(cart)); // Update local storage
        renderCartItems(); // Re-render the cart items and total price
    }

 // Function to send WhatsApp message
 function sendWhatsAppMessage(cart, total) {
    const number = '573222921728'; // Replace with the actual hotel WhatsApp number
    const items = cart.map(item => `${item.name} (x${item.quantity}) - $${(item.quantity * item.price).toFixed(2)}`);
    const message = `Hola, quiero hacer una reserva con los siguientes detalles:%0A%0A${items.join('%0A')}%0A%0ATotal: $${total.toFixed(2)}%0A%0AEl pago lo haré en efectivo`;
    const whatsappURL = `https://wa.me/${number}?text=${message}`; 

    // Open WhatsApp chat in a new window/tab
    window.open(whatsappURL, '_blank');
}


    // Event listener for the "Erase" button
    cartItemsContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('erase-item')) {
            const itemIndex = event.target.dataset.index; // Get the index of the item to reduce quantity
            eraseCartItem(itemIndex); // Call the function to erase one unit of the item
        }
    });

    // Event listener for the WhatsApp button
    whatsappButton.addEventListener('click', function () {
        const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        sendWhatsAppMessage(cart, total); // Call sendWhatsAppMessage with the current cart and total
    });

    // Initial render of cart items
    renderCartItems();
});
