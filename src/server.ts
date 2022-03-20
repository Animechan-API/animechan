import { config } from 'dotenv';
config({ path: '.env.development' });
import process from 'node:process';
import { app } from '~/config/server';

app.listen(process.env.PORT || 3000, () => console.log('🎉 Server running on port 3000'));
