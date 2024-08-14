// function loadAlumniData() {
//   fetch('alumni.json')
//     .then(response => response.json())
//     .then(data => {
//       const profileGrid = document.getElementById('profileGrid');
//       profileGrid.innerHTML = '';
//       data.forEach(alumni => {
//         const profileElement = createProfileElement(alumni);
//         profileGrid.appendChild(profileElement);
//       });
//     })
//     .catch(error => console.error('Error:', error));
// }

// function createProfileElement(alumni) {
//   const profileDiv = document.createElement('div');
//   profileDiv.className = 'profile';
//   profileDiv.innerHTML = `
//     <img src="${alumni.photoUrl || 'default_avatar.png'}" alt="${alumni.name}">
//     <h2>${alumni.name}</h2>
//     <p>Lulusan ${alumni.major}, Angkatan ${alumni.year}</p>
//     <p>Saat ini bekerja sebagai ${alumni.job}</p>
//   `;
//   return profileDiv;
// }

// // Panggil fungsi ini saat halaman dimuat
// document.addEventListener('DOMContentLoaded', loadAlumniData);


fetch('alumni.json')
  .then(response => response.json())
  .then(data => {
    // Display the data in the frontend
    const profileGrid = document.getElementById('profileGrid');
    profileGrid.innerHTML = '';
    data.forEach(alumni => {
      const profileElement = createProfileElement(alumni);
      profileGrid.appendChild(profileElement);
    });
  })
  .catch(error => console.error('Error:', error));

  function createProfileElement(alumni) {
    const profileDiv = document.createElement('div');
    profileDiv.className = 'profile';
    profileDiv.innerHTML = `
      <img src="${alumni.photoUrl || 'default_avatar.png'}" alt="${alumni.name}">
      <h2>${alumni.name}</h2>
      <p>Lulusan ${alumni.major}, Angkatan ${alumni.year}</p>
      <p>Saat ini bekerja sebagai ${alumni.job}</p>
    `;
    return profileDiv;
  }