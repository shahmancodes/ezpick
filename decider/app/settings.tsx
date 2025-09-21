import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Moon, Sun } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Fonts } from '@/constants/fonts';

export default function SettingsScreen() {
  const { isDarkMode, toggleDarkMode, colors } = useTheme();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={{ 
            paddingHorizontal: 24, 
            paddingVertical: 20, 
            backgroundColor: colors.surface,
            shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 8,
            elevation: 2
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <TouchableOpacity
                onPress={handleGoBack}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: colors.background,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ArrowLeft size={20} color={colors.textSecondary} />
              </TouchableOpacity>
              
              <Text style={{ 
                fontSize: 24, 
                fontFamily: Fonts.bold,
                color: colors.text
              }}>
                Settings
              </Text>
              
              <View style={{ width: 40 }} />
            </View>
          </View>

          {/* Settings Content */}
          <View style={{ paddingHorizontal: 24, paddingVertical: 32 }}>
            {/* Appearance Section */}
            <View style={{
              backgroundColor: colors.surface,
              borderRadius: 16,
              padding: 24,
              shadowColor: colors.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 8,
              elevation: 2
            }}>
              <Text style={{
                fontSize: 18,
                fontFamily: Fonts.semiBold,
                color: colors.text,
                marginBottom: 20
              }}>
                Appearance
              </Text>

              {/* Dark Mode Toggle */}
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 16,
                borderBottomWidth: 1,
                borderBottomColor: colors.border
              }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <View style={{
                    width: 40,
                    height: 40,
                    backgroundColor: isDarkMode ? '#1e293b' : '#f1f5f9',
                    borderRadius: 12,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {isDarkMode ? (
                      <Moon size={20} color="#94a3b8" />
                    ) : (
                      <Sun size={20} color="#64748b" />
                    )}
                  </View>
                  
                  <View>
                    <Text style={{
                      fontSize: 16,
                      fontFamily: Fonts.medium,
                      color: colors.text
                    }}>
                      Dark Mode
                    </Text>
                    <Text style={{
                      fontSize: 14,
                      fontFamily: Fonts.regular,
                      color: colors.textSecondary
                    }}>
                      {isDarkMode ? 'Dark theme enabled' : 'Light theme enabled'}
                    </Text>
                  </View>
                </View>

                <Switch
                  value={isDarkMode}
                  onValueChange={toggleDarkMode}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={isDarkMode ? '#ffffff' : '#ffffff'}
                />
              </View>
            </View>

            {/* About Section */}
            <View style={{
              backgroundColor: colors.surface,
              borderRadius: 16,
              padding: 24,
              marginTop: 16,
              shadowColor: colors.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 8,
              elevation: 2
            }}>
              <Text style={{
                fontSize: 18,
                fontFamily: Fonts.semiBold,
                color: colors.text,
                marginBottom: 16
              }}>
                About
              </Text>

              <View style={{ gap: 12 }}>
                <View>
                  <Text style={{
                    fontSize: 14,
                    fontFamily: Fonts.medium,
                    color: colors.text
                  }}>
                    Version
                  </Text>
                  <Text style={{
                    fontSize: 14,
                    fontFamily: Fonts.regular,
                    color: colors.textSecondary
                  }}>
                    1.0.0
                  </Text>
                </View>

                <View>
                  <Text style={{
                    fontSize: 14,
                    fontFamily: Fonts.medium,
                    color: colors.text
                  }}>
                    Description
                  </Text>
                  <Text style={{
                    fontSize: 14,
                    fontFamily: Fonts.regular,
                    color: colors.textSecondary,
                    lineHeight: 20
                  }}>
                    EzPick helps you make decisions by rolling the dice. Choose from food, places, movies, or games and let fate decide!
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}