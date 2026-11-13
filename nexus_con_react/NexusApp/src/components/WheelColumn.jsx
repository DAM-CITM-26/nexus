// src/components/WheelColumn.jsx
import { useEffect, useRef } from 'react';
import './WheelColumn.css';

export default function WheelColumn({
  options,
  value,
  onChange,
  variant = 'gray', // 'peach' | 'gray'
  visibleRows = 5,  // 5 para fecha/hora, 3 para AM/PM
}) {
  const containerRef = useRef(null);
  const itemHeight = 36;
  const selectedIndex = Math.max(0, options.indexOf(value));
  const paddingVertical = ((visibleRows - 1) / 2) * itemHeight;

  // Posicionar la rueda en el valor inicial al cargar
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = selectedIndex * itemHeight;
    }
  }, []);

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const index = Math.round(scrollTop / itemHeight);
    const clampedIndex = Math.min(Math.max(index, 0), options.length - 1);
    if (options[clampedIndex] !== value) {
      onChange(options[clampedIndex]);
    }
  };

  const handleSelectClick = (index) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: index * itemHeight,
        behavior: 'smooth',
      });
    }
    onChange(options[index]);
  };

  return (
    <div
      className={`wheel-wrapper wheel-${variant}`}
      style={{ height: `${visibleRows * itemHeight}px` }}
    >
      {/* Líneas horizontales que enmarcan el elemento seleccionado */}
      <div
        className="wheel-highlight-lines"
        style={{
          top: `${paddingVertical}px`,
          height: `${itemHeight}px`,
        }}
      />

      <div
        ref={containerRef}
        className="wheel-scroll-area"
        onScroll={handleScroll}
        style={{
          paddingTop: `${paddingVertical}px`,
          paddingBottom: `${paddingVertical}px`,
        }}
      >
        {options.map((option, idx) => {
          const distance = Math.abs(idx - selectedIndex);
          let sizeClass = 'far';
          if (distance === 0) sizeClass = 'active';
          else if (distance === 1) sizeClass = 'near';

          return (
            <div
              key={option}
              className={`wheel-item ${sizeClass}`}
              style={{ height: `${itemHeight}px` }}
              onClick={() => handleSelectClick(idx)}
            >
              {option}
            </div>
          );
        })}
      </div>
    </div>
  );
}