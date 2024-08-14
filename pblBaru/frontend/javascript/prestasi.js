document.addEventListener('DOMContentLoaded', function() {
    const prestasiGrid = document.getElementById('prestasiGrid');
    const addPrestasiBtn = document.getElementById('addPrestasiBtn');
    const prestasiModal = document.getElementById('prestasiModal');
    const prestasiForm = document.getElementById('prestasiForm');
    const closeBtn = document.querySelector('.close');
    const namaFilter = document.getElementById('nama-filter');
    const angkatanFilter = document.getElementById('angkatan-filter');
    const jurusanFilter = document.getElementById('jurusan-filter');
    const prestasiFilter = document.getElementById('prestasi-filter');

    let prestasi = JSON.parse(localStorage.getItem('prestasi')) || [];

    function renderPrestasi(filteredPrestasi = prestasi) {
        prestasiGrid.innerHTML = '';
        filteredPrestasi.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'prestasi-card';
            card.innerHTML = `
                <img src="${item.foto || 'https://via.placeholder.com/250'}" alt="${item.nama}">
                <div class="prestasi-info">
                    <h3>${item.nama}</h3>
                    <p>Angkatan: ${item.angkatan}</p>
                    <p>Jurusan: ${item.jurusan}</p>
                    <p>Prestasi: ${item.prestasi}</p>
                </div>
                <div class="prestasi-actions">
                    <button class="edit-btn" data-id="${index}">Edit</button>
                    <button class="delete-btn" data-id="${index}">Hapus</button>
                </div>
            `;
            prestasiGrid.appendChild(card);
        });
    }

    function savePrestasi() {
        localStorage.setItem('prestasi', JSON.stringify(prestasi));
    }

    function populateFilters() {
        const angkatans = [...new Set(prestasi.map(item => item.angkatan))];
        const jurusans = [...new Set(prestasi.map(item => item.jurusan))];

        angkatanFilter.innerHTML = '<option value="">Semua Angkatan</option>';
        jurusanFilter.innerHTML = '<option value="">Semua Jurusan</option>';

        angkatans.forEach(angkatan => {
            angkatanFilter.innerHTML += `<option value="${angkatan}">${angkatan}</option>`;
        });

        jurusans.forEach(jurusan => {
            jurusanFilter.innerHTML += `<option value="${jurusan}">${jurusan}</option>`;
        });
    }

    function filterPrestasi() {
        const nama = namaFilter.value.toLowerCase();
        const angkatan = angkatanFilter.value;
        const jurusan = jurusanFilter.value;
        const prestasiKeyword = prestasiFilter.value.toLowerCase();

        let filteredPrestasi = prestasi.filter(item => {
            return (
                item.nama.toLowerCase().includes(nama) &&
                (angkatan === '' || item.angkatan === angkatan) &&
                (jurusan === '' || item.jurusan === jurusan) &&
                item.prestasi.toLowerCase().includes(prestasiKeyword)
            );
        });

        renderPrestasi(filteredPrestasi);
    }

    addPrestasiBtn.addEventListener('click', () => {
        prestasiForm.reset();
        document.getElementById('prestasiId').value = '';
        prestasiModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        prestasiModal.style.display = 'none';
    });

    prestasiForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('prestasiId').value;
        const nama = document.getElementById('nama').value;
        const angkatan = document.getElementById('angkatan').value;
        const jurusan = document.getElementById('jurusan').value;
        const prestasiValue = document.getElementById('prestasi').value;
        const foto = document.getElementById('foto').files[0];

        const reader = new FileReader();
        reader.onload = function(event) {
            const prestasiItem = {
                nama,
                angkatan,
                jurusan,
                prestasi: prestasiValue,
                foto: event.target.result
            };

            if (id !== '') {
                prestasi[parseInt(id)] = prestasiItem;
            } else {
                prestasi.push(prestasiItem);
            }

            savePrestasi();
            renderPrestasi();
            populateFilters();
            prestasiModal.style.display = 'none';
        };

        if (foto) {
            reader.readAsDataURL(foto);
        } else {
            reader.onload();
        }
    });

    prestasiGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-btn')) {
            const id = e.target.getAttribute('data-id');
            const item = prestasi[id];
            document.getElementById('prestasiId').value = id;
            document.getElementById('nama').value = item.nama;
            document.getElementById('angkatan').value = item.angkatan;
            document.getElementById('jurusan').value = item.jurusan;
            document.getElementById('prestasi').value = item.prestasi;
            prestasiModal.style.display = 'block';
        } else if (e.target.classList.contains('delete-btn')) {
            const id = e.target.getAttribute('data-id');
            prestasi.splice(id, 1);
            savePrestasi();
            renderPrestasi();
            populateFilters();
        }
    });

    namaFilter.addEventListener('input', filterPrestasi);
    angkatanFilter.addEventListener('change', filterPrestasi);
    jurusanFilter.addEventListener('change', filterPrestasi);
    prestasiFilter.addEventListener('input', filterPrestasi);

    renderPrestasi();
    populateFilters();
});