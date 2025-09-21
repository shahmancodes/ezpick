import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSharedValue, withTiming, withSequence, withSpring, useAnimatedStyle, withRepeat, interpolate } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Sparkles } from 'lucide-react-native';

interface DiceRollerProps {
  options: string[];
  onResult: (result: string) => void;
  disabled?: boolean;
}

const diceFaces = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

// Default dice colors (fallback if theme context isn't available)
const defaultDiceColor = {
  id: 'blue',
  name: 'Ocean Blue',
  primary: '#0ea5e9',
  secondary: '#38bdf8',
  shadow: '#0ea5e9',
};

const defaultColors = {
  background: '#f8fafc',
  surface: '#ffffff',
  text: '#0f172a',
  textSecondary: '#64748b',
  border: '#e2e8f0',
  primary: '#0ea5e9',
  shadow: '#000000',
};

export default function DiceRoller({ options, onResult, disabled = false }: DiceRollerProps) {
  const [isRolling, setIsRolling] = useState(false);
  const [currentFace, setCurrentFace] = useState(0);
  const [lastResult, setLastResult] = useState<string | null>(null);
  
  // Try to get theme context, fallback to defaults if not available
  let selectedDiceColor = defaultDiceColor;
  let colors = defaultColors;
  
  try {
    // Only import and use theme if available
    const { useTheme } = require('@/contexts/ThemeContext');
    const themeContext = useTheme();
    if (themeContext) {
      selectedDiceColor = themeContext.selectedDiceColor || defaultDiceColor;
      colors = themeContext.colors || defaultColors;
    }
  } catch (error) {
    // Theme context not available, use defaults
    console.log('Theme context not available, using defaults');
  }
  
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const bounce = useSharedValue(0);
  const glow = useSharedValue(0);

  // Load and play dice roll sound
  const playDiceRollSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('@/assets/sounds/dice-roll.mp3')
      );
      await sound.playAsync();
      setTimeout(() => sound.unloadAsync(), 2000);
    } catch (error) {
      console.log('Error playing dice roll sound:', error);
    }
  };

  // Enhanced animated styles
  const diceAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotation.value}deg` },
        { scale: scale.value },
        { translateY: bounce.value }
      ],
    };
  });

  const glowAnimatedStyle = useAnimatedStyle(() => {
    const glowOpacity = interpolate(glow.value, [0, 1], [0, 0.6]);
    return {
      opacity: glowOpacity,
      transform: [{ scale: interpolate(glow.value, [0, 1], [1, 1.3]) }]
    };
  });

  const resultAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }]
    };
  });

  const rollDice = async () => {
    if (isRolling || disabled || options.length === 0) return;

    setIsRolling(true);
    setLastResult(null);
    
    // Initial haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    // Play dice roll sound
    playDiceRollSound();

    // Enhanced animation sequence
    rotation.value = withSequence(
      withTiming(360 * 6, { duration: 1600 }),
      withSpring(360 * 6 + 15, { damping: 10, stiffness: 100 })
    );

    scale.value = withSequence(
      withSpring(1.3, { damping: 8, stiffness: 150 }),
      withSpring(0.8, { damping: 8, stiffness: 150 }),
      withSpring(1.2, { damping: 8, stiffness: 150 }),
      withSpring(1, { damping: 8, stiffness: 150 })
    );

    // Bounce effect
    bounce.value = withSequence(
      withRepeat(withTiming(-10, { duration: 100 }), 8, true),
      withSpring(0, { damping: 8, stiffness: 150 })
    );

    // Glow effect
    glow.value = withRepeat(withTiming(1, { duration: 200 }), 8, true);

    // Dice face animation
    const faceInterval = setInterval(() => {
      setCurrentFace(Math.floor(Math.random() * 6));
    }, 50);

    // Complete animation
    setTimeout(async () => {
      clearInterval(faceInterval);
      
      // Stop glow
      glow.value = withTiming(0, { duration: 300 });
      
      const randomIndex = Math.floor(Math.random() * options.length);
      const result = options[randomIndex];
      
      setLastResult(result);
      setIsRolling(false);
      
      // Success haptic feedback
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      onResult(result);
    }, 1700);
  };

  const CurrentDiceIcon = diceFaces[currentFace];

  return (
    <View style={{ alignItems: 'center', gap: 24 }}>
      {/* Dice Button with Glow Effect */}
      <TouchableOpacity
        onPress={rollDice}
        disabled={isRolling || disabled}
        style={{ 
          position: 'relative',
          opacity: disabled ? 0.4 : 1
        }}
      >
        {/* Glow Background */}
        <Animated.View
          style={[
            {
              position: 'absolute',
              width: 120,
              height: 120,
              borderRadius: 25,
              backgroundColor: selectedDiceColor.primary,
              top: -10,
              left: -10,
            },
            glowAnimatedStyle
          ]}
        />
        
        {/* Main Dice */}
        <Animated.View
          style={[
            {
              width: 100,
              height: 100,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: isRolling ? selectedDiceColor.secondary : selectedDiceColor.primary,
              shadowColor: selectedDiceColor.shadow,
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
          fontWeight: '600', // Using fontWeight instead of fontFamily for now
          color: isRolling ? selectedDiceColor.primary : colors.text
        }}>
          {isRolling ? 'Rolling...' : 'Tap to Roll'}
        </Text>
        
        {options.length > 0 && !isRolling && (
          <Text style={{
            fontSize: 14,
            color: colors.textSecondary,
            textAlign: 'center'
          }}>
            {options.length} option{options.length !== 1 ? 's' : ''} available
          </Text>
        )}
      </View>

      {/* Enhanced Result Display */}
      {lastResult && !isRolling && (
        <Animated.View 
          style={[
            {
              width: '100%',
              maxWidth: 320,
            },
            resultAnimatedStyle
          ]}
        >
          <View style={{
            backgroundColor: '#f0fdf4',
            borderColor: '#bbf7d0',
            borderWidth: 2,
            borderRadius: 20,
            padding: 28,
            shadowColor: '#22c55e',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.15,
            shadowRadius: 16,
            elevation: 6
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              marginBottom: 12
            }}>
              <Sparkles size={24} color="#16a34a" />
              <Text style={{
                color: '#15803d',
                fontWeight: '600',
                fontSize: 16,
                textTransform: 'uppercase',
                letterSpacing: 1.5
              }}>
                Selected
              </Text>
              <Sparkles size={24} color="#16a34a" />
            </View>
            
            <Text style={{
              textAlign: 'center',
              color: '#166534',
              fontWeight: 'bold',
              fontSize: 28,
              marginBottom: 8,
              lineHeight: 34
            }}>
              {lastResult}
            </Text>
            
            <TouchableOpacity
              onPress={rollDice}
              style={{
                marginTop: 16,
                backgroundColor: selectedDiceColor.primary,
                borderRadius: 16,
                paddingVertical: 12,
                paddingHorizontal: 24
              }}
            >
              <Text style={{
                textAlign: 'center',
                color: 'white',
                fontWeight: '600',
                fontSize: 16
              }}>
                Roll Again
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      {/* Empty State */}
      {options.length === 0 && (
        <View style={{
          backgroundColor: '#fffbeb',
          borderColor: '#fde68a',
          borderWidth: 1,
          borderRadius: 16,
          padding: 16,
          maxWidth: 320
        }}>
          <Text style={{
            textAlign: 'center',
            color: '#d97706',
            fontWeight: '500',
            fontSize: 14
          }}>
            No options available. Please adjust your filters.
          </Text>
        </View>
      )}
    </View>
  );
} 