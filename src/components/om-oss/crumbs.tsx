import Link from "next/link";

/** The trail above an inner page's headline, as PageHead draws it. */
export function Crumbs() {
  return (
    <nav className="crumbs" aria-label="Brødsmuler">
      <ol>
        <li>
          <Link href="/">Hjem</Link>
        </li>
        <li aria-current="page">Om oss</li>
      </ol>
    </nav>
  );
}
