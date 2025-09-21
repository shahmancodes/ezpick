import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Moon, Sun, Volume2, VolumeX } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const { isDarkMode, toggleDarkMode, colors, fonts } = useTheme();
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  // Load audio setting from storage
  useEffect(() => {
    loadAudioSetting();
  }, []);

  const loadAudioSetting = async () => {
    try {
      const savedSetting = await AsyncStorage.getItem('audioEnabled');
      if (savedSetting !== null) {
        setIsAudioEnabled(JSON.parse(savedSetting));
      }
    } catch (error) {
      console.log('Error loading audio setting:', error);
    }
  };

  const saveAudioSetting = async (value: boolean) => {
    try {
      await AsyncStorage.setItem('audioEnabled', JSON.stringify(value));
    } catch (error) {
      console.log('Error saving audio setting:', error);
    }
  };

  const handleAudioToggle = (value: boolean) => {
    setIsAudioEnabled(value);
    saveAudioSetting(value);
  };

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
                fontFamily: fonts.bold,
                color: colors.text
              }}>
                Settings
              </Text>
              
              <View style={{ width: 40 }} />
            </View>
          </View>

          {/* Settings Content */}
          <View style={{ paddingHorizontal: 24, paddingVertical: 32 }}>
            {/* Audio Settings */}
            <View style={{
              backgroundColor: colors.surface,
              borderRadius: 16,
              padding: 20,
              marginBottom: 24,
              shadowColor: colors.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 8,
              elevation: 2
            }}>
              <Text style={{
                fontSize: 18,
                fontFamily: fonts.semiBold,
                color: colors.text,
                marginBottom: 16
              }}>
                Audio
              </Text>
              
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 8
              }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  {isAudioEnabled ? (
                    <Volume2 size={24} color={colors.primary} />
                  ) : (
                    <VolumeX size={24} color={colors.textSecondary} />
                  )}
                  <View>
                    <Text style={{
                      fontSize: 16,
                      fontFamily: fonts.medium,
                      color: colors.text
                    }}>
                      Dice Roll Sound
                    </Text>
                    <Text style={{
                      fontSize: 14,
                      fontFamily: fonts.regular,
                      color: colors.textSecondary
                    }}>
                      {isAudioEnabled ? 'Sound enabled' : 'Sound muted'}
                    </Text>
                  </View>
                </View>
                
                <Switch
                  value={isAudioEnabled}
                  onValueChange={handleAudioToggle}
                  trackColor={{ 
                    false: colors.border, 
                    true: colors.primary + '40' 
                  }}
                  thumbColor={isAudioEnabled ? colors.primary : colors.textSecondary}
                />
              </View>
            </View>

            {/* Theme Settings */}
            <View style={{
              backgroundColor: colors.surface,
              borderRadius: 16,
              padding: 20,
              marginBottom: 24,
              shadowColor: colors.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 8,
              elevation: 2
            }}>
              <Text style={{
                fontSize: 18,
                fontFamily: fonts.semiBold,
                color: colors.text,
                marginBottom: 16
              }}>
                Appearance
              </Text>
              
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 8
              }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  {isDarkMode ? (
                    <Moon size={24} color={colors.primary} />
                  ) : (
                    <Sun size={24} color={colors.primary} />
                  )}
                  <View>
                    <Text style={{
                      fontSize: 16,
                      fontFamily: fonts.medium,
                      color: colors.text
                    }}>
                      Dark Mode
                    </Text>
                    <Text style={{
                      fontSize: 14,
                      fontFamily: fonts.regular,
                      color: colors.textSecondary
                    }}>
                      {isDarkMode ? 'Dark theme enabled' : 'Light theme enabled'}
                    </Text>
                  </View>
                </View>
                
                <Switch
                  value={isDarkMode}
                  onValueChange={toggleDarkMode} // Use the theme context function directly
                  trackColor={{ 
                    false: colors.border, 
                    true: colors.primary + '40' 
                  }}
                  thumbColor={isDarkMode ? colors.primary : colors.textSecondary}
                />
              </View>
            </View>

            {/* App Info */}
            <View style={{
              backgroundColor: colors.surface,
              borderRadius: 16,
              padding: 20,
              shadowColor: colors.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 8,
              elevation: 2
            }}>
              <Text style={{
                fontSize: 18,
                fontFamily: fonts.semiBold,
                color: colors.text,
                marginBottom: 16
              }}>
                About
              </Text>
              
              <View style={{ gap: 12 }}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Text style={{
                    fontSize: 14,
                    fontFamily: fonts.medium,
                    color: colors.text
                  }}>
                    Version
                  </Text>
                  <Text style={{
                    fontSize: 14,
                    fontFamily: fonts.regular,
                    color: colors.textSecondary
                  }}>
                    1.0.0
                  </Text>
                </View>
                
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Text style={{
                    fontSize: 14,
                    fontFamily: fonts.medium,
                    color: colors.text
                  }}>
                    Build
                  </Text>
                  <Text style={{
                    fontSize: 14,
                    fontFamily: fonts.regular,
                    color: colors.textSecondary
                  }}>
                    2024.1
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