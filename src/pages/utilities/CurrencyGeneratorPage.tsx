import { useState } from 'react';
import { WrenchScrewdriverIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Denomination {
  id: string;
  name: string;
  value: number;
  material: string;
  description: string;
  commonUses: string[];
}

interface ExchangeRate {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  notes: string;
}

interface HistoricalEvent {
  id: string;
  date: string;
  description: string;
  impact: string;
  type: 'devaluation' | 'revaluation' | 'introduction' | 'replacement' | 'crisis';
}

export function CurrencyGeneratorPage() {
  const [denominations, setDenominations] = useState<Denomination[]>([]);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);
  const [history, setHistory] = useState<HistoricalEvent[]>([]);
  const [newDenomination, setNewDenomination] = useState<Partial<Denomination>>({});
  const [newExchangeRate, setNewExchangeRate] = useState<Partial<ExchangeRate>>({});
  const [newEvent, setNewEvent] = useState<Partial<HistoricalEvent>>({});

  const materials = ['Gold', 'Silver', 'Copper', 'Platinum', 'Iron', 'Bronze', 'Gemstone', 'Paper', 'Other'];
  const eventTypes = ['devaluation', 'revaluation', 'introduction', 'replacement', 'crisis'];

  const handleAddDenomination = () => {
    if (newDenomination.name && newDenomination.value && newDenomination.material) {
      setDenominations([...denominations, {
        id: Date.now().toString(),
        name: newDenomination.name,
        value: Number(newDenomination.value),
        material: newDenomination.material,
        description: newDenomination.description || '',
        commonUses: newDenomination.commonUses || []
      }]);
      setNewDenomination({});
    }
  };

  const handleAddExchangeRate = () => {
    if (newExchangeRate.fromCurrency && newExchangeRate.toCurrency && newExchangeRate.rate) {
      setExchangeRates([...exchangeRates, {
        id: Date.now().toString(),
        fromCurrency: newExchangeRate.fromCurrency,
        toCurrency: newExchangeRate.toCurrency,
        rate: Number(newExchangeRate.rate),
        notes: newExchangeRate.notes || ''
      }]);
      setNewExchangeRate({});
    }
  };

  const handleAddEvent = () => {
    if (newEvent.date && newEvent.description && newEvent.type) {
      setHistory([...history, {
        id: Date.now().toString(),
        date: newEvent.date,
        description: newEvent.description,
        impact: newEvent.impact || '',
        type: newEvent.type as HistoricalEvent['type']
      }]);
      setNewEvent({});
    }
  };

  const handleDeleteDenomination = (id: string) => {
    setDenominations(denominations.filter(d => d.id !== id));
  };

  const handleDeleteExchangeRate = (id: string) => {
    setExchangeRates(exchangeRates.filter(r => r.id !== id));
  };

  const handleDeleteEvent = (id: string) => {
    setHistory(history.filter(e => e.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <WrenchScrewdriverIcon className="h-8 w-8 text-purple-400" />
          <h1 className="text-3xl font-bold text-white">Currency Generator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Denominations Section */}
          <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Denominations</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name (e.g., Crown)"
                  className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                  value={newDenomination.name || ''}
                  onChange={(e) => setNewDenomination({ ...newDenomination, name: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Value"
                  className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                  value={newDenomination.value || ''}
                  onChange={(e) => setNewDenomination({ ...newDenomination, value: parseFloat(e.target.value) })}
                />
                <select
                  className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                  value={newDenomination.material || ''}
                  onChange={(e) => setNewDenomination({ ...newDenomination, material: e.target.value })}
                >
                  <option value="">Select Material</option>
                  {materials.map(material => (
                    <option key={material} value={material}>{material}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Description"
                  className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                  value={newDenomination.description || ''}
                  onChange={(e) => setNewDenomination({ ...newDenomination, description: e.target.value })}
                />
              </div>
              <button
                onClick={handleAddDenomination}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <PlusIcon className="h-5 w-5" />
                Add Denomination
              </button>
            </div>

            <div className="mt-4 space-y-2">
              {denominations.map(denomination => (
                <div key={denomination.id} className="bg-[#1B0A20] rounded-lg p-4 flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-white">{denomination.name}</h3>
                    <p className="text-sm text-gray-400">Value: {denomination.value} • {denomination.material}</p>
                    {denomination.description && (
                      <p className="text-sm text-gray-400 mt-1">{denomination.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteDenomination(denomination.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            {/* Exchange Rates */}
            <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-white mb-4">Exchange Rates</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="From Currency"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newExchangeRate.fromCurrency || ''}
                    onChange={(e) => setNewExchangeRate({ ...newExchangeRate, fromCurrency: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="To Currency"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newExchangeRate.toCurrency || ''}
                    onChange={(e) => setNewExchangeRate({ ...newExchangeRate, toCurrency: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Exchange Rate"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newExchangeRate.rate || ''}
                    onChange={(e) => setNewExchangeRate({ ...newExchangeRate, rate: parseFloat(e.target.value) })}
                  />
                  <input
                    type="text"
                    placeholder="Notes"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newExchangeRate.notes || ''}
                    onChange={(e) => setNewExchangeRate({ ...newExchangeRate, notes: e.target.value })}
                  />
                </div>
                <button
                  onClick={handleAddExchangeRate}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <PlusIcon className="h-5 w-5" />
                  Add Exchange Rate
                </button>
              </div>

              <div className="mt-4 space-y-2">
                {exchangeRates.map(rate => (
                  <div key={rate.id} className="bg-[#1B0A20] rounded-lg p-4 flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-white">
                        {rate.fromCurrency} → {rate.toCurrency}
                      </h3>
                      <p className="text-sm text-gray-400">Rate: {rate.rate}</p>
                      {rate.notes && (
                        <p className="text-sm text-gray-400 mt-1">{rate.notes}</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteExchangeRate(rate.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Historical Events */}
            <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-white mb-4">Historical Events</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Date"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newEvent.date || ''}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  />
                  <select
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newEvent.type || ''}
                    onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as HistoricalEvent['type'] })}
                  >
                    <option value="">Select Type</option>
                    {eventTypes.map(type => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Description"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newEvent.description || ''}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Economic Impact"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newEvent.impact || ''}
                    onChange={(e) => setNewEvent({ ...newEvent, impact: e.target.value })}
                  />
                </div>
                <button
                  onClick={handleAddEvent}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <PlusIcon className="h-5 w-5" />
                  Add Historical Event
                </button>
              </div>

              <div className="mt-4 space-y-2">
                {history.map(event => (
                  <div key={event.id} className="bg-[#1B0A20] rounded-lg p-4 flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-white">{event.date}</h3>
                        <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs">
                          {event.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{event.description}</p>
                      {event.impact && (
                        <p className="text-sm text-purple-400 mt-1">Impact: {event.impact}</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
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