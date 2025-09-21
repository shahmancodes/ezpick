import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, History, Film, ChevronDown, ChevronUp } from 'lucide-react-native';
import DiceRoller from '@/components/Dice/DiceRoller';
import { allMovieOptions, durationFilterOptions, genreFilterOptions } from '@/data/movies';

export default function MoviesScreen() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const durationFilters = durationFilterOptions;
  const genreFilters = genreFilterOptions;

  const getFilteredOptions = () => {
    // Apply filter logic here if needed
    return allMovieOptions;
  };

  const handleDiceResult = (result: string) => {
    console.log('Selected movie:', result);
  };

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={{
            paddingHorizontal: 24,
            paddingVertical: 16,
            backgroundColor: 'white',
            shadowColor: '#000',
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
                  backgroundColor: '#e0f2fe',
                  borderRadius: 16,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Film size={20} color="#0ea5e9" />
                </View>
                <View>
                  <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#0f172a' }}>Movies</Text>
                  <Text style={{ fontSize: 14, color: '#64748b' }}>What should I watch?</Text>
                </View>
              </View>
              
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <TouchableOpacity style={{
                  width: 40,
                  height: 40,
                  backgroundColor: '#f1f5f9',
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <History size={18} color="#64748b" />
                </TouchableOpacity>
                <TouchableOpacity style={{
                  width: 40,
                  height: 40,
                  backgroundColor: '#f1f5f9',
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Settings size={18} color="#64748b" />
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
              backgroundColor: 'white',
              borderRadius: 16,
              shadowColor: '#000',
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
                  fontWeight: '600',
                  color: '#1e293b'
                }}>
                  Filters
                </Text>
                {showFilters ? (
                  <ChevronUp size={20} color="#64748b" />
                ) : (
                  <ChevronDown size={20} color="#64748b" />
                )}
              </TouchableOpacity>

              {/* Accordion Content */}
              {showFilters && (
                <View style={{ paddingHorizontal: 20, paddingBottom: 20, gap: 16 }}>
                  {/* Duration */}
                  <View>
                    <Text style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: '#334155',
                      marginBottom: 8
                    }}>
                      Duration
                    </Text>
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                      {durationFilters.map((duration, index) => (
                        <TouchableOpacity
                          key={index}
                          style={{
                            flex: 1,
                            paddingVertical: 12,
                            borderRadius: 12,
                            borderWidth: 2,
                            backgroundColor: selectedFilters.includes(duration) ? '#0ea5e9' : '#f8fafc',
                            borderColor: selectedFilters.includes(duration) ? '#0ea5e9' : '#e2e8f0'
                          }}
                          onPress={() => toggleFilter(duration)}
                        >
                          <Text style={{
                            textAlign: 'center',
                            fontWeight: '600',
                            fontSize: 11,
                            color: selectedFilters.includes(duration) ? 'white' : '#334155'
                          }}>
                            {duration}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  {/* Genre */}
                  <View>
                    <Text style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: '#334155',
                      marginBottom: 8
                    }}>
                      Genre
                    </Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                      {genreFilters.map((genre) => (
                        <TouchableOpacity
                          key={genre}
                          style={{
                            paddingVertical: 8,
                            paddingHorizontal: 16,
                            borderRadius: 12,
                            borderWidth: 2,
                            backgroundColor: selectedFilters.includes(genre) ? '#0ea5e9' : '#f8fafc',
                            borderColor: selectedFilters.includes(genre) ? '#0ea5e9' : '#e2e8f0'
                          }}
                          onPress={() => toggleFilter(genre)}
                        >
                          <Text style={{
                            fontWeight: '500',
                            color: selectedFilters.includes(genre) ? 'white' : '#334155'
                          }}>
                            {genre}
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