/* global describe, it, expect */
import { generateJSONFromSchema } from './utils';
import inputSchema from '../test/data/input-schema.json';

describe('generateJSONFromSchema', () => {
  it('should generate a JSON object with default values from the schema', () => {
    const expectedJson = {
      "input": {
        "method": "GET",
        "headers": {
          "request-header-1": ""
        },
        "queryParams": {
          "request-param-1": ""
        },
        "body": {}
      },
      "output": {
        "store_response": false,
        "exports": {
          "status_code": {
            "export_as": "response_status_code"
          },
          "headers": {
            "export_as": "response_headers"
          },
          "response_data": {
            "export_as": "response_data"
          }
        }
      }
    };

    const result = generateJSONFromSchema(inputSchema);
    expect(result).toEqual(expectedJson);
  });

  it('should return an empty object for invalid schema', () => {
    expect(generateJSONFromSchema(null)).toEqual({});
    expect(generateJSONFromSchema(undefined)).toEqual({});
    expect(generateJSONFromSchema("")).toEqual({});
    expect(generateJSONFromSchema(123)).toEqual({});
  });

  it('should return an empty object for a schema with no defaults', () => {
    const schema = {
      type: 'object',
      properties: {
        name: { type: 'string' },
        age: { type: 'number' },
      },
    };
    expect(generateJSONFromSchema(schema)).toEqual({});
  });
});
