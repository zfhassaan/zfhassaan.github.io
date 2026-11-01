/** FBR normal tax on annual taxable income. Tax Year 2027 (Finance Act 2026). */

export const TAX_YEAR = '2027'
export const TAX_PERIOD = '1 July 2026 – 30 June 2027'

/**
 * First Schedule, Part I, Division I.
 * `upTo` is inclusive. `from` is the amount the marginal rate applies above.
 * `base` is the tax already due at `from`.
 */
export const SALARIED_SLABS = [
    { upTo: 600_000, from: 0, base: 0, rate: 0 },
    { upTo: 1_200_000, from: 600_000, base: 0, rate: 0.01 },
    { upTo: 2_200_000, from: 1_200_000, base: 6_000, rate: 0.11 },
    { upTo: 3_200_000, from: 2_200_000, base: 116_000, rate: 0.2 },
    { upTo: 4_100_000, from: 3_200_000, base: 316_000, rate: 0.25 },
    { upTo: 5_600_000, from: 4_100_000, base: 541_000, rate: 0.29 },
    { upTo: 7_000_000, from: 5_600_000, base: 976_000, rate: 0.32 },
    { upTo: Infinity, from: 7_000_000, base: 1_424_000, rate: 0.35 },
]

export const BUSINESS_SLABS = [
    { upTo: 600_000, from: 0, base: 0, rate: 0 },
    { upTo: 1_200_000, from: 600_000, base: 0, rate: 0.15 },
    { upTo: 1_600_000, from: 1_200_000, base: 90_000, rate: 0.2 },
    { upTo: 3_200_000, from: 1_600_000, base: 170_000, rate: 0.3 },
    { upTo: 5_600_000, from: 3_200_000, base: 650_000, rate: 0.4 },
    { upTo: Infinity, from: 5_600_000, base: 1_610_000, rate: 0.45 },
]

/** Professional firms prohibited from incorporating: top rate is 40%, not 45%. */
export const PROFESSIONAL_TOP_RATE = 0.4

export function slabsFor(person, professional) {
    if (person !== 'business') return SALARIED_SLABS
    if (!professional) return BUSINESS_SLABS
    return BUSINESS_SLABS.map((slab, index) => (
        index === BUSINESS_SLABS.length - 1
            ? { ...slab, rate: PROFESSIONAL_TOP_RATE }
            : slab
    ))
}

export function slabFor(income, slabs) {
    const amount = Math.max(0, Number(income) || 0)
    return slabs.find((slab) => amount <= slab.upTo) || slabs[slabs.length - 1]
}

export function taxOnIncome(income, slabs) {
    const amount = Math.max(0, Number(income) || 0)
    const slab = slabFor(amount, slabs)
    const excess = Math.max(0, amount - slab.from)
    const tax = slab.base + excess * slab.rate
    return {
        income: amount,
        tax,
        slab,
        excess,
        marginal: slab.rate,
        effective: amount > 0 ? tax / amount : 0,
    }
}

export function formatSlabRange(slab, slabs) {
    const index = slabs.indexOf(slab)
    const previous = index > 0 ? slabs[index - 1].upTo : 0
    if (!Number.isFinite(slab.upTo)) return `Above Rs ${previous.toLocaleString('en-PK')}`
    if (previous === 0) return `Up to Rs ${slab.upTo.toLocaleString('en-PK')}`
    return `Rs ${(previous + 1).toLocaleString('en-PK')} – ${slab.upTo.toLocaleString('en-PK')}`
}

export function formatSlabRate(slab) {
    const pct = `${Math.round(slab.rate * 1000) / 10}%`.replace('.0%', '%')
    if (slab.rate === 0) return '0%'
    if (slab.base === 0) return `${pct} of the amount above Rs ${slab.from.toLocaleString('en-PK')}`
    return `Rs ${slab.base.toLocaleString('en-PK')} + ${pct} above Rs ${slab.from.toLocaleString('en-PK')}`
}
