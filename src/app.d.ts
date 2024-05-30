// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { PrismaClient } from "@prisma/client";
declare global {
	namespace Lucia {
		type Auth = import("$lib/server/lucia").Auth;
		type DatabaseUserAttributes = {};
		type DatabaseSessionAttributes = {};
	}
	var prisma: PrismaClient;
	namespace App {
		// interface Error {}
		interface Locals {
			auth: import("lucia").AuthRequest;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export { };
