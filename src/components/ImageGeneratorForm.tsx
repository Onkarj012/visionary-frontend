import { useState } from "react";
import Split from "react-split";
import { GradientBorderCard } from "@/components/GradientBorderCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ChevronRightIcon,
  CheckIcon,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

export default function ImageGeneratorForm() {
  const [selectedModel, setSelectedModel] = useState("SDXL 1.0");
  const [showNegative, setShowNegative] = useState(true);

  const models = [
    { name: "SDXL 1.0" },
    { name: "SDXL 2.0" },
    { name: "SDXL 3.0" },
  ];

  const availableLoras = [
    { name: "FaceEnhance LoRA" },
    { name: "AnimeStyle LoRA" },
    { name: "BackgroundBlur LoRA" },
    { name: "PortraitSharp LoRA" },
    { name: "LightingFX LoRA" },
  ];

  const [selectedLoras, setSelectedLoras] = useState<
    { name: string; strength: number }[]
  >([
    { name: "FaceEnhance LoRA", strength: 1.0 },
    { name: "AnimeStyle LoRA", strength: 0.8 },
  ]);

  const toggleLora = (loraName: string) => {
    setSelectedLoras((prev) => {
      const exists = prev.find((l) => l.name === loraName);
      if (exists) {
        return prev.filter((l) => l.name !== loraName);
      } else {
        return [...prev, { name: loraName, strength: 1.0 }];
      }
    });
  };

  const updateStrength = (index: number, value: string) => {
    const num = parseFloat(value);
    if (!isNaN(num)) {
      setSelectedLoras((prev) =>
        prev.map((l, i) => (i === index ? { ...l, strength: num } : l))
      );
    }
  };

  return (
    <div className="w-full h-full">
      <Split
        className="flex h-[calc(100vh-80px)]"
        sizes={[35, 65]}
        minSize={220}
        gutterSize={6}
        gutterAlign="center"
        cursor="col-resize"
      >
        {/* Left Panel */}
        <div className="p-4 overflow-y-auto bg-background border-r border-input">
          <div className="space-y-6">
            {/* Model Selector */}
            <GradientBorderCard
              label={<span className="text-gradient">Model Selector</span>}
              content={
                <div className="space-y-6">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between border-input text-text hover:border-accent hover:text-accent transition"
                      >
                        {selectedModel}
                        <ChevronRightIcon className="ml-2 h-4 w-4 text-accent" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="dialog-surface">
                      <DialogHeader>
                        <DialogTitle className="dialog-title-gradient">
                          Select Model
                        </DialogTitle>
                        <DialogDescription className="text-muted">
                          Choose one of the available models below.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        {models.map((model) => (
                          <Button
                            key={model.name}
                            variant={
                              selectedModel === model.name
                                ? "default"
                                : "outline"
                            }
                            onClick={() => setSelectedModel(model.name)}
                            className={`justify-between transition ${
                              selectedModel === model.name
                                ? "bg-accent text-white shadow-md"
                                : "border-input text-text hover:border-accent hover:text-accent"
                            }`}
                          >
                            {model.name}
                            {selectedModel === model.name && (
                              <CheckIcon className="h-4 w-4" />
                            )}
                          </Button>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* LoRA Selector */}
                  <div>
                    <h3 className="text-primary font-semibold mb-3 text-sm uppercase tracking-wide">
                      LoRA Selector
                    </h3>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between border-input text-text hover:border-accent hover:text-accent transition"
                        >
                          Select LoRAs
                          <ChevronRightIcon className="ml-2 h-4 w-4 text-accent" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="dialog-surface">
                        <DialogHeader>
                          <DialogTitle className="dialog-title-gradient">
                            Select LoRAs
                          </DialogTitle>
                          <DialogDescription className="text-muted">
                            You can select multiple LoRAs. Click again to
                            unselect.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-3 mt-4">
                          {availableLoras.map((lora) => {
                            const isSelected = selectedLoras.some(
                              (sl) => sl.name === lora.name
                            );
                            return (
                              <Button
                                key={lora.name}
                                variant={isSelected ? "default" : "outline"}
                                onClick={() => toggleLora(lora.name)}
                                className={`justify-between transition ${
                                  isSelected
                                    ? "bg-accent text-white shadow-md"
                                    : "border-input text-text hover:border-accent hover:text-accent"
                                }`}
                              >
                                {lora.name}
                                {isSelected && (
                                  <CheckIcon className="h-4 w-4" />
                                )}
                              </Button>
                            );
                          })}
                        </div>
                      </DialogContent>
                    </Dialog>

                    {/* Selected LoRAs */}
                    <div className="mt-4 space-y-3">
                      {selectedLoras.map((lora, index) => (
                        <div
                          key={lora.name}
                          className="flex items-center justify-between gradient-border rounded-xl p-2.5 bg-[#0d0d0d]/70 backdrop-blur-md transition hover:scale-[1.02]"
                        >
                          <span className="text-sm font-medium text-text">
                            {lora.name}
                          </span>
                          <input
                            type="number"
                            step="0.1"
                            value={lora.strength}
                            onChange={(e) =>
                              updateStrength(index, e.target.value)
                            }
                            className="w-16 text-center border border-input rounded-md p-1 bg-background text-text focus:border-accent focus:ring-1 focus:ring-accent outline-none transition"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              }
            />
          </div>
          <div className="mt-6 text-muted font-medium">Image Settings</div>
        </div>

        {/* Right Panel */}
        <div className="p-4 bg-background overflow-y-auto">
          {/* Unified Prompt Card */}
          <div className="gradient-border rounded-2xl bg-[#0d0d0d]/70 backdrop-blur-md shadow-lg transition hover:shadow-accent/30 p-4 space-y-6">
            {/* Positive Prompt */}
            <div>
              <label className="block text-gradient text-sm font-semibold mb-2">
                Positive Prompt
              </label>
              <textarea
                placeholder="Enter your main prompt..."
                className="w-full h-32 p-3 rounded-lg bg-background text-text resize-none border border-input focus:border-accent focus:ring-1 focus:ring-accent outline-none transition"
              />
            </div>

            {/* Toggle + Negative Prompt */}
            <div>
              <button
                onClick={() => setShowNegative(!showNegative)}
                className="text-xs  text-muted hover:text-accent flex items-center gap-1 mb-2 transition"
              >
                {showNegative ? (
                  <>
                    <ChevronDown size={14} /> Hide Negative Prompt
                  </>
                ) : (
                  <>
                    <ChevronRight size={14} /> Show Negative Prompt
                  </>
                )}
              </button>

              {showNegative && (
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Negative Prompt
                  </label>
                  <textarea
                    placeholder="Enter things to avoid..."
                    className="w-full h-24 p-3 rounded-lg bg-background text-text resize-none border border-input focus:border-accent focus:ring-1 focus:ring-accent outline-none transition"
                  />
                </div>
              )}
            </div>

            {/* Generate Button */}
            <div className="flex justify-end">
              <Button className="bg-indigo-sky text-white shadow-md hover:shadow-lg hover:bg-accent/90 transition">
                Generate
              </Button>
            </div>
          </div>

          {/* Placeholder below for generated output */}
          <div className="mt-6 text-muted font-medium">Generated Image</div>
        </div>
      </Split>
    </div>
  );
}
