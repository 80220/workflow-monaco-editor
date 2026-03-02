/**
 * Generates a sample JSON object from a JSON schema, populating it with default values.
 * This function recursively traverses the schema. When it encounters a property
 * with a 'default' value, it includes that property and its value in the resulting object.
 * For nested objects, it continues the process, building a structured JSON object
 * that reflects the default state defined in the schema.
 *
 * @param {object} schema The JSON schema object.
 * @returns {object} A new JSON object populated with the default values found in the schema.
 *                   Returns an empty object if the schema is invalid or has no defaults.
 */
export function generateJSONFromSchema(schema) {
  // Handles invalid or empty schema input.
  if (!schema || typeof schema !== 'object') {
    return {};
  }

  /**
   * Recursively processes a sub-schema to extract default values.
   * @param {object} subSchema The portion of the schema to process.
   * @returns {*} The default value or a generated object/array, otherwise undefined.
   */
  const processNode = (subSchema) => {
    // If a default value is explicitly provided, use it.
    // Deep clone objects and arrays to prevent shared references.
    if (subSchema && typeof subSchema === 'object' && 'default' in subSchema) {
      return JSON.parse(JSON.stringify(subSchema.default));
    }

    // If the schema node is an object with properties, recurse into them.
    if (subSchema.type === 'object' && subSchema.properties) {
      const newObj = {};
      for (const key in subSchema.properties) {
        // Ensure the key is an own property of the properties object.
        if (Object.prototype.hasOwnProperty.call(subSchema.properties, key)) {
          const defaultValue = processNode(subSchema.properties[key]);
          // Only include properties that have a defined default value.
          if (defaultValue !== undefined) {
            newObj[key] = defaultValue;
          }
        }
      }
      // Return the constructed object if it contains any properties.
      return Object.keys(newObj).length > 0 ? newObj : undefined;
    }

    // For other types without a default, return undefined.
    return undefined;
  };

  const generatedJson = processNode(schema);

  // If the root schema processing results in undefined (e.g., no defaults), return an empty object.
  return generatedJson === undefined ? {} : generatedJson;
}
