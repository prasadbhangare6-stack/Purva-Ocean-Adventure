/**
 * Page transition foundation. Templates re-mount on every navigation, so this
 * CSS entrance plays on each route change. Disabled by reduced-motion in globals.css.
 */
export default function PublicTemplate({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="animate-page-enter">{children}</div>;
}
