# Smart Cooling Roof — VS Code la Run Panna

## Setup steps (VS Code terminal la run pannunga):

1. **Node.js install irukanum** (illana https://nodejs.org la download pannunga, LTS version)

2. Intha folder ah VS Code la open pannunga:
   ```
   code smart-cooling-roof
   ```

3. VS Code terminal open pannunga (`Ctrl + \`` ) and dependencies install pannunga:
   ```
   npm install
   ```

4. App run pannunga:
   ```
   npm run dev
   ```

5. Terminal la oru local URL varum (`http://localhost:5173`) — adha Ctrl+click pannunga, browser la app open aagum.

## Folder structure
```
smart-cooling-roof/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx      (React entry point)
    └── App.jsx        (unga original component — mari onnum illa)
```

## Note
- Unga original file content App.jsx la athே pōla vechirukken, edit onnum pannala.
- `npm run build` pannina production build kedaikum (`dist/` folder la).
