import axios from 'axios';
import { getValidAccessToken } from '../oauth/handler.js';
import { logger } from '../utils/logger.js';
const OURA_API_BASE_URL = 'https://api.ouraring.com/v2';
let rateLimitInfo = null;
/**
 * Creates an authenticated Oura API client
 */
async function createClient() {
    const accessToken = await getValidAccessToken();
    const client = axios.create({
        baseURL: OURA_API_BASE_URL,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        timeout: 30000,
    });
    // Add response interceptor to track rate limits
    client.interceptors.response.use((response) => {
        const limit = response.headers['x-ratelimit-limit'];
        const remaining = response.headers['x-ratelimit-remaining'];
        const reset = response.headers['x-ratelimit-reset'];
        if (limit && remaining && reset) {
            rateLimitInfo = {
                limit: parseInt(limit, 10),
                remaining: parseInt(remaining, 10),
                reset: parseInt(reset, 10),
            };
            if (rateLimitInfo.remaining < 100) {
                console.warn(`[OuraClient] Rate limit warning: ${rateLimitInfo.remaining}/${rateLimitInfo.limit} remaining`);
            }
        }
        return response;
    }, (error) => {
        if (error.response?.status === 429) {
            logger.error('Rate limit exceeded');
            throw new Error('Rate limit exceeded. Please try again later.');
        }
        throw error;
    });
    return client;
}
/**
 * Gets the current rate limit information
 */
export function getRateLimitInfo() {
    return rateLimitInfo;
}
/**
 * Fetches personal information
 */
export async function getPersonalInfo() {
    const client = await createClient();
    try {
        const response = await client.get('/usercollection/personal_info');
        return response.data;
    }
    catch (error) {
        logger.error('Failed to fetch personal info:', error);
        throw handleApiError(error);
    }
}
/**
 * Fetches daily sleep data
 */
export async function getDailySleep(startDate, endDate) {
    const client = await createClient();
    try {
        const params = { start_date: startDate };
        if (endDate) {
            params.end_date = endDate;
        }
        const response = await client.get('/usercollection/daily_sleep', {
            params,
        });
        return response.data.data;
    }
    catch (error) {
        logger.error('Failed to fetch daily sleep:', error);
        throw handleApiError(error);
    }
}
/**
 * Fetches daily activity data
 */
export async function getDailyActivity(startDate, endDate) {
    const client = await createClient();
    try {
        const params = { start_date: startDate };
        if (endDate) {
            params.end_date = endDate;
        }
        const response = await client.get('/usercollection/daily_activity', {
            params,
        });
        return response.data.data;
    }
    catch (error) {
        logger.error('Failed to fetch daily activity:', error);
        throw handleApiError(error);
    }
}
/**
 * Fetches daily readiness data
 */
export async function getDailyReadiness(startDate, endDate) {
    const client = await createClient();
    try {
        const params = { start_date: startDate };
        if (endDate) {
            params.end_date = endDate;
        }
        const response = await client.get('/usercollection/daily_readiness', {
            params,
        });
        return response.data.data;
    }
    catch (error) {
        logger.error('Failed to fetch daily readiness:', error);
        throw handleApiError(error);
    }
}
/**
 * Fetches heart rate data
 */
export async function getHeartRate(startDatetime, endDatetime) {
    const client = await createClient();
    try {
        const params = { start_datetime: startDatetime };
        if (endDatetime) {
            params.end_datetime = endDatetime;
        }
        const response = await client.get('/usercollection/heartrate', {
            params,
        });
        return response.data.data;
    }
    catch (error) {
        logger.error('Failed to fetch heart rate:', error);
        throw handleApiError(error);
    }
}
/**
 * Fetches workout data
 */
export async function getWorkouts(startDate, endDate) {
    const client = await createClient();
    try {
        const params = { start_date: startDate };
        if (endDate) {
            params.end_date = endDate;
        }
        const response = await client.get('/usercollection/workout', {
            params,
        });
        return response.data.data;
    }
    catch (error) {
        logger.error('Failed to fetch workouts:', error);
        throw handleApiError(error);
    }
}
/**
 * Fetches sleep period data (detailed)
 */
export async function getSleepPeriods(startDate, endDate) {
    const client = await createClient();
    try {
        const params = { start_date: startDate };
        if (endDate) {
            params.end_date = endDate;
        }
        const response = await client.get('/usercollection/sleep', {
            params,
        });
        return response.data.data;
    }
    catch (error) {
        logger.error('Failed to fetch sleep periods:', error);
        throw handleApiError(error);
    }
}
/**
 * Fetches tags data
 */
export async function getTags(startDate, endDate) {
    const client = await createClient();
    try {
        const params = { start_date: startDate };
        if (endDate) {
            params.end_date = endDate;
        }
        const response = await client.get('/usercollection/tag', {
            params,
        });
        return response.data.data;
    }
    catch (error) {
        logger.error('Failed to fetch tags:', error);
        throw handleApiError(error);
    }
}
/**
 * Fetches ring configuration
 */
export async function getRingConfiguration() {
    const client = await createClient();
    try {
        const response = await client.get('/usercollection/ring_configuration');
        return response.data.data;
    }
    catch (error) {
        logger.error('Failed to fetch ring configuration:', error);
        throw handleApiError(error);
    }
}
/**
 * Handles API errors and converts them to user-friendly messages
 */
function handleApiError(error) {
    if (axios.isAxiosError(error)) {
        const axiosError = error;
        if (axiosError.response) {
            const status = axiosError.response.status;
            const errorMessage = axiosError.response.data?.error || axiosError.response.data?.message;
            switch (status) {
                case 401:
                    return new Error('Authentication failed. Please re-authenticate with Oura.');
                case 403:
                    return new Error('Access forbidden. Check your OAuth scopes.');
                case 404:
                    return new Error('Requested data not found.');
                case 429:
                    return new Error('Rate limit exceeded. Please try again later.');
                case 500:
                case 502:
                case 503:
                    return new Error('Oura API is temporarily unavailable. Please try again later.');
                default:
                    return new Error(errorMessage || `Oura API error: ${status}`);
            }
        }
        if (axiosError.code === 'ECONNABORTED') {
            return new Error('Request timeout. Please try again.');
        }
        if (axiosError.code === 'ENOTFOUND' || axiosError.code === 'ECONNREFUSED') {
            return new Error('Unable to connect to Oura API. Check your internet connection.');
        }
        return new Error(`Network error: ${axiosError.message}`);
    }
    return error instanceof Error ? error : new Error('Unknown error occurred');
}
//# sourceMappingURL=client.js.map