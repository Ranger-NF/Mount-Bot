import { Listener, SapphireClient } from "@sapphire/framework";

export class ReadyListener extends Listener {
    constructor(context, options) {
        super(context, {
            ...options,
            once: true,
            event: "ready",
        });
    }

    run(client: SapphireClient) {
        const { username } = client.user!

        console.log(`Logged in as ${username}`)
    }
}