import * as React from "react"

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, label, ...props }, ref) => {
        return (
            <div className="flex items-center">
                <input
                    type="checkbox"
                    className={`form-checkbox h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded ${className}`}
                    ref={ref}
                    {...props}
                />
                {label && (
                    <label htmlFor={props.id} className="ml-2 block text-sm text-gray-900">
                        {label}
                    </label>
                )}
            </div>
        )
    }
)

Checkbox.displayName = "Checkbox"

