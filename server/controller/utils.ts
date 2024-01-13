import { take, drop } from 'lodash';

// TODO: add proper types
export const paginate = (data: any, pageNum: number, count = 10): any =>
	take(drop(data, pageNum), count);
