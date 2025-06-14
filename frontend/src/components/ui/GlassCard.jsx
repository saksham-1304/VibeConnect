const GlassCard = ({ 
  children, 
  className = "", 
  hover = true, 
  blur = "md",
  opacity = "10"
}) => {
  const blurClasses = {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
    xl: "backdrop-blur-xl"
  };

  const opacityClasses = {
    5: "bg-white/5 dark:bg-white/5",
    10: "bg-white/10 dark:bg-white/10",
    20: "bg-white/20 dark:bg-white/20",
    30: "bg-white/30 dark:bg-white/30"
  };

  return (
    <div 
      className={`
        ${blurClasses[blur]} 
        ${opacityClasses[opacity]}
        border border-white/20 dark:border-white/10
        rounded-xl shadow-lg
        ${hover ? 'hover:shadow-xl hover:scale-[1.02] transition-all duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default GlassCard;