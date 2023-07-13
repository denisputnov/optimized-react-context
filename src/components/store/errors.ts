interface AccessContextOutsideProviderErrorProps {
  contextName: string;
}

export class AccessContextOutsideProviderError extends Error {
  constructor(props: AccessContextOutsideProviderErrorProps) {
    super(`Context ${props.contextName} tried to be accessed outside a context provider`);
  }
}
