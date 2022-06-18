import { createContext} from "react"
import language from "./language"
import { Context } from "./type"

export const GlobalContext = createContext<Context>(language)