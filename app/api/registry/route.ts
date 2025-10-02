import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

// This API route serves the component registry
// It can be accessed at /api/registry or /api/registry/[component-name]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const component = searchParams.get("component")

  try {
    // Serve the main registry index
    if (!component) {
      const registryPath = path.join(process.cwd(), "registry", "index.json")
      const registryData = fs.readFileSync(registryPath, "utf-8")
      return NextResponse.json(JSON.parse(registryData), {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
    }

    // Serve a specific component's data
    const componentPath = path.join(
      process.cwd(),
      "registry",
      "components",
      `${component}.json`
    )

    if (!fs.existsSync(componentPath)) {
      return NextResponse.json(
        { error: "Component not found" },
        { status: 404 }
      )
    }

    const componentData = fs.readFileSync(componentPath, "utf-8")
    return NextResponse.json(JSON.parse(componentData), {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("Error reading registry:", error)
    return NextResponse.json(
      { error: "Failed to read registry" },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}

