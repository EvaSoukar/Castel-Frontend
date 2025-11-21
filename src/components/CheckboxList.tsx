type CheckboxListProps = {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
};

export const CheckboxList = ({ label, options, selected, onChange }: CheckboxListProps) => {
  const handleToggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter(item => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="mb-4">
      <p className="font-semibold mb-1">Select {label}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {options.map(option => (
          <label key={option} className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => handleToggle(option)}
              className="checkbox"
            />
            <span className="capitalize">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};