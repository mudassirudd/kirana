# TypeScript Migration Plan for Kirana Project

## Overview
Add TypeScript support to both frontend (React + Vite) and backend (Express + MongoDB) with gradual migration capability. JS and TS files will coexist, allowing you to migrate one file at a time.

---

## Phase 1: Frontend TypeScript Setup

### 1.1 Install Dependencies
```bash
cd frontend
npm install --save-dev typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### 1.2 Create frontend/tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowJs": true,
    "checkJs": false,
    "jsx": "react-jsx",
    "strict": false,
    "noImplicitAny": false,
    "noEmit": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

**Key settings for gradual migration:**
- `allowJs: true` - JS and TS coexist
- `strict: false` - Start relaxed, tighten as you learn
- `noImplicitAny: false` - Won't force you to type everything immediately

### 1.3 Update frontend/eslint.config.js
Add TypeScript parser and plugin support for `.ts` and `.tsx` files alongside existing JS config.

### 1.4 Add typecheck script to frontend/package.json
```json
"scripts": {
  "typecheck": "tsc --noEmit"
}
```

---

## Phase 2: Backend TypeScript Setup

### 2.1 Install Dependencies
```bash
cd backend
npm install --save-dev typescript @types/node @types/express @types/cors @types/bcryptjs @types/jsonwebtoken tsx
```

Note: Mongoose 9 has built-in TypeScript types.

### 2.2 Create backend/tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowJs": true,
    "checkJs": false,
    "strict": false,
    "noImplicitAny": false,
    "outDir": "./dist",
    "rootDir": ".",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "types": ["node"]
  },
  "include": ["./**/*.ts", "./**/*.js"],
  "exclude": ["node_modules", "dist"]
}
```

### 2.3 Update backend/package.json scripts
```json
"scripts": {
  "start": "tsx watch server.js",
  "build": "tsc",
  "start:prod": "node dist/server.js"
}
```

`tsx` runs both JS and TS files seamlessly, enabling gradual migration.

---

## Phase 3: Recommended Migration Order

### Frontend (Start Here - Easiest)
| Order | File | Why Start Here |
|-------|------|----------------|
| 1 | `src/hooks/useAuth.js` → `.ts` | Simplest, 6 lines |
| 2 | `src/hooks/useCart.js` → `.ts` | Same pattern |
| 3 | `src/components/ProductCard.jsx` → `.tsx` | Simple props |
| 4 | `src/components/AdminRoute.jsx` → `.tsx` | Wrapper component |
| 5 | `src/components/ProtectedRoute.jsx` → `.tsx` | Wrapper component |
| 6 | `src/context/CartContext.jsx` → `.tsx` | Good TS practice |
| 7 | `src/context/AuthContext.jsx` → `.tsx` | Has async logic |
| 8 | Pages (any order) → `.tsx` | Similar patterns |
| 9 | `src/App.jsx` → `.tsx` | After components |
| 10 | `src/main.jsx` → `.tsx` | Last (update index.html) |

### Backend
| Order | File | Why |
|-------|------|-----|
| 1-3 | `models/*.js` → `.ts` | Mongoose has great TS support |
| 4 | `config/db.js` → `.ts` | Simple connection |
| 5-6 | `middlewares/*.js` → `.ts` | Express types |
| 7+ | Controllers, Routes | After models |
| Last | `server.js` → `.ts` | After all imports |

---

## Files to Create/Modify

| File | Action |
|------|--------|
| `frontend/tsconfig.json` | Create |
| `frontend/eslint.config.js` | Modify |
| `frontend/package.json` | Modify (add script) |
| `backend/tsconfig.json` | Create |
| `backend/package.json` | Modify (deps + scripts) |

---

## Verification Steps

1. **After frontend setup:**
   ```bash
   cd frontend && npm run dev
   ```
   Verify app runs normally with existing JS files.

2. **After backend setup:**
   ```bash
   cd backend && npm start
   ```
   Verify server starts and API works.

3. **After first file migration:**
   - Rename `frontend/src/hooks/useAuth.js` to `useAuth.ts`
   - Run `npm run dev` - should work without changes
   - Run `npm run typecheck` - verify no errors

4. **Test full stack:**
   - Login/register works
   - Products display
   - Cart functionality works

---

## Quick Example: Migrating Your First File

**Before (src/hooks/useAuth.js):**
```javascript
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'

export function useAuth() {
  return useContext(AuthContext)
}
```

**After (src/hooks/useAuth.ts):**
```typescript
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'

export function useAuth() {
  return useContext(AuthContext)
}
```

For simple files, just rename! TypeScript infers types automatically.
