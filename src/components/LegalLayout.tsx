import Link from "next/link";
import Logo from "./Logo";
import Footer from "./Footer";

export default function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="top scrolled" aria-label="Main">
        <div className="wrap navbar">
          <Logo />
          <Link href="/" className="pill ghost">Back to home</Link>
        </div>
      </nav>
      <main className="legalpage">
        <div className="wrap">
          <article className="prose">
            <h1 className="display">{title}</h1>
            <p className="updated">Last updated: {updated}</p>
            <p className="draftnote">
              Draft for legal review. Items marked [TO CONFIRM] must be completed, and this notice removed,
              before launch.
            </p>
            {children}
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}