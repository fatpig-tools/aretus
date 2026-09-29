import { objectTypes } from "./objects";
import { singletonTypes } from "./singletons";
import { documentTypes } from "./documents";

export const schemaTypes = [...objectTypes, ...singletonTypes, ...documentTypes];
