
import { Button } from "@/components/ui/button";
import Link from "next/link"; 


export const Hero = () => {
    return (
        <div className="absolute inset-0 z-10 pointer-events-none flex items-center">
            <div className="flex flex-col items-start justify-center h-full relative w-full max-w-5xl px-8 md:px-12 lg:px-16">
                {/* Main container centered with responsive margins */}
                <div className="w-full max-w-2xl ml-8 md:ml-16 lg:ml-24">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-left pointer-events-none leading-[1.1] font-space-grotesk tracking-tight md:tracking-wider">
                        UIMix
                    </h1>
                    <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-left mt-4 md:mt-6 pointer-events-none max-w-lg leading-relaxed font-space-grotesk font-light tracking-wide opacity-90">
                        From visual design to React code in seconds. Build extraordinary interfaces.
                    </p>
                    <div className="pointer-events-auto mt-6 md:mt-8">
                        <Link href="/docs">
                            <Button variant="default" className="text-center px-6 md:px-8 py-2.5 md:py-3 text-base md:text-lg font-space-grotesk font-medium tracking-wide transition-all duration-200 hover:scale-105">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

