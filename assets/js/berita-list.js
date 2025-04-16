let lorem_text = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid eaque delectus eveniet quidem! Debitis illum eum quae odio dignissimos dolore repellendus libero, minima eius hic porro nam dicta iste pariatur!"

let tags = ["penting", "menang","himpunan", "event", "umum"]

let titleBerita = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae."
$(document).ready(function () {
    // Fetch data dari API Picsum
    const fetchPicsum = async () => {
        try {
            const response = await fetch("https://picsum.photos/v2/list")
            if (!response.ok) {
                const errorMessage = `Network response was not ok. Status Code: ${response.status}`
                throw new Error(errorMessage)
            }

            const data = await response.json()
            renderPicsum(data)
        } catch (error) {
            console.error("Error fetching the image list:", error);
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
    const renderPicsum = (data) => {
        const container = $("#list-berita")
        container.empty()
        let id_baris = 0
        const rangkaBaris = `
            <div class="row gx-4 gy-4 justify-content-center" id = "id_${id_baris}" ></div>`
        container.append(rangkaBaris)
        data.forEach((el, index) => {
            const rangkaKolom = `
            <div class="col-sm-12 col-md-6 mb-sm-3 ">
                 <div class="card custom-card">
                    <img src="${el.download_url}" class="card-img-top" alt="${el.author}'s image" loading="lazy">
                    <div class="card-body">
                    <div class="tags-container">
                        ${selectTags(tags)}
                    </div>
                        <h3 class="card-title">${titleBerita}</h3>
                        <p class="card-text">${lorem_text}</p>
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

    fetchPicsum()
})

/**
 * Fungsi untuk mengambil string HTML berisi tag berdasarkan list tag yang diberikan
 * @param {string[]} tagList - List tag yang ingin ditampilkan
 * @return {string} - String HTML berisi tag-tag yang valid
 */
function selectTags(tagList) {
    // Daftar tag yang tersedia
    const availableTags = {
      "penting": '<a href="#" class="tag tag-penting">penting</a>',
      "menang": '<a href="#" class="tag tag-tropi">menang</a>',
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
      return availableTags["umum"];
    }
    
    // Proses setiap tag dari list
    for (const tag of tagList) {
      // Jika tag belum ditambahkan ke hasil
      if (!addedTags.has(tag)) {
        // Cek apakah tag tersedia
        if (availableTags[tag]) {
          result += availableTags[tag] + '\n';
        } else {
          // Jika tag tidak tersedia, gunakan tag umum jika belum ditambahkan
          if (!addedTags.has("umum")) {
            result += availableTags["umum"] + '\n';
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