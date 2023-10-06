// JavaScript for front end
document.addEventListener('DOMContentLoaded', () => {
    // Function to add a product to the cart
    const addToCart = (product) => {
      fetch('/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
        .then((response) => response.json())
        .then(() => {
          // Update the cart UI
        });
    };
  
    // Function to initiate the checkout process
    const checkout = () => {
      fetch('/create-checkout-session', {
        method: 'POST',
      })
        .then((response) => response.json())
        .then((data) => {
          // Redirect to Stripe checkout page
          window.location.href = data.redirectUrl;
        });
    };
  
    // Attach event listeners to buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        const productPrice = button.dataset.productPrice;
        const product = {
          id: productId,
          price: productPrice,
        };
        addToCart(product);
      });
    });
  
    const checkoutButton = document.getElementById('checkout-btn');
    checkoutButton.addEventListener('click', () => {
      checkout();
    });
  });
  
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const viewCartButton = document.getElementById('view-cart');

    addToCartButtons.forEach(button => {
      button.addEventListener('click', () => {
        const productId = button.getAttribute('data-product-id');
        // Send a POST request to add the product to the cart
        fetch(`/add-to-cart/${productId}`, { method: 'POST' })
          .then(response => response.redirected ? window.location.href = response.url : null);
      });
    });

    // Update the cart button text
    fetch('/cart')
      .then(response => response.text())
      .then(data => {
        viewCartButton.textContent = `Cart (${data} items)`;
      });

    // View cart button click handler
    viewCartButton.addEventListener('click', () => {
      window.location.href = '/cart';
    });
 