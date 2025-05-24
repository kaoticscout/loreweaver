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