import { OuraPersonalInfoResponse, OuraDailySleepResponse, OuraDailyActivityResponse, OuraDailyReadinessResponse, OuraHeartRateResponse, OuraWorkoutResponse, OuraSleepResponse, OuraTagResponse, OuraRingConfigurationResponse } from './types.js';
interface RateLimitInfo {
    limit: number;
    remaining: number;
    reset: number;
}
/**
 * Gets the current rate limit information
 */
export declare function getRateLimitInfo(): RateLimitInfo | null;
/**
 * Fetches personal information
 */
export declare function getPersonalInfo(): Promise<OuraPersonalInfoResponse>;
/**
 * Fetches daily sleep data
 */
export declare function getDailySleep(startDate: string, endDate?: string): Promise<OuraDailySleepResponse[]>;
/**
 * Fetches daily activity data
 */
export declare function getDailyActivity(startDate: string, endDate?: string): Promise<OuraDailyActivityResponse[]>;
/**
 * Fetches daily readiness data
 */
export declare function getDailyReadiness(startDate: string, endDate?: string): Promise<OuraDailyReadinessResponse[]>;
/**
 * Fetches heart rate data
 */
export declare function getHeartRate(startDatetime: string, endDatetime?: string): Promise<OuraHeartRateResponse[]>;
/**
 * Fetches workout data
 */
export declare function getWorkouts(startDate: string, endDate?: string): Promise<OuraWorkoutResponse[]>;
/**
 * Fetches sleep period data (detailed)
 */
export declare function getSleepPeriods(startDate: string, endDate?: string): Promise<OuraSleepResponse[]>;
/**
 * Fetches tags data
 */
export declare function getTags(startDate: string, endDate?: string): Promise<OuraTagResponse[]>;
/**
 * Fetches ring configuration
 */
export declare function getRingConfiguration(): Promise<OuraRingConfigurationResponse[]>;
export {};
//# sourceMappingURL=client.d.ts.map