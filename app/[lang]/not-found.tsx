import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center gap-6 py-20 text-center">
      <span className="font-display text-7xl font-medium text-lagoon-500">
        404
      </span>
      <p className="text-muted-foreground max-w-md">
        Cette page n'existe pas. Retournez à l'accueil pour découvrir Oxygen
        Island.
      </p>
      <Link
        href="/"
        className="rounded-full bg-lagoon-500 px-6 py-2.5 text-[11px] uppercase tracking-[0.22em] text-sand"
      >
        Accueil
      </Link>
    </div>
  );
}
