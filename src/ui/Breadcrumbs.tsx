import Link from "next/link";

type BreadCrumbProps = {
  href: string;
  label: string;
  active?: boolean;
};

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: BreadCrumbProps[];
}) {
  return (
    <nav className="mb-4 block">
      <ol className="flex text-md gap-2 text-secondary/70">
        {breadcrumbs.map((breadcrumb: BreadCrumbProps, index) => (
          <li
            key={breadcrumb.href}
            className={`flex gap-2 hover:cursor-pointer ${
              breadcrumb.active ? "text-accent" : null
            }`}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
