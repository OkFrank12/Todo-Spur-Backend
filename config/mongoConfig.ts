import mongoose from "mongoose";
import { environment } from "./environment";

const mongoURL: string = environment.MONGO!;

export const dbConfig = () => {
  mongoose.connect(mongoURL).then(() => {
    console.log(
      `database and server response is ready via ${mongoose.connection.host}`
    );
  });
};
