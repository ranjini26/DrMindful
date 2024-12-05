import React, { useState, useRef, useEffect } from 'react';
import { Undo } from 'lucide-react';

export function PatternDraw() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = '#4F46E5';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Set canvas size
    canvas.width = 300;
    canvas.height = 300;
    
    // Draw grid
    ctx.beginPath();
    for (let i = 0; i <= 300; i += 30) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 300);
      ctx.moveTo(0, i);
      ctx.lineTo(300, i);
    }
    ctx.strokeStyle = '#E5E7EB';
    ctx.stroke();
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setLastPoint({ x, y });
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPoint) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(x, y);
    ctx.strokeStyle = '#4F46E5';
    ctx.stroke();

    setLastPoint({ x, y });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setLastPoint(null);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Redraw grid
    ctx.beginPath();
    for (let i = 0; i <= 300; i += 30) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 300);
      ctx.moveTo(0, i);
      ctx.lineTo(300, i);
    }
    ctx.strokeStyle = '#E5E7EB';
    ctx.stroke();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="bg-white rounded-lg shadow-md p-2">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="border border-gray-200 rounded cursor-crosshair"
        />
      </div>
      <button
        onClick={clearCanvas}
        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        <Undo className="w-4 h-4 mr-2" />
        Clear Pattern
      </button>
    </div>
  );
}