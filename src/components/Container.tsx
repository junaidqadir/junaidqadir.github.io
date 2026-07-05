export default function Container({
  children,
  className = "",
  width = "max-w-3xl",
}: {
  children: React.ReactNode;
  className?: string;
  width?: string;
}) {
  return (
    <div className={`mx-auto w-full px-6 ${width} ${className}`}>
      {children}
    </div>
  );
}
