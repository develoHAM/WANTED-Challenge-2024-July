export function createExpiryDate(baseDate: Date, expiresIn: number) {
	const expiryDate = new Date(baseDate);
	expiryDate.setDate(baseDate.getDate() + expiresIn);
	return expiryDate;
}
