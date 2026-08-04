import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <meta httpEquiv="refresh" content="0;url=/pt" />
      <p>
        Redirecionando para <Link href="/pt">Puravie</Link>…
      </p>
    </main>
  );
}
