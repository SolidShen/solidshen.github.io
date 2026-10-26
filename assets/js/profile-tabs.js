// Native anchor navigation keeps every section visible, including without JS.
(() => {
  const links = Array.from(document.querySelectorAll('.profile-tabs a'));
  if (!links.length) return;
  const targets = links.map(link => document.getElementById(link.hash.slice(1)));
  let scheduled = false;
  function update() {
    const masthead = document.querySelector('.masthead');
    const threshold = (masthead ? masthead.getBoundingClientRect().height : 70) + 60;
    let current = -1;
    targets.forEach((target, index) => {
      if (target && target.getBoundingClientRect().top <= threshold) current = index;
    });
    links.forEach((link, index) => {
      if (index === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    scheduled = false;
  }
  function schedule() {
    if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
  }
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('hashchange', schedule);
  update();
})();
