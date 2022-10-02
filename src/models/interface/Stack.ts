export interface StackAttributes {
  id?: number
  stackKind: StackEnum
}

export enum StackEnum {
  JAVA,
  C,
  JAVASCRIPT,
  REACT,
  NODE,
}
