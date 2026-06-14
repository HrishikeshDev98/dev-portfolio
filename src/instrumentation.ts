import { setServers } from 'node:dns/promises'

export async function register() {
  await setServers(['1.1.1.1', '8.8.8.8'])
}
