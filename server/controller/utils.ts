import { take, drop } from 'lodash';

export const paginate = (data: any, pageNum: number, count = 10): any =>
	take(drop(data, pageNum), count);
