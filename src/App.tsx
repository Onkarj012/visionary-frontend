import { WandSparkles } from "lucide-react";
import ImageGeneratorForm from "@/components/ImageGeneratorForm";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* --- Title Section --- */}
      <header className="w-full flex items-center justify-between px-8 py-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-gradient">
          <WandSparkles className="size-6 text-white" />
          VisioNary
        </h1>
      </header>

      {/* --- Main Section (2 parts: left + right) --- */}
      <ImageGeneratorForm />
    </div>
  );
}
