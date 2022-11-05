export interface ILink {
  label?: string;
  icon?: string;
  href: string;
}

export type ComponentT =
  | boolean
  | React.ReactChild
  | React.ReactFragment
  | React.ReactPortal
  | null
  | undefined;
