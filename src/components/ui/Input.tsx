import React, { forwardRef, useState } from 'react';
import {
  TextInput,
  View,
  Text,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  containerClassName?: string;
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      leftIcon,
      rightIcon,
      onRightIconPress,
      containerClassName,
      secureTextEntry,
      className,
      ...props
    },
    ref
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const isPassword = secureTextEntry !== undefined;

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev);
    };

    return (
      <View className={`mb-4 ${containerClassName ?? ''}`}>
        {label && (
          <Text className="text-secondary-700 font-medium mb-2 text-sm">
            {label}
          </Text>
        )}
        <View
          className={`
            flex-row items-center rounded-xl border px-4
            ${error ? 'border-red-500 bg-red-50' : 'border-secondary-200 bg-secondary-50'}
          `}
        >
          {leftIcon && (
            <Ionicons
              name={leftIcon}
              size={20}
              color={error ? '#ef4444' : '#64748b'}
              style={{ marginRight: 8 }}
            />
          )}
          <TextInput
            ref={ref}
            className={`
              flex-1 py-3 text-secondary-900 text-base
              ${className ?? ''}
            `}
            placeholderTextColor="#94a3b8"
            secureTextEntry={isPassword && !isPasswordVisible}
            {...props}
          />
          {isPassword && (
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Ionicons
                name={isPasswordVisible ? 'eye-off' : 'eye'}
                size={20}
                color="#64748b"
              />
            </TouchableOpacity>
          )}
          {rightIcon && !isPassword && (
            <TouchableOpacity
              onPress={onRightIconPress}
              disabled={!onRightIconPress}
            >
              <Ionicons
                name={rightIcon}
                size={20}
                color={error ? '#ef4444' : '#64748b'}
              />
            </TouchableOpacity>
          )}
        </View>
        {error && (
          <Text className="text-red-500 text-xs mt-1">{error}</Text>
        )}
      </View>
    );
  }
);

Input.displayName = 'Input';
