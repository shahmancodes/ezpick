import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, History, MapPin, ChevronDown, ChevronUp } from 'lucide-react-native';
import { router } from 'expo-router';
import DiceRoller from '@/components/Dice/DiceRoller';
import { Fonts } from '@/constants/fonts';
import { useTheme } from '@/contexts/ThemeContext';
import { allPlaceOptions, distanceFilterOptions, activityFilterOptions } from '@/data/places';

export default function PlacesScreen() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const { colors } = useTheme();

  const distanceFilters = distanceFilterOptions;
  const activityFilters = activityFilterOptions;

  const getFilteredOptions = () => {
    // Apply filter logic here if needed
    return allPlaceOptions;
  };

  const handleDiceResult = (result: string) => {
    console.log('Selected place:', result);
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
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <View style={{
                  width: 40,
                  height: 40,
                  backgroundColor: colors.background,
                  borderRadius: 16,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <MapPin size={20} color={colors.primary} />
                </View>
                <View>
                  <Text style={{ fontSize: 24, fontFamily: Fonts.bold, color: colors.text }}>Places</Text>
                  <Text style={{ fontSize: 14, fontFamily: Fonts.regular, color: colors.textSecondary }}>Where should I go?</Text>
                </View>
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
                  {/* Distance */}
                  <View>
                    <Text style={{
                      fontSize: 14,
                      fontFamily: Fonts.medium,
                      color: colors.text,
                      marginBottom: 8
                    }}>
                      Distance
                    </Text>
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                      {distanceFilters.map((distance, index) => (
                        <TouchableOpacity
                          key={index}
                          style={{
                            flex: 1,
                            paddingVertical: 12,
                            borderRadius: 12,
                            borderWidth: 2,
                            backgroundColor: selectedFilters.includes(distance) ? colors.primary : colors.background,
                            borderColor: selectedFilters.includes(distance) ? colors.primary : colors.border
                          }}
                          onPress={() => toggleFilter(distance)}
                        >
                          <Text style={{
                            textAlign: 'center',
                            fontFamily: Fonts.semiBold,
                            fontSize: 12,
                            color: selectedFilters.includes(distance) ? 'white' : colors.text
                          }}>
                            {distance}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  {/* Activity Type */}
                  <View>
                    <Text style={{
                      fontSize: 14,
                      fontFamily: Fonts.medium,
                      color: colors.text,
                      marginBottom: 8
                    }}>
                      Activity Type
                    </Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                      {activityFilters.map((activity) => (
                        <TouchableOpacity
                          key={activity}
                          style={{
                            paddingVertical: 8,
                            paddingHorizontal: 16,
                            borderRadius: 12,
                            borderWidth: 2,
                            backgroundColor: selectedFilters.includes(activity) ? colors.primary : colors.background,
                            borderColor: selectedFilters.includes(activity) ? colors.primary : colors.border
                          }}
                          onPress={() => toggleFilter(activity)}
                        >
                          <Text style={{
                            fontFamily: Fonts.medium,
                            color: selectedFilters.includes(activity) ? 'white' : colors.text
                          }}>
                            {activity}
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