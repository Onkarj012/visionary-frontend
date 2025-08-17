# VisioNary - AI Image Generation Frontend

A modern, responsive web application for AI-powered image generation built with React, TypeScript, and Vite. VisioNary provides an intuitive interface for creating stunning AI-generated images with advanced customization options.

## ✨ Features

- **AI Image Generation**: Generate high-quality images using various AI models (SDXL 1.0, 2.0, 3.0)
- **LoRA Integration**: Apply and customize LoRA models for enhanced image generation
- **Advanced Controls**: Fine-tune generation parameters including strength, steps, and CFG scale
- **Modern UI**: Beautiful gradient-themed interface with dark mode support
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Real-time Preview**: Split-pane interface for simultaneous editing and preview

## 🚀 Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom gradient utilities
- **UI Components**: Radix UI primitives with custom styling
- **State Management**: React hooks
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Code Quality**: ESLint with TypeScript support

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd visionary-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:8000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🏗️ Project Structure

```
visionary-frontend/
├── src/
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── button.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   ├── ImageGeneratorForm.tsx  # Main image generation form
│   │   ├── GradientCard.tsx        # Custom gradient card component
│   │   ├── GradientBorderCard.tsx  # Card with gradient border
│   │   ├── ThemeProvider.tsx       # Theme context provider
│   │   └── ThemeToggler.tsx        # Theme toggle component
│   ├── services/
│   │   └── api.ts              # API service functions
│   ├── lib/
│   │   └── utils.ts            # Utility functions
│   ├── App.tsx                 # Main application component
│   └── main.tsx                # Application entry point
├── public/                     # Static assets
├── components.json             # shadcn/ui configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── vite.config.ts              # Vite configuration
```

## 🎨 Key Components

### ImageGeneratorForm
The main component that handles the image generation interface, featuring:
- Model selection (SDXL variants)
- LoRA selection and strength adjustment
- Positive and negative prompt inputs
- Real-time parameter controls

### GradientBorderCard & GradientCard
Custom card components with beautiful gradient borders and hover effects, providing a cohesive visual experience.

### UI Components
A comprehensive set of reusable UI components built on Radix UI primitives, including:
- Buttons with gradient variants
- Dialogs with custom styling
- Form inputs and textareas
- Sliders and selectors

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS v4 with custom gradient utilities and animations. Custom classes include:
- `.text-gradient` - Gradient text effects
- `.bg-indigo-sky` - Gradient backgrounds
- `.gradient-border` - Gradient border effects

### shadcn/ui
The project is configured with shadcn/ui for consistent component styling and theming.

## 🌐 API Integration

The application integrates with a backend API for image generation. Key endpoints:
- `GET /api/models` - Fetch available AI models
- `GET /api/loras` - Fetch available LoRA models
- `POST /api/generate` - Generate images with specified parameters

## 🎯 Usage

1. **Select a Model**: Choose from available SDXL models
2. **Add LoRAs**: Select and configure LoRA models with strength values
3. **Write Prompts**: Enter positive and negative prompts
4. **Generate**: Click the generate button to create your image

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)
