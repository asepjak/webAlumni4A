window.onload = function() {
    const loggedInFullName = localStorage.getItem('loggedInFullName');
    const welcomeMessageElement = document.getElementById('welcome');
  
    if (loggedInFullName && welcomeMessageElement) {
      welcomeMessageElement.innerHTML = `Welcome,${loggedInFullName}!`;
    }
  };
  
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
    window.location.href = '../frontend/login/p.html'; // Redirect ke halaman login setelah logout
  }