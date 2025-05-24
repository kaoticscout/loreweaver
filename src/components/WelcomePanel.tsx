import { MapIcon } from '@heroicons/react/24/outline'

export function WelcomePanel() {
  return (
    <div className="h-full bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <MapIcon className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">Sword Coast Explorer</h2>
          <p className="text-gray-400 mb-8">Select a region to begin your journey</p>
        </div>
      </div>
    </div>
  )
} 