// JavaScript for adding items to the cart
document.addEventListener('DOMContentLoaded', () => {
    // Function to add a product to the cart
    const addToCart = (productId) => {
        fetch(`/api/cart/${productId}`, {
            method: 'POST',
        })
        .then(response => {
            if (response.ok) {
                // Cart item added successfully, you can update the UI or show a confirmation message here
                console.log('Product added to cart.');
            } else {
                console.error('Failed to add product to cart.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    // Attach click event listeners to the "Add to Cart" buttons on product cards
    const addToCartButtons = document.querySelectorAll('.addtocart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-productId');
            addToCart(productId);
               });
    });
});
