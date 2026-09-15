// Progressive enhancement: all portfolio content and links work without JavaScript.
const root = document.documentElement;
const themeButton = document.querySelector("#theme-toggle");
const soundButton = document.querySelector("#sound-toggle");
const announcement = document.querySelector("#announcement");
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
    themeButton.title = themeButton.getAttribute("aria-label");
  }
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "dark" ? "#191919" : "#fafafa");
};
setTheme(
  getPreference("maitreyi-theme") || (systemTheme.matches ? "dark" : "light"),
);
themeButton?.addEventListener("click", () => {
  const theme = root.dataset.theme === "dark" ? "light" : "dark";
  setTheme(theme);
  setPreference("maitreyi-theme", theme);
});
systemTheme.addEventListener("change", (event) => {
  if (!getPreference("maitreyi-theme"))
    setTheme(event.matches ? "dark" : "light");
});

// Short, low-volume tactile tones are synthesized locally. No audio downloads or tracking.
let soundEnabled = getPreference("maitreyi-sound") === "on";
let audioContext;
let lastTone = 0;
const syncSound = () => {
  soundButton?.setAttribute("aria-pressed", String(soundEnabled));
  soundButton?.setAttribute(
    "aria-label",
    soundEnabled ? "Mute interaction sounds" : "Enable interaction sounds",
  );
  if (soundButton) soundButton.title = soundEnabled ? "Sound on" : "Sound off";
};
async function playTone(kind = "tap") {
  if (!soundEnabled || performance.now() - lastTone < 90) return;
  const AudioConstructor = window.AudioContext || window.webkitAudioContext;
  if (!AudioConstructor) return;
  try {
    audioContext ||= new AudioConstructor();
    if (audioContext.state === "suspended") await audioContext.resume();
    lastTone = performance.now();
    const time = audioContext.currentTime;
    const oscillator = audioContext.createOscillator();
    const envelope = audioContext.createGain();
    oscillator.type = "sine";
    const pitch = kind === "hello" ? 620 : kind === "hover" ? 390 : 470;
    oscillator.frequency.setValueAtTime(pitch, time);
    oscillator.frequency.exponentialRampToValueAtTime(
      pitch * 0.45,
      time + 0.09,
    );
    envelope.gain.setValueAtTime(0, time);
    envelope.gain.linearRampToValueAtTime(
      kind === "hover" ? 0.018 : 0.04,
      time + 0.004,
    );
    envelope.gain.exponentialRampToValueAtTime(0.0001, time + 0.12);
    oscillator.connect(envelope);
    envelope.connect(audioContext.destination);
    oscillator.start(time);
    oscillator.stop(time + 0.14);
    oscillator.onended = () => {
      oscillator.disconnect();
      envelope.disconnect();
    };
  } catch {
    /* Audio must never interrupt navigation. */
  }
}
syncSound();
soundButton?.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  syncSound();
  setPreference("maitreyi-sound", soundEnabled ? "on" : "off");
  if (announcement)
    announcement.textContent = soundEnabled
      ? "Interaction sounds on"
      : "Interaction sounds off";
  if (soundEnabled) playTone();
});
document.addEventListener("click", (event) => {
  if (
    event.target.closest("a,button") &&
    !event.target.closest("#sound-toggle,#logo-mark")
  )
    playTone();
});
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

const clickWord = document.querySelector(".click-word");
clickWord?.addEventListener("click", () => {
  const path = clickWord.querySelector("path");
  path.getAnimations().forEach((animation) => animation.cancel());
  clickWord.classList.add("is-drawn");
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    path.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], {
      duration: 600, easing: "ease-out", fill: "both"
    });
  }
});
