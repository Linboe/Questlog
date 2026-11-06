import { getGames } from './utils/games';

getGames('all').then(console.log).catch(console.error);
getGames('playing').then(console.log).catch(console.error);
