import chalk from 'chalk'
import { PackageManager } from "./get-pkg-manager";
import { spawn } from 'cross-spawn';


export async function install(
    packageManager: PackageManager,
    isOnline: boolean
): Promise<void> {
    const args: string[] = ['install']
    if (!isOnline) {
        console.log(
            chalk.yellow('You appear to be offline.\nFalling back to the local cache.')
        )
        args.push('--offline')
    }
    return new Promise((resolve, reject) => {
        /**
         * Spawn the installation process.
         */
        const child = spawn(packageManager, args, {
            stdio: 'inherit',
            env: {
                ...process.env,
                ADBLOCK: '1',
                // we set NODE_ENV to development as pnpm skips dev
                // dependencies when production
                NODE_ENV: 'development',
                DISABLE_OPENCOLLECTIVE: '1',
            },
        })
        child.on('close', (code) => {
            if (code !== 0) {
                reject({ command: `${packageManager} ${args.join(' ')}` })
                return
            }
            resolve()
        })
    })
}