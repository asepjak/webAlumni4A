// Function to display the welcome message if loggedInFullName exists in localStorage
function displayGreeting() {
    const loggedInUser = localStorage.getItem('loggedInFullName');
    if (loggedInUser) {
        const greetingElement = document.getElementById('greeting');
        greetingElement.textContent = `Selamat datang,${loggedInFullName}!`;
    } else {
        window.location.href = 'index.html'; // Redirect ke halaman login jika tidak ada pengguna yang login
    }
  }
  
  // Add event listener for language toggle
  document.getElementById('language-toggle').addEventListener('click', function(event) {
    event.preventDefault();
    const currentLang = document.documentElement.getAttribute('lang');
    const newLang = currentLang === 'en' ? 'id' : 'en';
    document.documentElement.setAttribute('lang', newLang);
  
    // Update the text content based on the selected language
    updateLanguage(newLang);
  });
  
  function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-lang-id]');
  
    elements.forEach(element => {
      const text = element.getAttribute(`data-lang-${lang}`);
      if (text) {
        element.textContent = text;
      }
    });
  }

  function logoutUser() {
    localStorage.removeItem('loggedInFullName'); // Hapus data sesi pengguna yang sedang login
    alert('Anda telah logout.');
    window.location.href = '../pblBaru/login/p.html'; // Redirect ke halaman login setelah logout
  }
