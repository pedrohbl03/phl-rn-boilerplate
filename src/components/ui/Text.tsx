import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

type TextVariant = 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';

interface TextProps extends RNTextProps {
  variant?: TextVariant;
}

const variantStyles: Record<TextVariant, string> = {
  h1: 'text-3xl font-bold text-secondary-900 dark:text-white',
  h2: 'text-2xl font-semibold text-secondary-900 dark:text-white',
  h3: 'text-xl font-semibold text-secondary-800 dark:text-white',
  body: 'text-base text-secondary-700 dark:text-secondary-300',
  caption: 'text-sm text-secondary-500 dark:text-secondary-400',
  label: 'text-sm font-medium text-secondary-700 dark:text-white',
};

export function Text({
  variant = 'body',
  className,
  children,
  ...props
}: TextProps) {
  return (
    <RNText
      className={`${variantStyles[variant]} ${className ?? ''}`}
      {...props}
    >
      {children}
    </RNText>
  );
}
