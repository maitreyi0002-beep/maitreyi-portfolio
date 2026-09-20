// Progressive enhancement: all portfolio content and links work without JavaScript.
const root = document.documentElement;
const themeButton = document.querySelector("#theme-toggle");
const announcement = document.querySelector("#announcement");

// Clicking a link, button, or the contents toggle plays a short recorded click —
// meaningful interactions only, not every incidental click on the page. This
// script loads at varying folder depths (homepage, case study, both agent
// routes), so the asset path is resolved against this script's own URL rather
// than the page's, which would otherwise break on every page except the homepage.
const clickSound = new Audio(
  new URL("assets/audio/click.mp3", document.currentScript?.src || location.href).href,
);
clickSound.preload = "auto";
clickSound.addEventListener("error", () =>
  console.warn("Click sound failed to load or decode:", clickSound.src, clickSound.error),
);
const playClickSound = () => {
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {
    /* Browsers refuse audio before any interaction; the very click that would
       start it is itself the required gesture, so this only fails in edge cases. */
  });
};
// A link that navigates away in the same tab unloads the page (and its audio)
// almost immediately, before a sub-second clip is ever audible. Only an in-page
// anchor, a new-tab link, or an unmodified click that a browser would otherwise
// handle specially (new tab/window) is exempt from the short delay below.
const NAVIGATION_SOUND_DELAY_MS = 150;
const navigatesAway = (link) => {
  if (!link.href || (link.target && link.target !== "_self")) return false;
  let url;
  try {
    url = new URL(link.href, location.href);
  } catch {
    return false;
  }
  return url.origin !== location.origin || url.pathname !== location.pathname;
};
document.addEventListener("click", (event) => {
  const target = event.target.closest("a, button, summary");
  if (!target) return;
  const link = target.tagName === "A" ? target : null;
  const isPlainClick =
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey;
  if (!event.defaultPrevented && link && isPlainClick && navigatesAway(link)) {
    event.preventDefault();
    playClickSound();
    setTimeout(() => {
      location.href = link.href;
    }, NAVIGATION_SOUND_DELAY_MS);
    return;
  }
  playClickSound();
});
const getPreference = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};
const setPreference = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Private storage is optional. */
  }
};
const systemTheme = matchMedia("(prefers-color-scheme: dark)");
const setTheme = (theme) => {
  root.dataset.theme = theme;
  if (themeButton) {
    themeButton.setAttribute(
      "aria-label",
      `Switch to ${theme === "dark" ? "light" : "dark"} theme`,
    );
    if (themeButton.getAttribute("role") === "switch") {
      themeButton.setAttribute("aria-label", "Dark theme");
      themeButton.setAttribute("aria-checked", String(theme === "dark"));
    }
    themeButton.title = themeButton.getAttribute("aria-label");
  }
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "dark" ? "#191919" : "#fafafa");
};
setTheme(
  getPreference("maitreyi-theme") || (systemTheme.matches ? "dark" : "light"),
);
// The incoming theme is revealed by a circle growing from the switch to the far corner.
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
themeButton?.addEventListener("click", (event) => {
  const theme = root.dataset.theme === "dark" ? "light" : "dark";
  const commit = () => {
    setTheme(theme);
    setPreference("maitreyi-theme", theme);
  };
  if (!document.startViewTransition || reducedMotion.matches) return commit();
  // A real pointer click anchors on the exact point clicked, matching the
  // toggle's visible position precisely. Keyboard/programmatic activation has
  // no meaningful pointer position (browsers report 0,0), so fall back to the
  // toggle's own center in that case.
  let x, y;
  if (event.detail === 0) {
    const box = themeButton.getBoundingClientRect();
    x = box.left + box.width / 2;
    y = box.top + box.height / 2;
  } else {
    x = event.clientX;
    y = event.clientY;
  }
  const radius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  );
  document
    .startViewTransition(commit)
    .ready.then(() =>
      root.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 520,
          easing: "cubic-bezier(.32,.72,.35,1)",
          pseudoElement: "::view-transition-new(root)",
        },
      ),
    )
    .catch(() => {
      /* A skipped transition still leaves the theme applied. */
    });
});
systemTheme.addEventListener("change", (event) => {
  if (!getPreference("maitreyi-theme"))
    setTheme(event.matches ? "dark" : "light");
});

// A new mark replaces the face. Replay switches between identical draw animations.
const logo = document.querySelector("#logo-mark");
logo?.addEventListener("click", () => logo.classList.toggle("replay"));

// Hover-triggered sounds need priming: hover is not a user gesture, so browsers
// block their first play() until the page has seen a real click or keypress.
// This wraps an Audio element with a play() that resets to the start each time,
// and registers it to be silently primed on that first real interaction.
const audiosToPrime = [];
const makeHoverSound = (file) => {
  const audio = new Audio(
    new URL(`assets/audio/${file}`, document.currentScript?.src || location.href).href,
  );
  audio.preload = "auto";
  audio.addEventListener("error", () =>
    console.warn(`${file} failed to load or decode:`, audio.src, audio.error),
  );
  audiosToPrime.push(audio);
  return () => {
    audio.currentTime = 0;
    audio.play().catch(() => {
      /* Browsers refuse audio until the visitor has interacted; fail silently. */
    });
  };
};
const primeAudios = () => {
  audiosToPrime.forEach((audio) => {
    audio
      .play()
      .then(() => {
        audio.pause();
        audio.currentTime = 0;
      })
      .catch(() => {
        /* Priming can fail silently; the next real hover will just try again. */
      });
  });
};
document.addEventListener("pointerdown", primeAudios, { once: true });
document.addEventListener("keydown", primeAudios, { once: true });
// Entering a Selected Work row, by pointer or keyboard focus, plays a short
// recording.
const playHoverSound = makeHoverSound("bubble.mp3");
// Entering a footer contact link, by pointer or keyboard focus, plays another.
const playLinkHoverSound = makeHoverSound("hover.mp3");

// Entering the footer water plays a single drop sound at full volume
// immediately (a fade-in would blunt its transient onset) — once per entry,
// not repeated for as long as the visitor keeps interacting with the water.
// Leaving before it finishes fades it out rather than cutting it off.
const waterSurface = document.querySelector(".water-surface");
if (waterSurface) {
  const WATER_FADE_OUT_MS = 400;
  const waterSound = new Audio(
    new URL("assets/audio/drop.mp3", document.currentScript?.src || location.href).href,
  );
  waterSound.preload = "auto";
  waterSound.addEventListener("error", () =>
    console.warn("Water sound failed to load or decode:", waterSound.src, waterSound.error),
  );
  audiosToPrime.push(waterSound);
  let waterFadeFrame = 0;
  const enterWater = () => {
    cancelAnimationFrame(waterFadeFrame);
    waterSound.volume = 1;
    if (!waterSound.paused) return; // Already playing (e.g. re-entering mid fade-out).
    waterSound.currentTime = 0;
    waterSound.play().catch(() => {
      /* Browsers refuse audio until the visitor has interacted; fail silently. */
    });
  };
  const leaveWater = () => {
    if (waterSound.paused) return;
    cancelAnimationFrame(waterFadeFrame);
    const start = performance.now();
    const from = waterSound.volume;
    const step = (now) => {
      const progress = Math.min((now - start) / WATER_FADE_OUT_MS, 1);
      waterSound.volume = from * (1 - progress);
      if (progress < 1) {
        waterFadeFrame = requestAnimationFrame(step);
      } else {
        waterSound.pause();
        waterSound.currentTime = 0;
      }
    };
    waterFadeFrame = requestAnimationFrame(step);
  };
  waterSurface.addEventListener("pointerenter", (event) => {
    if (event.pointerType !== "touch") enterWater();
  });
  waterSurface.addEventListener("pointerleave", (event) => {
    if (event.pointerType !== "touch") leaveWater();
  });
  waterSurface.addEventListener("focus", enterWater);
  waterSurface.addEventListener("blur", leaveWater);
}

// Wide, fine-pointer screens use peripheral previews; touch keeps direct case-study links.
const widePreview = matchMedia("(min-width:1101px) and (hover:hover)");
const projects = [...document.querySelectorAll("[data-project]")];
let hoveredProject = null;
let focusedProject = null;
const syncPreview = () => {
  const project = widePreview.matches && (hoveredProject || focusedProject);
  if (project) root.dataset.preview = project.dataset.project;
  else delete root.dataset.preview;
};
projects.forEach((project) => {
  project.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "touch") return;
    hoveredProject = project;
    syncPreview();
    playHoverSound();
  });
  project.addEventListener("pointerleave", () => {
    hoveredProject = null;
    syncPreview();
  });
  project.addEventListener("focusin", () => {
    focusedProject = project;
    syncPreview();
    playHoverSound();
  });
  project.addEventListener("focusout", (event) => {
    if (!project.contains(event.relatedTarget)) {
      focusedProject = null;
      syncPreview();
    }
  });

});
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  hoveredProject = focusedProject = null;
  syncPreview();

});
widePreview.addEventListener("change", () => {
  hoveredProject = focusedProject = null;
  syncPreview();
});
window.addEventListener("blur", () => {
  hoveredProject = focusedProject = null;
  syncPreview();
});
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) =>
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        if (hoveredProject === entry.target) hoveredProject = null;
        if (focusedProject === entry.target) focusedProject = null;
        syncPreview();
      }
    }),
  );
  projects.forEach((project) => observer.observe(project));
}
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
document
  .querySelector("#copy-profile")
  ?.addEventListener("click", async (event) => {
    const button = event.currentTarget;
    try {
      await navigator.clipboard.writeText(
        document.querySelector("#profile-text").textContent,
      );
      button.textContent = "Copied";
      if (announcement) announcement.textContent = "Portfolio summary copied.";
      setTimeout(() => (button.textContent = "Copy summary"), 2000);
    } catch {
      button.textContent = "Select text to copy";
      document.querySelector("#profile-text").hidden = false;
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(document.querySelector("#profile-text"));
      selection.removeAllRanges();
      selection.addRange(range);
      if (announcement)
        announcement.textContent =
          "Automatic copy is unavailable. The summary is selected for you to copy.";
    }
  });

document.querySelectorAll(".click-word, .contact-links a").forEach((link) => {
  const wave = link.querySelector(".wave-underline");
  const animate = () => {
    wave.getAnimations().forEach((animation) => animation.cancel());
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      wave.animate([{ backgroundPositionX: "0px" }, { backgroundPositionX: "-16px" }], {
        duration: 260, iterations: 3, easing: "linear"
      });
    }
  };
  link.addEventListener("click", animate);
  if (link.matches(".contact-links a")) {
    link.addEventListener("pointerenter", (event) => {
      animate();
      if (event.pointerType !== "touch") playLinkHoverSound();
    });
    link.addEventListener("focus", animate);
    link.addEventListener("focus", playLinkHoverSound);
  }
});
