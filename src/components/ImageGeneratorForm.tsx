import { useState, useEffect } from "react";
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
import { ChevronRightIcon, CheckIcon, Eye, EyeClosed } from "lucide-react";

import {
  getModels,
  getLoras,
  generateImage,
  type ApiModel,
  type ApiLora,
} from "../services/api";

type SelectedLora = { name: string; strength: number };

export default function ImageGeneratorForm() {
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [showNegative, setShowNegative] = useState(true);

  const [models, setModels] = useState<ApiModel[]>([]);
  const [availableLoras, setAvailableLoras] = useState<ApiLora[]>([]);

  const [selectedLoras, setSelectedLoras] = useState<SelectedLora[]>([]);
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");

  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const [steps, setSteps] = useState(30);
  const [cfgScale, setCfgScale] = useState(7);
  const [batchSize, setBatchSize] = useState(1);
  const [seed, setSeed] = useState(Math.floor(Math.random() * 100000));

  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [m, l] = await Promise.all([getModels(), getLoras()]);

        setModels(m);
        setAvailableLoras(l);

        if (m.length > 0) setSelectedModel(m[0].model_name);
      } catch (err) {
        setError("Failed to fetch models or LoRAs.");
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, []);

  const toggleLora = (loraName: string) => {
    setSelectedLoras((prev) => {
      const exists = prev.find((l) => l.name === loraName);
      console.log(
        "Current selected:",
        prev.map((l) => l.name),
        "Exists:",
        exists
      );
      if (exists) {
        const filtered = prev.filter((l) => l.name !== loraName);
        console.log(
          "Removing, new state:",
          filtered.map((l) => l.name)
        );
        return filtered;
      } else {
        const newState = [...prev, { name: loraName, strength: 1.0 }];
        console.log(
          "Adding, new state:",
          newState.map((l) => l.name)
        );
        return newState;
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

  const randomizeSeed = () => {
    setSeed(Math.floor(Math.random() * 100000));
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const requestData = {
        prompt,
        ...(negativePrompt && { negative_prompt: negativePrompt }),
        ...(selectedModel && { model: selectedModel }),
        ...(selectedLoras.length > 0 && {
          loras: selectedLoras.map((lora) => ({
            name: lora.name,
            strength: lora.strength,
          })),
        }),
        width,
        height,
        steps,
        ...(cfgScale && { cfg_scale: cfgScale }),
        ...(seed && { seed }),
        ...(batchSize && { batch_size: batchSize }),
      };

      const data = await generateImage(requestData);

      if (data?.images && data.images.length > 0) {
        const imageData = data.images[0];

        // Check if it's already a data URL or needs base64 prefix
        if (imageData.startsWith("data:image/")) {
          setGeneratedImage(imageData);
        } else {
          // If it's just base64, add the prefix
          setGeneratedImage(`data:image/png;base64,${imageData}`);
        }
      } else {
        console.error("No images in response:", data);
        setError("No image returned from server. Check console for details.");
      }
    } catch (err) {
      setError("Image generation failed.");
      console.error("Generation error:", err);
    } finally {
      setLoading(false);
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
              label={
                <span className="text-gradient font-semibold mb-3 text-sm uppercase tracking-wide">
                  Model Selector
                </span>
              }
              content={
                <div className="space-y-6">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        disabled={loading}
                        className="w-full justify-between border-input text-foreground hover:border-accent hover:text-accent transition"
                      >
                        {selectedModel || "Select Model"}
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
                            key={model.model_name}
                            variant={
                              selectedModel === model.model_name
                                ? "default"
                                : "outline"
                            }
                            onClick={() => setSelectedModel(model.model_name)}
                            disabled={loading}
                            className={`justify-between transition ${
                              selectedModel === model.model_name
                                ? "bg-accent text-white shadow-md"
                                : "border-input text-foreground hover:border-accent hover:text-accent"
                            }`}
                          >
                            {model.model_name}
                            {selectedModel === model.model_name && (
                              <CheckIcon className="h-4 w-4" />
                            )}
                          </Button>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* LoRA Selector */}
                  <div>
                    <h3 className="text-gradient font-semibold mb-3 text-sm uppercase tracking-wide">
                      LoRA Selector
                    </h3>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          disabled={loading}
                          className="w-full justify-between border-input text-foreground hover:border-accent hover:text-accent transition"
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
                        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
                          {availableLoras.map((lora) => {
                            const loraName = lora.name;
                            const isSelected = selectedLoras.some(
                              (sl) => sl.name === loraName
                            );

                            return (
                              <Button
                                key={loraName}
                                variant={
                                  isSelected ? "loraSelected" : "loraUnselected"
                                }
                                onClick={() => toggleLora(loraName)}
                                disabled={loading}
                                className="flex flex-col items-center justify-center h-24 rounded-xl shadow-md transition group"
                              >
                                <span className="truncate text-base font-medium">
                                  {loraName}
                                </span>
                                {isSelected && (
                                  <CheckIcon className="h-5 w-5 mt-2 text-green-400 group-hover:scale-110 transition" />
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
                          className="flex items-center justify-between gradient-border rounded-xl p-2.5 bg-[#0d0d0d]/70 backdrop-blur-md transition "
                        >
                          <span className="text-sm font-medium text-foreground">
                            {lora.name}
                          </span>
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="2"
                            value={lora.strength}
                            disabled={loading}
                            onChange={(e) =>
                              updateStrength(index, e.target.value)
                            }
                            className="w-16 text-center border border-input rounded-md p-1 bg-background text-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none transition"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              }
            />

            {/* Image Settings */}
            <div className="mt-6 text-muted font-medium">Image Settings</div>
            <div className="space-y-3">
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                disabled={loading}
                className="w-full border p-2 rounded"
                placeholder="Width"
              />
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                disabled={loading}
                className="w-full border p-2 rounded"
                placeholder="Height"
              />
              <input
                type="number"
                value={steps}
                onChange={(e) => setSteps(Number(e.target.value))}
                disabled={loading}
                className="w-full border p-2 rounded"
                placeholder="Steps"
              />
              <input
                type="number"
                value={cfgScale}
                onChange={(e) => setCfgScale(Number(e.target.value))}
                disabled={loading}
                className="w-full border p-2 rounded"
                placeholder="CFG Scale"
              />
              <input
                type="number"
                value={batchSize}
                onChange={(e) => setBatchSize(Number(e.target.value))}
                disabled={loading}
                className="w-full border p-2 rounded"
                placeholder="Batch Size"
              />
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={seed}
                  onChange={(e) => setSeed(Number(e.target.value))}
                  disabled={loading}
                  className="flex-1 border p-2 rounded"
                  placeholder="Seed"
                />
                <Button
                  onClick={randomizeSeed}
                  disabled={loading}
                  variant="outline"
                >
                  Randomize
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="p-6 bg-background overflow-y-auto space-y-6">
          {/* Unified Prompt Card */}
          <div className="gradient-border rounded-2xl bg-[#0d0d0d]/70 backdrop-blur-md shadow-lg transition p-6 space-y-6">
            {/* Positive Prompt */}
            <div className="space-y-2">
              <label className="text-gradient font-semibold text-sm uppercase tracking-wide">
                Positive Prompt
              </label>
              <textarea
                placeholder="Enter your main prompt..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={loading}
                className="w-full h-32 p-3 rounded-lg bg-background text-text resize-none border border-input focus:border-accent focus:ring-1 focus:ring-accent outline-none transition"
              />
            </div>

            {/* Toggle + Negative Prompt */}
            <div className="space-y-3">
              <button
                onClick={() => setShowNegative(!showNegative)}
                disabled={loading}
                className="flex items-center justify-center rounded-md border border-input bg-background/50 px-3 py-2 text-xs text-muted-foreground hover:text-accent hover:border-accent hover:bg-accent/10 transition-colors"
              >
                {showNegative ? (
                  <EyeClosed className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>

              {showNegative && (
                <div className="space-y-2">
                  <label className="text-gradient font-semibold text-sm uppercase tracking-wide">
                    Negative Prompt
                  </label>
                  <textarea
                    placeholder="Enter things to avoid..."
                    value={negativePrompt}
                    onChange={(e) => setNegativePrompt(e.target.value)}
                    disabled={loading}
                    className="w-full h-24 p-3 rounded-lg bg-background text-text resize-none border border-input focus:border-accent focus:ring-1 focus:ring-accent outline-none transition"
                  />
                </div>
              )}
            </div>

            {/* Generate Button */}
            <div className="flex justify-end">
              <Button
                onClick={handleGenerate}
                disabled={loading}
                className="px-6 py-2 bg-indigo-sky text-white shadow-md hover:shadow-lg hover:bg-accent/90 transition rounded-lg"
              >
                {loading ? "Generating..." : "Generate"}
              </Button>
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
          </div>

          {/* Generated Output Section */}
          <div className="gradient-border rounded-2xl bg-[#0d0d0d]/60 backdrop-blur-md shadow-md p-6 space-y-4">
            <h2 className="text-sm font-semibold text-muted tracking-wide uppercase">
              Generated Output
            </h2>
            <div className="flex items-center justify-center h-64 border border-dashed border-border rounded-xl text-muted-foreground text-sm">
              {loading && <span>Generating...</span>}

              {!loading && generatedImage && (
                <img
                  src={generatedImage}
                  alt="Generated"
                  className="max-h-60 rounded-lg shadow-md"
                />
              )}

              {!loading && !generatedImage && !error && (
                <span>Your generated image will appear here!</span>
              )}
            </div>
          </div>
        </div>
      </Split>
    </div>
  );
}
