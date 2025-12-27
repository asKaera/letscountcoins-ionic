# letscountcoins-ionic
A simple open-source mobile game app written on Ionic framework

## Prerequisites

- **Node.js** 18.x (recommended via [nvm](https://github.com/nvm-sh/nvm))
- **npm** (comes with Node.js)

## Installation & Setup

1. **Install Node.js 18** (if using nvm):
   ```bash
   nvm install 18
   nvm use 18
   ```

2. **Install dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Run the postinstall patch** (if not automatically run):
   ```bash
   npm run postinstall
   ```

## Running the App

### Development Mode (Browser)

Start the development server:
```bash
npm start
```
or
```bash
npm run ionic:serve
```

The app will be available at [http://localhost:8100/](http://localhost:8100/)

### Build

To build the app:
```bash
npm run build
```

## Notes

- This project has been updated to use the modern `sass` package instead of the deprecated `node-sass`
- A compatibility shim is automatically applied during installation via the postinstall script
- **TypeScript warnings from `@ionic/pro` package may appear in the console but don't affect functionality** - the app runs perfectly fine
- The dev server runs at [http://localhost:8100/](http://localhost:8100/) despite the type warnings
- For mobile deployment, you'll need to set up Cordova/Capacitor platforms

## Git Repository

This project is available at: https://github.com/asKaera/letscountcoins-ionic.git

**Branches:**
- `master` - Main branch (current)

## Troubleshooting

If you encounter issues:

1. Make sure you're using Node.js 18:
   ```bash
   node --version  # Should show v18.x.x
   ```

2. Clear node_modules and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install --legacy-peer-deps
   ```

3. Manually run the patch script:
   ```bash
   node scripts/patch-node-sass.js
   ```
