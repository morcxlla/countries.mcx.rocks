'use client'

import { useEffect, useMemo, useState } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Example() {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState<
    { name: string; alpha2: string; alpha3: string; UN_observer?: boolean }[]
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
        (c) => c.name === null || c.alpha2 === null || c.alpha3 === null
      )
    }

    if (query.toLowerCase() === '@repeat') {
      // Collect all values (name, alpha2, alpha3) across all countries
      const allValues = countries.flatMap((c) => [c.name, c.alpha2, c.alpha3])

      // Find duplicate values
      const duplicates = allValues.filter(
        (value, index, self) => self.indexOf(value) !== index && value !== null
      )

      return countries.filter(
        (c) =>
          duplicates.includes(c.name) ||
          duplicates.includes(c.alpha2) ||
          duplicates.includes(c.alpha3)
      )
    }

    if (query.startsWith('"') && query.endsWith('"')) {
      const exact = query.slice(1, -1).toLowerCase()
      return countries.filter(
        (c) =>
          c.name.toLowerCase() === exact ||
          c.alpha2?.toLowerCase() === exact ||
          c.alpha3?.toLowerCase() === exact
      )
    }

    return countries.filter((c) =>
      c.name.toLowerCase().includes(query.toLowerCase())
    )
  }, [query, countries])

  return (
    <section className="space-y-4 bg-secondary shadow-md p-2 border rounded-md">
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
