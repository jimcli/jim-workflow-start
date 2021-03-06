const { spawn } = require('child_process');
const fs = require('fs');
const dotenv = require('dotenv');

module.exports = class JimStart {

    constructor(jim) {
        this.jim = jim;
    }

    run() {
        dotenv.config();

        // Get path to yarn.lock or package-lock.json file
        const yarnLock = process.cwd() + '/yarn.lock';
        const npmLock = process.cwd() + '/package-lock.json';
        const ddev = process.cwd() + '/.ddev';

        let command;

        // Check which one of the two exists and adjust command
        try {
            fs.accessSync(yarnLock);
            command = 'yarn dev';
        } catch(err) {}
        if (!command) {
            try {
                fs.accessSync(npmLock);
                command = 'npm run dev';
            } catch(err) {}
        }
        if (!command) {
          try {
              fs.accessSync(ddev);
              command = 'ddev start';
          } catch(err) {}
      }

        // Execute command
        const c = spawn(command, [], {shell: true, stdio: 'inherit'});
    }
}