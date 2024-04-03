import { ReactNode } from "react";
import { CrudPayloadTypes } from "./crud.types";
import { CityType } from "./weather.types";

export type ChildrenProps = { children: ReactNode };

export type payloadTypes = CrudPayloadTypes | undefined | CityType;
