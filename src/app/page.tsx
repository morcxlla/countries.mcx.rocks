import Link from 'next/link'
import { TriangleAlertIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import Example from './example'

export default function Home() {
  return (
    <div className="bg-background mx-auto border-x max-w-6xl">
      <main className="space-y-5 p-4 min-h-[calc(100vh-3.5rem)]">
        <h1 className="font-black text-4xl tracking-tighter">Countries</h1>
        <div className="px-4 py-3 border">
          <p className="text-sm">
            <TriangleAlertIcon
              className="inline-flex me-3 -mt-0.5 text-amber-500"
              size={16}
              aria-hidden="true"
            />
            This list of country codes may not reflect the latest geopolitical
            changes. Please verify with official sources if accuracy is
            critical.
          </p>
        </div>

        <section>
          <div className="flex gap-2">
            <div className="relative w-full">
              <div className="left-2 absolute inset-y-1/2 flex justify-center items-center">
                <Badge className="bg-[#0f0] font-black text-foreground">
                  GET
                </Badge>
              </div>

              <Input
                className="pl-14 select-all"
                placeholder="https://countries.mcx.rocks/api"
                defaultValue="https://countries.mcx.rocks/api"
                readOnly
              />
            </div>
            <Link
              className={buttonVariants({ variant: 'outline' })}
              href="/api"
            >
              Open
            </Link>
          </div>
        </section>

        <Example />
        <p>
          Source:
          <Link
            className={buttonVariants({ variant: 'link' })}
            href="https://www.mjusticia.gob.es/es/Ciudadano/Registros/Documents/1292428778575-CODIGOS_ISO_3166_1.PDF"
            target="_blank"
          >
            Ministerio de Justicia (Spain)
          </Link>
          <Link
            className={buttonVariants({ variant: 'link' })}
            href="https://es.wikipedia.org/wiki/ISO_3166-1"
            target="_blank"
          >
            Wikipedia (ES)
          </Link>{' '}
          <Link
            className={buttonVariants({ variant: 'link' })}
            href="https://en.wikipedia.org/wiki/ISO_3166-1"
            target="_blank"
          >
            Wikipedia (EN)
          </Link>
        </p>
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
