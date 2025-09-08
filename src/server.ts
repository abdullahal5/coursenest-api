/* eslint-disable no-console */
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { seedAdmin } from './seed';
let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string, {
      dbName: 'coursenest-api',
    });
    console.log(`✅ Successfully connected to the database`);

    server = app.listen(config.port, () => {
      console.log(`🚀 Server is running on port ${config.port}`);
    });

    seedAdmin();
  } catch (err) {
    console.error(
      `❌ Failed to start the application: ${err instanceof Error ? err.message : err}`,
    );
    process.exit(1);
  }
}

main();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`🔥 Unhandled Rejection detected!`, {
    error: err instanceof Error ? err.message : err,
    stack: err instanceof Error ? err.stack : null,
  });

  // If the server is running, close it gracefully before exiting
  if (server) {
    server.close(() => {
      console.log(`🚪 Server closed due to an unhandled rejection`);
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  console.error(`💥 Uncaught Exception detected!`, {
    error: err.message,
    stack: err.stack,
  });
  process.exit(1);
});

// Handle SIGTERM signa
process.on('SIGTERM', () => {
  console.log(`🛑 SIGTERM signal received. Shutting down gracefully...`);
  if (server) {
    server.close(() => {
      console.log(`🚪 Server closed`);
      process.exit(0);
    });
  }
});
