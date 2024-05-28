import { Hono } from 'hono';
import { Web3 } from '../services/ethereum';
import { ArgosProvider } from '../providers/argos/argosProvider';
import { getNumericCodeFromAlpha3 } from '../utils/iso3166';
import { Database } from '../services';
import { Env } from '../interfaces/env';
import { cors } from 'hono/cors'

const kyc = new Hono<{ Bindings: Env }>();
kyc.use('/', cors());

kyc.get('/:address/:providerId{[0-9]+}', async (c) => {
    const address = c.req.param('address');
    const providerId = c.req.param('providerId');

    const envr: Env = c.env;
    const database = new Database(envr);
    const submissionId = await database.getSubmissionIdByAddressAndProvider(
        address,
        Number(providerId)
    );

    if (submissionId.length > 0) {
        const argosProvider = new ArgosProvider(envr.ARGOS_API_KEY);
        try {
            const kycData = await argosProvider.fetchKycData(
                submissionId
            );
            const web3 = new Web3(envr);
            const isAdult = isOverEighteenYearsOld(kycData.yearOfBirth);
            const countryCode = getNumericCodeFromAlpha3(kycData.countryCode);

            const parsedData = await web3.parseData(
                kycData.yearOfBirth,
                isAdult,
                countryCode as number,
                0
            );
            return c.json({ parsedData });
        } catch (error) {
            return c.json({ success: false, error: error });
        }
    }

    return c.text(`The address: ${address} does not have a submission id.`);
});

function isOverEighteenYearsOld(birthYear: number): boolean {
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    return age >= 18;
}
export default kyc;
