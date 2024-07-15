import NodeCache from 'node-cache';

class CacheHelper {
    private static instance: NodeCache | null = null;

    private constructor() {}

    public static getInstance(): NodeCache {
        if (CacheHelper.instance == null) {
            CacheHelper.instance = new NodeCache({ stdTTL: 0, checkperiod: 0 });
        }
        return CacheHelper.instance;
    }
}

export default CacheHelper.getInstance();