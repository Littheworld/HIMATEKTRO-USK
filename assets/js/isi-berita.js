$(document).ready(function() {
    // Mengambil data dari file data-berita-page.json
    fetch('./data-berita-page.json')
        .then(response => {
            // Memeriksa apakah response sukses
            if (!response.ok) {
                const errorMessage = `Network response was not ok. Status Code: ${response.status}`
                throw new Error(errorMessage)
            }
            return response.json(); // Mengembalikan hasil parsing JSON
        })
        .then(data => {
            // Mengambil data berita dari respons JSON
            const title = data.datalist[0].titleBerita;
            const desc = data.datalist[0].descBerita;
            const tags = data.datalist[0].tags;

            // Mengambil data gambar berita
            const img = data.datalist[0].imgBerita.img;
            const imgCaption = data.datalist[0].imgBerita.captionImg || '';
            const imgPlaceHolder = data.datalist[0].imgBerita.placeHolder || '';

            // Mengambil data penulis
            const penulis = data.datalist[1].penulis || 'anon';
            const twitter = data.datalist[1].medsosPenulis.twitter || '';
            const instagram = data.datalist[1].medsosPenulis.instagram || '';
            const facebook = data.datalist[1].medsosPenulis.facebook || '';
            const tiktok = data.datalist[1].medsosPenulis.tiktok || '';
            const blog = data.datalist[1].medsosPenulis.blog || '';
            
            // Mengambil data waktu penulisan
            const tanggal = data.datalist[1].tanggalDitulis;
            const jam = data.datalist[1].jamDitulis;

            // Mengambil isi berita
            const isiBerita = data.datalist[2].isiBerita;

            // Menampilkan data pada halaman
            $('#judul-berita').text(title);
            $('#deskripsi-berita').text(desc);
            $('#image-page-berita img').attr('src', img);
            $('#image-page-berita p').text(imgCaption);
            $('#image-page-berita').attr('alt', imgPlaceHolder);
            $('#writer-name').text(penulis);
            $('#date-berita').text(`${tanggal}, ${jam}`);

            // Menampilkan tag-tag berita dengan kelas sesuai jenisnya
            for(let i = 0; i < tags.length; i++) {
                let tagClass = '';
                
                switch (tags[i]) {
                    case 'penting':
                        tagClass = 'tag-penting';
                        break;
                    case 'kemenangan':
                        tagClass = 'tag-tropi';
                        break;
                    case 'himpunan':
                        tagClass = 'tag-hima';
                        break;
                    case 'event':
                        tagClass = 'tag-event';
                        break;
                    default:
                        tagClass = '';
                        break;
                }
                
                $('#tags-page').append(`<a href="#" class="tag ${tagClass}">${tags[i]}</a>`);
            }

            // Menampilkan isi berita (paragraf teks atau gambar)
            for (let i = 0; i < isiBerita.length; i++) {
                if (typeof isiBerita[i] === 'string') {
                    // Jika item berupa string, tampilkan sebagai paragraf
                    $('#isi-berita').append(`<p>${isiBerita[i]}</p>`);
                } else {
                    // Jika item berupa objek, tampilkan sebagai gambar dengan caption
                    $('#isi-berita').append(`
                        <div class="image-isi-berita">
                            <img src="${isiBerita[i].img}" class="img-fluid" alt="${isiBerita[i].placeHolder || ''}">
                            <p class="image-caption">${isiBerita[i].captionImg}</p>
                        </div>
                    `);
                }
            }
            
            // Menampilkan ikon media sosial penulis jika tersedia
            const medsosContainer = $('.medsos-container');
            medsosContainer.empty(); // Membersihkan container sebelum menambahkan ikon baru
            
            // Menambahkan ikon Twitter jika ada
            if (twitter) {
                medsosContainer.append(`
                    <a href="${twitter}" class="circle-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mastodon" viewBox="0 0 16 16">
                            <symbol id="twitter" viewBox="0 0 16 16">
                                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>
                            </symbol>
                            <use xlink:href="#twitter"></use>
                        </svg>
                    </a>
                `);
            }
            
            // Menambahkan ikon Instagram jika ada
            if (instagram) {
                medsosContainer.append(`
                    <a href="${instagram}" class="circle-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mastodon" viewBox="0 0 16 16">
                            <symbol id="instagram" viewBox="0 0 16 16">
                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
                            </symbol>
                            <use xlink:href="#instagram"></use>
                        </svg>
                    </a>
                `);
            }
            
            // Menambahkan ikon Facebook jika ada
            if (facebook) {
                medsosContainer.append(`
                    <a href="${facebook}" class="circle-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                        </svg>
                    </a>
                `);
            }
            
            // Menambahkan ikon TikTok jika ada
            if (tiktok) {
                medsosContainer.append(`
                    <a href="${tiktok}" class="circle-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16" height="16">
                            <path fill="currentColor" d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
                        </svg>
                    </a>
                `);
            }
            
            // Menambahkan ikon Blog jika ada
            if (blog) {
                medsosContainer.append(`
                    <a href="${blog}" class="circle-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" class="bi bi-facebook">
                            <symbol id="blogspot" viewBox="0 0 16 16">
                                <path d="M14.5,7h-1C13.5,7,13,6.5,13,6V5c0-2.2-1.8-4-4-4H5C2.8,1,1,2.8,1,5v6c0,2.2,1.8,4,4,4h6c2.2,0,4-1.8,4-4V8C15,7.5,14.8,7,14.5,7z M5,4h4c0.6,0,1,0.4,1,1S9.6,6,9,6H5C4.4,6,4,5.6,4,5S4.4,4,5,4z M11,12H5c-0.6,0-1-0.4-1-1s0.4-1,1-1h6c0.6,0,1,0.4,1,1S11.6,12,11,12z"/>
                            </symbol>
                            <use xlink:href="#blogspot"></use>
                        </svg>
                    </a>
                `);
            }
        })
        .catch(error => {
            // Menampilkan pesan error jika gagal mengambil data
            console.log(error);
            $("#list-berita").html(`
                <div class="alert alert-danger d-flex align-items-center" role="alert">
                    <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Danger:">
                        <use xlink:href="#exclamation-triangle-fill"/>
                    </svg>
                    <div>
                        Gagal memuat data. Silakan coba lagi nanti
                    </div>
                </div>
            `);
        });
});