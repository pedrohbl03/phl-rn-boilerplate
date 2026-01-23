import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Device from 'expo-device';
import * as Application from 'expo-application';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { env } from '@/core/config/env';

/**
 * Rotas disponíveis para navegação rápida
 * Adicione novas rotas aqui conforme o app cresce
 */
const AVAILABLE_ROUTES = [
  { path: '/', label: 'Home', icon: 'home-outline' as const },
  { path: '/arch', label: 'Arquitetura', icon: 'layers-outline' as const },
  { path: '/settings', label: 'Configurações', icon: 'settings-outline' as const },
] as const;

/**
 * Botão flutuante de debug
 * Visível apenas em ambiente de desenvolvimento
 */
export function DebugFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'routes'>('info');
  const router = useRouter();

  const scale = useSharedValue(1);

  // Só renderiza em desenvolvimento
  if (!__DEV__ || !env.DEBUG) {
    return null;
  }

  const handlePressIn = () => {
    scale.value = withSpring(0.9);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const deviceInfo = {
    'Modelo': Device.modelName ?? 'N/A',
    'Device ID': Platform.OS === 'android' ? Application.getAndroidId() ?? 'N/A' : Device.osBuildId ?? 'N/A',
    'OS': `${Device.osName} ${Device.osVersion}`,
    'Device Type': getDeviceType(Device.deviceType),
    'Brand': Device.brand ?? 'N/A',
    'App Version': Application.nativeApplicationVersion ?? 'N/A',
    'Build': Application.nativeBuildVersion ?? 'N/A',
    'Bundle ID': Application.applicationId ?? 'N/A',
    'Expo SDK': Constants.expoConfig?.sdkVersion ?? 'N/A',
    'Environment': env.ENV,
    'API URL': env.API_URL,
    'Platform': Platform.OS,
    'Is Device': Device.isDevice ? 'Sim' : 'Não (Simulador)',
  };

  const navigateToRoute = (path: string) => {
    setIsOpen(false);
    router.push(path as any);
  };

  return (
    <>
      {/* FAB Button */}
      <Pressable
        onPress={() => setIsOpen(true)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.fabContainer}
      >
        <Animated.View style={[styles.fab, animatedStyle]}>
          <Ionicons name="bug-outline" size={24} color="#fff" />
        </Animated.View>
      </Pressable>

      {/* Debug Modal */}
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setIsOpen(false)}
        >
          <Pressable 
            style={styles.modalContent}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <View style={styles.modalHeader}>
              <View style={styles.headerLeft}>
                <Ionicons name="bug" size={24} color="#f59e0b" />
                <Text style={styles.modalTitle}>Debug Panel</Text>
              </View>
              <Pressable 
                onPress={() => setIsOpen(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#64748b" />
              </Pressable>
            </View>

            {/* Tabs */}
            <View style={styles.tabsContainer}>
              <Pressable
                style={[styles.tab, activeTab === 'info' && styles.tabActive]}
                onPress={() => setActiveTab('info')}
              >
                <Ionicons 
                  name="information-circle-outline" 
                  size={18} 
                  color={activeTab === 'info' ? '#f59e0b' : '#64748b'} 
                />
                <Text style={[styles.tabText, activeTab === 'info' && styles.tabTextActive]}>
                  Device Info
                </Text>
              </Pressable>
              <Pressable
                style={[styles.tab, activeTab === 'routes' && styles.tabActive]}
                onPress={() => setActiveTab('routes')}
              >
                <Ionicons 
                  name="navigate-outline" 
                  size={18} 
                  color={activeTab === 'routes' ? '#f59e0b' : '#64748b'} 
                />
                <Text style={[styles.tabText, activeTab === 'routes' && styles.tabTextActive]}>
                  Routes
                </Text>
              </Pressable>
            </View>

            {/* Content */}
            <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
              {activeTab === 'info' ? (
                <View style={styles.infoContainer}>
                  {Object.entries(deviceInfo).map(([key, value]) => (
                    <View key={key} style={styles.infoRow}>
                      <Text style={styles.infoLabel}>{key}</Text>
                      <Text style={styles.infoValue} numberOfLines={1}>
                        {value}
                      </Text>
                    </View>
                  ))}
                </View>
              ) : (
                <View style={styles.routesContainer}>
                  <Text style={styles.routesHint}>
                    Navegue rapidamente entre as telas do app:
                  </Text>
                  {AVAILABLE_ROUTES.map((route) => (
                    <Pressable
                      key={route.path}
                      style={styles.routeButton}
                      onPress={() => navigateToRoute(route.path)}
                    >
                      <Ionicons name={route.icon} size={20} color="#f59e0b" />
                      <View style={styles.routeInfo}>
                        <Text style={styles.routeLabel}>{route.label}</Text>
                        <Text style={styles.routePath}>{route.path}</Text>
                      </View>
                      <Ionicons name="chevron-forward" size={20} color="#64748b" />
                    </Pressable>
                  ))}
                </View>
              )}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

function getDeviceType(type: Device.DeviceType | null): string {
  switch (type) {
    case Device.DeviceType.PHONE:
      return 'Phone';
    case Device.DeviceType.TABLET:
      return 'Tablet';
    case Device.DeviceType.DESKTOP:
      return 'Desktop';
    case Device.DeviceType.TV:
      return 'TV';
    default:
      return 'Unknown';
  }
}

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: 100,
    right: 16,
    zIndex: 9999,
  },
  fab: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f59e0b',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f8fafc',
  },
  closeButton: {
    padding: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#f59e0b',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  tabTextActive: {
    color: '#f59e0b',
  },
  scrollContent: {
    padding: 16,
  },
  infoContainer: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#0f172a',
    borderRadius: 8,
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#94a3b8',
    flex: 1,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#f8fafc',
    flex: 1,
    textAlign: 'right',
  },
  routesContainer: {
    gap: 8,
  },
  routesHint: {
    fontSize: 13,
    color: '#94a3b8',
    marginBottom: 8,
  },
  routeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: '#0f172a',
    borderRadius: 8,
  },
  routeInfo: {
    flex: 1,
  },
  routeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f8fafc',
  },
  routePath: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
});
