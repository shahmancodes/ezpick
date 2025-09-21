import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, History, Gamepad2, ChevronDown, ChevronUp } from 'lucide-react-native';
import { router } from 'expo-router';
import DiceRoller from '@/components/Dice/DiceRoller';
import { Fonts } from '@/constants/fonts';
import { useTheme } from '@/contexts/ThemeContext';
import { allGameOptions, timeFilterOptions, playerFilterOptions } from '@/data/games';

export default function GamesScreen() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const { colors } = useTheme();

  const timeFilters = timeFilterOptions;
  const playerFilters = playerFilterOptions;

  const getFilteredOptions = () => {
    // Apply filter logic here if needed
    return allGameOptions;
  };

  const handleDiceResult = (result: string) => {
    console.log('Selected game:', result);
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
                  <Gamepad2 size={20} color={colors.primary} />
                </View>
                <View>
                  <Text style={{ fontSize: 24, fontFamily: Fonts.bold, color: colors.text }}>Games</Text>
                  <Text style={{ fontSize: 14, fontFamily: Fonts.regular, color: colors.textSecondary }}>What should I play?</Text>
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
                  {/* Play Time */}
                  <View>
                    <Text style={{
                      fontSize: 14,
                      fontFamily: Fonts.medium,
                      color: colors.text,
                      marginBottom: 8
                    }}>
                      Play Time
                    </Text>
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                      {timeFilters.map((time, index) => (
                        <TouchableOpacity
                          key={index}
                          style={{
                            flex: 1,
                            paddingVertical: 12,
                            borderRadius: 12,
                            borderWidth: 2,
                            backgroundColor: selectedFilters.includes(time) ? colors.primary : colors.background,
                            borderColor: selectedFilters.includes(time) ? colors.primary : colors.border
                          }}
                          onPress={() => toggleFilter(time)}
                        >
                          <Text style={{
                            textAlign: 'center',
                            fontFamily: Fonts.semiBold,
                            fontSize: 12,
                            color: selectedFilters.includes(time) ? 'white' : colors.text
                          }}>
                            {time}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  {/* Players */}
                  <View>
                    <Text style={{
                      fontSize: 14,
                      fontFamily: Fonts.medium,
                      color: colors.text,
                      marginBottom: 8
                    }}>
                      Players
                    </Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                      {playerFilters.map((players) => (
                        <TouchableOpacity
                          key={players}
                          style={{
                            paddingVertical: 8,
                            paddingHorizontal: 16,
                            borderRadius: 12,
                            borderWidth: 2,
                            backgroundColor: selectedFilters.includes(players) ? colors.primary : colors.background,
                            borderColor: selectedFilters.includes(players) ? colors.primary : colors.border
                          }}
                          onPress={() => toggleFilter(players)}
                        >
                          <Text style={{
                            fontFamily: Fonts.medium,
                            color: selectedFilters.includes(players) ? 'white' : colors.text
                          }}>
                            {players}
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