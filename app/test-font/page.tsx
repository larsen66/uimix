export default function TestFont() {
  return (
    <div className="min-h-screen bg-white p-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <h1 className="text-4xl font-bold">Alpha Lyrae Font Test</h1>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Default (with CALT)</h2>
          <p className="text-xl">
            Every fourth letter should be pixelated automatically.
            This is a test of the contextual alternates feature.
            The font will automatically pixelate characters.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">With Animation (pixel-glitch-heading)</h2>
          <p className="text-xl pixel-glitch-heading">
            This text cycles through SS01-SS05 styles.
            Watch it change every few seconds.
            The animation shows different pixelated variations.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Logo (JetBrains Mono)</h2>
          <p className="text-xl font-logo">
            This should remain in JetBrains Mono without Alpha Lyrae.
          </p>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <p>• CALT (Contextual Alternates): Every 4th character pixelated</p>
          <p>• SS01: First pixelated set</p>
          <p>• SS02: Second pixelated set</p>
          <p>• SS03: Glitched version of SS01</p>
          <p>• SS04: Glitched version of SS02</p>
          <p>• SS05: Displaced pixels for motion effect</p>
        </div>
      </div>
    </div>
  );
}
