/* Tiny vanilla JS — nav state, parallax, reveal-on-scroll, waitlist form */
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

async function submitToWaitlist(email, source) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ email, source }),
  });
  if (res.status === 409) return { duplicate: true };
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return { ok: true };
}
(function () {
  const nav = document.querySelector(".nav");
  const onScrollNav = () => {
    nav.classList.toggle("scrolled", window.scrollY > 30);
  };
  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  /* Hero Tomo scrolly animation */
  const hero = document.querySelector(".hero");
  const heroTomo = document.querySelector(".hero-tomo");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let heroRaf = null;

  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  const easeInOutCubic = (t) => t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;

  function setHeroTomo() {
    heroRaf = null;
    if (!hero || !heroTomo) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // At ≤960px the hero pin becomes position:static and CSS already sets
    // opacity:1 / scale(1). Clear any inline styles so CSS wins.
    if (vw <= 960) {
      heroTomo.style.opacity = "";
      heroTomo.style.transform = "";
      return;
    }

    const pinDistance = Math.max(1, (hero.offsetHeight || vh) - vh);

    if (prefersReducedMotion.matches) {
      heroTomo.style.opacity = "1";
      heroTomo.style.transform = `translate3d(${vw * 0.18}px, ${vh * -0.02}px, 0) scale(1) rotate(0deg)`;
      return;
    }

    const heroTop = hero.offsetTop;
    const heroScroll = clamp(window.scrollY - heroTop, 0, pinDistance);
    const progress = heroScroll / pinDistance;
    const grow = easeOutCubic(progress);
    const drift = easeInOutCubic(progress);
    const mobile = vw < 760;

    const scale = lerp(0.18, 1, grow);
    const startX = mobile ? -vw * 0.03 : -vw * 0.08;
    const finalX = mobile ? vw * 0.34 : vw * 0.22;
    const x = lerp(startX, finalX, drift);
    const y = lerp(vh * 0.08, vh * -0.02, grow);
    const rotate = lerp(-3, 3, drift);
    const opacity = lerp(0, mobile ? 0.72 : 1, clamp(progress / 0.18));

    heroTomo.style.opacity = opacity.toFixed(3);
    heroTomo.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${scale.toFixed(3)}) rotate(${rotate.toFixed(2)}deg)`;
  }

  function scheduleHeroTomo() {
    if (heroRaf) return;
    heroRaf = requestAnimationFrame(setHeroTomo);
  }

  window.addEventListener("scroll", scheduleHeroTomo, { passive: true });
  window.addEventListener("resize", scheduleHeroTomo);
  prefersReducedMotion.addEventListener("change", scheduleHeroTomo);
  setHeroTomo();

  /* Reveal on scroll — rAF + getBoundingClientRect, no IntersectionObserver dependency
     (IO can fail to fire its initial callback in some embedded/mobile contexts,
     which would leave content stuck invisible — this approach always reveals). */
  const revealEls = Array.from(document.querySelectorAll(".reveal"));
  let revealRaf = null;
  function checkReveal() {
    revealRaf = null;
    const vh = window.innerHeight;
    for (let i = revealEls.length - 1; i >= 0; i--) {
      const el = revealEls[i];
      const r = el.getBoundingClientRect();
      if (r.top < vh - 60 && r.bottom > 0) {
        el.classList.add("in");
        revealEls.splice(i, 1);
      }
    }
  }
  function scheduleReveal() {
    if (revealRaf) return;
    revealRaf = requestAnimationFrame(checkReveal);
  }
  window.addEventListener("scroll", scheduleReveal, { passive: true });
  window.addEventListener("resize", scheduleReveal);
  window.addEventListener("load", scheduleReveal);
  checkReveal();

  /* Parallax — translateY based on element's distance from viewport center */
  const parallaxTargets = Array.from(document.querySelectorAll("[data-parallax]"));
  let parallaxOn = true;
  let raf = null;
  function tick() {
    raf = null;
    if (!parallaxOn) return;
    const vh = window.innerHeight;
    for (const el of parallaxTargets) {
      const r = el.getBoundingClientRect();
      const centerOffset = (r.top + r.height / 2) - vh / 2;
      const speed = parseFloat(el.dataset.parallax) || 0.15;
      const y = -centerOffset * speed;
      el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
    }
  }
  function schedule() {
    if (raf) return;
    raf = requestAnimationFrame(tick);
  }
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  tick();

  /* Waitlist forms */
  document.querySelectorAll("[data-waitlist]").forEach((form) => {
    const successEl = document.getElementById(form.dataset.success);
    const source = form.dataset.source || "unknown";
    const btn = form.querySelector("button[type=submit]");
    const originalLabel = btn?.textContent;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = form.querySelector("input[type=email]").value.trim();
      if (!email) return;

      if (btn) { btn.disabled = true; btn.textContent = "Saving…"; }

      try {
        const result = await submitToWaitlist(email, source);
        form.style.display = "none";
        if (successEl) {
          successEl.textContent = result.duplicate
            ? "You're already on the list — we'll be in touch!"
            : "You're on the list. We'll be in touch.";
          successEl.classList.add("show");
        }
      } catch (err) {
        console.error("Waitlist submit failed:", err);
        if (btn) {
          btn.textContent = "Something went wrong — try again";
          setTimeout(() => {
            btn.disabled = false;
            btn.textContent = originalLabel;
          }, 2500);
        }
      }
    });
  });

  /* Expose parallax toggle for Tweaks */
  window.__miotomoParallax = {
    set(on) {
      parallaxOn = !!on;
      if (!on) parallaxTargets.forEach((el) => el.style.transform = "");
      else tick();
    }
  };
})();
