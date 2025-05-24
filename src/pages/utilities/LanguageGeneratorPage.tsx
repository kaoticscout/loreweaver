import { useState } from 'react';
import { WrenchScrewdriverIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Letter {
  id: string;
  character: string;
  pronunciation: string;
  usage: string;
  variants?: string[];
}

interface GrammarRule {
  id: string;
  name: string;
  description: string;
  examples: string[];
  category: 'syntax' | 'morphology' | 'phonology' | 'other';
}

interface Phrase {
  id: string;
  original: string;
  pronunciation: string;
  translation: string;
  context: string;
  category: string;
}

interface WordRoot {
  id: string;
  root: string;
  meaning: string;
  derivatives: string[];
  origin: string;
}

export function LanguageGeneratorPage() {
  const [alphabet, setAlphabet] = useState<Letter[]>([]);
  const [grammarRules, setGrammarRules] = useState<GrammarRule[]>([]);
  const [commonPhrases, setCommonPhrases] = useState<Phrase[]>([]);
  const [wordRoots, setWordRoots] = useState<WordRoot[]>([]);
  const [newLetter, setNewLetter] = useState<Partial<Letter>>({});
  const [newRule, setNewRule] = useState<Partial<GrammarRule>>({});
  const [newPhrase, setNewPhrase] = useState<Partial<Phrase>>({});
  const [newRoot, setNewRoot] = useState<Partial<WordRoot>>({});

  const grammarCategories = ['syntax', 'morphology', 'phonology', 'other'];
  const phraseCategories = [
    'Greetings', 'Farewells', 'Courtesy', 'Questions',
    'Commands', 'Emotions', 'Time', 'Weather', 'Other'
  ];

  const handleAddLetter = () => {
    if (newLetter.character && newLetter.pronunciation) {
      setAlphabet([...alphabet, {
        id: Date.now().toString(),
        character: newLetter.character,
        pronunciation: newLetter.pronunciation,
        usage: newLetter.usage || '',
        variants: newLetter.variants || []
      }]);
      setNewLetter({});
    }
  };

  const handleAddRule = () => {
    if (newRule.name && newRule.description && newRule.category) {
      setGrammarRules([...grammarRules, {
        id: Date.now().toString(),
        name: newRule.name,
        description: newRule.description,
        examples: newRule.examples || [],
        category: newRule.category as 'syntax' | 'morphology' | 'phonology' | 'other'
      }]);
      setNewRule({});
    }
  };

  const handleAddPhrase = () => {
    if (newPhrase.original && newPhrase.translation) {
      setCommonPhrases([...commonPhrases, {
        id: Date.now().toString(),
        original: newPhrase.original,
        pronunciation: newPhrase.pronunciation || '',
        translation: newPhrase.translation,
        context: newPhrase.context || '',
        category: newPhrase.category || 'Other'
      }]);
      setNewPhrase({});
    }
  };

  const handleAddRoot = () => {
    if (newRoot.root && newRoot.meaning) {
      setWordRoots([...wordRoots, {
        id: Date.now().toString(),
        root: newRoot.root,
        meaning: newRoot.meaning,
        derivatives: newRoot.derivatives || [],
        origin: newRoot.origin || ''
      }]);
      setNewRoot({});
    }
  };

  const handleDeleteLetter = (id: string) => {
    setAlphabet(alphabet.filter(l => l.id !== id));
  };

  const handleDeleteRule = (id: string) => {
    setGrammarRules(grammarRules.filter(r => r.id !== id));
  };

  const handleDeletePhrase = (id: string) => {
    setCommonPhrases(commonPhrases.filter(p => p.id !== id));
  };

  const handleDeleteRoot = (id: string) => {
    setWordRoots(wordRoots.filter(r => r.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <WrenchScrewdriverIcon className="h-8 w-8 text-purple-400" />
          <h1 className="text-3xl font-bold text-white">Language Generator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Alphabet Section */}
          <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Alphabet</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Character"
                  className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                  value={newLetter.character || ''}
                  onChange={(e) => setNewLetter({ ...newLetter, character: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Pronunciation"
                  className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                  value={newLetter.pronunciation || ''}
                  onChange={(e) => setNewLetter({ ...newLetter, pronunciation: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Usage Examples"
                  className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                  value={newLetter.usage || ''}
                  onChange={(e) => setNewLetter({ ...newLetter, usage: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Variants (comma-separated)"
                  className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                  value={newLetter.variants?.join(', ') || ''}
                  onChange={(e) => setNewLetter({ ...newLetter, variants: e.target.value.split(',').map(v => v.trim()) })}
                />
              </div>
              <button
                onClick={handleAddLetter}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <PlusIcon className="h-5 w-5" />
                Add Letter
              </button>
            </div>

            <div className="mt-4 space-y-2">
              {alphabet.map(letter => (
                <div key={letter.id} className="bg-[#1B0A20] rounded-lg p-4 flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-white text-2xl">{letter.character}</h3>
                      <span className="text-gray-400">[{letter.pronunciation}]</span>
                    </div>
                    {letter.usage && (
                      <p className="text-sm text-gray-400 mt-1">Usage: {letter.usage}</p>
                    )}
                    {letter.variants && letter.variants.length > 0 && (
                      <p className="text-sm text-purple-400 mt-1">
                        Variants: {letter.variants.join(', ')}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteLetter(letter.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            {/* Grammar Rules */}
            <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-white mb-4">Grammar Rules</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Rule Name"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newRule.name || ''}
                    onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                  />
                  <select
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newRule.category || ''}
                    onChange={(e) => setNewRule({ ...newRule, category: e.target.value as GrammarRule['category'] })}
                  >
                    <option value="">Select Category</option>
                    {grammarCategories.map(category => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Description"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2 col-span-2"
                    value={newRule.description || ''}
                    onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Examples (comma-separated)"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2 col-span-2"
                    value={newRule.examples?.join(', ') || ''}
                    onChange={(e) => setNewRule({ ...newRule, examples: e.target.value.split(',').map(ex => ex.trim()) })}
                  />
                </div>
                <button
                  onClick={handleAddRule}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <PlusIcon className="h-5 w-5" />
                  Add Grammar Rule
                </button>
              </div>

              <div className="mt-4 space-y-2">
                {grammarRules.map(rule => (
                  <div key={rule.id} className="bg-[#1B0A20] rounded-lg p-4 flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-white">{rule.name}</h3>
                        <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs">
                          {rule.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{rule.description}</p>
                      {rule.examples.length > 0 && (
                        <p className="text-sm text-purple-400 mt-1">
                          Examples: {rule.examples.join(', ')}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteRule(rule.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Phrases */}
            <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-white mb-4">Common Phrases</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Original Phrase"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newPhrase.original || ''}
                    onChange={(e) => setNewPhrase({ ...newPhrase, original: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Pronunciation"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newPhrase.pronunciation || ''}
                    onChange={(e) => setNewPhrase({ ...newPhrase, pronunciation: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Translation"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newPhrase.translation || ''}
                    onChange={(e) => setNewPhrase({ ...newPhrase, translation: e.target.value })}
                  />
                  <select
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newPhrase.category || ''}
                    onChange={(e) => setNewPhrase({ ...newPhrase, category: e.target.value })}
                  >
                    <option value="">Select Category</option>
                    {phraseCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Usage Context"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2 col-span-2"
                    value={newPhrase.context || ''}
                    onChange={(e) => setNewPhrase({ ...newPhrase, context: e.target.value })}
                  />
                </div>
                <button
                  onClick={handleAddPhrase}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <PlusIcon className="h-5 w-5" />
                  Add Phrase
                </button>
              </div>

              <div className="mt-4 space-y-2">
                {commonPhrases.map(phrase => (
                  <div key={phrase.id} className="bg-[#1B0A20] rounded-lg p-4 flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-white">{phrase.original}</h3>
                        <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs">
                          {phrase.category}
                        </span>
                      </div>
                      {phrase.pronunciation && (
                        <p className="text-sm text-gray-400">[{phrase.pronunciation}]</p>
                      )}
                      <p className="text-sm text-purple-400 mt-1">{phrase.translation}</p>
                      {phrase.context && (
                        <p className="text-sm text-gray-400 mt-1">Context: {phrase.context}</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeletePhrase(phrase.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Word Roots */}
            <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-white mb-4">Word Roots</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Root Word"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newRoot.root || ''}
                    onChange={(e) => setNewRoot({ ...newRoot, root: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Meaning"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newRoot.meaning || ''}
                    onChange={(e) => setNewRoot({ ...newRoot, meaning: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Origin"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newRoot.origin || ''}
                    onChange={(e) => setNewRoot({ ...newRoot, origin: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Derivatives (comma-separated)"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newRoot.derivatives?.join(', ') || ''}
                    onChange={(e) => setNewRoot({ ...newRoot, derivatives: e.target.value.split(',').map(d => d.trim()) })}
                  />
                </div>
                <button
                  onClick={handleAddRoot}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <PlusIcon className="h-5 w-5" />
                  Add Word Root
                </button>
              </div>

              <div className="mt-4 space-y-2">
                {wordRoots.map(root => (
                  <div key={root.id} className="bg-[#1B0A20] rounded-lg p-4 flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-white">{root.root}</h3>
                        <span className="text-gray-400">"{root.meaning}"</span>
                      </div>
                      {root.origin && (
                        <p className="text-sm text-gray-400">Origin: {root.origin}</p>
                      )}
                      {root.derivatives.length > 0 && (
                        <p className="text-sm text-purple-400 mt-1">
                          Derivatives: {root.derivatives.join(', ')}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteRoot(root.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 