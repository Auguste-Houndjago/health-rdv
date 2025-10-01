
import { getOrganization } from "@/services/auth/utils";
import Link from "next/link";

export default async function OrganisationHeader() {
  const organization = await getOrganization();

  return (
    <div>
      <div>
        <Link
          className="hover:bg-btn-background-hover flex items-center gap-2 rounded-md border px-3 py-2 no-underline"
          href="/"
        >
          {organization?.orgName ? (
            <>
              <span className="font-medium">{organization.orgName}</span>
            </>
          ) : (
            <span>Presence</span>
          )}
        </Link>

        <div></div>
      </div>
    </div>
  );
}
