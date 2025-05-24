import { useState } from 'react';
import { WrenchScrewdriverIcon, CloudIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';

interface WeatherCondition {
  temperature: string;
  description: string;
  wind: string;
  precipitation: string;
  effects: string[];
}

interface Climate {
  name: string;
  description: string;
  temperatureRange: {
    min: number;
    max: number;
  };
  conditions: {
    [key: string]: {
      weight: number;
      descriptions: string[];
      effects: string[];
    };
  };
}

interface GeneratedWeather {
  climate: string;
  season: string;
  timeOfDay: string;
  conditions: WeatherCondition;
  timestamp: number;
}

export function WeatherGeneratorPage() {
  const [selectedClimate, setSelectedClimate] = useState<string>('temperate');
  const [selectedSeason, setSelectedSeason] = useState<string>('spring');
  const [selectedTime, setSelectedTime] = useState<string>('day');
  const [generatedWeathers, setGeneratedWeathers] = useState<GeneratedWeather[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const seasons = ['spring', 'summer', 'autumn', 'winter'];
  const times = ['day', 'night'];

  const climates: Record<string, Climate> = {
    temperate: {
      name: 'Temperate',
      description: 'Moderate temperatures with distinct seasons',
      temperatureRange: { min: -10, max: 35 },
      conditions: {
        clear: {
          weight: 30,
          descriptions: ['Clear skies', 'Sunny', 'Partly cloudy'],
          effects: ['Good visibility', 'Normal travel conditions']
        },
        cloudy: {
          weight: 25,
          descriptions: ['Overcast', 'Heavy clouds', 'Grey skies'],
          effects: ['Reduced sunlight', 'Cooler temperatures']
        },
        rain: {
          weight: 20,
          descriptions: ['Light rain', 'Steady rainfall', 'Heavy downpour'],
          effects: ['Slippery surfaces', 'Reduced visibility', 'Difficult tracking']
        },
        storm: {
          weight: 15,
          descriptions: ['Thunderstorm', 'Lightning storm', 'Heavy winds'],
          effects: ['Dangerous conditions', 'Limited visibility', 'Difficult travel']
        },
        snow: {
          weight: 10,
          descriptions: ['Light snowfall', 'Heavy snow', 'Blizzard'],
          effects: ['Cold conditions', 'Difficult terrain', 'Limited visibility']
        }
      }
    },
    desert: {
      name: 'Desert',
      description: 'Hot and arid with extreme temperature variations',
      temperatureRange: { min: 0, max: 45 },
      conditions: {
        clear: {
          weight: 50,
          descriptions: ['Scorching sun', 'Clear skies', 'Intense heat'],
          effects: ['Heat exhaustion risk', 'Limited water sources']
        },
        sandstorm: {
          weight: 20,
          descriptions: ['Sandstorm', 'Dust devil', 'Sand winds'],
          effects: ['Zero visibility', 'Difficult breathing', 'Dangerous conditions']
        },
        windy: {
          weight: 20,
          descriptions: ['Hot winds', 'Dusty breeze', 'Strong gusts'],
          effects: ['Flying sand', 'Reduced visibility']
        },
        cloudy: {
          weight: 10,
          descriptions: ['High clouds', 'Scattered clouds'],
          effects: ['Slightly cooler', 'Brief respite from sun']
        }
      }
    },
    tropical: {
      name: 'Tropical',
      description: 'Warm and humid with frequent rainfall',
      temperatureRange: { min: 20, max: 40 },
      conditions: {
        clear: {
          weight: 30,
          descriptions: ['Humid sunshine', 'Partly cloudy', 'Warm breeze'],
          effects: ['High humidity', 'Heat exhaustion risk']
        },
        rain: {
          weight: 35,
          descriptions: ['Tropical shower', 'Monsoon rain', 'Torrential downpour'],
          effects: ['Flash flood risk', 'Difficult travel', 'Limited visibility']
        },
        storm: {
          weight: 20,
          descriptions: ['Tropical storm', 'Thunder and lightning', 'Heavy winds'],
          effects: ['Dangerous conditions', 'Flooding risk', 'No travel advised']
        },
        cloudy: {
          weight: 15,
          descriptions: ['Humid overcast', 'Threatening clouds'],
          effects: ['High humidity', 'Storm approaching']
        }
      }
    }
  };

  const generateWeather = () => {
    setIsGenerating(true);
    
    const climate = climates[selectedClimate];
    
    // Adjust temperature range based on season and time
    let tempMin = climate.temperatureRange.min;
    let tempMax = climate.temperatureRange.max;
    
    switch (selectedSeason) {
      case 'summer':
        tempMin += 5;
        tempMax += 5;
        break;
      case 'winter':
        tempMin -= 5;
        tempMax -= 5;
        break;
    }
    
    if (selectedTime === 'night') {
      tempMin -= 5;
      tempMax -= 5;
    }

    // Select weather condition based on weights
    const totalWeight = Object.values(climate.conditions).reduce((sum, condition) => sum + condition.weight, 0);
    let random = Math.random() * totalWeight;
    let selectedCondition: string | null = null;
    
    for (const [condition, data] of Object.entries(climate.conditions)) {
      random -= data.weight;
      if (random <= 0) {
        selectedCondition = condition;
        break;
      }
    }

    if (!selectedCondition) {
      selectedCondition = Object.keys(climate.conditions)[0];
    }

    const conditionData = climate.conditions[selectedCondition];
    
    // Generate temperature
    const temperature = Math.floor(Math.random() * (tempMax - tempMin + 1)) + tempMin;
    
    // Generate wind speed
    const windSpeeds = ['calm', 'light breeze', 'moderate wind', 'strong wind', 'very strong wind'];
    const wind = windSpeeds[Math.floor(Math.random() * windSpeeds.length)];
    
    // Select random description and effects
    const description = conditionData.descriptions[Math.floor(Math.random() * conditionData.descriptions.length)];
    const effects = conditionData.effects;

    const newWeather: GeneratedWeather = {
      climate: climate.name,
      season: selectedSeason,
      timeOfDay: selectedTime,
      conditions: {
        temperature: `${temperature}°C`,
        description: description,
        wind: wind,
        precipitation: selectedCondition,
        effects: effects
      },
      timestamp: Date.now()
    };

    setGeneratedWeathers([newWeather, ...generatedWeathers].slice(0, 10));
    setIsGenerating(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <WrenchScrewdriverIcon className="h-8 w-8 text-purple-400" />
          <h1 className="text-3xl font-bold text-white">Weather Generator</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Controls */}
          <div>
            <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">Generate Weather</h2>
              
              <div className="space-y-6">
                {/* Climate Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Climate</label>
                  <div className="grid grid-cols-1 gap-2">
                    {Object.entries(climates).map(([key, climate]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedClimate(key)}
                        className={`p-4 rounded-lg border transition-all ${
                          selectedClimate === key
                            ? 'bg-purple-500/20 border-purple-500 text-white'
                            : 'bg-[#1B0A20] border-purple-500/30 text-gray-300 hover:bg-purple-500/10'
                        }`}
                      >
                        <div className="flex flex-col gap-1">
                          <span className="font-medium">{climate.name}</span>
                          <span className="text-sm text-gray-400">{climate.description}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Season Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Season</label>
                  <div className="grid grid-cols-2 gap-2">
                    {seasons.map(season => (
                      <button
                        key={season}
                        onClick={() => setSelectedSeason(season)}
                        className={`p-3 rounded-lg border transition-all ${
                          selectedSeason === season
                            ? 'bg-purple-500/20 border-purple-500 text-white'
                            : 'bg-[#1B0A20] border-purple-500/30 text-gray-300 hover:bg-purple-500/10'
                        }`}
                      >
                        {season.charAt(0).toUpperCase() + season.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Time of Day</label>
                  <div className="grid grid-cols-2 gap-2">
                    {times.map(time => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-lg border transition-all flex items-center justify-center gap-2 ${
                          selectedTime === time
                            ? 'bg-purple-500/20 border-purple-500 text-white'
                            : 'bg-[#1B0A20] border-purple-500/30 text-gray-300 hover:bg-purple-500/10'
                        }`}
                      >
                        {time === 'day' ? (
                          <SunIcon className="h-5 w-5" />
                        ) : (
                          <MoonIcon className="h-5 w-5" />
                        )}
                        {time.charAt(0).toUpperCase() + time.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={generateWeather}
                  disabled={isGenerating}
                  className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Generate Weather
                </button>
              </div>
            </div>
          </div>

          {/* Generated Weather History */}
          <div>
            <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-white mb-4">Weather Conditions</h2>
              
              <div className="space-y-6">
                {generatedWeathers.map((weather, index) => (
                  <div
                    key={weather.timestamp + index}
                    className="bg-[#1B0A20] rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-gray-700 pb-2">
                      <div>
                        <span className="text-white font-medium">{weather.climate}</span>
                        <span className="text-gray-400 text-sm ml-2">
                          ({weather.season}, {weather.timeOfDay})
                        </span>
                      </div>
                      <CloudIcon className="h-6 w-6 text-purple-400" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Temperature:</span>
                        <span className="text-white font-medium">{weather.conditions.temperature}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Conditions:</span>
                        <span className="text-white font-medium">{weather.conditions.description}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Wind:</span>
                        <span className="text-white font-medium">{weather.conditions.wind}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-700">
                      <span className="text-gray-400 text-sm">Effects:</span>
                      <ul className="mt-1 space-y-1">
                        {weather.conditions.effects.map((effect, effectIndex) => (
                          <li key={effectIndex} className="text-sm text-purple-300">
                            • {effect}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
                {generatedWeathers.length === 0 && (
                  <p className="text-gray-400 text-center py-4">
                    No weather generated yet
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 