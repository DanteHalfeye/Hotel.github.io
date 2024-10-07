document.addEventListener('DOMContentLoaded', function () {
    const inputs = document.querySelectorAll('.service');

    // Add event listeners to increment and decrement buttons
    document.querySelectorAll('.increment').forEach(button => {
        button.addEventListener('click', function () {
            const input = button.previousElementSibling; // Get the corresponding input
            input.value = parseInt(input.value) + 1; // Increment the value
            calculateTotal(); // Recalculate total
        });
    });

    document.querySelectorAll('.decrement').forEach(button => {
        button.addEventListener('click', function () {
            const input = button.nextElementSibling; // Get the corresponding input
            const currentValue = parseInt(input.value) || 0; // Get current value
            if (currentValue > 0) {
                input.value = currentValue - 1; // Decrement the value
                calculateTotal(); // Recalculate total
            }
        });
    });

    // Add event listener to each input for automatic total calculation
    inputs.forEach(input => {
        input.addEventListener('input', calculateTotal);
    });

    // Total calculation function
    function calculateTotal() {
        const inputs = document.querySelectorAll('.service');
        let total = 0;
        const items = [];

        inputs.forEach(input => {
            const quantity = parseInt(input.value) || 0; // Handle NaN by defaulting to 0
            const price = parseInt(input.dataset.price) || 0; // Handle NaN for price
            const name = input.dataset.name;

            if (quantity > 0) {
                const itemTotal = quantity * price;
                total += itemTotal;
                items.push(`${name} (x${quantity}) - $${itemTotal}`);
            }
        });

        // Update total price in the DOM
        document.getElementById('totalPrice').textContent = total.toFixed(2);

        const checkoutButton = document.getElementById('checkoutButton');
        if (total > 0) {
            checkoutButton.style.display = 'inline-block';
            checkoutButton.onclick = () => sendWhatsAppMessage(items, total);
        } else {
            checkoutButton.style.display = 'none';
        }
    }

    // Send WhatsApp message function
    function sendWhatsAppMessage(items, total) {
        const number = '573222921728'; // Replace with the actual hotel WhatsApp number
        const message = `Hola, quiero hacer una reserva con los siguientes detalles:%0A%0A${items.join('%0A')}%0A%0ATotal: $${total.toFixed(2)}%0A%0AEl pago lo haré en efectivo`;
        const whatsappURL = `https://wa.me/${number}?text=${message}`; 

        // Open WhatsApp chat in a new window/tab
        window.open(whatsappURL, '_blank');
    }
});
