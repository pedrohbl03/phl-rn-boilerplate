import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { Text, Card } from '@/components';
import { useArchViewModel } from '@/presentation/viewmodels';

/**
 * Tela Arquitetura - View no padrão MVVM
 * 
 * A View é responsável apenas por:
 * - Renderizar a UI
 * - Exibir dados do ViewModel
 * 
 * Toda a lógica está no ViewModel (useArchViewModel)
 */
export function ArchScreen() {
  const vm = useArchViewModel();

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
            <Ionicons name="git-network" size={40} color={vm.colors.iconColor} />
          </View>
          <Text variant="h1" className="text-center mb-2">
            {vm.mvvmTitle}
          </Text>
          <Text variant="body" className="text-center">
            {vm.mvvmDescription}
          </Text>
        </View>

        {/* MVVM Components */}
        <View className="mb-6">
          {vm.mvvmComponents.map((component, index) => (
            <MVVMCard
              key={index}
              icon={component.icon}
              title={component.title}
              description={component.description}
              color={component.color}
            />
          ))}
        </View>

        {/* Benefits */}
        <Text variant="h3" className="mb-4">
          {vm.benefitsTitle}
        </Text>

        <Card className="mb-6">
          {vm.benefits.map((benefit, index) => (
            <BenefitItem
              key={index}
              text={benefit}
              iconColor={vm.colors.iconColor}
            />
          ))}
        </Card>

        {/* Folder Structure */}
        <Text variant="h3" className="mb-4">
          {vm.structureTitle}
        </Text>

        <Card variant="filled">
          <View>
            {vm.folderStructure.map((item, index) => (
              <FolderLine
                key={index}
                text={item.text}
                isFolder={item.isFolder}
              />
            ))}
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

// Componente auxiliar para cards MVVM
interface MVVMCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  color: string;
}

function MVVMCard({ icon, title, description, color }: MVVMCardProps) {
  return (
    <Card variant="outlined" className="mb-3">
      <View className="flex-row items-start">
        <View
          className="w-12 h-12 rounded-xl items-center justify-center mr-4"
          style={{ backgroundColor: `${color}20` }}
        >
          <Ionicons name={icon} size={24} color={color} />
        </View>
        <View className="flex-1">
          <Text variant="h3" className="mb-1">
            {title}
          </Text>
          <Text variant="caption">
            {description}
          </Text>
        </View>
      </View>
    </Card>
  );
}

// Helper component for benefit items
interface BenefitItemProps {
  text: string;
  iconColor: string;
}

function BenefitItem({ text, iconColor }: BenefitItemProps) {
  return (
    <View className="flex-row items-center mb-3 last:mb-0">
      <View className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 items-center justify-center mr-3">
        <Ionicons name="checkmark" size={14} color={iconColor} />
      </View>
      <Text variant="body" className="flex-1">
        {text}
      </Text>
    </View>
  );
}

// Componente auxiliar para linhas da estrutura de pastas
interface FolderLineProps {
  text: string;
  isFolder?: boolean;
}

function FolderLine({ text, isFolder }: FolderLineProps) {
  return (
    <Text 
      variant="caption" 
      className={`font-mono leading-6 ${isFolder ? 'text-primary-600 dark:text-primary-400' : ''}`}
    >
      {text}
    </Text>
  );
}
