// Progressive enhancement: all portfolio content and links work without JavaScript.
const root = document.documentElement;
const themeButton = document.querySelector("#theme-toggle");
const announcement = document.querySelector("#announcement");

// Every click across the site plays a short recorded click. This script loads at
// varying folder depths (homepage, case study, both agent routes), so the asset
// path is resolved against this script's own URL rather than the page's, which
// would otherwise break on every page except the homepage.
const clickSound = new Audio(
  new URL("assets/audio/click.mp3", document.currentScript?.src || location.href).href,
);
clickSound.preload = "auto";
clickSound.addEventListener("error", () =>
  console.warn("Click sound failed to load or decode:", clickSound.src, clickSound.error),
);
document.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {
    /* Browsers refuse audio before any interaction; the very click that would
       start it is itself the required gesture, so this only fails in edge cases. */
  });
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
themeButton?.addEventListener("click", () => {
  const theme = root.dataset.theme === "dark" ? "light" : "dark";
  const commit = () => {
    setTheme(theme);
    setPreference("maitreyi-theme", theme);
  };
  if (!document.startViewTransition || reducedMotion.matches) return commit();
  const box = themeButton.getBoundingClientRect();
  const x = box.left + box.width / 2;
  const y = box.top + box.height / 2;
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

// Hovering the cherry blossom header plays a supplied recording. Leaving partway
// through does not cut it off, but it does not run to the clip's full five seconds
// either: it keeps going for up to two more seconds, then fades out over 250ms
// so the cutoff never pops. Escape stops it immediately, keeping a keyboard-reachable
// way to silence sound that plays longer than a few seconds.
const canopy = document.querySelector(".blossom-canopy[data-audio]");
if (canopy) {
  const LEAVE_GRACE_MS = 2000;
  const FADE_MS = 250;
  let ambient;
  let leaveTimer = 0;
  let fadeFrame = 0;
  const cancelLeaveFade = () => {
    clearTimeout(leaveTimer);
    cancelAnimationFrame(fadeFrame);
  };
  const getAmbient = () => {
    if (!ambient) {
      ambient = new Audio(canopy.dataset.audio);
      ambient.preload = "auto";
      ambient.addEventListener("ended", () => {
        cancelLeaveFade();
        ambient.currentTime = 0;
        ambient.volume = 1;
      });
      // Surfaced only in the console: playback failure must never break the page.
      ambient.addEventListener("error", () =>
        console.warn(
          "Cherry blossom audio failed to load or decode:",
          canopy.dataset.audio,
          ambient.error,
        ),
      );
    }
    return ambient;
  };
  const fadeOutAndStop = () => {
    const audio = ambient;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / FADE_MS, 1);
      audio.volume = 1 - progress;
      if (progress < 1) {
        fadeFrame = requestAnimationFrame(step);
      } else {
        audio.pause();
        audio.currentTime = 0;
        audio.volume = 1;
      }
    };
    fadeFrame = requestAnimationFrame(step);
  };
  // Safari and Chrome both require a real user gesture before the first play().
  // A hover is never a gesture, so the very first click/keypress on the page primes
  // playback once here; every later hover then plays without re-asking permission.
  const unlockAmbient = () => {
    const audio = getAmbient();
    audio
      .play()
      .then(() => {
        audio.pause();
        audio.currentTime = 0;
      })
      .catch(() => {
        /* Priming can fail silently; the next real hover will just try again. */
      });
  };
  document.addEventListener("pointerdown", unlockAmbient, { once: true });
  document.addEventListener("keydown", unlockAmbient, { once: true });
  canopy.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "touch") return;
    const audio = getAmbient();
    cancelLeaveFade();
    audio.volume = 1;
    if (!audio.paused) return; // Already mid-clip: let it continue rather than restart.
    audio.currentTime = 0;
    audio.play().catch(() => {
      /* Browsers refuse audio until the visitor has interacted; fail silently. */
    });
  });
  canopy.addEventListener("pointerleave", (event) => {
    if (event.pointerType === "touch" || !ambient || ambient.paused) return;
    cancelLeaveFade();
    leaveTimer = setTimeout(fadeOutAndStop, LEAVE_GRACE_MS - FADE_MS);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && ambient && !ambient.paused) {
      cancelLeaveFade();
      ambient.pause();
      ambient.currentTime = 0;
      ambient.volume = 1;
    }
  });
}

// A new mark replaces the face. Replay switches between identical draw animations.
const logo = document.querySelector("#logo-mark");
logo?.addEventListener("click", () => logo.classList.toggle("replay"));

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
  });
  project.addEventListener("pointerleave", () => {
    hoveredProject = null;
    syncPreview();
  });
  project.addEventListener("focusin", () => {
    focusedProject = project;
    syncPreview();
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
    link.addEventListener("pointerenter", animate);
    link.addEventListener("focus", animate);
  }
});
