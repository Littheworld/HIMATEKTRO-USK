

$(document).ready(function () {
    // Fetch data dari
    const fetchData = async () => {
        try {
            const response = await fetch("./data-berita-list.json")
            if (!response.ok) {
                const errorMessage = `Network response was not ok. Status Code: ${response.status}`
                throw new Error(errorMessage)
            }

            const dataFromServer = await response.json()
            renderData(dataFromServer)
        } catch (error) {
            console.error("Error fetching the data list:", error);
            $("#list-berita").html(
                `<div class="alert alert-danger d-flex align-items-center" role="alert">
                    <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Danger:">
                        <use xlink:href="#exclamation-triangle-fill"/>
                    </svg>
                    <div>
                        Gagal memuat data. Silakan coba lagi nanti
                    </div>
                </div>`
            )
        }
    }

    // Render data
    const renderData = (data) => {
        const container = $("#list-berita")
        container.empty()
        let id_baris = 0
        const rangkaBaris = `
            <div class="row gx-4 gy-4 justify-content-center" id = "id_${id_baris}" ></div>`
        container.append(rangkaBaris)
        const dataList = data.datalist.beritaList
        dataList.forEach((item, index) => {
            const tags = item.tags
            const titleBerita = item.berita.titleBerita
            const deskripsiBerita = item.berita.descBerita
            const imageBerita = item.imgBerita
            const rangkaKolom = `
            <div class="col-sm-12 col-md-6 mb-sm-3 ">
                 <div class="card custom-card">
                    <img src="${imageBerita.img}" class="card-img-top" alt="${imageBerita.placeHolder}'s image" loading="lazy">
                    <div class="card-body">
                    <div class="tags-container">
                        ${selectTags(tags)}
                    </div>
                        <h3 class="card-title">${titleBerita}</h3>
                        <p class="card-text">${deskripsiBerita}</p>
                        <div class="d-grid gap-2 d-md-block">
                            <a href="./berita-page.html" class="btn btn-primary ">Baca Lebih Lanjut</a>
                        </div>
                    </div>
                </div>
            </div>`
            $(`#id_${id_baris}`).append(rangkaKolom)
            if ((index + 1 ) % 2  === 0){
                id_baris ++
                let rangkaBaris = `
                    <div class="row gx-4 gy-4 justify-content-center" id = "id_${id_baris}" >
                    </div>`
                container.append(rangkaBaris)
            }
        });
    }

    fetchData()
})

/**
 * Fungsi untuk mengambil string HTML berisi tag berdasarkan list tag yang diberikan
 * @param {string[]} tagList - List tag yang ingin ditampilkan
 * @return {string} - String HTML berisi tag-tag yang valid
 */
function selectTags(tagList) {
    // Daftar tag yang tersedia
    const TagsTersedia = {
      "penting": '<a href="#" class="tag tag-penting">penting</a>',
      "kemenangan": '<a href="#" class="tag tag-tropi">menang</a>',
      "himpunan": '<a href="#" class="tag tag-hima">himpunan</a>',
      "event": '<a href="#" class="tag tag-event">event</a>',
      "umum": '<a href="#" class="tag">umum</a>'
    };
  
    // Set untuk menyimpan tag yang sudah ditambahkan (menghindari duplikat)
    const addedTags = new Set();
    
    // String hasil
    let result = '';
    
    // Jika tidak ada tag yang diberikan, kembalikan tag umum
    if (!tagList || tagList.length === 0) {
      return TagsTersedia["umum"];
    }
    
    // Proses setiap tag dari list
    for (const tag of tagList) {
      // Jika tag belum ditambahkan ke hasil
      if (!addedTags.has(tag)) {
        // Cek apakah tag tersedia
        if (TagsTersedia[tag]) {
          result += TagsTersedia[tag] + '\n';
        } else {
          // Jika tag tidak tersedia, gunakan tag umum jika belum ditambahkan
          if (!addedTags.has("umum")) {
            result += TagsTersedia["umum"] + '\n';
            addedTags.add("umum");
          }
        }
        // Tambahkan tag ke set tag yang sudah ditambahkan
        addedTags.add(tag);
      }
    }
    
    return result.trim();
}
  

$(document).ready(function() {
    /**
     * Format tanggal hari ini
     * @returns {string} tanggal hari ini dalam format bahasa indonesia
     */
    function formatCurrentDate() {
        const now = new Date();
        const options = {
            weekday: 'long', // nama hari dalam bahasa indonesia
            year: 'numeric', // tahun dalam format angka
            month: 'long', // nama bulan dalam bahasa indonesia
            day: 'numeric' // hari dalam format angka
        };
        return now.toLocaleDateString('id-ID', options);
    }
    
    // Update header
    $('.berita-date').text(formatCurrentDate());
    
    // tag animation
    $('.tag').hover(
        function() {
            $(this).animate({ marginTop: "-5px" }, 200);
        },
        function() {
            $(this).animate({ marginTop: "0px" }, 200);
        }
    );
});