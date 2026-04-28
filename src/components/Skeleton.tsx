import React from 'react';

interface SkeletonProps {
  type?: 'text' | 'title' | 'image' | 'card' | 'avatar' | 'button';
  count?: number;
  className?: string;
  height?: string | number;
  width?: string | number;
}

const Skeleton: React.FC<SkeletonProps> = ({
  type = 'text',
  count = 1,
  className = '',
  height,
  width,
}) => {
  const getStyles = () => {
    const baseStyles: React.CSSProperties = {};
    if (height) baseStyles.height = typeof height === 'number' ? `${height}px` : height;
    if (width) baseStyles.width = typeof width === 'number' ? `${width}px` : width;
    return baseStyles;
  };

  const skeletonTypes = {
    text: (
      <div
        className={`skeleton-text ${className}`}
        style={{
          height: '16px',
          marginBottom: '8px',
          borderRadius: '4px',
          ...getStyles(),
        }}
      />
    ),
    title: (
      <div
        className={`skeleton-title ${className}`}
        style={{
          height: '24px',
          width: '60%',
          marginBottom: '12px',
          borderRadius: '4px',
          ...getStyles(),
        }}
      />
    ),
    image: (
      <div
        className={`skeleton-image ${className}`}
        style={{
          width: '100%',
          height: '200px',
          borderRadius: '8px',
          ...getStyles(),
        }}
      />
    ),
    card: (
      <div
        className={`skeleton-card ${className}`}
        style={{
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '16px',
          ...getStyles(),
        }}
      >
        <div className="skeleton-image" style={{ height: '150px', marginBottom: '12px' }} />
        <div className="skeleton-title" style={{ height: '20px', width: '80%' }} />
        <div className="skeleton-text" style={{ height: '14px', width: '60%' }} />
        <div className="skeleton-text" style={{ height: '14px', width: '40%' }} />
      </div>
    ),
    avatar: (
      <div
        className={`skeleton-avatar ${className}`}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          ...getStyles(),
        }}
      />
    ),
    button: (
      <div
        className={`skeleton-button ${className}`}
        style={{
          width: '120px',
          height: '40px',
          borderRadius: '8px',
          ...getStyles(),
        }}
      />
    ),
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="skeleton-wrapper">
          {skeletonTypes[type]}
        </div>
      ))}
    </>
  );
};

export default Skeleton;

// 预置骨架屏组件
export const ProductCardSkeleton: React.FC = () => (
  <div className="animate-pulse">
    <Skeleton type="image" />
    <div className="mt-3 space-y-2">
      <Skeleton type="title" />
      <Skeleton type="text" width="40%" />
      <div className="flex items-center gap-2">
        <Skeleton type="avatar" />
        <Skeleton type="text" width="30%" />
      </div>
    </div>
  </div>
);

export const ProductListSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {Array.from({ length: count }).map((_, index) => (
      <ProductCardSkeleton key={index} />
    ))}
  </div>
);

export const ProfileSkeleton: React.FC = () => (
  <div className="animate-pulse space-y-4">
    <div className="flex items-center gap-4">
      <Skeleton type="avatar" width={80} height={80} />
      <div className="space-y-2 flex-1">
        <Skeleton type="title" width="40%" />
        <Skeleton type="text" width="60%" />
      </div>
    </div>
    <Skeleton type="card" />
    <Skeleton type="card" />
  </div>
);
