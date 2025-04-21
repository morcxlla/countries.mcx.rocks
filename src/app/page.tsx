import Link from 'next/link'
import { InfoIcon, TriangleAlertIcon } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import Example from './example'

export default function Home() {
  return (
    <div className="bg-background mx-auto border-x max-w-6xl">
      <main className="space-y-5 p-4 min-h-[calc(100vh-3.5rem)]">
        <h1 className="font-black text-5xl tracking-tighter">Countries</h1>
        <div className="px-4 py-3 border rounded-md">
          <p className="text-sm">
            <TriangleAlertIcon
              className="inline-flex me-3 -mt-0.5 text-amber-500"
              size={16}
              aria-hidden="true"
            />
            The ISO 3166-1 code <i>(alpha-3)</i> may not be correct.
          </p>
        </div>

        <section>
          <div className="font-mono text-destructive text-sm">
            Work in progress...
          </div>
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
      <footer className="flex justify-between items-center p-4 border-t h-14">
        <p>
          © {new Date().getFullYear()}
          <Link
            href="https://mcx.rocks"
            target="_blank"
            className={buttonVariants({ variant: 'link' })}
          >
            MCX
          </Link>
        </p>
        <Link
          href="https://github.com/morcxlla/countries.mcx.rocks"
          target="_blank"
          className={buttonVariants({ variant: 'link' })}
        >
          Source code
        </Link>
      </footer>
    </div>
  )
}
