export interface IPublicModelSimulatorRender {

  /**
   * Canvas component list
   */
  components: {
    [key: string]: any;
  };

  /**
   * Trigger canvas re-render
   */
  rerender: () => void;
}
