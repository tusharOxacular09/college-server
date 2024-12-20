import {
  ParseUUIDPipe,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

// Custom pipe that extends the default ParseUUIDPipe to handle UUID validation
export class CustomParseUUIDPipe extends ParseUUIDPipe {
  // Override the transform method to add custom error handling for invalid UUIDs
  async transform(value: string, metadata: ArgumentMetadata): Promise<string> {
    try {
      // Call the parent class's transform method to validate the UUID
      return await super.transform(value, metadata);
    } catch (error) {
      // If an error occurs (e.g., invalid UUID), throw a BadRequestException with a custom error message
      throw new BadRequestException(
        `Invalid UUID provided for ${metadata.data}: ${value}`,
      );
    }
  }
}
