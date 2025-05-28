import { LocationType } from '../types/location';
import {
  BuildingOffice2Icon,
  HomeIcon,
  GlobeAmericasIcon,
  BuildingLibraryIcon,
  BuildingStorefrontIcon,
  ShieldExclamationIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  BanknotesIcon,
  FlagIcon
} from '@heroicons/react/24/outline';

export function getLocationIcon(type: LocationType, className: string = "") {
  switch (type) {
    case 'Large City':
      return <BuildingOffice2Icon className={className} />;
    case 'City':
      return <BuildingOfficeIcon className={className} />;
    case 'Village':
      return <HomeIcon className={className} />;
    case 'Landmark':
      return <GlobeAmericasIcon className={className} />;
    case 'Ruins':
      return <BuildingLibraryIcon className={className} />;
    case 'Stronghold':
      return <ShieldExclamationIcon className={className} />;
    case 'Fort':
      return <FlagIcon className={className} />;
    case 'Point of Interest':
      return <MapPinIcon className={className} />;
    case 'Shop':
      return <BanknotesIcon className={className} />;
    default:
      return <MapPinIcon className={className} />;
  }
}

export function getLocationSize(type: LocationType) {
  switch (type) {
    case 'Large City':
      return { width: 32, height: 32 };
    case 'City':
      return { width: 28, height: 28 };
    case 'Village':
      return { width: 24, height: 24 };
    case 'Landmark':
    case 'Ruins':
    case 'Stronghold':
    case 'Fort':
      return { width: 26, height: 26 };
    case 'Point of Interest':
    case 'Shop':
      return { width: 22, height: 22 };
    default:
      return { width: 24, height: 24 };
  }
}

export function getLocationColor(type: LocationType) {
  switch (type) {
    case 'Large City':
      return 'border-yellow-400';
    case 'City':
      return 'border-blue-400';
    case 'Village':
      return 'border-green-400';
    case 'Landmark':
      return 'border-purple-400';
    case 'Ruins':
      return 'border-red-400';
    case 'Stronghold':
      return 'border-orange-400';
    case 'Fort':
      return 'border-indigo-400';
    case 'Point of Interest':
      return 'border-pink-400';
    case 'Shop':
      return 'border-emerald-400';
    default:
      return 'border-gray-400';
  }
} 