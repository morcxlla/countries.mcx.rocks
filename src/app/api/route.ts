import { NextResponse } from 'next/server'
import countries from '@/data/countries.json'

const GET = async (req: Request) => {
  const url = new URL(req.url)
  const query = url.searchParams.get('q')?.toLowerCase() || ''

  let result = [...countries]

  if (query === '@observer') {
    result = result.filter((c) => c.UN_observer)
  } else if (query === '@null') {
    result = result.filter(
      (c) =>
        c.name === null ||
        c.alpha2 === null ||
        c.alpha3 === null ||
        c.localName === null ||
        c.numeric === null
    )
  } else if (query === '@repeat') {
    const valueMap = new Map<string, Set<number>>()
    countries.forEach((c, index) => {
      ;[c.name, c.alpha2, c.alpha3, c.localName, String(c.numeric)].forEach(
        (value) => {
          if (value) {
            if (!valueMap.has(value)) valueMap.set(value, new Set())
            valueMap.get(value)!.add(index)
          }
        }
      )
    })
    const repeatedValues = new Set(
      Array.from(valueMap.entries())
        .filter(([, indexes]) => indexes.size > 1)
        .map(([value]) => value)
    )
    result = countries.filter(
      (c) =>
        repeatedValues.has(c.name) ||
        repeatedValues.has(c.alpha2) ||
        repeatedValues.has(c.alpha3) ||
        repeatedValues.has(c.localName) ||
        repeatedValues.has(String(c.numeric))
    )
  } else if (query.startsWith('"') && query.endsWith('"')) {
    const exact = query.slice(1, -1)
    result = countries.filter(
      (c) =>
        c.name === exact ||
        c.alpha2 === exact ||
        c.alpha3 === exact ||
        c.localName === exact ||
        String(c.numeric) === exact
    )
  } else if (query) {
    result = countries.filter((c) =>
      [c.name, c.alpha2, c.alpha3, c.localName, String(c.numeric)].some(
        (v) => typeof v === 'string' && v.toLowerCase().includes(query)
      )
    )
  }

  // Sort UN observers last, then by name
  result.sort((a, b) => {
    if (a.UN_observer && !b.UN_observer) return 1
    if (!a.UN_observer && b.UN_observer) return -1
    return a.name.localeCompare(b.name)
  })

  const res = NextResponse.json(result)
  res.headers.set('Access-Control-Allow-Origin', '*')
  return res
}

export { GET }
