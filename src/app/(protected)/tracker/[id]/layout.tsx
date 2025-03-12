import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Applications",
  description: "Trecareer - Track my job applications",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}
