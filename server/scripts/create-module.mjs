import 'zx/globals';
import minimist from 'minimist';

export const args = minimist(process.argv.slice(2));

try {
  if (!args.name) {
    throw new Error('param name must be specified');
  }

  await $`nest g co ${args.name}`;
  await $`nest g mo ${args.name}`;
  await $`nest g s ${args.name}`;

  echo('---create module success---');
} catch (error) {
  echo('***error***: ' + error);
}
