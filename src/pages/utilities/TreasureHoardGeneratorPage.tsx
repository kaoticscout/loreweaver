import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';

export function TreasureHoardGeneratorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <WrenchScrewdriverIcon className="h-8 w-8 text-purple-400" />
          <h1 className="text-3xl font-bold text-white">Treasure Hoard Generator</h1>
        </div>
        <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg">
          <p className="text-gray-400 text-center">Coming soon! Generate epic treasure hoards with rare items, artifacts, and valuable collectibles.</p>
        </div>
      </div>
    </div>
  );
} 