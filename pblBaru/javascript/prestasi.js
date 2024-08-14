document.addEventListener('DOMContentLoaded', () => {
    let achievements = [];
  
    const prestasiGrid = document.getElementById('prestasiGrid');
    const namaFilter = document.getElementById('nama-filter');
    const angkatanFilter = document.getElementById('angkatan-filter');
    const jurusanFilter = document.getElementById('jurusan-filter');
    const addPrestasiBtn = document.getElementById('addPrestasiBtn');
    const prestasiModal = document.getElementById('prestasiModal');
    const closeModalBtn = document.querySelector('.close');
    const prestasiForm = document.getElementById('prestasiForm');
    const prestasiIdInput = document.getElementById('prestasiId');
    const namaInput = document.getElementById('nama');
    const angkatanInput = document.getElementById('angkatan');
    const jurusanInput = document.getElementById('jurusan');
    const prestasiInput = document.getElementById('prestasi');
    const fotoInput = document.getElementById('foto');
    const previewImage = document.createElement('img');
    previewImage.style.maxWidth = '200px';
    previewImage.style.maxHeight = '200px';
    previewImage.style.marginTop = '10px';
    fotoInput.parentNode.insertBefore(previewImage, fotoInput.nextSibling);
  
    const loadAchievements = () => {
        const data = localStorage.getItem('achievements');
        achievements = data ? JSON.parse(data) : [];
        populateFilters();
    };
  
    const saveAchievements = () => {
        localStorage.setItem('achievements', JSON.stringify(achievements));
    };
  
    const renderAchievements = () => {
        const nama = namaFilter.value.toLowerCase();
        const angkatan = angkatanFilter.value;
        const jurusan = jurusanFilter.value;
  
        const filteredAchievements = achievements.filter(item => {
            return (
                (nama === '' || item.nama.toLowerCase().includes(nama)) &&
                (angkatan === '' || item.angkatan === angkatan) &&
                (jurusan === '' || item.jurusan === jurusan)
            );
        });
  
        prestasiGrid.innerHTML = filteredAchievements.map(item => `
            <div class="prestasi-card">
                <img src="${item.foto || 'https://via.placeholder.com/150'}" alt="${item.nama}" style="width:150px;height:150px;object-fit:cover;">
                <h3>${item.nama}</h3>
                <p>Angkatan: ${item.angkatan}</p>
                <p>Jurusan: ${item.jurusan}</p>
                <p>Prestasi: ${item.prestasi}</p>
                <button onclick="editPrestasi(${item.id})">Edit</button>
                <button onclick="deletePrestasi(${item.id})">Delete</button>
            </div>
        `).join('');
    };
  
    const populateFilters = () => {
        const angkatanSet = new Set(achievements.map(item => item.angkatan));
        const jurusanSet = new Set(achievements.map(item => item.jurusan));
  
        angkatanFilter.innerHTML = '<option value="">Semua Angkatan</option>' +
            Array.from(angkatanSet).map(angkatan => `<option value="${angkatan}">${angkatan}</option>`).join('');
  
        jurusanFilter.innerHTML = '<option value="">Semua Jurusan</option>' +
            Array.from(jurusanSet).map(jurusan => `<option value="${jurusan}">${jurusan}</option>`).join('');
    };
  
    const showModal = () => {
        prestasiModal.style.display = 'block';
    };
  
    const hideModal = () => {
        prestasiModal.style.display = 'none';
        prestasiForm.reset();
        prestasiIdInput.value = '';
        previewImage.src = '';
    };
    
  
    prestasiForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = prestasiIdInput.value ? parseInt(prestasiIdInput.value) : Date.now();
        const newPrestasi = {
            id,
            nama: namaInput.value,
            angkatan: angkatanInput.value,
            jurusan: jurusanInput.value,
            prestasi: prestasiInput.value,
            foto: previewImage.src
        };
  
        if (prestasiIdInput.value) {
            const index = achievements.findIndex(item => item.id === id);
            achievements[index] = newPrestasi;
        } else {
            achievements.push(newPrestasi);
        }
  
        saveAchievements();
        renderAchievements();
        populateFilters();
        hideModal();
    });
  
    window.editPrestasi = (id) => {
        const prestasi = achievements.find(item => item.id === id);
        prestasiIdInput.value = prestasi.id;
        namaInput.value = prestasi.nama;
        angkatanInput.value = prestasi.angkatan;
        jurusanInput.value = prestasi.jurusan;
        prestasiInput.value = prestasi.prestasi;
        previewImage.src = prestasi.foto;
        showModal();
    };
  
    window.deletePrestasi = (id) => {
        achievements = achievements.filter(item => item.id !== id);
        saveAchievements();
        renderAchievements();
        populateFilters();
    };
  
    fotoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                previewImage.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    
  
    namaFilter.addEventListener('input', renderAchievements);
    angkatanFilter.addEventListener('change', renderAchievements);
    jurusanFilter.addEventListener('change', renderAchievements);
    addPrestasiBtn.addEventListener('click', showModal);
    closeModalBtn.addEventListener('click', hideModal);
  
    loadAchievements();
    renderAchievements();
});