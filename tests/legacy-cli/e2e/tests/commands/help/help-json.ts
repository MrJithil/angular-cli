import { silentNg } from '../../../utils/process';

export default async function () {
  // This test is use as a sanity check.
  const addHelpOutputSnapshot = JSON.stringify({
    'name': 'analytics',
    'command': 'ng analytics <setting>',
    'shortDescription': 'Configures the gathering of Angular CLI usage metrics.',
    'longDescriptionRelativePath': '@angular/cli/src/commands/analytics/long-description.md',
    'longDescription':
      'The value of `setting` is one of the following.\n\n- `on`: Enables analytics gathering and reporting for the user.\n- `off`: Disables analytics gathering and reporting for the user.\n- `ci`: Enables analytics and configures reporting for use with Continuous Integration,\n  which uses a common CI user.\n- `prompt`: Prompts the user to set the status interactively.\n\nFor further details, see [Gathering an Viewing CLI Usage Analytics](cli/usage-analytics-gathering).\n',
    'options': [
      {
        'name': 'global',
        'type': 'boolean',
        'aliases': ['g'],
        'default': false,
        'description': "Access the global configuration in the caller's home directory.",
      },
      {
        'name': 'help',
        'type': 'boolean',
        'description': 'Shows a help message for this command in the console.',
      },
      {
        'name': 'setting',
        'type': 'string',
        'enum': ['on', 'off', 'ci', 'prompt'],
        'description': 'Directly enables or disables all usage analytics for the user.',
        'positional': 0,
      },
    ],
  });

  const { stdout } = await silentNg('analytics', '--help', '--json-help');
  const output = JSON.stringify(JSON.parse(stdout.trim()));

  if (output !== addHelpOutputSnapshot) {
    throw new Error(
      `ng analytics JSON help output didn\'t match snapshot.\n\nExpected "${output}" to be "${addHelpOutputSnapshot}".`,
    );
  }

  const { stdout: stdout2 } = await silentNg('--help', '--json-help');
  try {
    JSON.parse(stdout2.trim());
  } catch (error) {
    throw new Error(`'ng --help ---json-help' failed to return JSON.\n${error.message}`);
  }

  const { stdout: stdout3 } = await silentNg('generate', '--help', '--json-help');
  try {
    JSON.parse(stdout3.trim());
  } catch (error) {
    throw new Error(`'ng generate --help ---json-help' failed to return JSON.\n${error.message}`);
  }
}
