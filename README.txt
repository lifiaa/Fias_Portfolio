# Fiaa — Personal Portfolio (Navy)

## Struktur
- `index.html` — struktur halaman dan Tailwind CSS via CDN
- `style.css` — tema navy, light mode, layout, dan komponen
- `script.js` — navbar mobile, dark/light mode, dan Fetch API GitHub
- `assets/profile.jpg` — letakkan foto profil kamu di sini (opsional)

## Cara menjalankan
1. Extract ZIP.
2. Buka folder di VS Code.
3. Ganti `GITHUB_USERNAME_KAMU` pada baris pertama `script.js` dengan username GitHub kamu.
4. Ganti alamat email pada `href="mailto:your.email@example.com"` di `index.html`.
5. Tambahkan foto kamu dengan nama `profile.jpg` ke folder `assets`.
6. Jalankan `index.html` menggunakan Live Server.

Tailwind CSS dimuat melalui CDN, jadi koneksi internet diperlukan saat membuka halaman.
Data repository diambil dari GitHub REST API menggunakan Fetch API (GET).
