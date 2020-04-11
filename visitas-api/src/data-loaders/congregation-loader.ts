import fixtures from '../assets/fixtures';

export const congregationLoader = {
  // Pull cong data from cache when possible
  get: (code: string) => {
    console.log('congregationLoader.get', code);
    return fixtures.congs.find(c => c.code === code);
  }
};