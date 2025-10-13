import { getUserInfo } from "@/services/users/userInfo";
import { redirect } from "next/navigation";

export default async function RootLayout({ children, modal }: { children: React.ReactNode, modal: React.ReactNode }) {
  const user = await getUserInfo();
  if (!user || user?.role !== "PATIENT") {
    return redirect("/")
  }
    return (
      <html lang="fr">
        <body>
          {children}
          {modal} 

        </body>
      </html>
    );
  }
  