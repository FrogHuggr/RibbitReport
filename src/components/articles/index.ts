import React from 'react';
import { UnknownArticleType } from './UnknownArticleType';

// Article component registry
// New article types are added here as they're developed
const articleTypeRegistry: Record<string, React.ComponentType<{ content?: unknown }>> = {
  // Components will be added as they're developed:
  // 'field-postcard': FieldPostcard,
  // 'myth-buster': MythBuster,
  // 'quiz': Quiz,
  // 'welcome-letter': WelcomeLetter,
  // 'species-spotlight': SpeciesSpotlight,
};

/**
 * Get the React component for a given article type.
 * Returns UnknownArticleType component if the type isn't registered.
 */
export function getArticleComponent(type: string): React.ComponentType<{ type?: string; content?: unknown }> {
  return articleTypeRegistry[type] || UnknownArticleType;
}

/**
 * Check if an article type is registered
 */
export function isArticleTypeRegistered(type: string): boolean {
  return type in articleTypeRegistry;
}

/**
 * Get all registered article types
 */
export function getRegisteredArticleTypes(): string[] {
  return Object.keys(articleTypeRegistry);
}

// Re-export individual components for direct use
export { UnknownArticleType };
