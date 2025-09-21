import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Dice1, Settings } from 'lucide-react-native';
import { Fonts } from '@/constants/fonts';
import { useTheme } from '@/contexts/ThemeContext';

export default function LandingScreen() {
  const { colors } = useTheme();

  const handleLetsGo = () => {
    router.push('/categories' as any);
  };

  const handleSettingsPress = () => {
    router.push('/settings' as any);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Settings Button - Top Right */}
        <View style={{
          position: 'absolute',
          top: 16,
          right: 24,
          zIndex: 1
        }}>
          <TouchableOpacity
            onPress={handleSettingsPress}
            style={{
              width: 44,
              height: 44,
              backgroundColor: colors.surface,
              borderRadius: 22,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: colors.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3
            }}
          >
            <Settings size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 24
        }}>
          <View style={{
            width: 100,
            height: 100,
            backgroundColor: colors.background,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 32,
            shadowColor: colors.primary,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.2,
            shadowRadius: 16,
            elevation: 8,
            borderWidth: 2,
            borderColor: colors.primary
          }}>
            <Dice1 size={40} color={colors.primary} />
          </View>
          
          <Text style={{
            fontSize: 32,
            fontFamily: Fonts.bold,
            color: colors.text,
            textAlign: 'center',
            marginBottom: 16,
            lineHeight: 40
          }}>
            Need help deciding?
          </Text>
          
          <Text style={{
            fontSize: 18,
            fontFamily: Fonts.regular,
            color: colors.textSecondary,
            textAlign: 'center',
            marginBottom: 48,
            lineHeight: 26
          }}>
            Let the dice decide for you! Choose a category and roll your way to a decision.
          </Text>
          
          <TouchableOpacity
            onPress={handleLetsGo}
            style={{
              backgroundColor: colors.primary,
              paddingHorizontal: 48,
              paddingVertical: 16,
              borderRadius: 24,
              shadowColor: colors.primary,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 6
            }}
          >
            <Text style={{
              fontSize: 18,
              fontFamily: Fonts.semiBold,
              color: 'white',
              textAlign: 'center'
            }}>
              Let's Go!
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
} 