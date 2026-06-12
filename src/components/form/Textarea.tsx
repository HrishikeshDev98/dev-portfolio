import { TextareaInterface } from '@/interface'

const Textarea: React.FC<TextareaInterface> = ({
  label,
  name,
  placeholder,
  className = '',
  error,
  required = false,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={name} className="text-sm font-medium block">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        className={`px-4 py-2 rounded-lg border border-gray-300 resize-none outline-none ${className}`}
        {...props}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  )
}

export default Textarea
