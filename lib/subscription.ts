import { auth } from "@clerk/nextjs/server";
import { db } from "./db";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { orgId } = auth();

  if (!orgId) return false;

  const orgSubsciprion = await db.orgSubscription.findUnique({
    where: { orgId },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!orgSubsciprion) return false;

  const isValid =
    orgSubsciprion.stripeCustomerId &&
    orgSubsciprion.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

  return !!isValid;
};
