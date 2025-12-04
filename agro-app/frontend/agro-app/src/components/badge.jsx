import React from "react";
import "../styles/badge.css";

export function Badge({ children, variant = "default", className = "" }) {
  return <span className={`badge badge-${variant} ${className}`}>{children}</span>;
}
