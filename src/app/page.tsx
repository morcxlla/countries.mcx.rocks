import Link from 'next/link'
import { TriangleAlertIcon } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import Example from './example'

export default function Home() {
  return (
    <div className="bg-background mx-auto border-x max-w-6xl">
      <main className="space-y-6 p-4 min-h-[calc(100vh-3.5rem)]">
        <h1 className="font-black text-4xl tracking-tighter">Countries</h1>
        <div className="px-4 py-3 border rounded-md">
          <p className="text-sm">
            <TriangleAlertIcon
              className="inline-flex me-3 -mt-0.5 text-amber-500"
              size={16}
              aria-hidden="true"
            />
            The ISO 3166-1 <i>(alpha-3)</i> code is not yet available, but it
            will be soon.
          </p>
        </div>
        <section>
          <div className="flex gap-2">
            <Input
              className="select-all"
              placeholder="https://countries.mcx.rocks/api/countries"
              defaultValue="https://countries.mcx.rocks/api/countries"
              readOnly
            />
            <Link
              className={buttonVariants({ variant: 'outline' })}
              href="/api/countries"
            >
              Open
            </Link>
          </div>
        </section>

        <Example />
      </main>
      <footer className="p-4 border-t h-14">
        by{' '}
        <Link href="https://mcx.rocks" target="_blank">
          MCX
        </Link>
      </footer>
    </div>
  )
}
