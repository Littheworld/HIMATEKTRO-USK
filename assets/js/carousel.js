$(document).ready(function() {
  /**
   * Mendapatkan data carousel dan menginisialisasi carousel bootstrap.
   */
  
  // Ambil data carousel
  fetch("../../data-homepage.json")
    .then(response => response.json())
    .then(dataFound => {
      const container = $("#header-carousel .carousel-inner");
      const indicators = $("#header-carousel .carousel-indicators");
      let data = dataFound.datalist.carousel;
      
      // Kosongkan indikator dan container
      indicators.empty();
      container.empty(); 

      // Iterasi setiap gambar dalam data
      data.forEach((image, index) => {
        const active = index === 0 ? "active" : "";
        const current = index === 0 ? "true" : "false";
        
        // Tambahkan tombol indikator
        indicators.append(`
          <button type="button" 
                  data-bs-target="#header-carousel" 
                  data-bs-slide-to="${index}" 
                  class="${active}" 
                  aria-current="${current}" 
                  aria-label="Slide ${index + 1}">
          </button>
        `);
        
        // Tambahkan elemen gambar ke dalam carousel
        const imgElement = `
          <div class="carousel-item ${active}">
            <img src="${image.imgpath}" 
                 class="d-block w-100 img-fluid object-fit-cover" 
                 alt="${image.imgplaceholder}"
                 loading="lazy"
                 height="600"
            >
            <div class="carousel-caption d-none d-md-block p-4 text-start">
              <div class="container">
                <div class="row align-items-center">
                  <div class="col-md-8 col-lg-6 bg-dark bg-opacity-50 p-4 rounded-3">
                    <h2 class="display-6 fw-bold text-white mb-3 headline-carousel">Slide ${index + 1} Headline</h2>
                    <p class="lead text-white-75 mb-4">
                      ${image.imgdesc[index]}
                    </p>
                    <div class="d-flex gap-3 align-items-center">
                      <a href="${image.imglink}" class="btn btn-primary btn-lg px-4 py-2">
                        Lihat berita
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
        
        container.append(imgElement);
      });
      
      // Inisialisasi carousel bootstrap jika elemen carousel ada
      const carousel = $('#header-carousel');
      if (carousel.length) {
        new bootstrap.Carousel(carousel); 
      }
    })
    .catch(error => {
      console.error("Error fetching images:", error);
    });
});
  