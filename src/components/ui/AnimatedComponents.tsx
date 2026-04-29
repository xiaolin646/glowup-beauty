import { forwardRef, ButtonHTMLAttributes, InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, variant = 'primary', size = 'md', loading, className = '', ...props }, ref) => {
    const baseStyles = 'relative overflow-hidden font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]'
    
    const variants = {
      primary: 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 shadow-lg hover:shadow-xl',
      secondary: 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700',
      ghost: 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
    }
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={loading}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-inherit">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <span className={loading ? 'opacity-0' : ''}>{children}</span>
      </button>
    )
  }
)

AnimatedButton.displayName = 'AnimatedButton'

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const AnimatedCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700',
          'transition-all duration-200 hover:-translate-y-1 hover:shadow-lg',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

AnimatedCard.displayName = 'AnimatedCard'

interface AnimatedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const AnimatedInput = forwardRef<HTMLInputElement, AnimatedInputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full animate-fade-in">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-4 py-2 rounded-lg border transition-all duration-200',
            'bg-white dark:bg-gray-800 text-gray-900 dark:text-white',
            'placeholder-gray-400 dark:placeholder-gray-500',
            'focus:outline-none focus:ring-2 focus:border-pink-500 dark:focus:border-pink-400',
            error 
              ? 'border-red-500 focus:ring-red-200' 
              : 'border-gray-300 dark:border-gray-600 focus:ring-pink-200 dark:focus:ring-pink-800',
            'hover:scale-[1.01] focus:scale-[1.01]',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500 animate-fade-in">
            {error}
          </p>
        )}
      </div>
    )
  }
)

AnimatedInput.displayName = 'AnimatedInput'

export const AnimatedFadeIn = ({ 
  children, 
  delay = 0,
  direction = 'up' 
}: { 
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}) => {
  const directionClasses = {
    up: 'translate-y-5',
    down: '-translate-y-5',
    left: 'translate-x-5',
    right: '-translate-x-5'
  }

  return (
    <div 
      className="animate-fade-in"
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: 'both'
      }}
    >
      {children}
    </div>
  )
}

export const AnimatedScale = ({ 
  children, 
  delay = 0 
}: { 
  children: React.ReactNode
  delay?: number
}) => {
  return (
    <div 
      className="animate-scale-in"
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: 'both'
      }}
    >
      {children}
    </div>
  )
}

export const AnimatedList = ({ 
  children, 
  staggerDelay = 100 
}: { 
  children: React.ReactNode[]
  staggerDelay?: number
}) => {
  return (
    <>
      {children.map((child, index) => (
        <div
          key={index}
          className="animate-fade-in"
          style={{ 
            animationDelay: `${index * staggerDelay}ms`,
            animationFillMode: 'both'
          }}
        >
          {child}
        </div>
      ))}
    </>
  )
}

export const AnimatedSuccess = ({ message }: { message: string }) => (
  <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg animate-scale-in">
    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
    <span className="text-sm text-green-700 dark:text-green-300">{message}</span>
  </div>
)

export const AnimatedError = ({ message }: { message: string }) => (
  <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg animate-shake">
    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
    <span className="text-sm text-red-700 dark:text-red-300">{message}</span>
  </div>
)
