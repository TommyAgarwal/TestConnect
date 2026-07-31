# Test Connect - Design Specification

This document summarizes the visual layout, spacing, typography, colors, and other design elements of the Polo Connect enrollment experience, based on the reference screenshots and live page. This serves as the design system reference for building the mobile-first usability prototype.

---

## 1. Color Palette

*   **Primary Brand Color (Navy Blue):** `#041E3A`. Used for:
    *   Form submit button background
    *   Header texts ("Welcome to", "Sign Up Today")
    *   Logo border and text elements
*   **Primary Text Color:** `#000000`
*   **Secondary Text Color:** `#6E6F72`
*   **Background (Body & Containers):**
    *   **Base page background:** `#F2F3F5`
    *   **Hero backdrop:** Clouds/mountain landscape image (`hero_bg.png`).
*   **Input Fields Background:** `#FFFFFF`
*   **Border / Stroke Colors:**
    *   **Input Borders / Accent strokes:** `#C6C7CB`
    *   **Logo Border:** Thin navy border (`#041E3A`).
*   **Typography Colors:**
    *   **Disclaimers / Legal text:** `#6E6F72`
    *   **Placeholders:** `#6E6F72` (or lighter variation)
    *   **Interactive Links:** `#000000` with underline.

---

## 2. Typography

*   **Font Families:**
    *   **Headers & Titles:** *Oranienbaum* (Serif) to emulate the luxury brand brand aesthetic.
    *   **Inputs, Placeholders, & Disclaimers:** *Schibsted Grotesk* (Sans Serif).
*   **Text Styling:**
    *   **Submit Button:** All-caps bold sans-serif (*Schibsted Grotesk*) with generous letter-spacing (e.g., `letter-spacing: 0.15em` or `2px`).
    *   **Input Placeholders:** Clean sans-serif, standard case (e.g., `* First Name`).
    *   **Legal/Disclaimer Text:** Small font size (e.g., `0.75rem` / `12px`), high line-height for readability (e.g., `line-height: 1.5`).

---

## 3. Spacing & Layout

*   **Mobile Layout (Mobile-First):**
    *   Single-column vertical stack for inputs, legal block, and the CTA button.
    *   Generous vertical spacing (e.g., `margin-bottom: 1.25rem` or `20px` between inputs) to ensure high tap accuracy and reduce visual clutter.
*   **Button & Input Sizing:**
    *   **Inputs:** Large touch target height (e.g., height `50px` to `55px`) with comfortable internal horizontal padding (`15px` to `20px`).
    *   **CTA Button:** Full-width block (on mobile) or matching form width, large height (matching inputs or slightly taller, e.g., `55px`), and centered capitalized text.
*   **Border Radius:**
    *   **Zero Border Radius (`border-radius: 0px`):** Extremely sharp, square corners for both input fields and the CTA button, reinforcing the premium, structured brand look.

---

## 4. Key Interactive Elements & Behavior

*   **Required Fields:** Indicated by a prefix asterisk (`* `), e.g., `* First Name`.
*   **Interactive States (Hover/Focus):**
    *   Input focus should feature a subtle change (e.g., transition to a darker gray `#000000` or primary navy border `#041E3A`) without breaking the clean aesthetic.
    *   Button hover/active states should have a subtle brightness shift (e.g., background color darkening slightly or lowering opacity to `0.9`).
*   **Legal Disclaimer & Links:** Underlined inline links for terms and policies (`Terms of Use`, `Privacy Policy`, `Text Program Terms and Conditions`).

