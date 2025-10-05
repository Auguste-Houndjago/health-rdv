// utils.ts

import { SelectFields } from "./types";

/**
 * Convertit un objet SelectFields en string de sélection Supabase
 */
export const buildSelectString = <T>(selectFields: SelectFields<T>): string => {
    const buildNested = (obj: any, prefix: string = ''): string[] => {
      return Object.entries(obj)
        .filter(([_, value]) => value !== false)
        .map(([key, value]) => {
          const fullKey = prefix ? `${prefix}.${key}` : key;
          
          if (value === true) {
            return fullKey;
          } else if (typeof value === 'object') {
            // Relation nested
            return `${key}(${buildNested(value).join(',')})`;
          }
          
          return fullKey;
        });
    };
  
    const fields = buildNested(selectFields);
    return fields.join(',');
  };
  
  /**
   * Helper pour créer des selects typés facilement
   */
  export const select = <T>() => ({
    all: '*',
    fields: <K extends keyof T>(...fields: K[]) => fields.join(','),
    nested: (selectFields: SelectFields<T>) => buildSelectString(selectFields),
  });