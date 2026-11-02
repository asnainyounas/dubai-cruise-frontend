import Image from "next/image";
import Link from "next/link";
import { PACKAGES, PackageItem } from "@/data/home";

const ANIM: Record<number, string | string[]> = {
  1: "fade-right",
  2: ["fade-down", "fade-up"],
  3: "fade-left",
};

function PackageCard({ pkg, animIndex }: { pkg: PackageItem; animIndex: number }) {
  const anims = ANIM[pkg.col];
  const anim = Array.isArray(anims) ? anims[animIndex % anims.length] : anims;
  const detailHref = `/cruises/${pkg.slug}`;
  const waUrl = `https://wa.me/971558479933?text=${encodeURIComponent(
    `Hello, I would like to book the ${pkg.title.trim()}`
  )}`;

  return (
    <div
      className="cruise-package-section-block aos-init"
      data-aos={anim}
      style={{ transitionDuration: "2000ms" }}
    >
      <Link href={detailHref} className={pkg.big ? "cruise-package-image2" : "cruise-package-image1"}>
        <Image src={`/img/${pkg.img}`} alt={pkg.alt} width={400} height={250} />
      </Link>

      <Link href={detailHref}>
        <h3 className="title">{pkg.title}</h3>
      </Link>

      <div className="duration">{pkg.duration}</div>
      <p>{pkg.text}</p>
      <div className="Flex-btn-block">
        <Link className="cruise-package-link" href={`${detailHref}#book`}>
          Book Online
        </Link>
        <a className="whatsapp-link" href={waUrl} target="_blank" rel="noopener noreferrer">
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