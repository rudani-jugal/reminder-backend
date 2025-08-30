import cron from "node-cron";
import Reminder from "./models/reminder.js";
import User from "./models/user.js";
import { sendEmail } from "./utils/emailService.js";

cron.schedule("* * * * *", async () => {
  const now = new Date();
  console.info('Scheduler started-------------', now);
  const reminders = await Reminder.find({ remindAt: { $lte: now }, sent: false });

  for (const reminder of reminders) {
    const user = await User.findById(reminder.userId);
    if (user) {
      const res = await sendEmail(
        user.email,
        `Reminder: ${reminder.title}`,
        reminder.description || "You have a reminder!"
      );
      reminder.sent = true;
      await reminder.save();
    }
  }
});
