import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'transparent' | 'outline' | 'ghost' | 'expandIcon' | 'secondary';
  size?: 'default' | 'lg' | 'icon';
  asChild?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  size = 'default',
  asChild = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background';
  const variantStyles = {
    default: 'bg-teal-600 text-white hover:bg-teal-700',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    transparent:
        "bg-transparent",
    expandIcon:
        "group relative text-primary-foreground bg-primary hover:bg-primary/90",
  };
  const sizeStyles = {
    default: 'h-10 py-2 px-4',
    lg: 'h-11 px-8',
    icon: 'h-10 w-10'
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (asChild) {
    return React.Children.map(children, child =>
      React.cloneElement(child as React.ReactElement, {
        className: `${(child as React.ReactElement).props.className || ''} ${combinedClassName}`,
        ...props
      })
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};

