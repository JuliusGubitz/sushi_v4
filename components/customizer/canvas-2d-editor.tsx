"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Upload, Trash2, RotateCw, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Canvas2DEditorProps {
  width: number;
  height: number;
  onCanvasChange: (dataUrl: string) => void;
  uploadedImage?: string | null;
}

interface ImageObject {
  img: HTMLImageElement;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}

export function Canvas2DEditor({ width, height, onCanvasChange, uploadedImage }: Canvas2DEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<ImageObject[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizing, setResizing] = useState(false);
  const [resizeCorner, setResizeCorner] = useState<string | null>(null);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const addedUploadRef = useRef<string | null>(null);

  const CANVAS_WIDTH = 628;
  const CANVAS_HEIGHT = 880;

  // Skalierung: Bild in 157×220mm enthalten, max. eine Seite berührt Begrenzung, zentriert
  const computeImagePlacement = useCallback(
    (imgWidth: number, imgHeight: number) => {
      const scale = Math.min(CANVAS_WIDTH / imgWidth, CANVAS_HEIGHT / imgHeight);
      const scaledWidth = imgWidth * scale;
      const scaledHeight = imgHeight * scale;
      return {
        scaledWidth,
        scaledHeight,
        x: (CANVAS_WIDTH - scaledWidth) / 2,
        y: (CANVAS_HEIGHT - scaledHeight) / 2,
      };
    },
    [CANVAS_WIDTH, CANVAS_HEIGHT]
  );

  // Add uploaded image from sidebar to canvas
  useEffect(() => {
    if (!uploadedImage) {
      addedUploadRef.current = null;
      return;
    }
    if (uploadedImage !== addedUploadRef.current) {
      addedUploadRef.current = uploadedImage;
      const img = new Image();
      img.onload = () => {
        const { scaledWidth, scaledHeight, x, y } = computeImagePlacement(img.width, img.height);
        setImages(prev => [...prev, {
          img,
          x,
          y,
          width: scaledWidth,
          height: scaledHeight,
          rotation: 0
        }]);
      };
      img.src = uploadedImage;
    }
  }, [uploadedImage, computeImagePlacement]);

  // Export a clean texture for 3D (no grid, no selection UI)
  const exportCleanTexture = useCallback(() => {
    const offscreen = document.createElement("canvas");
    offscreen.width = CANVAS_WIDTH;
    offscreen.height = CANVAS_HEIGHT;
    const ctx = offscreen.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    images.forEach((item) => {
      ctx.save();
      ctx.translate(item.x + item.width / 2, item.y + item.height / 2);
      ctx.rotate((item.rotation * Math.PI) / 180);
      ctx.drawImage(item.img, -item.width / 2, -item.height / 2, item.width, item.height);
      ctx.restore();
    });

    onCanvasChange(offscreen.toDataURL("image/png"));
  }, [images, onCanvasChange, CANVAS_WIDTH, CANVAS_HEIGHT]);

  // Draw the visible 2D editor canvas (with grid + selection UI)
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#f5f5f0";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Grid (only visible in 2D editor)
    ctx.strokeStyle = "#e0e0e0";
    ctx.lineWidth = 1;
    for (let i = 0; i < CANVAS_WIDTH; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, CANVAS_HEIGHT);
      ctx.stroke();
    }
    for (let i = 0; i < CANVAS_HEIGHT; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(CANVAS_WIDTH, i);
      ctx.stroke();
    }

    // Draw images
    images.forEach((item, index) => {
      ctx.save();
      ctx.translate(item.x + item.width / 2, item.y + item.height / 2);
      ctx.rotate((item.rotation * Math.PI) / 180);
      ctx.drawImage(item.img, -item.width / 2, -item.height / 2, item.width, item.height);

      // Selection border (only visible in 2D editor)
      if (index === selectedIndex) {
        ctx.strokeStyle = "#3b82f6";
        ctx.lineWidth = 3;
        ctx.strokeRect(-item.width / 2 - 5, -item.height / 2 - 5, item.width + 10, item.height + 10);

        const cornerSize = 12;
        ctx.fillStyle = "#3b82f6";
        [-1, 1].forEach(hx => {
          [-1, 1].forEach(hy => {
            ctx.fillRect(
              (hx * item.width) / 2 - cornerSize / 2,
              (hy * item.height) / 2 - cornerSize / 2,
              cornerSize,
              cornerSize
            );
          });
        });
      }
      ctx.restore();
    });

    exportCleanTexture();
  }, [images, selectedIndex, exportCleanTexture, CANVAS_WIDTH, CANVAS_HEIGHT]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const { scaledWidth, scaledHeight, x, y } = computeImagePlacement(img.width, img.height);
          setImages(prev => [...prev, {
            img,
            x,
            y,
            width: scaledWidth,
            height: scaledHeight,
            rotation: 0
          }]);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }, [computeImagePlacement]);

  const getMousePos = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * CANVAS_WIDTH,
      y: ((e.clientY - rect.top) / rect.height) * CANVAS_HEIGHT
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const pos = getMousePos(e);
    
    // Check if clicking on selected image's resize handles
    if (selectedIndex !== null) {
      const item = images[selectedIndex];
      const cornerSize = 12;
      const corners = [
        { name: 'tl', x: item.x, y: item.y },
        { name: 'tr', x: item.x + item.width, y: item.y },
        { name: 'bl', x: item.x, y: item.y + item.height },
        { name: 'br', x: item.x + item.width, y: item.y + item.height }
      ];
      
      for (const corner of corners) {
        if (Math.abs(pos.x - corner.x) < cornerSize && Math.abs(pos.y - corner.y) < cornerSize) {
          setResizing(true);
          setResizeCorner(corner.name);
          setResizeStart({ x: pos.x, y: pos.y, width: item.width, height: item.height });
          return;
        }
      }
    }
    
    // Check if clicking on any image
    for (let i = images.length - 1; i >= 0; i--) {
      const item = images[i];
      if (pos.x >= item.x && pos.x <= item.x + item.width && 
          pos.y >= item.y && pos.y <= item.y + item.height) {
        setSelectedIndex(i);
        setDragging(true);
        setDragStart({ x: pos.x - item.x, y: pos.y - item.y });
        return;
      }
    }
    setSelectedIndex(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (selectedIndex === null) return;
    const pos = getMousePos(e);
    
    if (resizing && resizeCorner) {
      // Handle resize
      setImages(prev => prev.map((item, i) => {
        if (i !== selectedIndex) return item;
        
        const dx = pos.x - resizeStart.x;
        const dy = pos.y - resizeStart.y;
        let newWidth = resizeStart.width;
        let newHeight = resizeStart.height;
        let newX = item.x;
        let newY = item.y;
        
        // Maintain aspect ratio
        const aspectRatio = item.img.width / item.img.height;
        
        if (resizeCorner === 'br') {
          newWidth = resizeStart.width + dx;
          newHeight = newWidth / aspectRatio;
        } else if (resizeCorner === 'bl') {
          newWidth = resizeStart.width - dx;
          newHeight = newWidth / aspectRatio;
          newX = item.x + (resizeStart.width - newWidth);
        } else if (resizeCorner === 'tr') {
          newWidth = resizeStart.width + dx;
          newHeight = newWidth / aspectRatio;
          newY = item.y + (resizeStart.height - newHeight);
        } else if (resizeCorner === 'tl') {
          newWidth = resizeStart.width - dx;
          newHeight = newWidth / aspectRatio;
          newX = item.x + (resizeStart.width - newWidth);
          newY = item.y + (resizeStart.height - newHeight);
        }
        
        // Enforce minimum size
        newWidth = Math.max(50, newWidth);
        newHeight = Math.max(50, newHeight);
        
        // Keep within canvas bounds
        newX = Math.max(0, Math.min(newX, CANVAS_WIDTH - newWidth));
        newY = Math.max(0, Math.min(newY, CANVAS_HEIGHT - newHeight));
        
        // Adjust width/height if boundaries are hit
        if (newX === 0 && resizeCorner.includes('l')) {
          newWidth = item.x + item.width;
          newHeight = newWidth / aspectRatio;
        }
        if (newY === 0 && resizeCorner.includes('t')) {
          newHeight = item.y + item.height;
          newWidth = newHeight * aspectRatio;
        }
        if (newX + newWidth >= CANVAS_WIDTH && resizeCorner.includes('r')) {
          newWidth = CANVAS_WIDTH - newX;
          newHeight = newWidth / aspectRatio;
        }
        if (newY + newHeight >= CANVAS_HEIGHT && resizeCorner.includes('b')) {
          newHeight = CANVAS_HEIGHT - newY;
          newWidth = newHeight * aspectRatio;
        }
        
        return { ...item, width: newWidth, height: newHeight, x: newX, y: newY };
      }));
    } else if (dragging) {
      // Handle drag with boundary constraints
      const snapDistance = 10;
      let newX = pos.x - dragStart.x;
      let newY = pos.y - dragStart.y;
      
      const currentImage = images[selectedIndex];
      
      // Constrain to canvas bounds (object must stay at least 20px inside)
      const minInside = 20;
      newX = Math.max(-currentImage.width + minInside, Math.min(newX, CANVAS_WIDTH - minInside));
      newY = Math.max(-currentImage.height + minInside, Math.min(newY, CANVAS_HEIGHT - minInside));
      
      // Snap to edges
      if (Math.abs(newX) < snapDistance) newX = 0;
      if (Math.abs(newX + currentImage.width - CANVAS_WIDTH) < snapDistance) {
        newX = CANVAS_WIDTH - currentImage.width;
      }
      if (Math.abs(newY) < snapDistance) newY = 0;
      if (Math.abs(newY + currentImage.height - CANVAS_HEIGHT) < snapDistance) {
        newY = CANVAS_HEIGHT - currentImage.height;
      }
      
      setImages(prev => prev.map((item, i) => 
        i === selectedIndex ? { ...item, x: newX, y: newY } : item
      ));
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
    setResizing(false);
    setResizeCorner(null);
  };



  const deleteSelected = () => {
    if (selectedIndex !== null) {
      setImages(prev => prev.filter((_, i) => i !== selectedIndex));
      setSelectedIndex(null);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-muted/30 p-4 relative overflow-hidden">
      {selectedIndex !== null && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          <Button size="sm" variant="outline" onClick={deleteSelected} className="gap-2 bg-background shadow-md">
            <Trash2 className="h-4 w-4" />
            Löschen
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setImages(prev => prev.map((item, i) =>
                i === selectedIndex ? { ...item, rotation: item.rotation + 90 } : item
              ));
            }}
            className="gap-2 bg-background shadow-md"
          >
            <RotateCw className="h-4 w-4" />
            Drehen
          </Button>
        </div>
      )}

      <div
        onDrop={handleFileDrop}
        onDragOver={(e) => e.preventDefault()}
        className="relative border-2 border-dashed border-border rounded-lg overflow-hidden"
        style={{ maxWidth: "100%", maxHeight: "100%", aspectRatio: `${CANVAS_WIDTH} / ${CANVAS_HEIGHT}` }}
      >
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="cursor-move bg-card shadow-lg block"
          style={{ width: "100%", height: "100%" }}
        />
        
        {images.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-3 opacity-30" />
              <p className="text-muted-foreground text-sm">Bild hier ablegen oder links hochladen</p>
              <p className="text-xs text-muted-foreground mt-2">
                Ecken ziehen zum Skalieren | Klicken & Ziehen zum Verschieben
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
