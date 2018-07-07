export interface Serializable<T> {
  deserialize(input: Object,parent:any): T;
}
