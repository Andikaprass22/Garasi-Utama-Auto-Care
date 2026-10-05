import { cn } from '../../lib/cn';
import { Icon } from './Icon';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  invalid?: boolean;
  describedBy?: string;
}

export function Select({
  id,
  value,
  onChange,
  options,
  placeholder,
  invalid,
  describedBy,
}: SelectProps) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        className={cn(
          'w-full appearance-none rounded-xl border bg-surface-2 px-3.5 py-2.5 pr-10 text-base text-ink outline-none transition-colors sm:text-sm',
          invalid ? 'border-red-500' : 'border-line focus:border-brand-strong',
        )}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Icon
        name="chevron"
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
      />
    </div>
  );
}
