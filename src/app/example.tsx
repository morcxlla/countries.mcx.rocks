'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ExternalLinkIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Example() {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState<
    {
      name: string
      alpha2: string
      alpha3: string
      localName: string
      numeric: string
      UN_observer?: boolean
    }[]
  >([])

  useEffect(() => {
    fetch('/api/countries')
      .then((res) => res.json())
      .then((data) => setCountries(data))
  }, [])

  const filtered = useMemo(() => {
    if (query.toLowerCase() === '@observer') {
      return countries.filter((c) => c.UN_observer)
    }

    if (query.toLowerCase() === '@null') {
      return countries.filter(
        (c) =>
          c.name === null ||
          c.alpha2 === null ||
          c.alpha3 === null ||
          c.localName === null ||
          c.numeric === null
      )
    }

    if (query.toLowerCase() === '@repeat') {
      const valueMap = new Map<string, Set<number>>()

      countries.forEach((c, index) => {
        ;[c.name, c.alpha2, c.alpha3, c.localName, String(c.numeric)].forEach(
          (value) => {
            if (value) {
              if (!valueMap.has(value)) {
                valueMap.set(value, new Set())
              }
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

      return countries.filter(
        (c) =>
          repeatedValues.has(c.name) ||
          repeatedValues.has(c.alpha2) ||
          repeatedValues.has(c.alpha3) ||
          repeatedValues.has(c.localName) ||
          repeatedValues.has(String(c.numeric))
      )
    }

    if (query.startsWith('"') && query.endsWith('"')) {
      const exact = query.slice(1, -1).toLowerCase()
      return countries.filter(
        (c) =>
          c.name?.toLowerCase() === exact ||
          c.alpha2?.toLowerCase() === exact ||
          c.alpha3?.toLowerCase() === exact ||
          c.localName?.toLowerCase() === exact ||
          String(c.numeric).toLowerCase() === exact
      )
    }

    return countries.filter((c) =>
      [c.name, c.alpha2, c.alpha3, c.localName, String(c.numeric)].some(
        (v) =>
          typeof v === 'string' && v.toLowerCase().includes(query.toLowerCase())
      )
    )
  }, [query, countries])

  return (
    <section className="relative space-y-4 bg-secondary shadow-md p-2 border rounded-md">
      <Link
        href="https://github.com/morcxlla/countries.mcx.rocks/blob/master/src/app/example.tsx"
        target="_blank"
        className={cn(
          buttonVariants({ size: 'icon' }),
          "absolute -top-2 -right-2 h-6 w-6 [&_svg:not([class*='size-'])]:size-3"
        )}
      >
        <ExternalLinkIcon />
      </Link>
      <div className="*:not-first:mt-2">
        <Input
          placeholder="Search for a country"
          className="bg-background w-full"
          value={query}
          id="search"
          onChange={(e) => setQuery(e.target.value)}
        />

        <Label
          htmlFor="search"
          className="mt-2 font-normal text-muted-foreground text-xs"
        >
          Search by name, or use {'"{value}"'} for exact match and
          <span className="font-bold select-all">@observer</span> to filter UN
          observers.
        </Label>
      </div>

      <pre className="font-mono text-xs">
        {JSON.stringify(filtered, null, 2)}
      </pre>
    </section>
  )
}
