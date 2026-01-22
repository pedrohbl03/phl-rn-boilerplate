import React from 'react';
import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  variant?: 'elevated' | 'outlined' | 'filled';
}

const variantStyles: Record<string, string> = {
  elevated: 'bg-white dark:bg-secondary-800 shadow-md shadow-black/10',
  outlined: 'bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700',
  filled: 'bg-secondary-50 dark:bg-secondary-800',
};

export function Card({
  variant = 'elevated',
  className,
  children,
  ...props
}: CardProps) {
  return (
    <View
      className={`rounded-2xl p-4 ${variantStyles[variant]} ${className ?? ''}`}
      {...props}
    >
      {children}
    </View>
  );
}
