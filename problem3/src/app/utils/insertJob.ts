import { Message } from "../models/message";

export const startInsertingMessages = () => {
  setInterval(async () => {
    const trxId = Math.floor(Math.random() * 1000);
    const newMessage = new Message({ trxId });
    await newMessage.save();

    // eslint-disable-next-line no-console
    console.log(`📥 Inserted message with trxId ${trxId}`);
  }, 1000); // every 1 second
};
