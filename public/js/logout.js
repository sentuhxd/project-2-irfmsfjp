const logout = async () => {
    // TODO: Add a comment describing the functionality of this expression
    // 
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      // TODO: Add a comment describing the functionality of this statement
      // it will return to the login page 
      document.location.replace('/login');
    } else {
      alert('Failed to log out');
    }
  };
  
  document.querySelector('#logout').addEventListener('click', logout);