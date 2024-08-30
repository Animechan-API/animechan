import type { Response } from "express";

type DataType<T> = Record<string, T>;
export const sendSuccessResponse = <T>(res: Response, data: DataType<T> | Record<string, T>[]) => {
	return res.status(200).json({
		status: "success",
		data: data,
	});
};

interface IErrorOptions {
	code: number;
	message: string;
}
export const sendErrorResponse = (res: Response, { code, message }: IErrorOptions) => {
	return res.status(code).json({
		status: "error",
		error: { code, message },
	});
};
