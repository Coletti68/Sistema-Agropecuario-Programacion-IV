export function Button({ children, onClick, variant = "default", size = "md", className = "" }) {
  const classes = `btn ${variant} ${size} ${className}`;
  return <button onClick={onClick} className={classes}>{children}</button>;
}