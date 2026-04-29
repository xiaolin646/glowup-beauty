import { useState, useCallback } from 'react'

interface FormField {
  value: string
  error?: string
  touched: boolean
}

interface UseFormOptions<T extends Record<string, any>> {
  initialValues: T
  validate?: (values: T) => Partial<Record<keyof T, string>>
  onSubmit: (values: T) => Promise<void> | void
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isValid, setIsValid] = useState(true)

  const handleChange = useCallback((name: keyof T, value: string) => {
    setValues(prev => ({ ...prev, [name]: value }))
    
    if (validate) {
      const validationErrors = validate({ ...values, [name]: value })
      setErrors(validationErrors)
      setIsValid(Object.keys(validationErrors).length === 0)
    }
  }, [values, validate])

  const handleBlur = useCallback((name: keyof T) => {
    setTouched(prev => ({ ...prev, [name]: true }))
    
    if (validate) {
      const validationErrors = validate(values)
      setErrors(validationErrors)
    }
  }, [values, validate])

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault()
    
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key as keyof T] = true
      return acc
    }, {} as Record<keyof T, boolean>)
    
    setTouched(allTouched)
    
    if (validate) {
      const validationErrors = validate(values)
      setErrors(validationErrors)
      
      if (Object.keys(validationErrors).length > 0) {
        setIsValid(false)
        return
      }
    }
    
    setIsSubmitting(true)
    try {
      await onSubmit(values)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }, [values, validate, onSubmit])

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
    setIsValid(true)
  }, [initialValues])

  const getFieldProps = useCallback((name: keyof T) => ({
    value: values[name] || '',
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      handleChange(name, e.target.value)
    },
    onBlur: () => handleBlur(name),
    error: touched[name] ? errors[name] : undefined
  }), [values, touched, errors, handleChange, handleBlur])

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    getFieldProps,
    setValues,
    setErrors
  }
}

export default useForm
