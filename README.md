# Cek Pesan

Pengecek pesan penipuan berbahasa Indonesia. Situs statis: semua pemeriksaan berjalan di browser, tanpa server.

## Isi
- `index.html` alat pemeriksa, `js/app.js` logikanya
- `pola.json` daftar pola penipuan (edit file ini untuk menambah modus baru)
- `modus.html`, `cara-kerja.html`, `privasi.html`, `lapor.html` halaman pendukung
- `css/style.css`, `ikon.svg`, `manifest.webmanifest`

## Jalankan di komputer
`pola.json` dimuat lewat fetch, jadi jangan buka dengan klik dua kali. Dari folder ini jalankan:

    python -m http.server 8000

lalu buka http://localhost:8000

## Pasang di GitHub Pages
1. Buat repo baru, unggah semua isi folder ini ke root repo.
2. Settings, Pages, pilih branch `main` dan folder `/ (root)`, lalu Save.
3. Alamatnya muncul beberapa menit kemudian. Domain sendiri bisa diatur di bagian Custom domain.

## Menambah pola
Salin satu objek di `pola.json`, ubah `pola` (ekspresi reguler JavaScript), `flags`, bobot `w`, serta teks `t`, `y`, `a`. Halaman Modus penipuan ikut terbarui otomatis.

## Belum ada
- Gambar pratinjau saat tautan dibagikan (perlu `og:image` PNG dengan alamat penuh setelah domain jadi)
- Service worker, jadi belum bisa dipakai tanpa internet
- Font masih dari Google Fonts; untuk privasi penuh, unduh dan simpan sendiri di repo
