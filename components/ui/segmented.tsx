interface SegmentedOption {
  label: string;
  value: string;
}

interface SegmentedControlProps {
  name: string;
  options: SegmentedOption[];
  value: string;
  onChange: (value: string) => void;
}

export function SegmentedControl({ name, options, value, onChange }: SegmentedControlProps) {
  return (
    <div className="seg" role="radiogroup">
      {options.map((opt) => (
        <label className="seg-opt" key={opt.value}>
          <input
            type="radio"
            name={name}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
}
