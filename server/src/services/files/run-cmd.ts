import { spawn } from 'node:child_process'

export async function runCmd(
  command: string,
  cwd: string,
  args: string[],
  exceptionOnError: boolean = false): Promise<{
    status: boolean,
    stdout: string
    stderr: string
  }> {

  // Debug
  const fnName = `runcmd()`

  // Spawn
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      shell: process.platform === 'win32'
    })

    let stdout = ''
    let stderr = ''

    child.stdout?.on('data', data => {
      stdout += data.toString()
    })

    child.stderr?.on('data', data => {
      stderr += data.toString()
    })

    child.on('error', reject)

    child.on('close', code => {

      if (code === 0) {
        resolve({ status: true, stdout, stderr })

      } else {
        if (exceptionOnError === true) {
          reject(new Error(`pnpm exited with code ${code}\n\n${stderr}`))

        } else {
          console.warn(`${fnName}: pnpm exited with code ${code}\n\n${stderr}`)
          resolve({ status: false, stdout, stderr })
        }
      }
    })
  })
}
