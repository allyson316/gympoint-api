require('dotenv/config');
import app from './app';

app.listen(process.env.NODE_PORT, () =>
  console.log(`\n API: "Gympoint - API"
 Running on port: ${process.env.NODE_PORT}
 Environment: ${process.env.NODE_ENV}`)
);
