'use client'

import { useEffect, useState } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const Example = () => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState<unknown[]>([])

  useEffect(() => {
    fetch(`/api?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => setCountries(data))
  }, [query])

  return (
    <section className="space-y-4 bg-secondary shadow-md p-2 border">
      <div>
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
      <pre className="max-h-156 overflow-auto font-mono text-xs">
        {JSON.stringify(countries, null, 2)}
      </pre>
    </section>
  )
}

export default Example
