import { useState } from 'react';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { Dice3D } from '../../components/Dice3D';

interface DiceRoll {
  type: string;
  result: number;
  timestamp: number;
}

export function DiceRollerPage() {
  const [rolls, setRolls] = useState<DiceRoll[]>([]);
  const [customDice, setCustomDice] = useState('');
  const [rollCount, setRollCount] = useState(1);
  const [currentDice, setCurrentDice] = useState<{ sides: number; result: number | null }>({ sides: 20, result: null });
  const [isRolling, setIsRolling] = useState(false);

  const diceTypes = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'];

  const rollDice = (sides: number) => {
    if (isRolling) return;
    
    setIsRolling(true);
    setCurrentDice({ sides, result: null });

    // Add a slight delay to let the dice animation play
    setTimeout(() => {
      const newRolls = Array.from({ length: rollCount }, () => ({
        type: `d${sides}`,
        result: Math.floor(Math.random() * sides) + 1,
        timestamp: Date.now()
      }));

      setCurrentDice({ sides, result: newRolls[0].result });
      setRolls([...newRolls, ...rolls].slice(0, 50)); // Keep last 50 rolls
    }, 100);
  };

  const rollCustomDice = () => {
    if (isRolling) return;

    const match = customDice.match(/^(\d+)?d(\d+)([+-]\d+)?$/i);
    if (!match) return;

    const count = parseInt(match[1] || '1');
    const sides = parseInt(match[2]);
    const modifier = parseInt(match[3] || '0');

    if (count > 100) return; // Limit to 100 dice per roll

    setIsRolling(true);
    setCurrentDice({ sides, result: null });

    // Add a slight delay to let the dice animation play
    setTimeout(() => {
      const results = Array.from({ length: count }, () => Math.floor(Math.random() * sides) + 1);
      const total = results.reduce((a, b) => a + b, 0) + modifier;

      const newRoll = {
        type: customDice,
        result: total,
        timestamp: Date.now()
      };

      setCurrentDice({ sides, result: total });
      setRolls([newRoll, ...rolls].slice(0, 50));
    }, 100);
  };

  const handleRollComplete = () => {
    setIsRolling(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <WrenchScrewdriverIcon className="h-8 w-8 text-purple-400" />
          <h1 className="text-3xl font-bold text-white">Dice Roller</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Dice Controls */}
          <div>
            <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">Roll Dice</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Number of Dice</label>
                <input
                  type="number"
                  value={rollCount}
                  onChange={(e) => setRollCount(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                  className="w-full bg-[#1B0A20] border border-purple-500/30 rounded-lg px-4 py-2 text-white mb-4"
                  min="1"
                  max="10"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {diceTypes.map(dice => {
                  const sides = parseInt(dice.substring(1));
                  return (
                    <button
                      key={dice}
                      onClick={() => rollDice(sides)}
                      disabled={isRolling}
                      className="bg-[#1B0A20] hover:bg-[#2D1B36] border border-purple-500/30 rounded-lg p-4 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {dice}
                    </button>
                  );
                })}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Custom Roll</label>
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={customDice}
                    onChange={(e) => setCustomDice(e.target.value)}
                    placeholder="e.g., 2d6+3"
                    className="flex-1 bg-[#1B0A20] border border-purple-500/30 rounded-lg px-4 py-2 text-white"
                  />
                  <button
                    onClick={rollCustomDice}
                    disabled={isRolling}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Roll
                  </button>
                </div>
                <p className="text-gray-400 text-sm mt-2">Format: [number]d[sides]+/-[modifier] (e.g., 2d6+3)</p>
              </div>
            </div>

            {/* Roll History */}
            <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-white mb-4">Roll History</h2>
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {rolls.map((roll, index) => (
                  <div
                    key={roll.timestamp + index}
                    className="flex items-center justify-between bg-[#1B0A20] p-3 rounded-lg"
                  >
                    <span className="text-gray-300">{roll.type}</span>
                    <span className="text-xl font-bold text-white">{roll.result}</span>
                  </div>
                ))}
                {rolls.length === 0 && (
                  <p className="text-gray-400 text-center py-4">No rolls yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - 3D Dice */}
          <div className="flex flex-col gap-8">
            <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-white mb-4">3D Dice</h2>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 rounded-lg"></div>
                <div className="relative">
                  <Dice3D
                    sides={currentDice.sides}
                    result={currentDice.result}
                    rolling={isRolling}
                    onRollComplete={handleRollComplete}
                  />
                </div>
              </div>
              {currentDice.result && !isRolling && (
                <div className="mt-4 text-center">
                  <span className="text-3xl font-bold text-purple-400">
                    {currentDice.result}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 