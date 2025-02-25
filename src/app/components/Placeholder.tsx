import { useEffect, useRef } from 'react';

interface PlaceholderProps {
  width: number;
  height: number;
  color: string;
  text?: string;
}

export function generatePlaceholderDataURL(color: string): string {
  // Remove the '#' if present
  const hexColor = color.replace('#', '');
  
  // Create an SVG with the specified color
  const svg = `
    <svg width="400" height="160" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="160" fill="%23${hexColor}"/>
      <text x="50%" y="50%" fill="white" font-family="Arial" font-size="14" text-anchor="middle" dy=".3em" opacity="0.5">
        Preview Image
      </text>
    </svg>
  `;

  // Convert SVG to base64
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}

export default function Placeholder({ width, height, color, text }: PlaceholderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, `${color}33`);
    gradient.addColorStop(1, `${color}66`);
    
    // Fill background
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Add some random shapes
    ctx.fillStyle = `${color}1A`;
    for (let i = 0; i < 5; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = 20 + Math.random() * 100;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add text if provided
    if (text) {
      ctx.fillStyle = '#ffffff';
      ctx.font = '20px Inter';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, width / 2, height / 2);
    }
  }, [width, height, color, text]);

  return <canvas ref={canvasRef} width={width} height={height} />;
} 