import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ChefHat, MapPin, Film, Gamepad2, Music, ArrowLeft, Clock, BookOpen, ShoppingBag, Heart, Star, Coffee, Plane, Camera, Palette } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface CategoryCard {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  route: string;
  isComingSoon?: boolean;
}

const categories: CategoryCard[] = [
  // Available categories
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
  
  // Coming Soon categories
  {
    id: 'music',
    title: 'Music',
    subtitle: 'What should I listen to?',
    icon: Music,
    color: '#ec4899',
    bgColor: '#fdf2f8',
    route: '',
    isComingSoon: true,
  },
  {
    id: 'books',
    title: 'Books',
    subtitle: 'What should I read?',
    icon: BookOpen,
    color: '#06b6d4',
    bgColor: '#ecfeff',
    route: '',
    isComingSoon: true,
  },
  {
    id: 'travel',
    title: 'Travel',
    subtitle: 'Where should I visit?',
    icon: Plane,
    color: '#3b82f6',
    bgColor: '#eff6ff',
    route: '',
    isComingSoon: true,
  },
  {
    id: 'shopping',
    title: 'Shopping',
    subtitle: 'What should I buy?',
    icon: ShoppingBag,
    color: '#f97316',
    bgColor: '#fff7ed',
    route: '',
    isComingSoon: true,
  },
  {
    id: 'dates',
    title: 'Date Ideas',
    subtitle: 'What should we do?',
    icon: Heart,
    color: '#e11d48',
    bgColor: '#fef2f2',
    route: '',
    isComingSoon: true,
  },
  {
    id: 'workouts',
    title: 'Workouts',
    subtitle: 'What should I do?',
    icon: Star,
    color: '#7c3aed',
    bgColor: '#faf5ff',
    route: '',
    isComingSoon: true,
  },
  {
    id: 'drinks',
    title: 'Drinks',
    subtitle: 'What should I drink?',
    icon: Coffee,
    color: '#92400e',
    bgColor: '#fefbf3',
    route: '',
    isComingSoon: true,
  },
  {
    id: 'photos',
    title: 'Photo Ideas',
    subtitle: 'What should I capture?',
    icon: Camera,
    color: '#059669',
    bgColor: '#f0fdf4',
    route: '',
    isComingSoon: true,
  },
  {
    id: 'art',
    title: 'Art & Design',
    subtitle: 'What should I create?',
    icon: Palette,
    color: '#dc2626',
    bgColor: '#fef2f2',
    route: '',
    isComingSoon: true,
  },
];

export default function CategoriesScreen() {
  const { colors, fonts } = useTheme();
  const [searchQuery] = useState('');

  const handleCategoryPress = (route: string, isComingSoon?: boolean) => {
    if (isComingSoon) {
      // Show coming soon message or do nothing
      return;
    }
    router.push(route as any);
  };

  const handleGoBack = () => {
    router.back();
  };

  const filteredCategories = categories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                  backgroundColor: colors.background,
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ArrowLeft size={18} color={colors.textSecondary} />
              </TouchableOpacity>
              
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ 
                  fontSize: 24, 
                  fontFamily: fonts.bold,
                  color: colors.text
                }}>
                  Choose a Category
                </Text>
                <Text style={{
                  fontSize: 14,
                  fontFamily: fonts.regular,
                  color: colors.textSecondary,
                  marginTop: 4
                }}>
                  {categories.filter(c => !c.isComingSoon).length} available • {categories.filter(c => c.isComingSoon).length} coming soon
                </Text>
              </View>
              
              <View style={{ width: 40 }} />
            </View>
          </View>

          {/* Categories Grid */}
          <View style={{ paddingHorizontal: 24, paddingVertical: 32 }}>
            <View style={{ gap: 16 }}>
                {filteredCategories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                  <TouchableOpacity
                    key={category.id}
                    onPress={() => handleCategoryPress(category.route, category.isComingSoon)}
                    style={{
                      backgroundColor: colors.surface,
                      borderRadius: 20,
                      padding: 24,
                      shadowColor: category.color,
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.1,
                      shadowRadius: 12,
                      elevation: 4,
                      borderWidth: 1,
                      borderColor: colors.border,
                      opacity: category.isComingSoon ? 0.7 : 1,
                    }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                      <View style={{
                        width: 60,
                        height: 60,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                      }}>
                        <IconComponent size={32} color={category.color} />
                        
                        {/* Coming Soon Badge */}
                        {category.isComingSoon && (
                          <View style={{
                            position: 'absolute',
                            top: -4,
                            right: -4,
                            backgroundColor: colors.primary,
                            borderRadius: 8,
                            paddingHorizontal: 6,
                            paddingVertical: 2,
                            minWidth: 16,
                            height: 16,
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <Clock size={10} color="white" />
                          </View>
                        )}
                      </View>
                      
                      <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                          <Text style={{
                            fontSize: 20,
                            fontFamily: fonts.semiBold,
                            color: colors.text,
                          }}>
                            {category.title}
                          </Text>
                          {category.isComingSoon && (
                            <View style={{
                              backgroundColor: colors.primary + '20',
                              paddingHorizontal: 8,
                              paddingVertical: 2,
                              borderRadius: 8
                            }}>
                              <Text style={{
                                fontSize: 10,
                                fontFamily: fonts.medium,
                                color: colors.primary,
                                textTransform: 'uppercase',
                                letterSpacing: 0.5
                              }}>
                                Coming Soon
                              </Text>
                            </View>
                          )}
                        </View>
                        <Text style={{
                          fontSize: 14,
                          fontFamily: fonts.regular,
                          color: colors.textSecondary
                        }}>
                          {category.subtitle}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
} 