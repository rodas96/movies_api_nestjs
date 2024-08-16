import { BadRequestException } from '@nestjs/common';

export function parseDate(value: string): Date {
  const regexes = [
    /^(0[1-9]|1[0-2])\/(\d{4})$/, // MM/yyyy
    /^(0[1-9]|1[0-2])-(\d{4})$/, // MM-yyyy
  ];

  for (const regex of regexes) {
    const match = value.match(regex);
    if (match) {
      const [, month, year] = match;
      return new Date(`${year}-${month}-01T00:00:00.000Z`);
    }
  }
  throw new BadRequestException(
    "Invalid date format. Use 'MM/yyyy' or 'MM-yyyy'",
  );
}
