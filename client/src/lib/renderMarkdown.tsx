import React from 'react';

/**
 * Renders text with markdown-style bold (**text**) as actual bold elements
 */
export function renderBoldText(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2);
      return <strong key={index} className="font-semibold text-foreground">{boldText}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
}

/**
 * Renders a paragraph with markdown bold text support
 */
export function renderParagraph(text: string): React.ReactNode {
  // Handle bullet points
  if (text.trim().startsWith('- ')) {
    return renderBoldText(text);
  }
  
  return renderBoldText(text);
}
