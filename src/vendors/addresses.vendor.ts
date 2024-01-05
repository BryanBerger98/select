import { z } from 'zod';

import fetcher from '@/lib/fetcher';

const apiURL = 'https://api-adresse.data.gouv.fr/search/';

enum VendorAddressType {
	HOUSE_NUMBER = 'housenumber',
	STREET = 'street',
	LOCALITY = 'locality',
	MUNICIPALITY = 'municipality',
}

export const VendorAddressSchema = z.object({
	label: z.coerce.string(),
	score: z.coerce.number().optional(),
	housenumber: z.coerce.string().optional(),
	id: z.coerce.string(),
	name: z.coerce.string(),
	postcode: z.coerce.string(),
	citycode: z.coerce.string(),
	x: z.coerce.number(),
	y: z.coerce.number(),
	district: z.coerce.string().optional(),
	locality: z.coerce.string().optional(),
	municipality: z.coerce.string().optional(),
	city: z.coerce.string(),
	context: z.coerce.string(),
	type: z.nativeEnum(VendorAddressType),
	importance: z.coerce.number().optional(),
	street: z.coerce.string(),
});
export type VendorAddress = z.infer<typeof VendorAddressSchema>;

const VendorFeatureSchema = z.object({
	type: z.coerce.string(),
	geometry: z.object({
		type: z.coerce.string(),
		coordinates: z.coerce.number().array(),
	}),
	properties: VendorAddressSchema,
});

const VendorAddressesResponse = z.object({
	type: z.coerce.string(),
	version: z.coerce.string(),
	features: VendorFeatureSchema.array(),
	attribution: z.coerce.string(),
	licence: z.coerce.string(),
	query: z.coerce.string(),
	filters: z.any(),
	limit: z.coerce.number(),
});

export const fetchSearchFrenchAdresses = async ({ query, limit = 10 }: { query: string, limit?: number }): Promise<VendorAddress[]> => {
	try {
		const data = await fetcher(`${ apiURL }?q=${ query }&autocomplete=1&limit=${ limit }`);
		const parsedData = VendorAddressesResponse.parse(data);
		return parsedData.features.map((feature) => feature.properties);
	} catch (error) {
		throw error;
	}
};