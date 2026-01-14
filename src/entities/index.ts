/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: productosveterinarios
 * Interface for ProductosVeterinarios
 */
export interface ProductosVeterinarios {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  productName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  productImage?: string;
  /** @wixFieldType number */
  price?: number;
  /** @wixFieldType url */
  whatsappLink?: string;
}


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
