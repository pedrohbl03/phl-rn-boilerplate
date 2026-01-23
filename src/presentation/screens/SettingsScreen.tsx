import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { Text, Card, ThemeToggle } from '@/components';
import { useSettingsViewModel } from '@/presentation/viewmodels';
import type { Language } from '@/stores/app.store';

/**
 * Tela Settings - View no padrão MVVM
 * 
 * A View é responsável apenas por:
 * - Renderizar a UI
 * - Chamar ações do ViewModel
 * - Exibir dados do ViewModel
 * 
 * Toda a lógica está no ViewModel (useSettingsViewModel)
 */
export function SettingsScreen() {
  const vm = useSettingsViewModel();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-secondary-900">
      <ScrollView
        className="flex-1"
        contentContainerClassName="p-6 pb-32"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="items-center mb-8">
          <View className="w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900/30 items-center justify-center mb-4">
            <Ionicons name="settings" size={40} color={vm.colors.iconColor} />
          </View>
          <Text variant="h1" className="text-center">
            {vm.title}
          </Text>
        </View>

        {/* Appearance Section */}
        <Text variant="h3" className="mb-4">
          {vm.appearanceTitle}
        </Text>

        <Card className="mb-6">
          {/* Theme Toggle */}
          <View className="flex-row items-center justify-between py-2">
            <View className="flex-row items-center flex-1">
              <View className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 items-center justify-center mr-3">
                <Ionicons
                  name={vm.isDark ? 'moon' : 'sunny'}
                  size={20}
                  color={vm.colors.iconColor}
                />
              </View>
              <View className="flex-1">
                <Text variant="label">
                  {vm.themeLabel}
                </Text>
                <Text variant="caption">
                  {vm.themeDescription}
                </Text>
              </View>
            </View>
            <ThemeToggle isDark={vm.isDark} onToggle={vm.handleToggleTheme} />
          </View>
        </Card>

        {/* Language Section */}
        <Text variant="h3" className="mb-4">
          {vm.preferencesTitle}
        </Text>

        <Card className="mb-6">
          <View>
            <View className="flex-row items-center mb-3">
              <View className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 items-center justify-center mr-3">
                <Ionicons name="language" size={20} color={vm.colors.iconColor} />
              </View>
              <View className="flex-1">
                <Text variant="label">
                  {vm.languageLabel}
                </Text>
                <Text variant="caption">
                  {vm.languageDescription}
                </Text>
              </View>
            </View>

            {/* Language Options */}
            <View className="mt-3">
              {vm.languageOptions.map((option) => (
                <LanguageOption
                  key={option.value}
                  label={option.label}
                  value={option.value}
                  currentValue={vm.language}
                  onSelect={vm.handleLanguageChange}
                  isDark={vm.isDark}
                  flag={option.flag}
                  iconColor={vm.colors.iconColor}
                />
              ))}
            </View>
          </View>
        </Card>

        {/* Info Card */}
        <Card variant="filled" className="bg-primary-50 dark:bg-primary-900/30">
          <View className="flex-row items-center">
            <View className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-800 items-center justify-center mr-3">
              <Ionicons name="information-circle" size={20} color={vm.colors.iconColor} />
            </View>
            <Text variant="caption" className="flex-1 text-primary-700 dark:text-primary-300">
              {vm.infoText}
            </Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

// Helper component for language options
interface LanguageOptionProps {
  label: string;
  value: Language;
  currentValue: Language;
  onSelect: (value: Language) => void;
  isDark: boolean;
  flag: string;
  iconColor: string;
}

function LanguageOption({
  label,
  value,
  currentValue,
  onSelect,
  isDark,
  flag,
  iconColor,
}: LanguageOptionProps) {
  const isSelected = value === currentValue;

  return (
    <TouchableOpacity
      onPress={() => onSelect(value)}
      className={`
        flex-row items-center justify-between p-4 rounded-xl border mb-2
        ${isSelected 
          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30' 
          : 'border-secondary-200 dark:border-secondary-700'
        }
      `}
      activeOpacity={0.7}
    >
      <View className="flex-row items-center">
        <Text className="text-2xl mr-3">{flag}</Text>
        <Text variant="body">
          {label}
        </Text>
      </View>
      {isSelected && (
        <Ionicons name="checkmark-circle" size={24} color={iconColor} />
      )}
    </TouchableOpacity>
  );
}
