import Joi from 'joi';
/**
 * Schema for date range parameters
 */
export declare const dateRangeSchema: Joi.ObjectSchema<any>;
/**
 * Schema for datetime range parameters
 */
export declare const datetimeRangeSchema: Joi.ObjectSchema<any>;
/**
 * Schema for sleep summary parameters
 */
export declare const sleepSummarySchema: Joi.ObjectSchema<any>;
/**
 * Schema for heart rate parameters
 */
export declare const heartRateSchema: Joi.ObjectSchema<any>;
/**
 * Schema for health insights parameters
 */
export declare const healthInsightsSchema: Joi.ObjectSchema<any>;
/**
 * Validates parameters against a schema
 * @param schema - Joi schema to validate against
 * @param data - Data to validate
 * @returns Validated and sanitized data
 * @throws Error if validation fails
 */
export declare function validateParams<T>(schema: Joi.Schema, data: any): T;
/**
 * Validates a date string
 * @param date - Date string to validate
 * @returns True if valid, false otherwise
 */
export declare function isValidDate(date: string): boolean;
/**
 * Validates an ISO datetime string
 * @param datetime - Datetime string to validate
 * @returns True if valid, false otherwise
 */
export declare function isValidDatetime(datetime: string): boolean;
/**
 * Gets today's date in YYYY-MM-DD format
 */
export declare function getTodayDate(): string;
/**
 * Gets a date N days ago in YYYY-MM-DD format
 * @param days - Number of days ago
 */
export declare function getDaysAgo(days: number): string;
/**
 * Converts a date string to ISO datetime
 * @param date - Date in YYYY-MM-DD format
 * @param endOfDay - If true, returns end of day (23:59:59)
 */
export declare function dateToDatetime(date: string, endOfDay?: boolean): string;
/**
 * Validates that start_date is before end_date
 * @param startDate - Start date
 * @param endDate - End date
 * @throws Error if dates are invalid
 */
export declare function validateDateRange(startDate: string, endDate?: string): void;
/**
 * Validates that start_datetime is before end_datetime
 * @param startDatetime - Start datetime
 * @param endDatetime - End datetime
 * @throws Error if datetimes are invalid
 */
export declare function validateDatetimeRange(startDatetime: string, endDatetime?: string): void;
//# sourceMappingURL=validation.d.ts.map