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
      <p className="font-semibold mb-1">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map(option => (
          <label key={option} className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => handleToggle(option)}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};