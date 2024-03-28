import React, { useState } from 'react';
import Canvas from './Canvas';
import TemplateData from './TemplateData';

const CanvasEditor = () => {
  const [template, setTemplate] = useState(TemplateData);

  const handleTextChange = (type, newText) => {
    setTemplate(prevTemplate => ({
      ...prevTemplate,
      [type]: {
        ...prevTemplate[type],
        text: newText
      }
    }));
  };

  const handleColorChange = (newColor) => {
    setTemplate(prevTemplate => ({
      ...prevTemplate,
      background_color: newColor // Update background_color property
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setTemplate(prevTemplate => ({
          ...prevTemplate,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <Canvas template={template} />
        <div>
          <label>Background Color: </label>
          <input
            type="color"
            value={template.background_color}
            onChange={(e) => handleColorChange(e.target.value)} // Pass only the new color value
          />
        </div>
        <div>
          <label>Caption Text: </label>
          <input
            type="text"
            value={template.caption.text}
            onChange={(e) => handleTextChange('caption', e.target.value)}
          />
        </div>
        <div>
          <label>Select Image: </label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        {/* Other input fields for additional template elements */}
      </div>
    </div>
  );
};

export default CanvasEditor;
