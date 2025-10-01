import { Button } from "@/components/ui/button";

import Link from "next/link";

export default async function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-hidden p-24">
      {/* Gradient blob */}
      <div
        className="absolute right-0 top-12 h-[300px] w-[300px] animate-pulse rounded-full bg-gradient-to-br from-pink-400 via-orange-300 to-yellow-200 opacity-70 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative">
        <h1 className="max-w-3xl text-6xl font-light leading-tight tracking-tight">
          WELCOME
          <br className="text-center" />
          TO
          <br />
          ATTENDANCY
        </h1>

        <div className="mt-24 flex justify-between gap-12">
          <div className="max-w-md">
            <Button variant="outline" className="rounded-full border-2 px-8">
              <span className="relative">ACCEDER A VOTRE ECOLE</span>
            </Button>
            <p className="mt-8 text-sm leading-relaxed text-gray-600">
              GAGNEZ DU TEMPS 
              <br />
              DANS LA GESTION DE VOTRE PLANNING
            </p>
          </div>

          <div className="flex items-end">
            <div className="flex items-center space-x-2">
              <Link href="/about" className="text-sm">
                about
              </Link>
            </div>
          </div>
        </div>



        <p className="mt-24 max-w-xl text-sm leading-relaxed text-gray-600">
      
        </p>
      </div>
    </main>
  );
}

