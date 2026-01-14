/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: serviciosveterinarios
 * Interface for ServiciosVeterinarios
 */
export interface ServiciosVeterinarios {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  serviceName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  serviceImage?: string;
  /** @wixFieldType number */
  price?: number;
  /** @wixFieldType text */
  benefits?: string;
  /** @wixFieldType text */
  duration?: string;
}
