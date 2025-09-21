import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSharedValue, withTiming, withSequence, withSpring, useAnimatedStyle } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useAudioPlayer } from 'expo-audio';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Sparkles } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface DiceRollerProps {
  options: string[];
  onResult: (result: string) => void;
  disabled?: boolean;
}

const diceFaces = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

export default function DiceRoller({ options = [], onResult, disabled = false }: DiceRollerProps) {
  const [isRolling, setIsRolling] = useState(false);
  const [currentFace, setCurrentFace] = useState(0);
  const [lastResult, setLastResult] = useState<string | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  
  // Use unified theme context
  const { colors, fonts } = useTheme();
  
  const rotation = useSharedValue(0);

  // Move useAudioPlayer to top level - hooks must be called at component level
  const player = useAudioPlayer();

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

  const playDiceRollSound = async () => {
    if (!isAudioEnabled) {
      console.log('Audio is muted, skipping sound');
      return;
    }
    try {
      // Check if player is ready before trying to play
      if (player && typeof player.replace === 'function') {
        await player.replace(require('@/assets/sounds/dice-roll.wav'));
        if (typeof player.play === 'function') {
          player.play();
        }
      }
    } catch (error: any) {
      // Silently fail for audio errors - they're not critical
      console.log('Audio playback not available:', error.message);
    }
  };

  // Enhanced animated styles
  const diceAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotation.value}deg` },
      ],
    };
  });

  const resultAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: 1,
    };
  });

  const rollDice = async () => {
    // Add safety check for options
    if (isRolling || disabled || !options || options.length === 0) return;

    setIsRolling(true);
    setLastResult(null);
    
    // Reset rotation to 0 before starting new animation
    rotation.value = 0;
    
    // Initial haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    // Play dice roll sound
    playDiceRollSound();

    // Just rotation animation
    rotation.value = withSequence(
      withTiming(360 * 4, { duration: 1200 }),
      withSpring(360 * 4 + 15, { damping: 12, stiffness: 120 })
    );

    // Dice face animation
    const faceInterval = setInterval(() => {
      setCurrentFace(Math.floor(Math.random() * 6));
    }, 80);

    // Complete animation
    setTimeout(async () => {
      clearInterval(faceInterval);
      
      const randomIndex = Math.floor(Math.random() * options.length);
      const result = options[randomIndex];
      
      setLastResult(result);
      setIsRolling(false);
      
      // Success haptic feedback
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      onResult(result);
    }, 1300);
  };

  const CurrentDiceIcon = diceFaces[currentFace];

  return (
    <View style={{ alignItems: 'center', gap: 24 }}>
      {/* Dice Button */}
      <TouchableOpacity
        onPress={rollDice}
        disabled={isRolling || disabled || !options || options.length === 0}
        style={{ 
          position: 'relative',
          opacity: disabled || !options || options.length === 0 ? 0.4 : 1
        }}
      >
        {/* Main Dice */}
        <Animated.View
          style={[
            {
              width: 100,
              height: 100,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: isRolling ? colors.primary + '80' : colors.primary,
              borderWidth: 2,
              borderColor: 'white',
              shadowColor: colors.shadow,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.5,
              shadowRadius: 20,
              elevation: 12,
            },
            diceAnimatedStyle
          ]}
        >
          <CurrentDiceIcon size={50} color="white" strokeWidth={3} />
        </Animated.View>
      </TouchableOpacity>

      {/* Status Text */}
      <View style={{ alignItems: 'center', gap: 8 }}>
        <Text style={{
          fontSize: 22,
          fontFamily: fonts.semiBold,
          color: isRolling ? colors.primary : colors.text
        }}>
          {isRolling ? 'Rolling...' : 'Tap to Roll'}
        </Text>
      </View>

      {/* Enhanced Result Display */}
      {lastResult && !isRolling && (
        <Animated.View 
          style={[
            {
              width: '100%',
              maxWidth: 300,
              marginTop: 16,
            },
            resultAnimatedStyle
          ]}
        >
          <View style={{
            backgroundColor: colors.surface,
            borderColor: colors.primary,
            borderWidth: 2,
            borderRadius: 16,
            padding: 20,
            shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 4
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              marginBottom: 12
            }}>
              <Sparkles size={20} color={colors.primary} />
              <Text style={{
                color: colors.primary,
                fontFamily: fonts.semiBold,
                fontSize: 14,
                textTransform: 'uppercase',
                letterSpacing: 1
              }}>
                Selected
              </Text>
              <Sparkles size={20} color={colors.primary} />
            </View>
            
            <Text style={{
              textAlign: 'center',
              color: colors.text,
              fontFamily: fonts.bold,
              fontSize: 24,
              marginBottom: 16,
              lineHeight: 28
            }}>
              {lastResult}
            </Text>
            
            <TouchableOpacity
              onPress={rollDice}
              style={{
                backgroundColor: colors.primary,
                borderRadius: 12,
                paddingVertical: 12,
                paddingHorizontal: 20
              }}
            >
              <Text style={{
                textAlign: 'center',
                color: 'white',
                fontFamily: fonts.semiBold,
                fontSize: 16
              }}>
                Roll Again
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      {/* Empty State */}
      {(!options || options.length === 0) && (
        <View style={{
          backgroundColor: colors.warning + '20',
          borderColor: colors.warning,
          borderWidth: 1,
          borderRadius: 16,
          padding: 16,
          maxWidth: 320
        }}>
          <Text style={{
            textAlign: 'center',
            color: colors.warning,
            fontFamily: fonts.medium,
            fontSize: 14
          }}>
            No options available. Please adjust your filters.
          </Text>
        </View>
      )}
    </View>
  );
} 