const NAMES = {
    month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    dow: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
}

function expand(expr, min, max) {
    const set = new Set()
    if (!expr || expr === '?') expr = '*'
    for (const part of expr.split(',')) {
        const piece = part.trim()
        if (!piece) continue
        const [range, stepRaw] = piece.split('/')
        const step = stepRaw ? Number(stepRaw) : 1
        if (!Number.isInteger(step) || step <= 0) throw new Error(`Invalid step in "${piece}"`)
        let start
        let end
        if (range === '*') {
            start = min
            end = max
        } else if (range.includes('-')) {
            const [a, b] = range.split('-').map(Number)
            if (!Number.isInteger(a) || !Number.isInteger(b)) throw new Error(`Invalid range "${piece}"`)
            start = a
            end = b
        } else {
            const n = Number(range)
            if (!Number.isInteger(n)) throw new Error(`Invalid value "${piece}"`)
            start = n
            end = n
        }
        if (start < min || end > max || start > end) throw new Error(`"${piece}" is outside ${min}-${max}`)
        for (let n = start; n <= end; n += step) set.add(n)
    }
    if (!set.size) throw new Error('Empty field')
    return set
}

/** Parse a 5-field cron expression: minute hour day-of-month month day-of-week. */
export function parseCron(expression) {
    const fields = expression.trim().split(/\s+/)
    if (fields.length !== 5) throw new Error('Use 5 fields: minute hour day month weekday')
    const dow = new Set()
    for (const n of expand(fields[4], 0, 7)) dow.add(n === 7 ? 0 : n)
    return {
        minute: expand(fields[0], 0, 59),
        hour: expand(fields[1], 0, 23),
        dom: expand(fields[2], 1, 31),
        month: expand(fields[3], 1, 12),
        dow,
        domAny: fields[2] === '*',
        dowAny: fields[4] === '*',
    }
}

function dayMatches(cron, date) {
    const domOk = cron.dom.has(date.getDate())
    const dowOk = cron.dow.has(date.getDay())
    if (!cron.domAny && !cron.dowAny) return domOk || dowOk
    if (!cron.domAny) return domOk
    if (!cron.dowAny) return dowOk
    return true
}

export function nextCronRuns(expression, count = 8, from = new Date()) {
    const cron = parseCron(expression)
    const runs = []
    const cursor = new Date(from.getTime())
    cursor.setSeconds(0, 0)
    cursor.setMinutes(cursor.getMinutes() + 1)
    const limit = new Date(cursor.getTime() + 366 * 24 * 60 * 60 * 1000)
    while (runs.length < count && cursor < limit) {
        if (
            cron.month.has(cursor.getMonth() + 1) &&
            cron.hour.has(cursor.getHours()) &&
            cron.minute.has(cursor.getMinutes()) &&
            dayMatches(cron, cursor)
        ) {
            runs.push(new Date(cursor.getTime()))
        }
        cursor.setMinutes(cursor.getMinutes() + 1)
    }
    return runs
}

function listText(values, names) {
    const sorted = [...values].sort((a, b) => a - b)
    if (names) return sorted.map((n) => names[n - (names === NAMES.month ? 1 : 0)] || String(n)).join(', ')
    return sorted.join(', ')
}

export function describeCron(expression) {
    const cron = parseCron(expression)
    const minute = cron.minute.size === 60 ? 'every minute' : `minute ${listText(cron.minute)}`
    const hour = cron.hour.size === 24 ? 'every hour' : `hour ${listText(cron.hour)}`
    const month = cron.month.size === 12 ? 'every month' : listText(cron.month, NAMES.month)
    let day = 'every day'
    if (!cron.domAny && !cron.dowAny) {
        day = `day ${listText(cron.dom)} or ${listText(cron.dow, NAMES.dow)}`
    } else if (!cron.domAny) {
        day = `day ${listText(cron.dom)}`
    } else if (!cron.dowAny) {
        day = listText(cron.dow, NAMES.dow)
    }
    return `${minute}, ${hour}, ${day}, ${month}`
}
