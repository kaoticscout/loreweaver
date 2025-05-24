import { useState } from 'react';
import { WrenchScrewdriverIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

interface Monster {
  name: string;
  cr: number;
  count: number;
}

interface PartyMember {
  level: number;
  count: number;
}

export function EncounterBuilderPage() {
  const [party, setParty] = useState<PartyMember[]>([{ level: 1, count: 4 }]);
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [newMonster, setNewMonster] = useState<Monster>({ name: '', cr: 0.25, count: 1 });

  const calculateXP = (cr: number): number => {
    const xpByCR: { [key: number]: number } = {
      0: 10, 0.125: 25, 0.25: 50, 0.5: 100, 1: 200, 2: 450, 3: 700, 4: 1100,
      5: 1800, 6: 2300, 7: 2900, 8: 3900, 9: 5000, 10: 5900, 11: 7200,
      12: 8400, 13: 10000, 14: 11500, 15: 13000, 16: 15000, 17: 18000,
      18: 20000, 19: 22000, 20: 25000, 21: 33000, 22: 41000, 23: 50000,
      24: 62000, 25: 75000, 26: 90000, 27: 105000, 28: 120000, 29: 135000, 30: 155000
    };
    return xpByCR[cr] || 0;
  };

  const calculateEncounterDifficulty = () => {
    const totalPartyMembers = party.reduce((sum, member) => sum + member.count, 0);
    const totalMonsterXP = monsters.reduce((sum, monster) => sum + calculateXP(monster.cr) * monster.count, 0);
    
    // XP Thresholds by Character Level
    const thresholds = {
      1: { easy: 25, medium: 50, hard: 75, deadly: 100 },
      2: { easy: 50, medium: 100, hard: 150, deadly: 200 },
      // Add more thresholds as needed
    };

    let partyThresholds = {
      easy: 0,
      medium: 0,
      hard: 0,
      deadly: 0
    };

    party.forEach(member => {
      const levelThresholds = thresholds[member.level as keyof typeof thresholds] || thresholds[1];
      partyThresholds.easy += levelThresholds.easy * member.count;
      partyThresholds.medium += levelThresholds.medium * member.count;
      partyThresholds.hard += levelThresholds.hard * member.count;
      partyThresholds.deadly += levelThresholds.deadly * member.count;
    });

    if (totalMonsterXP <= partyThresholds.easy) return 'Easy';
    if (totalMonsterXP <= partyThresholds.medium) return 'Medium';
    if (totalMonsterXP <= partyThresholds.hard) return 'Hard';
    return 'Deadly';
  };

  const addMonster = () => {
    if (newMonster.name.trim() === '') return;
    setMonsters([...monsters, { ...newMonster }]);
    setNewMonster({ name: '', cr: 0.25, count: 1 });
  };

  const removeMonster = (index: number) => {
    setMonsters(monsters.filter((_, i) => i !== index));
  };

  const addPartyMember = () => {
    setParty([...party, { level: 1, count: 1 }]);
  };

  const removePartyMember = (index: number) => {
    setParty(party.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <WrenchScrewdriverIcon className="h-8 w-8 text-purple-400" />
          <h1 className="text-3xl font-bold text-white">Encounter Builder</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Party Section */}
          <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Party Composition</h2>
            
            {party.map((member, index) => (
              <div key={index} className="flex items-center gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Level</label>
                  <input
                    type="number"
                    value={member.level}
                    onChange={(e) => {
                      const newParty = [...party];
                      newParty[index].level = Math.max(1, Math.min(20, parseInt(e.target.value) || 1));
                      setParty(newParty);
                    }}
                    className="w-full bg-[#1B0A20] border border-purple-500/30 rounded-lg px-4 py-2 text-white"
                    min="1"
                    max="20"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Count</label>
                  <input
                    type="number"
                    value={member.count}
                    onChange={(e) => {
                      const newParty = [...party];
                      newParty[index].count = Math.max(1, parseInt(e.target.value) || 1);
                      setParty(newParty);
                    }}
                    className="w-full bg-[#1B0A20] border border-purple-500/30 rounded-lg px-4 py-2 text-white"
                    min="1"
                  />
                </div>
                <button
                  onClick={() => removePartyMember(index)}
                  className="mt-8 p-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  <MinusIcon className="h-5 w-5" />
                </button>
              </div>
            ))}

            <button
              onClick={addPartyMember}
              className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <PlusIcon className="h-5 w-5" />
              Add Party Member
            </button>
          </div>

          {/* Monsters Section */}
          <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Monsters</h2>
            
            <div className="mb-6">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={newMonster.name}
                    onChange={(e) => setNewMonster({ ...newMonster, name: e.target.value })}
                    className="w-full bg-[#1B0A20] border border-purple-500/30 rounded-lg px-4 py-2 text-white"
                    placeholder="Monster name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">CR</label>
                  <select
                    value={newMonster.cr}
                    onChange={(e) => setNewMonster({ ...newMonster, cr: parseFloat(e.target.value) })}
                    className="w-full bg-[#1B0A20] border border-purple-500/30 rounded-lg px-4 py-2 text-white"
                  >
                    {[0, 0.125, 0.25, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(cr => (
                      <option key={cr} value={cr}>{cr}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Count</label>
                  <input
                    type="number"
                    value={newMonster.count}
                    onChange={(e) => setNewMonster({ ...newMonster, count: Math.max(1, parseInt(e.target.value) || 1) })}
                    className="w-full bg-[#1B0A20] border border-purple-500/30 rounded-lg px-4 py-2 text-white"
                    min="1"
                  />
                </div>
              </div>
              <button
                onClick={addMonster}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <PlusIcon className="h-5 w-5" />
                Add Monster
              </button>
            </div>

            {monsters.map((monster, index) => (
              <div key={index} className="flex items-center justify-between bg-[#1B0A20] p-3 rounded-lg mb-2">
                <div className="flex-1">
                  <span className="text-white">{monster.name}</span>
                  <span className="text-gray-400 text-sm ml-2">
                    (CR {monster.cr} × {monster.count})
                  </span>
                </div>
                <button
                  onClick={() => removeMonster(index)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <MinusIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Encounter Summary */}
        {monsters.length > 0 && (
          <div className="mt-8 bg-[#2D1B36] rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Encounter Summary</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1B0A20] p-4 rounded-lg">
                <p className="text-gray-300 mb-2">Total XP</p>
                <p className="text-2xl font-bold text-white">
                  {monsters.reduce((sum, monster) => sum + calculateXP(monster.cr) * monster.count, 0).toLocaleString()}
                </p>
              </div>
              <div className="bg-[#1B0A20] p-4 rounded-lg">
                <p className="text-gray-300 mb-2">Difficulty</p>
                <p className="text-2xl font-bold text-white">{calculateEncounterDifficulty()}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 