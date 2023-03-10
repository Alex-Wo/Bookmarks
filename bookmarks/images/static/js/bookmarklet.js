(function(){
  var jquery_version = '3.3.1';
  var site_url = 'https://7a17-85-175-20-86.eu.ngrok.io/';
  var static_url = site_url + 'static/';
  var min_width = 100;
  var min_height = 100;

  function bookmarklet(msg) {
    // Загрузка CSS-стилей
    var css = jQuery('<link>');
    css.attr({
      rel: 'stylesheet',
      type: 'text/css',
      href: static_url + 'css/bookmarklet.css?r=' + Math.floor(Math.random()*99999999999999999999)
    });
    jQuery('head').append(css);

    // Загрузка HTML
    box_html = '<div id="bookmarklet"><a href="#" id="close">&times;</a><h1>Select an image to bookmark:</h1><div class="images"></div></div>';
    jQuery('body').append(box_html);

    // Добавление скрытия букмарклета при нажатии на крестик
    jQuery('#bookmarklet #close').click(function(){
       jQuery('#bookmarklet').remove();
    });

    // Находим картинки на текущем сайте и вставляем их в окно букмарклета
    jQuery.each(jQuery('img[src$="jpg"]'), function(index, image) {
      if (jQuery(image).width() >= min_width && jQuery(image).height() >= min_height)
      {
        image_url = jQuery(image).attr('src');
        jQuery('#bookmarklet .images').append('<a href="#"><img src="'+ image_url +'" /></a>');
      }
    });

    // Когда изображение выбрано, открываем его URL
    jQuery('#bookmarklet .images a').click(function(e){
      selected_image = jQuery(this).children('img').attr('src');
      // Скрываем букмарклет
      jQuery('#bookmarklet').hide();
      // Открываем новое окно с формой сохранения изображения
      window.open(site_url +'images/create/?url='
                  + encodeURIComponent(selected_image)
                  + '&title='
                  + encodeURIComponent(jQuery('title').text()),
                  '_blank');
    });
  };

  // Проверяем, подключена ли jQuery
  if(typeof window.jQuery != 'undefined') {
    bookmarklet();
  } else {
    // Проверяем, что атрибут $ окна не занят другим объектом
    var conflict = typeof window.$ != 'undefined';
    // Создаём тег <script> с загрузкой jQuery
    var script = document.createElement('script');
    script.src = '//ajax.googleapis.com/ajax/libs/jquery/' +
      jquery_version + '/jquery.min.js';
    // Добавляем тег в блок <head> документа
    document.head.appendChild(script);
    // Добавляем возможность использования нескольких попыток для загрузки jQuery
    var attempts = 15;
    (function(){
      // Проверяем, подключена ли jQuery
      if(typeof window.jQuery == 'undefined') {
        if(--attempts > 0) {
          // Повторная загрузка, если jQuery НЕ подключена
          window.setTimeout(arguments.callee, 250)
        } else {
          // Если превышено число попыток загрузки, выводим следующее сообщение
          alert('An error occurred while loading jQuery')
        }
      } else {
          bookmarklet();
      }
    })();
  }
})()