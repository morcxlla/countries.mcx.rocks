import { NextResponse } from 'next/server'
import countries from '@/data/countries.json'

export function GET() {
  return NextResponse.json(
    countries.sort((a, b) => {
      if (a.UN_observer && !b.UN_observer) return 1
      if (!a.UN_observer && b.UN_observer) return -1
      return a.name.localeCompare(b.name)
    })
  )
}
