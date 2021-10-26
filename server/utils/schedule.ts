import { Agenda } from 'agenda';
// import { Agenda } from 'agenda/es';

import Token from '../models/Token';
import User from '../models/User';
import Confirmation from '../models/Confirmation';

const MONGO_URI = (process.env.MONGO_URI as string);

const agenda = new Agenda({ 
    db: { 
        address: MONGO_URI
    } 
});

const minsAgo = new Date(new Date().setMinutes(new Date().getMinutes() - 15));

agenda.define('delete old tokens', async () => {
    const tokens: any = await Token.find({ expirationDate: { $lt: new Date().toISOString() }});
    
    let tokensToRemove: any = [];

    tokens.forEach(async (token: any) => {
        tokensToRemove.push(token._id);        
        await token.remove();
    });

    await User.updateMany(
        { refreshToken: { $in: tokensToRemove } }, 
        { $set: { refreshToken: null } } 
    );
});

agenda.define('clear unused verif codes', async () => {
    await Confirmation.deleteMany({ createdAt: { $lt: minsAgo.toISOString() }});
});

agenda.define('delete unactivated users', async () => {
    await User.deleteMany({ active: false, updatedAt: { $lt: minsAgo.toISOString() }});
});

(async function () {
  await agenda.start();
  await agenda.every('5 hours', 'delete old tokens');
  await agenda.every('1 hour', 'delete unactivated users');
  await agenda.every('15 minutes', 'clear unused verif codes');
})();

export default agenda;