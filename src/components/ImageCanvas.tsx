import React, { useRef, useEffect, useState } from 'react';

interface ImageCanvasProps {
  imageSrc: string;
  onSave: (dataUrl: string) => void;
  readOnly?: boolean;
}

export const ImageCanvas: React.FC<ImageCanvasProps> = ({ imageSrc, onSave, readOnly = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      // Fit to container width if needed visually, but logical size remains
      ctx.drawImage(img, 0, 0);
    };
  }, [imageSrc]);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (readOnly) return;
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if(canvas) onSave(canvas.toDataURL());
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || readOnly) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('clientX' in e ? e.clientX : e.touches[0].clientX) - rect.left;
    const y = ('clientY' in e ? e.clientY : e.touches[0].clientY) - rect.top;

    // Scale coordinates
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'red';

    ctx.lineTo(x * scaleX, y * scaleY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x * scaleX, y * scaleY);
  };

  return (
    <div className="relative border-2 border-slate-300 rounded overflow-hidden touch-none">
      <canvas
        ref={canvasRef}
        className="max-w-full h-auto"
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        onTouchStart={startDrawing}
        onTouchEnd={stopDrawing}
        onTouchMove={draw}
        onMouseLeave={stopDrawing}
      />
      {!readOnly && (
        <div className="absolute top-2 right-2 bg-white/80 p-1 rounded text-xs">
          Draw Mode
        </div>
      )}
    </div>
  );
};