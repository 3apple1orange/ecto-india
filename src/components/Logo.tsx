import Image from "next/image";

export default function Logo() {
  return (
    <a href="/" className="logo" aria-label="ECTO India home">
      <Image
        src="/images/ecto-logo.png"
        alt="ECTO India"
        width={360}
        height={240}
        priority
        style={{ height: 46, width: "auto", display: "block" }}
      />
    </a>
  );
}