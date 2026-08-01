import { ResultFile } from '@rchh/lowcode-types';
import { createResultFile } from '../../../../../../utils/resultHelper';

export default function getFile(): [string[], ResultFile] {
  const file = createResultFile(
    '.eslintignore',
    '',
    `
# Ignored directories
build/
tests/
demo/
.ice/

# node coverage files
coverage/

# Ignored files
**/*-min.js
**/*.min.js

package-lock.json
yarn.lock
    `,
  );

  return [[], file];
}
