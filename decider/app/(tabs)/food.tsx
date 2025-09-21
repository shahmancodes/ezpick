import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, History, ChefHat, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import DiceRoller from '@/components/Dice/DiceRoller';
import { Fonts } from '@/constants/fonts';
import { useTheme } from '@/contexts/ThemeContext';
import { allFoodOptions, priceFilterOptions, cuisineFilterOptions } from '@/data/food';

export default function FoodScreen() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const { colors } = useTheme();

  const priceFilters = priceFilterOptions;
  const cuisineFilters = cuisineFilterOptions;

  const getFilteredOptions = () => {
    return allFoodOptions;
  };

  const handleDiceResult = (result: string) => {
    console.log('Selected food:', result);
  };

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const handleSettingsPress = () => {
    router.push('/settings' as any);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={{
            paddingHorizontal: 24,
            paddingVertical: 16,
            backgroundColor: colors.surface,
            shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 8,
            elevation: 2
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <TouchableOpacity
                onPress={() => router.back()}
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
                <Text style={{ fontSize: 24, fontFamily: Fonts.bold, color: colors.text }}>Food</Text>
                <Text style={{ fontSize: 14, fontFamily: Fonts.regular, color: colors.textSecondary }}>What should I eat?</Text>
              </View>
              
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <TouchableOpacity style={{
                  width: 40,
                  height: 40,
                  backgroundColor: colors.background,
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <History size={18} color={colors.textSecondary} />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: colors.background,
                    borderRadius: 12,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onPress={handleSettingsPress}
                >
                  <Settings size={18} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{ paddingHorizontal: 24, paddingVertical: 24, gap: 24 }}>
            {/* Dice Roller */}
            <View style={{ paddingVertical: 32 }}>
              <DiceRoller
                options={getFilteredOptions()}
                onResult={handleDiceResult}
                disabled={getFilteredOptions().length === 0}
              />
            </View>

            {/* Filters Accordion */}
            <View style={{
              backgroundColor: colors.surface,
              borderRadius: 16,
              shadowColor: colors.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 8,
              elevation: 2
            }}>
              {/* Accordion Header */}
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 20,
                  paddingBottom: showFilters ? 0 : 20
                }}
                onPress={() => setShowFilters(!showFilters)}
              >
                <Text style={{
                  fontSize: 18,
                  fontFamily: Fonts.semiBold,
                  color: colors.text
                }}>
                  Filters
                </Text>
                {showFilters ? (
                  <ChevronUp size={20} color={colors.textSecondary} />
                ) : (
                  <ChevronDown size={20} color={colors.textSecondary} />
                )}
              </TouchableOpacity>

              {/* Accordion Content */}
              {showFilters && (
                <View style={{ paddingHorizontal: 20, paddingBottom: 20, gap: 16 }}>
                  {/* Price Range */}
                  <View>
                    <Text style={{
                      fontSize: 14,
                      fontFamily: Fonts.medium,
                      color: colors.text,
                      marginBottom: 8
                    }}>
                      Price Range
                    </Text>
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                      {priceFilters.map((price, index) => (
                        <TouchableOpacity
                          key={index}
                          style={{
                            flex: 1,
                            paddingVertical: 12,
                            borderRadius: 12,
                            borderWidth: 2,
                            backgroundColor: selectedFilters.includes(price) ? colors.primary : colors.background,
                            borderColor: selectedFilters.includes(price) ? colors.primary : colors.border
                          }}
                          onPress={() => toggleFilter(price)}
                        >
                          <Text style={{
                            textAlign: 'center',
                            fontFamily: Fonts.semiBold,
                            fontSize: 16,
                            color: selectedFilters.includes(price) ? 'white' : colors.text
                          }}>
                            {price}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  {/* Cuisine Type */}
                  <View>
                    <Text style={{
                      fontSize: 14,
                      fontFamily: Fonts.medium,
                      color: colors.text,
                      marginBottom: 8
                    }}>
                      Cuisine Type
                    </Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                      {cuisineFilters.map((cuisine) => (
                        <TouchableOpacity
                          key={cuisine}
                          style={{
                            paddingVertical: 8,
                            paddingHorizontal: 16,
                            borderRadius: 12,
                            borderWidth: 2,
                            backgroundColor: selectedFilters.includes(cuisine) ? colors.primary : colors.background,
                            borderColor: selectedFilters.includes(cuisine) ? colors.primary : colors.border
                          }}
                          onPress={() => toggleFilter(cuisine)}
                        >
                          <Text style={{
                            fontFamily: Fonts.medium,
                            color: selectedFilters.includes(cuisine) ? 'white' : colors.text
                          }}>
                            {cuisine}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}