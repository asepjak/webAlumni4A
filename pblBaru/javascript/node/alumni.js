const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public')); // Menyajikan file statis seperti HTML, CSS, JS

let alumniProfiles = []; // Menyimpan data di memori, bisa diganti dengan database

// Endpoint untuk mendapatkan data alumni
app.get('/api/alumni', (req, res) => {
  res.json(alumniProfiles);
});

// Endpoint untuk menambahkan alumni
app.post('/api/alumni', (req, res) => {
  const profile = req.body;
  profile.id = alumniProfiles.length; // Generate ID berdasarkan panjang array
  alumniProfiles.push(profile);
  res.status(201).json(profile);
});

// Endpoint untuk memperbarui alumni
app.put('/api/alumni/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updatedProfile = req.body;
  alumniProfiles[id] = { id, ...updatedProfile };
  res.json(alumniProfiles[id]);
});

// Endpoint untuk menghapus alumni
app.delete('/api/alumni/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  alumniProfiles = alumniProfiles.filter(profile => profile.id !== id);
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
