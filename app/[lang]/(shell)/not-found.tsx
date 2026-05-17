import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-6 py-20 text-center">
      <span className="font-serif text-6xl text-gold">404</span>
      <h1 className="font-serif text-2xl">Page introuvable</h1>
      <p className="max-w-md text-muted-foreground">
        Cette page n'existe pas ou a été déplacée. Retournez à l'accueil pour continuer votre visite.
      </p>
      <Button asChild>
        <Link href="/">Retour à l'accueil</Link>
      </Button>
    </div>
  );
}
