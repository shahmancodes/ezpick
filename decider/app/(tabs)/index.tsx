import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Dice1 } from 'lucide-react-native';
import { Fonts } from '@/constants/fonts';

export default function LandingScreen() {
  const handleLetsGo = () => {
    router.push('/categories' as any);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 24
        }}>
          <View style={{
            width: 100,
            height: 100,
            backgroundColor: '#e0f2fe',
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 32,
            shadowColor: '#0ea5e9',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.2,
            shadowRadius: 16,
            elevation: 8
          }}>
            <Dice1 size={40} color="#0ea5e9" />
          </View>
          
          <Text style={{
            fontSize: 32,
            fontFamily: Fonts.bold,
            color: '#0f172a',
            textAlign: 'center',
            marginBottom: 16,
            lineHeight: 40
          }}>
            Need help deciding?
          </Text>
          
          <Text style={{
            fontSize: 16,
            fontFamily: Fonts.regular,
            color: '#64748b',
            textAlign: 'center',
            marginBottom: 48,
            lineHeight: 24
          }}>
            Let the dice choose for you!
          </Text>
          
          <TouchableOpacity
            onPress={handleLetsGo}
            style={{
              backgroundColor: '#0ea5e9',
              paddingHorizontal: 48,
              paddingVertical: 16,
              borderRadius: 16,
              shadowColor: '#0ea5e9',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 6
            }}
          >
            <Text style={{
              fontSize: 18,
              fontFamily: Fonts.semiBold,
              color: 'white',
              textAlign: 'center'
            }}>
              Let's go!
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
} 