import {
  ParseUUIDPipe,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

export class CustomParseUUIDPipe extends ParseUUIDPipe {
  async transform(value: string, metadata: ArgumentMetadata): Promise<string> {
    try {
      return await super.transform(value, metadata);
    } catch (error) {
      throw new BadRequestException(
        `Invalid UUID provided for ${metadata.data}: ${value}`,
      );
    }
  }
}
