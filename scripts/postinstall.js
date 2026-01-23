#!/usr/bin/env node

/**
 * Post-install script for phl-rn-boilerplate
 * This script runs after npm/yarn install to set up the project
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectRoot = process.cwd();

console.log('\n🚀 Setting up phl-rn-boilerplate...\n');

// Function to check if we're in a new project (not the template repo itself)
function isNewProject() {
  const packageJsonPath = path.join(projectRoot, 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    return false;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // If the name is still the template name, it might be the template repo
  return packageJson.name !== 'phl-rn-boilerplate';
}

// Function to update app name in various files
function updateAppName() {
  try {
    const packageJsonPath = path.join(projectRoot, 'package.json');
    const appJsonPath = path.join(projectRoot, 'app.json');
    
    if (!fs.existsSync(packageJsonPath)) {
      return;
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const appName = packageJson.name;

    // Update app.json
    if (fs.existsSync(appJsonPath)) {
      const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
      appJson.expo.name = appName;
      appJson.expo.slug = appName;
      fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));
      console.log('✅ Updated app.json with project name');
    }
  } catch (error) {
    console.log('⚠️  Could not update app name:', error.message);
  }
}

// Main setup
try {
  if (isNewProject()) {
    console.log('🎨 Configuring your new project...\n');
    updateAppName();
    
    // Uncomment if you want to auto-run pod install
    // setupIOS();
    
    console.log('\n✨ Setup complete! Your project is ready.\n');
    console.log('📚 Next steps:');
    console.log('   1. Navigate to your project directory');
    console.log('   2. Run "npx expo prebuild" to set up native code (necessary for iOS/Android builds)');
    console.log('   3. Run "yarn ios" or "yarn android" to start');
    console.log('   4. Check the README.md for more information');
    console.log('   5. Start building your app!\n');
  }
} catch (error) {
  console.log('⚠️  Setup encountered an issue:', error.message);
  console.log('You can continue manually - check the README.md for instructions.\n');
}
