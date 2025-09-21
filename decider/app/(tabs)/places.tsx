import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, History, MapPin, ChevronDown, ChevronUp } from 'lucide-react-native';
import DiceRoller from '@/components/Dice/DiceRoller';
import { allPlaceOptions, distanceFilterOptions, activityFilterOptions } from '@/data/places';

export default function PlacesScreen() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

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
                  <MapPin size={20} color="#0ea5e9" />
                </View>
                <View>
                  <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#0f172a' }}>Places</Text>
                  <Text style={{ fontSize: 14, color: '#64748b' }}>Where should I go?</Text>
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
                  {/* Distance */}
                  <View>
                    <Text style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: '#334155',
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
                            backgroundColor: selectedFilters.includes(distance) ? '#0ea5e9' : '#f8fafc',
                            borderColor: selectedFilters.includes(distance) ? '#0ea5e9' : '#e2e8f0'
                          }}
                          onPress={() => toggleFilter(distance)}
                        >
                          <Text style={{
                            textAlign: 'center',
                            fontWeight: '600',
                            fontSize: 12,
                            color: selectedFilters.includes(distance) ? 'white' : '#334155'
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
                      fontWeight: '500',
                      color: '#334155',
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
                            backgroundColor: selectedFilters.includes(activity) ? '#0ea5e9' : '#f8fafc',
                            borderColor: selectedFilters.includes(activity) ? '#0ea5e9' : '#e2e8f0'
                          }}
                          onPress={() => toggleFilter(activity)}
                        >
                          <Text style={{
                            fontWeight: '500',
                            color: selectedFilters.includes(activity) ? 'white' : '#334155'
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