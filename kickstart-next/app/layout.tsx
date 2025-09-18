import type { Metadata } from "next"; // Importing the Metadata type from Next.js
import "./globals.css"; // Importing global CSS styles

export const metadata: Metadata = {
  title: "Arivu's practice instance",
  description: "Under for practice",
};

// RootLayout component that wraps the entire application
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // Type definition for children prop
}>) {
  return (
    <html lang="en">
      {/* Setting the language attribute for the HTML document */}
      <body>
        {children}
      </body>
      {/* Rendering the children components inside the body */}
    </html>
  );
}
