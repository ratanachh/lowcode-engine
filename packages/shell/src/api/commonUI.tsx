import { IPublicApiCommonUI, IPublicModelPluginContext, IPublicTypeContextMenuAction } from '@rchh/lowcode-types';
import {
  HelpTip,
  IEditor,
  Tip as InnerTip,
  Title as InnerTitle,
 } from '@rchh/lowcode-editor-core';
import { Balloon, Breadcrumb, Button, Card, Checkbox, DatePicker, Dialog, Dropdown, Form, Icon, Input, Loading, Message, Overlay, Pagination, Radio, Search, Select, SplitButton, Step, Switch, Tab, Table, Tree, TreeSelect, Upload, Divider } from '@alifd/next';
import { ContextMenu } from '../components/context-menu';
import { editorSymbol } from '../symbols';
import { ReactElement } from 'react';

export class CommonUI implements IPublicApiCommonUI {
  [editorSymbol]: IEditor;

  // Typed as any so declaration emit can name Next component types across package boundaries.
  Balloon: any = Balloon;
  Breadcrumb: any = Breadcrumb;
  Button: any = Button;
  Card: any = Card;
  Checkbox: any = Checkbox;
  DatePicker: any = DatePicker;
  Dialog: any = Dialog;
  Dropdown: any = Dropdown;
  Form: any = Form;
  Icon: any = Icon;
  Input: any = Input;
  Loading: any = Loading as any;
  Message: any = Message;
  Overlay: any = Overlay;
  Pagination: any = Pagination;
  Radio: any = Radio;
  Search: any = Search;
  Select: any = Select;
  SplitButton: any = SplitButton;
  Step: any = Step;
  Switch: any = Switch;
  Tab: any = Tab;
  Table: any = Table;
  Tree: any = Tree;
  TreeSelect: any = TreeSelect;
  Upload: any = Upload;
  Divider: any = Divider;

  ContextMenu: ((props: {
    menus: IPublicTypeContextMenuAction[];
    children: React.ReactElement[] | React.ReactElement;
  }) => ReactElement) & {
    create(menus: IPublicTypeContextMenuAction[], event: MouseEvent | React.MouseEvent): void;
  };

  constructor(editor: IEditor) {
    this[editorSymbol] = editor;

    const innerContextMenu = (props: any) => {
      const pluginContext: IPublicModelPluginContext = editor.get('pluginContext') as IPublicModelPluginContext;
      return <ContextMenu {...props} pluginContext={pluginContext} />;
    };

    innerContextMenu.create = (menus: IPublicTypeContextMenuAction[], event: MouseEvent) => {
      const pluginContext: IPublicModelPluginContext = editor.get('pluginContext') as IPublicModelPluginContext;
      return ContextMenu.create(pluginContext, menus, event);
    };

    this.ContextMenu = innerContextMenu;
  }

  get Tip() {
    return InnerTip;
  }

  get HelpTip() {
    return HelpTip;
  }

  get Title() {
    return InnerTitle;
  }
}
