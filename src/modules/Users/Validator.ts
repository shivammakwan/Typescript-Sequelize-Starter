import { responseGenerator, decryptData } from "../../utils/functions";
import codes from "../../utils/code";
import messages from "../../utils/message";

export let decryptRequest = (req: any, res: any, next: any) => {
    try {
      if (req.body) {
        const userinfo = decryptData(req.body);
        res.locals.requestedData = userinfo;
        next();
      } else {
        res.send(
            responseGenerator(codes.invalidDetails, messages.dataIssue)
        );
      }
    } catch (e) {
      res.send(
        responseGenerator(
          codes.invalidDetails,
          messages.tryCatch,
          e.message
        )
      );
    }
  }