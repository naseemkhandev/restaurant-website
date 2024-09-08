import { MailtrapClient } from "mailtrap";

import { config } from "./config";

export const client = new MailtrapClient({
  token: config.mailtrapApiToken! as string,
});

export const sender = {
  email: config.mailtrapEmail,
  name: config.mailtrapName,
};
