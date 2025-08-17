import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const getHealth = async () => {
    const response = await api.get("/api/health");
    return response.data;
}

// Types for API responses
export type ApiModel = { model_name: string };
export type ApiLora = { name: string; alias: string; path: string; metadata: Record<string, unknown> };

// Get available models
export const getModels = async (): Promise<ApiModel[]> => {
    const response = await api.get("/api/models");
    return response.data;
};

// Get available LoRAs
export const getLoras = async (): Promise<ApiLora[]> => {
    const response = await api.get("/api/loras");
    return response.data;
};

// Generate image
export const generateImage = async (params: {
    prompt: string;
    negative_prompt?: string;
    model?: string;
    loras?: { name: string; strength: number }[];
    width: number;
    height: number;
    steps: number;
    cfg_scale?: number;
    seed?: number;
    batch_size?: number;
}) => {
    const response = await api.post("/api/generate", params);
    return response.data;
};