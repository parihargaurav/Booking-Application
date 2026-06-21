export default function AuthCard({ icon, title, subtitle, children }) {
  return (
    <div className="grow flex items-center justify-center py-6">
      <div className="dialog-card">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center mb-3">
            {icon}
          </div>
          <h1 className="text-2xl font-bold text-primary">{title}</h1>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}
