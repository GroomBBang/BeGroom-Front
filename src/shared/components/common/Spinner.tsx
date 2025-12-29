interface Props {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Spinner({ size = 'md', className = '' }: Props) {
  const sizeClasses = {
    xs: 'h-4 w-4 border-2',
    sm: 'h-6 w-6 border-2',
    md: 'h-8 w-8 border-4',
    lg: 'h-12 w-12 border-4',
  };

  return (
    <div
      className={`
        animate-spin rounded-full 
        border-gray-200 border-t-primary-400
        ${sizeClasses[size]} 
        ${className}
      `}
    />
  );
}
