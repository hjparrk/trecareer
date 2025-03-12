import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Workspace",
  description: "Trecareer - My Workspace",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}
