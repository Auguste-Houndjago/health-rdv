import NoiseOverlay from "@/components/design/NoiseOverlay";

export default function RootLayout({ children, modal }: { children: React.ReactNode, modal: React.ReactNode }) {
    return (
      <html lang="fr">
        <body>
          {children}
          {modal} 
          <NoiseOverlay intensity={18} blendMode="difference" />
        </body>
      </html>
    );
  }
  