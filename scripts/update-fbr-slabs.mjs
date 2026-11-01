import { writeFile, mkdir } from 'node:fs/promises'
import { fetchFreshSlabs, packSchedule } from '../src/lib/fbr-update.js'

const schedule = await fetchFreshSlabs()
await mkdir('public/data', { recursive: true })
await writeFile('public/data/fbr-slabs.json', `${JSON.stringify(packSchedule(schedule), null, 2)}\n`)
console.log(`Saved tax year ${schedule.taxYear} salary slabs from ${schedule.sourceFile}`)
