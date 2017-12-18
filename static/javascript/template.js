// Bootstrap template navbar/scrolling/misc logic

(function($) {
  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (
      location.pathname.replace(/^\//, "") ===
        this.pathname.replace(/^\//, "") && location.hostname === this.hostname
    ) {
      let $target = $(this.hash);
      $target = $target.length
        ? $target
        : $("[name=" + this.hash.slice(1) + "]");
      if ($target.length) {
        $("html, body").animate(
          {
            scrollTop: $target.offset().top - 48
          },
          1000,
          "easeInOutExpo"
        );
        return false;
      }
    }
  });
  // Closes responsive menu when a scroll trigger link is clicked
  $(".js-scroll-trigger").click(function() {
    $(".navbar-collapse").collapse("hide");
  });
  // Collapse Navbar
  let navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);
  // Floating label headings for the contact form
  $(function() {
    $("body")
      .on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass(
          "floating-label-form-group-with-value",
          !!$(e.target).val()
        );
      })
      .on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
      })
      .on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
      });
  });
})(jQuery);
!(function(o) {
  o('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (
      location.pathname.replace(/^\//, "") ===
        this.pathname.replace(/^\//, "") && location.hostname === this.hostname
    ) {
      let a = o(this.hash);
      if ((a = a.length ? a : o("[name=" + this.hash.slice(1) + "]")).length)
        return (
          o("html, body").animate(
            {
              scrollTop: a.offset().top - 48
            },
            1e3,
            "easeInOutExpo"
          ),
          !1
        );
    }
  }),
    o(".js-scroll-trigger").click(function() {
      o(".navbar-collapse").collapse("hide");
    }),
    o("body").scrollspy({
      target: "#mainNav",
      offset: 54
    });
  let a = function() {
    o("#mainNav").offset().top > 100
      ? o("#mainNav").addClass("navbar-shrink")
      : o("#mainNav").removeClass("navbar-shrink");
  };
  a(),
    o(window).scroll(a),
    o(function() {
      o("body")
        .on("input propertychange", ".floating-label-form-group", function(a) {
          o(this).toggleClass(
            "floating-label-form-group-with-value",
            !!o(a.target).val()
          );
        })
        .on("focus", ".floating-label-form-group", function() {
          o(this).addClass("floating-label-form-group-with-focus");
        })
        .on("blur", ".floating-label-form-group", function() {
          o(this).removeClass("floating-label-form-group-with-focus");
        });
    });
})(jQuery);