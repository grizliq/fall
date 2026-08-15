(function () {
  var modal = document.getElementById('md-notify');
  if (!modal) return;

  var KEY = 'fp_notify_shown';
  var DELAY = 25000;         // 25 секунд на изучение сайта
  var SCROLL_AT = 0.45;      // либо 45% прокрутки — что случится раньше
  var opened = false;
  var timer;

  // один показ за сессию
  try { if (sessionStorage.getItem(KEY)) return; } catch (e) {}

  function open() {
    if (opened) return;
    opened = true;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
    clearTimeout(timer);
    window.removeEventListener('scroll', onScroll);
    document.removeEventListener('mouseout', onLeave);
  }

  function close() {
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  function onScroll() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (h > 0 && window.scrollY / h >= SCROLL_AT) open();
  }

  // уход курсора за верхнюю границу окна — человек собрался закрыть вкладку
  function onLeave(e) {
    if (e.clientY <= 0 && !e.relatedTarget) open();
  }

  timer = setTimeout(open, DELAY);
  window.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('mouseout', onLeave);

  modal.addEventListener('click', function (e) {
    if (e.target.closest('[data-md-notify-close]')) close();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) close();
  });
})();
