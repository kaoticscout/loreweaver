import { useState } from 'react';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';

export function NameGeneratorPage() {
  const [names, setNames] = useState<string[]>([]);
  const [nameType, setNameType] = useState('fantasy');
  const [count, setCount] = useState(5);

  const generateNames = () => {
    // This is a simple example - you would want to expand this with more sophisticated name generation
    const fantasyPrefixes = ['Aer', 'Bal', 'Cal', 'Dor', 'El', 'Fae', 'Gal', 'Hel', 'Il', 'Jor'];
    const fantasySuffixes = ['ion', 'or', 'an', 'il', 'ar', 'en', 'ir', 'us', 'ix', 'yn'];
    
    const modernPrefixes = ['Sam', 'Alex', 'Chris', 'Pat', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Quinn'];
    const modernSuffixes = ['son', 'ton', 'er', 'ley', 'den', '', 'ing', 'ford', 'well', 'worth'];

    const prefixes = nameType === 'fantasy' ? fantasyPrefixes : modernPrefixes;
    const suffixes = nameType === 'fantasy' ? fantasySuffixes : modernSuffixes;

    const newNames = Array.from({ length: count }, () => {
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
      return prefix + suffix;
    });

    setNames(newNames);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <WrenchScrewdriverIcon className="h-8 w-8 text-purple-400" />
          <h1 className="text-3xl font-bold text-white">Name Generator</h1>
        </div>

        <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Name Type</label>
              <select
                value={nameType}
                onChange={(e) => setNameType(e.target.value)}
                className="w-full bg-[#1B0A20] border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="fantasy">Fantasy</option>
                <option value="modern">Modern</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Number of Names</label>
              <input
                type="number"
                value={count}
                onChange={(e) => setCount(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
                className="w-full bg-[#1B0A20] border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                min="1"
                max="20"
              />
            </div>
          </div>

          <button
            onClick={generateNames}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Generate Names
          </button>
        </div>

        {names.length > 0 && (
          <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Generated Names</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {names.map((name, index) => (
                <div
                  key={index}
                  className="bg-[#1B0A20] rounded-lg p-3 text-center text-white border border-purple-500/30"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 