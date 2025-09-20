type BedCountInputProps = {
  value: number;
  onChange?: (value: number) => void;
};

const options = [4, 9, 16, 36, 64, 132, 256, 529, 1024];

export default function BedCountInput({ value, onChange }: BedCountInputProps) {
  return (
    <label className="flex items-center gap-2 text-sm text-gray-700">
      Beds:
      <select
        value={value}
        onChange={(e) => onChange?.(Number(e.target.value))}
        className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((count) => (
          <option key={count} value={count}>
            {count}
          </option>
        ))}
      </select>
    </label>
  );
}
