import { useRef, useEffect, useState } from "react";
import { TfiWrite } from "react-icons/tfi";
import { HiPaintBrush } from "react-icons/hi2";
import { MdOpacity } from "react-icons/md";
import { FaClipboard } from "react-icons/fa";

const Draw = () => {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const [ctx, setCtx] = useState(null);

  const [brushColor, setBrushColor] = useState("#3B82F6");
  const [brushOpacity, setBrushOpacity] = useState(1);
  const [bgColor, setBgColor] = useState("#ffffff");

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const context = canvas.getContext("2d");
    context.lineWidth = 3;
    context.lineCap = "round";
    setCtx(context);

    context.fillStyle = bgColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  useEffect(() => {
    if (ctx) {
      ctx.strokeStyle = hexToRGBA(brushColor, brushOpacity);
    }
  }, [brushColor, brushOpacity, ctx]);

  const hexToRGBA = (hex, alpha) => {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) return;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const updateBackground = (e) => {
    setBgColor(e.target.value);
    const canvas = canvasRef.current;
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="w-full min-h-screen bg-[var(--bg-body)] text-[var(--text)] px-6 py-8 md:px-12">
      <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-6 flex gap-4 items-center">
        <TfiWrite className="text-[var(--text)] " /> Draw
      </h1>

      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 ">
            <span className="flex gap-3 items-center text-2xl font-semibold">
              <HiPaintBrush className="text-3xl" /> Brush Color
            </span>
          </label>
          <input
            type="color"
            value={brushColor}
            onChange={(e) => setBrushColor(e.target.value)}
            className="w-full h-10 rounded"
          />
        </div>
        <div>
          <div className="flex  gap-3 items-center">
            <label className="block text-sm font-medium mb-1">
              <span className="flex gap-3 items-center text-2xl font-semibold">
                <MdOpacity className="text-3xl" /> Brush Opacity
              </span>
            </label>
            <span className="text-sm text-[var(--text-light)] font-extrabold">
              {brushOpacity}
            </span>
          </div>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={brushOpacity}
            onChange={(e) => setBrushOpacity(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            <span className="flex gap-3 items-center text-2xl font-semibold">
              <FaClipboard /> Background Color
            </span>
          </label>
          <input
            type="color"
            value={bgColor}
            onChange={updateBackground}
            className="w-full h-10 rounded"
          />
        </div>
      </div>

      <button
        onClick={clearCanvas}
        className="mb-4 px-4 py-2 rounded bg-[var(--danger)] text-white hover:opacity-90 transition"
      >
        <span className="flex gap-3 items-center text-2xl font-semibold   ">
          <FaClipboard /> Clear Canvas
        </span>
      </button>

      <div className="border border-[var(--border)] rounded-lg overflow-hidden shadow-[var(--shadow)]  h-[80vh] w-full">
        <canvas
          ref={canvasRef}
          className="w-full h-full cursor-crosshair"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      </div>
    </div>
  );
};

export default Draw;
