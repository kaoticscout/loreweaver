import { useState } from 'react';
import { WrenchScrewdriverIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Month {
  id: string;
  name: string;
  days: number;
  season: string;
  description: string;
}

interface Festival {
  id: string;
  name: string;
  date: string;
  description: string;
  type: 'religious' | 'cultural' | 'seasonal' | 'historical';
}

interface AstronomicalEvent {
  id: string;
  name: string;
  date: string;
  description: string;
  effect: string;
}

export function CalendarGeneratorPage() {
  const [months, setMonths] = useState<Month[]>([]);
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [astronomicalEvents, setAstronomicalEvents] = useState<AstronomicalEvent[]>([]);
  const [newMonth, setNewMonth] = useState<Partial<Month>>({});
  const [newFestival, setNewFestival] = useState<Partial<Festival>>({});
  const [newEvent, setNewEvent] = useState<Partial<AstronomicalEvent>>({});

  const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
  const festivalTypes = ['religious', 'cultural', 'seasonal', 'historical'];

  const handleAddMonth = () => {
    if (newMonth.name && newMonth.days && newMonth.season) {
      setMonths([...months, { 
        id: Date.now().toString(),
        name: newMonth.name,
        days: Number(newMonth.days),
        season: newMonth.season,
        description: newMonth.description || ''
      }]);
      setNewMonth({});
    }
  };

  const handleAddFestival = () => {
    if (newFestival.name && newFestival.date && newFestival.type) {
      setFestivals([...festivals, {
        id: Date.now().toString(),
        name: newFestival.name,
        date: newFestival.date,
        description: newFestival.description || '',
        type: newFestival.type as 'religious' | 'cultural' | 'seasonal' | 'historical'
      }]);
      setNewFestival({});
    }
  };

  const handleAddEvent = () => {
    if (newEvent.name && newEvent.date) {
      setAstronomicalEvents([...astronomicalEvents, {
        id: Date.now().toString(),
        name: newEvent.name,
        date: newEvent.date,
        description: newEvent.description || '',
        effect: newEvent.effect || ''
      }]);
      setNewEvent({});
    }
  };

  const handleDeleteMonth = (id: string) => {
    setMonths(months.filter(month => month.id !== id));
  };

  const handleDeleteFestival = (id: string) => {
    setFestivals(festivals.filter(festival => festival.id !== id));
  };

  const handleDeleteEvent = (id: string) => {
    setAstronomicalEvents(astronomicalEvents.filter(event => event.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <WrenchScrewdriverIcon className="h-8 w-8 text-purple-400" />
          <h1 className="text-3xl font-bold text-white">Calendar Generator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Months Section */}
          <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Months</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Month Name"
                  className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                  value={newMonth.name || ''}
                  onChange={(e) => setNewMonth({ ...newMonth, name: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Days"
                  className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                  value={newMonth.days || ''}
                  onChange={(e) => setNewMonth({ ...newMonth, days: parseInt(e.target.value) })}
                />
                <select
                  className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                  value={newMonth.season || ''}
                  onChange={(e) => setNewMonth({ ...newMonth, season: e.target.value })}
                >
                  <option value="">Select Season</option>
                  {seasons.map(season => (
                    <option key={season} value={season}>{season}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Description"
                  className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                  value={newMonth.description || ''}
                  onChange={(e) => setNewMonth({ ...newMonth, description: e.target.value })}
                />
              </div>
              <button
                onClick={handleAddMonth}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <PlusIcon className="h-5 w-5" />
                Add Month
              </button>
            </div>

            <div className="mt-4 space-y-2">
              {months.map(month => (
                <div key={month.id} className="bg-[#1B0A20] rounded-lg p-4 flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-white">{month.name}</h3>
                    <p className="text-sm text-gray-400">{month.days} days • {month.season}</p>
                    {month.description && (
                      <p className="text-sm text-gray-400 mt-1">{month.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteMonth(month.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Festivals and Events Section */}
          <div className="space-y-8">
            {/* Festivals */}
            <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-white mb-4">Festivals</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Festival Name"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newFestival.name || ''}
                    onChange={(e) => setNewFestival({ ...newFestival, name: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Date"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newFestival.date || ''}
                    onChange={(e) => setNewFestival({ ...newFestival, date: e.target.value })}
                  />
                  <select
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newFestival.type || ''}
                    onChange={(e) => setNewFestival({ ...newFestival, type: e.target.value as any })}
                  >
                    <option value="">Select Type</option>
                    {festivalTypes.map(type => (
                      <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Description"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newFestival.description || ''}
                    onChange={(e) => setNewFestival({ ...newFestival, description: e.target.value })}
                  />
                </div>
                <button
                  onClick={handleAddFestival}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <PlusIcon className="h-5 w-5" />
                  Add Festival
                </button>
              </div>

              <div className="mt-4 space-y-2">
                {festivals.map(festival => (
                  <div key={festival.id} className="bg-[#1B0A20] rounded-lg p-4 flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-white">{festival.name}</h3>
                      <p className="text-sm text-gray-400">{festival.date} • {festival.type}</p>
                      {festival.description && (
                        <p className="text-sm text-gray-400 mt-1">{festival.description}</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteFestival(festival.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Astronomical Events */}
            <div className="bg-[#2D1B36] rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-white mb-4">Astronomical Events</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Event Name"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newEvent.name || ''}
                    onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Date"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newEvent.date || ''}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newEvent.description || ''}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Magical Effect"
                    className="bg-[#1B0A20] text-white rounded-lg px-4 py-2"
                    value={newEvent.effect || ''}
                    onChange={(e) => setNewEvent({ ...newEvent, effect: e.target.value })}
                  />
                </div>
                <button
                  onClick={handleAddEvent}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <PlusIcon className="h-5 w-5" />
                  Add Event
                </button>
              </div>

              <div className="mt-4 space-y-2">
                {astronomicalEvents.map(event => (
                  <div key={event.id} className="bg-[#1B0A20] rounded-lg p-4 flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-white">{event.name}</h3>
                      <p className="text-sm text-gray-400">{event.date}</p>
                      {event.description && (
                        <p className="text-sm text-gray-400 mt-1">{event.description}</p>
                      )}
                      {event.effect && (
                        <p className="text-sm text-purple-400 mt-1">Effect: {event.effect}</p>
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