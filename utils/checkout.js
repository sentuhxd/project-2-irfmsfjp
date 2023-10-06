document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch cart contents and update the page
    const updateCart = () => {
        fetch('/cart')
            .then(response => response.json())
            .then(data => {
                const cartItemsList = document.getElementById('cart-items');
                const cartTotal = document.getElementById('cart-total');

                // Clear existing cart items
                cartItemsList.innerHTML = '';

                // Populate the cart items
                data.forEach(item => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${item.name} - $${item.price}`;
                    cartItemsList.appendChild(listItem);
                });

                // Calculate and display the total
                const total = data.reduce((acc, item) => acc + item.price, 0);
                cartTotal.textContent = `$${total.toFixed(2)}`;
            });
    };

    // Function to handle the payment form submission
    const handlePayment = (event) => {
        event.preventDefault();

        // Send a request to your server to initiate the payment process (e.g., via Stripe)
        fetch('/create-checkout-session', { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                // Redirect the user to the Stripe checkout page
                window.location.href = data.redirectUrl;
            });
    };

    // Attach event listeners
    const paymentForm = document.getElementById('payment-form');
    paymentForm.addEventListener('submit', handlePayment);

    // Update the cart when the checkout page loads
    updateCart();
});
