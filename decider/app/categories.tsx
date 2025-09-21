import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ChefHat, MapPin, Film, Gamepad2, Dice1, FileQuestionMark, Music, Tv } from 'lucide-react-native';
import { Fonts } from '@/constants/fonts';

interface CategoryCard {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  route: string;
}

const categories: CategoryCard[] = [
  {
    id: 'food',
    title: 'Food',
    subtitle: 'What should I eat?',
    icon: ChefHat,
    color: '#ef4444',
    bgColor: '#fef2f2',
    route: '/(tabs)/food',
  },
  {
    id: 'places',
    title: 'Places',
    subtitle: 'Where should I go?',
    icon: MapPin,
    color: '#10b981',
    bgColor: '#f0fdf4',
    route: '/(tabs)/places',
  },
  {
    id: 'movies',
    title: 'Movies',
    subtitle: 'What should I watch?',
    icon: Film,
    color: '#8b5cf6',
    bgColor: '#faf5ff',
    route: '/(tabs)/movies',
  },
  {
    id: 'games',
    title: 'Games',
    subtitle: 'What should I play?',
    icon: Gamepad2,
    color: '#f59e0b',
    bgColor: '#fffbeb',
    route: '/(tabs)/games',
  },
  {
    id: 'questions',
    title: 'Uncomfortable Questions',
    subtitle: 'What should I ask?',
    icon: FileQuestionMark,
    color: '#f59e0b',
    bgColor: '#fffbeb',
    route: '/(tabs)/questions',
  },
  {
    id: 'music',
    title: 'Music',
    subtitle: 'What should I listen to?',
    icon: Music,
    color: '#f59e0b',
    bgColor: '#fffbeb',
    route: '/(tabs)/music',
  },
  {
    id: 'tv',
    title: 'TV',
    subtitle: 'What should I watch?',
    icon: Tv,
    color: '#f59e0b',
    bgColor: '#fffbeb',
    route: '/(tabs)/tv',
  },
];

export default function CategoriesScreen() {
  const handleCategoryPress = (route: string) => {
    router.push(route as any);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={{ 
            paddingHorizontal: 24, 
            paddingVertical: 20, 
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 8,
            elevation: 2
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ 
                fontSize: 24, 
                fontFamily: Fonts.bold,
                color: '#0f172a'
              }}>
                Choose a Category
              </Text>
            </View>
          </View>

          {/* Categories Grid */}
          <View style={{ paddingHorizontal: 24, paddingVertical: 32 }}>
            <View style={{ gap: 16 }}>
              {categories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <TouchableOpacity
                    key={category.id}
                    onPress={() => handleCategoryPress(category.route)}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 16,
                      padding: 24,
                      shadowColor: category.color,
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.1,
                      shadowRadius: 12,
                      elevation: 4
                    }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                      <View style={{
                        width: 60,
                        height: 60,
                        backgroundColor: category.bgColor,
                        borderRadius: 16,
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <IconComponent size={28} color={category.color} />
                      </View>
                      
                      <View style={{ flex: 1 }}>
                        <Text style={{
                          fontSize: 20,
                          fontFamily: Fonts.semiBold,
                          color: '#0f172a',
                          marginBottom: 4
                        }}>
                          {category.title}
                        </Text>
                        <Text style={{
                          fontSize: 14,
                          fontFamily: Fonts.regular,
                          color: '#64748b'
                        }}>
                          {category.subtitle}
                        </Text>
                      </View>
                      
                      <View style={{
                        width: 32,
                        height: 32,
                        backgroundColor: '#f1f5f9',
                        borderRadius: 16,
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Text style={{
                          fontSize: 18,
                          color: '#64748b',
                          fontFamily: Fonts.semiBold
                        }}>
                          →
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* How It Works */}
          <View style={{ paddingHorizontal: 24, paddingBottom: 32 }}>
            <View style={{
              backgroundColor: 'white',
              borderRadius: 16,
              padding: 24,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 8,
              elevation: 2
            }}>
              <Text style={{
                fontSize: 18,
                fontFamily: Fonts.bold,
                color: '#0f172a',
                marginBottom: 16
              }}>
                How It Works
              </Text>
              
              <View style={{ gap: 12 }}>
                {[
                  'Choose a category above',
                  'Pick filters if you want to narrow down options',
                  'Tap the dice and let fate decide!'
                ].map((text, index) => (
                  <View key={index} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                    <View style={{
                      width: 24,
                      height: 24,
                      backgroundColor: '#0ea5e9',
                      borderRadius: 12,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Text style={{
                        color: 'white',
                        fontSize: 12,
                        fontFamily: Fonts.bold
                      }}>
                        {index + 1}
                      </Text>
                    </View>
                    <Text style={{
                      fontSize: 14,
                      fontFamily: Fonts.regular,
                      color: '#475569',
                      flex: 1
                    }}>
                      {text}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
} 