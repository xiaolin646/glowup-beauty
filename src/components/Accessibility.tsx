import React, { useEffect, useRef } from 'react';

// 跳过导航链接 - 允许键盘用户快速跳转到主要内容
export const SkipLink: React.FC<{ targetId?: string }> = ({ targetId = 'main-content' }) => (
  <a
    href={`#${targetId}`}
    className="skip-to-content focus-visible:outline-pink-500"
  >
    跳转到主要内容
  </a>
);

// 主内容区域标记
export const MainContent: React.FC<{
  id?: string;
  children: React.ReactNode;
  className?: string;
}> = ({ id = 'main-content', children, className = '' }) => (
  <main id={id} tabIndex={-1} className={className}>
    {children}
  </main>
);

// 屏幕阅读器专用文本
export const ScreenReaderOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="sr-only">{children}</span>
);

// 可访问的加载状态
export const LoadingIndicator: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}> = ({ size = 'md', label = '加载中' }) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className="inline-flex items-center justify-center"
    >
      <div
        className={`${sizeMap[size]} border-2 border-pink-200 border-t-pink-500 rounded-full animate-spin`}
      />
      <ScreenReaderOnly>{label}</ScreenReaderOnly>
    </div>
  );
};

// 可访问的错误提示
export const ErrorAlert: React.FC<{
  message: string;
  onDismiss?: () => void;
}> = ({ message, onDismiss }) => (
  <div
    role="alert"
    aria-live="assertive"
    className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4"
  >
    <div className="flex items-start">
      <div className="flex-shrink-0">
        <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="ml-3 flex-1">
        <p className="text-sm text-red-800">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="关闭提示"
          className="ml-3 text-red-400 hover:text-red-600"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  </div>
);

// 可访问的成功提示
export const SuccessAlert: React.FC<{
  message: string;
  onDismiss?: () => void;
}> = ({ message, onDismiss }) => (
  <div
    role="status"
    aria-live="polite"
    className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4"
  >
    <div className="flex items-start">
      <div className="flex-shrink-0">
        <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="ml-3 flex-1">
        <p className="text-sm text-green-800">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="关闭提示"
          className="ml-3 text-green-400 hover:text-green-600"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  </div>
);

// 可访问的模态框
export const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  description?: string;
}> = ({ isOpen, onClose, title, children, description }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      modalRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      previousFocusRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby={description ? 'modal-description' : undefined}
    >
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full mx-4 p-6 focus:outline-none focus:ring-2 focus:ring-pink-500"
      >
        <div className="flex items-start justify-between mb-4">
          <h2 id="modal-title" className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="关闭对话框"
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {description && (
          <p id="modal-description" className="text-gray-600 dark:text-gray-300 mb-4">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
};

// 可访问的下拉菜单
export const AccessibleDropdown: React.FC<{
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
  options: { value: string; label: string }[];
}> = ({ label, isOpen, onToggle, onSelect, options }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        if (isOpen) onToggle();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onToggle]);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={label}
        className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        {label}
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <ul
          role="listbox"
          aria-label={label}
          className="absolute top-full left-0 mt-1 w-full bg-white dark:bg-gray-800 border rounded-lg shadow-lg z-10"
        >
          {options.map((option) => (
            <li key={option.value}>
              <button
                onClick={() => {
                  onSelect(option.value);
                  onToggle();
                }}
                role="option"
                className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
