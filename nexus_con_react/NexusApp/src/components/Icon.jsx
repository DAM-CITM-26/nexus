import accessibility from '../assets/icons/accessibility.svg';
import arrow from '../assets/icons/arrow.svg';
import bell from '../assets/icons/bell.svg';
import campanaNo from '../assets/icons/campanaNo.svg';
import check from '../assets/icons/check.svg';
import close from '../assets/icons/close.svg';
import crosshair from '../assets/icons/crosshair.svg';
import dotsH from '../assets/icons/dotsH.svg';
import dotsMain from '../assets/icons/dotsMain.svg';
import edit from '../assets/icons/edit.svg';
import eye from '../assets/icons/eye.svg';
import filtros from '../assets/icons/filtros.svg';
import home from '../assets/icons/home.svg';
import homeBlack from '../assets/icons/homeBlack.svg';
import location_on from '../assets/icons/location_on.svg';
import lupa from '../assets/icons/lupa.svg';
import plus from '../assets/icons/plus.svg';
import progres from '../assets/icons/progres.svg';
import Settings from '../assets/icons/Settings.svg';
import LogoOGR from '../assets/logos/LogoOGR.svg';
import LogoRemakeA from '../assets/logos/LogoRemakeA.svg';

const iconsMap = {
  accessibility: accessibility,   bell: bell,   campanaNo: campanaNo,   check: check,
  close: close,   crosshair: crosshair,   dotsH: dotsH,   dotsMain: dotsMain,
  edit: edit,   eye: eye,   filtros: filtros,   home: home,    homeBlack: homeBlack,
  location_on: location_on,   lupa: lupa,   plus: plus,   progres: progres,
  Settings: Settings,   LogoOGR: LogoOGR,   LogoRemakeA: LogoRemakeA,  arrow: arrow,
};

export default function Icon({ name, size = 24, alt = 'icon', className = '' }) {
  const iconSrc = iconsMap[name];

  if (!iconSrc) return null;

  return (
    <img 
      src={iconSrc} 
      alt={alt || name} 
      width={size} 
      height={size} 
      className={`app-icon ${className}`} 
    />
  );
}