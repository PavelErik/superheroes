export abstract class Adapter<Input, Output> {
    abstract adapt(input: Input): Output;
}
