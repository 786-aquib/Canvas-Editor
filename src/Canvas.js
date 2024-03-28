import React, { useEffect, useRef } from 'react';

const Canvas = ({ template }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background color
    ctx.fillStyle = template.background_color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw other elements (text, image, etc.) based on template data

    // Example: Drawing text
    ctx.fillStyle = template.caption.text_color;
    ctx.font = `${template.caption.font_size}px Arial`;
    const maxCharsPerLine = template.caption.max_characters_per_line;
    const text = template.caption.text;
    const lines = [];
    let line = '';
    const words = text.split(' ');
    for (const word of words) {
      if (line.length + word.length <= maxCharsPerLine) {
        line += word + ' ';
      } else {
        lines.push(line.trim());
        line = word + ' ';
      }
    }
    lines.push(line.trim());
    lines.forEach((line, index) => {
      const x = template.caption.position.x;
      const y = template.caption.position.y + (index * template.caption.font_size * 1.2); // Adjust line spacing
      ctx.fillText(line, x, y);
    });
  }, [template]);

  return (
    <div style={{ position: 'relative', width: '400px', height: '400px' }}>
      <canvas
        ref={canvasRef}
        width={1080}
        height={1080}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      ></canvas>
    </div>
  );
};

export default Canvas;
