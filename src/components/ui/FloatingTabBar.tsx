import React, { useEffect } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  interpolateColor,
} from 'react-native-reanimated';

import { useTheme } from '@/providers/ThemeProvider';

/**
 * Tab Bar flutuante e moderna
 * 
 * Pode ser facilmente customizada alterando as constantes abaixo
 * ou removida passando tabBar={() => null} nas screenOptions
 */

// Configurações de estilo - customize aqui
const TAB_BAR_CONFIG = {
  height: 64,
  borderRadius: 32,
  marginHorizontal: 24,
  marginBottom: 24,
  paddingHorizontal: 8,
};

interface FloatingTabBarProps extends BottomTabBarProps {
  // Props adicionais customizadas podem ser adicionadas aqui
}

export function FloatingTabBar({ state, descriptors, navigation }: FloatingTabBarProps) {
  const { isDark } = useTheme();

  const backgroundColor = isDark ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)';
  const borderColor = isDark ? 'rgba(71, 85, 105, 0.5)' : 'rgba(226, 232, 240, 0.8)';
  const shadowOpacity = isDark ? 0.3 : 0.15;

  return (
    <View style={[styles.container, { marginHorizontal: TAB_BAR_CONFIG.marginHorizontal, marginBottom: TAB_BAR_CONFIG.marginBottom }]}>
      <View
        style={[
          styles.tabBar,
          {
            height: TAB_BAR_CONFIG.height,
            borderRadius: TAB_BAR_CONFIG.borderRadius,
            paddingHorizontal: TAB_BAR_CONFIG.paddingHorizontal,
            backgroundColor,
            borderColor,
            shadowOpacity,
          },
        ]}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.title ?? route.name;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          // Define ícones para cada rota
          const iconName = getIconName(route.name, isFocused);

          return (
            <TabItem
              key={route.key}
              label={label}
              iconName={iconName}
              isFocused={isFocused}
              isDark={isDark}
              onPress={onPress}
              onLongPress={onLongPress}
            />
          );
        })}
      </View>
    </View>
  );
}

// Mapeamento de ícones por rota
function getIconName(routeName: string, focused: boolean): keyof typeof Ionicons.glyphMap {
  const icons: Record<string, { active: keyof typeof Ionicons.glyphMap; inactive: keyof typeof Ionicons.glyphMap }> = {
    index: { active: 'home', inactive: 'home-outline' },
    arch: { active: 'layers', inactive: 'layers-outline' },
    settings: { active: 'settings', inactive: 'settings-outline' },
  };

  const icon = icons[routeName] ?? { active: 'ellipse', inactive: 'ellipse-outline' };
  return focused ? icon.active : icon.inactive;
}

interface TabItemProps {
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
  isFocused: boolean;
  isDark: boolean;
  onPress: () => void;
  onLongPress: () => void;
}

function TabItem({ label, iconName, isFocused, isDark, onPress, onLongPress }: TabItemProps) {
  const activeColor = isDark ? '#60a5fa' : '#2563eb';
  const inactiveColor = isDark ? '#64748b' : '#94a3b8';
  const color = isFocused ? activeColor : inactiveColor;
  const activeBg = isDark ? 'rgba(96, 165, 250, 0.15)' : 'rgba(37, 99, 235, 0.1)';

  // Animações
  const scale = useSharedValue(1);
  const progress = useSharedValue(isFocused ? 1 : 0);

  useEffect(() => {
    // Entrada: spring para efeito mais dinâmico
    // Saída: timing para transição suave sem bounce
    if (isFocused) {
      progress.value = withSpring(1, { damping: 20, stiffness: 300 });
    } else {
      progress.value = withTiming(0, { duration: 200 });
    }
  }, [isFocused, progress]);

  const containerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.value, [0, 1], ['transparent', activeBg]),
    paddingHorizontal: interpolate(progress.value, [0, 1], [12, 16]),
  }));

  const labelStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0, 1]),
    maxWidth: interpolate(progress.value, [0, 1], [0, 100]),
    marginLeft: interpolate(progress.value, [0, 1], [0, 8]),
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.95, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
  };

  const pressStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.tabItemPressable}
    >
      <Animated.View style={[styles.tabItem, containerStyle, pressStyle]}>
        <Ionicons name={iconName} size={22} color={color} />
        <Animated.Text
          style={[styles.label, { color }, labelStyle]}
          numberOfLines={1}
        >
          {label}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 20,
  },
  tabItemPressable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    borderRadius: 22,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    overflow: 'hidden',
  },
});
