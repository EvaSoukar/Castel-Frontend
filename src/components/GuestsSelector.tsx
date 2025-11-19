import React, { useState } from "react";

export type Guests = {
  adults: number;
  children: number;
  pets: number;
};

type Props = {
  value: Guests;
  onChange: (guests: Guests) => void;
};

export const GuestsSelector = ({ value, onChange }: Props) => {
  const handleChange = (type: keyof Guests, delta: number) => {
    const updated = { ...value, [type]: Math.max(0, value[type] + delta) };
    onChange(updated);
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-white max-w-xs">
      <h4 className="font-semibold mb-2">Select how many guests</h4>
      {["adults", "children", "pets"].map(type => (
        <div key={type} className="flex items-center justify-between">
          <span className="capitalize font-medium">{type}</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="px-2 py-1 bg-gray-200 rounded"
              onClick={() => handleChange(type as keyof Guests, -1)}
              disabled={value[type as keyof Guests] === 0}
            >-</button>
            <span className="w-8 text-center">{value[type as keyof Guests]}</span>
            <button
              type="button"
              className="px-2 py-1 bg-gray-200 rounded"
              onClick={() => handleChange(type as keyof Guests, 1)}
            >+</button>
          </div>
        </div>
      ))}
    </div>
  );
};