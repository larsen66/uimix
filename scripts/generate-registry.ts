/**
 * Script to automatically generate registry JSON files from components
 * Run with: tsx scripts/generate-registry.ts
 */

import fs from "fs"
import path from "path"

interface RegistryComponent {
  name: string
  type: "registry:ui" | "registry:example" | "registry:block"
  description?: string
  dependencies?: string[]
  devDependencies?: string[]
  registryDependencies?: string[]
  files: Array<{ path: string; type: string }>
  tailwind?: any
  cssVars?: any
}

// Analyze a file to extract dependencies
function extractDependencies(content: string): {
  dependencies: string[]
  registryDependencies: string[]
} {
  const dependencies: string[] = []
  const registryDependencies: string[] = []

  // Extract npm dependencies
  const importRegex = /from\s+['"]([^'"@][^'"]+)['"]/g
  let match
  while ((match = importRegex.exec(content)) !== null) {
    const dep = match[1].split("/")[0]
    if (
      !dep.startsWith(".") &&
      !dep.startsWith("@/") &&
      dep !== "react" &&
      dep !== "next"
    ) {
      if (!dependencies.includes(dep)) {
        dependencies.push(dep)
      }
    }
  }

  // Extract registry dependencies (imports from @/components/ui)
  const uiImportRegex = /from\s+['"]@\/components\/ui\/([^'"]+)['"]/g
  while ((match = uiImportRegex.exec(content)) !== null) {
    const dep = match[1].replace(".tsx", "").replace(".ts", "")
    if (!registryDependencies.includes(dep)) {
      registryDependencies.push(dep)
    }
  }

  return { dependencies, registryDependencies }
}

// Generate registry for UI components
function generateUIComponentsRegistry() {
  const uiDir = path.join(process.cwd(), "components", "ui")
  const registryDir = path.join(process.cwd(), "registry", "components")

  if (!fs.existsSync(registryDir)) {
    fs.mkdirSync(registryDir, { recursive: true })
  }

  const files = fs.readdirSync(uiDir).filter((f) => f.endsWith(".tsx"))

  files.forEach((file) => {
    const componentName = file.replace(".tsx", "")
    const filePath = path.join(uiDir, file)
    const content = fs.readFileSync(filePath, "utf-8")

    const { dependencies, registryDependencies } = extractDependencies(content)

    const component: RegistryComponent = {
      name: componentName,
      type: "registry:ui",
      dependencies: dependencies.length > 0 ? dependencies : undefined,
      registryDependencies:
        registryDependencies.length > 0 ? registryDependencies : undefined,
      files: [
        {
          path: `components/ui/${file}`,
          type: "registry:ui",
        },
      ],
    }

    const outputPath = path.join(registryDir, `${componentName}.json`)
    fs.writeFileSync(outputPath, JSON.stringify(component, null, 2))
    console.log(`✓ Generated registry for ${componentName}`)
  })
}

// Generate registry for catalog components (examples/blocks)
function generateCatalogRegistry() {
  const catalogDir = path.join(process.cwd(), "components", "catalog")
  const registryDir = path.join(process.cwd(), "registry", "components")

  function processDirectory(dir: string, category: string) {
    const files = fs.readdirSync(dir)

    files.forEach((file) => {
      const fullPath = path.join(dir, file)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        processDirectory(fullPath, `${category}/${file}`)
      } else if (file.endsWith(".tsx") && file !== "index.ts") {
        const componentName = file.replace(".tsx", "")
        const content = fs.readFileSync(fullPath, "utf-8")
        const { dependencies, registryDependencies } =
          extractDependencies(content)

        const relativePath = path.relative(
          path.join(process.cwd(), "components"),
          fullPath
        )

        const component: RegistryComponent = {
          name: componentName,
          type: "registry:example",
          dependencies: dependencies.length > 0 ? dependencies : undefined,
          registryDependencies:
            registryDependencies.length > 0 ? registryDependencies : undefined,
          files: [
            {
              path: `components/${relativePath.replace(/\\/g, "/")}`,
              type: "registry:example",
            },
          ],
        }

        const outputPath = path.join(registryDir, `${componentName}.json`)
        fs.writeFileSync(outputPath, JSON.stringify(component, null, 2))
        console.log(`✓ Generated registry for ${componentName} (${category})`)
      }
    })
  }

  processDirectory(catalogDir, "catalog")
}

// Update the main index.json
function updateMainIndex() {
  const registryDir = path.join(process.cwd(), "registry", "components")
  const files = fs.readdirSync(registryDir).filter((f) => f.endsWith(".json"))

  const components = files.map((file) => {
    const content = fs.readFileSync(path.join(registryDir, file), "utf-8")
    return JSON.parse(content)
  })

  const index = {
    name: "uimix",
    type: "registry:ui",
    registries: {
      default: {
        style: "new-york",
        tailwind: {
          config: "tailwind.config.ts",
          css: "app/globals.css",
          baseColor: "neutral",
          cssVariables: true,
        },
      },
    },
    components,
  }

  const indexPath = path.join(process.cwd(), "registry", "index.json")
  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2))
  console.log("\n✓ Updated main index.json")
}

// Main execution
console.log("🚀 Generating component registry...\n")
generateUIComponentsRegistry()
generateCatalogRegistry()
updateMainIndex()
console.log("\n✅ Registry generation complete!")

