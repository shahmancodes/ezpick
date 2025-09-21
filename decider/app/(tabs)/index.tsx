import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Dice6, Settings } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

// Get the appropriate top value
const getTopValue = () => {
  if (Platform.OS === 'ios') {
    return 50; // iPhone X and newer
  }
  return 20; // Android and older iPhones
};

export default function LandingScreen() {
  const { colors, fonts } = useTheme();

  const handleLetsGo = () => {
    router.push('/categories' as any);
  };

  const handleSettingsPress = () => {
    router.push('/settings' as any);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
        {/* Settings Button - Top Right */}
        <View style={{
          position: 'absolute',
          top: getTopValue(), // Dynamic positioning
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
          {/* Dice showing 6 - Similar to DiceRoller */}
          <View style={{
            width: 100,
            height: 100,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.primary,
            borderWidth: 2,
            borderColor: 'white',
            shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.5,
            shadowRadius: 20,
            elevation: 12,
            marginBottom: 32
          }}>
            <Dice6 size={50} color="white" strokeWidth={3} />
          </View>
          
          <Text style={{
            fontSize: 32,
            fontFamily: fonts.bold,
            color: colors.text,
            textAlign: 'center',
            marginBottom: 16,
            lineHeight: 40
          }}>
            Need help deciding?
          </Text>
          
          <Text style={{
            fontSize: 18,
            fontFamily: fonts.regular,
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
              fontFamily: fonts.semiBold,
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