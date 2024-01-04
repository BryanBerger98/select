import fetcher from '@/lib/fetcher';
import { z } from 'zod';

const apiURL = 'https://geo.api.gouv.fr/communes?fields=departement,codesPostaux';

export const CitySchema = z.object({
	nom: z.coerce.string(),
	code: z.coerce.string(),
	_score: z.coerce.number(),
	departement: z.object({
		code: z.coerce.string(),
		nom: z.coerce.string(),
	}),
	codesPostaux: z.array(z.coerce.string()),
});
export type City = z.infer<typeof CitySchema>;

export const fetchFrenchCitiesByName = async ({ name, limit = 10 }: { name: string, limit?: number }) => {
	try {
		const data = await fetcher(`${ apiURL }&nom=${ name }&limit=${ limit }`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Referer-Policy': 'no-referrer',
				'Access-Control-Allow-Origin': '*',
			},
		});
		return CitySchema.array().parse(data);
	} catch (error) {
		throw error;
	}
};

export const fetchFrenchCitiesByCode = async ({ code }: { code: string }) => {
	try {
		const data = await fetcher(`${ apiURL }&code=${ code }&limit=10`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Referer-Policy': 'no-referrer',
				'Access-Control-Allow-Origin': '*',
			},
		});
		return z.array(z.object({
			nom: z.coerce.string(),
			code: z.coerce.string(),
			_score: z.coerce.number(),
			departement: z.object({
				code: z.coerce.string(),
				nom: z.coerce.string(),
			}),
			codesPostaux: z.array(z.coerce.string()),
		})).parse(data);
	} catch (error) {
		throw error;
	}
};

export const fetchFrenchCitiesByZipCode = async ({ zipCode, limit = 10 }: { zipCode: string, limit?: number }) => {
	try {
		const data = await fetcher(`${ apiURL }&codePostal=${ zipCode }&limit=${ limit }`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Referer-Policy': 'no-referrer',
				'Access-Control-Allow-Origin': '*',
			},
		});
		return z.array(z.object({
			nom: z.coerce.string(),
			code: z.coerce.string(),
			_score: z.coerce.number(),
			departement: z.object({
				code: z.coerce.string(),
				nom: z.coerce.string(),
			}),
			codesPostaux: z.array(z.coerce.string()),
		})).parse(data);
	} catch (error) {
		throw error;
	}
};