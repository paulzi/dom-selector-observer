import matches  from 'polyshim/shim/matches';
import DomSelectorObserver from './src';

DomSelectorObserver.setShim(matches);

export default DomSelectorObserver;