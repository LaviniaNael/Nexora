type SplitType = "chars" | "words" | "lines";

type SplitResult = {
  elements: HTMLElement[];
  revert: () => void;
};

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/**
 * Lightweight alternative to GSAP SplitText (paid plugin).
 * It replaces the element's contents with spans and returns the created elements + revert().
 *
 * Note: "lines" is best-effort via <br/> and block wrappers; if the content wraps via CSS,
 * you likely want "words" or "chars" for deterministic results.
 */
export function splitText(target: HTMLElement, type: SplitType = "chars"): SplitResult {
  const originalHtml = target.innerHTML;
  const originalAria = target.getAttribute("aria-label");

  const raw = target.textContent ?? "";
  const text = raw.replace(/\s+/g, " ").trim();

  // Preserve readable label for screen readers after splitting.
  if (!originalAria) target.setAttribute("aria-label", text);

  let html = "";

  if (type === "words") {
    const words = text.length ? text.split(" ") : [];
    html = words
      .map((w, i) => {
        const space = i === words.length - 1 ? "" : " ";
        return `<span class="split-word" style="display:inline-block;white-space:pre">${escapeHtml(
          w + space,
        )}</span>`;
      })
      .join("");
  } else if (type === "lines") {
    const lines = text.length ? text.split(/\n+/) : [];
    html = lines
      .map(
        (line) =>
          `<span class="split-line" style="display:block;overflow:hidden"><span style="display:inline-block">${escapeHtml(
            line,
          )}</span></span>`,
      )
      .join("");
  } else {
    // chars
    html = Array.from(text)
      .map((ch) => {
        if (ch === " ") {
          return `<span class="split-char" style="display:inline-block;white-space:pre">&nbsp;</span>`;
        }
        return `<span class="split-char" style="display:inline-block">${escapeHtml(ch)}</span>`;
      })
      .join("");
  }

  target.innerHTML = html;

  const selector =
    type === "words" ? ".split-word" : type === "lines" ? ".split-line > span" : ".split-char";
  const elements = Array.from(target.querySelectorAll<HTMLElement>(selector));

  return {
    elements,
    revert: () => {
      target.innerHTML = originalHtml;
      if (originalAria) target.setAttribute("aria-label", originalAria);
      else target.removeAttribute("aria-label");
    },
  };
}

