import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

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
    <div className="space-y-2 md:border border-grey/30 md:p-6 rounded-xl md:mt-6">
      <h6 className="h6 text-dark-brown flex items-center gap-0.5 pb-1"><AiOutlineUsergroupAdd />Select how many guests</h6>
      {["adults", "children", "pets"].map(type => (
        <div key={type} className="flex items-center justify-between input max-w-80">
          <span className="capitalize font-medium">{type}</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleChange(type as keyof Guests, -1)}
              disabled={value[type as keyof Guests] === 0}
            ><CiCircleMinus className="w-8 h-8 text-grey" /></button>
            <span className="w-8 text-center">{value[type as keyof Guests]}</span>
            <button
              type="button"
              onClick={() => handleChange(type as keyof Guests, 1)}
            ><CiCirclePlus className="w-8 h-8 text-grey" /></button>
          </div>
        </div>
      ))}
    </div>
  );
};