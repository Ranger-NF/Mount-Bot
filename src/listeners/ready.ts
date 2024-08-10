import { Events, Listener, SapphireClient } from "@sapphire/framework";

export class ReadyListener extends Listener {
  constructor(context: Listener.LoaderContext) {
    super(context, {
      once: true,
      event: Events.ClientReady,
    });
  }

  run(client: SapphireClient) {
    const { username } = client.user!;

    console.log(`[INFO] - Logged in as ${username}`);
  }
}
