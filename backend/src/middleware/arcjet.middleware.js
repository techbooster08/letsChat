import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcJetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res
          .status(429)
          .json({ message: "Too many requests. Please try again later." });
      } else if (decision.reason.isBot()) {
        return res
          .status(403)
          .json({ message: "Bot Detected. Access denied." });
      } else {
        return res
          .status(403)
          .json({ message: "Access denied by security policy." });
      }
    }

    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        eror: "spoofef bot detected",
        message: "Milacious bot  activity  detected denied.",
      });
    }
    next();
  } catch (error) {
    console.log("Error in ArcJet MIddleWare : ", error);
    next();
  }
};
