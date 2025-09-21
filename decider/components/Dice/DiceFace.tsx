import React from 'react';
import { View } from 'react-native';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react-native';

interface DiceFaceProps {
  face: number; // 1-6
  size?: number;
  color?: string;
}

const diceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

export default function DiceFace({ face, size = 48, color = "white" }: DiceFaceProps) {
  const IconComponent = diceIcons[face - 1];
  
  return (
    <View className="items-center justify-center">
      <IconComponent size={size} color={color} />
    </View>
  );
} 