// Tema Switcher
// 
// Mengganti tema web berdasarkan penggunaan button-theme
// 
// @author    Himatekro
// @copyright 2022
// @license   MIT
//
$(document).ready(function () {
  const htmlElement = $("html"); // element html
  const themeButtons = $("[data-bs-theme-value]"); // button-theme
  const navbarEl = $(".navbar") // element navbar
  
  let savedTheme = localStorage.getItem("theme") || "dark"; // tema yang disimpan di localStorage
  htmlElement.attr("data-bs-theme", savedTheme); // mengganti tema web dengan tema yang disimpan
  updateActiveButton(savedTheme); // mengupdate button-theme yang aktif

  
  // event handler button-theme
  themeButtons.on("click", function () {
    let theme = $(this).attr("data-bs-theme-value"); // tema yang dipilih pengguna
    htmlElement.attr("data-bs-theme", theme); // mengganti tema web dengan tema yang dipilih
    navbarEl.attr("data-bs-theme", theme); // mengganti tema navbar dengan tema yang dipilih
    localStorage.setItem("theme", theme); // menyimpan tema yang dipilih di localStorage
    
    updateActiveButton(theme); // mengupdate button-theme yang aktif
  });

  /**
   * Update button-theme yang aktif
   * 
   * @param {string} theme tema yang dipilih pengguna
   */
  function updateActiveButton(theme) {
    themeButtons.removeClass("active").attr("aria-pressed", "false"); // menghapus kelas active dan mengganti atribut aria-pressed menjadi false
    themeButtons.filter(`[data-bs-theme-value="${theme}"]`)
      .addClass("active") // menambahkan kelas active
      .attr("aria-pressed", "true"); // mengganti atribut aria-pressed menjadi true
  }
});

// Membuat shadow di belakang navbar saat scroll
$(window).scroll(function() {
  /**
   * Membuat shadow di belakang navbar saat scroll
   * 
   * @param {number} scrollTop nilai scroll dari window
   */
  function createShadow(scrollTop) {
    // Membuat warna background navbar sesuai tema yang dipilih
    const isDarkTheme = $('html').attr('data-bs-theme') === 'dark';
    const backgroundColor = isDarkTheme ? 
      'rgba(33, 37, 41, 0.95)' : 'rgba(248, 249, 250, 0.95)';
    
    // Membuat shadow di belakang navbar saat scroll
    const boxShadow = scrollTop > 50 ? 
      '0 2px 10px rgba(0,0,0,0.1)' : 'none';
    
    // Mengupdate style navbar dengan warna background dan shadow
    $('.navbar').css({
      'background-color': backgroundColor,
      'box-shadow': boxShadow
    });
  }

  // Membuat event listener untuk scroll window
  $(window).scroll(function() {
    // Membuat shadow di belakang navbar saat scroll
    createShadow($(window).scrollTop());
  });})
