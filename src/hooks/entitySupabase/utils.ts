// utils.ts

import { SelectFields } from "./types";

/**
 * Convertit un objet SelectFields en string de sélection Supabase
 */
// export const buildSelectString = <T>(selectFields: SelectFields<T>): string => {
//     const buildNested = (obj: any, prefix: string = ''): string[] => {
//       return Object.entries(obj)
//         .filter(([_, value]) => value !== false)
//         .map(([key, value]) => {
//           const fullKey = prefix ? `${prefix}.${key}` : key;
          
//           if (value === true) {
//             return fullKey;
//           } else if (typeof value === 'object') {
//             // Relation nested
//             return `${key}(${buildNested(value).join(',')})`;
//           }
          
//           return fullKey;
//         });
//     };
  
//     const fields = buildNested(selectFields);
//     return fields.join(',');
//   };
  
  /**
   * Helper pour créer des selects typés facilement
   */
  export const select = <T>() => ({
    all: '*',
    fields: <K extends keyof T>(...fields: K[]) => fields.join(','),
    nested: (selectFields: SelectFields<T>) => buildSelectString(selectFields),
  });


// src/hooks/entitySupabase/utils.ts

/**
 * Convertit un objet SelectFields en string de sélection Supabase
 * Supporte les relations nested de manière simple
 */
export const buildSelectString = <T>(selectFields: SelectFields<T>): string => {
  const buildNested = (obj: any, path: string[] = []): string[] => {
    const fields: string[] = [];

    for (const [key, value] of Object.entries(obj)) {
      if (value === true) {
        // Champ simple
        fields.push(key);
      } else if (typeof value === 'object' && value !== null) {
        // Relation ou objet nested
        const nestedFields = buildNested(value);
        if (nestedFields.length > 0) {
          fields.push(`${key}(${nestedFields.join(',')})`);
        }
      }
    }

    return fields;
  };

  const fields = buildNested(selectFields);
  return fields.join(',') || '*';
};

/**
 * Version alternative pour les selects complexes
 */
export const buildSelectStringSafe = (select: any): string => {
  if (typeof select === 'string') return select;
  
  try {
    return buildSelectString(select);
  } catch (error) {
    console.warn('Error building select string, falling back to *', error);
    return '*';
  }
};