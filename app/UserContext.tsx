import { createContext } from "react";
import type { User } from "../interfaces/User";

export const UserContext = createContext<User | null>(null);
