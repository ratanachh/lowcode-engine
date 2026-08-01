import { ResultFile } from '@rchh/lowcode-types';
import { createResultFile } from '../../../../../../utils/resultHelper';

export default function getFile(): [string[], ResultFile] {
  const file = createResultFile(
    '.stylelintignore',
    '',
    `
# Ignored directories
build/
tests/
demo/

# node coverage files
coverage/
    `,
  );

  return [[], file];
}
