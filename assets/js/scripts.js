$(document).ready(function () {
  function checkScroll() {
    if ($(window).scrollTop() > 50) {
      $(".normal-nav").addClass("change-bg");
    } else {
      //remove the background property so it comes transparent again
      $(".normal-nav").removeClass("change-bg");
    }
  }
  checkScroll();

  $(window).on("scroll", function () {
    checkScroll();
  });

  // toggle menu
  $("nav .toggle").click(function () {
    $(".overlay").css({
      transform: "scaleX(1)",
    });

    $(".menu-links").addClass("ul-dir");
  });

  $("nav .overlay").click(function () {
    $(this).removeAttr("style");
    $(".menu-links").removeClass("ul-dir");
  });

  //scroll top
  var scrollButton = $("#scroll-top");
  $(window).scroll(function () {
    if ($(this).scrollTop() >= 700) {
      scrollButton.fadeIn(1000);
    } else {
      scrollButton.fadeOut(1000);
    }
  });

  //click to scroll top
  scrollButton.click(function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  let isRtl = $('html[lang="ar"]').length > 0;

  // Normal Select 2
  if ($(".select").length > 0) {
    $(".select").select2({
      dir: isRtl ? "rtl" : "ltr",
      minimumResultsForSearch: Infinity,
      placeholder: function () {
        $(this).data("placeholder");
      },
    });
  }

  // Login Modal
  $(".choose_btn").on("click", function () {
    $(".choose_btn").removeClass("active");
    $(this).addClass("active");
    let modal = $(this).attr("data-btn");
    console.log(modal);
    $("#loginBtn").attr("data-bs-target", `#${modal}`);
  });

  // PassWord Show In Setting Page
  const iconsPassSet = document.querySelectorAll(".pass-icon");

  if (iconsPassSet) {
    iconsPassSet.forEach((ic) => {
      ic.addEventListener("click", function () {
        let input = ic.parentElement.querySelector("input");
        showPassword(input, ic);
      });
    });
  }

  // Function To Show And Hide Password
  function showPassword(input, icon) {
    if (input.type == "password") {
      input.setAttribute("type", "text");
      icon.innerHTML = `<i class="fa-regular fa-eye-slash"></i>`;
    } else {
      input.setAttribute("type", "password");
      icon.innerHTML = `<i class="fa-regular fa-eye"></i>`;
    }

    icon.classList.toggle("show");
  }

  // intlTelInput
  var inputs = document.querySelectorAll(".telephone");

  inputs.forEach(function (input) {
    window.intlTelInput(input, {
      autoPlaceholder: "ادخل",
      customPlaceholder: "kggg",
      initialCountry: "sa",
      // nationalMode:false,
      separateDialCode: true,
    });
  });

  // OTP
  let codes = document.querySelectorAll(".code");

  if ($(".modal")) {
    $(".modal").on("shown.bs.modal", function () {
      $(".code-container .code").first().focus();
    });
  } else {
    $(".code-container .code").first().focus();
  }

  codes.forEach((code, idx) => {
    code.addEventListener("keydown", (e) => {
      if (e.key >= 0 && e.key <= 9) {
        codes[idx].value = "";
        if ([idx + 1] < codes.length) {
          setTimeout(() => codes[idx + 1].focus(), 10);
        }
      } else if (e.key === "Backspace") {
        setTimeout(() => codes[idx - 1].focus(), 10);
      }
    });
  });

  // Counter
  let counter;
  function codeCounter() {
    $(".counter").text("");
    let num = $(".counter").data("count");

    counter = setInterval(function () {
      num--;
      $(".counter").text(num);
      if (num < 60) {
        $(".counter").text(`${num} : 00`);
      }

      if (num > 60) {
        $(".counter").text(`00 : ${num}`);
      }

      if (num < 10) {
        $(".counter").text(`0${num} : 00`);
      }

      if (num == 0) {
        clearInterval(counter);
      }
    }, 1000);
  }

  $(".new-code").on("click", function () {
    clearInterval(counter);
    codeCounter();
  });

  if ($("#UserCodePassword")) {
    $("#UserCodePassword").on("shown.bs.modal", function () {
      codeCounter();
    });
  } else{
    codeCounter();
  }
});
