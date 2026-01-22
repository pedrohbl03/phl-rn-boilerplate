import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { Text, Card } from '@/components';
import { useHomeViewModel } from '@/presentation/viewmodels';

/**
 * Tela Home - View no padrão MVVM
 * 
 * A View é responsável apenas por:
 * - Renderizar a UI
 * - Chamar ações do ViewModel
 * - Exibir dados do ViewModel
 * 
 * Toda a lógica está no ViewModel (useHomeViewModel)
 */
export function HomeScreen() {
  const vm = useHomeViewModel();

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-secondary-900">
      <ScrollView
        className="flex-1"
        contentContainerClassName="p-6 pb-32"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="items-center mb-8">
          <View className="w-24 h-24 rounded-full bg-primary-100 dark:bg-primary-900/30 items-center justify-center mb-4">
            <Ionicons name="rocket" size={48} color={vm.colors.iconColor} />
          </View>
          <Text variant="h1" className="text-center mb-2">
            {vm.title}
          </Text>
          <Text variant="body" className="text-center">
            {vm.subtitle}
          </Text>
        </View>

        {/* Description Card */}
        <Card className="mb-6">
          <Text variant="body" className="text-center">
            {vm.description}
          </Text>
        </Card>

        {/* Features Section */}
        <Text variant="h3" className="mb-4">
          {vm.featuresTitle}
        </Text>

        <View className="flex-row flex-wrap justify-between">
          {vm.features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              iconColor={vm.colors.iconColor}
            />
          ))}
        </View>

        {/* Get Started */}
        <Card variant="filled" className="mt-6 bg-primary-50 dark:bg-primary-900/30">
          <View className="flex-row items-center">
            <View className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-800 items-center justify-center mr-3">
              <Ionicons name="code-slash" size={20} color={vm.colors.iconColor} />
            </View>
            <Text variant="body" className="flex-1 text-primary-700 dark:text-primary-300">
              {vm.getStartedText}
            </Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

// Componente auxiliar para os cards de features
interface FeatureCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  iconColor: string;
}

function FeatureCard({ icon, title, description, iconColor }: FeatureCardProps) {
  return (
    <Card variant="outlined" className="w-[48%] mb-3">
      <View className="items-center py-2">
        <View className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 items-center justify-center mb-2">
          <Ionicons name={icon} size={24} color={iconColor} />
        </View>
        <Text variant="label" className="text-center">
          {title}
        </Text>
        <Text variant="caption" className="text-center mt-1">
          {description}
        </Text>
      </View>
    </Card>
  );
}
