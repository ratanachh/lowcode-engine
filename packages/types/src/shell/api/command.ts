import { IPublicTypeCommand, IPublicTypeCommandHandlerArgs, IPublicTypeListCommand } from '../type';

export interface IPublicApiCommand {

  /**
   * Register a new command and its handler function
   */
  registerCommand(command: IPublicTypeCommand): void;

  /**
   * Unregister an existing command
   */
  unregisterCommand(name: string): void;

  /**
   * Executing a command through the name and given parameters will verify whether the parameters comply with the command definition.
   */
  executeCommand(name: string, args?: IPublicTypeCommandHandlerArgs): void;

  /**
   * Execute commands in batches. After executing all commands, redraw will be performed. It will only be recorded once in the history.
   */
  batchExecuteCommand(commands: { name: string; args?: IPublicTypeCommandHandlerArgs }[]): void;

  /**
   * List all registered commands
   */
  listCommands(): IPublicTypeListCommand[];

  /**
   * Register error handling callback function
   */
  onCommandError(callback: (name: string, error: Error) => void): void;
}