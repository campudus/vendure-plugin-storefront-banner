import { useEffect, useRef, useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";

import "./ColorPicker.scss";

type ColorPickerProps = {
  color: string;
  onChange: (color: string) => void;
};

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [pickerColor, setPickerColor] = useState(color || "#FFFFFF");
  const popoverRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync picker color from parent only when closed (avoids resetting during drag)
  useEffect(() => {
    if (!isOpen) {
      setPickerColor(color || "#FFFFFF");
    }
  }, [color, isOpen]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handlePickerChange = (newColor: string) => {
    setPickerColor(newColor);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => onChange(newColor), 40);
  };

  const handleInputChange = (newColor: string) => {
    setPickerColor(newColor);
    onChange(newColor);
  };

  return (
    <div className="banner-color-picker">
      <button
        type="button"
        className="banner-color-picker__preview"
        style={{ backgroundColor: pickerColor }}
        onClick={() => setIsOpen(open => !open)}
      />
      <HexColorInput
        className="banner-color-picker__input"
        color={pickerColor}
        onChange={handleInputChange}
      />
      {isOpen && (
        <div ref={popoverRef} className="banner-color-picker__popover">
          <HexColorPicker color={pickerColor} onChange={handlePickerChange} />
        </div>
      )}
    </div>
  );
}
