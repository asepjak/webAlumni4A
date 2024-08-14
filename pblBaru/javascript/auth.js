// Assume we have a function to get the current user's ID
function getCurrentUserId() {
    // This should return the ID of the currently logged-in user
    // Implementation depends on your authentication system
  }
  
  // Modified createProfile function
  function createProfile(profile) {
    const currentUserId = getCurrentUserId();
    if (!currentUserId) {
      alert("You must be logged in to create a profile.");
      return;
    }
    
    const newId = alumniProfiles.length;
    alumniProfiles.push({ id: newId, userId: currentUserId, ...profile });
    saveDataToTxt();
    renderProfiles();
  }
  
  // Modified renderProfiles function
  function renderProfiles() {
    const profileGrid = document.getElementById("profileGrid");
    profileGrid.innerHTML = "";
    const currentUserId = getCurrentUserId();
  
    alumniProfiles.forEach((profile) => {
      const isOwner = profile.userId === currentUserId;
      
      profileGrid.innerHTML += `
        <div class="profile">
          <img src="${profile.photoUrl || "default_avatar.png"}" alt="${profile.name}">
          <h2>${profile.name}</h2>
          <p>Lulusan ${profile.major}, Angkatan ${profile.year}</p>
          <p>Saat ini bekerja sebagai ${profile.job}</p>
          ${isOwner ? `
            <button onclick="editProfile(${profile.id})">Edit</button>
            <button onclick="deleteProfile(${profile.id})">Delete</button>
          ` : ''}
        </div>
      `;
    });
  }
  
  // Modified editProfile function
  function editProfile(id) {
    const profile = alumniProfiles.find((profile) => profile.id === id);
    const currentUserId = getCurrentUserId();
    
    if (profile.userId !== currentUserId) {
      alert("You don't have permission to edit this profile.");
      return;
    }
  
    document.getElementById("profileId").value = id;
    document.getElementById("alumniName").value = profile.name;
    document.getElementById("alumniMajor").value = profile.major;
    document.getElementById("alumniYear").value = profile.year;
    document.getElementById("alumniJob").value = profile.job;
  
    const previewContainer = document.getElementById("previewContainer");
    previewContainer.innerHTML = `<img src="${profile.photoUrl}" alt="Preview Image" id="previewImage">`;
  
    showForm();
  }
  
  // Modified deleteProfile function
  function deleteProfile(id) {
    const profile = alumniProfiles.find((profile) => profile.id === id);
    const currentUserId = getCurrentUserId();
    
    if (profile.userId !== currentUserId) {
      alert("You don't have permission to delete this profile.");
      return;
    }
  
    alumniProfiles = alumniProfiles.filter((profile) => profile.id !== id);
    alumniProfiles.forEach((profile, index) => (profile.id = index));
    saveDataToTxt();
    renderProfiles();
  }
  
  // Add this function to your script to handle user logout
  function logout() {
    // Clear the user session or token
    // This implementation will depend on your authentication system
    // For example:
    // localStorage.removeItem('userToken');
    
    // Redirect to login page or refresh the current page
    window.location.reload();
  }
  
  // Add event listener for logout button
  document.getElementById('logoutButton').addEventListener('click', logout);
  
  // Call renderProfiles() when the page loads
  document.addEventListener('DOMContentLoaded', renderProfiles);