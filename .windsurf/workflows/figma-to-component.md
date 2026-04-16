---
description: Integrate a Figma design into the aipramgram (EduHub) website
---

# Figma → EduHub Component Workflow

## Prerequisites
- Figma MCP server connected (add Figma API key to your MCP config)
- Component published to Figma team library
- Figma URL must include `node-id` query param
- Run `npm install` in `C:\Users\Ayush Tripathi\CascadeProjects\aipramgram`

## Step 1: Extract Figma URL parameters
Parse the URL:
```
https://www.figma.com/design/{fileKey}/{name}?node-id={nodeId}
```
- `fileKey` = segment after `/design/`
- `nodeId` = value of `node-id` param (replace `-` with `:`)

## Step 2: Discover unmapped components
Call MCP tool `get_code_connect_suggestions`:
- `fileKey`: from Step 1
- `nodeId`: from Step 1 (colon format)
- `excludeMappingPrompt`: true

## Step 3: Fetch component properties
Call MCP tool `get_context_for_code_connect`:
- `fileKey`: from Step 1
- `nodeId`: resolved `mainComponentNodeId` from Step 2
- `clientFrameworks`: ["react"]
- `clientLanguages`: ["javascript"]

## Step 4: Map to EduHub design tokens
EduHub uses CSS custom properties defined in `src/index.css`:
```css
--bg-deep:        #020617   /* Slate 950 background */
--accent-primary: #7C3AED   /* Violet 600 — primary CTA / glow */
--accent-serif:   #A5B4FC   /* Indigo 200 — labels / captions */
--text-muted:     #94A3B8   /* Slate 400 */
--glass-bg:       rgba(15,23,42,0.6)
--border-light:   rgba(255,255,255,0.1)
--font-display:   'Clash Display'  /* headings */
--font-body:      'Satoshi'        /* body text */
--font-mono:      'JetBrains Mono' /* code / data */
```

CSS utility classes available:
- `.glass` — glassmorphism panel
- `.neo-depth` — hover-lift card
- `.section-title` — large display heading
- `.clash` / `.serif` / `.mono` — font shortcuts
- `.glow-text` — text glow effect

## Step 5: Create the component
// turbo
Create a new file in `src/components/YourComponent.jsx` following the pattern:
```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../AppContext';

export default function YourComponent({ ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="neo-depth p-8 border border-white/5 bg-white/5 backdrop-blur-md"
    >
      {/* component content */}
    </motion.div>
  );
}
```

## Step 6: Add to a page
Import and render in the appropriate page under `src/pages/`.

## Step 7: Verify locally
// turbo
Run `npm run dev` in `C:\Users\Ayush Tripathi\CascadeProjects\aipramgram` and open http://localhost:5173

## Step 8: Deploy to Vercel
Commit and push to `main` branch — Vercel auto-deploys to https://aipramgram.vercel.app/

## Design System Reference

### Framer Motion Configs (copy-paste)
```js
const springFast   = { type:"spring", stiffness:400, damping:30 };
const springSmooth = { type:"spring", stiffness:100, damping:20 };
const fadeInUp     = { hidden:{opacity:0,y:30}, visible:{opacity:1,y:0,transition:springFast} };
```

### Standard hover card
```jsx
<motion.div
  whileHover={{ y:-8, borderColor:'var(--accent-primary)' }}
  className="neo-depth p-8 border border-white/5"
>
```

### Glass panel
```jsx
<div className="glass rounded-2xl p-6">
```

### Accent button
```jsx
<motion.button
  whileHover={{ scale:1.05, backgroundColor:'var(--accent-primary)' }}
  className="px-8 py-4 border border-white/20 bg-white/5 text-white font-bold text-[12px] tracking-[0.2em] uppercase"
>
  ACTION
</motion.button>
```
