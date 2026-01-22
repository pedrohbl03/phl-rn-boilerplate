import React, { useEffect } from 'react';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

const TOGGLE_WIDTH = 64;
const INDICATOR_SIZE = 24;
const PADDING = 4;
const TRAVEL_DISTANCE = TOGGLE_WIDTH - INDICATOR_SIZE - PADDING * 2;

/**
 * Componente de toggle para alternar entre dark/light mode
 * Exibe um ícone de lua ou sol com animação de rotação
 */
export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  const progress = useSharedValue(isDark ? 1 : 0);

  useEffect(() => {
    progress.value = withSpring(isDark ? 1 : 0, {
      damping: 15,
      stiffness: 120,
    });
  }, [isDark, progress]);

  // Animação do indicador (translação + rotação)
  const indicatorStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      progress.value,
      [0, 1],
      [0, TRAVEL_DISTANCE],
      Extrapolation.CLAMP
    );

    const rotate = interpolate(
      progress.value,
      [0, 1],
      [0, 360],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        { translateX },
        { rotate: `${rotate}deg` },
      ],
    };
  });

  // Animação do background
  const backgroundStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolate(
      progress.value,
      [0, 1],
      [0, 1],
      Extrapolation.CLAMP
    );

    return {
      backgroundColor: backgroundColor > 0.5 ? '#334155' : '#e2e8f0',
    };
  });

  // Animação do indicador background
  const indicatorBgStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: progress.value > 0.5 ? '#0f172a' : '#ffffff',
    };
  });

  // Animação da escala do ícone
  const iconStyle = useAnimatedStyle(() => {
    const scale = withTiming(1, { duration: 200 });
    
    return {
      transform: [{ scale }],
    };
  });

  return (
    <Pressable onPress={onToggle}>
      <Animated.View
        style={[
          {
            width: TOGGLE_WIDTH,
            height: 32,
            borderRadius: 16,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: PADDING,
          },
          backgroundStyle,
        ]}
      >
        <Animated.View
          style={[
            {
              width: INDICATOR_SIZE,
              height: INDICATOR_SIZE,
              borderRadius: INDICATOR_SIZE / 2,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            },
            indicatorStyle,
            indicatorBgStyle,
          ]}
        >
          <Animated.View style={iconStyle}>
            <Ionicons
              name={isDark ? 'moon' : 'sunny'}
              size={14}
              color={isDark ? '#fbbf24' : '#f59e0b'}
            />
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}
