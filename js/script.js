$(document).ready(function() {  
  
  // Фиксация основного меню
  $(window).scroll(function() {
    var current_position = $(this).scrollTop();
    var h = $("#promo").height();
    
    if(current_position > h) {
    $("#js-fix").addClass("fix-menu");
  } else {
    $("#js-fix").removeClass("fix-menu");
  }
  });
  
  
  // Скролл основного меню
  function scrollAndActive (selId) {
  // Cache selectors
  var lastId,
      topMenu = $(selId),
      topMenuHeight = 1,
      // All list items
      menuItems = topMenu.find("a"),
      // Anchors corresponding to menu items
      scrollItems = menuItems.map(function(){
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
      });

  // Bind click handler to menu items
  // so we can get a fancy scroll animation
  menuItems.click(function(e){
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
    $('html, body').stop().animate({ 
        scrollTop: offsetTop
    }, 300);
    e.preventDefault();
  });

  // Bind to scroll
  $(window).scroll(function(){
     // Get container scroll position
     var fromTop = $(this).scrollTop()+topMenuHeight;

     // Get id of current scroll item
     var cur = scrollItems.map(function(){
       if ($(this).offset().top < fromTop)
         return this;
     });
     // Get the id of the current element
     cur = cur[cur.length-1];
     var id = cur && cur.length ? cur[0].id : "";

     if (lastId !== id) {
         lastId = id;
         // Set/remove active class
         menuItems
           .parent().removeClass("menu-item-active")
           .end().filter("[href=#"+id+"]").parent().addClass("menu-item-active");
     }                   
  });
  
  }
  
  scrollAndActive("#js-menu");
  
    // Скролл основного меню
  function scrollOnly (mainMenuId) {
  // Cache selectors
  var lastId,
      topMenu = $(mainMenuId),
      topMenuHeight = 1,
      // All list items
      menuItems = topMenu.find("a"),
      // Anchors corresponding to menu items
      scrollItems = menuItems.map(function(){
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
      });

  // Bind click handler to menu items
  // so we can get a fancy scroll animation
  menuItems.click(function(e){
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
    $('html, body').stop().animate({ 
        scrollTop: offsetTop
    }, 300);
    e.preventDefault();
  });

  // Bind to scroll
  $(window).scroll(function(){
     // Get container scroll position
     var fromTop = $(this).scrollTop()+topMenuHeight;

     // Get id of current scroll item
     var cur = scrollItems.map(function(){
       if ($(this).offset().top < fromTop)
         return this;
     });
     // Get the id of the current element
     cur = cur[cur.length-1];
     var id = cur && cur.length ? cur[0].id : "";                   
  });
  
  }
  
  scrollAndActive("#js-promo-menu");
  
  
  // Анимация наведения на блок услуг
  
  var descriptionWidth = $("#service-description").width();
  $(".js-service-transparent-block").hover(function(e) {
    e.preventDefault();
    $(this).prev().animate({
      width: "100%", 
      marginTop: "90px",
      paddingTop: "15px",
      paddingBottom: "165px",
    },120).children(".service-text").fadeIn(500);
  });
  $(".js-service-transparent-block").on("mouseout", function(e) {
    e.preventDefault();
    $(this).prev().animate({
      width: descriptionWidth, 
      marginTop: "310px",
      paddingTop: "0",
      paddingBottom: "0",
    },120).children(".service-text").fadeOut(1);
  });  
  
  
  // Табы в портфолио

  $("#tabs-caption a").on("click", function(e) {
    e.preventDefault();
    var tabId = $(this).attr("href");
    $("#tabs-caption a").removeClass("active");
    $(this).addClass("active");

    $(".tabs__content").siblings().removeClass("active");
    $(tabId).addClass("active");

    $("#portfolio-preview a").each(function() {
      if($(this).attr("href") == tabId) {
        $(this).addClass("active");
      }
    });
  });
  
  // Табы в услугах

  $("#modal-fix-menu a").on("click", function(e) {
    e.preventDefault();
    var tabId = $(this).attr("href");
    $("#modal-fix-menu a").removeClass("modal-fix-menu-active");
    $(this).addClass("modal-fix-menu-active");

 $(tabId).closest(".container").siblings(".container").removeClass("display-block").addClass("display-none").siblings("#container-display-block").removeClass("display-none").addClass("display-block");
    $(tabId).addClass("display-block");
  });
  

  
  // Модальные окна
  
  // Услуги
  
  var serviceId = "#js-modal-services";
  var portfolioId = "#js-modal-slider"
  $(serviceId).css("display", "none");
  $(portfolioId).css("display", "none");
  
  $("#service a[href^='#js-modal']").on("click", function(e) {
    e.preventDefault();
    
    // Ловим ссылку, вызывем модальное окно
    var jsId = $(this).attr("href");
  
    $(serviceId).removeClass("display-none").removeAttr("style").fadeIn("slow").addClass("pws_show").css({"display": ""}).removeClass("pws_hide")
  .children(jsId).removeClass("display-none");
    $("#container-dislay-block").removeClass("display-none");
    
    $(".modal-fix-menu-nav a").each(function() {
      if($(this).attr("href") == jsId) {
        $(this).addClass("modal-fix-menu-active");
      }
    });
    
    // Задаем высоту подложки
    var modalHeight = $("#js-modal-services .container").height()+$("#container-display-block").height();
  $(jsId).closest("#js-modal-services").children(".dark-bg").height(modalHeight+125);
    
    // Убираем прокрутку у body
    $("body, html").css("overflow", "hidden");
    
    // Закрытие модального окна
    $("#modal-close-btn").on("click", function(e) {
      e.preventDefault();

      $(".modal-fix-menu-nav a").each(function() {
        if($(this).attr("href") == jsId) {
          $(this).removeClass("modal-fix-menu-active");
        }
      });

      $(serviceId).addClass("pws_hide").hide("slow").css("z-index", "").removeClass("pws_show").children(jsId).addClass("display-none");
      $("#container-display-block").addClass("display-none");

      $("body, html").css("overflow", "auto");
    });
  });
  
  
  // Откртие слайдшоу в портфолио
  $("#portfolio-preview a").on("click", function(e) {
    e.preventDefault();
    
    // Ловим ссылку, вызывем модальное окно
    var dataId = $(this).attr("data-slider");
    $(dataId).removeClass("display-none").closest(portfolioId).removeClass("display-none").removeAttr("style").fadeIn("slow").addClass("pws_show").css({"display": ""}).removeClass("pws_hide");
    
    // Убираем прокрутку у body
    $("body, html").css("overflow", "hidden");
    
    // Закрытие модального окна
  $("#modal-slider-close-btn").on("click", function(e) {
    e.preventDefault();
    
    $(dataId).addClass("display-none").closest(portfolioId).addClass("pws_hide").hide("slow").css("z-index", "").removeClass("pws_show");
    
    $("body, html").css("overflow", "auto");
  });
  });
  
  // Слайдер
  
  function setSlider (sliderLi, sliderWrap, ulSlider) {
    //current position
    var pos = 0;
    //number of slides
    var totalSlides = $(sliderLi).length;
    //get the slide width
    var sliderWidth = $(sliderWrap).width();
    
    var counter = $(sliderWrap).closest(".wrapper").find(".counter"),
        previous = $(sliderWrap).closest(".wrapper").find(".previous"),
        next = $(sliderWrap).closest(".wrapper").find(".next");


    /*****************
     BUILD THE SLIDER
    *****************/
    //set width to be 'x' times the number of slides
    $(ulSlider).width(sliderWidth*totalSlides);

    //next slide 	
    previous.click(function(){
        slideRight();
    });

    //previous slide
    next.click(function(){
        slideLeft();
    });



    /*************************
     //*> OPTIONAL SETTINGS
    ************************/
    //automatic slider
    var autoSlider = setInterval(slideRight, 3000);

    //counter
    countSlides();

    //hide/show controls/btns when hover
    //pause automatic slide when hover
    $(sliderWrap).hover(
      function(){ clearInterval(autoSlider); }, 
      function(){ autoSlider = setInterval(slideRight, 3000); }
    );

    /***********
     SLIDE LEFT
    ************/
    function slideLeft(){
        pos--;
        if(pos==-1){ pos = totalSlides-1; }
        $(ulSlider).css('left', -(sliderWidth*pos)); 	

        //*> optional
        countSlides();
    }

    /************
     SLIDE RIGHT
    *************/
    function slideRight(){
        pos++;
        if(pos==totalSlides){ pos = 0; }
        $(ulSlider).css('left', -(sliderWidth*pos)); 

        //*> optional 
        countSlides();
    }

    /************************
     //*> OPTIONAL SETTINGS
    ************************/
    function countSlides(){
      counter.html(pos+1 + "<sup class='counter-sup'> / " + totalSlides + "</sup>");
    }
  }
  
  setSlider("#slider-wrap1 ul li", "#slider-wrap1", "#slider-wrap1 ul#slider1");
  setSlider("#slider-wrap2 ul li", "#slider-wrap2", "#slider-wrap2 ul#slider2");
  setSlider("#slider-wrap3 ul li", "#slider-wrap3", "#slider-wrap3 ul#slider3");
  setSlider("#slider-wrap4 ul li", "#slider-wrap4", "#slider-wrap4 ul#slider4");
  
  // Маска для телефона
  $('input[name="tel"]').mask("+7 (999) 999-99-99");
    
    
  // Отправка письма
//  var submitId = $("form input:submit");
//  $(submitId).on("click", function(e)) {
//    e.preventDefault();
//    
//    var formId = (this).closest("form");
//    $(formId).submit(function(e){
//      e.preventDefault();
//      var data = $(this).serialize();
//
//      $.ajax({
//          type: 'post',
//          url: 'ok.php',
//          data: data,
//          success: function(result){
//              $(submitId).click();
//            
//              $(submitId).val("Данные отправлены"); 
//
//          }
//      });
//    });
//  }  
  
});