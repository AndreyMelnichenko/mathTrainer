export abstract class RandomHelper {
    public static getRandomArrayElementIndex<T>(arr: Array<T>): number {
        if (arr.length === 0) {
            throw new Error('Array is empty');
        } else if (arr.length === 1) {
            return 0;
        } else {
            return RandomHelper.getRandomInt(0, arr.length);
        }
    }

    public static getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
