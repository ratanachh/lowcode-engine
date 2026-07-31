import { IPublicTypePropType } from './prop-types';

// Define parameter types for command handlers
export interface IPublicTypeCommandHandlerArgs {
  [key: string]: any;
}

// Define the command parameter interface
export interface IPublicTypeCommandParameter {

  /**
   * Parameter name
   */
  name: string;

  /**
   * Parameter type or detailed type description
   */
  propType: string | IPublicTypePropType;

  /**
   * Parameter description
   */
  description: string;

  /**
   * Parameter default value (optional)
   */
  defaultValue?: any;
}

// Define the interface for a single command
export interface IPublicTypeCommand {

  /**
   * Command name
   * Naming rule: commandName
   * Usage: commandScope:commandName (commandScope is defined in plugin meta to distinguish commands across plugins)
   */
  name: string;

  /**
   * Command parameters
   */
  parameters?: IPublicTypeCommandParameter[];

  /**
   * Command description
   */
  description?: string;

  /**
   * Command handler
   */
  handler: (args: any) => void;
}

export interface IPublicTypeListCommand extends Pick<IPublicTypeCommand, 'name' | 'description' | 'parameters'> {
}