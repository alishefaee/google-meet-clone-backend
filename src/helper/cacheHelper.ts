import NodeCache from 'node-cache';

class CacheHelper {
    private static instance: CacheHelper | null = null;
    private static cache: NodeCache;

    private constructor(ttlSeconds: number) {
        CacheHelper.cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2 });
    }

    public static getInstance(ttlSeconds: number = 60): CacheHelper {
        if (CacheHelper.instance == null) {
            CacheHelper.instance = new CacheHelper(ttlSeconds);
        }
        return CacheHelper.instance;
    }

    /**
     * Set a value in the cache.
     * @param key The key to identify the cached value.
     * @param value The value to cache.
     */
    public set<T>(key: string, value: T): void {
        CacheHelper.cache.set(key, value);
    }

    /**
     * Get a value from the cache.
     * @param key The key to identify the cached value.
     * @returns The cached value or undefined if the key does not exist.
     */
    public get<T>(key: string): T | undefined {
        return CacheHelper.cache.get<T>(key);
    }

    /**
     * Delete a value from the cache.
     * @param key The key to identify the cached value.
     */
    public del(key: string): void {
        CacheHelper.cache.del(key);
    }

    /**
     * Check if a key exists in the cache.
     * @param key The key to check.
     * @returns True if the key exists, false otherwise.
     */
    public has(key: string): boolean {
        return CacheHelper.cache.has(key);
    }
}

export default CacheHelper.getInstance();
