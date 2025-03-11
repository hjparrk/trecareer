import GlobalLayout from "@/components/layouts/global-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <GlobalLayout>{children}</GlobalLayout>;
}
