import { useState, useCallback } from 'react';

export const MIN_ZOOM = 0.5;
export const MAX_ZOOM = 4;
export const ZOOM_STEP = 0.2;

interface MapState {
  zoom: number;
  pan: { x: number; y: number };
  isDragging: boolean;
  dragStart: { x: number; y: number };
}

export function useMapControl() {
  const [zoom, setZoomValue] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleZoom = useCallback((newZoom: number, containerWidth: number, containerHeight: number) => {
    // Calculate the center of the current view
    const viewCenterX = containerWidth / 2;
    const viewCenterY = containerHeight / 2;

    // Calculate the point under the center in image coordinates
    const imageCenterX = (viewCenterX - pan.x) / zoom;
    const imageCenterY = (viewCenterY - pan.y) / zoom;

    // Calculate new pan to keep the same point under the center
    const newPan = {
      x: viewCenterX - (imageCenterX * newZoom),
      y: viewCenterY - (imageCenterY * newZoom)
    };

    setZoomValue(newZoom);
    setPan(newPan);
  }, [zoom, pan]);

  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>, containerWidth: number, containerHeight: number) => {
    e.preventDefault();
    
    // Calculate zoom based on wheel delta
    const delta = -e.deltaY / 1000;
    const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom + delta));
    
    if (newZoom !== zoom) {
      handleZoom(newZoom, containerWidth, containerHeight);
    }
  }, [zoom, handleZoom]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;

    setPan(prevPan => ({
      x: prevPan.x + (e.clientX - dragStart.x),
      y: prevPan.y + (e.clientY - dragStart.y)
    }));
    setDragStart({ x: e.clientX, y: e.clientY });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const zoomIn = useCallback((containerWidth: number, containerHeight: number) => {
    const newZoom = Math.min(MAX_ZOOM, zoom + ZOOM_STEP);
    handleZoom(newZoom, containerWidth, containerHeight);
  }, [zoom, handleZoom]);

  const zoomOut = useCallback((containerWidth: number, containerHeight: number) => {
    const newZoom = Math.max(MIN_ZOOM, zoom - ZOOM_STEP);
    handleZoom(newZoom, containerWidth, containerHeight);
  }, [zoom, handleZoom]);

  return {
    zoom,
    pan,
    isDragging,
    dragStart,
    handleWheel,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    zoomIn,
    zoomOut,
    setPan,
    setIsDragging,
    setDragStart,
    setZoomValue,
    MIN_ZOOM,
    MAX_ZOOM,
    ZOOM_STEP
  };
} 