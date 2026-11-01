# Alifia — Navy Portfolio

Portfolio website sederhana dengan tema navy, aksen biru muda, dan pilihan Dark / Light mode.

## 1. Struktur folder

```text
fiaa_navy_portfolio/
├── index.html
├── README.md
├── css/
│   └── style.css
├── js/
│   ├── config.js
│   └── main.js
└── assets/
    ├── images/
    │   └── profile-placeholder.svg
    └── icons/
```

## 2. Cara menjalankan

1. Extract file ZIP.
2. Buka folder `fiaa_navy_portfolio` di VS Code.
3. Buka `index.html` dengan ekstensi Live Server.
4. Website dapat dibuka tanpa instalasi package tambahan.

## 3. Personalisasi sebelum publish

Buka `js/config.js`, lalu ubah:

- `githubUsername`: username GitHub tanpa tanda `@`.
- `email`: alamat email aktif.
- `githubUrl`, `linkedinUrl`, `instagramUrl`: tautan akun sosial.

Ganti foto profil:
1. Siapkan foto portrait.
2. Simpan di `assets/images/`.
3. Buka `index.html`, cari `profile-placeholder.svg`.
4. Ganti dengan nama file fotomu, misalnya `assets/images/profile.jpg`.

## 4. Bagian portfolio

- Home: perkenalan singkat dan fokus bidang.
- About: profil dan pendekatan belajar.
- Skills: daftar teknologi berdasarkan kategori.
- Projects: proyek pembelajaran, filter kategori, tautan repository.
- GitHub: mengambil repository publik menggunakan Fetch API.
- Journey: pendidikan dan bidang yang sedang dipelajari.
- Certificates & Highlights: ruang untuk sertifikat, aktivitas, dan minat.
- Contact: email dan tautan sosial.

## 5. Fitur JavaScript

- Toggle Dark / Light mode dan menyimpan preferensi di `localStorage`.
- Navbar mobile buka/tutup.
- Filter project berdasarkan kategori.
- Fetch API untuk mengambil repository publik GitHub.
- Loading dan error message untuk permintaan GitHub.
- Tahun footer otomatis.

## 6. Catatan konten

Konten proyek pada template ini adalah draft berdasarkan proyek pembelajaran yang pernah dibahas. Pastikan nama, deskripsi, status pengerjaan, dan tautan repository disesuaikan dengan hasil serta bukti proyek yang benar-benar kamu miliki. Jangan mencantumkan sertifikat atau pengalaman yang belum dimiliki.
