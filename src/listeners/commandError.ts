import { Events, Listener, SapphireClient } from "@sapphire/framework";

export class ReadyListener extends Listener {
  constructor(context: Listener.LoaderContext) {
    super(context, {
      once: true,
      event: Events.MessageCommandError,
    });
  }

  run(client: SapphireClient) {
    console.log(`[ERROR] - error occured when running message command`
  }
}
