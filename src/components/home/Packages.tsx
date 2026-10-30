import Image from "next/image";
import Link from "next/link";
import { PACKAGES, PackageItem, WA_BASE } from "@/data/home";

const ANIM: Record<number, string | string[]> = {
  1: "fade-right",
  2: ["fade-down", "fade-up"],
  3: "fade-left",
};

function PackageCard({ pkg, animIndex }: { pkg: PackageItem; animIndex: number }) {
  const anims = ANIM[pkg.col];
  const anim = Array.isArray(anims) ? anims[animIndex % anims.length] : anims;
  const linkHref = pkg.href || `#${pkg.title.trim().toLowerCase().replace(/\s+/g, "-")}`;
  const isInternal = linkHref.startsWith("/");

  return (
    <div
      className="cruise-package-section-block aos-init"
      data-aos={anim}
      style={{ transitionDuration: "2000ms" }}
    >
      {isInternal ? (
        <Link
          href={linkHref}
          className={pkg.big ? "cruise-package-image2" : "cruise-package-image1"}
        >
          <Image
            src={`/img/${pkg.img}`}
            alt={pkg.alt}
            width={400}
            height={250}
          />
        </Link>
      ) : (
        <a
          href={linkHref}
          className={pkg.big ? "cruise-package-image2" : "cruise-package-image1"}
        >
          <Image
            src={`/img/${pkg.img}`}
            alt={pkg.alt}
            width={400}
            height={250}
          />
        </a>
      )}

      {isInternal ? (
        <Link href={linkHref}>
          <h3 className="title">{pkg.title}</h3>
        </Link>
      ) : (
        <a href={linkHref}>
          <h3 className="title">{pkg.title}</h3>
        </a>
      )}

      <div className="duration">{pkg.duration}</div>
      <p>{pkg.text}</p>
      <div className="Flex-btn-block">
        <a className="cruise-package-link" href={pkg.book} target="_blank" rel="nofollow">
          Book Online
        </a>
        <a
          className="whatsapp-link"
          href={`${WA_BASE}${pkg.wa}`}
          target="_blank"
          rel="nofollow"
        >
          Whatsapp Now
        </a>
      </div>
    </div>
  );
}

export default function Packages() {
  return (
    <section className="general-row package-block-row" id="packages">
      <div className="text-center">
        <div className="main-title mb30">Top Dhow Cruise Packages</div>
      </div>
      <div className="dcontainer-fluid">
        <div className="packages-grid">
          {PACKAGES.map((pkg, i) => (
            <PackageCard pkg={pkg} animIndex={i} key={pkg.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
