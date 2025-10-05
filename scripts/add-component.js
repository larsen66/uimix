#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');

const REGISTRY_URL = process.env.UIMIX_REGISTRY || 'https://uimix.dev/api/registry';

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Usage: node scripts/add-component.js <component-name>');
  console.log('Example: node scripts/add-component.js hero-minimalism');
  process.exit(1);
}

const componentName = args[0];

console.log(`📦 Installing component: ${componentName}`);
console.log(`🔗 Registry: ${REGISTRY_URL}\n`);

// Fetch component data
const url = `${REGISTRY_URL}/${componentName}`;

https.get(url, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const component = JSON.parse(data);
      
      console.log(`✅ Found component: ${component.name}`);
      console.log(`📁 Files to install: ${component.files.length}`);
      
      // Install dependencies
      if (component.dependencies && component.dependencies.length > 0) {
        console.log(`\n📦 Dependencies: ${component.dependencies.join(', ')}`);
        console.log('Run: npm install ' + component.dependencies.join(' '));
      }

      // Create files
      component.files.forEach(file => {
        const filePath = path.join(process.cwd(), file.name);
        const dir = path.dirname(filePath);
        
        // Create directory if it doesn't exist
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        
        // Write file
        fs.writeFileSync(filePath, file.content, 'utf-8');
        console.log(`✓ Created: ${file.name}`);
      });

      console.log(`\n✅ Component ${componentName} installed successfully!`);
      
      if (component.registryDependencies && component.registryDependencies.length > 0) {
        console.log(`\n⚠️  This component depends on: ${component.registryDependencies.join(', ')}`);
        console.log('Install them with:');
        component.registryDependencies.forEach(dep => {
          console.log(`  node scripts/add-component.js ${dep}`);
        });
      }
      
    } catch (error) {
      console.error('❌ Error parsing component data:', error.message);
      process.exit(1);
    }
  });
}).on('error', (error) => {
  console.error('❌ Error fetching component:', error.message);
  console.log('\n💡 Tip: Make sure the registry is accessible and the component name is correct.');
  process.exit(1);
});

