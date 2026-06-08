# 📐 DVDROD.COM Structure Reference

Analyzing exact structure from dvdrod.com/neotaste-quests to replicate.

---

## 🎯 CORE STRUCTURE PATTERN:

```html
<section class="cs-section">
  <div class="cs-section-inner">
    
    <!-- Label (optional) -->
    <div class="cs-section-label">
      RESEARCH · DISCOVERY
    </div>
    
    <!-- Title -->
    <h2 class="cs-section-title">
      Understanding the problem
    </h2>
    
    <!-- Body Text -->
    <div class="cs-section-body">
      <p>Natural flowing text here. Multiple sentences that explain the thinking. Not structured blocks.</p>
      <p>Another paragraph continuing the thought. Human tone, not formulaic.</p>
    </div>
    
  </div>
</section>
```

---

## 📊 WHEN SHOWING DATA:

### **Findings Grid:**
```html
<div class="cs-findings">
  <div class="cs-finding">
    <div class="cs-finding-icon">🔍</div>
    <div class="cs-finding-title">Key Finding</div>
    <div class="cs-finding-text">Description text natural tone</div>
  </div>
  <!-- repeat -->
</div>
```

### **Steps/Process:**
```html
<div class="cs-steps">
  <div class="cs-step">
    <div class="cs-step-num">01</div>
    <div class="cs-step-content">
      <div class="cs-step-title">Step Name</div>
      <div class="cs-step-text">Natural description</div>
    </div>
  </div>
  <!-- repeat -->
</div>
```

---

## 🎨 KEY STYLING:

```css
/* Section */
.cs-section {
  padding: 100px 44px;
  border-top: 1px solid var(--border);
}

/* Label */
.cs-section-label {
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 12px;
}

/* Title */
.cs-section-title {
  font-size: clamp(32px, 4.5vw, 60px);
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1.05;
  margin-bottom: 32px;
  max-width: 760px;
}

/* Body */
.cs-section-body {
  max-width: 640px;
}

.cs-section-body p {
  font-size: 17px;
  line-height: 1.7;
  font-weight: 300;
  color: var(--fg);
  margin-bottom: 20px;
}
```

---

## 💡 TONE DIFFERENCES:

### ❌ AI-style (what we had):
```
Problem: The existing interface was cluttered
Insight: Users need quick scanning
Solution: Created clean hierarchy
```

### ✅ Human-style (dvdrod.com):
```
The existing interface felt cluttered and hard to scan. 
Coaches mentioned it was difficult to quickly find what 
they needed during busy schedules.

I focused on creating clear visual hierarchy so the most 
important information stands out immediately. Gave the 
interface more breathing room with spacious layouts.
```

---

## 🔑 KEY PRINCIPLES:

1. **No structured blocks** - just natural text
2. **Flowing paragraphs** - not Problem/Insight/Solution
3. **Human tone** - "I did X because Y" not "The solution was X"
4. **Visual breaks** - dividers, spacing, not boxes
5. **Simple grids** - when showing data, minimal styling
6. **Real writing** - sounds like person talking

---

## 📝 STRUCTURE FOR INTRAC:

```
SECTION: Design Process
  LABEL: Process
  TITLE: Modernizing the platform
  BODY:
    Para 1: What the challenge was (natural explanation)
    Para 2: How I approached it
    Para 3: Key decisions I made
    
  [Optional: Simple grid for key areas]
  
  Para 4: How I validated
  Para 5: What changed
```

NO cards, NO Problem→Insight→Solution blocks, NO boxes.

Just clean sections with natural text flow.

---

This is the pattern to follow exactly.
