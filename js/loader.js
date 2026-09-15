let started = false;

export function initLoader() {
  if (started) return;
  started = true;

  const screen = document.querySelector("[data-boot-screen]");
  if (!screen) return;

  const percent = screen.querySelector("[data-boot-percent]");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const duration = reduced ? 250 : 2050;
  const start = performance.now();
  let finished = false;

  const finish = () => {
    if (finished) return;
    finished = true;
    if (percent) percent.textContent = "100%";
    screen.classList.add("is-done");
    document.body.classList.remove("preload", "locked");
    window.setTimeout(() => screen.remove(), reduced ? 0 : 900);
  };

  const tick = (now) => {
    if (finished) return;
    const progress = Math.min(1, (now - start) / duration);
    if (percent) percent.textContent = `${String(Math.round(progress * 100)).padStart(3, "0")}%`;
    if (progress < 1) window.requestAnimationFrame(tick);
    else finish();
  };

  window.requestAnimationFrame(tick);

  // Safety net: a blocked animation frame or browser throttling must never leave the site behind the boot screen.
  window.setTimeout(finish, duration + 1200);
}
