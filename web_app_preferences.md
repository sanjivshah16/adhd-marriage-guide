# Web Application Design & Development Preferences

> A comprehensive guide documenting design preferences, functional requirements, and development standards for future web application projects.

---

## Table of Contents

1. [General Development Philosophy](#general-development-philosophy)
2. [Content & Data Management](#content--data-management)
3. [User Experience (UX) Requirements](#user-experience-ux-requirements)
4. [Feature Implementation Standards](#feature-implementation-standards)
5. [Performance Optimization](#performance-optimization)
6. [Accessibility & Usability](#accessibility--usability)
7. [Aesthetic Preferences (Customizable)](#aesthetic-preferences-customizable)

---

## General Development Philosophy

### Core Principles

1. **No Login Required**: All user data should be stored locally using `localStorage`. Users should never be required to create an account or log in to access features.

2. **User Control Over Data**: Always provide reset/clear options for any stored data. Users should be able to start fresh at any time.

3. **Offline-First Mentality**: Features should work without requiring server-side storage. Local persistence is preferred.

4. **Progressive Enhancement**: Start with core functionality, then layer on enhanced features (animations, gestures, etc.).

### Data Persistence Standards

```javascript
// Standard localStorage pattern
const useLocalStorage = (key, initialValue) => {
  // Always provide default values
  // Always handle JSON parse errors gracefully
  // Always sync across tabs if needed
};
```

- All user progress, preferences, and saved items must persist across browser sessions
- Provide explicit "Reset" buttons with confirmation dialogs for any persistent data
- Never auto-delete user data without explicit consent

---

## Content & Data Management

### Quiz/Assessment Content

1. **Question Count Accuracy**: If stating "100 questions," ensure exactly 100 questions exist. Verify counts match displayed totals.

2. **Answer Detail Level**: Quiz answer explanations should be comprehensive and educational, not brief. Each explanation should:
   - Explain WHY the correct answer is correct
   - Provide context from source material
   - Be 2-4 sentences minimum

3. **Numbered Lists**: When content includes numbered steps or items (e.g., "6 Steps," "17 Points"):
   - Display as proper sequential numbers (1, 2, 3...) NOT all as "1."
   - Each item on its own line
   - Sub-items as indented bullet points beneath their parent number

4. **Content Depth**: When summarizing source material:
   - Provide double the initial summary count for deeper understanding
   - Expand on each major concept with dedicated sections
   - Include practical applications, not just definitions

### Resource/Reference Sections

1. **Summary Visibility**: Resource summaries must be fully visible, not truncated with "..."
   - Either show full summary at baseline
   - Or show full summary on click/expand
   - Never truncate important content

2. **Naming Conventions**: Use clear, user-friendly section names
   - "Resources" instead of "Research" (more approachable)
   - Avoid academic jargon in navigation

---

## User Experience (UX) Requirements

### Navigation & Interaction

1. **Swipe Gestures** (Mobile):
   - Implement proper horizontal swipe animations
   - Current item slides OFF screen in swipe direction
   - New item slides IN from opposite direction
   - NO tilting or rotation effects
   - Smooth, natural-feeling transitions

2. **Keyboard Navigation**:
   - Arrow keys for sequential navigation (cards, questions)
   - Shortcut keys for common actions (e.g., "F" for favorite)
   - Always document keyboard shortcuts in UI

3. **Touch Targets**: All interactive elements must be easily tappable on mobile (minimum 44x44px)

### Filtering & Organization

1. **Category Filtering**: Any collection of items (cards, questions, resources) should be filterable by category

2. **Multiple Filter Types**: Support combining filters:
   - By category/topic
   - By status (completed, favorites, etc.)
   - By custom criteria

3. **Filter Persistence**: Remember user's last filter selection within a session

### Progress Tracking

1. **Visual Progress Indicators**:
   - Show current position (e.g., "Question 5 of 100")
   - Color-coded status dots/indicators
   - Progress bars where appropriate

2. **Review Capabilities**:
   - Allow users to review all completed items
   - Show correct vs. incorrect answers
   - Provide "Review Mode" for comprehensive overview

3. **Selective Practice**:
   - Option to exclude already-mastered items
   - Focus on items needing improvement
   - "Hide Correct" or similar toggle

### Shuffle & Randomization

1. **Shuffle Button**: Any sequential content (quiz questions, cards) should have a shuffle option
2. **Visual Confirmation**: Provide feedback when shuffle occurs (animation, toast notification)
3. **Shuffle Persistence**: Shuffled order should persist until user reshuffles or resets

---

## Feature Implementation Standards

### Favorites/Bookmarking System

1. **Visual States**:
   - Unfavorited: Outline only (no fill)
   - Favorited: Filled with accent color
   - Clear visual distinction between states

2. **Favorites Filter**: Dedicated button/toggle to show only favorited items

3. **Favorites Count**: Display count of favorited items (e.g., "Favorites (5)")

4. **Persistence**: Favorites must persist in localStorage

### Quiz/Assessment Features

Required features for any quiz implementation:

| Feature | Description |
|---------|-------------|
| Shuffle | Randomize question order |
| Progress Tracker | Track correct/incorrect/remaining |
| Review Mode | View all questions on single page |
| Filter by Status | Show only correct/incorrect/unanswered |
| Filter by Category | Filter questions by topic |
| Reset Button | Clear all progress with confirmation |
| Hide Mastered | Option to exclude correctly answered questions |
| Detailed Explanations | Comprehensive answer explanations |

### Card/Flashcard Features

Required features for card-based content:

| Feature | Description |
|---------|-------------|
| Single Card View | One card at a time with navigation |
| Grid View | Overview of all cards |
| Swipe Navigation | Mobile-friendly gesture navigation |
| Keyboard Navigation | Arrow keys + shortcuts |
| Favorites | Bookmark important cards |
| Category Filter | Filter by topic/category |
| Progress Dots | Visual indicator of position |

### View Modes

1. **Single/Card View**: Focused view of one item at a time
2. **Grid View**: Overview showing multiple items
3. **Review/List View**: Comprehensive scrollable list
4. **Toggle Between Views**: Easy switching with clear UI buttons

---

## Performance Optimization

### Image Optimization

1. **File Format**: Use WebP format for all images (99% smaller than PNG)
   - Convert all PNG/JPG to WebP
   - Maintain visual quality at 80-85% compression

2. **Target File Sizes**:
   - Hero images: ~40-100KB (not 4-5MB)
   - Card/thumbnail images: ~30-60KB
   - Total page images: Under 5MB ideally

3. **Lazy Loading**:
   - First 6 items: Load immediately (`loading="eager"`)
   - Remaining items: Lazy load (`loading="lazy"`)
   - Use native browser lazy loading, not complex custom implementations

4. **Image Preloading** (for sequential content):
   - Preload next 2 items in sequence
   - Preload previous 2 items in sequence
   - Use simple `new Image()` preloading

### Loading States

1. **Skeleton Placeholders**: Show animated placeholder while content loads
2. **Smooth Transitions**: Fade in content when loaded
3. **No Layout Shift**: Reserve space for images to prevent jumping

### Simplicity Over Complexity

> **Important**: When performance degrades, simplify the implementation. Native browser features often outperform custom JavaScript solutions.

- Prefer native `loading="lazy"` over custom intersection observers
- Prefer CSS animations over JavaScript animations
- Prefer simple `<img>` tags over complex wrapper components
- Remove abstraction layers that don't add clear value

---

## Accessibility & Usability

### Dark Mode

1. **Toggle Location**: Visible in main navigation (sun/moon icon)
2. **Persistence**: Remember user's theme preference in localStorage
3. **System Preference**: Optionally respect `prefers-color-scheme`
4. **Smooth Transition**: Animate theme changes

### Responsive Design

1. **Mobile-First**: Design for mobile, enhance for desktop
2. **Touch-Friendly**: Large tap targets, swipe gestures
3. **Readable Text**: Minimum 16px body text on mobile

### Visual Feedback

1. **Interactive States**: Clear hover, active, and focus states
2. **Action Confirmation**: Toast notifications for user actions
3. **Error States**: Clear error messages with recovery options

---

## Aesthetic Preferences (Customizable)

> **Note**: This section contains specific aesthetic choices that can be modified for different projects while keeping the functional requirements above.

### Current Theme: Tulum/Japandi Boho

#### Color Palette

```css
/* Primary Colors */
--color-cream: #F5F1E8;           /* Background, light text */
--color-warm-sand: #E8E0D5;       /* Secondary background */
--color-sage-green: #5E6F5B;      /* Accent, category pills */
--color-terra-cotta: #C07A5A;     /* Warm accent, highlights */
--color-deep-brown: #3D3229;      /* Dark text, headers */

/* Functional Colors */
--color-success: #5E6F5B;         /* Correct answers, positive */
--color-error: #C07A5A;           /* Incorrect, warnings */
--color-muted: #8B7355;           /* Secondary text */

/* Dark Mode Variants */
--dark-background: #1A1612;       /* Dark mode background */
--dark-card: #2A2420;             /* Dark mode cards */
--dark-text: #E8E0D5;             /* Dark mode text */
```

#### Typography

```css
/* Font Families */
--font-heading: 'Playfair Display', serif;  /* Headings, titles */
--font-body: 'Lato', sans-serif;            /* Body text, UI */

/* Font Weights */
--weight-normal: 400;
--weight-medium: 500;
--weight-semibold: 600;
--weight-bold: 700;

/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
```

#### Google Fonts Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Lato:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
```

#### UI Component Styling

**Category Pills/Tags**:
```css
.category-pill {
  background-color: #5E6F5B;  /* Sage green */
  color: #F5F1E8;             /* Cream text */
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;      /* Fully rounded */
  font-size: 0.75rem;
  font-weight: 500;
}
```

**Favorite/Heart Button**:
```css
.favorite-button {
  background-color: #5E6F5B;  /* Sage green background */
}

.favorite-icon-unfilled {
  stroke: #F5F1E8;            /* Cream outline */
  fill: transparent;
}

.favorite-icon-filled {
  fill: #F5F1E8;              /* Cream fill when favorited */
  stroke: #F5F1E8;
}
```

**Cards**:
```css
.card {
  background: linear-gradient(to bottom right, #F5F1E8, #E8E0D5);
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

**Buttons**:
```css
.button-primary {
  background-color: #5E6F5B;
  color: #F5F1E8;
  border-radius: 0.5rem;
}

.button-secondary {
  background-color: transparent;
  border: 1px solid #5E6F5B;
  color: #5E6F5B;
}
```

#### Design Principles for This Theme

1. **Earthy & Natural**: Use organic shapes, natural textures, warm earth tones
2. **Minimalist**: Clean layouts, generous whitespace, no visual clutter
3. **Warm & Inviting**: Avoid cold blues/grays; prefer warm neutrals
4. **Elegant Typography**: Serif headings for sophistication, sans-serif body for readability
5. **Subtle Animations**: Gentle transitions, no jarring movements
6. **Textured Backgrounds**: Subtle grain or texture, not flat solid colors

#### Colors to AVOID

- Bright cyan/turquoise (#00FFFF, #40E0D0) - Too jarring for this aesthetic
- Pure white (#FFFFFF) - Too stark; use cream instead
- Pure black (#000000) - Too harsh; use deep brown instead
- Neon or saturated colors - Clash with natural palette
- Cool grays - Conflict with warm earth tones

#### Animation Guidelines

```css
/* Standard transition */
transition: all 0.3s ease;

/* Card hover */
transform: translateY(-4px);
box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15);

/* Swipe animation duration */
animation-duration: 0.4s;

/* Fade in */
animation: fadeIn 0.3s ease-out;
```

---

## Quick Reference Checklist

### Before Delivery, Verify:

- [ ] All counts match (e.g., "100 questions" = exactly 100)
- [ ] Numbered lists show sequential numbers (1, 2, 3...)
- [ ] Images are optimized (WebP, under 100KB each)
- [ ] Swipe gestures use horizontal slide animation
- [ ] Favorites use correct colors (outline unfilled, filled when active)
- [ ] Category pills use sage green (#5E6F5B) with cream text (#F5F1E8)
- [ ] Dark mode toggle is present and functional
- [ ] All filters work (category, status, favorites)
- [ ] Reset buttons exist for persistent data
- [ ] Keyboard navigation works
- [ ] Resource summaries are fully visible (not truncated)
- [ ] Answer explanations are detailed and educational

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | January 2026 | Initial preferences document based on ADHD Marriage Guide project |

---

*This document should be updated as new preferences are established in future projects.*
