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
